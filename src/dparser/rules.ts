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
    phvs: Array<PhrasalVerb> = new Array();
    phvbs: Array<OrthoPhraseme> = new Array();

    constructor() {
        this.populatePhrasemes();
        this.populatePhrasalVerbs();
    }

    private populatePhrasalVerbs() {
        for (let i in this.phrms) {
            if (this.phrms[i] instanceof PhrasalVerbPhraseme) {
                this.phvs.push(
                    new PhrasalVerb([
                        new VerbSurface(this.phrms[i].phrase.words[0].literal),
                        new ParticleSurface(this.phrms[i].phrase.words[1].literal)
                    ])
                );
                this.phvs.push(
                    new PhrasalVerb([
                        new VerbSurface(this.phrms[i].getForms()[0].words[0].literal),
                        new ParticleSurface(this.phrms[i].getForms()[0].words[1].literal)
                    ])
                );
                const ol = new OrthoPhraseme();
                ol.base = this.phrms[i].phrase.words[0].literal + ' ' + this.phrms[i].phrase.words[1].literal;
                ol.inflected.push(
                    this.phrms[i].getForms()[0].words[0].literal + ' ' + this.phrms[i].getForms()[0].words[1].literal
                );
                this.phvbs.push(ol);
            } else if (this.phrms[i] instanceof PhrasalVerbTwoPhraseme) {
                this.phvs.push(
                    new PhrasalVerb([
                        new VerbSurface(this.phrms[i].phrase.words[0].literal),
                        new ParticleSurface(this.phrms[i].phrase.words[1].literal),
                        new ParticleSurface(this.phrms[i].phrase.words[2].literal)
                    ])
                );
                this.phvs.push(
                    new PhrasalVerb([
                        new VerbSurface(this.phrms[i].getForms()[0].words[0].literal),
                        new ParticleSurface(this.phrms[i].getForms()[0].words[1].literal),
                        new ParticleSurface(this.phrms[i].getForms()[0].words[2].literal)
                    ])
                );
                const ol = new OrthoPhraseme();
                ol.base =
                    this.phrms[i].phrase.words[0].literal +
                    ' ' +
                    this.phrms[i].phrase.words[1].literal +
                    ' ' +
                    this.phrms[i].phrase.words[2].literal;
                ol.inflected.push(
                    this.phrms[i].getForms()[0].words[0].literal +
                        ' ' +
                        this.phrms[i].getForms()[0].words[1].literal +
                        ' ' +
                        this.phrms[i].getForms()[0].words[2].literal
                );
                this.phvbs.push(ol);
            }
        }
    }

    private populatePhrasemes() {
        const pva = new TonalPhrasalInflector();
        for (let i in dictOfPhrasalVerbs) {
            this.phrms.push(pva.inflectToProceeding(dictOfPhrasalVerbs[i][0], dictOfPhrasalVerbs[i][1]));
        }
        for (let i in dictOfPhrasalVerbTwos) {
            this.phrms.push(
                pva.inflectToProceeding(
                    dictOfPhrasalVerbTwos[i][0],
                    dictOfPhrasalVerbTwos[i][1],
                    dictOfPhrasalVerbTwos[i][2]
                )
            );
        }
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
        this.populatePhrasalVerbs();
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
        /*
        const pvbs = new PhrasalVerbs();
        if (sequence.length == 2 && pvbs.match(sequence) != '') {
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
        console.log(sequence);
        return [];
*/

        let elems: Array<ConstructionElement> = [];
        for (let pat of this.phrases) {
            for (let j = 0; j < pat.length; j++) {
                // console.log(pat[j].elements);
                for (let e of pat[j].elements) {
                    elems.push(e);
                }
            }

            for (let i = 0; i < elems.length; i++) {
                if (i === 1 && i + 1 === elems.length) {
                    // phrasal verbs of length 2
                    if (elems[0].surface === sequence[0] && elems[1].surface === sequence[1]) {
                        return pat;
                    }
                } else if (i === 2 && i + 1 === elems.length) {
                    // phrasal verbs of length 3
                    if (
                        elems[0].surface === sequence[0] &&
                        elems[1].surface === sequence[1] &&
                        elems[2].surface === sequence[2]
                    ) {
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
        const ptcls = dictOfSeperateVVCompounds[str];
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
        // to be deleted
        const s = new PhrasalVerbs();

        for (let i = 0; i < s.phvs.length; i++) {
            this.phrases.push([s.phvs[i]]);
        }
    }

    private populatePatterns() {
        this.phrases.push([new SetOfSmallClauses().constructions[0]]);
    }
}
