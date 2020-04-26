import { GraphemeMaker } from '../unit';
import { lowerLettersTonal } from './version2';
import { TonalUninsertionLexeme } from '../dparser/lexeme';
import { TonalSoundUnchangingMorphemeMaker } from '../dparser/morpheme';
import { Uninsertion } from '../dparser/metaplasm';

export function uninsertFrom(word: string) {
  const mm = new TonalSoundUnchangingMorphemeMaker();
  const gm = new GraphemeMaker(lowerLettersTonal);
  const gs = gm.makeGraphemes(word);
  const ms = mm.makeMorphemes(gs);

  // TODO: add initial g. b? l?
  const lx = new TonalUninsertionLexeme(ms, new Uninsertion());

  return lx;
}
