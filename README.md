# website-seed
A template organizational structure for building websites


## Installation Instructions
1. clone the repository
1. yarn install

Then you are ready to go

## Use Instructions
This project makes use of Gulp v4.0 which is still under development. It has really nice features built in that make build pipelines quick and efficient.

This project should ultimately allow for configuration exclusively through the config.json, but for now, some basic knowledge of Gulp will make working with this structure and configuing it much easier.

To see a list of all available tasks, type `gulp ---tasks`.

The ones that you should be calling are probably:
* `gulp` - which builds a version of the site designed to work locally
* `gulp prod` - which builds a production version of the site, ready for deployment
* `gulp build` - builds without serving up the site
* `gulp clean` - cleans out the files that Gulp builds


### HTML
To inject files like CSS and JS into an HTML file, add in the tag below to tell Gulp where to inject the files:
<!-- inject:<file type> -->
<!-- endinject -->

For example, if you wanted to inject css:
<!-- inject:css -->
<!-- endinject -->
