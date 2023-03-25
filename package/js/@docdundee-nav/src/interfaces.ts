/**
 * A code exception or error description
 * 
 * @example 
 * ```ts
 * const err: CodeBlockRaises = {
 *   description: "an error occured",
 *   default: "ValueError",
 * }
 * ```
 */
interface CodeBlockRaises {
  /** the description of the exception or error */
  description: string;
  /** the type of the exception or error */
  type: string;
}

/**
 * A parameter representation
 *
 * @example 
 * ```ts
 * const param: CodeBlockParam = {
 *   description: "a function param",
 *   type: "string",
 *   default: null,
 * }
 * ```
 */
interface CodeBlockParam {
  /** the description of the parameter */
  description: string;
  /** the type of the parameter */
  type: string;
  /** the default value of the parameter */
  default: string | null;
}


/**
 * An example representation
 *
 * @example 
 * ```ts
 * const example: ExampleParam = {
 *   code: 'foo=3;\nbar=4;',
 *   is_executable: false,
 *   description: "the example description",
 * }
 * ```
 */
interface ExampleParam {

  /** the example code */
  code: string;
  /** Is the example executable */
  is_executable: boolean;
  /** The exemple optionnal description */
  description?: string;
}

/**
 * A parsed docstring representation
 * 
 * @example 
 * ```ts
 * const docstring: ParsedDocstring = {
 *   funcdef: "def my_func() -> str",
 *   description: "the short description",
 *   long_description: "the long description if any",
 *   example: "txt = my_func()\nprint(txt)",
 *   params: [],
 *   returns: {"str": "a text"},
 * }
 * ```
 */
interface ParsedDocstring {
  /** the code block definition part */
  funcdef: string;
  /** the code block short description */
  description: string;
  /** the code block long description */
  long_description: string | null;
  /** the code block example if any */
  example: ExampleParam | null;
  /** the code block parameters */
  params: Record<string, CodeBlockParam>;
  /** the errors possibly raised by the code block */
  raises: Array<CodeBlockRaises>;
  /** the return value of a code block */
  returns: Record<string, string> | null;
  /** extra examples for a code block doc if any */
  extra_examples?: Array<ExampleParam>;
  /** extra markdown for the code block doc if any */
  extra_md?: {
    header: string,
    footer: string
  }
}

/**
 * A directory item representation
 * 
 * @example 
 * ```ts
 * const item: BaseNavItem = {
 *   name: "foo_bar",
 *   title: "Foo bar",
 *   url: "/foo/bar",
 *   docpath: "foo/1.bar.md"
 * }
 * ```
 */
interface BaseNavItem {
  /** the name of the item */
  name: string;
  /** the title of the item */
  title: string;
  /** the relative url of the item */
  url: string;
  /** the path of the item */
  docpath: string;
}


/**
 * A directory nav item description
 * 
 * @generator interface DirNavItem extends BaseNavItem
 * 
 * @example 
 * ```ts
 * const diritem: DirNavItem = {
 *   name: "a_dir",
 *   title: "A dir",
 *   url: "/a_dir",
 *   docpath: "a_dir",
 *   has_md_index: true,
 * }
 * ```
 */
interface DirNavItem extends BaseNavItem {
  has_md_index: boolean;
}

/**
 * Representation of a navigation node
 * 
 * @generator interface NavItem extends BaseNavItem
 * 
 * @example 
 * ```ts
 * const item: NavItem = {
 *   name: "foo_bar",
 *   title: "Foo bar",
 *   url: "/foo/bar",
 *   docpath: "foo/1.bar.md",
 *   type: "markdown",
 * }
 * ```
 */
interface NavItem extends BaseNavItem {
  /** the type of the node */
  type: "markdown" | "component" | "directory"
}

/**
 * A directory listing of navigation nodes
 * 
 * @generator interface DirNavListing extends DirNavItem
 * 
 * @example 
 * ```ts
 * const item: DirNaListing = {
 *   name: "a_dir",
 *   title: "A dir",
 *   url: "/a_dir",
 *   docpath: "a_dir",
 *   has_md_index: true,
 *   content: [
 *     {
 *        name: "foobar",
 *        title: "Foobar",
 *        url: "/a_dir/foobar",
 *        docpath: "a_dir/1.foobar.md",
 *        type: "markdown",
 *     }
 *   ],
 *   children: [],
 * }
 * ```
 */
interface DirNavListing extends DirNavItem {
  content: Array<NavItem>;
  docstrings: Array<DirNavItem>;
  children?: Array<DirNavListing>;
}

/**
 * A payload of route info data for an url
 * 
 * @example 
 * ```ts
 * const payload: RouteDataPayload = {
 *   name: "foo_bar",
 *   title: "Foo bar",
 *   hasMarkdown: true,
 *   hasDocstring: false,
 *   markdown: "# Markdown\n\nContent"
 *   docstring: {},
 *   node: {},
 *   autoindex: false,
 * }
 * ```
 */
interface RouteDataPayload {
  /** the name of the route page (last segment of the url) */
  name: string;
  /** the title of the route page */
  title: string;
  /** does this url has markdown content */
  hasMarkdown: boolean;
  /** does this url has docstring content */
  hasDocstring: boolean;
  /** the markdown content payload of the route if any */
  markdown: string;
  /** the docstring content payload of the route if any */
  docstring: ParsedDocstring;
  /** the navigation node, passed for convenience */
  node: DirNavListing;
  /** If the node is a directory is it necessary to autoindex it */
  autoIndex: boolean;
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