import { Metaplasm } from '../metaplasm';
import { Morpheme } from '../morpheme';
import { TonalWord, InflectionalEnding } from './lexeme';

//------------------------------------------------------------------------------

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

export class TonalLemmatizationMetaplasm extends Metaplasm {
    apply(morphemes: Array<Morpheme>, inflectionalEnding: InflectionalEnding) {}
}
