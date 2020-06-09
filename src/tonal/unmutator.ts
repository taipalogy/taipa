import { morphAnalyzeUnchanging } from './unassimilator';
import { TonalUnmutationLexeme } from '../dparser/lexeme';
import {
  ConsonantUnmutation,
  FinalConsonantUnmutationExternal,
  FinalConsonantUnmutationInternal,
} from '../dparser/metaplasm';
import { TonalZeroUnmutationMetaplasm } from '../metaplasm';
import { TonalUnmutationPhrasemeMaker } from '../dparser/phraseme';

function getNoUnmutation(word: string) {
  const mrphs = morphAnalyzeUnchanging(word);
  const lx = new TonalUnmutationLexeme(
    mrphs,
    new TonalZeroUnmutationMetaplasm()
  );

  return lx;
}

/** Unmutates the initial of the following syllable. */
export function unmutateInitialOfFollowingSyllable(word: string) {
  const ms = morphAnalyzeUnchanging(word);
  const lx = new TonalUnmutationLexeme(ms, new ConsonantUnmutation());

  return lx;
}

/** Unmutates the final of the preceding syllable. */
export function unmutateFinalOfPrecedingSyllable(word: string) {
  const ms = morphAnalyzeUnchanging(word);
  const lx = new TonalUnmutationLexeme(
    ms,
    new FinalConsonantUnmutationInternal()
  );

  return lx;
}

/** Unmutates the final of the preceding word. */
export function unmutateFinalOfPrecedingWord(
  preceding: string,
  following: string
) {
  const lxPreceding = getNoUnmutation(preceding);
  const lxFollowing = getNoUnmutation(following);
  const phmk = new TonalUnmutationPhrasemeMaker();
  return phmk.makePhraseme(
    lxPreceding,
    lxFollowing,
    new FinalConsonantUnmutationExternal()
  );
}
