import { graphAnalyzeTonal } from './analyzer';
import { TonalSoundUnchangingMorphemeMaker } from '../dparser/morpheme';

/**
 * Analyzes a string into morphemes. Morphological analysis.
 * @param str A word.
 */
export function morphAnalyzeUnchanging(str: string) {
  const gs = graphAnalyzeTonal(str);
  const mm = new TonalSoundUnchangingMorphemeMaker();
  const ms = mm.makeMorphemes(gs);
  return ms;
}
