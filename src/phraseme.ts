import { InflectionalEnding } from './tonal/lexeme';
import { TonalWord } from './tonal/lexeme';
import { TonalInflexionLexeme } from './dparser/lexeme';

export abstract class PhrasalMetaplasm {}

export class TonalPhrasalInflectingMetaplasm extends PhrasalMetaplasm {
    apply(lexemeOne: TonalInflexionLexeme, lexemeTwo: TonalInflexionLexeme): TonalPhrase[] { return []; }
}

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
            for (var i = 0; i < len; i++) {
                if (i > 0) this.literal += ' ';
                this.pushWord(words[i]);
            }
            this.concat();
        }
    }

    popWord() {
        // trim the literal
        // let tmp = this.literal.substr(0, this.literal.length - this.words[this.words.length - 1].literal.length);
        // this.literal = tmp;
        // get rid off the last word from array
        this.words = this.words.slice(0, this.words.length - 1);
        this.concat();
    }

    pushWord(w: TonalWord) {
        this.words.push(w);
        // this.literal += w.literal;
        this.concat();
    }

    private concat() {
        this.literal = this.words.map(x => x.literal).join(" ")
    }
}
