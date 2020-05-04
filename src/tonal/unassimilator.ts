import { TonalUnassimilationLexeme } from '../dparser/lexeme';
import { graphAnalyzeTonal } from './analyzer';
import { TonalSoundUnchangingMorphemeMaker } from '../dparser/morpheme';
import { ReverseRegressiveInternal } from '../dparser/metaplasm';

function morphAnalyzeUnchanging(str: string) {
  const gs = graphAnalyzeTonal(str);
  const mm = new TonalSoundUnchangingMorphemeMaker();
  const ms = mm.makeMorphemes(gs);
  return ms;
}

/** Unassimilates regressively inside a word. */
export function unassimilateRegressiveLexical(word: string) {
  const ms = morphAnalyzeUnchanging(word);
  const lx = new TonalUnassimilationLexeme(ms, new ReverseRegressiveInternal());

  return lx;
}

/** Unassimilates regressively between 2 words. */
export function unassimilateRegressivePhrasal(
  preceding: string,
  following: string
) {}
