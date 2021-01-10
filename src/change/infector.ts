import { TonalInfectionLexeme } from './lexeme';
import { morphAnalyzeChanging } from './analyzer';
import { TonalZeroInfectionMetaplasm } from '../metaplasm';
import { Infection, InfectionExternal } from './metaplasm';
import { TonalInfectionPhrasemeMaker } from './phraseme';

function getNoInfection(word: string) {
  const mrphs = morphAnalyzeChanging(word);
  const lx = new TonalInfectionLexeme(mrphs, new TonalZeroInfectionMetaplasm());

  return lx;
}

/** Infect the following syllable with nasalization. */
export function infectFollowingSyllable(word: string) {
  const ms = morphAnalyzeChanging(word);
  const lx = new TonalInfectionLexeme(ms, new Infection());

  return lx;
}

/** Infect the following word with nasalization. */
export function infectFollowingWord(preceding: string, following: string) {
  const lxPreceding = getNoInfection(preceding);
  const lxFollowing = getNoInfection(following);
  const phmk = new TonalInfectionPhrasemeMaker();
  return phmk.makePhraseme(lxPreceding, lxFollowing, new InfectionExternal());
}

// TODO: infection by m or n?
