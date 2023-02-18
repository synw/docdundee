# Install

[Degit](https://github.com/Rich-Harris/degit) or clone:

```bash
cd mylib
mkdir docsite
cd docsite
degit https://github.com/synw/docdundee/default
# or
degit https://github.com/synw/docdundee/python
# install
yarn
# or 
npm install
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


