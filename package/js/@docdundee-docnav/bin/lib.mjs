import { default as path } from "path";
import { default as fs } from "fs";
import { default as dirTree } from "directory-tree";

/** Remove the number prefix from a name */
function _unumName(name) {
  let re = /^\d+\./;
  return name.replace(re, "");
}

function _unumNameUrl(url) {
  let re = /[\d+\.]/g;
  return url.replace(re, "");
}

function _getTitle(name) {
  // replace spaces
  let s = name.split("_").join(" ");
  // uppercase first letter
  s = s[0].toUpperCase() + s.slice(1);
  return s
}

function _readFilesInDir(dir, url, docpath) {
  const content = [];
  let hasDocstrings = false;
  let hasExamples = false;
  let hasExtraMd = false;
  let hasMdIndex = false;
  //console.log("DIR", dir)
  fs.readdirSync(dir).forEach((filename) => {
    // console.log(file);
    const filepath = path.join(dir, filename);
    const isDir = fs.statSync(filepath).isDirectory();
    //console.log(isDir, filename);
    if (isDir) {
      if (filename != "ex") {
        if (filename == "md") {
          hasExtraMd = true;
        }
      } else {
        hasExamples = true
      }
    } else {
      const isDir = filename.endsWith(".dir");
      if (isDir) {
        const n = _unumName(filename).replace(".dir", "");
        content.push({
          name: n,
          title: _getTitle(n),
          filename: filename,
          url: `${_unumNameUrl(url)}/${n}`,
          docpath: `${docpath}/${filename}`,
          type: "directory"
        })
      }
      const isMarkdown = filename.endsWith(".md");
      if (isMarkdown) {
        if (filename == "index.md") {
          hasMdIndex = true
        } else {
          const n = _unumName(filename).replace(".md", "");
          content.push({
            name: n,
            title: _getTitle(n),
            filename: filename,
            url: `${_unumNameUrl(url)}/${n}`,
            docpath: `${docpath}/${filename}`,
            type: "markdown"
          })
        }
      } else {
        if (filename == "docstrings.json") {
          hasDocstrings = true
        }
        const isVue = filename.endsWith(".cmp");
        if (isVue) {
          const n = _unumName(filename).replace(".cmp", "");
          content.push({
            name: n,
            title: _getTitle(n),
            filename: filename,
            url: `${_unumNameUrl(url)}/${n}`,
            docpath: `${docpath}/${filename}`,
            type: "component"
          })
        }
      }
    }
  });
  return { content, hasDocstrings, hasExamples, hasExtraMd, hasMdIndex }
}

function linkType(data, typename, typelink) {
  const regex = new RegExp(`(?<!\\b</a>|/\\b)\\b${typename}\\b`, 'g');
  const replacement = `<a href="javascript:openLink('${typelink}')">${typename}</a>`;
  return data.replace(regex, replacement);
}

function _parseType(data, types, lang) {
  if (lang == "python") {
    if (["str", "int", "float", "bool"].includes(data)) {
      return data
    }
  } else if (["javascript", "typescript"].includes(lang)) {
    if (["string", "number", "boolean"].includes(data)) {
      return data
    }
  }
  if (data) {
    for (const typename in types) {
      data = linkType(data, typename, types[typename])
    }
  }
  return data
}

function processDocstrings(dir, url, hasTypes, types, parseTypes) {
  const rawdata = fs.readFileSync(dir + '/docstrings.json');
  const data = JSON.parse(rawdata);
  const dsnames = Object.keys(data);
  const dsl = [];
  dsnames.forEach((d) => {
    dsl.push({
      name: d,
      title: _getTitle(d),
      url: `${url}/${d}`,
    });
    if (parseTypes && hasTypes) {
      const ds = data[d];
      const langs = Object.keys(types);
      //console.log("PARAMS", data[d].params)
      for (const [name, content] of Object.entries(data[d].params)) {
        //console.log("N", name, "D", content)
        //console.log("------- Param", name, "-", content.type)
        if (langs.includes(ds.lang)) {
          const lt = types[ds.lang];
          data[d].params[name].type = _parseType(content.type, lt, ds.lang);
        }
      }
      if (data[d].returns) {
        if (langs.includes(ds.lang)) {
          const lt = types[ds.lang];
          data[d].returns.type = _parseType(data[d].returns.type, lt, ds.lang)
        }
      }
    }
  });
  if (hasTypes) {
    fs.writeFileSync(dir + "/docstrings.json", JSON.stringify(data), { encoding: 'utf8', flag: 'w' })
    console.log("Updated", dir + "/docstrings.json", "with html types")
  }
  return dsl
}

function _parseExample(ex) {
  const isExecutable = ex.startsWith("# exec");
  let code = ex;
  if (isExecutable) {
    code = ex.replace("# exec\n", "")
  }
  return {
    isExecutable,
    code
  }
}

