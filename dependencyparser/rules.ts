import { ConstructionElement, Auxiliary, Verb, PersonalPronoun, Copula, PersonalPronouns, FromTone2ToTone137, PersonalPronoun2To137, Particle, KeyWords } from './keywords'
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
    protected keyWords: KeyWords = new KeyWords()
    protected get(str: string) {
        const clone = this.keyWords.get(str).clone()
        return clone
    }
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
    }
}

class CopulaPhrase extends TypeOfConstruction {
    constructions: Array<ConstructionOfPhrase> = []

    constructor() {
        super()
        this.constructions.push(new ConstructionOfPhrase([new Copula()]))
        this.constructions.push(new ConstructionOfPhrase([<Copula>this.get('siz').select(['sandhiForm', 'copulative'])]))
        this.constructions.push(new ConstructionOfPhrase([new Verb(), new Particle()]))
    }
}

class DitransitiveVerbPhrase extends TypeOfConstruction {
    constructions = []
}

export class Rules {
    arr: Array<ConstructionOfPhrase> = new Array()

    constructor() {
        this.populateArray()
    }

    private populateArray() {
        const copulaPhrase: CopulaPhrase = new CopulaPhrase()
        for(let e of copulaPhrase.constructions) {
            this.arr.push(e)
        }
    }
}