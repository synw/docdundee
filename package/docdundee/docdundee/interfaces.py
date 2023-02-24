from typing import Dict, List, TypedDict
from docstring_parser import Docstring


class DocstringsDict(TypedDict):
    """A named code block docstrings dict

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
    """A parameter in a code block, like a function"""

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
    """A parsed docstring representation"""

    funcdef: str
    description: str
    long_description: str | None
    example: ExampleParam | None
    params: Dict[str, CodeBlockParam]
    raises: List[CodeBlockRaises]
    returns: Dict[str, str] | None
