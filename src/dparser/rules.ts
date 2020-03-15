import {
    KeyWords,
    EncliticSurface,
    ConstructionElement,
    VerbSurface,
    ParticleSurface,
    PersonalPronounSurface,
    PronounSurface,
    OrthoPhraseme,
    VisitorMatching
} from './keywords';
import { POSTags, Tagset } from './symbols';
import { TonalPhrasalInflector } from './inflector';
import { PhrasalVerbPhraseme, PhrasalVerbTwoPhraseme } from './phraseme';
import { dictOfVerbs, dictOfPhrasalVerbs, dictOfSeperateVVCompounds, dictOfPhrasalVerbTwos } from './dictionary';

// class ConstructionOfSpeech {pos: string = '';}

export class ConstructionOfPhrase {
    pos: string = '';
    elements: Array<ConstructionElement> = new Array();
    constructor(arr: Array<ConstructionElement>) {
        for (let key in arr) {
            this.elements.push(arr[key]);
        }
    }
}

export class PhrasalVerb extends ConstructionOfPhrase {
    constructor(arr: Array<ConstructionElement>) {
        super(arr);
        this.pos = POSTags.verb;
    }
}

class VerbPhrase extends ConstructionOfPhrase {
    constructor() {
        super([]);
        this.pos = POSTags.verb;
    }
}

export class PhrasalVerbWithEnclitic extends VerbPhrase {
    constructor(verb: VerbSurface, particle: ParticleSurface, enclitic: EncliticSurface) {
        super();
        verb.tag = Tagset.vb;
        this.elements.push(verb);
        particle.tag = Tagset.ppv;
        this.elements.push(particle);
        enclitic.tag = Tagset.auxn;
        this.elements.push(enclitic);
    }
}

export class VerbWithEnclitic extends VerbPhrase {
    constructor(verb: VerbSurface, enclitic: EncliticSurface) {
        super();
        verb.tag = Tagset.vb;
        this.elements.push(verb);
        enclitic.tag = Tagset.auxn;
        this.elements.push(enclitic);
    }
}

export class PhrasalVerbs {
    phrms: Array<PhrasalVerbPhraseme | PhrasalVerbTwoPhraseme> = new Array();
    phvbs: Array<OrthoPhraseme> = new Array();

    constructor() {
        this.populatePhrasemes();
    }

    private populatePhrasemes() {
        const pva = new TonalPhrasalInflector();

        dictOfPhrasalVerbs
            .map(it => pva.inflectToProceeding(it[0], it[1]))
            .map(it => {
                const ol = new OrthoPhraseme();
                ol.base = it.phrase.words[0].literal + ' ' + it.phrase.words[1].literal;
                ol.inflected.push(it.getForms()[0].words[0].literal + ' ' + it.getForms()[0].words[1].literal);
                this.phvbs.push(ol);
            });
        dictOfPhrasalVerbTwos
            .map(it => pva.inflectToProceeding(it[0], it[1], it[2]))
            .map(it => {
                const ol = new OrthoPhraseme();
                ol.base =
                    it.phrase.words[0].literal + ' ' + it.phrase.words[1].literal + ' ' + it.phrase.words[2].literal;
                ol.inflected.push(
                    it.getForms()[0].words[0].literal +
                        ' ' +
                        it.getForms()[0].words[1].literal +
                        ' ' +
                        it.getForms()[0].words[2].literal
                );
                this.phvbs.push(ol);
            });
    }

    match(sequence: string[]) {
        const v = new VisitorMatching();
        const arr = this.phvbs.filter(it => it.accept(v, sequence));
        if (arr.length > 0) return arr[0].base;
        return '';
    }
}

class PhrasalTransitive extends VerbPhrase {
    constructor(verb: VerbSurface, preposition: ParticleSurface, pronoun: PronounSurface) {
        super();
        verb.tag = Tagset.vb;
        this.elements.push(verb);
        preposition.tag = Tagset.padv;
        this.elements.push(preposition);
        pronoun.tag = Tagset.npr;
        this.elements.push(pronoun);
    }
}

class SmallClause extends VerbPhrase {
    constructor(verb1: VerbSurface, pronoun: PersonalPronounSurface, verb2: VerbSurface) {
        super();
        verb1.tag = Tagset.vb;
        this.elements.push(verb1);
        pronoun.tag = Tagset.npr;
        this.elements.push(pronoun);
        verb2.tag = Tagset.vb;
        this.elements.push(verb2);
    }
}

export class SetOfSmallClauses {
    constructions: Array<ConstructionOfPhrase> = [];

    constructor() {
        // obj. xcomp.
        const sc = new SmallClause(
            new VerbSurface('oannw'),
            new PersonalPronounSurface('goa'),
            new VerbSurface('churw')
        );
        this.constructions.push(sc);
    }
}

export class Rules {
    private phrases: Array<ConstructionOfPhrase[]> = new Array();
    private keyWords: KeyWords = new KeyWords();

    constructor() {
        this.populatePatterns();
        // this.populatePhrasalVerbs();
    }

    private lookupDictionary(str: string) {
        let phr;
        if (dictOfVerbs.includes(str)) {
            let vs: VerbSurface = new VerbSurface(str);
            if (vs.pos === POSTags.verb) vs.tag = Tagset.vb;
            phr = [new ConstructionOfPhrase([])];
            phr[0].elements.push(vs);
            phr[0].pos = POSTags.verb;
            return phr;
        }

        return undefined;
    }

    private lookupRules(sequence: string[]) {
        const pvbs = new PhrasalVerbs();
        if ((sequence.length == 2 && pvbs.match(sequence) != '') || pvbs.match([sequence[0], sequence[1]])) {
            return [new PhrasalVerb([new VerbSurface(sequence[0]), new ParticleSurface(sequence[1])])];
        }

        if (sequence.length == 3 && pvbs.match(sequence) != '') {
            return [
                new PhrasalVerb([
                    new VerbSurface(sequence[0]),
                    new ParticleSurface(sequence[1]),
                    new ParticleSurface(sequence[2])
                ])
            ];
        }

        if (sequence.length > 3 && pvbs.match([sequence[0], sequence[1], sequence[2]]) != '') {
            return [
                new PhrasalVerb([
                    new VerbSurface(sequence[0]),
                    new ParticleSurface(sequence[1]),
                    new ParticleSurface(sequence[2])
                ])
            ];
        }
        return [];
    }

    matchKeyWords(str: string) {
        return this.keyWords.getSurface(str);
    }

    seperateMatches(str: string) {
        const ptcls = dictOfSeperateVVCompounds[str];
        if (ptcls) {
            return ptcls[0];
        }
    }

    matches(sequence: string[]) {
        const phrD = this.lookupDictionary(sequence[0]);
        const phrR = this.lookupRules(sequence);
        if (phrR && phrR.length > 0) return phrR;
        else if (phrD) return phrD;
        return undefined;
    }

    private populatePatterns() {
        this.phrases.push([new SetOfSmallClauses().constructions[0]]);
    }
}
