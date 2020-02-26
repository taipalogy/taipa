import { TonalInflectionLexeme, TonalAssimilationLexeme } from './lexeme';
import { TonalPhrase, Phraseme, TonalPhrasalInflectionMetaplasm, TonalPhrasalAssimilationMetaplasm } from '../phraseme';
import { AssimiDirection } from './morpheme';

class ConjugateToProceeding extends TonalPhrasalInflectionMetaplasm {
    apply(lexemeVerb: TonalInflectionLexeme, lexemeParticle: TonalInflectionLexeme) {
        if (lexemeVerb.word.literal === '' || lexemeParticle.word.literal === '') return [];
        if (lexemeParticle.getForms().length > 0) {
            const forms = lexemeParticle.getForms();
            const ret: TonalPhrase[] = [];
            forms.map(it => ret.push(new TonalPhrase([lexemeVerb.getForms()[0], it])));
            return ret;
        } else if (lexemeVerb.getForms().length > 0) {
            return [new TonalPhrase([lexemeVerb.getForms()[0], lexemeParticle.word])];
        } else {
            return [new TonalPhrase([])];
        }
    }
}

class ConjugateToParticiple extends TonalPhrasalInflectionMetaplasm {
    apply(lexemeVerb: TonalInflectionLexeme, lexemeParticle: TonalInflectionLexeme) {
        if (lexemeVerb.word.literal === '' || lexemeParticle.word.literal === '') return [];
        if (lexemeParticle.getForms().length > 0) {
            const forms = lexemeParticle.getForms();
            const ret: TonalPhrase[] = [];
            if (lexemeVerb.getForms().length > 0) {
                forms.map(it => ret.push(new TonalPhrase([lexemeVerb.getForms()[0], it])));
            } else {
                forms.map(it => ret.push(new TonalPhrase([lexemeVerb.word, it])));
            }
            return ret;
        }
        return [new TonalPhrase([])];
    }
}

export class Adnominal extends TonalPhrasalInflectionMetaplasm {
    apply(lexemeNoun: TonalInflectionLexeme, lexemeParticle: TonalInflectionLexeme) {
        if (lexemeNoun.word.literal === '' || lexemeParticle.word.literal === '') return [];
        if (lexemeParticle.getForms().length > 0) {
            return [new TonalPhrase([lexemeNoun.word, lexemeParticle.getForms()[0]])];
        } else {
            return [new TonalPhrase([])];
        }
    }
}

export class Conjunctive extends TonalPhrasalInflectionMetaplasm {
    apply(lexemeVerb: TonalInflectionLexeme, lexemeLe: TonalInflectionLexeme) {
        if (lexemeVerb.word.literal === '' || lexemeLe.word.literal === '') return [];
        if (lexemeLe.getForms().length > 0) {
            return [new TonalPhrase([lexemeVerb.getForms()[0], lexemeLe.getForms()[0]])];
        } else if (lexemeVerb.getForms().length > 0) {
            return [new TonalPhrase([lexemeVerb.getForms()[0], lexemeLe.word])];
        } else {
            return [new TonalPhrase([])];
        }
    }
}

export class AgressiveExternal extends TonalPhrasalAssimilationMetaplasm {
    apply(lexemePreceding: TonalAssimilationLexeme, lexemeFollowing: TonalAssimilationLexeme) {
        const wrds = lexemeFollowing.assimilateWith(lexemePreceding, AssimiDirection.agressive);
        if (wrds.length > 0) return [new TonalPhrase([lexemePreceding.word].concat(wrds))];
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

export class PhrasalVerbPhraseme extends Phraseme {
    phrase: TonalPhrase;
    private forms: Array<TonalPhrase> = new Array();

    // TODO: add the second particle
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
    // separable phrasal verb. separate compound verb. separable verb.
    // gifchongwguy. onomatopeia
    // main verb and its enclitic (8 -> 1). phrasal verb (8 -> 1)
    phrase: TonalPhrase;
    constructor(lexemePreceding: TonalInflectionLexeme, lexemeFollowing: TonalInflectionLexeme) {
        super();
        this.phrase = new TonalPhrase([lexemePreceding.getForms()[0], lexemeFollowing.word]);
    }
}

export class TonalMainParticlePhraseme extends Phraseme {
    // main word and its particle
    // e-adjective. conjunctive form. possesive
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

export class TonalInflectionPhrasemeMaker {
    makePhrasalVerbPhraseme(lexemeVerb: TonalInflectionLexeme, lexemeParticle: TonalInflectionLexeme) {
        return new PhrasalVerbPhraseme(lexemeVerb, lexemeParticle, new ConjugateToProceeding());
    }

    makeCompoundPhraseme(lexemePreceding: TonalInflectionLexeme, lexemeFollowing: TonalInflectionLexeme) {
        return new TonalCompoundPhraseme(lexemePreceding, lexemeFollowing);
    }

    makeAdjectivePhraseme(lexemeAdjectivalNoun: TonalInflectionLexeme, lexemeE: TonalInflectionLexeme) {
        return new TonalMainParticlePhraseme(lexemeAdjectivalNoun, lexemeE, new Adnominal());
    }

    makeConjunctivePhraseme(lexemeVerb: TonalInflectionLexeme, lexemeLe: TonalInflectionLexeme) {
        return new TonalMainParticlePhraseme(lexemeVerb, lexemeLe, new Conjunctive());
    }

    makePossesivePhraseme(lexemeNoun: TonalInflectionLexeme, lexemeEx: TonalInflectionLexeme) {
        return new TonalMainParticlePhraseme(lexemeNoun, lexemeEx, new Adnominal());
    }

    makeParticiplePhraseme(lexemeVerb: TonalInflectionLexeme, lexemeParticle: TonalInflectionLexeme) {
        return new PhrasalVerbPhraseme(lexemeVerb, lexemeParticle, new ConjugateToParticiple());
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
