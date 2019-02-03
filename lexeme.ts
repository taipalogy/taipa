
import { ToneSandhiSyllable, TonalAffix, ToneSandhiInputingMorpheme, ToneSandhiRootMorpheme, 
    CombiningFormMorpheme,
    } from './morpheme';
import { FreeAllomorph, CheckedAllomorph, Allomorph, } from './system'
import { freeAllomorphUncombiningRules } from './version2'

import { Sound, Tonal } from './system';


export let FORMS = {
    'VERB': {
        'intransitive': 'baseForm',
        'transitive': 'sandhiForm',
        'ditransitive': 'sandhiForm',
        'causative': 'sandhiForm',
        'perfective': 'baseForm',
        'attributive': 'sandhiForm',
        'continuative': 'sandhiForm', // adverbial
    },
    'ADJECTIVE': {
        'basic': 'baseForm',
        'attributive': 'sandhiForm',
        'adverbial': 'sandhiForm', // ay
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

export abstract class InflectionalEnding extends Ending {
    abstract affix: TonalAffix = null;
    getLiteral() {
        return this.affix.getLiteral()
    }
}

export class FreeInflectionalEnding extends InflectionalEnding {
    affix = new TonalAffix();
    baseAffixes: Array<TonalAffix> = new Array();
}

export class CheckedInflectionalEnding extends InflectionalEnding {
    affix = new TonalAffix();
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

class TonalLessLexeme extends Lexeme {}

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
    private inflectionalEnding: InflectionalEnding = null
    private lemmata: Array<ToneSandhiWord>
    arrayOfSounds: Array<Sound[]>

    constructor(word: ToneSandhiWord) {
        this.word = word;
        this.arrayOfSounds = new Array()
    }

    assignInflectionalEnding(allomorph: Allomorph) {
        // change allomorph to affix
        if(allomorph instanceof FreeAllomorph) {
            let fie = new FreeInflectionalEnding();
            fie.affix.tonal = allomorph.tonal;
            for(let key in freeAllomorphUncombiningRules.get(allomorph.getLiteral())) {
                let a = new TonalAffix();
                a.tonal = freeAllomorphUncombiningRules.get(allomorph.getLiteral())[key];
                fie.baseAffixes.push(a);
            }
            this.inflectionalEnding = fie;
        } else if(allomorph instanceof CheckedAllomorph) {
            let cie = new CheckedInflectionalEnding();
            cie.affix.tonal = allomorph.tonal;
            this.inflectionalEnding = cie;
        }
        // when there is no inflectinal ending assigned, this word is already in base form
        // and its last syllable is checked tone
        
        //console.debug(allomorph.tonal)
        //console.debug(this.inflectionalEnding.getLiteral())
    }

    getInflectionalEnding() {
        if(this.inflectionalEnding == null) return ''
        return this.inflectionalEnding.getLiteral()
    }

    getBaseForms() {
        // this must be called after populateLemmata is called
        if(this.lemmata == null) return []
        return this.lemmata 
    }
    
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
//  Inflection Lexeme
//------------------------------------------------------------------------------


export class ToneSandhiInflectionLexeme extends ToneSandhiLexeme {
    // properties can be added or deleted
    tonalEnding: TonalEnding = null
    word: ToneSandhiWord
    kvp: { key: string , value: string }

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
        this.kvp = { key: id, value: FORMS[pos][k] }
    }

    get baseForm() { 
        // some determiners have only base form
        return this.word
    }

    toString(id: string) {
        if(this.kvp.key === id) {
            return this[this.kvp.value].literal
        }
    }
}

export class SandhiFormLexeme extends ToneSandhiInflectionLexeme {
    private wordForSandhiForm: ToneSandhiWord

    assignTonalEnding(allomorph: Allomorph) {
        if(allomorph instanceof FreeAllomorph) {
            // replace the tonal ending
            let fte = new FreeTonalEnding()
            fte.allomorph = allomorph
            this.tonalEnding = fte
        } else if(allomorph instanceof CheckedAllomorph) {
            // append the tonal of the tonal ending
            let cte = new CheckedTonalEnding()
            cte.allomorph = allomorph
            this.tonalEnding = cte
        }
    }

    private getSandhiForm(morphemes: Array<ToneSandhiRootMorpheme>, tm: Tonal) {
        if(this.tonalEnding != null) {
            let word = new ToneSandhiWord(this.word.syllables);
            if(this.tonalEnding instanceof FreeTonalEnding) {
                let last = morphemes[morphemes.length-1]
                if(last instanceof CombiningFormMorpheme) {
                    word.popSyllable()
                    word.pushSyllable(last.getCombiningForm(tm));
                }
                return word
            } else if(this.tonalEnding instanceof CheckedTonalEnding) {
                let last = morphemes[morphemes.length-1]
                if(last instanceof CombiningFormMorpheme) {
                    word.pushSyllable(last.getCombiningForm(tm));
                }
                return word
            }
        }
        return null
    }

    get sandhiForm() {
        return this.wordForSandhiForm
    }

    populateSandhiForm(morphemes: Array<ToneSandhiRootMorpheme>, tm: Tonal) {
        this.wordForSandhiForm = this.getSandhiForm(morphemes, tm)
    }
}

//------------------------------------------------------------------------------
//  Word
//------------------------------------------------------------------------------

export class Word {
    literal: string = '';
}

export class ToneWord extends Word {}
export class TonalLessWord extends ToneWord {}

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
