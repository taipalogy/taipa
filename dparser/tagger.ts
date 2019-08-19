import { ConstructionOfPhrase, VerbPhrase, MultiWordExpressions, Rule } from './rules'
import { ConstructionElement, PartsOfSpeech } from './keywords'
import { POS } from './symbols';

export class RuleBasedTagger {

    elements: Array<PartsOfSpeech> = new Array()

    constructor(strs: string[]) {
        this.match(strs)
    }

    private match(strs: string[]) {
/*
        let str: string = strs[0]

        let cop: ConstructionOfPhrase
        let vp = new VerbPhrase()
        // if w is an instance of TonalWord or ~
        for(let key in vp.constructions) {
            if(vp.constructions[key].elements[0].match(str)) {
                cop = vp.constructions[key]
            }
        }

        for(let k in strs) {
            this.elements.push(vp.constructions[0].elements[k])
        }

        this.elements = []
        */
        const xprsns = new MultiWordExpressions()
        const cops = xprsns.match(strs)
        let ppsubj = new Rule()
        ppsubj.forms.push('first')
        ppsubj.forms.push('sandhiForm')
        ppsubj.funcs.push('subjective')
        ppsubj.funcs.push('copulative')
        ppsubj.psos.push(POS.pronoun)
        ppsubj.psos.push(POS.verb)

        if(cops)
            for(let p of cops) {
                for(let e of p.elements) {
                    this.elements.push(e)
                    //console.log(e.form + ':' + e.func)
                }
            }

        //console.log(this.elements)
    }

}