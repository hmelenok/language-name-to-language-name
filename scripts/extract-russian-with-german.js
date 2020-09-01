const fs = require('fs');
const path = require('path');

const germanCodes = fs.readFileSync(
  path.resolve(__dirname, '../src/ISO-dictionaries/ISO-639-2_de.txt'),
  { encoding: 'utf8' },
);
const dictTXT = fs.readFileSync(
  path.resolve(__dirname, '../src/ISO-dictionaries/RUS_GOST.txt'),
  { encoding: 'utf8' },
);

const germanMap = germanCodes.split('\n').map((line) => {
  const [name, iso639v1, iso639v2, iso639v2B, iso639v3] = line.split('|');
  return {
    name,
    iso639v1,
    iso639v2,
    iso639v2B,
    iso639v3,
  };
});

const dictMap = dictTXT
  .split('\n')
  .map((line) => {
    const [iso3, engName, name] = line.split('|');
    const germanParsedCodes = germanMap.find(
      ({ iso639v3, iso639v2B }) => iso3.indexOf(iso639v3) > -1 || iso3.indexOf(iso639v2B) > -1,
    );
    return {
      name: (name || '').replace('\r', ''),
      iso639v1: germanParsedCodes ? germanParsedCodes.iso639v1 : '',
      engName,
    };
  })
  .filter(({ iso639v1 }) => iso639v1);

fs.writeFileSync(
  path.resolve(__dirname, './russian-extracted.json'),
  JSON.stringify(
    dictMap
      .filter(({ iso639v1 }) => iso639v1)
      .map(({ name, iso639v1 }) => ({ [iso639v1]: name }))
      .reduce((value, memo) => ({ ...value, ...memo }), {}),
    null,
    2,
  ),
);
