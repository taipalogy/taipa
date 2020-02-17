import { GraphemeMaker, AlphabeticGrapheme } from '../grapheme';
import { Analyzer } from '../analyzer';
import {
    TonalCombiningMorphemeMaker,
    TonalCombiningMorpheme,
    TonalCombiningForms,
    EncliticECombining,
    PhrasalVerbParticleCombining,
    ThirdCombiningForm,
    TonalSoundChangingMorphemeMaker
} from './morpheme';
import { lowerLettersOfTonal } from '../tonal/version2';
import {
    TonalInflectionLexemeMaker,
    TonalInflectionLexeme,
    TonalDesinenceInflection,
    AgressiveInternal,
    RegressiveInternal,
    TransfixInflection,
    Epenthesis,
    TonalAssimilationLexeme
} from './lexeme';
import { TonalInflectionMetaplasm, TonalZeroInflection } from '../lexeme';
import { TonalCombiningMetaplasm, TonalZeroCombining } from '../morpheme';
import {
    TonalInflectionPhrasemeMaker,
    Adnominal,
    AgressiveExternal,
    RegressiveExternal,
    TonalAssimilationPhrasemeMaker
} from './phraseme';

//------------------------------------------------------------------------------

export class TonalInflectionAnalyzer extends Analyzer {
    graphAnalyze(str: string): AlphabeticGrapheme[] {
        // graphemic analysis
        const gm = new GraphemeMaker(lowerLettersOfTonal);
        return gm.makeGraphemes(str);
    }

    morphAnalyze(str: string, tcm: TonalCombiningMetaplasm): TonalCombiningMorpheme[];
    morphAnalyze(gs: Array<AlphabeticGrapheme>, tcm: TonalCombiningMetaplasm): TonalCombiningMorpheme[];
    morphAnalyze(x: string | Array<AlphabeticGrapheme>, tcm: TonalCombiningMetaplasm) {
        // morphological analysis
        let graphemes: AlphabeticGrapheme[] = [];
        if (typeof x == 'object') {
            graphemes = x;
        } else if (typeof x == 'string') {
            graphemes = this.graphAnalyze(x);
        }

        const mm = new TonalCombiningMorphemeMaker(tcm);
        return mm.makeMorphemes(graphemes);
    }

    lexAnalyze(ms: Array<TonalCombiningMorpheme>, tim: TonalInflectionMetaplasm): TonalInflectionLexeme {
        // lexical analysis
        let morphemes: Array<TonalCombiningMorpheme> = ms;

        const lm = new TonalInflectionLexemeMaker(tim);
        return lm.makeLexemes(morphemes);
    }
}

export class TonalInflector {
    private readonly tia = new TonalInflectionAnalyzer();

    inflectDesinence(str: string) {
        const mrphs = this.tia.morphAnalyze(str, new TonalCombiningForms());
        const lx = this.tia.lexAnalyze(mrphs, new TonalDesinenceInflection());
        return lx;
    }

    inflectTransfix(str: string) {
        const mrphs = this.tia.morphAnalyze(str, new ThirdCombiningForm());
        const lx = this.tia.lexAnalyze(mrphs, new TransfixInflection());
        return lx;
    }

    inflectEncliticE(str: string) {
        const mrphs = this.tia.morphAnalyze(str, new EncliticECombining());
        const lx = this.tia.lexAnalyze(mrphs, new TonalDesinenceInflection());
        return lx;
    }

    inflectPhrasalVerbParticle(str: string) {
        const mrphs = this.tia.morphAnalyze(str, new PhrasalVerbParticleCombining());
        const lx = this.tia.lexAnalyze(mrphs, new TonalDesinenceInflection());
        return lx;
    }

    dontInflect(str: string) {
        const mrphs = this.tia.morphAnalyze(str, new TonalZeroCombining());
        const lx = this.tia.lexAnalyze(mrphs, new TonalZeroInflection()); // could be replaced with TonalDesinenceInflection
        return lx;
    }
}

export class TonalAssimilator {
    private readonly tschmm = new TonalSoundChangingMorphemeMaker();
    private readonly gm = new GraphemeMaker(lowerLettersOfTonal);

