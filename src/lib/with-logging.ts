// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withLogging = <T extends (...args: any[]) => any>(
  fn: T,
  logger = console.log.bind(console)
): ((...args: Parameters<T>) => ReturnType<T>) => {
  return (...args: Parameters<T>): ReturnType<T> => {
    logger(`entering ${fn.name}(${args})`);

    try {
      const valueToReturn = fn(...args);
      logger(`exiting ${fn.name}=>${valueToReturn}`);
      return valueToReturn;
    } catch (e: unknown) {
      logger(`exiting ${fn.name}=>threw ${e}`);
      throw e;
    }
  };
};
