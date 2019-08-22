import { ConstructionOfPhrase, MultiWordExpressions } from './rules'
import { ConstructionElement, PartsOfSpeech } from './keywords'
import { POSTags, PERSONAL_PRONOUN2TO137_DECLENSION } from './symbols';

export class RuleBasedTagger {

    elements: Array<PartsOfSpeech> = new Array()

    constructor(strs: string[]) {
        this.match(strs)
    }

    private match(strs: string[]) {
        const xprsns = new MultiWordExpressions()
        const cops = xprsns.match(strs)

        if(cops)
            for(let p of cops) {
                for(let e of p.elements) {
                    this.elements.push(e)
                    //console.log(e.form + ':' + e.func)
                }
            }

        for(let i in this.elements) {
            //console.log(this.elements[i].func)
        }
    }

}