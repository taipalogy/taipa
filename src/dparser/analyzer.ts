import { AlphabeticGrapheme } from '../unit';
import {
  TonalCombiningMorphemeMaker,
  TonalCombiningMorpheme
} from './morpheme';
import { TonalInflectionLexemeMaker, TonalInflectionLexeme } from './lexeme';
import { TonalInflectionMetaplasm } from '../metaplasm';
import { TonalCombiningMetaplasm } from '../metaplasm';
import { TonalCombiningForms } from './metaplasm';
import { graphAnalyzeTonal } from '../tonal/analyzer';

/** Analyze a string into graphemes, morphemes, or lexeme. */
export const tonalInflectionAnalyzer = {
  /**
   * Analyzes a string or graphemes into morphemes. Morphological analysis.
   * @param x A string or graphemes
   * @param metaplasm A combining metaplasm
   */
  morphAnalyze(
    x: string | Array<AlphabeticGrapheme>,
    metaplasm: TonalCombiningMetaplasm
  ) {
    let gs: AlphabeticGrapheme[] = [];
    if (typeof x == 'object') {
      gs = x;
    } else if (typeof x == 'string') {
      gs = graphAnalyzeTonal(x);
    }

    const mm = new TonalCombiningMorphemeMaker(metaplasm);
    return mm.makeMorphemes(gs);
  },

  /**
   * Analyzes a string or morphemes into a lexeme. Lexical analysis.
   * @param x A string or combining morphemes
   * @param metaplasm An inflection metaplasm
   */
  lexAnalyze(
    x: string | Array<TonalCombiningMorpheme>,
    metaplasm: TonalInflectionMetaplasm
  ): TonalInflectionLexeme {
    let ms: Array<TonalCombiningMorpheme> = [];
    if (typeof x == 'object') {
      ms = x;
    } else if (typeof x == 'string') {
      ms = this.morphAnalyze(x, new TonalCombiningForms());
    }

    const lm = new TonalInflectionLexemeMaker(metaplasm);
    return lm.makeLexemes(ms);
  }
};
