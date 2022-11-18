import { LanguageCode, LanguageNameMap } from './types';
import languages from './maps/languages';
import native from './maps/native';
import dir from './maps/dir';

export const langToLang = (language: LanguageCode = 'en'): LanguageNameMap | undefined => {
  const targetLanguage = languages[language];
  if (!targetLanguage) {
    return;
  }
  const keys = Object.keys(targetLanguage);

  // eslint-disable-next-line consistent-return
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