    private morphAnalyze(str: string) {
        const gs = this.gm.makeGraphemes(str);
        const mrphs = this.tschmm.makeMorphemes(gs);
        return mrphs;
    }

    getLexeme(str: string) {
        const mrphs = this.morphAnalyze(str);
        const lx = new TonalAssimilationLexeme(mrphs, new TonalZeroInflection());

        return lx;
    }

    assimilateAgressive(str: string) {
        const mrphs = this.morphAnalyze(str);
        const lx = new TonalAssimilationLexeme(mrphs, new AgressiveInternal());

        return lx;
    }

    assimilateRegressive(str: string) {
        const mrphs = this.morphAnalyze(str);
        const lx = new TonalAssimilationLexeme(mrphs, new RegressiveInternal());

        return lx;
    }
}

export class TonalInserter {
    private readonly tschmm = new TonalSoundChangingMorphemeMaker();
    private readonly gm = new GraphemeMaker(lowerLettersOfTonal);

    private morphAnalyze(str: string) {
        const gs = this.gm.makeGraphemes(str);
        const mrphs = this.tschmm.makeMorphemes(gs);
        return mrphs;
    }

    insert(str: string) {
        const mrphs = this.morphAnalyze(str);
        const lx = new TonalAssimilationLexeme(mrphs, new Epenthesis());

        return lx;
    }
}

export class TonalPhrasalInflector {
    private readonly infl = new TonalInflector();
    private readonly phm = new TonalInflectionPhrasemeMaker();

    inflectVerbWoParticle(verb: string, particle: string) {
        // particle has no proceeding form. no need to inflect
        const lexemeVerb = this.infl.inflectDesinence(verb);
        const lexemeParticle = this.infl.dontInflect(particle);
        return this.phm.makeTransitivePhraseme(lexemeVerb, lexemeParticle);
    }

    inflectBoth(verb: string, particle: string) {
        // need to inflect to first tone. tonal f is appended to particle.
        const lexemeVerb = this.infl.inflectDesinence(verb);
        const lexemeParticle = this.infl.inflectPhrasalVerbParticle(particle);
        return this.phm.makeTransitivePhraseme(lexemeVerb, lexemeParticle);
    }

    dontInflectIntransitive(verb: string, particle: string) {
        // no need to inflect
        const lexemeVerb = this.infl.dontInflect(verb);
        const lexemeParticle = this.infl.dontInflect(particle);
        return this.phm.makeIntransitivePhraseme(lexemeVerb, lexemeParticle);
    }

    dontInflectCompound(preceding: string, following: string) {
        const lexemePreceding = this.infl.dontInflect(preceding);
        const lexemeFollowing = this.infl.dontInflect(following);
        return this.phm.makeCompoundPhraseme(lexemePreceding, lexemeFollowing);
    }

    inflectEncliticE(adjectivalNoun: string, e: string) {
        const lexemeAdjective = this.infl.dontInflect(adjectivalNoun);
        const lexemeE = this.infl.inflectEncliticE(e);
        return this.phm.makeAdjectivePhraseme(lexemeAdjective, lexemeE, new Adnominal());
    }

    // inflectThree(verb: string, firstParticlee: string, secondParticle: string) {}
    // inflectPossesiveCaseMarker() {}
    // inflectEncliticLe() {}}
}

export class TonalPhrasalAssimilator {
    private readonly assimi = new TonalAssimilator();
    private readonly phmk = new TonalAssimilationPhrasemeMaker();

    assimilateAgressive(preceding: string, following: string) {
        const lxPreceding = this.assimi.getLexeme(preceding);
        const lxFollowing = this.assimi.getLexeme(following);

        return this.phmk.makePhraseme(lxPreceding, lxFollowing, new AgressiveExternal());
    }

    assimilateRegressive(preceding: string, following: string) {
        const lxPreceding = this.assimi.getLexeme(preceding);
        const lxFollowing = this.assimi.getLexeme(following);

        return this.phmk.makePhraseme(lxPreceding, lxFollowing, new RegressiveExternal());
    }
}
