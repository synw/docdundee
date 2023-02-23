from os import path, makedirs
from typing import Dict, List, Tuple
import json
import ast
import inspect
from importlib import import_module

from docutils.core import publish_parts
from docstring_parser import parse

from docdundee.interfaces import (
    ExampleParam,
    ParsedDocstring,
    MethodsDict,
    FileSourcesDict,
)


def parse_class(mod: str, cls: str, private=False) -> MethodsDict:
    """Parse a class to a methods dict

    All the methods of the class will be parsed
    and the docstrings returned in a dict

    .. code-block:: python

      from docdundee.docparser import parse_class, parse_docstrings
      from docdundee.interfaces import MethodsDict, ParsedDocstring

      parsed_methods: MethodsDict = parse_class("mypackage.myfile", "MyClassName")
      docs: Dict[str, ParsedDocstring] = parse_docstrings(parsed_methods)

    :param mod: module import path
    :type mod: str
    :param cls: class name
    :type cls: str
    :param private: parse private function that start with _, defaults to False
    :type private: bool
    :return: a dict of methods
    :rtype: MethodsDict
    """
    source = inspect.getsource(getattr(import_module(mod), cls))
    _mod = ast.parse(source)
    _cls = _mod.body[0]
    return _parse_nodes(source, _cls.body, private=private)  # type: ignore


def parse_functions(mod: str, private=False) -> MethodsDict:
    """Parse a module's functions to a methods dict

    All the functions in the file will be parsed
    except the ones that start with and underscore.
    The docstrings are returned in a dict

    .. code-block:: python

      from docdundee.docparser import parse_functions, parse_docstrings
      from docdundee.interfaces import MethodsDict, ParsedDocstring

      parsed_funcs: MethodsDict = parse_functions("mypackage.myfile")
      docs: Dict[str, ParsedDocstring] = parse_docstrings(parsed_funcs)

    :param mod: module import path
    :type mod: str
    :param private: parse private function starting with _, defaults to False
    :type private: bool
    :return: a dict of methods
    :rtype: MethodsDict
    """
    source = inspect.getsource(import_module(mod))
    _mod = ast.parse(source)
    return _parse_nodes(source, _mod.body, private=private)  # type: ignore


def get_func_sources(file: str) -> FileSourcesDict:
    """Get source code of all functions in a file

    .. code-block:: python

      from docdundee.interfaces import FileSourcesDict

      sources: FileSourcesDict = get_func_sources("some/path/file.py")

    :param file: the file path
    :type file: str
    :raises ModuleNotFoundError: source not found
    :return: a dict of functions and sources
    :rtype: FileSourcesDict
    """
    ex: ExamplesDict = {}  # type: ignore
    with open(file, "r") as fileop:
        lines = fileop.readlines()
        source = "".join(lines)
        _mod = ast.parse(source)
        i = 0
        for node in _mod.body:
            if (
                isinstance(node, ast.FunctionDef)
                or isinstance(node, ast.AsyncFunctionDef)
                or isinstance(node, ast.ClassDef)
            ):
                rawsource = ast.get_source_segment(source, _mod.body[i])  # type: ignore
                if rawsource is None:
                    raise ModuleNotFoundError("Source not found")
                lines = rawsource.split("\n")
                lines.pop(0)
                nlines = []
                for line in lines:
                    nl = line.replace("\t", "", 1)
                    nl = nl.replace("    ", "", 1)
                    nlines.append(nl)
                end = "\n".join(nlines)
                ex[node.name] = end
            i += 1
    return ex


