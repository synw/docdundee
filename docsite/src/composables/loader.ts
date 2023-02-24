import { ParsedDocstring } from "@/interfaces";
import { useApi } from "restmix";


const useDocloader = (api: ReturnType<typeof useApi>) => {

  const loadDocstrings = async (cat: string | null | undefined): Promise<Record<string, ParsedDocstring>> => {
    let url = `/doc/docstrings.json`;
    if (cat) {
      url = `/doc/${cat}/docstrings.json`
    }
    const res = await api.get<Record<string, ParsedDocstring>>(url);
    if (res.ok) {
      return res.data
    }
    throw new Error(`${res.status}: ${res.data}`)
  }

  const loadMarkdown = async (cat: string | null | undefined, filename: string): Promise<string> => {
    let url = `/doc/${filename}?raw`;
    if (cat) {
      url = `/doc/${cat}/${filename}?raw`
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