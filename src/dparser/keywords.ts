import { InflexionLexeme, TonalInflexion } from './lexeme';
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
import { tonal_inflextion_analyzer } from './analyzer';
import { TonalCombiningForms } from './morpheme';

export class ConstructionElement {
    pos: string = '';
    tag: string = ''
    surface: string = ''
}

export class ConstructionElementInflectional extends ConstructionElement {
    lexeme: InflexionLexeme = new InflexionLexeme();

    matchFormFor(str: string): boolean {
        if (this.lexeme.word.literal === str) {
            this.surface = str
            return true;
        }
        if (this.lexeme.otherForms.length > 0) {
            for (let i = 0; i < this.lexeme.otherForms.length; i++) {
                if (this.lexeme.otherForms[i].literal === str) {
                    this.surface = str
                    return true;
                }
            }
        }
        return false;
    }

    clone(): ConstructionElementInflectional {
        const clone = Object.create(this);
        return clone;
    }
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

export enum PersonalPronouns {
    FirstSingular = 'goay',
    SecondSingularLiy = 'liy',
    SecondSingularLuy = 'luy',
    SecondSingularLiry = 'liry',
    FirstPluralExclusiveGuny = 'guny',
    FirstPluralExclusiveGoany = 'goany',
    FirstPluralInclusive = 'lany',
    SecondPlural = 'liny',

    ThirdSingular = 'i',
    ThirdPlural = 'in',
}

export class PersonalPronoun extends ConstructionElementInflectional {
    constructor() {
        super();
        this.pos = POSTags.pronoun;
    }
}

export class PersonalPronoun2To137 extends ConstructionElementInflectional {
    constructor() {
        super();
        this.pos = POSTags.pronoun;
    }

    clone(): PersonalPronoun2To137 {
        const clone = Object.create(this);
        return clone;
    }
}

export class PersonalPronoun1To37 extends ConstructionElementInflectional {
    constructor() {
        super();
        this.pos = POSTags.pronoun;
    }

    clone(): PersonalPronoun1To37 {
        const clone = Object.create(this);
        return clone;
    }
}

class Postposition extends ConstructionElementInflectional {
    constructor() {
        super();
        this.pos = POSTags.adposition;
    }
}

export class Verb extends ConstructionElementInflectional {
    constructor() {
        super();
        this.pos = POSTags.verb;
    }
}

export class VerbSurface extends ConstructionElement {
    constructor(str?: string) {
        super()
        if(str) this.surface = str;
        this.pos = POSTags.verb;
    }
}

export class Copula extends ConstructionElementInflectional {
    constructor() {
        super();
        this.pos = POSTags.verb;
    }

    clone(): Copula {
        const clone = Object.create(this);
        return clone;
    }
}

export class NumeralQuantifier extends ConstructionElementInflectional {
    constructor() {
        super();
        this.pos = POSTags.noun;
    }
}

export class EncliticSurface extends ConstructionElement {
    constructor(str?: string) {
        super()
        if(str) this.surface = str;
        this.pos = POSTags.auxiliary;
    }
}

export class Demonstrative extends ConstructionElementInflectional {
    constructor() {
        super();
        this.pos = POSTags.pronoun;
    }

    clone(): Demonstrative {
        const clone = Object.create(this);
        return clone;
    }
}

export class Adjective extends ConstructionElementInflectional {
    constructor() {
        super();
        this.pos = POSTags.adjective;
    }
}

class NounSurface extends ConstructionElement {
    constructor() {
        super();
        this.pos = POSTags.noun;
    }
}

export class Noun extends ConstructionElementInflectional {
    constructor() {
        super();
        this.pos = POSTags.noun;
    }

    clone(): Noun {
        const clone = Object.create(this);
        return clone;
    }
}

export class Auxiliary extends ConstructionElementInflectional {
    constructor() {
        super();
        this.pos = POSTags.auxiliary;
    }
}

export class Particle extends ConstructionElementInflectional {
    constructor() {
        super();
        this.pos = POSTags.particle;
    }
}

export class ParticleSurface extends ConstructionElement {
    constructor(str: string) {
        super();
        this.pos = POSTags.particle;
        if(str) this.surface = str;
    }
}

class CaseMarker {}

export type PartsOfSpeech = Copula | Demonstrative | Noun | Verb

export class KeyWords {
    private keyword_index: { [surface: string] : number } = {};
    private keyElems: Array<ConstructionElement> = new Array();

