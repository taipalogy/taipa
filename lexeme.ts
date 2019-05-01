import { Syllable } from './morpheme';
import { GraphemeMaker } from './grapheme'
//import { ToneSandhiRootMorphemeMaker, CombiningFormMorphemeMaker } from './morpheme'
//import { ToneSandhiRootMorpheme, CombiningFormMorpheme } from './morpheme'
import { Tonal } from './grapheme'
import { lowerLettersOfTonal } from './tonal/version2';
//import { Allomorph, FreeAllomorph, CheckedAllomorph } from './system'

import { TonalWord, TonalInputingLexeme } from './tonal/lexeme'
import { TonalSyllable } from './tonal/morpheme';

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

class TonallessLexeme extends Lexeme {}

//------------------------------------------------------------------------------
//  Tone Sandhi Lexeme
//------------------------------------------------------------------------------

export class TonalLexeme extends Lexeme {}

//------------------------------------------------------------------------------
//  Inflection Lexeme
//------------------------------------------------------------------------------
/*
export class ToneSandhiInflectionLexeme extends TonalLexeme {
    // properties can be added or deleted
    tonalEnding: TonalEnding = null
    word: TonalWord
    kvp: { key: string , value: string }

    constructor(w: TonalWord) {
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
    private wordForSandhiForm: TonalWord

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
            let word = new TonalWord(this.word.syllables);
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
*/
//------------------------------------------------------------------------------
//  Word
//------------------------------------------------------------------------------

export class Word {
    literal: string = '';
    syllables: Array<Syllable>

    popSyllable() {
        // trim the literal
        let tmp = this.literal.substr(0, this.literal.length-this.syllables[this.syllables.length-1].literal.length);
        // assign the new literal to this.literal
        this.literal = tmp;
        // get rid off the last syllable from array
        this.syllables = this.syllables.slice(0, this.syllables.length-1);
    }

    pushSyllable(tss: Syllable) {
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

//------------------------------------------------------------------------------
//  Lexeme Maker
//------------------------------------------------------------------------------

export abstract class LexemeMaker {
    abstract morphemes

    preprocess() {
        // extract syllables from morphemes. concatenate syllables into a word.
        // wrap the word in a lexeme. use morephemes to populate lemmata of a lexeme.
        // assign inflectinal affix to a lexeme.
        // push the lexeme into an array of lexemes.
        // unpack morphemes and take syllables out from them
        let syllables: Array<TonalSyllable> = new Array();
        for(let key in this.morphemes) {
            syllables.push(this.morphemes[key].syllable);
        }

        return syllables
    }

    abstract make(syllables: Array<Syllable>)
}

abstract class InflectiveLexemeMaker extends LexemeMaker {
    abstract postprocess(tsl: TonalLexeme)
}

export abstract class InputingLexemeMaker extends LexemeMaker {
    abstract postprocess(tsil: TonalInputingLexeme)
}

//------------------------------------------------------------------------------
//  Tone Sandhi Lexeme Maker
//------------------------------------------------------------------------------
/*
export class TonalInflectionLexemeMaker extends InflectiveLexemeMaker {
    morphemes: Array<ToneSandhiRootMorpheme>;

    constructor(morphemes: Array<ToneSandhiRootMorpheme>) {
        super()
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    makeInflectionLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<TonalSyllable>) {
        return new ToneSandhiInflectionLexeme(new TonalWord(syllables));
    }

    postprocess(tspl: ToneSandhiInflectionLexeme) {
        if(this.morphemes.length > 0) {
            if(this.morphemes[this.morphemes.length-1].allomorph != null) {
            }
        }

        let lexemes: Array<ToneSandhiInflectionLexeme> = new Array();
        lexemes.push(tspl);

        return lexemes
    }
}

class TonalInflectedLexemeMaker extends TonalInflectionLexemeMaker {
    tonal: Tonal

    constructor(morphemes: Array<ToneSandhiRootMorpheme>, tm?: Tonal) {
        super(morphemes)
        //this.morphemes = new Array();
        //this.morphemes = morphemes;
        if(tm != undefined) {
            this.tonal = tm
        }
    }

    makeSandhiLexemes() {
        return this.postprocess(this.make(this.preprocess()))
    }

    make(syllables: Array<TonalSyllable>) {
        return new SandhiFormLexeme(new TonalWord(syllables));
    }

    postprocess(tspl: SandhiFormLexeme) {
        if(this.morphemes.length > 0) {
            if(this.morphemes[this.morphemes.length-1].allomorph != null) {
                // tonal ending needs to be assigned to sandhi lexeme
                tspl.assignTonalEnding(this.morphemes[this.morphemes.length-1].allomorph);
            }
        }

        tspl.populateSandhiForm(this.morphemes, this.tonal)

        let lexemes: Array<SandhiFormLexeme> = new Array();
        lexemes.push(tspl);

        return lexemes
    }
    
}
*/
export class DummyLexemeMaker {
    makeLexeme(str: string) {
        let l = new DummyLexeme();
        l.word = new Word();
        l.word.literal = str;
        return l;
    }
}

//------------------------------------------------------------------------------
//  Lexeme Turner
//------------------------------------------------------------------------------
/*
export class TurningIntoInflectionLexeme {
    turnIntoLexemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        let output = gm.makeGraphemes();
        let graphemes = output.graphemes

        // Morpheme Maker
        let tsmm = new ToneSandhiRootMorphemeMaker(graphemes);
        let obj = tsmm.makeRootMorphemes();

        // Lexeme Maker
        let tslm = new TonalInflectionLexemeMaker(obj.morphemes);
        let lexemes = tslm.makeInflectionLexemes();

        return lexemes;
    }
}

export class TurningIntoSandhiForm extends TurningIntoInflectionLexeme {
    tonal: Tonal

    constructor (tm: Tonal) {
        super()
        this.tonal = tm
    }

    turnIntoLexemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        let output = gm.makeGraphemes();
        let graphemes = output.graphemes

        // Morpheme Maker
        let tsmm = new CombiningFormMorphemeMaker(graphemes);
        let morphemes = tsmm.makeCombiningMorphemes(); // only the last morpheme is used

        // Lexeme Maker
        let tslm = new TonalInflectedLexemeMaker(morphemes, this.tonal);
        let lexemes = tslm.makeSandhiLexemes();

        return lexemes;
    }
}
*/