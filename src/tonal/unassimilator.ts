import { graphAnalyzeTonal } from './analyzer';
import { TonalSoundUnchangingMorphemeMaker } from '../dparser/morpheme';

export function morphAnalyzeUnchanging(str: string) {
  const gs = graphAnalyzeTonal(str);
  const mm = new TonalSoundUnchangingMorphemeMaker();
  const ms = mm.makeMorphemes(gs);
  return ms;
}
