//Import dependencies
var fs = require('fs');
var gulp = require('gulp');
var ejs = require("gulp-ejs");
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var del = require('del');

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
  gulp.src('./src/**/*.ejs')

  //Call the ejs builder
  .pipe(ejs({ }))

  //Rename the ejs files
  .pipe(rename({ extname: '.html' }))

  //Output path
  .pipe(gulp.dest('./public/'));

  //Delete the header and the footer files
  del.sync([ './public/_header.html', './public/_footer.html' ]);
});

//Build the sass/scss files
gulp.task('build:sass', function()
{
  //Get all the scss files
  gulp.src('./src/scss/**/*.scss')

  //Build the css files
  .pipe(sass().on('error', sass.logError))

  //Save to the output dir
  .pipe(gulp.dest('./public/css/'))
});


//Default task
gulp.task('default', [ 'clean', 'build:ejs', 'build:sass' ]);
