import { TonalInflectionLexeme } from './lexeme';
import { TonalPhrase, Phraseme, TonalPhrasalInflectionMetaplasm } from '../phraseme';
import { AssimiDirection } from './morpheme';
import {
    FreeTonalSounds,
    NasalFinalSounds,
    InitialsForEuphonicT,
    InitialsForEuphonicTT,
    MedialSounds
} from '../tonal/version2';

class Transitive extends TonalPhrasalInflectionMetaplasm {
    apply(lexemeVerb: TonalInflectionLexeme, lexemeParticle: TonalInflectionLexeme) {
        if (lexemeVerb.word.literal === '' || lexemeParticle.word.literal === '') return [];
        if (lexemeParticle.getForms().length > 0) {
            return [new TonalPhrase([lexemeVerb.getForms()[0], lexemeParticle.getForms()[0]])];
        } else {
            return [new TonalPhrase([lexemeVerb.getForms()[0], lexemeParticle.word])];
        }
    }
}

export class Adnominal extends TonalPhrasalInflectionMetaplasm {
    apply(lexemeAdjectivalNoun: TonalInflectionLexeme, lexemeE: TonalInflectionLexeme) {
        if (lexemeAdjectivalNoun.word.literal === '' || lexemeE.word.literal === '') return [];
        if (lexemeE.getForms().length > 0) {
            return [new TonalPhrase([lexemeAdjectivalNoun.word, lexemeE.getForms()[0]])];
        } else {
            return [new TonalPhrase([lexemeAdjectivalNoun.word, lexemeE.word])];
        }
    }
}

export class AgressiveExternal extends TonalPhrasalInflectionMetaplasm {
    apply(lexemeAdjectivalNoun: TonalInflectionLexeme, lexemeE: TonalInflectionLexeme) {
        const wrd = lexemeE.assimilateWith(lexemeAdjectivalNoun, AssimiDirection.agressive);
        if (wrd) {
            const frs = new TonalPhrase([lexemeAdjectivalNoun.word, wrd]);
            return [frs];
        }
        return [];
    }
}

export class RegressiveExternal extends TonalPhrasalInflectionMetaplasm {
    apply(lexemePreceding: TonalInflectionLexeme, lexemeFollowing: TonalInflectionLexeme) {
        const wrd = lexemePreceding.assimilateWith(lexemeFollowing, AssimiDirection.regressive);
        if (wrd) {
            const frs = new TonalPhrase([lexemePreceding.word, wrd]);
            return [frs];
        }
        return [];
    }
}

export class TonalTransitivePhraseme extends Phraseme {
    phrase: TonalPhrase;
    private forms: Array<TonalPhrase> = new Array();

    constructor(
        private lexemeVerb: TonalInflectionLexeme,
        private lexemeParticle: TonalInflectionLexeme,
        private metaplasm: TonalPhrasalInflectionMetaplasm
    ) {
        super();
        this.phrase = new TonalPhrase([lexemeVerb.word, lexemeParticle.word]);

        this.forms = this.assignPhraseForms();
    }

    private assignPhraseForms() {
        return this.metaplasm.apply(this.lexemeVerb, this.lexemeParticle);
    }

    getForms() {
        return this.forms;
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
    private forms: Array<TonalPhrase> = new Array();

    constructor(
        private lexemeAdjectivalNoun: TonalInflectionLexeme,
        private lexemeE: TonalInflectionLexeme,
        private metaplasm: TonalPhrasalInflectionMetaplasm
    ) {
        super();
        this.phrase = new TonalPhrase([lexemeAdjectivalNoun.word, lexemeE.word]);

        this.forms = this.assignPhraseForm();
    }

    private assignPhraseForm() {
        return this.metaplasm.apply(this.lexemeAdjectivalNoun, this.lexemeE);
    }

    getForms() {
        return this.forms;
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
        metaplasm: TonalPhrasalInflectionMetaplasm
    ) {
        return new TonalAdjectivePhraseme(lexemeAdjectivalNoun, lexemeE, metaplasm);
    }
}
