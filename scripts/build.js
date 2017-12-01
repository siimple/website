//Import dependencies
var path = require('path');
var gulp = require('gulp');
var rename = require('gulp-rename');
var nunjucks = require('gulp-nunjucks-render');
var sass = require('gulp-sass');
var rmr = require('rmr');

//Import build methods
var projects = require('./projects.js');

//Destination folders
var dest = {};
dest.base = './dist'; //Base destination folder
dest.css = path.join(dest.base, './css'); //Output css folder
dest.js = path.join(dest.base, './js'); //Output js folder
dest.images = path.join(dest.base, './images'); //Output images folder

//Clean the output folder
rmr.sync(dest.base);

//Initialize the global configuration
var config = {};

//Function to compile the html files
var buildHTML = function()
{
  //Get the source files
  gulp.src('./src/**/*.html')

  //Build the page
  .pipe(nunjucks({ path: './templates/', data: config }))

  //Output path
  .pipe(gulp.dest(dest.base));
};

//Function to compile the scss files and generate the css files
var buildCSS = function()
{
  //Get the scss files
  gulp.src('./src/scss/**/*.scss')

  //Build the scss files
  .pipe(sass({ includePaths: [ 'bower_components', 'node_modules' ] }).on('error', sass.logError))

  //Save in the dist/css folder
  .pipe(gulp.dest(dest.css));
};

//Function to copy the assets and other files
var Copy = function()
{
  //Copy the yaml files
  gulp.src(['./app/**.yaml']).pipe(gulp.dest(dest.base));

  //Copy the javascript files
  //gulp.src('./src/js/*.js').pipe(gulp.dest(dest.js));

  //Copy the images folder
  gulp.src('./src/images/**').pipe(gulp.dest(dest.images));

  //Copy the siimple modules
  gulp.src('./bower_components/siimple/dist/siimple.css').pipe(gulp.dest(dest.css));
  gulp.src('./bower_components/siimple-colors/dist/siimple-colors.css').pipe(gulp.dest(dest.css));

  //Copy the plume layout files
  gulp.src('./bower_components/plume/dist/plume.css').pipe(gulp.dest(dest.css));
  gulp.src('./bower_components/plume/dist/plume.js').pipe(gulp.dest(dest.js));

  //For each module
  config.projects.forEach(function(project)
  {
    //Output folder
    var output = path.join(dest.images, project.name);

    //Copy the base image
    gulp.src('./bower_components/' + project.name + '/media/logo-inverted.png').pipe(rename({ basename: 'logo' })).pipe(gulp.dest(output));

    //Copy the header image
    gulp.src('./bower_components/' + project.name + '/media/logo-header.png').pipe(rename({ basename: 'header' })).pipe(gulp.dest(output));
  });
};

//Import the projects list
projects(function(error, list)
{
  //check the error
  if(error){ throw error; }

  //Save the projects list
  config.projects = list;

  //Build the HTML files
  buildHTML();

  //Build the css files
  buildCSS();

  //Copy the assets and other files
  Copy();
});
