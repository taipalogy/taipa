import { Metaplasm } from './interface';
import { TonalSyllable } from './tonal/morpheme';
import { Allomorph } from './tonal/version2';
import { Sound } from './grapheme';
import { TonalWord, InflectionalEnding } from './tonal/lexeme';
import { Morpheme } from './morpheme';
import { TonalPhrase } from './tonal/phraseme';
import {
  TonalInflectionLexeme,
  TonalAssimilationLexeme
} from './dparser/lexeme';

export class TonalCombiningMetaplasm extends Metaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
    return [];
  }
}

export class TonalZeroCombining extends TonalCombiningMetaplasm {}

export class RemovingEpenthesisOfAy extends TonalCombiningMetaplasm {
  applyToLetters(letters: Array<string>) {
    letters.shift();
    return letters;
  }
  applyToString(str: string) {
    return str.slice(1, 2);
  }
}

export class RemovingNasalizationOfAy extends TonalCombiningMetaplasm {}

export class KanaCombiningMetaplasm extends Metaplasm {}

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
