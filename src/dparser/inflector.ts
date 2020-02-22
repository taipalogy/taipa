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
import { TonalCreator } from './creator';

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
    private readonly crt = new TonalCreator();

    inflectMainVerb(verb: string, particle: string) {
        // particle has no proceeding form. no need to inflect
        const lexemeVerb = this.infl.inflectDesinence(verb);
        const lexemeParticle = this.crt.createLexeme(particle);
        return this.phm.makePhrasalVerbPhraseme(lexemeVerb, lexemeParticle);
    }

    inflectToProceeding(verb: string, particle: string) {
        // need to inflect to first tone. tonal f is appended to particle.
        const lexemeVerb = this.infl.inflectDesinence(verb);
        const lexemeParticle = this.infl.inflectPhrasalVerbParticle(particle);
        return this.phm.makePhrasalVerbPhraseme(lexemeVerb, lexemeParticle);
    }

    inflectEToAdnominal(adjectivalNoun: string, e: string) {
        const lexemeAdjective = this.crt.createLexeme(adjectivalNoun);
        const lexemeE = this.infl.inflectEncliticE(e);
        return this.phm.makeAdjectivePhraseme(lexemeAdjective, lexemeE);
    }

    inflectToConjunctive(verb: string, le: string) {
        const lexemeVerb = this.infl.inflectDesinence(verb);
        const lexemeLe = this.infl.inflectConjunctiveLe(le);
        return this.phm.makeConjunctivePhraseme(lexemeVerb, lexemeLe);
    }

    inflectPossesive(noun: string, ex: string) {
        const lexemeNoun = this.crt.createLexeme(noun);
        const lexemeEx = this.infl.inflectPossesiveEx(ex);
        return this.phm.makePossesivePhraseme(lexemeNoun, lexemeEx);
    }

    inflectToParticiple(verb: string, particle: string) {}

    inflectSerialPhraseme() {}
}
