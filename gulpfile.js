//Import dependencies
var fs = require('fs');
var gulp = require('gulp');
var rename = require('gulp-rename');
var nunjucks = require('gulp-nunjucks-render');
var sass = require('gulp-sass');
var rmr = require('rmr');

//Clean the dist folder
gulp.task('clean', function()
{
  //Clean the public folder
  return rmr.sync('./dist');
});

//Build task
gulp.task('build', ['build:html', 'build:css', 'build:copy']);

//Compile the html files
gulp.task('build:html', function()
{
  //Get the source files
  gulp.src('./src/**/*.html')

  //Build the page
  .pipe(nunjucks({ path: './templates/', data: {} }))

  //Output path
  .pipe(gulp.dest('./dist/'));
});

//Compile the scss files and generate the css files
gulp.task('build:css', function()
{
  //Get the scss files
  gulp.src('./src/scss/**.scss')

  //Build the scss files
  .pipe(sass({ includePaths: [ 'bower_components', 'node_modules' ] }).on('error', sass.logError))

  //Save in the dist/css folder
  .pipe(gulp.dest('./dist/css/'));
});

//Copy the assets and other files
gulp.task('build:copy', function()
{
  //Copy the yaml files
  gulp.src(['./app.yaml']).pipe(gulp.dest('./dist/'));

  //Copy the javascript files
  //gulp.src('./src/js/*.js').pipe(gulp.dest('./dist/js'));

  //Copy the images folder
  gulp.src('./src/images/**').pipe(gulp.dest('./dist/images'));

  //Copy the siimple modules
  gulp.src('./bower_components/siimple/dist/siimple.css').pipe(gulp.dest('./dist/css'));
  gulp.src('./bower_components/siimple-colors/dist/siimple-colors.css').pipe(gulp.dest('./dist/css'));
  gulp.src('./bower_components/siimple-layout/dist/siimple-layout.css').pipe(gulp.dest('./dist/css'));

  //Copy the plume layout files
  gulp.src('./bower_components/plume/dist/plume.css').pipe(gulp.dest('./dist/css'));
  gulp.src('./bower_components/plume/dist/plume.js').pipe(gulp.dest('./dist/js'));
});

//Default task
gulp.task('default', [ 'clean', 'build' ]);
