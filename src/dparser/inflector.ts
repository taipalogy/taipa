import { TonalInflectionAnalyzer } from './analyzer';
import {
    TonalCombiningForms,
    ThirdCombiningForm,
    EncliticECombining,
    PhrasalVerbParticleCombining,
    ConjunctiveLeCombining,
    PossesiveExCombining,
    NthCombining
} from './metaplasm';
import { TonalInflectionLexeme } from './lexeme';
import { TonalInflectionPhrasemeMaker } from './phraseme';
import { createTonalInflectionLexeme } from './creator';
import { TonalLetterTags } from '../tonal/version2';
import { TonalDesinenceInflection, TransfixInflection } from './metaplasm';

export class TonalInflector {
    private readonly tia = new TonalInflectionAnalyzer();

    inflectDesinence(word: string) {
        const ms = this.tia.morphAnalyze(word, new TonalCombiningForms());
        const lx = this.tia.lexAnalyze(ms, new TonalDesinenceInflection());
        return lx;
    }

    inflectTransfix(word: string) {
        const ms = this.tia.morphAnalyze(word, new ThirdCombiningForm());
        const lx = this.tia.lexAnalyze(ms, new TransfixInflection());
        return lx;
    }

    inflectEncliticE(word: string) {
        const ms = this.tia.morphAnalyze(word, new EncliticECombining());
        const lx = this.tia.lexAnalyze(ms, new TonalDesinenceInflection());
        return lx;
    }

    inflectPhrasalVerbParticle(word: string, tone: TonalLetterTags) {
        const ms = this.tia.morphAnalyze(word, new PhrasalVerbParticleCombining(tone));
        const lx = this.tia.lexAnalyze(ms, new TonalDesinenceInflection());
        return lx;
    }

    inflectEncliticLe(word: string) {
        const ms = this.tia.morphAnalyze(word, new ConjunctiveLeCombining());
        const lx = this.tia.lexAnalyze(ms, new TonalDesinenceInflection());
        return lx;
    }

    inflectPossesiveEx(word: string) {
        const ms = this.tia.morphAnalyze(word, new PossesiveExCombining());
        const lx = this.tia.lexAnalyze(ms, new TonalDesinenceInflection());
        return lx;
    }

    inflectTo(word: string, tone: TonalLetterTags) {
        const ms = this.tia.morphAnalyze(word, new NthCombining(tone));
        const lx = this.tia.lexAnalyze(ms, new TonalDesinenceInflection());
        return lx;
    }
}

export class TonalPhrasalInflector {
    private readonly infl = new TonalInflector();
    private readonly phm = new TonalInflectionPhrasemeMaker();

    inflectToProceeding(verb: string, particle: string, particleTwo?: string) {
        const lexemeVerb = this.infl.inflectDesinence(verb);
        let lxParticle: TonalInflectionLexeme = createTonalInflectionLexeme('');
        let lxParticleTwo: TonalInflectionLexeme | undefined;
        if (particleTwo) {
            if (particle === 'cut' && particleTwo === 'kih') {
                lxParticle = this.infl.inflectPhrasalVerbParticle(particle, TonalLetterTags.f);
                lxParticleTwo = this.infl.inflectPhrasalVerbParticle(particleTwo, TonalLetterTags.f);
            } else if (particle === 'kih' && particleTwo === 'laih') {
                lxParticle = this.infl.inflectPhrasalVerbParticle(particle, TonalLetterTags.f);
                lxParticleTwo = this.infl.inflectPhrasalVerbParticle(particleTwo, TonalLetterTags.z);
            }
        } else {
            if (particle === 'kih') {
                lxParticle = this.infl.inflectPhrasalVerbParticle(particle, TonalLetterTags.f);
            } else {
                lxParticle = this.infl.inflectPhrasalVerbParticle(particle, TonalLetterTags.w);
            }
        }
        if (lxParticleTwo) {
            return this.phm.makePhrasalVerbTwoPhraseme(lexemeVerb, lxParticle, lxParticleTwo);
        } else {
            return this.phm.makePhrasalVerbPhraseme(lexemeVerb, lxParticle);
        }
    }

    inflectEToAdnominal(adjectivalNoun: string, e: string) {
        const lexemeAdjective = createTonalInflectionLexeme(adjectivalNoun);
        const lexemeE = this.infl.inflectEncliticE(e);
        return this.phm.makeAdjectivePhraseme(lexemeAdjective, lexemeE);
    }

    inflectToConjunctive(verb: string, le: string) {
        const lexemeVerb = this.infl.inflectDesinence(verb);
        const lexemeLe = this.infl.inflectEncliticLe(le);
        return this.phm.makeConjunctivePhraseme(lexemeVerb, lexemeLe);
    }

    inflectPossesive(noun: string, ex: string) {
        const lexemeNoun = createTonalInflectionLexeme(noun);
        const lexemeEx = this.infl.inflectPossesiveEx(ex);
        return this.phm.makePossesivePhraseme(lexemeNoun, lexemeEx);
    }

    inflectToParticiple(verb: string, particle: string, tone: TonalLetterTags) {
        // inflect to first tone or seventh
        const lexemeVerb = this.infl.inflectTo(verb, tone);
        const lexemeParticle = this.infl.inflectTo(particle, tone);
        return this.phm.makeParticiplePhraseme(lexemeVerb, lexemeParticle);
    }

    inflectSerial(...words: string[]) {
        const lexemes = words.map(it => this.infl.inflectDesinence(it));
        return this.phm.makeSerialPhraseme(lexemes);
    }
}
