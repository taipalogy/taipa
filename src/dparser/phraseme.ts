import { TonalInflexionLexeme } from './lexeme';
import { TonalWord } from '../tonal/lexeme';
import { TonalPhrase, Phraseme } from '../phraseme';

export class TonalTransitivePhraseme extends Phraseme {
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

export class TonalIntransitivePhraseme extends Phraseme {
    phrase: TonalPhrase;
    constructor(phrase: TonalPhrase) {
        super();
        this.phrase = phrase;
    }
}

export class TonalInflexionPhrasemeMaker {
    makeTransitivePhrasemes(lexemeVerb: TonalInflexionLexeme, lexemeSubsidiary: TonalInflexionLexeme) {
        return this.make(lexemeVerb, lexemeSubsidiary);
    }

    makeIntransitivePhrasemes(lexemeVerb: TonalInflexionLexeme, lexemeParticle: TonalInflexionLexeme) {
        const words: Array<TonalWord> = new Array();
        words.push(lexemeVerb.word);
        words.push(lexemeParticle.word);

        return new TonalIntransitivePhraseme(new TonalPhrase(words));
    }

    private make(lexemeVerb: TonalInflexionLexeme, lexemeParticle: TonalInflexionLexeme) {
        const words: Array<TonalWord> = new Array();
        words.push(lexemeVerb.word);
        words.push(lexemeParticle.word);

        return new TonalTransitivePhraseme(new TonalPhrase(words), lexemeVerb, lexemeParticle);
    }
}
