import {
    KeyWords,
    EncliticSurface,
    ConstructionElement,
    VerbSurface,
    ParticleSurface,
    PersonalPronounSurface,
    PrepositionSurface,
    PronounSurface,
} from './keywords';
import { POSTags, Tagset } from './symbols';
import { PhrasalVerbAnalyzer } from './analyzer';

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

class SetOfPhrasalVerbs {
    phvs: Array<PhrasalVerb> = new Array();

    constructor() {
        this.populatePhrasalVerbs();
    }

    private populatePhrasalVerbs() {
        const pva = new PhrasalVerbAnalyzer();

        const ph = pva.analyze('longw', 'diurh');
        this.phvs.push(new PhrasalVerb([new VerbSurface(ph.phrase.words[0].literal), new ParticleSurface(ph.phrase.words[1].literal)]));
        this.phvs.push(new PhrasalVerb([new VerbSurface(ph.sandhiForm.words[0].literal), new PrepositionSurface(ph.sandhiForm.words[1].literal)]));

        const ph2 = pva.analyze('koannww', 'diurh');
        this.phvs.push(new PhrasalVerb([new VerbSurface(ph2.phrase.words[0].literal), new ParticleSurface(ph2.phrase.words[1].literal)]));
        this.phvs.push(new PhrasalVerb([new VerbSurface(ph2.sandhiForm.words[0].literal), new PrepositionSurface(ph2.sandhiForm.words[1].literal)]));
    }
}

class PhrasalTransitive extends VerbPhraseSurface {
    constructor(verb: VerbSurface, preposition: ParticleSurface, demonstrative: PronounSurface) {
        super();
        verb.tag = Tagset.VB;
        this.elements.push(verb);
        preposition.tag = Tagset.PADV;
        this.elements.push(preposition);
        demonstrative.tag = Tagset.DT; // TODO: pronType
        this.elements.push(demonstrative);
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
        const sc = new SmallClause(new VerbSurface('oannw'), new PersonalPronounSurface('goa'), new VerbSurface('churw'))
        this.constructions.push(sc);
    }   
}

export class Rules {
    private phrases: Array<ConstructionOfSpeech[]> = new Array();
    protected keyWords: KeyWords = new KeyWords();

    constructor() {
        this.populatePatterns();
        this.populatePhrasalVerbs();
    }

    matchKeyWords(str: string) {
        return this.keyWords.getSurface(str);
    }

    matches(sequence: string[]) {
        let elems: Array<ConstructionElement> = [];
        //console.log(this.phrases.length)
        for (let pat of this.phrases) {
            for (let j = 0; j < pat.length; j++) {
                //console.log(pat[j].elements)
                for (let e of pat[j].elements) {
                    elems.push(e);
                }
            }

            for (let i = 0; i < elems.length; i++) {                    
                if (i === 1  && i + 1 === elems.length) {
                    if(elems[0].surface === sequence[0] && elems[1].surface === sequence[1]) {
                        return pat;
                    }
                }
            }
            elems = [];
        }

        return undefined;
    }

    private populatePhrasalVerbs() {
        const s = new SetOfPhrasalVerbs();

        for(let i = 0; i < s.phvs.length; i++) {
            this.phrases.push([s.phvs[i]])
        }
    }

    private populatePatterns() {
        this.phrases.push([new SetOfSmallClauses().constructions[0]]);
    }
}