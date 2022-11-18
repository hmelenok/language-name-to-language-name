import { LanguageCode, LanguageNameMap } from './types';
import countryCodes from './maps/countries';
import shortCountryCodes from './maps/countries/short';
import { langToLang } from './lang-to-lang';
import { getLanguageName } from './get-lang-name';

/**
 *
 * @param localeCode (ex: en-GB)
 * @param possibleSourceLanguage translated to (ex: uk - ukrainian )
 * @param shortCountryName USA or United States of America
 */
const getLanguageNameWithCountry = (
  localeCode: string,
  possibleSourceLanguage: LanguageCode = 'en',
  shortCountryName: boolean = true,
): { native: LanguageNameMap; countryName: any; languageName: string } => {
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
};

export { getLanguageNameWithCountry };
