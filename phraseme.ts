import { ToneSandhiWord } from "./word"
import { PartOfSpeech } from "./lexeme";

class Inflection {
    partOfSpeeches: Array<PartOfSpeech>
    isBaseForm() {}
}

class Conjugation extends Inflection {
    isConjugated() {}
}
class Declension extends Inflection {}

class ExternalSandhiOfPhraseme {

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
