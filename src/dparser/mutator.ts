import { TonalMutationLexeme } from './lexeme';
import { morphAnalyze } from './assimilator';

export function mutateAgressiveLexical(word: string) {
  const ms = morphAnalyze(word);
  const lx = new TonalMutationLexeme(ms);

  return lx;
}
