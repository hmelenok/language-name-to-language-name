const fs = require('fs');
const path = require('path');

const dictTXT = fs.readFileSync(
  path.resolve(__dirname, '../src/ISO-dictionaries/ISO-3166-1.txt'),
  { encoding: 'utf8' },
);

const comaRegex = /(")+([\w ])+(,)+/;

const dictMap = dictTXT.split('\n').map((line) => {
  const hasComa = line.match(comaRegex);
  let newLine = line;
  if (hasComa) {
    newLine = line.replace(comaRegex, '$2@@').split('"').join('');
  }

  const [
    code,
    countryName,
    year,
    countryTopLevelDomain,
    iso3166,
  ] = newLine.split(',');
  return {
    code,
    countryName: !hasComa ? countryName : (countryName || '').replace(`${hasComa[2] || ''}@@`, hasComa[0].replace('"', '')),
    year,
    countryTopLevelDomain,
    iso3166,
  };
});

fs.writeFileSync(
  path.resolve(__dirname, './country-codes-extracted.json'),
  JSON.stringify(
    dictMap
      .filter(({ code }) => code)
      .map(({ code, countryName }) => ({ [code]: countryName }))
      .reduce((value, memo) => ({ ...value, ...memo }), {}),
    null,
    2,
  ),
);
