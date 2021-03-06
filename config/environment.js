/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'booker-client',
    environment: environment,
    apiHost: 'http://localhost:4500/api',
    baseURL: '/',
    locationType: 'auto',
    torii: {
      providers: {
        'google-oauth2': {
          apiKey: process.env.GOOGLE_API_KEY,
          redirectUri: 'http://localhost:4200/resources',
          scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile'
        },
      }
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' https://apis.google.com 'unsafe-inline'",
    'frame-src': "'self' https://accounts.google.com",
    'font-src': "'self' https://fonts.googleapis.com https://fonts.gstatic.com",
    'connect-src': "'self' http://localhost:4500 https://accounts.google.com/o/oauth2/auth",
    'img-src': "'self'",
    'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
    'media-src': "'self'"
  }

  // 'default-src': "'none'",
  // 'script-src': "'self' https://cdn.mxpnl.com", // Allow scripts from https://cdn.mxpnl.com
  // 'font-src': "'self' http://fonts.gstatic.com", // Allow fonts to be loaded from http://fonts.gstatic.com
  // 'connect-src': "'self' https://api.mixpanel.com http://custom-api.local", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
  // 'img-src': "'self'",
  // 'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com", // Allow inline styles and loaded CSS from http://fonts.googleapis.com
  // 'media-src': "'self'"

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';
    ENV.apiHost = '/api';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV['ember-simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    };
  }

  if (environment === 'production') {

  }

  return ENV;
};
