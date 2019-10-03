import {
    ConstructionElementInflectional,
    Verb,
    PersonalPronoun,
    Copula,
    PersonalPronouns,
    FromTone2ToTone137,
    PersonalPronoun2To137,
    Particle,
    KeyWords,
    Noun,
    Adjective,
    PartsOfSpeech,
    PhrasalVerbParticleDiurh,
    EncliticSurface,
    TonalZeroCombining,
    ConstructionElement,
    VerbSurface,
    ParticleSurface,
} from './keywords';
import { tonal_inflextion_analyzer } from './analyzer';
import { TonalCombiningForms } from './morpheme';
import { TonalInflexion } from './lexeme';
import { Phraseme } from '../phraseme';
import { POSTags, Tagset } from './symbols';

export class ConstructionOfPhrase {
    partOfSpeech: string = '';
    elements: Array<ConstructionElement> = new Array();
}

export class ConstructionOfPhraseInflectional extends ConstructionOfPhrase {
    phraseme: Phraseme = new Phraseme();
    
    constructor(arr: Array<PartsOfSpeech>) {
        super()
        for (let key in arr) {
            this.elements.push(arr[key]);
        }
    }
}

class NounPhrase extends ConstructionOfPhraseInflectional {}
class ParticlePhrase {}
class VerbPhrase extends ConstructionOfPhraseInflectional {}

export class PhrasalVerb extends VerbPhrase {
    constructor(arr: Array<ConstructionElementInflectional>) {
        super(arr);
        this.partOfSpeech = POSTags.verb;
    }
}

class VerbPhraseSurface extends ConstructionOfPhrase {
    constructor() {
        super();
        this.partOfSpeech = POSTags.verb;
    }
}

export class PhrasalVerbWithEncliticSurface extends VerbPhraseSurface {
    constructor(verb: VerbSurface, particle: ParticleSurface, enclitic: EncliticSurface) {
        super();
        verb.tag = Tagset.VB;
        this.elements.push(verb);
        particle.tag = Tagset.PPV;
        this.elements.push(particle);
        enclitic.tag = Tagset.ENC;
        this.elements.push(enclitic);
    }
}

class VerbWithEnclitic extends VerbPhraseSurface {
    constructor(verb: VerbSurface, enclitic: EncliticSurface) {
        super();
        verb.tag = Tagset.VB;
        this.elements.push(verb);
        enclitic.tag = Tagset.ENC;
        this.elements.push(enclitic);
    }
}

class SetOfPhrasalVerbs {
    phrasalVerbs: Array<PhrasalVerb> = [];

    constructor() {
        this.populatePhrasalVerbs();
    }

    private makeParticle(str: string) {
        let ret = new Particle();
        ret.lexeme = tonal_inflextion_analyzer.doAnalysis(str, new PhrasalVerbParticleDiurh(), new TonalInflexion())[0];
        return ret;
    }

    private populatePhrasalVerbs() {
        this.phrasalVerbs.push(new PhrasalVerb([new Verb(), this.makeParticle('diurh')]));
    }
}

class SetOfVerbWithEnclitic {
    verbs: Array<VerbWithEnclitic> = [];
    constructor() {
        this.populateVerbs();
    }

    private makeEnclitic(str: string) {
        let ret = new EncliticSurface();
        ret.surface = str;
        return ret;
    }

    private populateVerbs() {
        this.verbs.push(new VerbWithEnclitic(new Verb(), this.makeEnclitic('aw')));
    }
}

export class Chunk {
    constructions: Array<ConstructionOfPhraseInflectional> = [];

    constructor() {
        let ms = tonal_inflextion_analyzer.doMorphologicalAnalysis('oannz', new TonalCombiningForms());
        let ls = tonal_inflextion_analyzer.doLexicalAnalysis(ms, new TonalInflexion());
        let transitive = new Verb();
        transitive.lexeme = ls[0];

        ms = tonal_inflextion_analyzer.doMorphologicalAnalysis(
            PersonalPronouns.FirstSingular,
            new FromTone2ToTone137(),
        );
        ls = tonal_inflextion_analyzer.doLexicalAnalysis(ms, new TonalInflexion());
        let proceeding = new PersonalPronoun2To137();
        proceeding.lexeme = ls[0];

        ms = tonal_inflextion_analyzer.doMorphologicalAnalysis('churw', new TonalCombiningForms());
        ls = tonal_inflextion_analyzer.doLexicalAnalysis(ms, new TonalInflexion());
        let intransitive = new Verb();
        intransitive.lexeme = ls[0];

        this.constructions.push(new ConstructionOfPhraseInflectional([transitive, proceeding, intransitive]));
    }
}

export class Rules {
    private patterns: Array<ConstructionOfPhrase[]> = new Array();
    protected keyWords: KeyWords = new KeyWords();

    constructor() {
        this.populatePatterns();
        this.populatePhrasalVerbs();
        this.populateVerbWithEnclitics();
    }

    protected get(str: string) {
        const kw = this.keyWords.get(str);
        if (kw && kw instanceof ConstructionElementInflectional) return kw.clone();
        else return undefined;
    }

    matchKeyWords(str: string) {
        return this.keyWords.get(str)
    }

    matches(sequence: string[]) {
        let elems: Array<ConstructionElement> = [];
        for (let pat of this.patterns) {
            for (let j = 0; j < pat.length; j++) {
                for (let e of pat[j].elements) {
                    //console.log(e.wordForm)
                    elems.push(e);
                }
            }

            for (let i = 0; i < elems.length; i++) {
                if(elems[i] instanceof ConstructionElementInflectional) {
                    if ((<ConstructionElementInflectional>elems[i]).matchFormFor(sequence[i])) {
                        if(elems[i].surface === '' || elems[i].surface === sequence[i]) {
                            if (i + 1 === elems.length) {
                                return pat;
                            }
                        }
                    }
                } else if(elems[i] instanceof ConstructionElement) {
                    if(i === 1 && elems[i].surface === sequence[i] && i + 1 === elems.length) {
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
            this.patterns.push([pv]);
        }
    }

    private populateVerbWithEnclitics() {
        const s = new SetOfVerbWithEnclitic();
        for (let v of s.verbs) {
            //console.log(s.verbs[0].elements[1])
            this.patterns.push([v]);
        }
    }

    private populatePatterns() {
        // copula
        this.patterns.push([
            new ConstructionOfPhraseInflectional([new PersonalPronoun()]),
            new ConstructionOfPhraseInflectional([<Copula>this.get('siz')]),
            new ConstructionOfPhraseInflectional([new Noun()]),
        ]);

        this.patterns.push([
            new ConstructionOfPhraseInflectional([<Copula>this.get('siz')]),
            new ConstructionOfPhraseInflectional([new Adjective()]),
        ]);

        this.patterns.push([
            new ConstructionOfPhraseInflectional([<PersonalPronoun>this.get('goay')]),
            new ConstructionOfPhraseInflectional([<Copula>this.get('siz')]),
            new ConstructionOfPhraseInflectional([<Noun>this.get('langx')]),
        ]);

        // phrasal verb
        this.patterns.push([new ConstructionOfPhraseInflectional([new Verb(), new Particle()])]);

        // phrasal copula
        this.patterns.push([
            new ConstructionOfPhraseInflectional([new Verb(), new Particle()]),
            new ConstructionOfPhraseInflectional([new Adjective()]),
        ]);

        // serial verbs

        // others
        this.patterns.push([new Chunk().constructions[0]]);
    }
}
