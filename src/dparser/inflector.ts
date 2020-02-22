import { TonalInflectionAnalyzer } from './analyzer';
import {
    TonalCombiningForms,
    ThirdCombiningForm,
    EncliticECombining,
    PhrasalVerbParticleCombining,
    ConjunctiveLeCombining,
    PossesiveExCombining
} from './morpheme';
import { TonalDesinenceInflection, TransfixInflection } from './lexeme';
import { TonalZeroCombining } from '../morpheme';
import { TonalZeroInflection } from '../lexeme';
import { TonalInflectionPhrasemeMaker } from './phraseme';

export class TonalInflector {
    private readonly tia = new TonalInflectionAnalyzer();

    inflectDesinence(str: string) {
        const ms = this.tia.morphAnalyze(str, new TonalCombiningForms());
        const lx = this.tia.lexAnalyze(ms, new TonalDesinenceInflection());
        return lx;
    }

    inflectTransfix(str: string) {
        const ms = this.tia.morphAnalyze(str, new ThirdCombiningForm());
        const lx = this.tia.lexAnalyze(ms, new TransfixInflection());
        return lx;
    }

    inflectEncliticE(str: string) {
        const ms = this.tia.morphAnalyze(str, new EncliticECombining());
        const lx = this.tia.lexAnalyze(ms, new TonalDesinenceInflection());
        return lx;
    }

    inflectPhrasalVerbParticle(str: string) {
        const ms = this.tia.morphAnalyze(str, new PhrasalVerbParticleCombining());
        const lx = this.tia.lexAnalyze(ms, new TonalDesinenceInflection());
        return lx;
    }

    dontInflect(str: string) {
        // TODO: move to creator?
        const ms = this.tia.morphAnalyze(str, new TonalZeroCombining());
        const lx = this.tia.lexAnalyze(ms, new TonalZeroInflection()); // could be replaced with TonalDesinenceInflection
        return lx;
    }

    inflectConjunctiveLe(str: string) {
        const ms = this.tia.morphAnalyze(str, new ConjunctiveLeCombining());
        const lx = this.tia.lexAnalyze(ms, new TonalDesinenceInflection());
        return lx;
    }

    inflectPossesiveEx(str: string) {
        const ms = this.tia.morphAnalyze(str, new PossesiveExCombining());
        const lx = this.tia.lexAnalyze(ms, new TonalDesinenceInflection());
        return lx;
    }
}

export class TonalPhrasalInflector {
    private readonly infl = new TonalInflector();
    private readonly phm = new TonalInflectionPhrasemeMaker();

    inflectMainVerb(verb: string, particle: string) {
        // particle has no proceeding form. no need to inflect
        const lexemeVerb = this.infl.inflectDesinence(verb);
        const lexemeParticle = this.infl.dontInflect(particle);
        return this.phm.makeTransitivePhraseme(lexemeVerb, lexemeParticle);
    }

    inflectToProceeding(verb: string, particle: string) {
        // need to inflect to first tone. tonal f is appended to particle.
        const lexemeVerb = this.infl.inflectDesinence(verb);
        const lexemeParticle = this.infl.inflectPhrasalVerbParticle(particle);
        return this.phm.makeTransitivePhraseme(lexemeVerb, lexemeParticle);
    }

    dontInflectCompound(preceding: string, following: string) {
        // TODO: move to creator?
        const lexemePreceding = this.infl.dontInflect(preceding);
        const lexemeFollowing = this.infl.dontInflect(following);
        return this.phm.makeCompoundPhraseme(lexemePreceding, lexemeFollowing);
    }

    inflectEToAdnominal(adjectivalNoun: string, e: string) {
        const lexemeAdjective = this.infl.dontInflect(adjectivalNoun);
        const lexemeE = this.infl.inflectEncliticE(e);
        return this.phm.makeAdjectivePhraseme(lexemeAdjective, lexemeE);
    }

    inflectToConjunctive(verb: string, le: string) {
        const lexemeVerb = this.infl.inflectDesinence(verb);
        const lexemeLe = this.infl.inflectConjunctiveLe(le);
        return this.phm.makeConjunctivePhraseme(lexemeVerb, lexemeLe);
    }

    inflectPossesive(noun: string, ex: string) {
        const lexemeNoun = this.infl.dontInflect(noun);
        const lexemeEx = this.infl.inflectPossesiveEx(ex);
        return this.phm.makePossesivePhraseme(lexemeNoun, lexemeEx);
    }

    inflectToParticiple(verb: string, particle: string) {}

    inflectSerialPhraseme() {}
}
