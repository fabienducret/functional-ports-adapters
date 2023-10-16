import { test, mock } from 'node:test';
import * as assert from 'node:assert';
import { withLogging } from './with-logging.js';

test('logger', (t) => {
  t.test('should log', () => {
    // Given
    const logger = mock.fn();
    const funcToLog = (a: number, b: number): string => `result=${a}:${b}`;

    // When
    const withLogger = withLogging(funcToLog, logger);
    withLogger(22, 9);

    // Then
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
