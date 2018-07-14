import { ToneSandhiWord } from "./word"

class ExternalSandhi {

}

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
