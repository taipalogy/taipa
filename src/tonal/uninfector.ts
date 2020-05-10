import { morphAnalyzeUnchanging } from './unassimilator';
import { TonalUninfectionLexeme } from '../dparser/lexeme';

export function uninfectFollowingSyllable(word: string) {
  const ms = morphAnalyzeUnchanging(word);
  const lx = new TonalUninfectionLexeme(ms);

  return lx;
}
