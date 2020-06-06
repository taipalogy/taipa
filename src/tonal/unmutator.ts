import { morphAnalyzeUnchanging } from './unassimilator';
import { TonalUnmutationLexeme } from '../dparser/lexeme';
import { ConsonantUnmutation } from '../dparser/metaplasm';

export function unmutateInitialFollowingSyllable(word: string) {
  const ms = morphAnalyzeUnchanging(word);
  const lx = new TonalUnmutationLexeme(ms, new ConsonantUnmutation());

  return lx;
}
