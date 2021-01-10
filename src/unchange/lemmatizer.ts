import { tonalLemmatizationAnalyzer } from './analyzer';

/**
 * Lemmatizes a word.
 * @param word A word to be lemmatized.
 */
export function lemmatize(word: string) {
  const ms = tonalLemmatizationAnalyzer.morphAnalyze(word);
  const lx = tonalLemmatizationAnalyzer.lexAnalyze(ms);
  return lx;
}
