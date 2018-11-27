
import { ToneSandhiSyllable, Affix, ToneSandhiInputingMorpheme, FreeAllomorph, CheckedAllomorph, Allomorph, FreeAllomorphBaseRules,
    ToneSandhiParsingMorpheme, 
    SandhiFormMorpheme,
    AllomorphZS,
    AllomorphW,
    AllomorphY,
    AllomorphX,
    ZeroAllomorph} from './morpheme';

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
        'terminal': 'baseForm',
        'attributive': 'sandhiForm',
        'adverbial': 'sandhiForm',
    },
    'NOUN': {
        'adverbial': 'sandhiForm',
        'attributive': 'sandhiForm',
        'terminal': 'adverbialForm'
    },
    'PRONOUN': {
        'nominative': '',
        'accusative': '',
        'dative': '',
    },
    'PARTICLE': {
        'continuative': 'continuativeForm'
    },
    'PREPOSITION': {},
    'EXCLAMATION': {},
    'DEMONSTRATIVEPRONOUN': {},
    'PERSONALPRONOUN': {
        'adverbial': 'adverbialForm',
    },
    'DETERMINER': {},
    'QUANTIFIER': {
        'continuative': 'sandhiForm',
        'adverbial': 'adverbialForm',
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
    getLiteral() {}
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
/*
export class CheckedTonalEnding extends TonalEnding {
    allomorph = new Allomorph()
}
*/

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
//  Free Allomorph Base Rules
//------------------------------------------------------------------------------
/*
interface IDictionaryOfRules extends IDictionary {}

class DictionaryOfRules extends Dictionary {
    constructor(init: { key: string; value: Array<Allomorph>; }[]) {
        super(init);
    }

    toLookup(): IDictionaryOfRules {
        return this;
    }
}

export class FreeInflectionalEndingBaseRules {
    readonly rules = new DictionaryOfRules([
        { key: 'w', value: [new AllomorphZS(), new AllomorphX()] },
        { key: 'zs', value: [new AllomorphX(), new ZeroAllomorph()] },
        { key: 'zzs', value: [] },

        { key: 'x', value: [] },
        { key: 'y', value: [new AllomorphW()] },

        { key: 'zero', value: [new AllomorphY()] },
    ]).toLookup();
}
*/
//------------------------------------------------------------------------------
//  Lexeme
//------------------------------------------------------------------------------

export class Lexeme {}

//------------------------------------------------------------------------------
//  Tone Sandhi Lexeme
//------------------------------------------------------------------------------
/*
class InputingLexeme extends Lexeme {}

export class ToneInputingLexeme extends InputingLexeme {

}
*/
class ToneMarkLessLexeme extends Lexeme {}

//------------------------------------------------------------------------------
//  Tone Sandhi Lexeme
//------------------------------------------------------------------------------

export class ToneSandhiLexeme extends Lexeme {
    // this is used in rule-based tagger for both tone-sandhi and 
    // tone-mark-less lexemes
    word: ToneWord
}

export class ToneSandhiInputingLexeme extends ToneSandhiLexeme {
    word: ToneSandhiWord
    inflectionalEnding: InflectionalEnding = null
    lemmata: Array<ToneSandhiWord>

    constructor(word: ToneSandhiWord) {
        super();
        this.word = word;
    }

    assignInflectionalEnding(allomorph: Allomorph) {
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
    }

    get baseForms() { return this.lemmata }
    
    private replaceLastSyllable(morphemes: Array<ToneSandhiInputingMorpheme>) {
        let word = new ToneSandhiWord(this.word.syllables);
        word.popSyllable();
        word.pushSyllable(morphemes[morphemes.length-1].getBaseForms()[0]);
        return word;
    }

    private getLemmas(morphemes: Array<ToneSandhiInputingMorpheme>): Array<ToneSandhiWord> {
        if(this.inflectionalEnding != null) {
            if(this.inflectionalEnding instanceof FreeInflectionalEnding) {
                /*
                if(this.inflectionalEnding.hasZeroToneMark()) {
                } else {}
                */
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
    preceded
    followed
    isProceeding
    partOfSpeech: string = ''

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

    assignTonalEnding(allomorph: Allomorph) {
        /*
        if(allomorph instanceof FreeAllomorph) {
            // replace the tonal ending
            let fte = new FreeTonalEnding()
            let fasrs = new FreeAllomorphSandhiRules();
            fte.allomorph = allomorph
            for(let key in fasrs.rules[allomorph.getLiteral()]) {
                //console.log(`k is ${key}`)
                let a = new Allomorph();
                a.toneMark = fasrs.rules[allomorph.getLiteral()][key];
                //console.log(`a.toneMark is ${a.toneMark}`)
                fte.sandhiAllomorphs.push(a);
            }
            this.tonalEnding = fte
        } else if(allomorph instanceof CheckedAllomorph) {
            // append the tone mark of the tonal ending
            let cte = new CheckedTonalEnding()
            cte.allomorph = allomorph
            this.tonalEnding = cte
        } else if(allomorph == null) {

        }
        */
    }

    get baseForm() { 
        // some determiners have only base form
        return this.word
    }

    toString(id: string) {
        return this[this[id]]
    }
}

export class SandhiFormLexeme extends ToneSandhiParsingLexeme {
    wordForSandhiForm: ToneSandhiWord

    ruleSetter: {[k: string]: any} = {
        firstToZS: function() {
            this.tonalEnding = new TonalEndingZS()
        },
        zsToW: function() {
            this.tonalEnding = new TonalEndingW()
        },
        wToY: function() {
            this.tonalEnding = new TonalEndingY()
        },
        yToFirst: function() {
            this.tonalEnding = new ZeroTonalEnding()
        },
        xToZS: function() {
            this.tonalEnding = new TonalEndingZS()
            return 'tonal ending xToZS set'
        },
        xToW: function() {
            this.tonalEnding = new TonalEndingW()
        },
    }

    get rules() { return this.ruleSetter }

    get sandhiForm() { return this.wordForSandhiForm }

    /*
    replaceLastSyllable(morphemes: Array<ToneSandhiParsingMorpheme>) {
        let word = new ToneSandhiWord(this.word.syllables);
        // if we check against array's last element, it won't work
        // we have to explicitly get the element check against it individually
        let last = morphemes[morphemes.length-1]
        if(last instanceof SandhiFormMorpheme) {
            word.popSyllable();
            word.pushSyllable(last.getSandhiForm());
        }
        return word;
    }

    getSandhiForm(morphemes: Array<ToneSandhiParsingMorpheme>) {
        // some determiners have no sandhi forms
        if(this.tonalEnding != null) {
            if(this.tonalEnding instanceof FreeTonalEnding) {
                return this.replaceLastSyllable(morphemes);
            } else if(this.tonalEnding instanceof CheckedTonalEnding) {
                return this.replaceLastSyllable(morphemes);
            }
        }
    }

    populateSandhiForm(morphemes: Array<ToneSandhiParsingMorpheme>) {
        this.wordForSandhiForm = new ToneSandhiWord()
        this.wordForSandhiForm = this.getSandhiForm(morphemes)
    }
    */
}

class ContinuativeFormLexeme extends ToneSandhiParsingLexeme {
    wordForContinuativeForm: ToneSandhiWord
    
    get continuativeForm() {
        // this form is for 'le' particles
        return ''
    }
}

class AdverbialFormLexeme extends ToneSandhiParsingLexeme {
    wordForAdverbialForm: ToneSandhiWord

    // the below 2 forms are for conversion
    get adverbialForm() {
        // this form is for quantifiers and personal pronouns
        return ''
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

    isBaseForm() {
        // look up in the lexicon to check if this lexeme is in base form
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
    word: Word
}

//------------------------------------------------------------------------------
//  Inflectional Word
//------------------------------------------------------------------------------

export class InflectiveWord extends Word {
}

export class AgglutinativeWord extends Word {
}
