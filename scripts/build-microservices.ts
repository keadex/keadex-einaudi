import * as shell from 'shelljs';
import { readdirSync } from 'fs';

readdirSync('./apps/').forEach((microservice) => {
  console.log(`Building ${microservice} microservice`);
  shell.exec(`nest build ${microservice}`);
});
