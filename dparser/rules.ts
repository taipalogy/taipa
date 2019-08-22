import { ConstructionElement, Demonstrative, Auxiliary, Verb, PersonalPronoun, Copula, PersonalPronouns
    , FromTone2ToTone137, PersonalPronoun2To137, Particle, KeyWords, Noun, Adjective, PartsOfSpeech } from './keywords'
import { TonalInflextionAnalyzer } from './analyzer'
import { TonalCombiningForms } from './morpheme';
import { TonalInflexion } from './lexeme';
import { Phraseme, ToneGroup } from '../phraseme';
import { POSTags } from './symbols';

export class ConstructionOfPhrase {
    phraseme: Phraseme = new Phraseme()
    partOfSpeech: string = ''
    elements: Array<PartsOfSpeech> = new Array()

    constructor(private arr: Array<PartsOfSpeech>) {
        for(let key in arr) {
            this.elements.push(arr[key])
        }
    }
}

export class Chunk {

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

export class MultiWordExpressions {
    private patterns: Array<ConstructionOfPhrase[]> = new Array()
    protected keyWords: KeyWords = new KeyWords()

    constructor() {
        this.populatePatterns()
    }

    protected get(str: string) {
        const clone = this.keyWords.get(str).clone()
        return clone
    }

    match(strs: string[]) {
        for(let p of this.patterns) {
            for(let i=0; i<p.length; i++) {
                if(p[i].elements[0].match(strs[i])) {
                    if(i+1 === p.length) {
                        return p
                    }
                }
            }
        }
    }

    populatePatterns() {
        // copula
        this.patterns.push([new ConstructionOfPhrase([new PersonalPronoun()])
                                , new ConstructionOfPhrase([<Copula>this.get('siz')])
                                , new ConstructionOfPhrase([new Noun()])])

        this.patterns.push([new ConstructionOfPhrase([<Copula>this.get('siz')])
                                , new ConstructionOfPhrase([new Adjective])])
        
        this.patterns.push([new ConstructionOfPhrase([this.get('goay')])
                                , new ConstructionOfPhrase([this.get('siz')])
                                , new ConstructionOfPhrase([this.get('langx')])])
                                
        // phrasal copula
        this.patterns.push([new ConstructionOfPhrase([new Verb(), new Particle()])
                                ,new ConstructionOfPhrase([new Adjective])])

        // serial verbs

        // others
        this.patterns.push([new Chunk().constructions[0]])
    }
}