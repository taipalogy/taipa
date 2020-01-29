import { TonalFormationLexeme } from './lexeme';
import { TonalPhrase, Phraseme, TonalPhrasalSandhiMetaplasm } from '../phraseme';

class Transitive extends TonalPhrasalSandhiMetaplasm {
    apply(lexemeVerb: TonalFormationLexeme, lexemeParticle: TonalFormationLexeme) {
        if (lexemeVerb.word.literal === '' || lexemeParticle.word.literal === '') return [];
        if (lexemeParticle.otherForms.length > 0) {
            return [new TonalPhrase([lexemeVerb.otherForms[0], lexemeParticle.otherForms[0]])];
        } else {
            return [new TonalPhrase([lexemeVerb.otherForms[0], lexemeParticle.word])];
        }
    }
}

export class Adnominal extends TonalPhrasalSandhiMetaplasm {
    apply(lexemeAdjectivalNoun: TonalFormationLexeme, lexemeE: TonalFormationLexeme) {
        if (lexemeAdjectivalNoun.word.literal === '' || lexemeE.word.literal === '') return [];
        if (lexemeE.otherForms.length > 0) {
            return [new TonalPhrase([lexemeAdjectivalNoun.word, lexemeE.otherForms[0]])];
        } else {
            return [new TonalPhrase([lexemeAdjectivalNoun.word, lexemeE.word])];
        }
    }
}

export class Assimilation extends TonalPhrasalSandhiMetaplasm {
    apply(lexemeAdjectivalNoun: TonalFormationLexeme, lexemeE: TonalFormationLexeme) {
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
        private lexemeVerb: TonalFormationLexeme,
        private lexemeParticle: TonalFormationLexeme,
        private metaplasm: TonalPhrasalSandhiMetaplasm,
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
    constructor(lexemeAdjective: TonalFormationLexeme, lexemeE: TonalFormationLexeme) {
        super();
        this.phrase = new TonalPhrase([lexemeAdjective.word, lexemeE.word]);
    }
}

export class TonalAdjectivePhraseme extends Phraseme {
    phrase: TonalPhrase;
    otherForms: Array<TonalPhrase> = new Array();

    constructor(
        private lexemeAdjectivalNoun: TonalFormationLexeme,
        private lexemeE: TonalFormationLexeme,
        private metaplasm: TonalPhrasalSandhiMetaplasm,
    ) {
        super();
        this.phrase = new TonalPhrase([lexemeAdjectivalNoun.word, lexemeE.word]);

        this.otherForms = this.assignPhraseForm();
    }

    private assignPhraseForm() {
        return this.metaplasm.apply(this.lexemeAdjectivalNoun, this.lexemeE);
    }
}

export class TonalFormationPhrasemeMaker {
    makeTransitivePhrasemes(lexemeVerb: TonalFormationLexeme, lexemeParticle: TonalFormationLexeme) {
        return new TonalTransitivePhraseme(lexemeVerb, lexemeParticle, new Transitive());
    }

    makeIntransitivePhrasemes(lexemeVerb: TonalFormationLexeme, lexemeParticle: TonalFormationLexeme) {
        return new TonalIntransitivePhraseme(lexemeVerb, lexemeParticle);
    }

    makeAdjectivePhrasemes(
        lexemeAdjectivalNoun: TonalFormationLexeme,
        lexemeE: TonalFormationLexeme,
        metaplasm: TonalPhrasalSandhiMetaplasm,
    ) {
        return new TonalAdjectivePhraseme(lexemeAdjectivalNoun, lexemeE, metaplasm);
    }
}
