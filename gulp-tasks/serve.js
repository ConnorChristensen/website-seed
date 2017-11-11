'use strict';

//Requrements
var gulp   = require('gulp');
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

gulp.task('serve-ui', function() {
   return plugin.connect.server({  //create a little server for our site on localhost
      root: destination,           //look for our code in the destination folder
      livereload: true,            //reload the page if anything changes
      port: 9000,                  //make the connection on port 9000
   });
});

//auto open the browser to that url
gulp.task('open', function() {
   return gulp.src(destination + "index.html")
      .pipe(plugin.open({
         uri: 'http://localhost:9000/',
         app: 'google chrome'
      }));
});

//serve the ui and auto open the browser for the user
gulp.task('serve', gulp.parallel('serve-ui', 'open'));
