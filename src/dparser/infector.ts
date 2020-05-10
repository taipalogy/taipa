import { TonalInfectionLexeme } from './lexeme';
import { morphAnalyzeChanging } from './assimilator';

export function infectFollowingSyllable(word: string) {
  const ms = morphAnalyzeChanging(word);
  const lx = new TonalInfectionLexeme(ms);

  return lx;
}
