import { reactive, ref, Ref } from "vue";
import { RouteLocationNormalizedLoaded } from "vue-router";
import { DirNavListing, ParsedDocstring, RouteDataPayload } from "@/interfaces";
import { useDocloader } from "@/composables/loader";


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

const useNav = (_docloader: typeof useDocloader) => {
  const docloader = _docloader();
  const isReady = ref(false);
  let tree = reactive({
    root: {} as DirNavListing,
    sections: {} as Record<string, DirNavListing>,
  });

  const _listFromDir = async (cat?: string): Promise<DirNavListing> => {
    let url = "../assets/doc/index.json";
    if (cat) {
      url = `../assets/doc/${cat}/index.json`
    }
    const data = await import(url,  /* @vite-ignore */);
    //console.log("DATA", data.default)
    return data.default
  }

  const init = async () => {
    const root = await _listFromDir();
    const sections: Record<string, DirNavListing> = {};
    for (const dir of root.dirs) {
      const cat = await _listFromDir(dir.name);
      sections[dir.name] = cat
    }
    tree.root = root;
    tree.sections = sections;
    isReady.value = true;
  };

  const loadFromRoute = async (route: Ref<RouteLocationNormalizedLoaded>): Promise<RouteDataPayload> => {
    const { cat, name } = getRouteParams(route);
    //console.log("ROUTEp", cat, name)
    let node = tree.root
    if (cat) {
      node = tree.sections[cat]
    }
    let hasMarkdown = false;
    let hasDocstring = false;
    let markdown = "";
    if (node.md.length > 0) {
      let mdNode = node.md.find(n => n.name == name);
      //let filename = name + ".md";
      if (mdNode) {
        hasMarkdown = true;
        markdown = await docloader.loadMarkdown(cat, mdNode.filename);
      }
    }
    let docstring = {} as ParsedDocstring;
    if (node.docstrings.length > 0) {
      const _docstring = await docloader.loadDocstrings(cat);
      const _ds = _docstring[name];
      if (_ds) {
        hasDocstring = true;
        docstring = _ds;
      }
    }
    return {
      name: name,
      hasMarkdown: hasMarkdown,
      hasDocstring: hasDocstring,
      markdown: markdown,
      docstring: docstring,
    }
  };

  return {
    init,
    tree,
    loadFromRoute,
    isReady,
  }
}

export { useNav }