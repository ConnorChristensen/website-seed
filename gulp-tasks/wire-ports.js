'use strict';

//Requrements
var gulp   = require('gulp');
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
      html: root + config.folders.html + "/*.html",
   },
   end: {
      html: destination + "views/",
   }
}

gulp.task('wire-port-prod', function() {
   var locations = [
      destination + "**/*.html",
      destination + "**/*.js"
   ];
   return gulp.src(locations)
      .pipe(plugin.replace("!!HOST!!", config.prod.url))
      .pipe(gulp.dest(destination));
});

gulp.task('wire-port-local', function() {
   var locations = [
      destination + "**/*.html",
      destination + "**/*.js"
   ];
   return gulp.src(locations)
      .pipe(plugin.replace("!!HOST!!", config.localhost.url))
      .pipe(gulp.dest(destination));
});
