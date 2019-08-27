import { ConstructionOfPhrase, Rules } from './rules'
import { POSTags, Tagset } from './symbols';
import { TonalInflextionAnalyzer } from './analyzer';
import { TonalCombiningForms } from './morpheme';
import { TonalInflexion } from './lexeme';

export class RuleBasedTagger {
    private analyzer = new TonalInflextionAnalyzer()
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
                if(cp.partOfSpeech === POSTags.verb && cp.elements[cp.elements.length-1].partOfSpeech === POSTags.particle) {
                    const ms = this.analyzer.doMorphologicalAnalysis(strs[0], new TonalCombiningForms())
                    const ls = this.analyzer.doLexicalAnalysis(ms, new TonalInflexion())
                    cp.elements[0].lexeme = ls[0]
                    cp.elements[0].setTag(Tagset.VB)
                    cp.elements[cp.elements.length-1].setTag(Tagset.PVRP)
                }
                for(let e of cp.elements) {
                    //console.log(e.form + ':' + e.lexeme.word.literal + '.' + e.tag)
                }
            }
    }

    getCps() { return this.cps }
}