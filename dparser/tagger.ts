import { ConstructionOfPhrase, Rules } from './rules'
import { POSTags, Tagset } from './symbols';
import { TonalInflextionAnalyzer, tonalInflextionAnalyzer } from './analyzer';
import { TonalCombiningForms } from './morpheme';
import { TonalInflexion } from './lexeme';
import { ConstructionElement } from './keywords';

export class RuleBasedTagger {
    private cps: Array<ConstructionOfPhrase> = new Array()
    private ces: Array<ConstructionElement> = new Array()

    constructor(strs: string[]) {
        this.match(strs)
    }

    private match(strs: string[]) {
        const rs = new Rules()
        let buf: string[] = []
        let matchData: string[] = []
        while(strs.length > 0) {
            let s = strs.shift()
            if(s) buf.push(s)

            let ps = rs.matchPatterns(buf)
            if(ps) {
                this.cps = ps
                for(let e of buf)
                    matchData.push(e)
                buf = []
            } else {
                if(s) {
                    let kw = rs.matchKeyWords(s)
                    if(kw) {
                        buf = []
                        kw.setTag(Tagset.PRP)
                        this.ces.push(kw)
                    }
                }
            }    
        }

        if(this.cps)
            for(let cp of this.cps) {
                if(cp.partOfSpeech === POSTags.verb && cp.elements[cp.elements.length-1].partOfSpeech === POSTags.particle) {
                    const ms = tonalInflextionAnalyzer.doMorphologicalAnalysis(matchData[0], new TonalCombiningForms())
                    const ls = tonalInflextionAnalyzer.doLexicalAnalysis(ms, new TonalInflexion())
                    cp.elements[0].lexeme = ls[0]
                    cp.elements[0].setTag(Tagset.VB)
                    cp.elements[cp.elements.length-1].setTag(Tagset.PVRP)
                }
                for(let e of cp.elements) {
                    //console.log(e.form + ':' + e.lexeme.word.literal + '.' + e.tag)
                    this.ces.push(e)
                }
            }
    }

    getCes() { return this.ces }
}