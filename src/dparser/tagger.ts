import { Rules, ConstructionOfPhrase } from './rules';
import { POSTags, Tagset } from './symbols';
import { tonal_inflextion_analyzer } from './analyzer';
import { TonalCombiningForms } from './morpheme';
import { TonalInflexion } from './lexeme';
import { ConstructionElementInflectional, Demonstrative, PersonalPronoun2To137, Auxiliary, PartsOfSpeech, ConstructionElement } from './keywords';
import { tonal_lemmatization_analyzer } from '../tonal/analyzer';

class MatchedPatternOfWords {
    strs: Array<string> = new Array();
}

export class RuleBasedTagger {
    private ces: Array<ConstructionElement> = new Array();

    constructor(strs: string[]) {
        this.match(strs);
    }

    private phrase(strs: string[], beginOfPhrase: number) {
        const rs = new Rules();
        let sequence: string[] = []
        for(let i = beginOfPhrase; i < strs.length; i++) {
            sequence.push(strs[i])
            if(rs.matches(sequence)) {
                //console.log('matched')
                break;
            }
        }

        //console.log(sequence)

        let list: Array<string[]> = new Array();
        list.push(sequence);
        let form = Array.from(sequence);
        form.push('aw');
        list.push(form);

        //console.log(list);

        let matchedLen = 0;
        let mp = new MatchedPatternOfWords();

        for (let m in list) {
            const min = Math.min(strs.length - beginOfPhrase, list[m].length);
            if (list[m].length == min) {
                for (let n = 0; n < min; n++) {
                    if (list[m][n] != undefined) {
                        if (strs[beginOfPhrase + n] === list[m][n]) {
                            if (n + 1 == min && min > matchedLen) {
                                matchedLen = min;
                                for (let q = 0; q < matchedLen; q++) {
                                    mp.strs[q] = strs[beginOfPhrase + q];
                                }
    
                            }
                        }
                    }
                }
            }
        }

        return mp;
    }

    private match(strs: string[]) {
        const rs = new Rules();
        let buf: string[] = [];
        let previous: ConstructionElement | undefined = undefined

        let beginOfPhrase: number = 0;
        for (let i = 0; i < strs.length; i++) {
            let mpw: MatchedPatternOfWords = new MatchedPatternOfWords();
            if (i - beginOfPhrase == 0) {
                mpw = this.phrase(strs, beginOfPhrase);
            }
        }

        while (strs.length > 0) {
            let s = strs.shift();
            if (s) buf.push(s);

            //console.log(buf)
            let cps = rs.matchPatterns(buf);
            if (cps && cps.length > 0) {
                // for phrases
                for (let cp of cps) {
                    if (
                        cp.partOfSpeech === POSTags.verb &&
                        cp.elements[cp.elements.length - 1].pos === POSTags.particle
                    ) {
                        cp.elements[cp.elements.length - 1].tag = Tagset.PPV;

                        if (
                            cp.elements[cp.elements.length - 1].wordForm !=
                            (<ConstructionElementInflectional>cp.elements[cp.elements.length - 1]).lexeme.word.literal
                        ) {
                            const ls = tonal_lemmatization_analyzer.doLexicalAnalysis(buf[0]);
                            (<ConstructionElementInflectional>cp.elements[0]).lexeme = tonal_inflextion_analyzer.doAnalysis(
                                ls[0].lemmata[0].literal,
                                new TonalCombiningForms(),
                                new TonalInflexion(),
                            )[0];
                        } else {
                        }

                        cp.elements[0].tag = Tagset.VB;
                        (<ConstructionElementInflectional>cp.elements[0]).matchFormFor(buf[0])
                    }

                    this.ces.push(cp.elements[1])
                }

                buf = [];
            } else {
                
                if (s) {
                    
                    let kw = rs.matchKeyWords(s);
                    
                    if (kw) {
                        // for key words
                        if (kw.pos === POSTags.pronoun && kw instanceof PersonalPronoun2To137) kw.tag = Tagset.PRP;
                        else if (kw.pos === POSTags.pronoun && kw instanceof Demonstrative) kw.tag = Tagset.DT;
                        else if (kw.pos === POSTags.auxiliary) kw.tag = Tagset.AUX;

                        this.ces.push(kw);
                        buf = [];

                        previous = kw;
                    } else {
                        // not a key word nor a matched pattern

                        let ce = new ConstructionElementInflectional()
                        ce.lexeme = tonal_inflextion_analyzer.doAnalysis(
                            s,
                            new TonalCombiningForms(),
                            new TonalInflexion())[0]
                        
                        if (previous) {
                            if(previous.tag === Tagset.AUX || previous.tag === Tagset.PRP) {
                                // when an auxiliary or personal pronoun is followed by a verb
                                ce.pos = POSTags.verb
                                ce.tag = Tagset.VB;
                                ce.matchFormFor(s);
                                this.ces.push(ce);
                            }
                        } else {
                            // the first word of a sentence is a verb
                            ce.pos = POSTags.verb
                            ce.tag = Tagset.VB;
                            ce.matchFormFor(s);
                            this.ces.push(ce);
                        }
                    }
                }
            }
        }
    }

    getCes() {
        return this.ces;
    }
}
