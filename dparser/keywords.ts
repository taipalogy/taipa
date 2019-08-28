import { InflexionLexeme, TonalInflexion } from './lexeme'
import { POSTags, PERSONAL_PRONOUN2TO137_DECLENSION, COPULA_CONJUGATION, NOUN_DECLENSION } from './symbols';
import { TonalInflectingMetaplasm, Word } from '../lexeme';
import { TonalCombiningMetaplasm } from '../morpheme';
import { TonalSyllable } from '../tonal/morpheme';
import { Allomorph, FreeAllomorph, declensionRules } from '../tonal/version2';
import { AlphabeticLetter } from '../grapheme';
import { tonalInflextionAnalyzer } from './analyzer';
import { TonalCombiningForms } from './morpheme';

export class ConstructionElement {
    lexeme: InflexionLexeme = new InflexionLexeme()
    partOfSpeech: string = ''
    protected selected: [string, string] = ['', '']

    match(str: string) {
        if(this.lexeme.word.literal === str) {
            return true
        }
        if(this.lexeme.otherForms.length > 0) {
            for(let i=0; i<this.lexeme.otherForms.length; i++) {
                if(this.lexeme.otherForms[i].literal === str) {
                    return true
                }
            }
        }
        return false
    }

    clone(): ConstructionElement {
        const clone = Object.create(this);
        return clone
    }

    protected setForm(str: string) { this.selected[0] = str; return this }
    
    setTag(str: string) { this.selected[1] = str; return this }

    get form() { return this.selected[0] }

    get tag() { return this.selected[1] }

    get wordForm(): string { return '' }
}

export class TonalAdverbInflexion extends TonalInflectingMetaplasm {}
export class TonalZeroInflexion extends TonalInflectingMetaplasm {
    // examples: author and authoring. che qahf he. type and typing. meet and meeting.
}

export class TonalZeroCombining extends TonalCombiningMetaplasm {}
export class FromTone2ToTone137 extends TonalCombiningMetaplasm {
    apply(syllable: TonalSyllable, allomorph: Allomorph): Array<TonalSyllable>  {
        if(allomorph) {
            let rets = []
            if(allomorph instanceof FreeAllomorph) {
                // get tone1, tone3, tone7 from tone2
                let ds = declensionRules.get(allomorph.tonal.getLiteral())
                let rets = []
                for(let k in ds) {
                    let s: TonalSyllable = new TonalSyllable(syllable.letters);
                    s.popLetter()
                    if(ds[k].getLiteral()) {
                        s.pushLetter(new AlphabeticLetter(ds[k].characters))
                        rets.push(new TonalSyllable(s.letters))
                    } else {
                        rets.push(new TonalSyllable(s.letters))
                    }
                }
                return rets
            }
        }
        return []
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

export class PersonalPronoun extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POSTags.pronoun
    }
}

export class PersonalPronoun2To137 extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POSTags.pronoun
    }

    clone(): PersonalPronoun2To137 {
        const clone = Object.create(this);
        return clone
    }

    match(str: string): boolean {
        if(this.lexeme.word.literal === str) {
            this.setForm(PERSONAL_PRONOUN2TO137_DECLENSION.baseForm)
            return true
        }
        if(this.lexeme.otherForms.length > 0) {
            for(let i=0; i<this.lexeme.otherForms.length; i++) {
                if(this.lexeme.otherForms[i].literal === str) {
                    this.setForm(Object.keys(PERSONAL_PRONOUN2TO137_DECLENSION.sandhiForm)[i])
                    return true
                }
            }
        }
        return false
    }

    get wordForm(): string {
        if(this.selected[0] === PERSONAL_PRONOUN2TO137_DECLENSION.baseForm) return this.lexeme.word.literal
        if(this.selected[0] === PERSONAL_PRONOUN2TO137_DECLENSION.sandhiForm.first) return this.lexeme.otherForms[0].literal
        if(this.selected[0] === PERSONAL_PRONOUN2TO137_DECLENSION.sandhiForm.third) return this.lexeme.otherForms[1].literal
        if(this.selected[0] === PERSONAL_PRONOUN2TO137_DECLENSION.sandhiForm.seventh) return this.lexeme.otherForms[2].literal
        return ''
    }
}

export class PersonalPronoun1To37 extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POSTags.pronoun
    }

    clone(): PersonalPronoun1To37 {
        const clone = Object.create(this);
        return clone
    }
}

class Postposition extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POSTags.adposition
    }
}

export class Verb extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POSTags.verb
    }
}

export class Copula extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POSTags.verb
    }

    clone(): Copula {
        const clone = Object.create(this);
        return clone
    }

    match(str: string): boolean {
        if(this.lexeme.word.literal === str) {
            this.setForm(COPULA_CONJUGATION.baseForm.name)
            this.setTag(COPULA_CONJUGATION.baseForm.intransitive)
            return true
        }

        if(this.lexeme.otherForms.length === 1 && this.lexeme.otherForms[0].literal === str) {
            this.setForm(COPULA_CONJUGATION.sandhiForm.name)
            this.setTag(COPULA_CONJUGATION.sandhiForm.copulative)
            return true
        }

        return false
    }
}

export class NumeralQuantifier extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POSTags.noun
    }
}

export class EncliticLe extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POSTags.particle
    }
}

export class EncliticE extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POSTags.particle
    }
}

class EncliticA extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POSTags.particle
    }
}

export class Demonstrative extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POSTags.pronoun
    }

    clone(): Demonstrative {
        const clone = Object.create(this);
        return clone
    }
}

export class Adjective extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POSTags.adjective
    }
}

