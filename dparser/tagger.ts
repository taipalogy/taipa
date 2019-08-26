import { ConstructionOfPhrase, Rules } from './rules'

export class RuleBasedTagger {

    //elems: Array<PartsOfSpeech> = new Array()
    cps: Array<ConstructionOfPhrase> = new Array()

    constructor(strs: string[]) {
        this.match(strs)
    }

    private match(strs: string[]) {
        const rs = new Rules()
        const ps = rs.match(strs)
        if(ps)
            this.cps = ps

        if(this.cps)
            for(let cp of this.cps) {
                //console.log(cp.partOfSpeech)
                for(let e of cp.elements) {
                    //console.log(e.form + ':' + e.tag + '.' + e.lexeme.word.literal)
                }
            }
    }

    getCops() { return this.cps }
}