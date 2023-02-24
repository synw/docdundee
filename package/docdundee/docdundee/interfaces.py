from typing import Dict, List, TypedDict
from docstring_parser import Docstring


class DocstringsDict(TypedDict):
    """A named code block docstrings dict

    .. code-block:: python

      from docdundee.docparser import parse_functions
      from docdundee.interfaces import DocstringsDict

      docstrings: DocstringsDict = parse_functions("docdundee.docparser")
      str(docstrings)


    :param funcdef: the code definition block
    :type funcdef: str
    :param docstring: the parsed docstring object
    :type docstring: Docstring
    """

    funcdef: str
    docstring: Docstring


class FileSourcesDict(TypedDict):
    """A files sources dict

    :param source: the source code
    :type source: str
    """

    source: str


class CodeBlockRaises(TypedDict):
    """An exception raises parameter"""

    description: str
    type: str


class CodeBlockParam(TypedDict):
    """A parameter in a code block, like a function

    .. code-block:: python

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

    :param code: the code
    :type code: str
    :param is_executable: can be executed
    :type is_executable: bool
    """

    code: str
    is_executable: bool


class ParsedDocstring(TypedDict):
    """A parsed docstring representation

    :param funcdef: the function or class definition
    :type funcdef: str
    :param description: the docstring short description
    :type description: str
    :param long_description: the docstring long description
    :type description: str
    :param example: the example embeded in the docstring long description
    :type example: str
    :param params: the function or class parameters
    :type params: Dict[str, CodeBlockParam]
    :param raises: a list of potential exceptions
    :type raises: List[CodeBlockRaises]
    :param returns: the optional return value description
    :type returns: Dict[str, str] | None
    """

    funcdef: str
    description: str
    long_description: str | None
    example: ExampleParam | None
    params: Dict[str, CodeBlockParam]
    raises: List[CodeBlockRaises]
    returns: Dict[str, str] | None
