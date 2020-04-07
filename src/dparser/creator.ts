import { tonalInflectionAnalyzer } from './analyzer';
import { TonalPhrase } from '../tonal/phraseme';
import { TonalZeroInflection } from '../metaplasm';
import { TonalInflectionPhrasemeMaker } from './phraseme';
import { TonalZeroCombining, TonalCombiningMetaplasm } from '../metaplasm';
import { TonalDesinenceInflection } from './metaplasm';

/** Creates a lexeme given a `TonalCombiningMetaplasm`. If metaplasm is not provided, `TonalZeroCombining` is defaulted. Excessive tokens are ignored. */
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

/** Creates a phrase given a sequence of arbitrary words regardless of syntax. Tokens are analyzed one by one. */
export function createTonalPhrase(str: string) {
  const tia = tonalInflectionAnalyzer;

  const strs = str.match(/\w+/g);
  const lxs = strs
    ? strs.map(it => tia.lexAnalyze(it, new TonalZeroInflection()))
    : [];

  return new TonalPhrase(lxs.map(it => it.word));
}

/**
 * Creates a compound in which the preceding word will be inflected and the following word will not.
 * @param preceding A word that will be inflected.
 * @param following A word that will not be inflected.
 */
export function createCompoundPhraseme(preceding: string, following: string) {
  const tia = tonalInflectionAnalyzer;
  const tiphm = new TonalInflectionPhrasemeMaker();

  const lxPreceding = tia.lexAnalyze(preceding, new TonalDesinenceInflection());
  const lxFollowing = createTonalInflectionLexeme(following);
  return tiphm.makeCompoundPhraseme(lxPreceding, lxFollowing);
}
