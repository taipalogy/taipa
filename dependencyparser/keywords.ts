import { TonalInflexion, InflexionLexeme } from './lexeme'
import { TonalInflextionAnalyzer } from './analyzer'
import { POS } from './symbols';
import { TonalInflectingMetaplasm, Word } from '../lexeme';
import { TonalCombiningMorpheme, TonalCombiningForms } from './morpheme';
import { TonalWord, TonalSymbolEnding } from '../tonal/lexeme';
import { TonalCombiningMetaplasm } from '../morpheme';
import { TonalSyllable } from '../tonal/morpheme';
import { Allomorph, FreeAllomorph, declensionRules, AllomorphY } from '../tonal/version2';
import { AlphabeticLetter, Sound } from '../grapheme';

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

export let FORMS = {
    'VERB': {
        'baseForm': ['intransitive', 'perfective'],
        'sandhiForm': ['transitive', 'ditransitive', 'causative', 'attributive', 'continuative'],
    },
    'ADJECTIVE': {
        'baseForm': ['basic'],
        'sandhiForm': ['attributive', 'adverbial'],
    },
    'NOUN': {
        'baseForm': ['basic'],
        'sandhiForm': ['adjective'],
    },
    'PRONOUN': {},
    'PARTICLE': {
        'baseForm': ['basic'],
        'sandhiForm': ['continuative'],
    },
    'PREPOSITION': {},
    'DEMONSTRATIVE_PRONOUN': {},
    'PERSONAL_PRONOUN': {
        'baseForm': ['basic', 'directObject'],
        'sandhiForm': ['firstEnclitic', 'subjective', 'indirectObject'],
        'sevenForm': ['seventhEnclitic'],
        'adverbialForm': ['adverbialForm', 'thirdEnclitic'],
    },
    'DETERMINER': {},
    'QUANTIFIER': {
        'baseForm': ['basic'],
        'sandhiForm': ['attributive', 'continuative'],
        'adverbialForm': ['adverbial'],
    },
}

export class TonalAdverbInflexion extends TonalInflectingMetaplasm {}
export class TonalParticleInflexion extends TonalInflectingMetaplasm {}
export class TonalZeroInflexion extends TonalInflectingMetaplasm {
    // examples: author and authoring. che qahf he. type and typing. meet and meeting.
}
class TonalPersonalPronounDeclension extends TonalInflectingMetaplasm {
    apply(word: TonalWord, ms: Array<TonalCombiningMorpheme>, tse: TonalSymbolEnding): TonalWord[] {
        if(tse) {
            let wd = new TonalWord(word.syllables);
            let last = ms[ms.length-1]
            let slbs = last.getForms()
            let rets = []
            for(let i in slbs) {
                wd.popSyllable()
                wd.pushSyllable(slbs[i]);
                rets.push(wd)
            }
            return rets
        }
        return []
    }
}

export class TonalZeroCombining extends TonalCombiningMetaplasm {}
class FromTone2ToTone137 extends TonalCombiningMetaplasm {
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
    constructor(str: string) {
        let analyzer = new TonalInflextionAnalyzer()
        let ms = analyzer.getMorphologicalAnalysisResults(str, new FromTone2ToTone137())
        //let ls = analyzer.getLexicalAnalysisResults(ms, new TonalInflexion())
        let ls = analyzer.getLexicalAnalysisResults(ms, new TonalPersonalPronounDeclension())
        super(ls[0])
        this.partOfSpeech = POS.personal_pronoun
    }
}

class Postposition extends ConstructionElement {
    constructor(str: string) {
        let analyzer = new TonalInflextionAnalyzer()
        let ms = analyzer.getMorphologicalAnalysisResults(str, new TonalZeroCombining())
        let ls = analyzer.getLexicalAnalysisResults(ms, new TonalZeroInflexion())
        super(ls[0])
        this.partOfSpeech = POS.postposition
    }
}

export class Verb extends ConstructionElement {
    constructor(str: string) {
        let analyzer = new TonalInflextionAnalyzer()
        let ms = analyzer.getMorphologicalAnalysisResults(str, new TonalCombiningForms())
        let ls = analyzer.getLexicalAnalysisResults(ms, new TonalInflexion())
        super(ls[0])
        this.partOfSpeech = POS.verb
    }
}

class Enclitic {}
class AuxiliaryVerb {}
class Particle {}
class CaseMarker {}
class Demostrative {}

export let key_words = `
a

e

kahf

langx

qaw qazs

siw

goa goaw goay goaz
`.match(/\w+/g);