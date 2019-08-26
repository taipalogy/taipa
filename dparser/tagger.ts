import { ConstructionOfPhrase, Rules } from './rules'

export class RuleBasedTagger {

    //elems: Array<PartsOfSpeech> = new Array()
    cops: Array<ConstructionOfPhrase> = new Array()

    constructor(strs: string[]) {
        this.match(strs)
    }

    private match(strs: string[]) {
        const rs = new Rules()
        const ps = rs.match(strs)
        if(ps)
            this.cops = ps

        if(this.cops)
            for(let p of this.cops) {
                for(let e of p.elements) {
                    //console.log(e.form + ':' + e.tag)
                }
            }
    }

    getCops() { return this.cops }
}