interface CodeBlockRaises {
  description: string;
  type: string;
}

interface CodeBlockParam {
  description: string;
  type: string;
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
  extra_examples?: Array<ExampleParam>;
  extra_md?: {
    header: string,
    footer: string
  }
}

interface DirNavItem {
  name: string;
  title: string;
  url: string;
  docpath: string;
}

interface NavItem extends DirNavItem {
  type: "markdown" | "component"
}

interface DirNavListing extends DirNavItem {
  content: Array<NavItem>;
  docstrings: Array<DirNavItem>;
  children?: Array<DirNavListing>;
}

interface RouteDataPayload {
  name: string;
  hasMarkdown: boolean;
  hasDocstring: boolean;
  markdown: string;
  docstring: ParsedDocstring;
}

export {
  CodeBlockParam,
  CodeBlockRaises,
  ExampleParam,
  ParsedDocstring,
  DirNavItem,
  NavItem,
  DirNavListing,
  RouteDataPayload,
}