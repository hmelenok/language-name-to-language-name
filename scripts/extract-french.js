const fs = require('fs');
const path = require('path');

const dictTXT = fs.readFileSync(path.resolve(__dirname, '../src/ISO-dictionaries/ISO-639-2_utf-8.txt'), { encoding: 'utf8' });

const dictMap = dictTXT.split('\n').map((line) => {
  const [alpha3bibliograpghic, alpha3term, alpha2code, english, french] = line.split('|');
  return {
    alpha3bibliograpghic, alpha3term, alpha2code, english, french,
  };
});

fs.writeFileSync(path.resolve(__dirname, './french-extracted.json'), JSON
  .stringify(dictMap
    .filter(({ alpha2code }) => alpha2code)
    .map(({ french, alpha2code }) => ({ [alpha2code]: french }))
    .reduce((value, memo) => ({ ...value, ...memo }), {}), null, 2));
