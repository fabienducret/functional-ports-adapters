import { test } from '@japa/runner';
import { mock } from 'node:test';
import { withLogging } from './with-logging.js';

test.group('logger', () => {
  test('should log', ({ assert }) => {
    // Arrange
    const logger = mock.fn();
    const funcToLog = (a: number, b: number): string => `result=${a}:${b}`;

    // Act
    const withLogger = withLogging(funcToLog, logger);
    withLogger(22, 9);

    // Assert
    assert.strictEqual(logger.mock.calls.length, 2);
    assert.strictEqual(
      logger.mock.calls[0].arguments[0],
      'entering funcToLog(22,9)'
    );
    assert.strictEqual(
      logger.mock.calls[1].arguments[0],
      'exiting funcToLog=>result=22:9'
    );
  });
});
