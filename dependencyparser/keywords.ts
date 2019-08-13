import { InflexionLexeme, TonalInflexionLexeme, TonalInflexion } from './lexeme'
import { POS } from './symbols';
import { TonalInflectingMetaplasm, Word } from '../lexeme';
import { TonalCombiningMetaplasm } from '../morpheme';
import { TonalSyllable } from '../tonal/morpheme';
import { Allomorph, FreeAllomorph, declensionRules } from '../tonal/version2';
import { AlphabeticLetter } from '../grapheme';
import { TonalInflextionAnalyzer } from './analyzer';
import { TonalCombiningForms } from './morpheme';

export class ConstructionElement {
    lexeme: InflexionLexeme = new InflexionLexeme()
    partOfSpeech: string = ''
    protected inflection: Map<string, string[]> = new Map()
    selected: [string, string] = ['', '']

    check(w: Word) {
        if(this.lexeme.word.literal === w.literal) {
            return true
        }
        return false
    }

    protected validate(inflectTo: [string, string]) {
        if(this.inflection.has(inflectTo[0])) {
            let arr = this.inflection.get(inflectTo[0])
            if(arr)
                for(let e of arr) {
                    if(e === inflectTo[1])
                        return true
                }
        }
        return false
    }

    select(selection: [string, string]): ConstructionElement {
        if(selection && this.validate(selection)) {
            this.selected[0] = selection[0]
            this.selected[1] = selection[1]
        }
        return this
    }

    clone(): ConstructionElement {
        const clone = Object.create(this);
        return clone
    }
}

let NOUN_DECLENSION = {
    baseForm: {
        name: 'baseForm',
        basic: 'basic' ,
    },
    sandhiForm: {
        name: 'sandhiForm', 
        adjective: 'adjective',
    }
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
        this.partOfSpeech = POS.pronoun
    }
}

export class PersonalPronoun2To137 extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.pronoun
        if(declensionRules.keys && declensionRules.keys.length === 3) {
            this.inflection
                .set('baseForm', ['basic', 'directObject'])
                .set(declensionRules.keys[0], ['firstEnclitic', 'subjective', 'indirectObject'])
                .set(declensionRules.keys[1], ['adverbialForm', 'thirdEnclitic'])
                .set(declensionRules.keys[2], ['seventhEnclitic'])
        }
    }

    clone(): PersonalPronoun2To137 {
        const clone = Object.create(this);
        return clone
    }
}

export class PersonalPronoun1To37 extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.pronoun
        if(declensionRules.keys && declensionRules.keys.length === 2) {
            this.inflection
                .set('baseForm', ['basic', 'firstEnclitic', 'subjective', 'directObject', 'indirectObject'])
                .set(declensionRules.keys[0], ['adverbialForm', 'thirdEnclitic'])
                .set(declensionRules.keys[1], ['seventhEnclitic', 'subjective'])
        }
    }

    clone(): PersonalPronoun1To37 {
        const clone = Object.create(this);
        return clone
    }
}

class Postposition extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.postposition
    }
}

export class Verb extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.verb
        this.inflection
            .set('baseForm', ['intransitive', 'perfective'])
            .set('sandhiForm', ['transitive', 'ditransitive', 'causative', 'attributive', 'continuative'])
    }
}

export class Copula extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.verb
        this.inflection
            .set('baseForm', ['intransitive'])
            .set('sandhiForm', ['conpulative'])
    }
}

export class NumeralQuantifier extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.noun
        this.inflection
            .set('baseForm', ['basic'])
            .set('sandhiForm', ['attributive', 'continuative'])
            .set('adverbialForm', ['adverbial'])
    }
}

export class EncliticLe extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.particle
        this.inflection
            .set('baseForm', ['basic', 'imperative'])
            .set('sandhiForm', ['conjunctive'])
    }
}

export class EncliticE extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.particle
        this.inflection
            .set('baseForm', ['basic', 'participle', 'terminal'])
            .set('sandhiForm', ['attributive'])
    }
}

class EncliticA extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.particle
    }
}

class Demonstrative extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.pronoun
    }

    clone(): Demonstrative {
        const clone = Object.create(this);
        return clone
    }
}

export class Adjective extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.adjective
        this.inflection
            .set('baseForm', ['basic'])
            .set('sandhiForm', ['attributive', 'adverbial'])
    }
}

