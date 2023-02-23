from typing import Dict, List, TypedDict
from docstring_parser import Docstring


MethodsDict = TypedDict("name", {"funcdef": str, "docstring": Docstring})
FileSourcesDict = TypedDict("name", {"source": str})


class DocstringsDict(TypedDict):
    """A

    :param TypedDict: _description_
    :type TypedDict: _type_
    """


class CodeBlockRaises(TypedDict):
    """An exception raises parameter"""

    description: str
    ptype: str


class CodeBlockParam(TypedDict):
    """A parameter in a code block, like a function"""

    description: str
    ptype: str
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
