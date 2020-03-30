import { TonalLemmatizationAnalyzer } from './analyzer';

/**
 * Lemmatize a word and create a `TonalLemmatizationLexeme`.
 * @param word A word to be lemmatized.
 */
export function lemmatize(word: string) {
  const tia = new TonalLemmatizationAnalyzer();
  const mrphs = tia.morphAnalyze(word);
  const lx = tia.lexAnalyze(mrphs);
  return lx;
}
