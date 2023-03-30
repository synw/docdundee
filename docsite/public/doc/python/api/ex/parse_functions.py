# exec
from typing import Dict
import json
from docdundee.docparser import parse_functions, parse_docstrings
from docdundee.interfaces import DocstringsDict, ParsedDocstring

"""
Parse the datetime package functions
"""
parsed_methods: DocstringsDict = parse_functions("datetime", mode="private")
docs: Dict[str, ParsedDocstring] = parse_docstrings(parsed_methods)
print(json.dumps(docs["timedelta"], indent=4))
