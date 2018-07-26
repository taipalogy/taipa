
import { ToneSandhiWord, InflectionalEnding } from "./lexeme"

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

class SandhiForm {
    inflectionalEnding: InflectionalEnding = null;
}

class FreeSandhiForm extends SandhiForm {
    inflectionalEnding = new InflectionalEnding();
    baseInflectionalEndings: Array<InflectionalEnding> = new Array();
}

class CheckedSandhiForm extends SandhiForm {
    inflectionalEnding = new InflectionalEnding();
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

class PartOfSpeechOfPhrase extends ToneSandhiPhraseme {}
class AForm extends ToneSandhiPhraseme {}
class EForm extends ToneSandhiPhraseme {}
class LeForm extends ToneSandhiPhraseme {}

class PhrasalVerb extends PartOfSpeechOfPhrase {}


//------------------------------------------------------------------------------
//  Phrase
//------------------------------------------------------------------------------

class Phrase {

}

