import { Syllable, Morpheme } from './morpheme';
import { TonalWord, InflectionalEnding, TonalSymbolEnding } from './tonal/lexeme';

//------------------------------------------------------------------------------
//  Metaplasm
//------------------------------------------------------------------------------

export abstract class Metaplasm {}

export class TonalInflectingMetaplasm extends Metaplasm {
    apply(word: TonalWord, morphemes: Array<Morpheme>, tonalSymbolEnding: TonalSymbolEnding): TonalWord[] { return [] }
}

export class TonalLemmatizingMetaplasm extends Metaplasm {
    apply(word: TonalWord, morphemes: Array<Morpheme>, inflectionalEnding: InflectionalEnding) {}
}

//------------------------------------------------------------------------------
//  Lexeme
//------------------------------------------------------------------------------

export abstract class Lexeme {}

//------------------------------------------------------------------------------
//  Word
//------------------------------------------------------------------------------

export class Word {
    literal: string = '';
    syllables: Array<Syllable>

    constructor(syllables?: Array<Syllable>) {
        if(syllables) {
            this.syllables = syllables
        } else {
            this.syllables = new Array()
        }
    }

    popSyllable() {
        // trim the literal
        let tmp = this.literal.substr(0, this.literal.length-this.syllables[this.syllables.length-1].literal.length);
        // assign the new literal to this.literal
        this.literal = tmp;
        // get rid off the last syllable from array
        this.syllables = this.syllables.slice(0, this.syllables.length-1);
    }

    pushSyllable(tss: Syllable) {
        this.syllables.push(tss);
        // concatenate the new syllable
        this.literal += tss.literal;
    }
}

//------------------------------------------------------------------------------
//  Lexeme Maker
//------------------------------------------------------------------------------

export abstract class LexemeMaker {
    abstract morphemes: Array<Morpheme>

    abstract preprocess(): Syllable[]

    abstract make(syllables: Array<Syllable>): Lexeme
}
