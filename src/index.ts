import { startServerWith } from './server/server.js';

const getHost = () => {
  const defaultHost = 'localhost';
  return process.env.HOST ?? defaultHost;
};

const getPort = () => {
  const defaultPort = 3000;
  return process.env.PORT ? parseInt(process.env.PORT, 10) : defaultPort;
};

const main = async () => {
  await startServerWith({ host: getHost(), port: getPort() });
};

main();
