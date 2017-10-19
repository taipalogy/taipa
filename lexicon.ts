import { Word } from './word';
import { Widget } from './widget';
import { ToneMarkerChecker } from './tonesandhi';
import { PartOfSpeech } from './word';

//------------------------------------------------------------------------------
//  Lexeme
//------------------------------------------------------------------------------

export class Lexeme {
    lemma: string;
    // string or array of string
    forms: string;

    object: Widget;

    partOfSpeech: PartOfSpeech;

    constructor(l: string) {
        this.lemma = l;
        this.object = null;
        // populate the array of forms
        this.populateForms();
        this.partOfSpeech = PartOfSpeech.Unknown;
    }

    populateForms() {}
    
    matched(bt: string, st: string) {
        if(this.lemma == bt && this.forms == st) {
            return true;
        }
        return false;
    }

    matchedBaseTone(l: string) {
        if(this.lemma.match(l)) {
            return true;
        }
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

    getLexeme(literal: string) : Lexeme {
        for(let i in this.entries) {
            if(this.entries[i].matchedBaseTone(literal)) {
                return this.entries[i];
            }
        }
    }

    foundBaseTone(bt: string) {
        for(let i in this.entries) {
            if(this.entries[i].matchedBaseTone(bt)) {
                return true;
            }
        }
    }

    foundSandhiTone(st: string) {
        let tmc = new ToneMarkerChecker();
        for(let i in this.entries) {
            let bt = tmc.checkSandhiTone(st);
            console.log("checked base tone: %s with its sandhi tone:%s", bt, st);
            if(this.entries[i].matched(bt, st)) {
                return true;
            }
        }

        return false;
    }

    found(l: string) {
        // find this lexeme in the lexicon entries
        console.log("about to find a lexeme as base tone:%s", l);
        if(this.foundBaseTone(l)) {
            return true;
        } 

        console.log("about to find a lexeme as sandhi tone:%s", l);
        if(this.foundSandhiTone(l)) {
            return true;
        }

        return false;
    }
}

export let lexicon = new Lexicon();