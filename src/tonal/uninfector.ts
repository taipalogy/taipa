import { morphAnalyzeUnchanging } from './unassimilator';
import { TonalUninfectionLexeme } from '../dparser/lexeme';
import { TonalUninfectionPhrasemeMaker } from '../dparser/phraseme';
import { UninfectionExternal, Uninfection } from '../dparser/metaplasm';
import { TonalZeroUninfectionMetaplasm } from '../metaplasm';

export function getNoUninfection(word: string) {
  const mrphs = morphAnalyzeUnchanging(word);
  const lx = new TonalUninfectionLexeme(
    mrphs,
    new TonalZeroUninfectionMetaplasm()
  );

  return lx;
}

/** Uninfect the following syllable which is infected by a nasalization. */
export function uninfectFollowingSyllable(word: string) {
  const ms = morphAnalyzeUnchanging(word);
  const lx = new TonalUninfectionLexeme(ms, new Uninfection());

  return lx;
}

/** Uninfect the following word which is infected by a nasalization. */
export function uninfectFollowingWord(preceding: string, following: string) {
  const lxPreceding = getNoUninfection(preceding);
  const lxFollowing = getNoUninfection(following);
  const phmk = new TonalUninfectionPhrasemeMaker();
  return phmk.makePhraseme(lxPreceding, lxFollowing, new UninfectionExternal());
}
