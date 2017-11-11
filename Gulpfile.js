'use strict';

//Requrements

var gulp   = require('gulp');
// automatically load gulp plugins into the object plugin
var plugin = require("gulp-load-plugins")({
   pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
   replaceString: /\bgulp[\-.]/
});

// auto inject dependencies
var wiredep     = require("wiredep").stream;
// module to import folders
var requireDir = require('require-dir');
// bring in the gulp tasks from the gulp-tasks folder
requireDir('./gulp-tasks');


//config paths
var config      = require('config.json')('./config.json');
var root        = config.root + "/";
var destination = config.end + "/";
var anyFile     = "/**/*";
var not         = "!";
var paths = {
   start: {
      html: root + config.folders.html + "/*.html",
      css:  root + config.folders.css  + "/*.css",
      less: root + config.folders.less + "/*.less",
      scss: root + config.folders.scss + "/*.scss",
      js:   root + config.folders.js   + "/**/*.js"
   },
   end: {
      html: destination + "views/",
      css:  destination,
      js:   destination + "scripts/",
   }
}

////////////////
// Misc Files //
////////////////
gulp.task('images', function() {
   //get our images folder
   return gulp.src(root + 'images/**/*')
      .pipe(gulp.dest(destination + 'images'));
});

//////////////
// Cleaning //
//////////////
gulp.task('clean:tmp', function() {
   return gulp.src('.temp-css').pipe(plugin.clean('.temp-css', {read: false}));
});
gulp.task('clean:destination', function() {
   return gulp.src('.temp-css').pipe(plugin.clean(destination, {read: false}));
});

///////////////////
// Task Managers //
///////////////////
//inject the js and css into main
gulp.task('inject', gulp.series('inject-css', 'inject-js'));
//remove all files and folders used for the build process
gulp.task('clean', gulp.parallel('clean:destination', 'clean:tmp'));

///////////
// Watch //
///////////
gulp.task('watch', function() {
   gulp.watch(root + 'styles/**/*.scss', gulp.series('css'));
   gulp.watch(root + '**/*.html',        gulp.series('html', 'inject', 'wire-port-local'));
   gulp.watch(root + '**/*.js',          gulp.series('js', 'inject', 'wire-port-local'));
});


////////////////
// Main Calls //
////////////////

//simply builds the dist folder. Good for testing the build
//process without serving the site
gulp.task('build', gulp.series(
    gulp.parallel('html', 'css', 'js', 'images'),
    'inject',
    'wire-port-local'
));

//build, format the socket.io url to localhost and serve the site
gulp.task('local', gulp.series(
   gulp.parallel('html', 'css', 'js', 'images'),
   'inject',
   'wire-port-local',
   gulp.parallel('watch', 'serve')
));
//clean, build, and then format the socket.io url to the deployed instance
gulp.task('prod', gulp.series(
   'clean',
   gulp.parallel('html', 'css-prod', 'js', 'images'),
   'inject',
   'wire-port-prod'
));
//build for local by default
gulp.task('default', gulp.parallel('local'));
