import {
  TonalLemmatizationLexemeMaker,
  TonalLemmatizationLexeme
} from './lexeme';
import { AlphabeticGrapheme, GraphemeMaker } from '../unit';
import { lowerLettersTonal } from './version2';
import {
  TonalUncombiningMorphemeMaker,
  TonalUncombiningMorpheme
} from './morpheme';

/**
 * Analyze a string into tonal graphemes. Graphemic analysis.
 * @param str A string
 */
export function graphAnalyzeTonal(str: string): AlphabeticGrapheme[] {
  const gm = new GraphemeMaker(lowerLettersTonal);
  return gm.makeGraphemes(str);
}

/** Analyze a string into graphemes, morphemes, or lexeme. */
export const tonalLemmatizationAnalyzer = {
  /**
   * Analyze a string or graphemes into morphemes. Morphological analysis.
   * @param x A string or graphemes
   */
  morphAnalyze(x: string | Array<AlphabeticGrapheme>) {
    let gs: AlphabeticGrapheme[] = [];
    if (typeof x == 'object') {
      gs = x;
    } else if (typeof x == 'string') {
      gs = graphAnalyzeTonal(x);
    }

    const mm = new TonalUncombiningMorphemeMaker();
    return mm.makeMorphemes(gs);
  },

  /**
   * Analyze a string or morphemes into a lexeme. Lexical analysis.
   * @param x A string or uncombining morphemes
   */
  lexAnalyze(
    x: string | Array<TonalUncombiningMorpheme>
  ): TonalLemmatizationLexeme {
    let ms: Array<TonalUncombiningMorpheme> = [];
    if (typeof x == 'object') {
      ms = x;
    } else if (typeof x == 'string') {
      ms = this.morphAnalyze(x);
    }

    const lm = new TonalLemmatizationLexemeMaker();
    return lm.makeLexemes(ms);
  }
};
