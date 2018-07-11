import { ToneSandhiWord } from "./word"
import { LexicalAffix } from "./lexeme";

export class SandhiStem {
    //stem of free tone
    //stem of checked tone
    //stem of neutral tone
    lexicalAffixes: Array<LexicalAffix>
}

class PartOfSpeech {
    stem: SandhiStem
    form
}

class Phraseme {
}

class ToneSandhiPhraseme extends Phraseme {
    constructor(words: Array<ToneSandhiWord>) {
        super();
        this.assignForm();
    }

    assignForm() {}

    getBaseForm() {
        
    }
}
