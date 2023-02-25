import { useApi } from "restmix";
import { ParsedDocstring } from "./interfaces";


const useDocloader = (api: ReturnType<typeof useApi>) => {

  const loadDocstrings = async (routePath: string | null | undefined): Promise<Record<string, ParsedDocstring>> => {
    let url = `/doc/docstrings.json`;
    if (routePath) {
      url = `/doc/${routePath}/docstrings.json`
    }
    const res = await api.get<Record<string, ParsedDocstring>>(url);
    if (res.ok) {
      return res.data
    }
    throw new Error(`${res.status}: ${res.data}`)
  }

  const loadMarkdown = async (routePath: string | null | undefined, filename: string): Promise<string> => {
    let url = `/doc/${filename}?raw`;
    if (routePath) {
      url = `/doc/${routePath}/${filename}?raw`
    }
    const res = await api.get<string>(url);
    if (res.ok) {
      return res.text
    }
    throw new Error(`${res.status}: ${res.data}`)
  }

  return {
    loadDocstrings,
    loadMarkdown,
  }
}

export { useDocloader }