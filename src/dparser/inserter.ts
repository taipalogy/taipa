import { GraphemeMaker } from '../unit';
import { lowerLettersTonal } from '../tonal/version2';
import { TonalSoundChangingMorphemeMaker } from './morpheme';
import { TonalInsertionLexeme } from './lexeme';
import { Epenthesis, InsertionToEnclitic } from './metaplasm';
import { TonalInsertionPhrasemeMaker } from './phraseme';
import { morphAnalyzeChanging } from './analyzer';
import { TonalZeroInsertionMetaplasm } from '../metaplasm';

function getNoInsertion(word: string) {
  const mrphs = morphAnalyzeChanging(word);
  const lx = new TonalInsertionLexeme(mrphs, new TonalZeroInsertionMetaplasm());

  return lx;
}

/**
 * Inserts an initial m, n, or ng to syllable ay if the preceding syllable has a final m, n, or ng.
 * @param word A word whose second syllable is ay, a, or af. The word has at least 2 syllables for the second one to be inserted an initial.
 */
export function insertToFollowingSyllable(word: string) {
  const tschmm = new TonalSoundChangingMorphemeMaker();
  const gm = new GraphemeMaker(lowerLettersTonal);
  const gs = gm.makeGraphemes(word);
  const mrphs = tschmm.makeMorphemes(gs);

  // TODO: add initial g. b? l?
  const lx = new TonalInsertionLexeme(mrphs, new Epenthesis());

  return lx;
}

/**
 * Insert an initial to the enclitic.
 * @param preceding Thre preceding word.
 * @param following The following word. The enclitic.
 */
export function insertToFollowingWord(preceding: string, following: string) {
  const lxPreceding = getNoInsertion(preceding);
  const lxFollowing = getNoInsertion(following);
  const phmk = new TonalInsertionPhrasemeMaker();

  return phmk.makePhraseme(lxPreceding, lxFollowing, new InsertionToEnclitic());
}
