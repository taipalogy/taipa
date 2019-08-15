import { ConstructionElement, Auxiliary, Verb, PersonalPronoun, Copula, PersonalPronouns, FromTone2ToTone137, PersonalPronoun2To137, Particle, KeyWords, Noun, Adjective } from './keywords'
import { TonalInflextionAnalyzer } from './analyzer'
import { TonalCombiningForms } from './morpheme';
import { TonalInflexion } from './lexeme';
import { POS } from './symbols';
import { Phraseme } from '../phraseme';

export class ConstructionOfPhrase {
    phraseme: Phraseme = new Phraseme()
    elements: Array<ConstructionElement> = new Array()

    constructor(arr: Array<ConstructionElement>){
        for(let key in arr) {
            this.elements.push(arr[key])
        }
    }
}

class Rule {
    previous: string = ''
    next: string = ''
}

class CopulaRule extends Rule {
    constructor() {
        super()
        this.previous = POS.pronoun
        this.next = POS.noun
    }
}

class PhrasalCopulaRule extends Rule {
    constructor() {
        super()
        this.previous = POS.pronoun
        this.next = POS.adjective
    }
}

abstract class TypeOfConstruction {
    protected static keyWords: KeyWords = new KeyWords()
    protected get(str: string) {
        const clone = TypeOfConstruction.keyWords.get(str).clone()
        return clone
    }
}

export class VerbPhrase {

    constructions: Array<ConstructionOfPhrase> = []

    constructor() {

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
    }
}

class CopulaPhrase extends TypeOfConstruction {
    phrases: Array<ConstructionOfPhrase> = new Array()

    constructor() {
        super()
        this.phrases.push(new ConstructionOfPhrase([new PersonalPronoun()]))
        this.phrases.push(new ConstructionOfPhrase([<Copula>this.get('siz')]))
        this.phrases.push(new ConstructionOfPhrase([new Noun()]))        
    }
}

class CopulaPhrase2 extends TypeOfConstruction {
    phrases: Array<ConstructionOfPhrase> = new Array()

    constructor() {
        super()
        this.phrases.push(new ConstructionOfPhrase([<Copula>this.get('siz')]))
        this.phrases.push(new ConstructionOfPhrase([new PersonalPronoun()]))
    }
}

class PhraslCopulaPhrase extends TypeOfConstruction {
    phrases: Array<ConstructionOfPhrase> = new Array()

    constructor() {
        super()
        this.phrases.push(new ConstructionOfPhrase([new Verb(), new Particle()]))
        this.phrases.push(new ConstructionOfPhrase([new Adjective]))
    }
}

class SerialVerbsConstruction {}