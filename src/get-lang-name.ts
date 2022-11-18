import { LanguageCode } from './types';
import languages from './maps/languages';

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

export { getLanguageName };

export default getLanguageName;
