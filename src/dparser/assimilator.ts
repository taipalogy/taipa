import { TonalSoundChangingMorphemeMaker } from './morpheme';
import { graphAnalyzeTonal } from '../tonal/analyzer';

/**
 * Analyzes a string into morphemes. Morphological analysis.
 * @param str A word.
 */
export function morphAnalyzeChanging(str: string) {
  const gs = graphAnalyzeTonal(str);
  const tschmm = new TonalSoundChangingMorphemeMaker();
  const mrphs = tschmm.makeMorphemes(gs);
  return mrphs;
}
