import { ConstructionOfSpeech, PhrasalVerb, PhrasalVerbWithEnclitic, VerbWithEnclitic, Rules } from './rules';
import { POSTags, Tagset } from './symbols';
import { ConstructionElement, EncliticSurface, ParticleSurface, VerbSurface } from './keywords';
import { Token } from '../token';
import { Document } from '../document';

export class RuleBasedTagger {
    private speeches: Array<ConstructionOfSpeech> = new Array();
    private readonly rules = new Rules();

    private generate(sequence: string[], phrases: ConstructionOfSpeech[]) {
        let cps: Array<ConstructionOfSpeech> = new Array();

        if (phrases.length > 0) {
            for (let ph of phrases) {
                cps.push(ph);

                //console.log(pat.elements)

                if (ph instanceof PhrasalVerb) {
                    const pvwe = new PhrasalVerbWithEnclitic(
                        new VerbSurface(ph.elements[0].surface),
                        new ParticleSurface(ph.elements[1].surface),
                        new EncliticSurface('aw'),
                    );
                    cps.push(pvwe);
                } else if(ph.pos === POSTags.verb) {
                    const vwe = new VerbWithEnclitic(new VerbSurface(sequence[0]), new EncliticSurface('aw'));
                    cps.push(vwe);        
                }
            }
        } else {
            //console.log(sequence)
            const vwe = new VerbWithEnclitic(new VerbSurface(sequence[0]), new EncliticSurface('aw'));
            cps.push(vwe);
        }

        //console.log(cps)
        return cps;
    }

    private tagKeyWord(kw: ConstructionElement) {
        if (kw.pos === POSTags.pronoun) {
            kw.tag = Tagset.NPR;
        } else if (kw.pos === POSTags.auxiliary) kw.tag = Tagset.AUX;
        else if (kw.pos === POSTags.particle) kw.tag = Tagset.PADV;
    }

    private matchSeperates(sequence: string[], particle: string) {
        let phrase: ConstructionOfSpeech = new ConstructionOfSpeech();
        let vs: VerbSurface = new VerbSurface(sequence[0]);
        vs.tag = Tagset.VB;
        phrase.elements.push(vs);
        phrase.pos = POSTags.verb;

        if(sequence.length > 1) {
            for(let i = 1; i < sequence.length; i++) {
                // skip the first array element
                
                let kw = this.rules.matchKeyWords(sequence[i]);
                if(kw) {
                    this.tagKeyWord(kw);
                    phrase.elements.push(kw);
                }

                if(sequence[i] === particle){
                    let ps: VerbSurface = new VerbSurface(sequence[i]);
                    ps.tag = Tagset.VB;
                    phrase.elements.push(ps);
                    return phrase;
                }
            }
        }
    }
    
    private tagPhrases(phrases: ConstructionOfSpeech[]) {
        if (phrases.length > 0) {
            for (let ph of phrases) {
                if (ph.pos === POSTags.verb && ph.elements[ph.elements.length - 1].pos === POSTags.particle) {
                    ph.elements[0].tag = Tagset.VB;
                    ph.elements[ph.elements.length - 1].tag = Tagset.PPV;
                } else if (ph.pos === POSTags.verb && ph.elements[ph.elements.length - 1].pos === POSTags.auxiliary) {
                    //console.log('something else hit')
                } else if (ph.pos === POSTags.verb && ph.elements[ph.elements.length - 1].pos === POSTags.adposition) {
                    ph.elements[0].tag = Tagset.VB;
                    ph.elements[ph.elements.length - 1].tag = Tagset.APPR;
                }
            }
        }

        return phrases;
    }

    private phrase(strs: string[], beginOfPhrase: number) {
        let sequence: string[] = [];
        let phrss;
        
        for (let i = beginOfPhrase; i < strs.length; i++) {
            sequence.push(strs[i]);
        }

        phrss = this.rules.matches(sequence);

        const ptcl = this.rules.seperateMatches(sequence[0]);
        if(ptcl) {
            const sep = this.matchSeperates(sequence, ptcl);
            if(sep) {
                phrss = [];
                phrss = [sep];
            }
        }

        if(!phrss) {
            //console.log(sequence)
            let kw = this.rules.matchKeyWords(sequence[0]);

            if (kw) {
                //console.log(kw)
                this.tagKeyWord(kw);

                phrss = [new ConstructionOfSpeech()];
                phrss[0].elements.push(kw);
            }
        }

        //if(pats) console.log(pats[0].elements)

        if (phrss) phrss = this.tagPhrases(phrss);

        let listCP: Array<ConstructionOfSpeech> = new Array();
        if (phrss) listCP = this.generate(sequence, phrss);
        else listCP = this.generate(sequence, []);

        //console.log(listCP);

        let matchedLen = 0;
        let mp = new ConstructionOfSpeech();

        for (let m in listCP) {
            const min = Math.min(strs.length - beginOfPhrase, listCP[m].elements.length);
            if (listCP[m].elements.length == min) {
                for (let n = 0; n < min; n++) {
                    if (listCP[m].elements[n] != undefined) {
                        if (strs[beginOfPhrase + n] === listCP[m].elements[n].surface) {
                            if (n + 1 == min && min > matchedLen) {
                                matchedLen = min;

                                for (let q = 0; q < matchedLen; q++) {
                                    mp.elements[q] = listCP[m].elements[q];
                                    if (listCP[m].elements[q].surface === '') {
                                        mp.elements[q].surface = strs[beginOfPhrase + q];
                                    }
                                }
                                mp.pos = listCP[m].pos;
                            }
                        }
                    }
                }
            }
        }

        return mp;
    }

    private tagSpeeches() {
        for (let s of this.speeches) {
            if (s.elements.length == 1 && s.elements[0].pos == POSTags.pronoun) s.pos = POSTags.pronoun;

            //console.log(s)
            //console.log(s.elements)
        }
    }

    private match(tokens: Token[]) {
        let strs: string[] = [];
        for (let i in tokens) strs.push(tokens[i].orth);

        let beginOfPhrase: number = 0;
        let matched: ConstructionOfSpeech = new ConstructionOfSpeech();
        for (let i = 0; i < strs.length; i++) {
            if (i - beginOfPhrase == 0) {
                matched = this.phrase(strs, beginOfPhrase);
                //console.log(matched)
                if (matched.elements.length) {
                    beginOfPhrase += matched.elements.length;
                    this.speeches.push(matched);
                    this.tagSpeeches();
                }
            }
        }
    }

    tag(doc: Document) {
        this.match(doc.tokens);

        let ces: Array<ConstructionElement> = new Array();

        for (let i in this.speeches) {
            doc.speeches.push(this.speeches[i]);
            for (let j in this.speeches[i].elements) {
                ces.push(this.speeches[i].elements[j]);
            }
        }

        for (let i = 0; i < ces.length; i++) {
            if (doc.tokens[i].orth === ces[i].surface) {
                doc.tokens[i].pos = ces[i].pos;
                doc.tokens[i].tag = ces[i].tag;
            }
        }

        return doc;
    }
}
