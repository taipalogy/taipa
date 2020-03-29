import { GraphemeMaker, AlphabeticGrapheme } from '../unit';
import { Analyzer } from '../interface';
import {
  TonalCombiningMorphemeMaker,
  TonalCombiningMorpheme
} from './morpheme';
import { lowerLettersTonal } from '../tonal/version2';
import { TonalInflectionLexemeMaker, TonalInflectionLexeme } from './lexeme';
import { TonalInflectionMetaplasm } from '../metaplasm';
import { TonalCombiningMetaplasm } from '../metaplasm';
import { TonalCombiningForms } from './metaplasm';

/** Analyze a string into graphemes, morphemes, or lexeme. */
export class TonalInflectionAnalyzer extends Analyzer {
  /**
   * Analyze a string into graphemes. Graphemic analysis.
   * @param str a string
   */
  graphAnalyze(str: string): AlphabeticGrapheme[] {
    const gm = new GraphemeMaker(lowerLettersTonal);
    return gm.makeGraphemes(str);
  }

  morphAnalyze(
    str: string,
    metaplasm: TonalCombiningMetaplasm
  ): TonalCombiningMorpheme[];
  morphAnalyze(
    graphemes: Array<AlphabeticGrapheme>,
    metaplasm: TonalCombiningMetaplasm
  ): TonalCombiningMorpheme[];
  /**
   * Analyze a string or graphemes into morphemes. Morphological analysis.
   * @param x a string or graphemes
   * @param metaplasm a combining metaplasm
   */
  morphAnalyze(
    x: string | Array<AlphabeticGrapheme>,
    metaplasm: TonalCombiningMetaplasm
  ) {
    let gs: AlphabeticGrapheme[] = [];
    if (typeof x == 'object') {
      gs = x;
    } else if (typeof x == 'string') {
      gs = this.graphAnalyze(x);
    }

    const mm = new TonalCombiningMorphemeMaker(metaplasm);
    return mm.makeMorphemes(gs);
  }

  lexAnalyze(
    str: string,
    metaplasm: TonalInflectionMetaplasm
  ): TonalInflectionLexeme;
  lexAnalyze(
    morphemes: Array<TonalCombiningMorpheme>,
    metaplasm: TonalInflectionMetaplasm
  ): TonalInflectionLexeme;
  /**
   * Analyze a string or morphemes into a lexeme. Lexical analysis.
   * @param x a string or combining morphemes
   * @param metaplasm an inflection metaplasm
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
}
