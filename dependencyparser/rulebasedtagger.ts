import { SYMBOLS } from './symbols'
import { TonalLemmatizationLexeme } from '../tonal/lexeme'
import { TonalInflextionAnalyzer } from './analyzer'
import { Word } from '../lexeme'
import { TonalInflexionLexeme, InflexionLexeme } from './lexeme'

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

//------------------------------------------------------------------------------
//  Construction Element
//------------------------------------------------------------------------------

export class ConstructionElement {
    lexeme: InflexionLexeme
    partOfSpeech: string = ''

    constructor(l: InflexionLexeme) {
        this.lexeme = l
    }

    check(w: Word) {
        if(this.lexeme.word.literal === w.literal) {
            return true
        }
        return false
    }

}

class Transitive extends ConstructionElement {}

class Proceeding extends ConstructionElement {}

class Intransitive extends ConstructionElement {}

//------------------------------------------------------------------------------
//  Type of Construction
//------------------------------------------------------------------------------

abstract class TypeOfConstruction {
    abstract constructions: Array<ConstructionOfPhrase>;
}

class VerbPhrase extends TypeOfConstruction {

    constructions: Array<ConstructionOfPhrase> = []

    constructor() {
        super()

        let analyzer = new TonalInflextionAnalyzer()

        let l1 = analyzer.makeLexemes('oannz')
        let transitive = new Transitive(l1[0])
        transitive.partOfSpeech = SYMBOLS.VERB
        
        let l2 = analyzer.makeLexemes('goay')
        let proceeding = new Proceeding(l2[0])
        proceeding.partOfSpeech = SYMBOLS.PERSONALPRONOUN

        let l3 = analyzer.makeLexemes('churw')
        let intransitive = new Intransitive(l3[0])
        intransitive.partOfSpeech = SYMBOLS.VERB

        this.constructions.push(new ConstructionOfPhrase([transitive, proceeding, intransitive]))

    }
}

class DitransitiveVerbPhrase extends TypeOfConstruction {
    constructions = []
}

//------------------------------------------------------------------------------
//  Rule-Based Tagger
//------------------------------------------------------------------------------

export class RuleBasedTagger {

    lexemes: Array<InflexionLexeme> = new Array();
    elements: Array<ConstructionElement> = new Array()

    constructor(lexemes: Array<TonalLemmatizationLexeme>) {
        this.match(lexemes)
    }

    match(lexemes: Array<TonalLemmatizationLexeme>) {
        // take in lemma lexemes and then check them against parsing lexemes
        // store matched parsing lexemes in nodes
        let w: Word = lexemes[0].word

        let cop: ConstructionOfPhrase
        let vp = new VerbPhrase()
        // if w is an instance of TonalWord or ~
        for(let key in vp.constructions) {
            if(vp.constructions[key].elements[0].check(w)) {
                cop = vp.constructions[key]
            }
        }

        for(let k in lexemes) {
            this.lexemes.push(vp.constructions[0].elements[k].lexeme)
            this.elements.push(vp.constructions[0].elements[k])
        }
    }
}