import { morphAnalyzeUnchanging } from './unassimilator';
import { TonalUnmutationLexeme } from '../dparser/lexeme';
import { ConsonantMutation } from '../dparser/metaplasm';

export function unmutateInitialFollowingSyllable(word: string) {
  const ms = morphAnalyzeUnchanging(word);
  const lx = new TonalUnmutationLexeme(ms, new ConsonantMutation());

  return lx;
}
