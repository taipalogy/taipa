import { TonalMutationLexeme } from '../change/lexeme';
import { morphAnalyzeChanging } from '../change/analyzer';
import {
  ConsonantMutation,
  FinalConsonantMutationExternal,
  FinalConsonantMutationInternal,
} from '../change/metaplasm';
import { TonalZeroMutationMetaplasm } from '../metaplasm';
import { TonalMutationPhrasemeMaker } from './phraseme';

function getNoMutation(word: string) {
  const mrphs = morphAnalyzeChanging(word);
  const lx = new TonalMutationLexeme(mrphs, new TonalZeroMutationMetaplasm());

  return lx;
}

/** Mutates the initial of the following syllable. */
export function mutateInitialOfFollowingSyllable(word: string) {
  const ms = morphAnalyzeChanging(word);
  const lx = new TonalMutationLexeme(ms, new ConsonantMutation());

  return lx;
}

/** Mutates the final of the preceding syllable. */
export function mutateFinalConsonantOfPrecedingSyllable(word: string) {
  const mrphs = morphAnalyzeChanging(word);
  const lx = new TonalMutationLexeme(
    mrphs,
    new FinalConsonantMutationInternal()
  );

  return lx;
}

/** Mutates the final of the preceding word. */
export function mutateFinalOfPrecedingWord(
  preceding: string,
  following: string
) {
  const lxPreceding = getNoMutation(preceding);
  const lxFollowing = getNoMutation(following);
  const phmk = new TonalMutationPhrasemeMaker();
  return phmk.makePhraseme(
    lxPreceding,
    lxFollowing,
    new FinalConsonantMutationExternal()
  );
}
