install-deps:
	npm install

build: install-deps
	npm run build

unlink:
	unlink ${HOME}/.k8slens/extensions/k8ssandra-lens-ide-extension

link:
	ln -s $(PWD) ${HOME}/.k8slens/extensions/k8ssandra-lens-ide-extension
