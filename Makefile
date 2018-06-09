
# Binaries paths
NODE_BIN=./node_modules/.bin

# Build the website
build:
	@set -e
	@echo ">>> Building with jekyll"
	jekyll build
	@echo ">>> Building assets"
	mkdir -p ./_site/assets
	${NODE_BIN}/node-sass ./siimple-website.scss ./_site/assets/siimple-website.css

