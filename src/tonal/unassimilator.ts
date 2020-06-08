import { TonalUnassimilationLexeme } from '../dparser/lexeme';
import { graphAnalyzeTonal } from './analyzer';
import { TonalSoundUnchangingMorphemeMaker } from '../dparser/morpheme';
import {
  ReverseRegressiveInternal,
  ReverseRegressiveExternal,
} from '../dparser/metaplasm';
import { TonalZeroUnassimilation } from '../metaplasm';
import { TonalUnassimilationPhrasemeMaker } from '../dparser/phraseme';

export function morphAnalyzeUnchanging(str: string) {
  const gs = graphAnalyzeTonal(str);
  const mm = new TonalSoundUnchangingMorphemeMaker();
  const ms = mm.makeMorphemes(gs);
  return ms;
}

export function getNoUnassimilation(word: string) {
  const mrphs = morphAnalyzeUnchanging(word);
  const lx = new TonalUnassimilationLexeme(
    mrphs,
    new TonalZeroUnassimilation()
  );

  return lx;
}

// TODO: need to differentiate unassimilation between consonant unmutation

/** Unassimilates regressively inside a word. */
export function unassimilateRegressiveInternal(word: string) {
  const ms = morphAnalyzeUnchanging(word);
  const lx = new TonalUnassimilationLexeme(ms, new ReverseRegressiveInternal());

  return lx;
}

/** Unassimilates regressively between 2 words. */
export function unassimilateRegressiveExternal(
  preceding: string,
  following: string
) {
  const lxPreceding = getNoUnassimilation(preceding);
  const lxFollowing = getNoUnassimilation(following);
  const phmk = new TonalUnassimilationPhrasemeMaker();
  return phmk.makePhraseme(
    lxPreceding,
    lxFollowing,
    new ReverseRegressiveExternal()
  );
}
