import { Syllable, Morpheme } from './morpheme';
import { TonalWord, InflectionalEnding, TonalSymbolEnding } from './tonal/lexeme';

//------------------------------------------------------------------------------

export abstract class Metaplasm {}

export class TonalInflectingMetaplasm extends Metaplasm {
    // TODO: abstraction
    apply(morphemes: Array<Morpheme>, tonalSymbolEnding: TonalSymbolEnding): TonalWord[] { return []; }
}

export class TonalLemmatizingMetaplasm extends Metaplasm {
    apply(morphemes: Array<Morpheme>, inflectionalEnding: InflectionalEnding) {}
}

//------------------------------------------------------------------------------

export abstract class Lexeme {}

//------------------------------------------------------------------------------

export class Word {
    literal: string = '';
    syllables: Array<Syllable>;

    constructor(syllables?: Array<Syllable>) {
        if (syllables) {
            this.syllables = syllables;
        } else {
            this.syllables = new Array();
        }
    }

    popSyllable() {
        this.syllables = this.syllables.slice(0, this.syllables.length - 1);
        this.concat();
    }

    pushSyllable(syl: Syllable) {
        this.syllables.push(syl);
        this.concat();
    }

    replaceSyllable(i: number, syl: Syllable) {
        if(i < this.syllables.length) {
            this.syllables.splice(i, 1, syl);
        }
        this.concat();
    }

    private concat() {
        this.literal = this.syllables.map(x => x.literal).join("");
    }
}

//------------------------------------------------------------------------------

export abstract class LexemeMaker {
    protected abstract make(ms: Array<Morpheme>): Lexeme;
}
