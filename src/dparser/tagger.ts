import { Rules, ConstructionOfSpeech, PhrasalVerb, PhrasalVerbWithEncliticSurface } from './rules';
import { POSTags, Tagset } from './symbols';
import { tonal_inflextion_analyzer } from './analyzer';
import { TonalCombiningForms } from './morpheme';
import { TonalInflexion } from './lexeme';
import {
    //ConstructionElementInflectional,
    //Demonstrative,
    //PersonalPronoun2To137,
    //Auxiliary,
    //PartsOfSpeech,
    ConstructionElement,
    EncliticSurface,
    ParticleSurface,
    VerbSurface,
    DemonstrativeSurface,
} from './keywords';
import { tonal_lemmatization_analyzer } from '../tonal/analyzer';

class MatchedPatternOfWords {
    elems: Array<ConstructionElement> = new Array();
}

export class RuleBasedTagger {
    private ces: Array<ConstructionElement> = new Array();

    constructor(strs: string[]) {
        this.match(strs);
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
/*
                    if (
                        pat.elements[pat.elements.length - 1].surface !=
                        //(<ConstructionElementInflectional>pat.elements[pat.elements.length - 1]).lexeme.word.literal
                        pat.elements[pat.elements.length - 1].pos
                    ) {
                        const ls = tonal_lemmatization_analyzer.doLexicalAnalysis(sequence[0]);
                        (<ConstructionElementInflectional>(
                            pat.elements[0]
                        )).lexeme = tonal_inflextion_analyzer.doAnalysis(
                            ls[0].lemmata[0].literal,
                            new TonalCombiningForms(),
                            new TonalInflexion(),
                        )[0];
                    } else {
                    }
                    */

                    pat.elements[0].tag = Tagset.VB;
                    //(<ConstructionElementInflectional>pat.elements[0]).matchFormFor(sequence[0]);
                } else if (
                    pat.partOfSpeech === POSTags.verb &&
                    pat.elements[pat.elements.length - 1].pos === POSTags.auxiliary
                ) {
                    //console.log('something else hit')
                }

                cps.push(pat);

                if (pat instanceof PhrasalVerb) {
                    let pvwes = new PhrasalVerbWithEncliticSurface(
                        new VerbSurface(pat.elements[0].surface),
                        new ParticleSurface(pat.elements[1].surface),
                        new EncliticSurface('aw'),
                    );
                    cps.push(pvwes);
                }
            }
        } else {
            //console.log(sequence)
        }

        //console.log(cps)
        return cps;
    }

    private phrase(strs: string[], beginOfPhrase: number) {
        const rs = new Rules();
        let sequence: string[] = [];
        let pats;
        for (let i = beginOfPhrase; i < strs.length; i++) {
            sequence.push(strs[i]);
            pats = rs.matches(sequence);
            if (pats) {
                break;
            } else {
                //console.log(sequence)
                let kw = rs.matchKeyWords(sequence[0]);

                if (kw) {
                    //console.log(kw)
                    if (kw.pos === POSTags.pronoun) kw.tag = Tagset.PRP;
                    else if (kw.pos === POSTags.determiner) kw.tag = Tagset.DT;
                    else if (kw.pos === POSTags.auxiliary) kw.tag = Tagset.AUX;
                    else if (kw.pos === POSTags.particle) kw.tag = Tagset.ADVP;

                    pats = [new ConstructionOfSpeech()]; // TODO: can keywords be wrapped in something else
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
        //else listCP = this.generate(sequence, [])

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

    private match(strs: string[]) {
        //const rs = new Rules();
        let buf: string[] = [];
        //let previousWords: ConstructionElement[] = [];

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

    get elements() {
        return this.ces;
    }
}
