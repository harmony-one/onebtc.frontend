import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { config } from './config';

console.log('### config.sentryDSN', config.sentryDSN);
Sentry.init({
  dsn: config.sentryDSN,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

Sentry.setTag('version', config.version);
Sentry.setTag('appType', config.appType);

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
