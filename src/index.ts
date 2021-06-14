import dir from './maps/dir';
import native from './maps/native';
import countryCodes from './maps/countries';
import shortCountryCodes from './maps/countries/short';
import languages from './maps/languages';
import { LanguageNameMap, LanguageCode } from './types';

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

function getLanguageName(
  targetLanguage: string,
  sourceLanguage?: string
): string;
function getLanguageName({
  targetLanguage,
  sourceLanguage,
}: {
  targetLanguage: LanguageCode;
  sourceLanguage?: LanguageCode;
}): string;

function getLanguageName(
  options: any,
  possibleSourceLanguage: string = 'en',
): string {
  let targetLanguage;
  let sourceLanguage;
  if (typeof options === 'string') {
    targetLanguage = options;
    sourceLanguage = possibleSourceLanguage;
  }
  if (typeof options === 'object') {
    targetLanguage = options.targetLanguage;
    sourceLanguage = options.sourceLanguage || 'en';
  }

  const hasSourceLanguage = sourceLanguage in languages;
  const hasTargetLanguage = hasSourceLanguage && targetLanguage in languages[sourceLanguage];

  if (hasSourceLanguage && hasTargetLanguage) {
    return languages[sourceLanguage][targetLanguage];
  }
  if (languages.en[targetLanguage]) {
    return languages.en[targetLanguage];
  }

  return '';
}

/**
 *
 * @param localeCode (ex: en-GB)
 * @param possibleSourceLanguage translated to (ex: uk - ukrainian )
 * @param shortCountryName USA or United States of America
 */
function getLanguageNameWithCountry(
  localeCode: string,
  possibleSourceLanguage: LanguageCode = 'en',
  shortCountryName: boolean = true,
): { native: LanguageNameMap; countryName: any; languageName: string } {
  const [languageName, countryName] = localeCode.split('-');
  const hasCountryTranslated = possibleSourceLanguage in countryCodes;
  const hasShortCountryTranslated = possibleSourceLanguage in shortCountryCodes;
  const listOfLanguages = langToLang(possibleSourceLanguage as LanguageCode);
  const nativeList = listOfLanguages && listOfLanguages[languageName] ? listOfLanguages[languageName].native : '';

  if (hasCountryTranslated) {
    const currentCountryName = countryCodes[possibleSourceLanguage][countryName];
    const currentShortCountryName = shortCountryCodes[possibleSourceLanguage][countryName];
    return {
      countryName:
        (shortCountryName && currentShortCountryName && hasShortCountryTranslated
          ? currentShortCountryName
          : currentCountryName) || '',
      languageName: getLanguageName(languageName, possibleSourceLanguage),
      native: nativeList,
    };
  }
  return {
    countryName: countryCodes.en[countryName] || '',
    languageName: getLanguageName(languageName, possibleSourceLanguage),
    native: nativeList,
  };
}

export { getLanguageName, getLanguageNameWithCountry };

export default langToLang;
