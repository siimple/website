.PHONY: install build publish prepublish

# Binaries paths
NODE_BIN=./node_modules/.bin

# Innitial installation
install:
	bundle install
	npm install
	rm -rf bower_components && bower install

# Build the website
build:
	@# Building website with Jekyll
	bundle exec jekyll build
	@# Copying assets
	@#cp -r ./assets ./_site/assets
	cp bower_components/siimple/dist/siimple.min.css ./_site/assets/css/
	cp bower_components/siimple-colors/dist/siimple-colors.min.css ./_site/assets/css/
	@# Building website styles
	@#${NODE_BIN}/sass --load-path="./bower_components/" ./siimple-website.scss ./_site/assets/siimple-website.css

# Serve the site
serve:
	${NODE_BIN}/stattic --folder ./_site --cors

# Publish the website
publish: 
	make build
	gsutil rsync -d -r ./_site gs://siimple-documentation.appspot.com/www

