import { TonalInflexionLexeme } from "./lexeme";
import { TonalWord } from "../tonal/lexeme";
import { TonalPhrase, Phraseme } from "../phraseme";

export class TonalInflexionPhraseme extends Phraseme {
    phrase: TonalPhrase;
    sandhiForm: TonalPhrase;
    constructor(phrase: TonalPhrase, lexemeVerb: TonalInflexionLexeme, lexemeSubsidiary: TonalInflexionLexeme) {
        super();
        this.phrase = phrase;
        if(lexemeSubsidiary.otherForms.length > 0) {
            this.sandhiForm = new TonalPhrase([lexemeVerb.otherForms[0], lexemeSubsidiary.otherForms[0]])
        } else {
            this.sandhiForm = new TonalPhrase([lexemeVerb.otherForms[0], lexemeSubsidiary.word]);
        }
    }
}

export class TonalInflexionPhrasemeMaker {
    lexemeVerb: TonalInflexionLexeme;
    lexemeSubsidiary: TonalInflexionLexeme;

    constructor(lexemeVerb: TonalInflexionLexeme, lexemeSubsidiary: TonalInflexionLexeme) {
        this.lexemeVerb = lexemeVerb;
        this.lexemeSubsidiary = lexemeSubsidiary;
    }

    preprocess() {
        let words: Array<TonalWord> = new Array();
        words.push(this.lexemeVerb.word);
        words.push(this.lexemeSubsidiary.word);

        return words;
    }

    makePhrasemes() {
        return this.make(this.preprocess());
    }

    make(words: Array<TonalWord>) {
        return new TonalInflexionPhraseme(new TonalPhrase(words), this.lexemeVerb, this.lexemeSubsidiary);
    }
}