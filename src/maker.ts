import { TonalCombiningMetaplasm } from './metaplasm';
import {
  Morpheme,
  MatchedPattern,
  AlphabeticLetter,
  makeMatchedPatterns,
  Lexeme,
} from './unit';

export abstract class MorphemeMaker {
  protected abstract createArray(): Morpheme[];

  protected abstract createMorpheme(
    matched: MatchedPattern,
    metaplasm: TonalCombiningMetaplasm
  ): Morpheme;

  protected make(
    letters: Array<AlphabeticLetter>,
    syllabify: (
      letters: Array<AlphabeticLetter>,
      beginOfSyllable: number
    ) => MatchedPattern
  ): MatchedPattern[] {
    return makeMatchedPatterns(letters, syllabify);
  }
}

export abstract class LexemeMaker {
  protected abstract make(ms: Array<Morpheme>): Lexeme;
}
