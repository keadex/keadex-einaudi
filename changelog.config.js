// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

function getScopes() {
  const apps = fs.readdirSync('./apps', function (err, content) {
    if (err) {
      return [];
    } else {
      return content;
    }
  });
  const libs = fs.readdirSync('./libs', function (err, content) {
    if (err) {
      return [];
    } else {
      return content;
    }
  });
  return apps.concat(libs).concat(['common']);
}

module.exports = {
  scopes: getScopes(),
};
