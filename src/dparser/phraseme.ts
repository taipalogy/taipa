import { TonalInflectionLexeme } from './lexeme';
import { TonalPhrase, Phraseme, TonalPhrasalInflectionMetaplasm } from '../phraseme';

class Transitive extends TonalPhrasalInflectionMetaplasm {
    apply(lexemeVerb: TonalInflectionLexeme, lexemeParticle: TonalInflectionLexeme) {
        if (lexemeVerb.word.literal === '' || lexemeParticle.word.literal === '') return [];
        if (lexemeParticle.getProceedingForms().length > 0) {
            return [new TonalPhrase([lexemeVerb.getProceedingForms()[0], lexemeParticle.getProceedingForms()[0]])];
        } else {
            return [new TonalPhrase([lexemeVerb.getProceedingForms()[0], lexemeParticle.word])];
        }
    }
}

export class Adnominal extends TonalPhrasalInflectionMetaplasm {
    apply(lexemeAdjectivalNoun: TonalInflectionLexeme, lexemeE: TonalInflectionLexeme) {
        if (lexemeAdjectivalNoun.word.literal === '' || lexemeE.word.literal === '') return [];
        if (lexemeE.getProceedingForms().length > 0) {
            return [new TonalPhrase([lexemeAdjectivalNoun.word, lexemeE.getProceedingForms()[0]])];
        } else {
            return [new TonalPhrase([lexemeAdjectivalNoun.word, lexemeE.word])];
        }
    }
}

export class Assimilation extends TonalPhrasalInflectionMetaplasm {
    apply(lexemeAdjectivalNoun: TonalInflectionLexeme, lexemeE: TonalInflectionLexeme) {
        const wrd = lexemeE.assimilate(lexemeAdjectivalNoun);
        if (wrd) {
            const frs = new TonalPhrase([lexemeAdjectivalNoun.word, wrd]);
            return [frs];
        }
        return [];
    }
}
// TODO: add to API
export class TonalTransitivePhraseme extends Phraseme {
    phrase: TonalPhrase;
    private proceedingForms: Array<TonalPhrase> = new Array();

    constructor(
        private lexemeVerb: TonalInflectionLexeme,
        private lexemeParticle: TonalInflectionLexeme,
        private metaplasm: TonalPhrasalInflectionMetaplasm,
    ) {
        super();
        this.phrase = new TonalPhrase([lexemeVerb.word, lexemeParticle.word]);

        this.proceedingForms = this.assignPhraseForms();
    }

    private assignPhraseForms() {
        return this.metaplasm.apply(this.lexemeVerb, this.lexemeParticle);
    }

    getProceedingForms() {
        return this.proceedingForms;
    }
}

export class TonalIntransitivePhraseme extends Phraseme {
    phrase: TonalPhrase;
    constructor(lexemeAdjective: TonalInflectionLexeme, lexemeE: TonalInflectionLexeme) {
        super();
        this.phrase = new TonalPhrase([lexemeAdjective.word, lexemeE.word]);
    }
}

export class TonalAdjectivePhraseme extends Phraseme {
    phrase: TonalPhrase;
    private proceedingForms: Array<TonalPhrase> = new Array();

    constructor(
        private lexemeAdjectivalNoun: TonalInflectionLexeme,
        private lexemeE: TonalInflectionLexeme,
        private metaplasm: TonalPhrasalInflectionMetaplasm,
    ) {
        super();
        this.phrase = new TonalPhrase([lexemeAdjectivalNoun.word, lexemeE.word]);

        this.proceedingForms = this.assignPhraseForm();
    }

    private assignPhraseForm() {
        return this.metaplasm.apply(this.lexemeAdjectivalNoun, this.lexemeE);
    }

    getProceedingForms() {
        return this.proceedingForms;
    }
}

export class TonalInflectionPhrasemeMaker {
    makeTransitivePhraseme(lexemeVerb: TonalInflectionLexeme, lexemeParticle: TonalInflectionLexeme) {
        return new TonalTransitivePhraseme(lexemeVerb, lexemeParticle, new Transitive());
    }

    makeIntransitivePhraseme(lexemeVerb: TonalInflectionLexeme, lexemeParticle: TonalInflectionLexeme) {
        return new TonalIntransitivePhraseme(lexemeVerb, lexemeParticle);
    }

    makeAdjectivePhraseme(
        lexemeAdjectivalNoun: TonalInflectionLexeme,
        lexemeE: TonalInflectionLexeme,
        metaplasm: TonalPhrasalInflectionMetaplasm,
    ) {
        return new TonalAdjectivePhraseme(lexemeAdjectivalNoun, lexemeE, metaplasm);
    }
}
