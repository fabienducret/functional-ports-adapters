import { Either, Left, Right } from 'purify-ts';

export const fetcher = async <T>(url: string): Promise<Either<string, T>> => {
  const response = await fetch(url);

  if (response.status !== 200) {
    return Left(`error in fetching ${url}`);
  }

  return Right((await response.json()) as T);
};
