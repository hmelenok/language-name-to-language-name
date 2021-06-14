import dir from './maps/dir';
import native from './maps/native';
import {
  getLanguageName,
  getLanguageNameWithCountry,
  langToLang,
} from './index';

const LIST_LENGTH = 186;

describe('langToLang', () => {
  it('should have all keys', () => {
    const map = langToLang('en');
    const mapFr = langToLang('fr');
    const mapDe = langToLang('de');
    const mapUk = langToLang('uk');
    const mapRu = langToLang('ru');
    const mapNb = langToLang('nb');
    const mapEs = langToLang('es');
    expect(Object.keys(map)).toEqual(Object.keys(mapFr));
    expect(Object.keys(map)).toEqual(Object.keys(mapUk));
    expect(Object.keys(map)).toEqual(Object.keys(mapDe));
    expect(Object.keys(map)).toEqual(Object.keys(mapRu));
    expect(Object.keys(map)).toEqual(Object.keys(mapNb));
    expect(Object.keys(map)).toEqual(Object.keys(mapEs));
  });
  it('should return all English names + native', () => {
    expect(Object.keys(langToLang('en'))).toHaveLength(LIST_LENGTH);
  });
  it('should return all French names + native', () => {
    const map = langToLang('fr');
    expect(Object.keys(map)).toHaveLength(LIST_LENGTH);
    expect(map.uk.name).toBe('ukrainien');
  });
});

describe('getLanguageName', () => {
  it('should return languageNames', () => {
    const english = getLanguageName('en');
    const fancyEnglish = getLanguageName({ targetLanguage: 'en' });
    const fancyUkrainisch = getLanguageName({
      targetLanguage: 'uk',
      sourceLanguage: 'de',
    });
    const англійська = getLanguageName('en', 'uk');
    const nonExistent = getLanguageName('yoiuytrew', 'uk');
    const nonExistentSource = getLanguageName('{}', 'ssadasdaasd');
    expect(english).toEqual('English');
    expect(fancyEnglish).toEqual('English');
    expect(fancyUkrainisch).toEqual('Ukrainisch');
    expect(англійська).toEqual('Англійська');
    expect(nonExistent).toEqual('');
    expect(nonExistentSource).toEqual('');
  });
});

describe('getLanguageNameWithCountry', () => {
  it('should return languageNames and countrynames', () => {
    const english = getLanguageNameWithCountry('en');
    const fancyEnglish = getLanguageNameWithCountry('en-GB');
    const fancierEnglish = getLanguageNameWithCountry('en-GB', undefined, false);
    const англійська = getLanguageNameWithCountry('en', 'uk');
    const nonExistent = getLanguageNameWithCountry('yoiuytrew', 'en');
    const nonExistentSource = getLanguageNameWithCountry('{}', 'ssadasdaasd');

    expect(english).toEqual({ countryName: '', languageName: 'English' });
    expect(fancyEnglish).toEqual({
      countryName: 'United Kingdom',
      languageName: 'English',
    });
    expect(fancierEnglish).toEqual({
      countryName: 'United Kingdom of Great Britain and Northern Ireland',
      languageName: 'English',
    });
    expect(англійська).toEqual({ countryName: '', languageName: 'Англійська' });
    expect(nonExistent).toEqual({ countryName: '', languageName: '' });
    expect(nonExistentSource).toEqual({ countryName: '', languageName: '' });
  });
});

describe('maps', () => {
  it('dir', () => {
    expect(Object.keys(dir).reverse()).toEqual(Object.keys(langToLang('en')));
  });
  it('native', () => {
    expect(Object.keys(native).reverse()).toEqual(Object.keys(langToLang('en')));
  });
});
