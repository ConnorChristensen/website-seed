'use strict';

var gulp = require('gulp');
var plugin = require("gulp-load-plugins")({
   pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
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

//get bower dependencies, compress them and put them in the destination folder
gulp.task('bower', function() {
   return gulp.src(plugin.mainBowerFiles())  //gather all our bower dependencies
      .pipe(plugin.filter('**/*.js'))        //filter to only js files
      .pipe(plugin.concat('bower.js'))       //concat them all together into
      .pipe(gulp.dest(destination));         //send it to destination/js
});

//get all js files and put them in the destination folder
gulp.task('js', function() {
   return gulp.src(paths.start.js)           //get our js files
      .pipe(gulp.dest(paths.end.js));        //move them to our destination folder
});
