import { GraphemeMaker } from '../unit';
import { lowerLettersTonal } from '../tonal/version2';
import { TonalSoundChangingMorphemeMaker } from './morpheme';
import { TonalInsertionLexeme } from './lexeme';
import { Epenthesis } from './metaplasm';

/**
 * Insert an initial m, n, or ng to syllable ay if the preceding syllable has a final m, n, or ng.
 * @param word A word whose second syllable is ay, a, or af. The word has at least 2 syllables for the second one to be inserted an initial.
 */
export function insertTo(word: string) {
  const tschmm = new TonalSoundChangingMorphemeMaker();
  const gm = new GraphemeMaker(lowerLettersTonal);
  const gs = gm.makeGraphemes(word);
  const mrphs = tschmm.makeMorphemes(gs);

  // TODO: add initial g. b? l?
  const lx = new TonalInsertionLexeme(mrphs, new Epenthesis());

  return lx;
}

// TODO: other insertion functions?
