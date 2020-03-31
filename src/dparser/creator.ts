import { tonalInflectionAnalyzer } from './analyzer';
import { TonalPhrase } from '../tonal/phraseme';
import { TonalZeroInflection } from '../metaplasm';
import { TonalInflectionPhrasemeMaker } from './phraseme';
import { TonalZeroCombining, TonalCombiningMetaplasm } from '../metaplasm';
import { TonalDesinenceInflection } from './metaplasm';

/** Create a lexeme given a `TonalCombiningMetaplasm`. If metaplasm is not provided, `TonalZeroCombining` is defaulted. Excessive tokens are ignored. */
export function createTonalInflectionLexeme(
  str: string,
  metaplasm?: TonalCombiningMetaplasm
) {
  const tia = tonalInflectionAnalyzer;

  const ms = metaplasm
    ? tia.morphAnalyze(str, metaplasm)
    : tia.morphAnalyze(str, new TonalZeroCombining());
  const lx = tia.lexAnalyze(ms, new TonalDesinenceInflection());

  return lx;
}

/** Create a phrase given a sequence of arbitrary words regardless of syntax. Tokens are analyzed one by one. */
export function createTonalPhrase(str: string) {
  const tia = tonalInflectionAnalyzer;

  const strs = str.match(/\w+/g);
  const lxs = strs
    ? strs.map(it => tia.lexAnalyze(it, new TonalZeroInflection()))
    : [];

  return new TonalPhrase(lxs.map(it => it.word));
}

/** Create a compound of type `TonalCompoundPhraseme` in which the preceding word will be inflected and the following word will not. */
export function createCompoundPhraseme(preceding: string, following: string) {
  const tia = tonalInflectionAnalyzer;
  const tiphm = new TonalInflectionPhrasemeMaker();

  const lxPreceding = tia.lexAnalyze(preceding, new TonalDesinenceInflection());
  const lxFollowing = createTonalInflectionLexeme(following);
  return tiphm.makeCompoundPhraseme(lxPreceding, lxFollowing);
}
