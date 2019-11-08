import { ConstructionOfSpeech, PhrasalVerb, PhrasalVerbWithEnclitic, VerbWithEnclitic, Rules } from './rules';
import { POSTags, Tagset } from './symbols';
import {
    ConstructionElement,
    EncliticSurface,
    ParticleSurface,
    VerbSurface,
} from './keywords';
import { Token } from '../token';
import { Document } from '../document';

export class RuleBasedTagger {
    private speeches: Array<ConstructionOfSpeech> = new Array();

    private generate(sequence: string[], patterns: ConstructionOfSpeech[]) {
        let cps: Array<ConstructionOfSpeech> = new Array();

        if (patterns.length > 0) {
            for (let pat of patterns) {
                if (
                    pat.pos === POSTags.verb &&
                    pat.elements[pat.elements.length - 1].pos === POSTags.particle
                ) {
                    pat.elements[0].tag = Tagset.VB;
                    pat.elements[pat.elements.length - 1].tag = Tagset.PPV;
                } else if (
                    pat.pos === POSTags.verb &&
                    pat.elements[pat.elements.length - 1].pos === POSTags.auxiliary
                ) {
                    //console.log('something else hit')
                }

                cps.push(pat);

                //console.log(pat.elements)

                if (pat instanceof PhrasalVerb) {
                    let pvwes = new PhrasalVerbWithEnclitic(
                        new VerbSurface(pat.elements[0].surface),
                        new ParticleSurface(pat.elements[1].surface),
                        new EncliticSurface('aw'),
                    );
                    cps.push(pvwes);
                }
            }
        } else {
            //console.log(sequence)
            let vwe = new VerbWithEnclitic(
                new VerbSurface(sequence[0]),
                new EncliticSurface('aw'),
            );
            cps.push(vwe);
        }

        //console.log(cps)
        return cps;
    }

    private phrase(strs: string[], beginOfPhrase: number) {
        //const rs = new Rules();
        let sequence: string[] = [];
        let pats;
        const rules = new Rules();
        for (let i = beginOfPhrase; i < strs.length; i++) {
            sequence.push(strs[i]);
            pats = rules.matches(sequence);
            if (pats) {
                break;
            } else {
                //console.log(sequence)
                let kw = rules.matchKeyWords(sequence[0]);

                if (kw) {
                    //console.log(kw)
                    if (kw.pos === POSTags.pronoun) kw.tag = Tagset.NPR;
                    else if (kw.pos === POSTags.determiner) kw.tag = Tagset.DT;
                    else if (kw.pos === POSTags.auxiliary) kw.tag = Tagset.AUX;
                    else if (kw.pos === POSTags.particle) kw.tag = Tagset.PADV;

                    pats = [new ConstructionOfSpeech()];
                    pats[0].elements.push(kw);
                    break;
                } else {
                    //console.log(sequence)
                }
            }
        }

        //if(pats) console.log(pats[0].elements)

        let listCP: Array<ConstructionOfSpeech> = new Array();
        if (pats) listCP = this.generate(sequence, pats);
        else listCP = this.generate(sequence, [])

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
                            }
                        }
                    }
                }
            }
        }

        return mp;
    }

    private tagSpeeches() {
        //for(let s of this.speeches)
            //console.log(s.elements)
    }

    private match(tokens: Token[]) {
        let strs: string[] = [];
        for(let i in tokens)
            strs.push(tokens[i].text);

        let beginOfPhrase: number = 0;
        let matched: ConstructionOfSpeech = new ConstructionOfSpeech();
        for (let i = 0; i < strs.length; i++) {
            if (i - beginOfPhrase == 0) {
                matched = this.phrase(strs, beginOfPhrase);
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
        
        for(let i in this.speeches) {
            for (let j in this.speeches[i].elements) {
                ces.push(this.speeches[i].elements[j]);
            }
        }

        for(let i = 0; i < ces.length; i++) {
            if(doc.tokens[i].text === ces[i].surface) {
                doc.tokens[i].pos = ces[i].pos;
                doc.tokens[i].tag = ces[i].tag;
            }
        }

        return doc;
    }
}
