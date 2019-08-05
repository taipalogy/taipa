import { TonalInflexion, InflexionLexeme } from './lexeme'
import { TonalInflextionAnalyzer } from './analyzer'
import { POS } from './symbols';
import { TonalInflectingMetaplasm, Word } from '../lexeme';
import { TonalCombiningMorpheme } from './morpheme';
import { TonalWord, TonalSymbolEnding } from '../tonal/lexeme';

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
        //let l = analyzer.makeLexemes(str, new TonalPersonalPronounDeclension())[0]
        let l = analyzer.makeLexemes(str, new TonalInflexion())[0]
        super(l)
        this.partOfSpeech = POS.personal_pronoun
    }
}

class Postposition extends ConstructionElement {
    constructor(str: string) {
        let analyzer = new TonalInflextionAnalyzer()
        let l = analyzer.makeLexemes(str, new TonalZeroInflexion())[0]
        super(l)
        this.partOfSpeech = POS.postposition
    }
}

export class Verb extends ConstructionElement {
    constructor(str: string) {
        let analyzer = new TonalInflextionAnalyzer()
        let l = analyzer.makeLexemes(str, new TonalInflexion())[0]
        super(l)
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