import { ParsedDocstring } from "@/interfaces";
import { examplesExtension } from "@/conf";


const useDocloader = () => {
  const tryLoadExtraExample = async (cat: string, name: string): Promise<{ code: string, is_executable: boolean } | undefined> => {
    let code = "";
    let exec = false;
    try {
      const data = await import(`../assets/doc/${cat}/examples/${name}.${examplesExtension}?raw`);
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

  const loadDocstrings = async (cat: string | null | undefined): Promise<ParsedDocstring> => {
    let url = `../assets/doc/docstrings.json`;
    if (cat) {
      url = `../assets/doc/${cat}/docstrings.json`
    }
    const data = await import(url,  /* @vite-ignore */);
    return data
  }

  const loadMarkdown = async (cat: string | null | undefined, filename: string): Promise<string> => {
    let url = `../assets/doc/${filename}?raw`;
    if (cat) {
      url = `../assets/doc/${cat}/${filename}?raw`
    }
    const data = await import(url,  /* @vite-ignore */);
    return data.default
  }

  return {
    loadDocstrings,
    tryLoadExtraExample,
    loadMarkdown,
  }
}

export { useDocloader }