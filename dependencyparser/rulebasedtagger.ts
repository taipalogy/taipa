import { TonalLemmatizationLexeme } from '../tonal/lexeme'
import { ConstructionOfPhrase, VerbPhrase } from './rules'
import { Word } from '../lexeme'
import { ConstructionElement } from './keywords'

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
            if(vp.constructions[key].elements[0].match(w)) {
                cop = vp.constructions[key]
            }
        }

        for(let k in lexemes) {
            this.elements.push(vp.constructions[0].elements[k])
        }
    }
}