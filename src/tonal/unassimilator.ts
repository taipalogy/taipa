import { TonalUnassimilationLexeme } from '../dparser/lexeme';
import { graphAnalyzeTonal } from './analyzer';
import { TonalSoundUnchangingMorphemeMaker } from '../dparser/morpheme';
import { ReverseRegressiveInternal } from '../dparser/metaplasm';

function morphAnalyze(str: string) {
  const gs = graphAnalyzeTonal(str);
  const mm = new TonalSoundUnchangingMorphemeMaker();
  const ms = mm.makeMorphemes(gs);
  return ms;
}

/** Unassimilates regressively inside a word. */
export function unassimilateRegressiveLexical(word: string) {
  const ms = morphAnalyze(word);
  const lx = new TonalUnassimilationLexeme(ms, new ReverseRegressiveInternal());

  return lx;
}

/** Unassimilates agressively between 2 words. */
export function unassimilateAgressivePhrasal(
  preceding: string,
  following: string
) {}

/** Unassimilates regressively between 2 words. */
export function unassimilateRegressivePhrasal(
  preceding: string,
  following: string
) {}
