import {
    KeyWords,
    EncliticSurface,
    ConstructionElement,
    VerbSurface,
    ParticleSurface,
    Auxiliary,
    PhrasalVerbParticleDiurh,
} from './keywords';
import { POSTags, Tagset } from './symbols';
import { Phraseme } from '../phraseme';
import { TonalInflexion } from './lexeme';
import { tonal_inflextion_analyzer } from './analyzer';

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

    constructor() {
        this.populatePhrasalVerbs();
    }

    private makeParticle(str: string) {
        let lexeme = tonal_inflextion_analyzer.doAnalysis(str, new PhrasalVerbParticleDiurh(), new TonalInflexion())[0];
        let ret = new ParticleSurface(lexeme.otherForms[0].literal);
        return ret;
    }

    private populatePhrasalVerbs() {
        //this.phrasalVerbs.push(new PhrasalVerb([new Verb(), this.makeParticle('diurh')]));
        this.phrasalVerbs.push(new PhrasalVerb([new VerbSurface(''), new ParticleSurface('diurh')]));
        this.phrasalVerbs.push(new PhrasalVerb([new VerbSurface(''), this.makeParticle('diurh')]));
    }
}

export class Chunk {
    /*
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
    */
}

export class Rules {
    private patterns: Array<ConstructionOfSpeech[]> = new Array();
    protected keyWords: KeyWords = new KeyWords();

    constructor() {
        this.populatePatterns();
        this.populatePhrasalVerbs();
        //this.populateVerbWithEnclitics();
    }

    matchKeyWords(str: string) {
        return this.keyWords.getSurface(str);
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
            this.patterns.push([pv]);
        }
    }

    private populatePatterns() {
        // copula
        /*
        this.patterns.push([
            new ConstructionOfPhraseInflectional([new PersonalPronoun()]),
            new ConstructionOfPhraseInflectional([<Copula>this.get('siz')]),
            new ConstructionOfPhraseInflectional([new Noun()]),
        ]);
        */
/*
        this.patterns.push([
            new ConstructionOfPhraseInflectional([<Copula>this.get('siz')]),
            new ConstructionOfPhraseInflectional([new Adjective()]),
        ]);

        this.patterns.push([
            new ConstructionOfPhraseInflectional([<PersonalPronoun>this.get('goay')]),
            new ConstructionOfPhraseInflectional([<Copula>this.get('siz')]),
            new ConstructionOfPhraseInflectional([<Noun>this.get('langx')]),
        ]);
*/
        // phrasal verb
        /*
        this.patterns.push([new ConstructionOfPhraseInflectional([new Verb(), new Particle()])]);

        // phrasal copula
        this.patterns.push([
            new ConstructionOfPhraseInflectional([new Verb(), new Particle()]),
            new ConstructionOfPhraseInflectional([new Adjective()]),
        ]);
*/
        // serial verbs

        // others
        //this.patterns.push([new Chunk().constructions[0]]);
    }
}

export const rules = new Rules();