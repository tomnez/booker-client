/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    sassOptions: {
      includePaths: [
        'app/styles'
      ]
    },
    dotEnv: {
      clientAllowedKeys: ['GOOGLE_API_KEY'],
      path: '.env'
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import("bower_components/normalize.css/normalize.css");
  app.import("bower_components/hammerjs/hammer.js");
  app.import("vendor/fonts/icomoon.eot");
  app.import("vendor/fonts/icomoon.svg");
  app.import("vendor/fonts/icomoon.ttf");
  app.import("vendor/fonts/icomoon.woff");

  return app.toTree();
};
