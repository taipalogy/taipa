import { ConstructionOfSpeech, PhrasalVerb, PhrasalVerbWithEnclitic, rules, VerbWithEnclitic } from './rules';
import { POSTags, Tagset } from './symbols';
import {
    ConstructionElement,
    EncliticSurface,
    ParticleSurface,
    VerbSurface,
} from './keywords';
import { Token } from '../token';

class MatchedPatternOfWords {
    elems: Array<ConstructionElement> = new Array();
}

export class RuleBasedTagger {
    private ces: Array<ConstructionElement> = new Array();

    constructor(tokens: Token[]) {
        this.match(tokens);
    }

    private generate(sequence: string[], patterns: ConstructionOfSpeech[]) {
        let cps: Array<ConstructionOfSpeech> = new Array();

        if (patterns.length > 0) {
            for (let pat of patterns) {
                if (
                    pat.partOfSpeech === POSTags.verb &&
                    pat.elements[pat.elements.length - 1].pos === POSTags.particle
                ) {
                    pat.elements[pat.elements.length - 1].tag = Tagset.PPV;

                    pat.elements[0].tag = Tagset.VB;
                } else if (
                    pat.partOfSpeech === POSTags.verb &&
                    pat.elements[pat.elements.length - 1].pos === POSTags.auxiliary
                ) {
                    //console.log('something else hit')
                }

                cps.push(pat);

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

        //console.log(pats)

        let listCP: Array<ConstructionOfSpeech> = new Array();
        if (pats) listCP = this.generate(sequence, pats);
        else listCP = this.generate(sequence, [])

        //console.log(listCP);

        let matchedLen = 0;
        let mp = new MatchedPatternOfWords();

        for (let m in listCP) {
            const min = Math.min(strs.length - beginOfPhrase, listCP[m].elements.length);
            if (listCP[m].elements.length == min) {
                for (let n = 0; n < min; n++) {
                    if (listCP[m].elements[n] != undefined) {
                        if (strs[beginOfPhrase + n] === listCP[m].elements[n].surface) {
                            if (n + 1 == min && min > matchedLen) {
                                matchedLen = min;
                                for (let q = 0; q < matchedLen; q++) {
                                    mp.elems[q] = listCP[m].elements[q];
                                    if (listCP[m].elements[q].surface === '') {
                                        mp.elems[q].surface = strs[beginOfPhrase + q];
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

    private match(tokens: Token[]) {
        let strs: string[] = [];
        for(let i in tokens)
            strs.push(tokens[i].text);

        let beginOfPhrase: number = 0;
        let matchedPW: MatchedPatternOfWords = new MatchedPatternOfWords();
        for (let i = 0; i < strs.length; i++) {
            if (i - beginOfPhrase == 0) {
                matchedPW = this.phrase(strs, beginOfPhrase);
                if (matchedPW.elems.length) {
                    beginOfPhrase += matchedPW.elems.length;
                    for (let w in matchedPW.elems) {
                        this.ces.push(matchedPW.elems[w]);
                    }
                    //console.log(matchedPW);
                    matchedPW.elems = [];
                }
            }
        }
    }

    tag(tokens: Token[]) {
        this.match(tokens);
        for(let i = 0; i < this.ces.length; i++) {
            if(tokens[i].text === this.ces[i].surface) {
                tokens[i].pos = this.ces[i].pos;
                tokens[i].tag = this.ces[i].tag;
            }
        }
    }
}
