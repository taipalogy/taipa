import { TonalInflectionAnalyzer } from './analyzer';
import { TonalPhrase } from '../tonal/phraseme';
import { TonalZeroInflection } from '../tonal/metaplasm';
import { TonalInflectionPhrasemeMaker } from './phraseme';
import { TonalZeroCombining, TonalCombiningMetaplasm } from '../morpheme';
import { TonalDesinenceInflection } from './metaplasm';

/** Create a taiwanese lexeme given a `TonalCombiningMetaplasm`. If metaplasm is not provided, `TonalZeroCombining` is defaulted. Excessive tokens are ignored */
export function createTonalInflectionLexeme(
  str: string,
  metaplasm?: TonalCombiningMetaplasm
) {
  const tia = new TonalInflectionAnalyzer();

  const ms = metaplasm
    ? tia.morphAnalyze(str, metaplasm)
    : tia.morphAnalyze(str, new TonalZeroCombining());
  const lx = tia.lexAnalyze(ms, new TonalDesinenceInflection());

  return lx;
}

/** Create a phrase given a sequence of arbitrary taiwanese words. Tokens are analyzed one by one */
export function createTonalPhrase(str: string) {
  const tia = new TonalInflectionAnalyzer();

  const strs = str.match(/\w+/g);
  const lxs = strs
    ? strs.map(it => tia.lexAnalyze(it, new TonalZeroInflection()))
    : [];

  return new TonalPhrase(lxs.map(it => it.word));
}

export function createCompoundPhraseme(preceding: string, following: string) {
  // serial compound
  const tia = new TonalInflectionAnalyzer();
  const tiph = new TonalInflectionPhrasemeMaker();

  const lexemePreceding = tia.lexAnalyze(
    preceding,
    new TonalDesinenceInflection()
  );
  const lexemeFollowing = createTonalInflectionLexeme(following);
  return tiph.makeCompoundPhraseme(lexemePreceding, lexemeFollowing);
}