class PlainNoun extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.noun
    }
}

export class Noun extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.noun
        this.inflection
            .set(NOUN_DECLENSION.baseForm.name, [NOUN_DECLENSION.baseForm.basic])
            .set(NOUN_DECLENSION.sandhiForm.name, [NOUN_DECLENSION.sandhiForm.adjective])
    }

    clone(): Noun {
        const clone = Object.create(this);
        return clone
    }
}

export class Auxiliary extends ConstructionElement{
    constructor() {
        super()
        this.partOfSpeech = POS.auxiliary_verb
    }
}

export class Particle extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.particle
    }
}

class CaseMarker {}

export class KeyWords {
    private analyzer = new TonalInflextionAnalyzer()
    private keyword_serialno: Array<[string, number]> = new Array()
    private keyElems: Array<ConstructionElement> = new Array()

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
        this.keyword_serialno = Array.from(buffer).sort((a: [string, number], b: [string, number]) => {
            return (a[0]<b[0] ? -1 : (a[0]>b[0] ? 1 : 0));
        })
    }

    private makePersonalPronoun(str: string) {
        let ms = this.analyzer.doMorphologicalAnalysis(str, new FromTone2ToTone137())
        let ls = this.analyzer.doLexicalAnalysis(ms, new TonalInflexion())
        let ret = new PersonalPronoun2To137()
        ret.lexeme = ls[0]
        return ret
    }

    private makeDemonstrative(str: string): Demonstrative {
        let ms = this.analyzer.doMorphologicalAnalysis(str, new TonalZeroCombining())
        let ls = this.analyzer.doLexicalAnalysis(ms, new TonalInflexion())
        let ret = new Demonstrative()
        ret.lexeme = ls[0]
        return ret
    }

    private makeVerb(str: string): Verb {
        let ms = this.analyzer.doMorphologicalAnalysis(str, new TonalCombiningForms())
        let ls = this.analyzer.doLexicalAnalysis(ms, new TonalInflexion())
        let ret = new Verb()
        ret.lexeme = ls[0]
        return ret
    }

    private makeNoun(str: string): Noun {
        let ms = this.analyzer.doMorphologicalAnalysis(str, new TonalCombiningForms())
        let ls = this.analyzer.doLexicalAnalysis(ms, new TonalInflexion())
        let ret = new Noun()
        ret.lexeme = ls[0]
        return ret
    }

    private makeCopula(str: string): Copula {
        let ms = this.analyzer.doMorphologicalAnalysis(str, new TonalCombiningForms())
        let ls = this.analyzer.doLexicalAnalysis(ms, new TonalInflexion())
        let ret = new Copula()
        ret.lexeme = ls[0]
        return ret
    }

    private makeAuxiliary(str: string): Auxiliary {
        let ms = this.analyzer.doMorphologicalAnalysis(str, new TonalZeroCombining())
        let ls = this.analyzer.doLexicalAnalysis(ms, new TonalInflexion())
        let ret = new Auxiliary()
        ret.lexeme = ls[0]
        return ret
    }

    search(str: string) {
        let i: number
        i = this.doBSearch(this.keyword_serialno, str, (a: string, b: string) => {
            return (a<b ? -1 : (a>b ? 1 : 0));
        })
        let serialno: number = 0
        if(this.keyword_serialno[i])
            serialno = this.keyword_serialno[i][1]
        return serialno
    }

    private doBSearch(arr: Array<[string, number]>, str: string, compareFunc: (a: string, b: string) => number): number {
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
        //console.log(this.keyElems[serialno].lexeme.word.literal)
        return this.keyElems[serialno]
    }

    private populateKeyElems() {
        this.keyElems = [
            this.makeDemonstrative('che'),
            this.makeDemonstrative('he'),

            this.makePersonalPronoun(PersonalPronouns.FirstSingular),

            this.makeCopula('siz'),

            this.makeNoun('langx'),

            this.makeAuxiliary('qaz'),
            this.makeAuxiliary('qaw'),
            this.makeAuxiliary('qangx'),
            this.makeAuxiliary('qangz'),
            this.makeAuxiliary('hoz'),
            this.makeAuxiliary('how'),
            this.makeAuxiliary('hongx'),
            this.makeAuxiliary('hongz'),
            this.makeAuxiliary('homz'),
        ]
    }
}