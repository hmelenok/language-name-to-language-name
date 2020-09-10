import dir from './maps/dir';
import native from './maps/native';
import languages from './maps/languages';
import { LanguageNameMap, LanguageCode } from './types';

export const langToLang = (language: LanguageCode = 'en'): LanguageNameMap => {
  const targetLanguage = languages[language];
  const keys = Object.keys(targetLanguage);

  return keys
    .map((currentLanguage) => ({
      value: targetLanguage[currentLanguage],
      lang: currentLanguage,
    }))
    .map(({ value, lang }) => ({
      [lang]: {
        name: value,
        native: native[lang],
        dir: dir[lang],
      },
    }))
    .reduce((value, memo) => ({ ...memo, ...value }), {} as any);
};

export default langToLang;
