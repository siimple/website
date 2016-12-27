//Import dependencies
var fs = require('fs');
var gulp = require('gulp');
var ejs = require("gulp-ejs");
var filter = require('gulp-filter');
var sass = require('gulp-sass');

//Build the ejs files
gulp.task('build:ejs', function()
{
  //Get the source files
  gulp.src('./src/**/*.ejs')

  //Ignore layout files
  .pipe(filter([ '!_footer.ejs', '!_header.ejs' ]))

  //Call the ejs builder
  .pipe(ejs({ }))

  //Output path
  .pipe(gulp.dest('./public/'));
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
gulp.task('default', [ 'build:ejs', 'build:sass' ]);
