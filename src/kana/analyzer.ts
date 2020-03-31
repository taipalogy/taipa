import { GraphemeMaker, AlphabeticGrapheme } from '../unit';
import {
  KanaUncombiningMorphemeMaker,
  KanaUncombiningMorpheme
} from './morpheme';
import { lowerLettersKana } from './kana';
import { KanaCombiningMetaplasm } from '../metaplasm';

/**
 * Analyze a string into graphemes. Graphemic analysis.
 * @param str a string
 */
export function graphAnalyzeKana(str: string) {
  // graphemic analysis
  const gm = new GraphemeMaker(lowerLettersKana);
  return gm.makeGraphemes(str);
}

/** Analyze a string into morphemes */
export const kanaLemmatizationAnalyzer = {
  /**
   * Analyze a string or graphemes into morphemes. Morphological analysis.
   * @param x a string or graphemes
   */
  morphAnalyze(x: string | Array<AlphabeticGrapheme>) {
    // morphological analysis
    let graphemes: Array<AlphabeticGrapheme> = [];
    if (typeof x == 'object') {
      graphemes = x;
    } else if (typeof x == 'string') {
      graphemes = graphAnalyzeKana(x);
    }

    const mm = new KanaUncombiningMorphemeMaker(new KanaCombiningMetaplasm());
    return mm.makeInputingMorphemes(graphemes);
  }
};
