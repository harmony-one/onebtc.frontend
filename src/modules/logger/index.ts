import zerg from 'zerg';
import { consoleBrowserColorful } from 'zerg/dist/transports';

const logger = zerg.createLogger();

// Add console logger
const listener = zerg.createListener({
  handler: consoleBrowserColorful,
});

logger.addListener(listener);

export default logger;
