import { Word } from './word';
import { Widget } from './widget';
import { ToneMarkChecker } from './tonemark';
import { PartOfSpeech } from './word';

//------------------------------------------------------------------------------
//  Lexeme
//------------------------------------------------------------------------------

export class Lexeme {
    lemma: string;
    // string or array of string
    forms: Array<string>

    object: Widget;

    partOfSpeech: PartOfSpeech;

    constructor(l: string) {
        this.lemma = l;
        this.object = null;
        this.forms = new Array();
        // populate the array of forms
        this.populateForms();
        this.partOfSpeech = PartOfSpeech.Unknown;
    }

    populateForms() {
        let tmc = new ToneMarkChecker();
        let btm = tmc.getBaseToneMark(this.lemma);
        console.log("about to populate with: %s and %s", this.lemma, btm);
        if(btm) {
            let stm = tmc.getSandhiToneMark(this.lemma);
            console.log("populating forms with sandhi tone mark: %s", stm);
            this.forms.push(this.lemma.split(btm).shift() + stm);
            console.log("populated forms: ", this.forms[0]);
        }
    }
    
    matched(bt: string, st: string) {
        if(this.lemma == bt) {
            for(let i = 0; i < this.forms.length; i++) {
                if(this.forms[i] == st) {
                    return true;
                }                
            }
        }
        return false;
    }

    matchedBaseTone(l: string) {
        if(this.lemma.match(l)) {
            return true;
        }
        return false;
    }

    matchedSandhiTone(l: string) {
        console.log("length of forms: %s", this.forms.length);
        for(let i = 0; i < this.forms.length; i++) {
            console.log(this.forms[i]);
            if(this.forms[i].match(l)) {
                return true;
            }
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
        console.log("about to get lexeme: %s", literal);
        if(this.isLevelTone(literal)) {
            console.log("%s is a level tone", literal);
            for(let i in this.entries) {
                let e = this.entries[i];
                if(e.matchedBaseTone(literal)) {
                    return e;
                }
            }
        } else if(this.isObliqueTone(literal)) {
            for(let i in this.entries) {
                let e = this.entries[i];
                console.log("literal: %s. entry: %s", literal, e.lemma);
                if(e.matchedBaseTone(literal)) {
                    return e;
                } else if(e.matchedSandhiTone(literal)) {
                    return e;
                }
            }
        }

        console.log("didn't get a lexeme: %s", literal);
        return null;
    }

    isLevelTone(l: string) {
        console.log("isLevel: %s", l);
        let tmc = new ToneMarkChecker();
        return tmc.isLevelTone(l);
    }

    isObliqueTone(l: string) {
        console.log("isOblique: %s", l);
        let tmc = new ToneMarkChecker();
        return tmc.isObliqueTone(l);
    }

    foundBaseTone(bt: string) {
        for(let i in this.entries) {
            if(this.entries[i].matchedBaseTone(bt)) {
                return true;
            }
        }
    }

    foundSandhiTone(st: string) {
        let tmc = new ToneMarkChecker();
        for(let i in this.entries) {
            let bt = tmc.getMatchedBaseTone(st);
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