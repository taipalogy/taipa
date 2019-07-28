import { POS } from './symbols'
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
        transitive.partOfSpeech = POS.verb
        
        let l2 = analyzer.makeLexemes('goay')
        let proceeding = new Proceeding(l2[0])
        proceeding.partOfSpeech = POS.personal_pronoun

        let l3 = analyzer.makeLexemes('churw')
        let intransitive = new Intransitive(l3[0])
        intransitive.partOfSpeech = POS.verb

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

    elements: Array<ConstructionElement> = new Array()

    constructor(lexemes: Array<TonalLemmatizationLexeme>) {
        this.match(lexemes)
    }

    private match(lexemes: Array<TonalLemmatizationLexeme>) {
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
            this.elements.push(vp.constructions[0].elements[k])
        }
    }
}