interface CodeBlockRaises {
  description: string;
  type: string;
}

interface CodeBlockParam {
  description: string;
  ptype: string;
  default: string | null;
}

interface ExampleParam {
  code: string;
  is_executable: boolean;
}

interface ParsedDocstring {
  funcdef: string;
  description: string;
  long_description: string | null;
  example: ExampleParam | null;
  params: Record<string, CodeBlockParam>;
  raises: Array<CodeBlockRaises>;
  returns: Record<string, string> | null;
}

export { CodeBlockParam, CodeBlockRaises, ExampleParam, ParsedDocstring }