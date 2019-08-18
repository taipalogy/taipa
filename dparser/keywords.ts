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
    protected inflection: Map<string, string[]> = new Map() // TODO: to be deleted
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

    clone(): ConstructionElement {
        const clone = Object.create(this);
        return clone
    }

    protected setForm(str: string) { this.selected[0] = str; return this }
    
    setFunc(str: string) { this.selected[1] = str; return this }
}

let PERSONAL_PRONOUN2TO137_DECLENSION = {
    baseForm: {
        name: 'baseForm',
        directObject: 'directObject',
    },
    sandhiForm: {
        zero: {
            firstEnclitic: 'firstEnclitic',
            subjective: 'subjective',
            indirectObject: 'indirectObject',
        },
        w: {
            adverbial: 'adverbial',
            thirdEnclitic: 'thirdEnclitic',
        },
        z: {
            seventhEnclitic: 'seventhEnclitic',
        },
    }
}

let PERSONAL_PRONOUN1TO37_DECLENSION = {
    baseForm: {
        name: 'baseForm',
        firstEnclitic: 'firstEnclitic',
        subjective: 'subjective',
        directObject: 'directObject',
        indirectObject: 'indirectObject',
    },
    sandhiForm: {
        w: {
            adverbial: 'adverbial',
            thirdEnclitic: 'thirdEnclitic',
        },
        z: {
            subjective: 'subjective',
            seventhEnclitic: 'seventhEnclitic',
        }
    }
}

let VERB_CONJUGATION = {
    baseForm: {
        name: 'baseForm',
        intransitive: 'intransitive',
        perfective: 'perfective',
    },
    sandhiForm: {
        name: 'sandhiForm',
        transitive: 'transitive',
        ditransitive: 'ditransitive',
        causative: 'causative',
        attributive: 'attributive',
        continuative: 'continuative',
    }
}

let NUMERAL_QUANTIFIER = {
    baseForm: {
        name: 'baseForm',
        nominal: 'nominal',
    },
    sandhiForm: {
        name: 'sandhiForm',
        attributive: 'attributive',
        continuative: 'continuative',
    },
    adverbialForm: {
        name: 'adverbialForm',
        adverbial: 'adverbial',
    }
}

let ADJECTIVE_INFLECTION = {
    baseForm: {
        name: 'baseForm',
        adjective: 'adjective',
    },
    sandhiForm: {
        name: 'sandhiForm',
        attributive: 'attributive',
        adverbial: 'adverbial',
    }
}

let COPULA_CONJUGATION = {
    baseForm: {
        name: 'baseForm',
        intransitive: 'intransitive'
    },
    sandhiForm: {
        name: 'sandhiFor',
        copulative: 'copulative'
    },
}

let NOUN_DECLENSION = {
    baseForm: {
        name: 'baseForm',
        nominal: 'nominal' ,
    },
    sandhiForm: {
        name: 'sandhiForm', 
        adjective: 'adjective',
    }
}

let ENCLITIC_E_INFLECTION = {
    baseForm: {
        name: 'baseForm',
        participle: 'participle',
        attributive: 'attributive',
    }
}

let ENCLITIC_LE_INFLECTION = {
    baseForm: {
        name: 'baseForm',
        imperative: 'imperative',
        conjunctive: 'conjunctive',
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
    }

    clone(): PersonalPronoun2To137 {
        const clone = Object.create(this);
        return clone
    }

    match(str: string): boolean {
        if(this.lexeme.word.literal === str) {
            this.setForm(PERSONAL_PRONOUN2TO137_DECLENSION.baseForm.name)
            this.setFunc(PERSONAL_PRONOUN2TO137_DECLENSION.baseForm.directObject)
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
}

export class PersonalPronoun1To37 extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.pronoun
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
    }
}

export class Copula extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.verb
    }

    clone(): Copula {
        const clone = Object.create(this);
        return clone
    }

    match(str: string): boolean {
        if(this.lexeme.word.literal === str) {
            this.setForm(COPULA_CONJUGATION.baseForm.name)
            this.setFunc(COPULA_CONJUGATION.baseForm.intransitive)
            return true
        }

        if(this.lexeme.otherForms.length === 1 && this.lexeme.otherForms[0].literal === str) {
            this.setForm(COPULA_CONJUGATION.sandhiForm.name)
            this.setFunc(COPULA_CONJUGATION.sandhiForm.copulative)
            return true
        }

        return false
    }
}

export class NumeralQuantifier extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.noun
    }
}

export class EncliticLe extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.particle
    }
}

export class EncliticE extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.particle
    }
}

class EncliticA extends ConstructionElement {
    constructor() {
        super()
        this.partOfSpeech = POS.particle
    }
}

export class Demonstrative extends ConstructionElement {
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
    }

    clone(): Noun {
        const clone = Object.create(this);
        return clone
    }

    match(str: string): boolean {
        if(this.lexeme.word.literal === str) {
            this.setForm(NOUN_DECLENSION.baseForm.name)
            this.setFunc(NOUN_DECLENSION.baseForm.nominal)
            return true
        }

        if(this.lexeme.otherForms.length === 1 && this.lexeme.otherForms[0].literal === str) {
            this.setForm(NOUN_DECLENSION.sandhiForm.name)
            this.setFunc(NOUN_DECLENSION.sandhiForm.adjective)
            return true
        }

        return false
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
    private keyElems: Array<Copula | Demonstrative | Noun> = new Array()

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