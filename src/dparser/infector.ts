import { TonalInfectionLexeme } from './lexeme';
import { morphAnalyzeChanging } from './assimilator';
import { TonalZeroInfectionMetaplasm } from '../metaplasm';
import { Infection, InfectExternal } from './metaplasm';
import { TonalInfectionPhrasemeMaker } from './phraseme';

export function getNoInfection(word: string) {
  const mrphs = morphAnalyzeChanging(word);
  const lx = new TonalInfectionLexeme(mrphs, new TonalZeroInfectionMetaplasm());

  return lx;
}

export function infectFollowingSyllable(word: string) {
  const ms = morphAnalyzeChanging(word);
  const lx = new TonalInfectionLexeme(ms, new Infection());

  return lx;
}

export function infectFollowingWord(preceding: string, following: string) {
  const lxPreceding = getNoInfection(preceding);
  const lxFollowing = getNoInfection(following);
  const phmk = new TonalInfectionPhrasemeMaker();
  return phmk.makePhraseme(lxPreceding, lxFollowing, new InfectExternal());
}
