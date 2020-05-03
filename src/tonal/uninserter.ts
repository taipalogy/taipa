import { GraphemeMaker } from '../unit';
import { lowerLettersTonal } from './version2';
import { TonalUninsertionLexeme } from '../dparser/lexeme';
import { TonalSoundUnchangingMorphemeMaker } from '../dparser/morpheme';
import { Uninsertion } from '../dparser/metaplasm';

/**
 * Uninserts an initial m, n, or ng from syllable ~ay if the preceding syllable has a final m, n, or ng.
 * @param word A word whose second syllable is may, nay, ngay, ma, na, nga, maf, naf, or ngaf. The word has at least 2 syllables for the second one to be uninserted an initial.
 */
export function uninsertFrom(word: string) {
  const mm = new TonalSoundUnchangingMorphemeMaker();
  const gm = new GraphemeMaker(lowerLettersTonal);
  const gs = gm.makeGraphemes(word);
  const ms = mm.makeMorphemes(gs);

  // TODO: add initial g. b? l?
  const lx = new TonalUninsertionLexeme(ms, new Uninsertion());

  return lx;
}

export function uninsertPhrasalFrom(preceding: string, following: string) {}
