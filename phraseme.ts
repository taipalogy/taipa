import { ToneSandhiWord } from "./word"
import { LexicalAffix } from "./lexeme";

class InflectionalStem {
    //stem of free tone
    //stem of checked tone
    //stem of neutral tone
    lexicalAffixes: Array<LexicalAffix>
}

class PartOfSpeech {
    stem: InflectionalStem
    form
}

class BaseFormForFreeTone extends PartOfSpeech {
}

class BaseFormForFinalTone extends PartOfSpeech {
}

class PartOfSpeeches {
    list_of_base_form_for_free_tone: Array<BaseFormForFreeTone> = new Array();
    list_of_base_form_for_final_tone: Array<BaseFormForFinalTone> = new Array();

    getMatchedBaseFormForFreeTone(word: ToneSandhiWord){
        for(let key in this.list_of_base_form_for_free_tone) {
            /*
            if(word.isPartOfSpeechMatched(this.list_of_base_form_for_free_tone[key].affix)) {
                return this.list_of_base_form_for_free_tone[key];
            }
            */
        }
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
        pos = new PartOfSpeeches().getMatchedBaseFormForFreeTone(this.phrase.words[this.phrase.words.length-1]);
        this.partOfSpeech = pos[0]
    }

    getBaseForm() {
        
    }
}
