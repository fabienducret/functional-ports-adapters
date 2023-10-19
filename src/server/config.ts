export type Config = {
  host?: string;
  port?: number;
  todosApiUrl?: string;
};

const getHost = (): string => {
  const defaultHost = 'localhost';
  return process.env.HOST ?? defaultHost;
};

const getPort = (): number => {
  const defaultPort = 3000;
  return process.env.PORT ? parseInt(process.env.PORT, 10) : defaultPort;
};

const getTodosApiUrl = (): string => {
  const defaultUrl = 'https://jsonplaceholder.typicode.com';
  return process.env.TODOS_API_URL ? process.env.TODOS_API_URL : defaultUrl;
};

export const initConfig = (): Config => {
  return {
    host: getHost(),
    port: getPort(),
    todosApiUrl: getTodosApiUrl(),
  };
};
