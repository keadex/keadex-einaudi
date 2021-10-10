import * as shell from 'shelljs';
import * as commandLineArgs from 'command-line-args';
import { readdirSync } from 'fs';

const optionDefinitions = [
  { name: 'debug', alias: 'd', type: Boolean, defaultValue: false },
];

const options = commandLineArgs(optionDefinitions);

console.log(options);

readdirSync('./apps/').forEach((microservice) => {
  console.log(
    `Starting ${microservice} microservice with debug ${
      options['debug'] ? 'enabled' : 'disabled'
    }`,
  );
  shell.exec(
    `nest start ${microservice}${options['debug'] ? ' --debug' : ''}`,
    { async: true },
  );
});
