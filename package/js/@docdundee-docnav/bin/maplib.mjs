import { default as fs } from "fs";


function parseNode(navdata, run, baseUrl) {
  //console.log("Parsing", navdata.name);
  let sp = "";
  let i = run - 2;
  while (i > 0) {
    sp = sp + "    ";
    --i
  }
  if (run > 1) {
    const link = `[${navdata.title}](${baseUrl + navdata.url})`;
    console.log(sp, "-", link);
  }
  //const dirs = [];
  for (const line of navdata.content) {
    const link = `[${line.title}](${baseUrl + line.url})`;
    if (line.type !== "directory") {
      console.log(sp + "    -", link);
    }
  }
  for (const node of navdata.children) {
    parseNode(node, (run + 1), baseUrl)
  }
  //return navdata
}


function createMdMap(basePath, baseUrl) {
  console.log(`<details>\n<summary>:books: Read the <a href="${baseUrl}">documentation</a></summary>\n`);
  const rawdata = fs.readFileSync(basePath + '/nav.json');
  const navdata = JSON.parse(rawdata);
  parseNode(navdata, 1, baseUrl)
  console.log("\n</details>")
}

export { createMdMap }