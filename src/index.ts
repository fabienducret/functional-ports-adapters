import { initConfig } from './server/config.js';
import { startServerWith } from './server/server.js';

const main = async () => {
  const config = initConfig();
  await startServerWith(config);
};

main();
