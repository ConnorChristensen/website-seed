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

//move all the html files to the destination folder
gulp.task('html', function() {
   return gulp.src(root + "**/*.html")
       .pipe(plugin.flatten())
      .pipe(gulp.dest(destination));
});

//injects all the css files into index.html
//dependencies: html, compile-scss, compress-css
gulp.task('inject-css', function() {
   return gulp.src(destination + 'index.html')      //get our index.html
      .pipe(plugin.inject(                          //call gulp-inject
         gulp.src(destination + '**/*.css')
            .pipe(plugin.order([ 'reset.css', '*' ])
         ),
         //when injecting the paths, do not include the dist folder)
         {relative: true}
      ))
      .pipe(gulp.dest(destination));
});

gulp.task("inject-NM-css", function() {
   return gulp.src(destination + 'index.html')      //get our index.html
      .pipe(plugin.inject(                   //call gulp-inject
         gulp.src(
            './node_modules/**/*.css',       //get our css Files
            {read: false}                    //do not read them (that makes it slow)
         ),
         //when injecting the paths, do not include the dist folder)
         { relative: true }))
      .pipe(gulp.dest(destination));
});

//injects all the js files into index.html
//line by line description found on inject-css
//dependencies: html, js
gulp.task('inject-js', function() {
   return gulp.src(destination + 'index.html')
      .pipe(plugin.inject(
         gulp.src(
            destination + '**/*.js',
            { read: false }
         ),
         { relative: true }))
      .pipe(gulp.dest(destination));
});
