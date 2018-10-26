
import { ToneSandhiWord, InflectionalEnding, Word } from "./lexeme"

//------------------------------------------------------------------------------
//  Tone Group
//------------------------------------------------------------------------------

class ToneGroup {}

class ToneSandhiGroup extends ToneGroup{}

//------------------------------------------------------------------------------
//  Phraseme
//------------------------------------------------------------------------------

class Phraseme {
}

class ToneSandhiPhraseme extends Phraseme {
    phrase: ToneSandhiPhrase

    constructor(words: Array<ToneSandhiWord>) {
        super();
    }

    getBaseForm() {
        
    }
}

//------------------------------------------------------------------------------
//  Phrase
//------------------------------------------------------------------------------

class Phrase {
    literal: string = ''
}

class ToneSandhiPhrase extends Phrase {
    words: Array<Word>

    constructor(words?: Array<Word>) {
        super()
        this.words = new Array();
        if(words != undefined) {
            let len = words.length;
            for(var i = 0; i < len; i++) {
                this.pushWord(words[i]);
            }
        }
    }

    popWord() {
        // trim the literal
        let tmp = this.literal.substr(0, this.literal.length-this.words[this.words.length-1].literal.length);
        this.literal = tmp;
        // get rid off the last word from array
        this.words = this.words.slice(0, this.words.length-1);
    }

    pushWord(w: Word) {
        // push the word
        this.words.push(w);
        // concatenate a white space and the new word
        if(this.words.length > 0) {
            this.literal += ' ';
        }
        this.literal += w.literal;
    }
}
