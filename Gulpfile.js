'use strict';
var gulp   = require('gulp');
// automatically load gulp plugins into the object plugin
var plugin = require("gulp-load-plugins")({
   pattern: ['gulp-*', 'gulp.*'],
   replaceString: /\bgulp[\-.]/
});
var browserSync = require('browser-sync').create();
var config      = require('config.json')('./config.json');
var root        = config.root + "/";
var destination = config.end + "/";
var paths = {
   start: {
      html: root + config.folders.html + "/*.html",
      css:  root + config.folders.css  + "/*.styl",
      js:   root + config.folders.js   + "/*.js"
   }
}
///////////
// Files //
///////////
// move all the html files to the destination folder
gulp.task('html', function() {
   return gulp.src(paths.start.html)  // get our html files
      .pipe(plugin.flatten())         // flatten the folder hierarchy
      .pipe(gulp.dest(destination));  // send them over to the destination folder
});

// get all js files and put them in the destination folder
gulp.task('js', function() {
   return gulp.src(paths.start.js)    //get our js files
      .pipe(gulp.dest(destination));  //move them to our destination folder
});

// compile our stylus files and send them straight to dist
gulp.task('css', function() {
   return gulp.src(paths.start.css)   //get our css files
      .pipe(plugin.stylus())          //compile them
      .pipe(gulp.dest(destination));  //put them in a temp folder
});

gulp.task('images', function() {
   // get our images folder and send them over to an images folder in destination
   return gulp.src(root + paths.start.images + '/**/*')
      .pipe(gulp.dest(destination + 'images'));
});


//////////////
// Cleaning //
//////////////
// clean the destination folder and do it blindly to speed it up
gulp.task('clean', function() {
   return gulp.src(destination, {read: false}).pipe(plugin.clean());
});


///////////
// Watch //
///////////
gulp.task('watch', function() {
   gulp.watch(root + '**/*.styl', gulp.series('css'));
   gulp.watch(root + '**/*.html', gulp.series('html'));
   gulp.watch(root + '**/*.js',   gulp.series('js'));
});

// serve up the page on a browser
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: destination
        },
        browser: "google chrome"
    });
    gulp.watch(root + '**/*.js',   gulp.series('js'));
    gulp.watch(root + '**/*.styl', gulp.series('css'));
    gulp.watch(root + '**/*.html', gulp.series('html'));
});

////////////////
// Main Calls //
////////////////
//simply builds the dist folder. Good for testing the build
//process without serving the site
gulp.task('build', gulp.parallel(
  'html', 'css', 'js', 'images'
));

//build, format the socket.io url to localhost and serve the site
gulp.task('local', gulp.series(
   'build',
   gulp.parallel('watch', 'serve')
));

//build for local by default
gulp.task('default', gulp.parallel('local'));
