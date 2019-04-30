
import { InflectionalEnding } from "./lexeme"
import { TonalWord, TonalInputingLexeme } from './tonal/lexeme'

//------------------------------------------------------------------------------
//  Tone Group
//------------------------------------------------------------------------------

export class ToneGroup {
    inflectionalEndings: Array<InflectionalEnding> = new Array()
}

class ToneSandhiGroup extends ToneGroup{}

//------------------------------------------------------------------------------
//  Phraseme
//------------------------------------------------------------------------------

class Phraseme {
}

export class ToneSandhiPhraseme extends Phraseme {
    phrase: ToneSandhiPhrase

    constructor(phrase: ToneSandhiPhrase) {
        super();
        this.phrase = phrase
    }

    assignToneGroup(InflectionalEnding: InflectionalEnding) {}

    getBaseForm() {
        
    }
}

//------------------------------------------------------------------------------
//  Phrase
//------------------------------------------------------------------------------

class Phrase {
    literal: string = ''
}

export class ToneSandhiPhrase extends Phrase {
    words: Array<TonalWord>

    constructor(words?: Array<TonalWord>) {
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

    pushWord(w: TonalWord) {
        // push the word
        this.words.push(w);
        // concatenate a white space and the new word
        if(this.words.length > 0) {
            this.literal += ' ';
        }
        this.literal += w.literal;
    }
}

//------------------------------------------------------------------------------
//  Tone Sandhi Phraseme Maker
//------------------------------------------------------------------------------

export class ToneSandhiPhrasemeMaker {
    lexemes: Array<TonalInputingLexeme>;

    constructor(lexemes: Array<TonalInputingLexeme>) {
        this.lexemes = new Array();
        this.lexemes = lexemes;
    }

    makePhrasemes() {
        let phrasemes: Array<ToneSandhiPhraseme> = new Array();

        // unpack lexemes and take words out from them
        let words: Array<TonalWord> = new Array();
        for(let key in this.lexemes) {
            words.push(this.lexemes[key].word);
        }
        
        let tsp = new ToneSandhiPhraseme(new ToneSandhiPhrase(words));
        if(this.lexemes.length > 0) {
            let tg = new ToneGroup();
            for(let k in this.lexemes) {
            }
        }

        phrasemes.push(tsp);

        return phrasemes
    }
}