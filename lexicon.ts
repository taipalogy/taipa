import { Word } from './word';
import { Widget } from './widget';

//------------------------------------------------------------------------------
//  Lexeme
//------------------------------------------------------------------------------

export class Lexeme {
    lemma: string;
    // string or array of string
    forms: string;

    object: Widget;

    constructor(l: string) {
        this.lemma = l;
        this.object = null;
        // populate the array of forms
        this.populateForms();
    }

    populateForms() {}
    
    matched(s: string) {
        if(this.lemma == s) return true;
        else if(this.forms == s) return true;
        return false;
    }

    addObject(w: Widget) {

    }
}

//------------------------------------------------------------------------------
//  Lexicon
//------------------------------------------------------------------------------

export class Lexicon {

    entries: Array<Lexeme>;

    constructor() {
        this.entries = new Array();
    }

    add(l: Lexeme) {
        if(!this.found(l.lemma))
          this.entries.push(l);
    }

    found(s: string) {
        // find this term in the entries
        for(var i in this.entries) {
            if(this.entries[i].matched(s)) {
                return true;
            }
        }

        return false;
    }
}