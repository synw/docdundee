# Doc Dundee

Documentation website templates for code libraries. Features:

 - Markdown rendering of api docs with code syntax highlighting
 - Interactive examples for Python and Javascript
 - Responsive and dark mode support

 ## Install

[Degit](https://github.com/Rich-Harris/degit) or clone:

 ```bash
cd mylib
mkdir docsite
cd docsite
degit https://github.com/synw/docdundee/python
# degit https://github.com/synw/docdundee/javascript
# degit https://github.com/synw/docdundee/other
 ```

## Usage

Place the markdown documentation files in `docsite/public/apidoc` and the examples files
in `docsite/public/examples`. Then generate the folder listings

### Generate docs listing

```bash
cd myproject
yarn build_docs
```

### Generate examples listing

```bash
cd myproject
yarn build_examples
```

### Configure

Edit `src/conf.ts` with your library params

### Run

```bash
yarn dev
# or
npm run dev
```

Open localhost:3000

## Build for Github pages

Create a `docs` folder at the root of the project:

```bash
cd mylib
mkdir docs
cd docsite
yarn build_to_gh
# or
npm run build_to_gh
```

The build will land into the `docs` folder

