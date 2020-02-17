import { InflectionalEnding } from './tonal/lexeme';
import { TonalWord } from './tonal/lexeme';
import { TonalInflectionLexeme, TonalAssimilationLexeme } from './dparser/lexeme';

export abstract class PhrasalMetaplasm {}

export class TonalPhrasalInflectionMetaplasm extends PhrasalMetaplasm {
    apply(lexemeOne: TonalInflectionLexeme, lexemeTwo: TonalInflectionLexeme): TonalPhrase[] {
        return [];
    }
}

export class TonalPhrasalAssimilationMetaplasm extends PhrasalMetaplasm {
    apply(lexemeOne: TonalAssimilationLexeme, lexemeTwo: TonalAssimilationLexeme): TonalPhrase[] {
        return [];
    }
}

export class TonalPhrasalZeroInflection extends TonalPhrasalInflectionMetaplasm {}

// -----------------------------------------------------------------------------

export class ToneGroup {
    inflectionalEndings: Array<InflectionalEnding> = new Array();
}

class ToneSandhiGroup extends ToneGroup {}

// -----------------------------------------------------------------------------

export class Phraseme {}

// -----------------------------------------------------------------------------

class Phrase {
    literal: string = '';
}

export class TonalPhrase extends Phrase {
    words: Array<TonalWord>;

    constructor(words?: Array<TonalWord>) {
        super();
        this.words = new Array();
        if (words != undefined) {
            let len = words.length;
            for (let i = 0; i < len; i++) {
                if (i > 0) this.literal += ' ';
                this.pushWord(words[i]);
            }
            this.concat();
        }
    }

    popWord() {
        // get rid off the last word from array
        this.words = this.words.slice(0, this.words.length - 1);
        this.concat();
    }

    pushWord(w: TonalWord) {
        this.words.push(w);
        this.concat();
    }

    private concat() {
        if (this.words.length > 0) {
            if (this.words.filter(x => x && x.literal.length > 0).length == 0) {
                this.literal = '';
            } else this.literal = this.words.map(x => (x ? x.literal : '')).join(' ');
        }
    }
}
