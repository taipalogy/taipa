import { InflectionalEnding } from './tonal/lexeme';
import { TonalInflectionLexeme, TonalAssimilationLexeme } from './dparser/lexeme';
import { TonalPhrase } from './tonal/phraseme';

export abstract class PhrasalMetaplasm {}

export class TonalPhrasalInflectionMetaplasm extends PhrasalMetaplasm {
    apply(lexemeOne: TonalInflectionLexeme, lexemeTwo: TonalInflectionLexeme): TonalPhrase[] {
        return [];
    }

    applyTwoParticles(
        lexemeOne: TonalInflectionLexeme,
        lexemeTwo: TonalInflectionLexeme,
        lexemeThree: TonalInflectionLexeme
    ): TonalPhrase[] {
        return [];
    }
}

export class TonalPhrasalZeroInflection extends TonalPhrasalInflectionMetaplasm {}

export class TonalPhrasalAssimilationMetaplasm extends PhrasalMetaplasm {
    apply(lexemeOne: TonalAssimilationLexeme, lexemeTwo: TonalAssimilationLexeme): TonalPhrase[] {
        return [];
    }
}

// -----------------------------------------------------------------------------

export class ToneGroup {
    inflectionalEndings: Array<InflectionalEnding> = new Array();
}

class ToneSandhiGroup extends ToneGroup {}

// -----------------------------------------------------------------------------

export class Phraseme {}

// -----------------------------------------------------------------------------

export class Phrase {
    literal: string = '';
}
