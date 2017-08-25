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
      css:  root + config.folders.css  + "/*.css",
      less: root + config.folders.less + "/*.less",
      scss: root + config.folders.scss + "/*.scss",
   },
   end: {
      css:  destination,
   }
}

// compile our scss files and send them straight to dist
gulp.task('css', function() {
   return gulp.src(paths.start.scss)         //get our scss files
      .pipe(plugin.sass())                   //compile them
      .pipe(gulp.dest(destination));         //put them in a temp folder
});

// compile our scss file and send them to a temp folder for compression
gulp.task('compile-scss', function() {
   return gulp.src(paths.start.scss)         //get our scss files
      .pipe(plugin.sass())                   //compile them
      .pipe(gulp.dest(".temp-css"));         //put them in a temp folder
});
// compress the css files in the temp folder
gulp.task('compress-css', function() {
   return gulp.src(".temp-css/*.css")        //get our temp css files
      .pipe(plugin.order([                   //specify the order
         'reset.css',                        //reset goes first
         '*'                                 //then the rest of the files
      ]))
      .pipe(plugin.concat('main.css'))       //name the resulting file main.css
      .pipe(gulp.dest(paths.end.css));       //send it to destination
});

//compile all the sass files and move them to the destination folder
gulp.task('css-prod', gulp.series(
   'compile-scss',
   'compress-css'
));
