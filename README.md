
static-site
=======

Build static sites using grunt.

Setup
-----

`git clone https://github.com/rath3r/static-site.git .`

Don't forget the trailing full stop or you'll get a new directory inside your project dir as well.

Make sure you have `node` and `npm` installed.

`Grunt` is also required. `Grunt` needs to be installed globally using:

`npm install -g grunt-cli`

`Bower` is used for managing package dependencies which are used and defined in the `bower.json` file. Install if not installed.

`npm install -g bower`

The `bower_components` dir is ignored so install the dependencies before doing anything and add new dependencies to the config.

`bower install`

Once everything is installed run:

`npm install`

This will install the dependencies for this project in the node_modules directory.

Usage
-----

To run

`grunt`

To watch

`grunt watch`
