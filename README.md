# website-seed
A template organizational structure for building websites

## Installation Instructions
1. clone the repository
1. `npm install`

Then you are ready to go.

If you do not have [Gulp.js](https://gulpjs.com/) installed, you can install globally or use npx.

#### Global install
`npm install -g gulp` will install it so that you just type `gulp` when you want to start it up

#### npx
`npx gulp` will run off the installed version in the node_modules folder. 
You would need to type `npx` before every gulp command you run.

## Use Instructions

To see a list of all available tasks, type `gulp ---tasks`.

The ones that you should be calling are probably:

* `gulp dev` - which builds a version of the site designed to work locally
* `gulp prod` - which builds a version of the site designed for deployment
* `gulp clean` - cleans out the files that Gulp builds
* `gulp` - which just runs `gulp dev`
