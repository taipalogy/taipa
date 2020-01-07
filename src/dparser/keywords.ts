import { POSTags, PronType } from './symbols';
import { TonalInflectingMetaplasm } from '../lexeme';
import { TonalCombiningMetaplasm } from '../morpheme';
import { TonalSyllable } from '../tonal/morpheme';
import {
    Allomorph,
    FreeAllomorph,
    declensionRules,
    AllomorphH,
    TonalLetterTags,
    lowerLettersOfTonal,
} from '../tonal/version2';
import { AlphabeticLetter } from '../grapheme';

export class ConstructionElement {
    surface: string = '';
    pos: string = '';
    tag: string = '';
}

export class TonalAdverbInflexion extends TonalInflectingMetaplasm {}
export class TonalZeroInflexion extends TonalInflectingMetaplasm {
    // examples: author and authoring. che qahf he. type and typing. meet and meeting.
}

export class TonalZeroCombining extends TonalCombiningMetaplasm {
    apply(syllable: TonalSyllable, allomorph: Allomorph): Array<TonalSyllable> {
        return [];
    }
}

export class FromTone2ToTone137 extends TonalCombiningMetaplasm {
    apply(syllable: TonalSyllable, allomorph: Allomorph): Array<TonalSyllable> {
        if (allomorph) {
            //let rets = []
            if (allomorph instanceof FreeAllomorph) {
                // get tone1, tone3, tone7 from tone2
                let ds = declensionRules.get(allomorph.tonal.toString());
                let rets = [];
                for (let k in ds) {
                    let s: TonalSyllable = new TonalSyllable(syllable.letters);
                    s.popLetter();
                    if (ds[k].toString()) {
                        s.pushLetter(new AlphabeticLetter(ds[k].characters));
                        rets.push(new TonalSyllable(s.letters));
                    } else {
                        rets.push(new TonalSyllable(s.letters));
                    }
                }
                return rets;
            }
        }
        return [];
    }
}

export class PhrasalVerbParticleDiurh extends TonalCombiningMetaplasm {
    apply(syllable: TonalSyllable, allomorph: Allomorph): Array<TonalSyllable> {
        if (allomorph) {
            if (allomorph instanceof AllomorphH) {
                let rets = [];
                let s: TonalSyllable = new TonalSyllable(syllable.letters);
                s.popLetter();
                s.pushLetter(lowerLettersOfTonal.get(TonalLetterTags.hh));
                s.pushLetter(lowerLettersOfTonal.get(TonalLetterTags.w));
                rets.push(new TonalSyllable(s.letters));
                return rets;
            }
        }
        return [];
    }
}

export class PersonalPronounSurface extends ConstructionElement {
    constructor(str: string) {
        super();
        this.surface = str;
        this.pos = POSTags.pronoun;
    }
}

export class VerbSurface extends ConstructionElement {
    constructor(str: string) {
        super();
        this.surface = str;
        this.pos = POSTags.verb;
    }
}

export class EncliticSurface extends ConstructionElement {
    constructor(str: string) {
        super();
        this.pos = POSTags.auxiliary;
        this.surface = str;
    }
}

export class PronounSurface extends ConstructionElement {
    constructor(str: string) {
        super();
        this.pos = POSTags.pronoun;
        this.surface = str;
    }
}

class NounSurface extends ConstructionElement {
    constructor() {
        super();
        this.pos = POSTags.noun;
    }
}

export class ParticleSurface extends ConstructionElement {
    constructor(str: string) {
        super();
        this.pos = POSTags.particle;
        this.surface = str;
    }
}

export class PrepositionSurface extends ConstructionElement {
    constructor(str: string) {
        super();
        this.pos = POSTags.adposition;
        this.surface = str;
    }
}

class CaseMarker {}

export class AuxiliarySurface extends ConstructionElement {
    constructor(str: string) {
        super();
        this.pos = POSTags.auxiliary;
        this.surface = str;
    }
}

type Class = { new (...args: any[]): any };

const objectFactory = function(name: Class, str: string) {
    const set = new Set<Class>()
        .add(PronounSurface)
        .add(ParticleSurface)
        .add(AuxiliarySurface)
        .add(PersonalPronounSurface);

    const createInstance = function<T extends ConstructionElement>(c: new (str: string) => T, str: string): T {
        return new c(str);
    };

    if (set.has(name)) {
        return createInstance(name, str);
    }
};

export class KeyWords {
    private keyElems: Array<ConstructionElement> = new Array();

    constructor() {
        this.populateKeyElems();
    }

    getSurface(str: string) {
        for (let i in this.keyElems) if (this.keyElems[i].surface === str) return this.keyElems[i];
    }

    private populateKeyElems() {
        this.keyElems = [
            objectFactory(PronounSurface, 'che'),
            objectFactory(PersonalPronounSurface, 'goa'),
            objectFactory(AuxiliarySurface, 'qaz'),
            objectFactory(ParticleSurface, 'long'),
            objectFactory(ParticleSurface, 'bew'),
        ];
    }
}
