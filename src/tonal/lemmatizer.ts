import { TonalLemmatizationAnalyzer } from './analyzer';

/** Lemmatize a word and create a `TonalLemmatizationLexeme`. */
export class TonalLemmatizer {
  /** Lemmatize a word. */
  lemmatize(word: string) {
    const tia = new TonalLemmatizationAnalyzer();
    const mrphs = tia.morphAnalyze(word);
    const lx = tia.lexAnalyze(mrphs);
    return lx;
  }
}