function updateDocstringsWithExtraMd(dirpath) {
  let md = [];
  fs.readdirSync(dirpath + "/md").forEach((filename) => {
    const rawcode = fs.readFileSync(dirpath + "/md/" + filename, "utf-8");
    md.push({
      filename: filename,
      content: rawcode,
    });
  });
  // open docstrings file and update with the extra markdown
  const data = fs.readFileSync(dirpath + "/docstrings.json");
  const ds = JSON.parse(data);
  //console.log("DS", ds)
  for (const _md of md) {
    //console.log("e", ex.name, ds[ex.name]);
    let name = "";
    let isFooter = true;
    if (_md.filename.startsWith("h.")) {
      name = _unumName(_md.filename);
      isFooter = false
    } else {
      name = _md.filename.split(".").slice(-2)[0];
    }
    if (!("extra_md" in ds[name])) {
      ds[name]["extra_md"] = { header: "", footer: "" }
    }
    if (isFooter) {
      ds[name].extra_md.footer = _md.content;
    } else {
      ds[name].extra_md.header = _md.content;
    }
  }
  fs.writeFileSync(dirpath + "/docstrings.json", JSON.stringify(ds), { encoding: 'utf8', flag: 'w' })
  console.log("Updated", dirpath + "/docstrings.json", "with extra markdown")
}

function updateDocstringsWithExtraExamples(dirpath) {
  const examples = [];
  fs.readdirSync(dirpath + "/ex").forEach((filename) => {
    const rawcode = fs.readFileSync(dirpath + "/ex/" + filename, "utf-8");
    const { isExecutable, code } = _parseExample(rawcode);
    examples.push({
      name: filename.split(".").slice(-2)[0],
      code: code,
      isExecutable: isExecutable,
    });
  });
  // open docstrings file and update with the examples
  const data = fs.readFileSync(dirpath + "/docstrings.json");
  const ds = JSON.parse(data);
  // console.log("DS", ds)
  for (const ex of examples) {
    //console.log("e", ex.name, ds[ex.name]);
    ds[ex.name]["extra_examples"] = [{
      code: ex.code,
      is_executable: ex.isExecutable
    }];
  }
  fs.writeFileSync(dirpath + "/docstrings.json", JSON.stringify(ds, null, "  "), { encoding: 'utf8', flag: 'w' })
  console.log("Updated", dirpath + "/docstrings.json", "with extra examples")
}

function parseDir(dirpath, url, docpath, hasTypes, types, parseTypes) {
  console.log("Parsing dir", dirpath, url);
  let { content, hasDocstrings, hasExamples, hasExtraMd, hasMdIndex } = _readFilesInDir(dirpath, url, docpath);
  let data = {
    content: content,
    docstrings: [],
    hasMdIndex: hasMdIndex,
  }
  if (hasDocstrings) {
    data.docstrings = processDocstrings(dirpath, url, hasTypes, types, parseTypes)
    // check extra examples
    if (hasExamples) {
      updateDocstringsWithExtraExamples(dirpath)
    }
    if (hasExtraMd) {
      updateDocstringsWithExtraMd(dirpath)
    }
  }
  return data
}

function reorderFirstLevel(dirnav) {
  const children = [];
  for (const elem of dirnav.content) {
    if (elem.type == "directory") {
      const dir = dirnav.children.find((d) => d.name == elem.name)
      children.push(dir)
    }
  }
  dirnav.children = children;
  return dirnav
}

function getTypeUrls(dir) {
  let data = {};
  let _hasTypes = false;
  try {
    const rawdata = fs.readFileSync(dir + '/type_urls.json', 'utf-8');
    _hasTypes = true;
    data = JSON.parse(rawdata)
  } catch (e) { }
  return {
    hasTypes: _hasTypes,
    types: data,
  }
}

function saveNav(dirpath, data) {
  const filename = dirpath + "/nav.json";
  fs.writeFileSync(filename, JSON.stringify(data), { encoding: 'utf8', flag: 'w' });
  console.log("Saved", filename)
}

const onParseDirectory = (
  item,
  basePath,
  hasTypes,
  types,
  parseTypes,
) => {
  if (item.type == "directory") {
    //console.log(item.name);
    item.name = _unumName(item.name);
    item.title = _getTitle(item.name);
    const docpath = item.path.replace(basePath, "");
    const url = _unumNameUrl(docpath);
    const dirData = parseDir(item.path, url, docpath, hasTypes, types, parseTypes);
    item.content = dirData.content;
    item.docstrings = dirData.docstrings;
    item.url = url;
    item.has_md_index = dirData.hasMdIndex;
  }
  item.docpath = item.path.replace(basePath, "");
  delete item.path
  delete item.type
};

function parseDirTree(basePath, parseTypes) {
  let hasTypes = false;
  let types = {};
  if (parseTypes) {
    const obj = getTypeUrls(basePath);
    hasTypes = obj.hasTypes;
    types = obj.types;
  }
  //console.log("Type urls", hasTypes, types)
  console.log("Parsing dir", basePath);
  const dt = dirTree(
    basePath,
    {
      extensions: /\.()$/,
      attributes: ["type"],
      exclude: /(md|ex)$/,
    },
    (item, path) => onParseDirectory(item, basePath, hasTypes, types, parseTypes),
    (item, path) => onParseDirectory(item, basePath, hasTypes, types, parseTypes)
  );
  return reorderFirstLevel(dt)
}

export { saveNav, parseDirTree }