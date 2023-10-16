import { Either, Left, Right } from 'purify-ts';
import type { Error } from '../models/error.js';

export const fetchFrom = async <T>(url: string): Promise<Either<Error, T>> => {
  const response = await fetch(url);

  if (response.status !== 200) {
    return Left({ message: 'error in fetching ' + url });
  }

  return Right((await response.json()) as T);
};
