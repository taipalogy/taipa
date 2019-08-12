import { ConstructionElement, Auxiliary, Verb, PersonalPronoun, Copula, PersonalPronouns, FromTone2ToTone137, PersonalPronoun2To137 } from './keywords'
import { TonalInflextionAnalyzer } from './analyzer'
import { TonalCombiningForms } from './morpheme';
import { TonalInflexion } from './lexeme';

export class ConstructionOfPhrase {
    elements: Array<ConstructionElement> = new Array()

    constructor(arr: Array<ConstructionElement>){
        for(let key in arr) {
            this.elements.push(arr[key])
        }
    }
}

abstract class TypeOfConstruction {
    abstract constructions: Array<ConstructionOfPhrase>;
}

export class VerbPhrase extends TypeOfConstruction {

    constructions: Array<ConstructionOfPhrase> = []

    constructor() {
        super()

        let analyzer = new TonalInflextionAnalyzer()

        let ms = analyzer.doMorphologicalAnalysis('oannz', new TonalCombiningForms())
        let ls = analyzer.doLexicalAnalysis(ms, new TonalInflexion())
        let transitive = new Verb()
        transitive.lexeme = ls[0]


        ms = analyzer.doMorphologicalAnalysis(PersonalPronouns.FirstSingular, new FromTone2ToTone137())
        ls = analyzer.doLexicalAnalysis(ms, new TonalInflexion())
        let proceeding = new PersonalPronoun2To137()
        proceeding.lexeme = ls[0]

        ms = analyzer.doMorphologicalAnalysis('churw', new TonalCombiningForms())
        ls = analyzer.doLexicalAnalysis(ms, new TonalInflexion())
        let intransitive = new Verb()
        intransitive.lexeme = ls[0]

        this.constructions.push(new ConstructionOfPhrase([transitive, proceeding, intransitive]))

        this.constructions.push(new ConstructionOfPhrase([new PersonalPronoun(), new Auxiliary(), new Verb()]))
        this.constructions.push(new ConstructionOfPhrase([new PersonalPronoun(), new Copula()]))
    }
}

class DitransitiveVerbPhrase extends TypeOfConstruction {
    constructions = []
}

class Rule {
    r: ConstructionOfPhrase[]
    constructor(arr: ConstructionOfPhrase[]) {
        this.r = arr
    }
}

class Rules {
    arr: Array<Rule> = []

    constructor() {
        this.populateArray()
    }

    private populateArray() {
        this.arr = []
    }
}