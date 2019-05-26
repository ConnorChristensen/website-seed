'use strict';
var gulp   = require('gulp');
// automatically load gulp plugins into the object plugin
var plugin = require("gulp-load-plugins")({
   pattern: ['gulp-*', 'gulp.*'],
   replaceString: /\bgulp[\-.]/
});
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();
var config      = require('config.json')('./config.json');
var root        = config.root + "/";
var destination = config.end + "/";
var paths = {
   start: {
      html: root + config.folders.html + "/*.html",
      css:  root + config.folders.css  + "/*.styl",
      js:   root + config.folders.js   + "/*.js",
      images: root + config.folders.images + "/**/*"
   }
}
///////////
// Files //
///////////
function html() {
   return gulp.src(paths.start.html)  // get our html files
      .pipe(fileinclude({             // @@include('') allows file inclusion
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest(destination));  // send them over to the destination folder
}
html.description = "Move all the html files to the destination folder";
gulp.task(html);

function jsDev() {
   return gulp.src(paths.start.js)    // get our js files
       .pipe(fileinclude({            // @@include('') allows file inclusion
         prefix: '@@',
         basepath: '@file'
       }))                            // inject json files
      .pipe(gulp.dest(destination));  // move them to our destination folder
}
jsDev.description = "Get all js files and put them in the destination folder";
gulp.task(jsDev);

function jsProd() {
   return gulp.src(paths.start.js)    // get our js files
       .pipe(fileinclude({            // @@include('') allows file inclusion
         prefix: '@@',
         basepath: '@file'
       }))                            // inject json files
       .pipe(plugin.uglify())
      .pipe(gulp.dest(destination));  // move them to our destination folder
}
jsProd.description = "Compress js on moving to the destination folder";
gulp.task(jsProd);

function css() {
   return gulp.src(paths.start.css)   // get our css files
      .pipe(plugin.stylus())          // compile them
      .pipe(gulp.dest(destination));  // send them over to the destination folder
}
css.description = "Compile our stylus files and send them straight to dist";
gulp.task(css);

function imagesDev() {
   // get our images folder and send them over to an images folder in destination
   return gulp.src(paths.start.images)
      .pipe(gulp.dest(destination + 'images'));
}
imagesDev.description = "Moves images to destination folder";
gulp.task(imagesDev);

function imagesProd() {
   // get our images folder and send them over to an images folder in destination
   return gulp.src(paths.start.images)
      .pipe(plugin.image())
      .pipe(gulp.dest(destination + 'images'));
}
imagesProd.description = "Moves images to destination folder and compresses them";
gulp.task(imagesProd);


//////////////
// Cleaning //
//////////////
// clean the destination folder and do it blindly to speed it up
function clean() {
   return gulp.src(destination, {read: false}).pipe(plugin.clean());
}
clean.description = "Cleans up the destination directory";
gulp.task(clean);

///////////
// Watch //
///////////
function watch() {
   gulp.watch(root + '**/*.styl', gulp.series('css'));
   gulp.watch(root + '**/*.html', gulp.series('html'));
   gulp.watch(root + '**/*.js',   gulp.series('js-dev'));
   gulp.watch(paths.start.images, gulp.series('images-dev'));
}
watch.description = "Watches all source files for changes";
gulp.task(watch);

function serve() {
    browserSync.init({
        server: {
            baseDir: destination
        },
        browser: "google chrome"
    });
    // when anything changes, reload the webpage
    gulp.watch(destination + '*').on('change', browserSync.reload);
}
serve.description = "Serve up the page on a browser";
gulp.task(serve);

////////////////
// Main Calls //
////////////////
// simply builds the dist folder. Good for testing the build
// process without serving the site
gulp.task('build', gulp.parallel('html', 'css'));

// build, format the socket.io url to localhost and serve the site
gulp.task('dev', gulp.series(
   gulp.parallel('build', 'jsDev', 'imagesDev'),
   gulp.parallel('watch', 'serve')
));

gulp.task('prod', gulp.parallel('build', 'imagesProd', 'jsProd'));

// build for local by default
gulp.task('default', gulp.parallel('dev'));
