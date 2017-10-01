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
gulp.task('build', ['build-html', 'build-scss']);

//Compile the html files
gulp.task('build-html', function()
{
  //Get the source files
  gulp.src('./app/**/*.html')

  //Build the page
  .pipe(nunjucks({ path: './templates', data: {} }))

  //Output path
  .pipe(gulp.dest('./dist/'));
});

//Compile the scss files
gulp.task('build-scss', function()
{
  //Get the scss files
  gulp.src('./app/scss/**.scss')

  //Build the scss files
  .pipe(sass({ includePaths: [ 'bower_components', 'node_modules' ] }).on('error', sass.logError))

  //Save in the dist/css folder
  .pipe(gulp.dest('./dist/css/'));
});

//Copy the assets and other files
gulp.task('copy', function()
{
  //Copy the yaml files
  gulp.src('./*.yaml').pipe(gulp.dest('./dist/'));

  //Copy the javascript files
  gulp.src('./app/js/*.js').pipe(gulp.dest('./dist/js'));

  //Copy the css files
  gulp.src('./app/css/*.css').pipe(gulp.dest('./dist/css'));

  //Copy the siimple modules
  gulp.src('./bower_components/siimple/dist/siimple.css').pipe(gulp.dest('./dist/css'));
  gulp.src('./bower_components/siimple-colors/dist/siimple-colors.css').pipe(gulp.dest('./dist/css'));
  gulp.src('./bower_components/siimple-layout/dist/siimple-layout.css').pipe(gulp.dest('./dist/css'));

  //Copy the experiments files
  gulp.src('./bower_components/siimple-experiments/docs/dist/siimple-docs.css').pipe(gulp.dest('./dist/css'));
  gulp.src('./bower_components/siimple-experiments/docs/dist/siimple-docs.js').pipe(gulp.dest('./dist/js'));
});

//Default task
gulp.task('default', [ 'clean', 'build', 'copy' ]);
