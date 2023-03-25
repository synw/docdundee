import { useApi } from "restmix";
import { ParsedDocstring } from "./interfaces";



/**
 * The docloader composable. To load markdown and docstrings
 * from files
 *
 * @param {ReturnType<typeof useApi>} api
 * @returns {{ loadDocstrings: (routePath: string) => any; loadMarkdown: (filepath: string) => any; }}
 */
const useDocloader = (api: ReturnType<typeof useApi>) => {

  /**
   * Load docstrings from a file
   *
   * @async
   * @param {(string | null | undefined)} routePath
   * @returns {Promise<Record<string, ParsedDocstring>>}
   */
  const loadDocstrings = async (routePath: string | null | undefined): Promise<Record<string, ParsedDocstring>> => {
    let url = `/doc/docstrings.json`;
    if (routePath) {
      url = `/doc${routePath}/docstrings.json`
    }
    const res = await api.get<Record<string, ParsedDocstring>>(url);
    if (res.ok) {
      return res.data
    }
    throw new Error(`${res.status}: ${res.data}`)
  }

  /**
   * Load markdown from a file
   *
   * @async
   * @param {string} filepath
   * @returns {Promise<string>}
   */
  const loadMarkdown = async (filepath: string): Promise<string> => {
    let url = `/doc${filepath}?raw`;
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