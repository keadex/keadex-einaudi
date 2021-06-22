import * as shell from 'shelljs';
import * as commandLineArgs from 'command-line-args';

//rover subgraph publish Keadex-Einaudi@current --name experience --routing-url http://localhost:3001/ --schema ./src/_autogenerated/schema.gql

const optionDefinitions = [
  { name: 'name', alias: 'n', type: String },
  { name: 'variant', alias: 'v', type: String, defaultValue: 'current' },
  { name: 'port', alias: 'p', type: String },
];

const options = commandLineArgs(optionDefinitions);

console.log(options);

shell.exec(
  `rover subgraph publish Keadex-Einaudi@${options['variant']} --name ${options['name']} --routing-url http://localhost:${options['port']}/graphql --schema ./apps/${options['name']}/src/_autogenerated/schema.gql`,
);
