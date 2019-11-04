import {
    KeyWords,
    EncliticSurface,
    ConstructionElement,
    VerbSurface,
    ParticleSurface,
    Auxiliary,
    PhrasalVerbParticleDiurh,
    DemonstrativeSurface,
    PersonalPronounSurface,
} from './keywords';
import { POSTags, Tagset } from './symbols';
import { TonalInflexion } from './lexeme';
import { tonal_inflextion_analyzer, PhrasalVerbAnalyzer } from './analyzer';
import { TonalWord } from '../tonal/lexeme';
import { TonalCombiningForms } from './morpheme';

export class ConstructionOfSpeech {
    partOfSpeech: string = '';
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
        this.partOfSpeech = POSTags.verb;
    }
}

class VerbPhraseSurface extends ConstructionOfSpeech {
    constructor() {
        super();
        this.partOfSpeech = POSTags.verb;
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
    phrasalVerbs: Array<PhrasalVerb> = [];
    baseForms: Array<PhrasalVerb> = new Array();
    sandhiForm1s: Array<PhrasalVerb> = new Array();

    constructor() {
        this.populatePhrasalVerbs();
    }

    private makeParticle(str: string) {
        let lexeme = tonal_inflextion_analyzer.analyze(str, new PhrasalVerbParticleDiurh(), new TonalInflexion())[0];
        let ret = new ParticleSurface(lexeme.otherForms[0].literal);
        return ret;
    }

    private makeVerb(str: string) {
        let lexeme = tonal_inflextion_analyzer.analyze(str, new TonalCombiningForms(), new TonalInflexion())[0];
        let ret = new VerbSurface(lexeme.otherForms[0].literal);
        return ret;
    }
    
    private populatePhrasalVerbs() {
        this.phrasalVerbs.push(new PhrasalVerb([new VerbSurface(''), new ParticleSurface('diurh')]));
        this.phrasalVerbs.push(new PhrasalVerb([new VerbSurface(''), this.makeParticle('diurh')]));

        const pva = new PhrasalVerbAnalyzer();
        const phrasemes = pva.analyze('longw', 'diurh');

        this.baseForms.push(new PhrasalVerb([new VerbSurface(phrasemes[0].phrase.words[0].literal), new ParticleSurface(phrasemes[0].phrase.words[1].literal)]));
        this.sandhiForm1s.push(new PhrasalVerb([new VerbSurface(phrasemes[0].sandhiForm.words[0].literal), new ParticleSurface(phrasemes[0].sandhiForm.words[1].literal)]));
    }
}

class PhrasalTransitive extends VerbPhraseSurface {
    constructor(verb: VerbSurface, particle: ParticleSurface, demonstrative: DemonstrativeSurface) {
        super();
        verb.tag = Tagset.VB;
        this.elements.push(verb);
        particle.tag = Tagset.PADV;
        this.elements.push(particle);
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
        for (let pat of this.phrases) {
            for (let j = 0; j < pat.length; j++) {
                for (let e of pat[j].elements) {
                    //console.log(e.wordForm)
                    elems.push(e);
                }
            }

            for (let i = 0; i < elems.length; i++) {
                if (elems[i] instanceof ConstructionElement) {
                    if (i === 1 && elems[i].surface === sequence[i] && i + 1 === elems.length) {
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
        for (let pv of s.phrasalVerbs) {
            //console.log(pv.elements[1].lexeme.word.literal)
            this.phrases.push([pv]);
        }
    }

    private populatePatterns() {
        this.phrases.push([new SetOfSmallClauses().constructions[0]]);
    }
}

export const rules = new Rules();