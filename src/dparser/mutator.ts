import { TonalMutationLexeme } from './lexeme';
import { morphAnalyzeChanging } from './assimilator';

export function mutateFollowingAffix(word: string) {
  const ms = morphAnalyzeChanging(word);
  const lx = new TonalMutationLexeme(ms);

  return lx;
}
