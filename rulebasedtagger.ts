
import { Word, Lexeme, ToneSandhiWord, ToneWord, ToneMarkLessWord, ToneInputingLexeme, TurningIntoParsingLexeme, InflectionalEnding, FreeInflectionalEnding } from './lexeme'
import { SYMBOLS } from './symbols'
import { Allomorph } from './morpheme';

export let FORMS = {
    'VERB': {
        'intransitive': 'baseForm',
        'transitive': 'sandhiForm',
        'ditransitive': 'sandhiForm',
        'causitive': 'sandhiForm',
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
//  Free Desinence Cycling Rules
//------------------------------------------------------------------------------


//------------------------------------------------------------------------------
//  Parsing Lexeme
//------------------------------------------------------------------------------


class ParsingLexeme extends Lexeme {}

export class ToneSandhiParsingLexeme extends ParsingLexeme {
    rulesOfInflection
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
        let kvps = Object.keys(FORMS).find(key => this.partOfSpeech === key)
        // pick up the specific form from the part of speech
        let k = Object.keys(kvps).find(key => id === key )
        // assign property and property value
        this[k] = kvps[k]
    }

    assignTonalEnding(allomorph: Allomorph) {}

    get baseForm() { return this.word.literal }
    get sandhiForm() { return '' }

    toString(id: string) {
        return this[id]
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
        let l = turner.turnIntoLexeme('uannzs')[0]
        l.partOfSpeech = SYMBOLS.VERB
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

    constructor(lexemes: Array<ToneInputingLexeme>) {
        this.match(lexemes)
    }

    match(lexemes: Array<ToneInputingLexeme>) {
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