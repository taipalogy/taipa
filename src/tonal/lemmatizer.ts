import { TonalLemmatizationAnalyzer } from './analyzer';

/** Given a word, lemmatize it and create a `TonalLemmatizationLexeme`. */
export class TonalLemmatizer {
  /** lemmatize a word */
  lemmatize(word: string) {
    const tia = new TonalLemmatizationAnalyzer();
    const mrphs = tia.morphAnalyze(word);
    const lx = tia.lexAnalyze(mrphs);
    return lx;
  }
}
