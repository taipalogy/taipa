import { InflexionLexeme, TonalInflexionLexeme, TonalInflexion } from './lexeme'
import { POS } from './symbols';
import { TonalInflectingMetaplasm, Word } from '../lexeme';
import { TonalCombiningMetaplasm } from '../morpheme';
import { TonalSyllable } from '../tonal/morpheme';
import { Allomorph, FreeAllomorph, declensionRules } from '../tonal/version2';
import { AlphabeticLetter } from '../grapheme';
import { TonalInflextionAnalyzer } from './analyzer';

export class ConstructionElement {
    lexeme: InflexionLexeme
    partOfSpeech: string = ''

    constructor(l: InflexionLexeme) {
        this.lexeme = l
    }

    check(w: Word) {
        if(this.lexeme.word.literal === w.literal) {
            return true
        }
        return false
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

export class FirstSingular extends ConstructionElement {
    private form_funcs: Map<string, string[]> = new Map()
    constructor(l: TonalInflexionLexeme) {
        super(l)
        this.partOfSpeech = POS.personal_pronoun
        if(declensionRules.keys && declensionRules.keys.length === 3) {
            this.form_funcs
                .set('baseForm', ['basic', 'directObject'])
                .set(declensionRules.keys[0], ['firstEnclitic', 'subjective', 'indirectObject'])
                .set(declensionRules.keys[1], ['adverbialForm', 'thirdEnclitic'])
                .set(declensionRules.keys[2], ['seventhEnclitic'])
        }
    }
}

export class ThirdSingular extends ConstructionElement {
    private form_funcs: Map<string, string[]> = new Map()
    constructor(l: TonalInflexionLexeme) {
        super(l)
        this.partOfSpeech = POS.personal_pronoun
        if(declensionRules.keys && declensionRules.keys.length === 3) {
            this.form_funcs
                .set('baseForm', ['basic', 'firstEnclitic', 'subjective', 'directObject', 'indirectObject'])
                .set(declensionRules.keys[0], ['adverbialForm', 'thirdEnclitic'])
                .set(declensionRules.keys[1], ['seventhEnclitic'])
        }
    }
}

class Postposition extends ConstructionElement {
    constructor(l: TonalInflexionLexeme) {
        super(l)
        this.partOfSpeech = POS.postposition
    }
}

export class Verb extends ConstructionElement {
    private form_funcs: Map<string, string[]> = new Map()
    constructor(l: TonalInflexionLexeme) {
        super(l)
        this.partOfSpeech = POS.verb
        this.form_funcs
            .set('baseForm', ['intransitive', 'perfective'])
            .set('sandhiForm', ['transitive', 'ditransitive', 'causative', 'attributive', 'continuative'])
    }
}

export class NumeralQuantifier extends ConstructionElement {
    private form_funcs: Map<string, string[]> = new Map()
    constructor(l: TonalInflexionLexeme) {
        super(l)
        this.partOfSpeech = POS.numeral_quantifier
        this.form_funcs
            .set('baseForm', ['basic'])
            .set('sandhiForm', ['attributive', 'continuative'])
            .set('adverbialForm', ['adverbial'])
    }
}

export class EncliticLe extends ConstructionElement {
    private form_funcs: Map<string, string[]> = new Map()
    constructor(l: TonalInflexionLexeme) {
        super(l)
        this.partOfSpeech = POS.particle
        this.form_funcs
            .set('baseForm', ['basic', 'imperative'])
            .set('sandhiForm', ['conjunctive'])
    }
}

export class EncliticE extends ConstructionElement {
    private form_funcs: Map<string, string[]> = new Map()
    constructor(l: TonalInflexionLexeme) {
        super(l)
        this.partOfSpeech = POS.particle
        this.form_funcs
            .set('baseForm', ['basic', 'participle', 'terminal'])
            .set('sandhiForm', ['attributive'])
    }
}

class EncliticA extends ConstructionElement {
    constructor(l: TonalInflexionLexeme) {
        super(l)
        this.partOfSpeech = POS.particle
    }
}

class AuxiliaryVerb {}
class CaseMarker {}

class Demonstrative extends ConstructionElement {
    constructor(l: TonalInflexionLexeme) {
        super(l)
        this.partOfSpeech = POS.demonstrative
    }
}

class Particle {}

export class Adjective extends ConstructionElement {
    private form_funcs: Map<string, string[]> = new Map()
    constructor(l: TonalInflexionLexeme) {
        super(l)
        this.partOfSpeech = POS.adjective
        this.form_funcs
            .set('baseForm', ['basic'])
            .set('sandhiForm', ['attributive', 'adverbial'])
    }
}

export class Noun extends ConstructionElement {
    private form_funcs: Map<string, string[]> = new Map()
    constructor(l: TonalInflexionLexeme) {
        super(l)
        this.partOfSpeech = POS.noun
        this.form_funcs
            .set('baseForm', ['basic'])
            .set('sandhiForm', ['adjective'])
    }
}

export class KeyWords {
    analyzer = new TonalInflextionAnalyzer()
    key_words: Array<ConstructionElement> = [
        this.makeDemonstrative('che'),
        this.makePersonalPronoun(PersonalPronouns.FirstSingular),
        this.makeDemonstrative('he'),
    ]

    makePersonalPronoun(str: string) {
        let ms = this.analyzer.doMorphologicalAnalysis(str, new FromTone2ToTone137())
        let ls = this.analyzer.doLexicalAnalysis(ms, new TonalInflexion())
        return new FirstSingular(ls[0])
    }

    makeDemonstrative(str: string) {
        let ms = this.analyzer.doMorphologicalAnalysis(str, new TonalZeroCombining())
        let ls = this.analyzer.doLexicalAnalysis(ms, new TonalInflexion())
        return new Demonstrative(ls[0])
    }

    search(str: string) {
        let i 
        console.log(`i: ${i}`)
    }
}
