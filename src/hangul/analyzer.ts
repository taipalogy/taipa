import { GraphemeMaker } from '../unit';
import { lowerLettersHangul } from './hangul';

/**
 * Analyzes a string into graphemes. Graphemic analysis.
 * @param str A string
 */
export function graphAnalyzeHangul(str: string) {
  const gm = new GraphemeMaker(lowerLettersHangul);
  return gm.makeGraphemes(str);
}
