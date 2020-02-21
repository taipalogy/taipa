import { TonalInflectionLexeme, TonalAssimilationLexeme } from './lexeme';
import { TonalPhrase, Phraseme, TonalPhrasalInflectionMetaplasm, TonalPhrasalAssimilationMetaplasm } from '../phraseme';
import { AssimiDirection } from './morpheme';

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

export class AgressiveExternal extends TonalPhrasalAssimilationMetaplasm {
    apply(lexemeAdjectivalNoun: TonalAssimilationLexeme, lexemeE: TonalAssimilationLexeme) {
        const wrds = lexemeE.assimilateWith(lexemeAdjectivalNoun, AssimiDirection.agressive);
        if (wrds.length > 0) return [new TonalPhrase([lexemeAdjectivalNoun.word].concat(wrds))];
        return [];
    }
}

export class RegressiveExternal extends TonalPhrasalAssimilationMetaplasm {
    apply(lexemePreceding: TonalAssimilationLexeme, lexemeFollowing: TonalAssimilationLexeme) {
        const wrds = lexemePreceding.assimilateWith(lexemeFollowing, AssimiDirection.regressive);
        if (wrds.length > 0) return [new TonalPhrase([lexemePreceding.word].concat(wrds))];
        return [];
    }
}

export class TonalTransitivePhraseme extends Phraseme {
    phrase: TonalPhrase;
    private forms: Array<TonalPhrase> = new Array();

    constructor(
        lexemeVerb: TonalInflectionLexeme,
        lexemeParticle: TonalInflectionLexeme,
        metaplasm: TonalPhrasalInflectionMetaplasm
    ) {
        super();
        this.phrase = new TonalPhrase([lexemeVerb.word, lexemeParticle.word]);

        this.forms = metaplasm.apply(lexemeVerb, lexemeParticle);
    }

    getForms() {
        return this.forms;
    }
}

export class TonalCompoundPhraseme extends Phraseme {
    phrase: TonalPhrase;
    constructor(lexemePreceding: TonalInflectionLexeme, lexemeFollowing: TonalInflectionLexeme) {
        super();
        this.phrase = new TonalPhrase([lexemePreceding.word, lexemeFollowing.word]);
    }

    // TODO: to allow for inflected form of preceding word
}

export class TonalAdjectivePhraseme extends Phraseme {
    phrase: TonalPhrase;
    private forms: Array<TonalPhrase> = new Array();

    constructor(
        lexemeAdjectivalNoun: TonalInflectionLexeme,
        lexemeE: TonalInflectionLexeme,
        metaplasm: TonalPhrasalInflectionMetaplasm
    ) {
        super();
        this.phrase = new TonalPhrase([lexemeAdjectivalNoun.word, lexemeE.word]);

        this.forms = metaplasm.apply(lexemeAdjectivalNoun, lexemeE);
    }

    getForms() {
        return this.forms;
    }
}

export class TonalAssimilationPhraseme extends Phraseme {
    phrase: TonalPhrase;
    private forms: Array<TonalPhrase> = new Array();

    constructor(
        lexemePreceding: TonalAssimilationLexeme,
        lexemeFollowing: TonalAssimilationLexeme,
        metaplasm: TonalPhrasalAssimilationMetaplasm
    ) {
        super();
        this.phrase = new TonalPhrase([lexemePreceding.word, lexemeFollowing.word]);

        this.forms = metaplasm.apply(lexemePreceding, lexemeFollowing);
    }

    getForms() {
        return this.forms;
    }
}

export class TonalSeperatePhraseme extends Phraseme {
    phrase: TonalPhrase;
    constructor(lexemePreceding: TonalInflectionLexeme, lexemeFollowing: TonalInflectionLexeme) {
        super();
        this.phrase = new TonalPhrase([lexemePreceding.getForms()[0], lexemeFollowing.word]);
    }
}

export class TonalInflectionPhrasemeMaker {
    makeTransitivePhraseme(lexemeVerb: TonalInflectionLexeme, lexemeParticle: TonalInflectionLexeme) {
        return new TonalTransitivePhraseme(lexemeVerb, lexemeParticle, new Transitive());
    }

    makeCompoundPhraseme(lexemePreceding: TonalInflectionLexeme, lexemeFollowing: TonalInflectionLexeme) {
        return new TonalCompoundPhraseme(lexemePreceding, lexemeFollowing);
    }

    makeAdjectivePhraseme(
        lexemeAdjectivalNoun: TonalInflectionLexeme,
        lexemeE: TonalInflectionLexeme,
        metaplasm: TonalPhrasalInflectionMetaplasm
    ) {
        return new TonalAdjectivePhraseme(lexemeAdjectivalNoun, lexemeE, metaplasm);
    }
}

export class TonalAssimilationPhrasemeMaker {
    makePhraseme(
        lexemePreceding: TonalAssimilationLexeme,
        lexemeFollowing: TonalAssimilationLexeme,
        metaplasm: TonalPhrasalAssimilationMetaplasm
    ) {
        return new TonalAssimilationPhraseme(lexemePreceding, lexemeFollowing, metaplasm);
    }
}
