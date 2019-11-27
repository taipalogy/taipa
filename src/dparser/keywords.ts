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
                let ds = declensionRules.get(allomorph.tonal.getLiteral());
                let rets = [];
                for (let k in ds) {
                    let s: TonalSyllable = new TonalSyllable(syllable.letters);
                    s.popLetter();
                    if (ds[k].getLiteral()) {
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
        if (str) this.surface = str;
        this.pos = POSTags.auxiliary;
    }
}

export class PronounSurface extends ConstructionElement {
    constructor(str: string) {
        super();
        this.surface = str;
        this.pos = POSTags.pronoun;
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
        if (str) this.surface = str;
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
        if (str) this.surface = str;
    }
}

export class KeyWords {
    private keyword_index: { [surface: string]: number } = {};
    private keyElems: Array<ConstructionElement> = new Array();

    constructor() {
        this.populateKeyElems();
    }

    private makePersonalPronounSurface(str: string) {
        return new PersonalPronounSurface(str);
    }

    private makePronounSurface(str: string): PronounSurface {
        return new PronounSurface(str);
    }

    private makeParticleSurface(str: string): ParticleSurface {
        return new ParticleSurface(str);
    }
/*
    private makeEncliticSurface(str: string): EncliticSurface {
        return new EncliticSurface(str);
    }
*/
    private makeAuxiliarySurface(str: string): ParticleSurface {
        return new AuxiliarySurface(str);
    }

    getSurface(str: string) {
        for (let i in this.keyElems) if (this.keyElems[i].surface === str) return this.keyElems[i];
    }

    private populateKeyElems() {
        this.keyElems = [
            this.makePronounSurface('che'),
            this.makePersonalPronounSurface('goa'),
            this.makeAuxiliarySurface('qaz'),
            this.makeParticleSurface('long'),
            this.makeParticleSurface('bew'),
        ];
    }
}
