const fs = require('fs');
const path = require('path');

const dictTXT = fs.readFileSync(
  path.resolve(__dirname, '../src/ISO-dictionaries/ISO-639-2_de.txt'),
  { encoding: 'utf8' },
);

const dictMap = dictTXT.split('\n').map((line) => {
  const [
    name,
    iso639v1,
    iso639v2,
    iso639v2B,
    iso639v3,
  ] = line.split('|');
  return {
    name,
    iso639v1,
    iso639v2,
    iso639v2B,
    iso639v3,
  };
});

fs.writeFileSync(
  path.resolve(__dirname, './german-extracted.json'),
  JSON.stringify(
    dictMap
      .filter(({ iso639v1 }) => iso639v1)
      .map(({ name, iso639v1 }) => ({ [iso639v1]: name }))
      .reduce((value, memo) => ({ ...value, ...memo }), {}),
    null,
    2,
  ),
);
