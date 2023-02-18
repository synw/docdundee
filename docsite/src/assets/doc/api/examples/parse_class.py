# exec
from typing import Dict
import json
from docdundee.docparser import parse_class, parse_docstrings
from docdundee.interfaces import MethodsDict, ParsedDocstring

"""
Parse the datetime date methods
"""
# try replacing date by tzinfo
parsed_methods: MethodsDict = parse_class("datetime", "date")
docs: Dict[str, ParsedDocstring] = parse_docstrings(parsed_methods)
f"<pre>{json.dumps(docs, indent=4)}</pre>"