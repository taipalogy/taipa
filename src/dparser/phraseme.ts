import { TonalInflectionLexeme } from './lexeme';
import { TonalPhrase, Phraseme, TonalPhrasalInflectingMetaplasm } from '../phraseme';

class Transitive extends TonalPhrasalInflectingMetaplasm {
    apply(lexemeVerb: TonalInflectionLexeme, lexemeParticle: TonalInflectionLexeme) {
        if (lexemeParticle.otherForms.length > 0) {
            return [new TonalPhrase([lexemeVerb.otherForms[0], lexemeParticle.otherForms[0]])];
        } else {
            return [new TonalPhrase([lexemeVerb.otherForms[0], lexemeParticle.word])];
        }
    }
}

export class Adnominal extends TonalPhrasalInflectingMetaplasm {
    apply(lexemeAdjectivalNoun: TonalInflectionLexeme, lexemeE: TonalInflectionLexeme) {
        if (lexemeE.otherForms.length > 0) {
            return [new TonalPhrase([lexemeAdjectivalNoun.word, lexemeE.otherForms[0]])];
        } else {
            return [new TonalPhrase([lexemeAdjectivalNoun.word, lexemeE.word])];
        }
    }
}

export class Assimilation extends TonalPhrasalInflectingMetaplasm {
    apply(lexemeAdjectivalNoun: TonalInflectionLexeme, lexemeE: TonalInflectionLexeme) {
        const wrd = lexemeE.assimilate(lexemeAdjectivalNoun);
        if (wrd) {
            const frs = new TonalPhrase([lexemeAdjectivalNoun.word, wrd]);
            return [frs];
        }
        return [];
    }
}

export class TonalTransitivePhraseme extends Phraseme {
    phrase: TonalPhrase;
    proceedingForms: Array<TonalPhrase> = new Array();

    constructor(
        private lexemeVerb: TonalInflectionLexeme,
        private lexemeParticle: TonalInflectionLexeme,
        private metaplasm: TonalPhrasalInflectingMetaplasm,
    ) {
        super();
        this.phrase = new TonalPhrase([lexemeVerb.word, lexemeParticle.word]);

        this.proceedingForms = this.assignPhraseForms();
    }

    private assignPhraseForms() {
        return this.metaplasm.apply(this.lexemeVerb, this.lexemeParticle);
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
    otherForms: Array<TonalPhrase> = new Array();

    constructor(
        private lexemeAdjectivalNoun: TonalInflectionLexeme,
        private lexemeE: TonalInflectionLexeme,
        private metaplasm: TonalPhrasalInflectingMetaplasm,
    ) {
        super();
        this.phrase = new TonalPhrase([lexemeAdjectivalNoun.word, lexemeE.word]);

        this.otherForms = this.assignPhraseForm();
    }

    private assignPhraseForm() {
        return this.metaplasm.apply(this.lexemeAdjectivalNoun, this.lexemeE);
    }
}

export class TonalInflexionPhrasemeMaker {
    makeTransitivePhrasemes(lexemeVerb: TonalInflectionLexeme, lexemeParticle: TonalInflectionLexeme) {
        return new TonalTransitivePhraseme(lexemeVerb, lexemeParticle, new Transitive());
    }

    makeIntransitivePhrasemes(lexemeVerb: TonalInflectionLexeme, lexemeParticle: TonalInflectionLexeme) {
        return new TonalIntransitivePhraseme(lexemeVerb, lexemeParticle);
    }

    makeAdjectivePhrasemes(
        lexemeAdjectivalNoun: TonalInflectionLexeme,
        lexemeE: TonalInflectionLexeme,
        metaplasm: TonalPhrasalInflectingMetaplasm,
    ) {
        return new TonalAdjectivePhraseme(lexemeAdjectivalNoun, lexemeE, metaplasm);
    }
}
