import { POSTags } from './symbols';
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
    pos: string = '';
    tag: string = '';
    surface: string = '';
}

export class TonalAdverbInflexion extends TonalInflectingMetaplasm {}
export class TonalZeroInflexion extends TonalInflectingMetaplasm {
    // examples: author and authoring. che qahf he. type and typing. meet and meeting.
}

export class TonalZeroCombining extends TonalCombiningMetaplasm {}
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

class PersonalPronounSurface extends ConstructionElement {
    constructor(str?: string) {
        super();
        if (str) this.surface = str;
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
    constructor(str?: string) {
        super();
        if (str) this.surface = str;
        this.pos = POSTags.auxiliary;
    }
}

export class DemonstrativeSurface extends ConstructionElement {
    constructor(str?: string) {
        super();
        if (str) this.surface = str;
        this.pos = POSTags.determiner;
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

class CaseMarker {}

export class Auxiliary extends ConstructionElement {
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
        let ret = new PersonalPronounSurface(str);
        return ret;
    }

    private makeDemonstrativeSurface(str: string): DemonstrativeSurface {
        let ret = new DemonstrativeSurface(str);
        return ret;
    }

    private makeParticleSurface(str: string): ParticleSurface {
        let ret = new ParticleSurface(str);
        return ret;
    }

    private makeEncliticSurface(str: string): EncliticSurface {
        let ret = new EncliticSurface();
        return ret;
    }

    private makeAuxiliary(str: string): ParticleSurface {
        return new Auxiliary(str);
    }

    getSurface(str: string) {
        for(let i in this.keyElems) if(this.keyElems[i].surface === str) return this.keyElems[i];
    }

    private populateKeyElems() {
        this.keyElems = [
            this.makeDemonstrativeSurface('che'),
            this.makePersonalPronounSurface('goa'),
            this.makeAuxiliary('qaz'),
            this.makeParticleSurface('long')
        ];
    }
}
