import { TonalInfectionLexeme } from './lexeme';
import { morphAnalyze } from './assimilator';

export function infectAgressiveLexical(word: string) {
  const ms = morphAnalyze(word);
  const lx = new TonalInfectionLexeme(ms);

  return lx;
}
