import { ParsedDocstring } from "@/interfaces";
import { Ref } from "vue";
import { RouteLocationNormalizedLoaded } from "vue-router";

function getRouteParams(route: Ref<RouteLocationNormalizedLoaded>): {
  cat: string | null;
  name: string;
} {
  let name: string;
  let cat: string | null = null;
  if (!("id" in route.value.params)) {
    throw new Error("No id in route, can not load data")
  }
  name = route.value.params["id"].toString();
  if ("category" in route.value.params) {
    cat = route.value.params["category"].toString();
  }
  return {
    cat,
    name
  }
}

const useLoader = () => {
  const _loadExtraExample = async (cat: Ref<string>, name: Ref<string>): Promise<{ code: string, is_executable: boolean } | undefined> => {
    let code = "";
    let exec = false;
    try {
      const data = await import(`../assets/doc/${cat.value}/examples/${name.value}.py?raw`);
      code = data.default;
      // check executable code mark
      if (code.startsWith("# exec")) {
        exec = true;
        code = code.replace("# exec\n", "")
      }
    } catch (e) {
      return undefined
    }
    return { code: code, is_executable: exec }
  }

  const _loadDocstring = async (cat: string | null | undefined, name: string): Promise<{ name: string, docstring: ParsedDocstring } | null> => {
    try {
      let url = `../assets/doc/${name}.json`;
      if (cat) {
        url = `../assets/doc/${cat}/index.json`
      }
      const data = await import(url);
      return { name: name, docstring: data[name] };
    } catch (e) {
      return null
    }
  }

  async function _loadMarkdown(name: string): Promise<string | null> {
    try {
      const data = await import(`../assets/doc/${name}.md?raw`);
      return data.default
    } catch (e) {
      return null
    }
  }

  const loadDocstringFromRoute = async (route: Ref<RouteLocationNormalizedLoaded>):
    Promise<{ name: string, docstring: ParsedDocstring } | null> => {
    const { cat, name } = getRouteParams(route);
    return await _loadDocstring(cat, name)
  }

  async function load(route: Ref<RouteLocationNormalizedLoaded>) {
    const { cat, name } = getRouteParams(route);
    let type: "docstring" | "markdown";
    //let d
    if (cat) {
      const ds = await _loadDocstring(cat, name);
      if (ds) {
        type = "docstring";

        return {
          name,
          cat,
          type
        }
      }
    }
    const hasMarkdown = await _loadMarkdown(name);
    if (!hasMarkdown) {
      throw new Error("No document found")
    }
    type = "markdown";
    return {
      name,
      cat,
      type
    }
  }

  return {
    loadDocstringFromRoute,
    load,
  }
}

export { useLoader }