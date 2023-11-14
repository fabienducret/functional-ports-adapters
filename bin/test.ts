import { configure, processCLIArgs, run } from '@japa/runner';
import { assert } from '@japa/assert';

processCLIArgs(process.argv.splice(2));
configure({
  suites: [
    {
      name: 'unit',
      files: ['src/**/*.test.ts'],
    },
    {
      name: 'integration',
      files: ['tests/integration/**/*.test.ts'],
    },
    {
      name: 'e2e',
      files: ['tests/e2e/**/*.test.ts'],
    },
  ],

  plugins: [assert()],
});

run();
