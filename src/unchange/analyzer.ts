import {
  TonalLemmatizationLexeme,
  TonalLemmatizationLexemeMaker,
} from './lexeme';
import { AlphabeticGrapheme, GraphemeMaker } from '../unit';
import { lowerLettersTonal } from '../tonal/tonalres';
import {
  TonalUncombiningMorphemeMaker,
  TonalUncombiningMorpheme,
} from './morpheme';
import { TonalSoundUnchangingMorphemeMaker } from '../unchange/morpheme';
import { TonalUncombiningMetaplasm } from '../metaplasm';
import { TonalUncombiningForms } from './metaplasm';

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

/**
 * Analyzes a string into graphemes. Graphemic analysis.
 * @param str A string
 */
export function graphAnalyzeTonal(str: string): AlphabeticGrapheme[] {
  const gm = new GraphemeMaker(lowerLettersTonal);
  return gm.makeGraphemes(str);
}

/** Analyzes a string into morphemes or lexeme. */
export const tonalLemmatizationAnalyzer = {
  /**
   * Analyzes a string or graphemes into morphemes. Morphological analysis.
   * @param x A string or graphemes
   */
  morphAnalyze(
    x: string | Array<AlphabeticGrapheme>,
    metaplasm: TonalUncombiningMetaplasm
  ) {
    let gs: AlphabeticGrapheme[] = [];
    if (typeof x == 'object') {
      gs = x;
    } else if (typeof x == 'string') {
      gs = graphAnalyzeTonal(x);
    }

    const mm = new TonalUncombiningMorphemeMaker(metaplasm);
    return mm.makeMorphemes(gs);
  },

  /**
   * Analyzes a string or morphemes into a lexeme. Lexical analysis.
   * @param x A string or uncombining morphemes
   */
  lexAnalyze(
    x: string | Array<TonalUncombiningMorpheme>
  ): TonalLemmatizationLexeme {
    let ms: Array<TonalUncombiningMorpheme> = [];
    if (typeof x == 'object') {
      ms = x;
    } else if (typeof x == 'string') {
      ms = this.morphAnalyze(x, new TonalUncombiningForms([]));
    }

    const lm = new TonalLemmatizationLexemeMaker();
    return lm.makeLexemes(ms);
  },
};
