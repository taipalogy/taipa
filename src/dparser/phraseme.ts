import { TonalInflexionLexeme } from './lexeme';
import { TonalWord } from '../tonal/lexeme';
import { TonalPhrase, Phraseme } from '../phraseme';

export class TonalInflexionPhraseme extends Phraseme {
    phrase: TonalPhrase;
    sandhiForm: TonalPhrase;
    constructor(phrase: TonalPhrase, lexemeVerb: TonalInflexionLexeme, lexemeParticle: TonalInflexionLexeme) {
        super();
        this.phrase = phrase;
        if (lexemeParticle.otherForms.length > 0) {
            this.sandhiForm = new TonalPhrase([lexemeVerb.otherForms[0], lexemeParticle.otherForms[0]]);
        } else {
            this.sandhiForm = new TonalPhrase([lexemeVerb.otherForms[0], lexemeParticle.word]);
        }
    }
}

export class TonalInflexionPhrasemeMaker {
    constructor() {}

    makePhrasemes(lexemeVerb: TonalInflexionLexeme, lexemeSubsidiary: TonalInflexionLexeme) {
        return this.make(lexemeVerb, lexemeSubsidiary);
    }

    private make(lexemeVerb: TonalInflexionLexeme, lexemeParticle: TonalInflexionLexeme) {
        const words: Array<TonalWord> = new Array();
        words.push(lexemeVerb.word);
        words.push(lexemeParticle.word);

        return new TonalInflexionPhraseme(new TonalPhrase(words), lexemeVerb, lexemeParticle);
    }
}
