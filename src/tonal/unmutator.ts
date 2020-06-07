import { morphAnalyzeUnchanging } from './unassimilator';
import { TonalUnmutationLexeme } from '../dparser/lexeme';
import {
  ConsonantUnmutation,
  FinalConsonantUnmutation,
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

export function unmutateInitialOfFollowingSyllable(word: string) {
  const ms = morphAnalyzeUnchanging(word);
  const lx = new TonalUnmutationLexeme(ms, new ConsonantUnmutation());

  return lx;
}

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
    new FinalConsonantUnmutation()
  );
}
