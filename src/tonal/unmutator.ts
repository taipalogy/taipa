import { morphAnalyzeUnchanging } from './unassimilator';
import { TonalUnmutationLexeme } from '../dparser/lexeme';
import { TonalUnmutationPhrasemeMaker } from '../dparser/phraseme';
import {
  ConsonantUnmutationExternal,
  ConsonantMutation,
} from '../dparser/metaplasm';
import { TonalZeroUnmutationMetaplasm } from '../metaplasm';

export function getNoUnmutation(word: string) {
  const mrphs = morphAnalyzeUnchanging(word);
  const lx = new TonalUnmutationLexeme(
    mrphs,
    new TonalZeroUnmutationMetaplasm()
  );

  return lx;
}

export function unmutateInitialFollowingSyllable(word: string) {
  const ms = morphAnalyzeUnchanging(word);
  const lx = new TonalUnmutationLexeme(ms, new ConsonantMutation());

  return lx;
}

export function unmutateInitialFollowingWord(
  preceding: string,
  following: string
) {
  const lxPreceding = getNoUnmutation(preceding);
  const lxFollowing = getNoUnmutation(following);
  const phmk = new TonalUnmutationPhrasemeMaker();
  return phmk.makePhraseme(
    lxPreceding,
    lxFollowing,
    new ConsonantUnmutationExternal()
  );
}
