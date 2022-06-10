# K8ssandra extension

Extension that displays K8ssandra CRDs in a rich way.

## Install

```sh
mkdir -p ~/.k8slens/extensions
git clone https://github.com/k8ssandra/lens-ide-extension.git
cd lens-ide-extension
make link
```

## Build

To build the extension you can use `make` or run the `npm` commands manually:

```sh
cd lens-ide-extension/k8ssandra
make build
```

OR

```sh
cd lens-ide-extension/k8ssandra
npm install
npm run build
```

If you want to watch for any source code changes and automatically rebuild the extension you can use:

```sh
cd lens-ide-extension/k8ssandra
npm run dev
```

## Test

Open Lens application and navigate to a cluster. You should see "K8ssandra" in a menu.

## Uninstall

```sh
make unlink
```

Restart Lens application.