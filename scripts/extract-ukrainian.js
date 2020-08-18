const fs = require('fs');
const path = require('path');

const dictTXT = fs.readFileSync(
  path.resolve(__dirname, '../src/ISO-dictionaries/ISO-639-2_uk.txt'),
  { encoding: 'utf8' },
);

const dictMap = dictTXT.split('\n').map((line) => {
  const [iso639v1, iso639v2, iso639v3, name, native] = line.split('|');
  return {
    iso639v1,
    iso639v2,
    iso639v3,
    name,
    native,
  };
});

fs.writeFileSync(
  path.resolve(__dirname, './ukrainian-extracted.json'),
  JSON.stringify(
    dictMap
      .filter(({ iso639v1 }) => iso639v1)
      .map(({ name, iso639v1 }) => ({ [iso639v1]: name }))
      .reduce((value, memo) => ({ ...value, ...memo }), {}),
    null,
    2,
  ),
);
