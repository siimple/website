//Import dependencies
var fs = require('fs');
var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks-render');
var rmr = require('rmr');

//Clean the dist folder
gulp.task('clean', function()
{
  //Clean the public folder
  return rmr.sync('./dist');
});

//Build the website
gulp.task('build', function()
{
  //Get the source files
  gulp.src('./app/*.html')

  //Build the page
  .pipe(nunjucks({ path: './templates', data: {} }))

  //Output path
  .pipe(gulp.dest('./dist/'));
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
});

//Default task
gulp.task('default', [ 'clean', 'build', 'copy' ]);
