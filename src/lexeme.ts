import { Morpheme } from './morpheme';
import { TonalWord, InflectionalEnding } from './tonal/lexeme';
import { Metaplasm } from './interface';

export class TonalInflectionMetaplasm extends Metaplasm {
  apply(morphemes: Array<Morpheme>): TonalWord[] {
    return [];
  }
}

export class TonalZeroInflection extends TonalInflectionMetaplasm {}

export class TonalAssimilationMetaplasm extends Metaplasm {
  apply(morphemes: Array<Morpheme>): TonalWord[] {
    return [];
  }
}

export class TonalZeroAssimilation extends TonalAssimilationMetaplasm {}

export class TonalLemmatizationMetaplasm extends Metaplasm {
  apply(
    morphemes: Array<Morpheme>,
    inflectionalEnding: InflectionalEnding
  ): TonalWord[] {
    return [];
  }
}

export abstract class Lexeme {}

export class Word {
  literal: string = '';
}

export abstract class LexemeMaker {
  protected abstract make(ms: Array<Morpheme>): Lexeme;
}
