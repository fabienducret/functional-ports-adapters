import { readFileSync } from 'node:fs';

export const putSimulation = async (file: string) => {
  const body = readFileSync(`./tests/integration/${file}`);

  await fetch('http://localhost:8888/api/v2/simulation', {
    method: 'PUT',
    body,
  });
};