def parse_docstrings(
    methods: MethodsDict, exec_examples=False
) -> Dict[str, ParsedDocstring]:
    """Parse a list of preprocessed MethodsDict docstring

    .. code-block:: python

      from docdundee.docparser import parse_functions, parse_docstrings
      from docdundee.interfaces import MethodsDict, ParsedDocstring

      parsed_ds: MethodsDict = parse_functions("mypackage.myfile")
      docs: Dict[str, ParsedDocstring] = parse_docstrings(parsed_ds)

    :param methods: the parsed methods
    :type methods: MethodsDict
    :param exec_examples: set the examples as executable by default, defaults to False
    :type exec_examples: bool
    :return: a dict of parsed docstrings
    :rtype: Dict[str, ParsedDocstring]
    """
    docs: Dict[str, ParsedDocstring] = {}
    for k in methods.keys():
        params = {}
        raises = []
        method = methods[k]
        for param in method["docstring"].params:
            pdesc = param.description
            ptype = param.type_name
            pdefault = param.default
            if pdesc is not None:
                pdesc = _rst_to_html(pdesc)
            if ptype is not None:
                ptype = _rst_to_html(ptype)
            if pdefault is not None:
                pdefault = _rst_to_html(pdefault)
            params[param.arg_name] = {
                "description": pdesc,
                "type": ptype,
                # "is_optional": param.is_optional,
                "default": pdefault,
            }
        for ex in method["docstring"].raises:
            raises.append({"description": ex.description, "type": ex.type_name})
        r = None
        if method["docstring"].returns is not None:
            r = {"name": "", "type": ""}
            rn = method["docstring"].returns.return_name
            if rn is not None:
                rn = _rst_to_html(rn)
            rt = method["docstring"].returns.type_name
            if rt is not None:
                rt = _rst_to_html(rt)
            r["name"] = rn
            r["type"] = rt
        # print("EX", k, method["docstring"].examples)
        desc, example, is_executable = _parse_long_description(
            method["docstring"].long_description, exec_examples
        )
        if desc is not None:
            desc = _rst_to_html(desc)
        shortdesc = method["docstring"].short_description
        if shortdesc is not None:
            shortdesc = _rst_to_html(shortdesc)
        _example: ExampleParam | None = None
        if example is not None:
            _example = {
                "code": example,
                "is_executable": is_executable,
            }
        docs[k] = {
            "funcdef": method["funcdef"],
            "description": shortdesc,
            "long_description": desc,
            "example": _example,
            "params": params,
            "raises": raises,
            "returns": r,
        }
    return docs


def write_docstrings(
    filepath: str, docstrings: Dict[str, ParsedDocstring], indent: int | None = None
):
    """Write the docstrings json to a file

    .. code-block:: python

      from docdundee.docparser import (
        parse_functions,
        parse_docstrings,
        write_docstrings
      )
      from docdundee.interfaces import MethodsDict, ParsedDocstring

      parsed_funcs: MethodsDict = parse_functions("mypackage.myfile")
      docs: ParsedDocstring = parse_docstrings(parsed_funcs)
      write_docstrings("../../docsite/src/assets/doc/api/index.json", doc, 4)

    :param filepath: the file path
    :type filepath: str
    :param json_data: the json data
    :type json_data: Dict[str, Any] | Array[Any]
    :param indent: the indentation level, defaults to None
    :type: int | None
    """
    makedirs(path.dirname(filepath), exist_ok=True)
    with open(filepath, "w") as filetowrite:
        filetowrite.write(json.dumps(docstrings, indent=indent))


def _rst_to_html(txt: str) -> str:
    return (
        publish_parts(
            txt,
            settings_overrides={"output_encoding": "unicode"},
            writer_name="html",
        )["body"]
        .replace("<p>", "")
        .replace("</p>", "")
    )


def _parse_nodes(source: str, nodes: List[ast.AST], private=False) -> MethodsDict:
    i = 0
    methods: MethodsDict = {}  # type: ignore
    for node in nodes:
        if (
            isinstance(node, ast.FunctionDef)
            or isinstance(node, ast.AsyncFunctionDef)
            or isinstance(node, ast.ClassDef)
        ):
            if private is False:
                if node.name.startswith("_"):
                    continue
            s = ast.get_source_segment(source, node)
            # print("\n---", str(s).split('"""', 1)[0])
            d = str(s).split('"""', 1)[0].strip()
            methods[node.name] = {
                "funcdef": d[:-1],
                "docstring": parse(ast.get_docstring(node) or ""),
            }
        i += 1
    return methods


def _parse_long_description(
    desc: str | None, exec_examples: bool
) -> Tuple[str | None, str | None, bool]:
    if desc is None:
        return (None, None, False)
    sl = desc.split(".. code-block:: python\n\n")
    if len(sl) < 2:
        return (desc, None, False)
    _desc = sl[0]
    _ex = sl[1].replace("  ", "")
    execute = exec_examples
    if _ex.startswith("# exec"):
        execute = True
        _ex = _ex.replace("# exec\n", "")
    elif _ex.startswith("# noexec"):
        execute = False
        _ex = _ex.replace("# noexec\n", "")
    return (_desc, _ex, execute)
