import dir from './maps/dir';
import native from './maps/native';
import { langToLang } from './index';

const LIST_LENGTH = 184;

describe('langToLang', () => {
  it('should have all keys', () => {
    const map = langToLang('en');
    const mapFr = langToLang('fr');
    const mapUk = langToLang('fr');
    expect(Object.keys(map)).toEqual(Object.keys(mapFr));
    expect(Object.keys(map)).toEqual(Object.keys(mapUk));
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

describe('maps', () => {
  it('dir', () => {
    expect(Object.keys(dir)).toHaveLength(LIST_LENGTH);
  });
  it('native', () => {
    expect(Object.keys(native)).toHaveLength(LIST_LENGTH);
  });
});