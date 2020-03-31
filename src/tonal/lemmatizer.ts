import { tonalLemmatizationAnalyzer } from './analyzer';

/**
 * Lemmatize a word and create a `TonalLemmatizationLexeme`.
 * @param word A word to be lemmatized.
 */
export function lemmatize(word: string) {
  const mrphs = tonalLemmatizationAnalyzer.morphAnalyze(word);
  const lx = tonalLemmatizationAnalyzer.lexAnalyze(mrphs);
  return lx;
}
