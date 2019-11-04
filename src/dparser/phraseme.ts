import { TonalInflexionLexeme } from "./lexeme";
import { TonalWord } from "../tonal/lexeme";
import { TonalPhrase, Phraseme } from "../phraseme";

export class TonalInflexionPhraseme extends Phraseme {
    phrase: TonalPhrase;
    sandhiForm: TonalPhrase;
    constructor(phrase: TonalPhrase, lexemeVerb: TonalInflexionLexeme, lexemeParticle: TonalInflexionLexeme) {
        super();
        this.phrase = phrase;
        this.sandhiForm = new TonalPhrase([lexemeVerb.otherForms[0], lexemeParticle.otherForms[0]])
    }
}

export class TonalInflexionPhrasemeMaker {
    lexemeVerb: TonalInflexionLexeme;
    lexemeParticle: TonalInflexionLexeme;

    constructor(lexemeVerb: TonalInflexionLexeme, lexemeParticle: TonalInflexionLexeme) {
        this.lexemeVerb = lexemeVerb;
        this.lexemeParticle = lexemeParticle;
    }

    preprocess() {
        let words: Array<TonalWord> = new Array();
        words.push(this.lexemeVerb.word);
        words.push(this.lexemeParticle.word);

        return words;
    }

    makePhrasemes() {
        return this.postprocess(this.make(this.preprocess()));
    }

    make(words: Array<TonalWord>) {
        return new TonalInflexionPhraseme(new TonalPhrase(words), this.lexemeVerb, this.lexemeParticle);
    }

    postprocess(tl: TonalInflexionPhraseme) {
        let phrasemes: Array<TonalInflexionPhraseme> = new Array();

        phrasemes.push(tl);

        return phrasemes;
    }
}