import { TonalInflexionLexeme, TonalInflexion, TonalZeroInflexion, TonalPersonalPronounDeclension } from './lexeme'
import { TonalInflextionAnalyzer } from './analyzer'
import { ConstructionElement } from './rulebasedtagger'
import { POS } from './symbols';

export let FORMS = {
    'VERB': {
        'intransitive': 'baseForm',
        'transitive': 'sandhiForm',
        'ditransitive': 'sandhiForm',
        'causative': 'sandhiForm',
        'perfective': 'baseForm',
        'attributive': 'sandhiForm',
        'continuative': 'sandhiForm', // adverbial
    },
    'ADJECTIVE': {
        'basic': 'baseForm',
        'attributive': 'sandhiForm',
        'adverbial': 'sandhiForm', // ay
    },
    'NOUN': {
        'basic': 'baseForm',
        'adverbial': 'sandhiForm',
    },
    'PRONOUN': {},
    'PARTICLE': {
        'basic': 'baseForm',
        'continuative': 'sandhiForm', // adverbial
    },
    'PREPOSITION': {},
    'DEMONSTRATIVEPRONOUN': {},
    'PERSONALPRONOUN': {
        'basic': 'baseForm',
        'subjective': 'sandhiForm',
        'firstEnclitic': 'firstEndingForm',
        'seventhEnclitic': 'seventhEndingForm', // complement
        'thirdEnclitic': 'thirdEndingForm', // complement

        'adverbial': 'adverbialForm',

        'indirectObject': 'sandhiForm', // proceeding
        'directObject': 'baseForm',
    },
    'DETERMINER': {},
    'QUANTIFIER': {
        'basic': 'baseForm',
        'attributive': 'sandhiForm',
        'continuative': 'sandhiForm',
        'adverbial': 'adverbialForm',
    },
}

enum PersonalPronouns {
    FirstSingular = 'goay',
}

class FirstSingular extends ConstructionElement {
    constructor() {
        let analyzer = new TonalInflextionAnalyzer()
        let l = analyzer.makeLexemes(PersonalPronouns.FirstSingular, new TonalPersonalPronounDeclension())[0]
        super(l)
    }
}

class Postposition extends ConstructionElement {
    constructor() {
        let analyzer = new TonalInflextionAnalyzer()
        let l = analyzer.makeLexemes('laiwdey', new TonalZeroInflexion())[0]
        super(l)
        this.partOfSpeech = POS.postposition
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

goa goaw goay goazs
`.match(/\w+/g);