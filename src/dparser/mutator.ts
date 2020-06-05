import { TonalMutationLexeme } from './lexeme';
import { morphAnalyzeChanging } from './assimilator';
import { ConsonantMutation } from './metaplasm';

export function mutateInitialFollowingSyllable(word: string) {
  const ms = morphAnalyzeChanging(word);
  const lx = new TonalMutationLexeme(ms, new ConsonantMutation());

  return lx;
}
