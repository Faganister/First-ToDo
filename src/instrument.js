const Sentry = require('@sentry/node');

// Ensure to call this before requiring any other modules!
Sentry.init({
  dsn: 'https://30c596fa7232e1d48716cc738e67feab@o4507277854638080.ingest.de.sentry.io/4507278025949264',

  // Add Performance Monitoring by setting tracesSampleRate
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
