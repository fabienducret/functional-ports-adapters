import 'dotenv/config';
import { Either, Left, Right } from 'purify-ts';

export type Config = {
  host: string;
  port: number;
  todosApiUrl?: string;
};

export const initConfig = (): Either<Error, Config> => {
  const host = process.env.SERVER_HOST;

  if (!host) {
    return Left(new Error('missing var SERVER_HOST'));
  }

  const port = process.env.SERVER_PORT;

  if (!port) {
    return Left(new Error('missing var SERVER_PORT'));
  }

  return Right({
    host,
    port: parseInt(port, 10),
    todosApiUrl: process.env.TODOS_API_URL,
  });
};
