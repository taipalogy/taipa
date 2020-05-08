import { TonalInfectionLexeme } from './lexeme';
import { morphAnalyzeChanging } from './assimilator';

export function infectFollowingLexical(word: string) {
  const ms = morphAnalyzeChanging(word);
  const lx = new TonalInfectionLexeme(ms);

  return lx;
}
