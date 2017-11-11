'use strict';

var gulp = require('gulp');
var plugin = require("gulp-load-plugins")({
   pattern: ['gulp-*', 'gulp.*'],
   replaceString: /\bgulp[\-.]/
});

//config paths
var config      = require('config.json')('./config.json');
var root        = config.root + "/";
var destination = config.end + "/";
var anyFile     = "/**/*";
var not         = "!";
var paths = {
   start: {
      js:   root + config.folders.js   + "/**/*.js"
   },
   end: {
      js:   destination + "scripts/",
   }
}

//get all js files and put them in the destination folder
gulp.task('js', function() {
   return gulp.src(paths.start.js)           //get our js files
      .pipe(gulp.dest(paths.end.js));        //move them to our destination folder
});
