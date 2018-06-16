.PHONY: build publish

# Binaries paths
NODE_BIN=./node_modules/.bin

# Build the website
build:
	@set -e
	@logger -s "Build started"
	@logger -s "Building website with Jekyll"
	jekyll build
	@logger -s "Building website styles"
	${NODE_BIN}/sass --load-path="./bower_components/" ./siimple-website.scss ./_site/assets/siimple-website.css
	@logger -s "Copying assets"
	mkdir -p ./_site/assets
	@logger -s "Build finished"

# Publish the website
publish: 
	@set -e
	@logger -s "Publish started"
	make build
	gcloud app deploy app.yaml --project siimple-documentation
	@logger -s "Publish finished"

# Publish the dispatch file
publish-dispatch:
	@set -e
	@logger -s "Publish dispatch started"
	gcloud app deploy dispatch.yaml --project siimple-documentation
	@logger -s "Publish dispatch finished"

