
import { ToneSandhiSyllable, Affix, ToneSandhiInputingMorpheme, FreeAllomorph, CheckedAllomorph, Allomorph, FreeAllomorphBaseRules,
    ToneSandhiParsingMorpheme, 
    AllomorphZS,
    AllomorphW,
    AllomorphY,
    AllomorphX,
    ZeroAllomorph,
    SandhiFormMorpheme,
    Rule} from './morpheme';

import { IDictionary, Dictionary } from './collection'


export let FORMS = {
    'VERB': {
        'intransitive': 'baseForm',
        'transitive': 'sandhiForm',
        'ditransitive': 'sandhiForm',
        'causative': 'sandhiForm',
        'perfective': 'baseForm',
        'attributive': 'sandhiForm',
        'continuative': 'sandhiForm',
    },
    'ADJECTIVE': {
        'basic': 'baseForm',
        'attributive': 'sandhiForm',
        'adverbial': 'sandhiForm',
    },
    'NOUN': {
        'basic': 'baseForm',
        'adverbial': 'sandhiForm',
    },
    'PRONOUN': {},
    'PARTICLE': {
        'basic': 'baseForm',
        'continuative': 'sandhiForm', // adverbial
    },
    'PREPOSITION': {},
    'EXCLAMATION': {},
    'DEMONSTRATIVEPRONOUN': {},
    'PERSONALPRONOUN': {
        'basic': 'baseForm',
        'proceeding': 'sandhiForm',
        'terminalFirst': 'sandhiForm',
        'terminalSeventh': 'sandhiForm', // complement
        'terminalThird': 'sandhiForm', // complement

        'adverbial': 'sandhiForm',

        'indirectObject': 'sandhiForm', // proceeding
        'directObject': 'baseForm',
    },
    'DETERMINER': {},
    'QUANTIFIER': {
        'basic': 'baseForm',
        'attributive': 'sandhiForm',
        'continuative': 'sandhiForm',
        'adverbial': 'sandhiForm',
    },
}

//------------------------------------------------------------------------------
//  Internal Sandhi Rule
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Inflectional Ending and Inflectional Tone Mark
//------------------------------------------------------------------------------

class Ending {}

/*
class InflectionalToneMark {
    affix: Affix = null;
}
*/
export abstract class InflectionalEnding extends Ending {
    abstract affix: Affix = null;
    getLiteral() {
        return this.affix.getLiteral()
    }
}

export class FreeInflectionalEnding extends InflectionalEnding {
    affix = new Affix();
    baseAffixes: Array<Affix> = new Array();
}

export class CheckedInflectionalEnding extends InflectionalEnding {
    affix = new Affix();
}

export abstract class TonalEnding extends Ending {
    abstract allomorph: Allomorph = null
    getLiteral() {
        return this.allomorph.getLiteral()
    }
}

export class FreeTonalEnding extends TonalEnding {
    allomorph = null
    //sandhiAllomorph: Allomorph = new Allomorph()
}

export class CheckedTonalEnding extends TonalEnding {
    allomorph = null
}

class TonalEndingZS extends FreeTonalEnding {
    allomorph = new AllomorphZS()
}

class TonalEndingW extends FreeTonalEnding {
    allomorph = new AllomorphW()
}

class TonalEndingY extends FreeTonalEnding {
    allomorph = new AllomorphY()
}

class ZeroTonalEnding extends FreeAllomorph {}

//------------------------------------------------------------------------------
//  Lexeme
//------------------------------------------------------------------------------

export class Lexeme {
    // this is used in rule-based tagger for both tone-sandhi and 
    // tone-mark-less lexemes
    word: Word
    partOfSpeech: string = ''
}

//------------------------------------------------------------------------------
//  Tone Sandhi Lexeme
//------------------------------------------------------------------------------

class ToneMarkLessLexeme extends Lexeme {}

//------------------------------------------------------------------------------
//  Tone Sandhi Lexeme
//------------------------------------------------------------------------------

export class ToneSandhiLexeme extends Lexeme {

}


//------------------------------------------------------------------------------
//  Tone Sandhi Inputing Lexeme
//------------------------------------------------------------------------------

export class ToneSandhiInputingLexeme {
    word: ToneSandhiWord
    inflectionalEnding: InflectionalEnding = null
    private lemmata: Array<ToneSandhiWord>

    constructor(word: ToneSandhiWord) {
        this.word = word;
    }

    assignInflectionalEnding(allomorph: Allomorph) {
        // change allomorph to affix
        if(allomorph instanceof FreeAllomorph) {
            let fie = new FreeInflectionalEnding();
            let facrs = new FreeAllomorphBaseRules();
            fie.affix.toneMark = allomorph.toneMark;
            for(let key in facrs.rules[allomorph.getLiteral()]) {
                //console.log(`k is ${key}`)
                let a = new Affix();
                a.toneMark = facrs.rules[allomorph.getLiteral()][key];
                //console.log(`a.toneMark is ${a.toneMark}`)
                fie.baseAffixes.push(a);
            }
            this.inflectionalEnding = fie;
        } else if(allomorph instanceof CheckedAllomorph) {
            let cie = new CheckedInflectionalEnding();
            cie.affix.toneMark = allomorph.toneMark;
            this.inflectionalEnding = cie;
        }
        // when there is no inflectinal ending assigned, this word is already in base form
        // and its last syllable is checked
        
        //console.log(allomorph.toneMark)
        //console.log(this.inflectionalEnding.getLiteral())
    }

    getBaseForms() { return this.lemmata }
    
