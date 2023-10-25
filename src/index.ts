import { initConfig } from './server/config.js';
import { startServer } from './server/server.js';

const handleError = (err: Error) => {
  console.error(err);
  process.exit(1);
};

const main = async () => {
  initConfig().ifLeft(handleError).map(startServer);
};

main();
