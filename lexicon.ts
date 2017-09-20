import { Word } from './expression';

//-----------------------------------------------------------------------------
//  Lexeme
//-----------------------------------------------------------------------------

export class Lexeme {
    lemma: string;
    // string or array of string
    forms: string;

    constructor(l: string) {
        this.lemma = l;
        // populate the array of forms
    }

    matched(w: Word) {
        //if(this.lemma == w.baseTone) return true;
        //else if(this.forms == w.sandhiTone) return true;
        return false;
    }
}

//-----------------------------------------------------------------------------
//  Lexicon
//-----------------------------------------------------------------------------

export class Lexicon {

    entries: Lexeme[];

    add(w: Word) {
        this.found(w);
    }

    found(w: Word) {
        // find this term in the entries
        for(var i in this.entries) {
            if(this.entries[i].matched(w)) {
                return true;
            }
        }
    }
}