    private replaceLastSyllable(morphemes: Array<ToneSandhiInputingMorpheme>) {
        let word = new ToneSandhiWord(this.word.syllables);
        word.popSyllable();
        word.pushSyllable(morphemes[morphemes.length-1].getBaseForms()[0]);
        return word;
    }

    private getLemmas(morphemes: Array<ToneSandhiInputingMorpheme>): Array<ToneSandhiWord> {
        if(this.inflectionalEnding != null) {
            if(this.inflectionalEnding instanceof FreeInflectionalEnding) {
                if(this.inflectionalEnding.baseAffixes.length == 1) {
                    return [this.replaceLastSyllable(morphemes)];
                } else if(this.inflectionalEnding.baseAffixes.length > 1) {
                    let ret = [];
                    let arr = morphemes[morphemes.length-1].getBaseForms();
                    //console.log(arr)
                    for(let key in arr) {
                        let word = new ToneSandhiWord(this.word.syllables);
                        word.popSyllable();
                        word.pushSyllable(arr[key]);
                        ret.push(word);
                    }
                    return ret;
                }
            } else if(this.inflectionalEnding instanceof CheckedInflectionalEnding) {
                return [this.replaceLastSyllable(morphemes)];
            }
        }

        return [];
    }

    populateLemmata(morphemes: Array<ToneSandhiInputingMorpheme>) {
        this.lemmata = new Array();

        // turn morphemes into lemmas
        let lms = this.getLemmas(morphemes);
        //console.log(tmp.length)
        if(lms.length > 0) {
            for(let key in lms) {
                //console.log(bfs[key].literal)
                this.lemmata.push(lms[key]);
            }
        }

    }
}

//------------------------------------------------------------------------------
//  Parsing Lexeme
//------------------------------------------------------------------------------


export class ToneSandhiParsingLexeme extends ToneSandhiLexeme {
    // properties can be added or deleted
    tonalEnding: TonalEnding = null
    word: ToneSandhiWord
    //partOfSpeech: string = ''

    constructor(w: ToneSandhiWord) {
        super()
        this.word = w
    }

    add(id: string) {
        // use this.partOfSpeech to pick up k-v pairs from forms
        let pos = Object.keys(FORMS).find(key => this.partOfSpeech === key)
        // pick up the specific form from the part of speech
        let k = Object.keys(FORMS[pos]).find(key => id === key )
        // assign property and property value
        this[id] = FORMS[pos][k]
    }

    get baseForm() { 
        // some determiners have only base form
        return this.word
    }

    toString(id: string) {
        return this[this[id]].literal
    }
}

export class SandhiFormLexeme extends ToneSandhiParsingLexeme {
    wordForSandhiForm: ToneSandhiWord

    assignTonalEnding(allomorph: Allomorph) {
        if(allomorph instanceof FreeAllomorph) {
            // replace the tonal ending
            let fte = new FreeTonalEnding()
            fte.allomorph = allomorph
            this.tonalEnding = fte
        } else if(allomorph instanceof CheckedAllomorph) {
            // append the tone mark of the tonal ending
            let cte = new CheckedTonalEnding()
            cte.allomorph = allomorph
            this.tonalEnding = cte
        }
    }

    private getSandhiForm(morphemes: Array<ToneSandhiParsingMorpheme>, r: Rule) {
        if(this.tonalEnding != null) {
            let word = new ToneSandhiWord(this.word.syllables);
            if(this.tonalEnding instanceof FreeTonalEnding) {
                let last = morphemes[morphemes.length-1]
                if(last instanceof SandhiFormMorpheme) {
                    word.popSyllable()
                    word.pushSyllable(last.getSandhiForm(r));
                }
                return word
            } else if(this.tonalEnding instanceof CheckedTonalEnding) {
                let last = morphemes[morphemes.length-1]
                if(last instanceof SandhiFormMorpheme) {
                    word.pushSyllable(last.getSandhiForm(r));
                }
                return word
            }
        }
        return null
    }

    get sandhiForm() {
        return this.wordForSandhiForm
    }

    populateSandhiForm(morphemes: Array<ToneSandhiParsingMorpheme>, r: Rule) {
        //this.wordForSandhiForm = new ToneSandhiWord()
        this.wordForSandhiForm = this.getSandhiForm(morphemes, r)
    }
}

//------------------------------------------------------------------------------
//  Word
//------------------------------------------------------------------------------

export class Word {
    literal: string = '';
}

export class ToneWord extends Word {}
export class ToneMarkLessWord extends ToneWord {}

//------------------------------------------------------------------------------
//  Tone Sandhi Word
//------------------------------------------------------------------------------

export class ToneSandhiWord extends ToneWord {
    syllables: Array<ToneSandhiSyllable>;

    constructor(syllables?: Array<ToneSandhiSyllable>) {
        super();
        this.syllables = new Array();
        if(syllables != undefined) {
            let len = syllables.length;
            for(var i = 0; i < len; i++) {
                this.pushSyllable(syllables[i]);
            }
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

    pushSyllable(tss: ToneSandhiSyllable) {
        this.syllables.push(tss);
        // concatenate the new syllable
        this.literal += tss.literal;
    }
}

//------------------------------------------------------------------------------
//  Inflectional Lexeme
//------------------------------------------------------------------------------

class InflectionalLexeme extends Lexeme {
    word: InflectiveWord
}

//------------------------------------------------------------------------------
//  Dummy Lexeme
//------------------------------------------------------------------------------

export class DummyLexeme extends Lexeme {
    word: Word = new Word()
}

//------------------------------------------------------------------------------
//  Inflectional Word
//------------------------------------------------------------------------------

export class InflectiveWord extends Word {
}

export class AgglutinativeWord extends Word {
}
