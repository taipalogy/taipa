
import { Word, ToneSandhiLexeme, ToneSandhiWord, ToneWord, ToneMarkLessWord, ToneSandhiInputingLexeme, FreeTonalEnding, CheckedTonalEnding, TonalEnding } from './lexeme'
import { SYMBOLS } from './symbols'
import { Allomorph, FreeAllomorph, CheckedAllomorph, ToneSandhiMorpheme, FreeAllomorphSandhiRules, ToneSandhiParsingMorpheme, Morpheme } from './morpheme';
import { TurningIntoParsingLexeme } from './lexememaker'

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
//  Construction of Phrase
//------------------------------------------------------------------------------

class ConstructionOfPhrase {
    elements: Array<ConstructionElement> = new Array()

    constructor(arr: Array<ConstructionElement>){
        for(let key in arr) {
            this.elements.push(arr[key])
        }
    }
}

class ConstructionOfClause {
    isSeperable
}

//------------------------------------------------------------------------------
//  Parsing Morpheme
//------------------------------------------------------------------------------

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
    wordForSandhiForms: Array<ToneSandhiWord>
    wordForAdverbialForm: ToneSandhiWord
    wordForContinuativeForm: ToneSandhiWord

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
        }
    }

    replaceLastSyllable(morphemes: Array<ToneSandhiParsingMorpheme>) {
        let word = new ToneSandhiWord(this.word.syllables);
        word.popSyllable();
        word.pushSyllable(morphemes[morphemes.length-1].getSandhiForms()[0]);
        return word;
    }

    get baseForm() { 
        // some determiners have only base form
        return this.word
    }

    get sandhiForm() { return 'uannw' }

    toString(id: string) {
        return this[this[id]]
    }
}

class SandhiForm extends ToneSandhiParsingLexeme {
    //get sandhiForm() { return this.wordForSandhiForms }

    set sandhiForms(morphemes: Array<ToneSandhiParsingMorpheme>) {
        // some determiners have no sandhi forms
        if(this.tonalEnding != null) {
            if(this.tonalEnding instanceof FreeTonalEnding) {
                if(this.tonalEnding.sandhiAllomorphs.length == 1) {
                    this.wordForSandhiForms.push(this.replaceLastSyllable(morphemes));
                } else if(this.tonalEnding.sandhiAllomorphs.length > 1) {
                    let ret = [];
                    let arr = morphemes[morphemes.length-1].getSandhiForms();
                    for(let key in arr) {
                        let word = new ToneSandhiWord(this.word.syllables);
                        word.popSyllable();
                        word.pushSyllable(arr[key]);
                        ret.push(word);
                    }
                    this.wordForSandhiForms = ret;
                }
            } else if(this.tonalEnding instanceof CheckedTonalEnding) {
                this.wordForSandhiForms.push(this.replaceLastSyllable(morphemes));
            }
        }
    }
}

class ContinuativeForm extends ToneSandhiParsingLexeme {
    get continuativeForm() {
        // this form is for 'le' particles
        return ''
    }
}

class AdverbialForm extends ToneSandhiParsingLexeme {
    // the below 2 forms are for conversion
    get adverbialForm() {
        // this form is for quantifiers and personal pronouns
        return ''
    }
}

class Conversion {
    // different from parsing lexmem. convert between part of speeches.
    forms: Array<ToneSandhiParsingLexeme> = null
    as(): ToneSandhiParsingLexeme {
        return this.forms[0]
    }
}

class Quantifier extends Conversion {
    constructor() {
        super()
    }
}

//------------------------------------------------------------------------------
//  Construction Element
//------------------------------------------------------------------------------

class ConstructionElement{
    id: string = ''
    lexemes: Array<ToneSandhiParsingLexeme> = new Array()

    constructor(id: string) {
        this.id = id
    }

    addLexeme(l: ToneSandhiParsingLexeme) {
        this.lexemes.push(l)
    }

    check(w: ToneSandhiWord) {
        for(let k in this.lexemes) {
            console.log(this.id)
            console.log(this.lexemes[k].toString(this.id))
            console.log(w.literal)
            if(this.lexemes[k].toString(this.id) === w.literal) {
                return true
            }
        }
        return false
    }
}

//------------------------------------------------------------------------------
//  Type of Construction
//------------------------------------------------------------------------------

abstract class TypeOfConstruction {
    abstract constructions: Array<ConstructionOfPhrase> = null;
}

class VerbPhrase extends TypeOfConstruction {
    //new ConstructionOfPhrase(['intransitive', 'intransitive']),
    //new ConstructionOfPhrase(['serial', 'serial', 'intransitive']),
    //new ConstructionOfPhrase(['causative', 'accusative', 'intransitive'])

    constructions = []

    constructor() {
        super()
        let turner = new TurningIntoParsingLexeme()
        let l = turner.turnIntoLexemes('uannzs')[0]
        l.partOfSpeech = SYMBOLS.VERB
        l.add('transitive')
        console.log(l.word.literal)

        let transitive = new ConstructionElement('transitive')
        transitive.addLexeme(l)
        this.constructions.push(new ConstructionOfPhrase([transitive, 
                                                            new ConstructionElement('accusative'), 
                                                            new ConstructionElement('intransitive')]))
    }
}

class DitransitiveVerbPhrase extends TypeOfConstruction {
    //new ConstructionOfPhrase(['ditransitive', 'dative', 'accusative'])
    constructions = []
}


//------------------------------------------------------------------------------
//  Rule-Based Tagger
//------------------------------------------------------------------------------

export class Node {
    word: Word
    tag: SYMBOLS
}

export class RuleBasedTagger {
    nodes: Array<Node> = new Array();

    constructor(lexemes: Array<ToneSandhiInputingLexeme>) {
        this.match(lexemes)
    }

    match(lexemes: Array<ToneSandhiInputingLexeme>) {
        // take in inputing lexemes and then check them against parsing lexemes
        let w: ToneWord = lexemes[0].word

        let cop: ConstructionOfPhrase        
        if(w instanceof ToneSandhiWord) {
            let pv = new VerbPhrase();
            for(let key in pv.constructions) {
                if(pv.constructions[key].elements[0].check(w)) {
                    cop = pv.constructions[key]
                    console.log('matched!')
                }
            }
        } else if(w instanceof ToneMarkLessWord) {}

        //console.log(cop.elements[1].id)
        //console.log(cop.elements[2].id)
        return false;
    }
}