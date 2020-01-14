import { TonalInflexionLexeme } from './lexeme';
import { TonalPhrase, Phraseme, TonalPhrasalInflectingMetaplasm } from '../phraseme';

class Transitive extends TonalPhrasalInflectingMetaplasm {
    apply(lexemeVerb: TonalInflexionLexeme, lexemeParticle: TonalInflexionLexeme) {
        if (lexemeParticle.otherForms.length > 0) {
            return [new TonalPhrase([lexemeVerb.otherForms[0], lexemeParticle.otherForms[0]])];
        } else {
            return [new TonalPhrase([lexemeVerb.otherForms[0], lexemeParticle.word])];
        }
    }
}

class Adnominal extends TonalPhrasalInflectingMetaplasm {
    apply(lexemeAdjective: TonalInflexionLexeme, lexemeE: TonalInflexionLexeme) {
        if (lexemeE.otherForms.length > 0) {
            return [new TonalPhrase([lexemeAdjective.word, lexemeE.otherForms[0]])];
        } else {
            return [new TonalPhrase([lexemeAdjective.word, lexemeE.word])];
        }
    }
}

export class TonalTransitivePhraseme extends Phraseme {
    phrase: TonalPhrase;
    proceedingForms: Array<TonalPhrase> = new Array();

    constructor(private lexemeVerb: TonalInflexionLexeme, private lexemeParticle: TonalInflexionLexeme, private metaplasm: TonalPhrasalInflectingMetaplasm) {
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
    constructor(lexemeAdjective: TonalInflexionLexeme, lexemeE: TonalInflexionLexeme) {
        super();
        this.phrase = new TonalPhrase([lexemeAdjective.word, lexemeE.word]);
    }
}

export class TonalAdjectivePhraseme extends Phraseme {
    phrase: TonalPhrase;
    proceedingForms: Array<TonalPhrase> = new Array();

    constructor(private lexemeAdjective: TonalInflexionLexeme, private lexemeE: TonalInflexionLexeme, private metaplasm: TonalPhrasalInflectingMetaplasm) {
        super();
        this.phrase = new TonalPhrase([lexemeAdjective.word, lexemeE.word]);

        this.proceedingForms = this.assignPhraseForms();
    }

    private assignPhraseForms() {
        return this.metaplasm.apply(this.lexemeAdjective, this.lexemeE);
    }
}

export class TonalInflexionPhrasemeMaker {
    makeTransitivePhrasemes(lexemeVerb: TonalInflexionLexeme, lexemeParticle: TonalInflexionLexeme) {
        return new TonalTransitivePhraseme(lexemeVerb, lexemeParticle, new Transitive());
    }

    makeIntransitivePhrasemes(lexemeVerb: TonalInflexionLexeme, lexemeParticle: TonalInflexionLexeme) {
        return new TonalIntransitivePhraseme(lexemeVerb, lexemeParticle);
    }

    makeAdjectivePhrasemes(lexemeAdjective: TonalInflexionLexeme, lexemeE: TonalInflexionLexeme) {
        return new TonalAdjectivePhraseme(lexemeAdjective, lexemeE, new Adnominal());
    }
}
