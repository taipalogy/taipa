import { InflectionalEnding } from './tonal/lexeme';
import {
  TonalInflectionLexeme,
  TonalAssimilationLexeme
} from './dparser/lexeme';
import { TonalPhrase } from './tonal/phraseme';
import { Metaplasm } from './interface';

export class TonalPhrasalInflectionMetaplasm extends Metaplasm {
  apply(
    lexemeOne: TonalInflectionLexeme,
    lexemeTwo: TonalInflectionLexeme
  ): TonalPhrase[] {
    return [];
  }

  applyVpp(
    lexemeOne: TonalInflectionLexeme,
    lexemeTwo: TonalInflectionLexeme,
    lexemeThree: TonalInflectionLexeme
  ): TonalPhrase[] {
    return [];
  }
}

export class TonalPhrasalZeroInflection extends TonalPhrasalInflectionMetaplasm {}

export class TonalPhrasalAssimilationMetaplasm extends Metaplasm {
  apply(
    lexemeOne: TonalAssimilationLexeme,
    lexemeTwo: TonalAssimilationLexeme
  ): TonalPhrase[] {
    return [];
  }
}

export class ToneGroup {
  inflectionalEndings: Array<InflectionalEnding> = new Array();
}

class ToneSandhiGroup extends ToneGroup {}

export abstract class Phraseme {}

export class Phrase {
  literal: string = '';
}
