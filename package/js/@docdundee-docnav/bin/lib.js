import { default as path } from "path";
import { default as fs } from "fs";
import { default as dirTree } from "directory-tree";


function _getMdRawFilename(name) {
  // remove extensions
  return name.split(".")[1];
}

function _getTitle(name) {
  // replace spaces
  let s = name.split("_").join(" ");
  // uppercase first letter
  s = s[0].toUpperCase() + s.slice(1);
  return s
}

function _readFilesInDir(dir, url) {
  const md = [];
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
      if (filename != "examples") {
        if (filename == "md") {
          hasExtraMd = true;
        }
      } else {
        hasExamples = true
      }
    } else {
      const isMarkdown = filename.endsWith(".md");
      if (isMarkdown) {
        if (filename == "index.md") {
          hasMdIndex = true
        } else {
          const n = _getMdRawFilename(filename);
          md.push({
            name: n,
            title: _getTitle(n),
            filename: filename,
            url: `${url}/${n}`
          })
        }
      } else {
        if (filename == "docstrings.json") {
          hasDocstrings = true
        }
      }
    }
  });
  return { md, hasDocstrings, hasExamples, hasExtraMd, hasMdIndex }
}

function listDocstrings(dir, url) {
  const rawdata = fs.readFileSync(dir + '/docstrings.json');
  const data = JSON.parse(rawdata);
  const dsnames = Object.keys(data)
  const ds = [];
  dsnames.forEach((d) => {
    ds.push({
      name: d,
      title: _getTitle(d),
      url: `${url}/${d}`,
    });
    // check examples
  });
  return ds
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
      name = _getMdRawFilename(_md.filename);
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
  fs.readdirSync(dirpath + "/examples").forEach((filename) => {
    const rawcode = fs.readFileSync(dirpath + "/examples/" + filename, "utf-8");
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
  //console.log("DS", ds)
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

function parseDir(dirpath, url) {
  //console.log("Parsing dir", dir);
  let { md, hasDocstrings, hasExamples, hasExtraMd, hasMdIndex } = _readFilesInDir(dirpath, url);
  let data = {
    md: md,
    docstrings: [],
    hasMdIndex: hasMdIndex,
  }
  if (hasDocstrings) {
    data.docstrings = listDocstrings(dirpath, url)
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

function saveNav(dirpath, data) {
  const filename = dirpath + "/nav.json";
  fs.writeFileSync(filename, JSON.stringify(data), { encoding: 'utf8', flag: 'w' });
  console.log("Saved", filename)
}

const onParseDirectory = (
  item,
  basePath,
) => {
  if (item.type == "directory") {
    item.title = _getTitle(item.name);
    const url = item.path.replace(basePath, "");
    const dirData = parseDir(item.path, url);
    item.md = dirData.md;
    item.docstrings = dirData.docstrings;
    item.url = url;
    item.hasMdIndex = dirData.hasMdIndex;
  }
  delete item.path
  delete item.type
};

function parseDirTree(basePath) {
  return dirTree(
    basePath,
    {
      extensions: /\.()$/,
      attributes: ["type"],
      exclude: /(md|examples)$/,
    },
    (item, path) => onParseDirectory(item, basePath),
    (item, path) => onParseDirectory(item, basePath)
  );
}

export { saveNav, parseDirTree }