class PlainNoun extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POSTags.noun
    }
}

export class Noun extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POSTags.noun
    }

    clone(): Noun {
        const clone = Object.create(this);
        return clone
    }

    match(str: string): boolean {
        if(this.lexeme.word.literal === str) {
            this.setForm(NOUN_DECLENSION.baseForm.name)
            this.setTag(NOUN_DECLENSION.baseForm.nominal)
            return true
        }

        if(this.lexeme.otherForms.length === 1 && this.lexeme.otherForms[0].literal === str) {
            this.setForm(NOUN_DECLENSION.sandhiForm.name)
            this.setTag(NOUN_DECLENSION.sandhiForm.adjective)
            return true
        }

        return false
    }

}

export class Auxiliary extends ConstructionElement{
    constructor() {
        super()
        this.partOfSpeech = POSTags.auxiliary
    }
}

export class Particle extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POSTags.particle
    }
}

export class PlainParticle extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POSTags.particle
    }
}

class CaseMarker {}

export type PartsOfSpeech = Copula | Demonstrative | Noun

export class KeyWords {
    private keyword_serialno: Array<[string, number]> = new Array()
    private keyElems: Array<PartsOfSpeech> = new Array()

    constructor() {
        this.populateKeyElems()
        let i: number = 0
        let buffer: Array<[string, number]> = new Array()
        for(let entry of this.keyElems) {
            buffer.push([entry.lexeme.word.literal, i])
            if(entry.lexeme.otherForms.length) {
                for(let elem of entry.lexeme.otherForms)
                buffer.push([elem.literal, i])
            }
            i++
        }
        this.keyword_serialno = Array.from(buffer).sort((lhs: [string, number], rhs: [string, number]) => {
            return (lhs[0]<rhs[0] ? -1 : (lhs[0]>rhs[0] ? 1 : 0));
        })
    }

    private makePersonalPronoun(str: string) {
        let ms = tonalInflextionAnalyzer.doMorphologicalAnalysis(str, new FromTone2ToTone137())
        let ls = tonalInflextionAnalyzer.doLexicalAnalysis(ms, new TonalInflexion())
        let ret = new PersonalPronoun2To137()
        ret.lexeme = ls[0]
        return ret
    }

    private makeDemonstrative(str: string): Demonstrative {
        let ms = tonalInflextionAnalyzer.doMorphologicalAnalysis(str, new TonalZeroCombining())
        let ls = tonalInflextionAnalyzer.doLexicalAnalysis(ms, new TonalInflexion())
        let ret = new Demonstrative()
        ret.lexeme = ls[0]
        return ret
    }

    private makeVerb(str: string): Verb {
        let ms = tonalInflextionAnalyzer.doMorphologicalAnalysis(str, new TonalCombiningForms())
        let ls = tonalInflextionAnalyzer.doLexicalAnalysis(ms, new TonalInflexion())
        let ret = new Verb()
        ret.lexeme = ls[0]
        return ret
    }

    private makeNoun(str: string): Noun {
        let ms = tonalInflextionAnalyzer.doMorphologicalAnalysis(str, new TonalCombiningForms())
        let ls = tonalInflextionAnalyzer.doLexicalAnalysis(ms, new TonalInflexion())
        let ret = new Noun()
        ret.lexeme = ls[0]
        return ret
    }

    private makeCopula(str: string): Copula {
        let ms = tonalInflextionAnalyzer.doMorphologicalAnalysis(str, new TonalCombiningForms())
        let ls = tonalInflextionAnalyzer.doLexicalAnalysis(ms, new TonalInflexion())
        let ret = new Copula()
        ret.lexeme = ls[0]
        return ret
    }

    private makeAuxiliary(str: string): Auxiliary {
        let ms = tonalInflextionAnalyzer.doMorphologicalAnalysis(str, new TonalZeroCombining())
        let ls = tonalInflextionAnalyzer.doLexicalAnalysis(ms, new TonalInflexion())
        let ret = new Auxiliary()
        ret.lexeme = ls[0]
        return ret
    }

    private makeParticle(str: string): Particle {
        let ms = tonalInflextionAnalyzer.doMorphologicalAnalysis(str, new TonalZeroCombining())
        let ls = tonalInflextionAnalyzer.doLexicalAnalysis(ms, new TonalInflexion())
        let ret = new Particle()
        ret.lexeme = ls[0]
        return ret
    }

    private search(str: string) {
        let i: number
        i = this.doBinarySearch(this.keyword_serialno, str, (lhs: string, rhs: string) => {
            return (lhs<rhs ? -1 : (lhs>rhs ? 1 : 0));
        })
        let serialno: number = -1
        if(this.keyword_serialno[i])
            serialno = this.keyword_serialno[i][1]
        return serialno
    }

    private doBinarySearch(arr: Array<[string, number]>, str: string, compareFunc: (a: string, b: string) => number): number {
        let bot = 0;
        let top = arr.length;
        while(bot < top) {
            let mid = Math.floor((bot+top)/2)
            let c = compareFunc(arr[mid][0], str)
            if (c === 0) return mid
            if (c < 0) bot = mid+1
            if (0 < c) top = mid
        }
        return -1
    }

    get(str: string) {
        let serialno = this.search(str)
        if(serialno === -1) return undefined
        const e = this.keyElems[serialno]
        e.match(str)
        return e
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
            this.makeParticle('jip'),
            this.makeParticle('chit'),
            this.makeParticle('cheh'),
            this.makeParticle('diurh'),

            this.makeParticle('qahf'),
            this.makeParticle('siongw'),
        ]
    }
}