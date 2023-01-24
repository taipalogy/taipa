import { GraphemeMaker, AlphabeticGrapheme } from '../unit';
import { KanaUncombiningMorphemeMaker } from './morpheme';
import { lowerLettersKana } from './kanaalphabet';
import { KanaCombiningMetaplasm } from '../metaplasm';

/**
 * Analyzes a string into graphemes. Graphemic analysis.
 * @param str A string
 */
export function graphAnalyzeKana(str: string) {
  const gm = new GraphemeMaker(lowerLettersKana);
  return gm.makeGraphemes(str);
}

/** Analyzes a string into morphemes. */
export const kanaLemmatizationAnalyzer = {
  /**
   * Analyzes a string or graphemes into morphemes. Morphological analysis.
   * @param x A string or graphemes
   */
  morphAnalyze(x: string | Array<AlphabeticGrapheme>) {
    let graphemes: Array<AlphabeticGrapheme> = [];
    if (typeof x == 'object') {
      graphemes = x;
    } else if (typeof x == 'string') {
      graphemes = graphAnalyzeKana(x);
    }

    const mm = new KanaUncombiningMorphemeMaker(new KanaCombiningMetaplasm());
    return mm.makeMorphemes(graphemes);
  },
};
