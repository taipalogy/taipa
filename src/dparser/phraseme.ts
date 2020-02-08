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
        if (lexemeParticle.getInflectedForms().length > 0) {
            return [new TonalPhrase([lexemeVerb.getInflectedForms()[0], lexemeParticle.getInflectedForms()[0]])];
        } else {
            return [new TonalPhrase([lexemeVerb.getInflectedForms()[0], lexemeParticle.word])];
        }
    }
}

export class Adnominal extends TonalPhrasalInflectionMetaplasm {
    apply(lexemeAdjectivalNoun: TonalInflectionLexeme, lexemeE: TonalInflectionLexeme) {
        if (lexemeAdjectivalNoun.word.literal === '' || lexemeE.word.literal === '') return [];
        if (lexemeE.getInflectedForms().length > 0) {
            return [new TonalPhrase([lexemeAdjectivalNoun.word, lexemeE.getInflectedForms()[0]])];
        } else {
            return [new TonalPhrase([lexemeAdjectivalNoun.word, lexemeE.word])];
        }
    }
}

export class External extends TonalPhrasalInflectionMetaplasm {
    apply(lexemePreceding: TonalInflectionLexeme, lexemeFollowing: TonalInflectionLexeme) {
        if (lexemePreceding.word.syllables.length == 0 || lexemeFollowing.word.syllables.length == 0) return [];
        const mphsPreceding = lexemePreceding.getMorphemes();
        const mphsFollowing = lexemeFollowing.getMorphemes();
        const ftss = new FreeTonalSounds();
        const nfss = new NasalFinalSounds();
        const mss = new MedialSounds();
        const iset = new InitialsForEuphonicT(); // InitialsForEuphonicT is the superset of InitialsForEuphonicTT

        if (ftss.includes(mphsPreceding[mphsPreceding.length - 1].syllable.lastLetter.literal)) {
            if (
                nfss.includes(mphsPreceding[mphsPreceding.length - 1].syllable.lastSecondLetter.literal) &&
                mss.includes(mphsFollowing[0].syllable.letters[0].literal)
            ) {
                const agext = new AgressiveExternal();
                const forms = agext.apply(lexemePreceding, lexemeFollowing);
                return forms;
            }
        } else if (
            nfss.includes(mphsPreceding[mphsPreceding.length - 1].syllable.lastLetter.literal) &&
            mss.includes(mphsFollowing[0].syllable.letters[0].literal)
        ) {
            const agext = new AgressiveExternal();
            const forms = agext.apply(lexemePreceding, lexemeFollowing);
            return forms;
        } else if (iset.includes(mphsFollowing[mphsFollowing.length - 1].syllable.letters[0].literal)) {
            const regext = new RegressiveExternal();
            const forms = regext.apply(lexemePreceding, lexemeFollowing);
            return forms;
        }
        return [];
    }
}

class AgressiveExternal extends TonalPhrasalInflectionMetaplasm {
    apply(lexemeAdjectivalNoun: TonalInflectionLexeme, lexemeE: TonalInflectionLexeme) {
        const wrd = lexemeE.assimilateWith(lexemeAdjectivalNoun, AssimiDirection.agressive);
        if (wrd) {
            const frs = new TonalPhrase([lexemeAdjectivalNoun.word, wrd]);
            return [frs];
        }
        return [];
    }
}

class RegressiveExternal extends TonalPhrasalInflectionMetaplasm {
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
    private proceedingForms: Array<TonalPhrase> = new Array();

    constructor(
        private lexemeVerb: TonalInflectionLexeme,
        private lexemeParticle: TonalInflectionLexeme,
        private metaplasm: TonalPhrasalInflectionMetaplasm
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
        private metaplasm: TonalPhrasalInflectionMetaplasm
    ) {
        super();
        this.phrase = new TonalPhrase([lexemeAdjectivalNoun.word, lexemeE.word]);

        this.proceedingForms = this.assignPhraseForm();
    }

    private assignPhraseForm() {
        return this.metaplasm.apply(this.lexemeAdjectivalNoun, this.lexemeE);
    }

    getProceedingForms() {
        // TODO: rename to getForms?
        return this.proceedingForms;
    }

    getAssimilatedForms() {
        const m = new External();
        const forms = m.apply(this.lexemeAdjectivalNoun, this.lexemeE);

        return forms;
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
