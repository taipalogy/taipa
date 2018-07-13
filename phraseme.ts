import { ToneSandhiWord } from "./word"

class FormsOfPhraseme {

    getMatchedBaseFormForFreeTone(word: ToneSandhiWord){
    }
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
        pos = new FormsOfPhraseme().getMatchedBaseFormForFreeTone(this.phrase.words[this.phrase.words.length-1]);
        this.partOfSpeech = pos[0]
    }

    getBaseForm() {
        
    }
}
