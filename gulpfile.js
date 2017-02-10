//Import dependencies
var fs = require('fs');
var gulp = require('gulp');
var ejs = require("gulp-ejs");
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var del = require('del');

//Data object
var data = {};

//Import colors configuration
data.colors = require('../siimple-colors/data.json');

//Clean the public folder
gulp.task('clean', function()
{
  //Clean the public folder
  del.sync([ './public/**/*' ]);
});

//Build the ejs files
gulp.task('build:ejs', function()
{
  //Get the source files
  gulp.src('./_pages/**/*.ejs')

  //Call the ejs builder
  .pipe(ejs(data))

  //Rename the ejs files
  .pipe(rename({ extname: '.html' }))

  //Output path
  .pipe(gulp.dest('./public/'));
});

//Build the sass/scss files
gulp.task('build:sass', function()
{
  //Get all the scss files
  gulp.src('./_scss/**/*.scss')

  //Build the css files
  .pipe(sass().on('error', sass.logError))

  //Save to the output dir
  .pipe(gulp.dest('./public/css/'));
});

//Copy the siimple code
gulp.task('copy:siimple', function()
{
  //Get the siimple library
  gulp.src('../siimple-siimple/dist/siimple.css').pipe(gulp.dest('./public/css'));

  //Copy the siimple-colors library
  gulp.src('../siimple-colors/dist/siimple-colors.css').pipe(gulp.dest('./public/css'));
});

//Default task
gulp.task('default', [ 'clean', 'build:ejs', 'build:sass', 'copy:siimple' ]);
