import * as Sentry from '@sentry/react';
import { TLogMessage } from 'zerg/dist/types';

const SENTRY_LEVEL_MAP = {
  info: 'info',
  warn: 'warning',
  error: 'error',
  fatal: 'error',
};

export function sentryTransport(logMessage: TLogMessage) {
  const level = SENTRY_LEVEL_MAP[logMessage.level];

  Sentry.withScope(scope => {
    scope.setLevel(level);

    Object.keys(logMessage.extendedData).forEach(key => {
      scope.setExtra(key, logMessage.extendedData[key]);
    });

    scope.setTag('module', logMessage.moduleName);
    Sentry.captureMessage(logMessage.message);
  });
}
