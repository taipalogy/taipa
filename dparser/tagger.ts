import { ConstructionOfPhrase, MultiWordExpressions } from './rules'
import { ConstructionElement, PartsOfSpeech } from './keywords'
import { POSTags, PERSONAL_PRONOUN2TO137_DECLENSION } from './symbols';

export class RuleBasedTagger {

    //elems: Array<PartsOfSpeech> = new Array()
    cops: Array<ConstructionOfPhrase> = new Array()

    constructor(strs: string[]) {
        this.match(strs)
    }

    private match(strs: string[]) {
        const xprsns = new MultiWordExpressions()
        const ps = xprsns.match(strs)
        if(ps)
            this.cops = ps

        if(this.cops)
            for(let p of this.cops) {
                for(let e of p.elements) {
                    //console.log(e.form + ':' + e.func)
                }
            }
    }

    getCops() { return this.cops }
}