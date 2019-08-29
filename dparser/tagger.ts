import { ConstructionOfPhrase, Rules } from './rules'
import { POSTags, Tagset } from './symbols';
import { TonalInflextionAnalyzer, tonalInflextionAnalyzer } from './analyzer';
import { TonalCombiningForms } from './morpheme';
import { TonalInflexion } from './lexeme';
import { ConstructionElement } from './keywords';
import { tonal_lemmatization_analyzer } from '../tonal/analyzer';

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

            //console.log(buf)
            let ps = rs.matchPatterns(buf)
            if(ps && ps.length>0) {
                // for phrases
                this.cps = ps
                for(let e of buf)
                    matchData.push(e)
                
                for(let cp of this.cps) {
                    //console.log(matchData[0])
                    if(cp.partOfSpeech === POSTags.verb && cp.elements[cp.elements.length-1].partOfSpeech === POSTags.particle) {
                        cp.elements[cp.elements.length-1].setTag(Tagset.PVRP)
                        cp.elements[cp.elements.length-1].setWordForm('diurhhw')
    
                        const ls = tonal_lemmatization_analyzer.doLexicalAnalysis(matchData[0])
                        cp.elements[0].lexeme = tonalInflextionAnalyzer.doAnalysis(ls[0].lemmata[0].literal, new TonalCombiningForms(), new TonalInflexion())[0]
                        cp.elements[0].setTag(Tagset.VB)
                        cp.elements[0].setWordForm(matchData[0])    
                    }
                    for(let e of cp.elements) {
                        //console.log(e.wordForm + ':' + e.lexeme.word.literal + '.' + e.tag)
                        this.ces.push(e)
                    }
                }
        
                
                buf = []
            } else {
                // for key words
                if(s) {
                    let kw = rs.matchKeyWords(s)
                    if(kw) {
                        //console.log(kw.lexeme.word.literal + ': key word matched')
                        buf = []
                        if(s === 'goa') kw.setTag(Tagset.PRP)
                        if(s === 'che') kw.setTag(Tagset.DT)
                        //console.log(kw)
                        this.ces.push(kw)
                    }
                }
            }    
        }

    }

    getCes() { return this.ces }
}