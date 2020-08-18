import map from 'lodash/map';
import reduce from 'lodash/reduce';
import dir from './maps/dir';
import native from './maps/native';
import languages from './maps/languages';
import { LanguageNameMap, LanguageCode } from './types';

export const langToLang = (language:LanguageCode = 'en'): LanguageNameMap => reduce(map(languages[language], (value, lang) => ({
  [lang]: {
    name: value,
    native: native[lang],
    dir: dir[lang],
  },
})), (value, memo) => ({ ...memo, ...value }), {} as any);

export default langToLang;