    constructor() {
        this.populateKeyElems();
        let i: number = 0;
        for (let entry of this.keyElems) {
            if(entry instanceof ConstructionElementInflectional) {
                if(this.keyword_index[entry.lexeme.word.literal] != undefined) console.info('duplicates found')
                this.keyword_index[entry.lexeme.word.literal] = i;
                if (entry.lexeme.otherForms.length) {
                    for (let elem of entry.lexeme.otherForms) {
                        if(this.keyword_index[elem.literal] != undefined) console.info('duplicates found')
                        this.keyword_index[elem.literal] = i;
                    }
                }
            }
            i++;
        }
    }

    private makePersonalPronoun(str: string) {
        let ms = tonal_inflextion_analyzer.doMorphologicalAnalysis(str, new FromTone2ToTone137());
        let ls = tonal_inflextion_analyzer.doLexicalAnalysis(ms, new TonalInflexion());
        let ret = new PersonalPronoun2To137();
        ret.lexeme = ls[0];
        return ret;
    }

    private makeDemonstrative(str: string): Demonstrative {
        let ms = tonal_inflextion_analyzer.doMorphologicalAnalysis(str, new TonalZeroCombining());
        let ls = tonal_inflextion_analyzer.doLexicalAnalysis(ms, new TonalInflexion());
        let ret = new Demonstrative();
        ret.lexeme = ls[0];
        return ret;
    }

    private makeVerb(str: string): Verb {
        let ms = tonal_inflextion_analyzer.doMorphologicalAnalysis(str, new TonalCombiningForms());
        let ls = tonal_inflextion_analyzer.doLexicalAnalysis(ms, new TonalInflexion());
        let ret = new Verb();
        ret.lexeme = ls[0];
        return ret;
    }

    private makeNoun(str: string): Noun {
        let ms = tonal_inflextion_analyzer.doMorphologicalAnalysis(str, new TonalCombiningForms());
        let ls = tonal_inflextion_analyzer.doLexicalAnalysis(ms, new TonalInflexion());
        let ret = new Noun();
        ret.lexeme = ls[0];
        return ret;
    }

    private makeCopula(str: string): Copula {
        let ms = tonal_inflextion_analyzer.doMorphologicalAnalysis(str, new TonalCombiningForms());
        let ls = tonal_inflextion_analyzer.doLexicalAnalysis(ms, new TonalInflexion());
        let ret = new Copula();
        ret.lexeme = ls[0];
        return ret;
    }

    private makeAuxiliary(str: string): Auxiliary {
        let ms = tonal_inflextion_analyzer.doMorphologicalAnalysis(str, new TonalZeroCombining());
        let ls = tonal_inflextion_analyzer.doLexicalAnalysis(ms, new TonalInflexion());
        let ret = new Auxiliary();
        ret.lexeme = ls[0];
        return ret;
    }

    private makeParticle(str: string): Particle {
        let ms = tonal_inflextion_analyzer.doMorphologicalAnalysis(str, new TonalZeroCombining());
        let ls = tonal_inflextion_analyzer.doLexicalAnalysis(ms, new TonalInflexion());
        let ret = new Particle();
        ret.lexeme = ls[0];
        return ret;
    }

    private makeEncliticSurface(str: string): EncliticSurface {
        //let ms = tonal_inflextion_analyzer.doMorphologicalAnalysis(str, new TonalZeroCombining());
        //let ls = tonal_inflextion_analyzer.doLexicalAnalysis(ms, new TonalInflexion());
        let ret = new EncliticSurface();
        //ret.lexeme = ls[0];
        return ret;
    }

    private search(str: string) {
        const serialno_i = this.keyword_index[str]
        if(serialno_i >= 0) {
            // including index of value 0
            return serialno_i
        } else {
            // undefined
            return -1
        }
    }

    get(str: string) {
        let serialno = this.search(str);
        if (serialno === -1) return undefined;
        const e = this.keyElems[serialno];
        if(e instanceof ConstructionElementInflectional) e.matchFormFor(str);
        return e;
    }

    private populateKeyElems() {
        this.keyElems = [
            this.makeDemonstrative('che'),
            this.makeDemonstrative('he'),

            this.makePersonalPronoun(PersonalPronouns.FirstSingular),

            this.makeCopula('siz'),

            this.makeNoun('langx'),

            this.makeVerb('kiw'),

            this.makeAuxiliary('qaz'),
            this.makeAuxiliary('qaw'),
            this.makeAuxiliary('qangx'),
            this.makeAuxiliary('qangz'),
            this.makeAuxiliary('hoz'),
            this.makeAuxiliary('how'),
            this.makeAuxiliary('hongx'),
            this.makeAuxiliary('hongz'),
            this.makeAuxiliary('homz'),

            this.makeParticle('kih'),
            this.makeParticle('leh'),
            this.makeParticle('chit'),
            this.makeParticle('cheh'),
            this.makeParticle('diurh'),

            this.makeParticle('qahf'),
            this.makeParticle('siongw'),
        ];
    }
}
