import {
    KeyWords,
    EncliticSurface,
    ConstructionElement,
    VerbSurface,
    ParticleSurface,
    PersonalPronounSurface,
    PronounSurface,
} from './keywords';
import { POSTags, Tagset } from './symbols';
import { PhrasalInflectionAnalyzer } from './analyzer';
import { TonalTransitivePhraseme } from './phraseme';
import { dict_of_verbs, dict_of_phrasal_verbs, dict_of_seperate_vv_compounds } from './dictionary';

export class ConstructionOfSpeech {
    pos: string = '';
    elements: Array<ConstructionElement> = new Array();
}

export class ConstructionOfPhrase extends ConstructionOfSpeech {
    constructor(arr: Array<ConstructionElement>) {
        super();
        for (let key in arr) {
            this.elements.push(arr[key]);
        }
    }
}

class NounPhrase extends ConstructionOfPhrase {}
class VerbPhrase extends ConstructionOfPhrase {}

export class PhrasalVerb extends VerbPhrase {
    constructor(arr: Array<ConstructionElement>) {
        super(arr);
        this.pos = POSTags.verb;
    }
}

class VerbPhraseSurface extends ConstructionOfSpeech {
    constructor() {
        super();
        this.pos = POSTags.verb;
    }
}

export class PhrasalVerbWithEnclitic extends VerbPhraseSurface {
    constructor(verb: VerbSurface, particle: ParticleSurface, enclitic: EncliticSurface) {
        super();
        verb.tag = Tagset.VB;
        this.elements.push(verb);
        particle.tag = Tagset.PPV;
        this.elements.push(particle);
        enclitic.tag = Tagset.AUXN;
        this.elements.push(enclitic);
    }
}

export class VerbWithEnclitic extends VerbPhraseSurface {
    constructor(verb: VerbSurface, enclitic: EncliticSurface) {
        super();
        verb.tag = Tagset.VB;
        this.elements.push(verb);
        enclitic.tag = Tagset.AUXN;
        this.elements.push(enclitic);
    }
}

export class SetOfPhrasalVerbs {
    phrms: Array<TonalTransitivePhraseme> = new Array();
    phvs: Array<PhrasalVerb> = new Array();

    constructor() {
        this.populatePhrasemes();
        this.populatePhrasalVerbs();
    }

    private populatePhrasalVerbs() {
        for (let i in this.phrms) {
            this.phvs.push(
                new PhrasalVerb([
                    new VerbSurface(this.phrms[i].phrase.words[0].literal),
                    new ParticleSurface(this.phrms[i].phrase.words[1].literal),
                ]),
            );
            this.phvs.push(
                new PhrasalVerb([
                    new VerbSurface(this.phrms[i].proceedingForms[0].words[0].literal),
                    new ParticleSurface(this.phrms[i].proceedingForms[0].words[1].literal),
                ]),
            );
        }
    }

    private populatePhrasemes() {
        const pva = new PhrasalInflectionAnalyzer();
        for (let i in dict_of_phrasal_verbs) {
            this.phrms.push(pva.analyzeTransitive(dict_of_phrasal_verbs[i][0], dict_of_phrasal_verbs[i][1]));
        }
    }
}

class PhrasalTransitive extends VerbPhraseSurface {
    constructor(verb: VerbSurface, preposition: ParticleSurface, pronoun: PronounSurface) {
        super();
        verb.tag = Tagset.VB;
        this.elements.push(verb);
        preposition.tag = Tagset.PADV;
        this.elements.push(preposition);
        pronoun.tag = Tagset.NPR; // TODO: pronType
        this.elements.push(pronoun);
    }
}

class SmallClause extends VerbPhraseSurface {
    constructor(verb1: VerbSurface, pronoun: PersonalPronounSurface, verb2: VerbSurface) {
        super();
        verb1.tag = Tagset.VB;
        this.elements.push(verb1);
        pronoun.tag = Tagset.NPR;
        this.elements.push(pronoun);
        verb2.tag = Tagset.VB;
        this.elements.push(verb2);
    }
}

export class SetOfSmallClauses {
    constructions: Array<ConstructionOfSpeech> = [];

    constructor() {
        // obj. xcomp.
        const sc = new SmallClause(
            new VerbSurface('oannw'),
            new PersonalPronounSurface('goa'),
            new VerbSurface('churw'),
        );
        this.constructions.push(sc);
    }
}

export class Rules {
    private phrases: Array<ConstructionOfSpeech[]> = new Array();
    private keyWords: KeyWords = new KeyWords();

    constructor() {
        this.populatePatterns();
        this.populatePhrasalVerbs();
    }

    private lookupDictionary(str: string) {
        let phr;
        if (dict_of_verbs.includes(str)) {
            let vs: VerbSurface = new VerbSurface(str);
            if (vs.pos === POSTags.verb) vs.tag = Tagset.VB;
            phr = [new ConstructionOfSpeech()];
            phr[0].elements.push(vs);
            phr[0].pos = POSTags.verb;
            return phr;
        }

        return undefined;
    }

    private lookupRules(sequence: string[]) {
        let elems: Array<ConstructionElement> = [];
        for (let pat of this.phrases) {
            for (let j = 0; j < pat.length; j++) {
                //console.log(pat[j].elements)
                for (let e of pat[j].elements) {
                    elems.push(e);
                }
            }

            for (let i = 0; i < elems.length; i++) {
                if (i === 1 && i + 1 === elems.length) {
                    if (elems[0].surface === sequence[0] && elems[1].surface === sequence[1]) {
                        return pat;
                    }
                }
            }
            elems = [];
        }
    }

    matchKeyWords(str: string) {
        return this.keyWords.getSurface(str);
    }

    seperateMatches(str: string) {
        const ptcls = dict_of_seperate_vv_compounds[str];
        if (ptcls) {
            return ptcls[0];
        }
    }

    matches(sequence: string[]) {
        const phrD = this.lookupDictionary(sequence[0]);
        const phrR = this.lookupRules(sequence);
        if (phrR) return phrR;
        else if (phrD) return phrD;
        return undefined;
    }

    private populatePhrasalVerbs() {
        const s = new SetOfPhrasalVerbs();

        for (let i = 0; i < s.phvs.length; i++) {
            this.phrases.push([s.phvs[i]]);
        }
    }

    private populatePatterns() {
        this.phrases.push([new SetOfSmallClauses().constructions[0]]);
    }
}
