
import { ToneSandhiWord } from "./lexeme"

class ExternalSandhiRule {}

class ExternalToneSandhi extends ExternalSandhiRule {
}

class ExternalSoundChange extends ExternalSandhiRule {}

class Conversion extends ExternalSandhiRule {}

class Conjugation extends ExternalToneSandhi {}

class Declension extends ExternalToneSandhi {}

class Transitivity extends Conjugation {}

class AdjectiveModifier extends Conjugation {}

class Counter extends Declension {}

class NounModifier extends Declension {}

class PronounDeclension extends Declension {}

class InflectionRules {
}

class Phraseme {
}

class ToneSandhiPhraseme extends Phraseme {
    phrase
    partOfSpeech

    constructor(words: Array<ToneSandhiWord>) {
        super();
        this.assignPartOfSpeech();
    }

    assignPartOfSpeech() {
        let pos
        this.partOfSpeech = pos[0]
    }

    getBaseForm() {
        
    }
}



//------------------------------------------------------------------------------
//  Phrase
//------------------------------------------------------------------------------

class Phrase {

}

