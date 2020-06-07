import { TonalMutationLexeme } from './lexeme';
import { morphAnalyzeChanging } from './assimilator';
import { ConsonantMutation, FinalConsonantMutation } from './metaplasm';
import { TonalZeroMutationMetaplasm } from '../metaplasm';
import { TonalMutationPhrasemeMaker } from './phraseme';

export function getNoMutation(word: string) {
  const mrphs = morphAnalyzeChanging(word);
  const lx = new TonalMutationLexeme(mrphs, new TonalZeroMutationMetaplasm());

  return lx;
}

export function mutateInitialFollowingSyllable(word: string) {
  const ms = morphAnalyzeChanging(word);
  const lx = new TonalMutationLexeme(ms, new ConsonantMutation());

  return lx;
}

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
    new FinalConsonantMutation()
  );
}
