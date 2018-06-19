.PHONY: build publish

# Binaries paths
# NODE_BIN=./node_modules/.bin

# Innitial installation
setup:
	@set -e
	@logger -s "Setup started"
	rm -rf bower_components && bower install
	@logger -s "Setup finished"

# Build the website
build:
	@set -e
	@logger -s "Build started"
	@logger -s "Building website with Jekyll"
	jekyll build
	@logger -s "Copying assets"
	@#cp -r ./assets ./_site/assets
	cp bower_components/siimple/dist/siimple.min.css ./_site/assets/css/
	@#logger -s "Building website styles"
	@#${NODE_BIN}/sass --load-path="./bower_components/" ./siimple-website.scss ./_site/assets/siimple-website.css
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

