from typing import Dict, List, Literal, TypedDict
from docstring_parser import Docstring


class DocstringsDict(TypedDict):
    """A named code block docstrings dict

    Refer to the <a href="https://rr-.github.io/docstring_parser/docstring_parser.Docstring.html">Docstring</a> documentation from <a href="https://github.com/rr-/docstring_parser/tree/master">docstring_parser</a> library

    Args:
        funcdef (str): the code definition block
        docstring (Docstring): the parsed docstring object

    Example:
        ::

        from docdundee.docparser import parse_functions
        from docdundee.interfaces import DocstringsDict

        docstrings: DocstringsDict = parse_functions("docdundee.docparser")
        str(docstrings)
    """

    funcdef: str
    docstring: Docstring


class FileSourcesDict(TypedDict):
    """A dict representing a file's source

    Args:
        source (str): the source code
    """

    source: str


class CodeBlockRaises(TypedDict):
    """An exception raised by a code block description

    Args:
        description (str): the description of the exception
        type (str): the type of the exception
    """

    description: str
    type: str


class CodeBlockParam(TypedDict):
    """A parameter in a code block, like a function

    Args:
        description (str): the description of the code block
        type (str): type of the code block: "function" or "class"
        default: (str | None): the default value of the parameter. Default to `None`

    Example:
        ::

        # noexec
        from docdundee.interfaces import CodeBlockParam

        params: CodeBlockParam = {}
        params["myparam"] = {
            description: "the param description",
            type: "bool",
            default: False
        }
    """

    description: str
    type: str
    default: str | None


class ExampleParam(TypedDict):
    """An example in a code block

    Args:
        code (str): the source code of the example
        description (str): the description of the example
        is_executable (bool): is the example executable

    Example:
        ::

        from docdundee.interfaces import ExampleParam

        example = ExampleParam(
            code = 'print("hello")',
            description = "the example description",
            is_executable = True,
        )
        print(example)
    """

    code: str
    is_executable: bool
    description: str


class ParsedDocstring(TypedDict):
    """A parsed docstring representation

    Args:
        funcdef (str): the function or class definition
        description (str): the docstring short description
        long_description: the docstring long description
        example: the example embeded in the docstring long description
        params (Dict[str, CodeBlockParam]): the function or class parameters
        raises (List[CodeBlockRaises]): a list of exceptions descriptions raised by the code block
        returns (Dict[str, str] | None): the optional return value description

    Example:
        Get a parsed docstring::

            from typing import Dict
            import json
            from docdundee.docparser import parse_class, parse_docstrings
            from docdundee.interfaces import DocstringsDict, ParsedDocstring

            parsed_methods: DocstringsDict = parse_class("datetime", "date")
            docs: Dict[str, ParsedDocstring] = parse_docstrings(parsed_methods)
            docstring: ParsedDocstring = docs[list(docs.keys())[0]]
            f"<pre>{json.dumps(docstring, indent=4)}</pre>"
    """

    funcdef: str
    description: str
    long_description: str | None
    example: ExampleParam | None
    params: Dict[str, CodeBlockParam]
    raises: List[CodeBlockRaises]
    returns: Dict[str, str] | None


NodeParsingMode = Literal["all", "public", "init"]
