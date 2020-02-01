import { GraphemeMaker, AlphabeticGrapheme } from '../grapheme';
import { Analyzer } from '../analyzer';
import {
    TonalCombiningMorphemeMaker,
    TonalCombiningMorpheme,
    TonalCombiningForms,
    AssimiDirection,
    EncliticECombining,
    ParticleKihCombining,
} from './morpheme';
import { lowerLettersOfTonal } from '../tonal/version2';
import {
    TonalInflectionLexemeMaker,
    TonalInflectionLexeme,
    TonalDesinenceInflection,
    AgressiveAssimilation,
    RegressiveAssimilation,
} from './lexeme';
import { TonalInflectionMetaplasm, TonalZeroInflection } from '../lexeme';
import { TonalCombiningMetaplasm, TonalZeroCombining } from '../morpheme';
import { TonalInflectionPhrasemeMaker, Assimilation } from './phraseme';
import { TonalPhrasalInflectionMetaplasm } from '../phraseme';

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
// TODO: add to API
export class TonalInflector {
    inflect(str: string, tcm: TonalCombiningMetaplasm, tim: TonalInflectionMetaplasm) {
        const tia = new TonalInflectionAnalyzer();
        const mrphs = tia.morphAnalyze(str, tcm);
        const lx = tia.lexAnalyze(mrphs, tim);
        return lx;
    }
}
// TODO: add to API
export class TonalAssimilator {
    assimilate(str: string, dir: AssimiDirection) {
        const tia = new TonalInflectionAnalyzer();
        const mrphs = tia.morphAnalyze(str, new TonalZeroCombining());
        let lx;
        if (dir === AssimiDirection.agressive) {
            lx = tia.lexAnalyze(mrphs, new AgressiveAssimilation());
        } else {
            lx = tia.lexAnalyze(mrphs, new RegressiveAssimilation());
        }
        return lx;
    }
}

export class TonalPhrasalInflector {
    private readonly infl = new TonalInflector();
    private readonly phm = new TonalInflectionPhrasemeMaker();

    analyzeTransitive(verb: string, particle: string) {
        const lexemeVerb = this.infl.inflect(verb, new TonalCombiningForms(), new TonalDesinenceInflection());
        const lexemeParticle = this.infl.inflect(particle, new TonalZeroCombining(), new TonalDesinenceInflection());
        let lxParticle: TonalInflectionLexeme;
        if (particle === 'kih') {
            lxParticle = this.infl.inflect(particle, new ParticleKihCombining(), new TonalDesinenceInflection());
        }
        return this.phm.makeTransitivePhraseme(lexemeVerb, lexemeParticle);
    }

    analyzeIntransitive(verb: string, particle: string) {
        const lexemeVerb = this.infl.inflect(verb, new TonalZeroCombining(), new TonalDesinenceInflection());
        const lexemeParticle = this.infl.inflect(particle, new TonalZeroCombining(), new TonalDesinenceInflection());
        return this.phm.makeIntransitivePhraseme(lexemeVerb, lexemeParticle);
    }

    analyzeAdjective(adjectivalNoun: string, e: string, metaplasm: TonalPhrasalInflectionMetaplasm) {
        const lexemeAdjective = this.infl.inflect(
            adjectivalNoun,
            new TonalZeroCombining(),
            new TonalDesinenceInflection(),
        );
        const lexemeE = this.infl.inflect(e, new EncliticECombining(), new TonalDesinenceInflection());
        return this.phm.makeAdjectivePhraseme(lexemeAdjective, lexemeE, metaplasm);
    }
}

export class TonalPhrasalAssimilator {
    private readonly infl = new TonalInflector();
    private readonly phm = new TonalInflectionPhrasemeMaker();

    analyzeAdjective(adjectivalNoun: string, e: string, dir: AssimiDirection) {
        const lexemeAdjective = this.infl.inflect(
            adjectivalNoun,
            new TonalZeroCombining(),
            new TonalDesinenceInflection(),
        );
        const lexemeE = this.infl.inflect(e, new TonalZeroCombining(), new TonalZeroInflection());
        return this.phm.makeAdjectivePhraseme(lexemeAdjective, lexemeE, new Assimilation());
    }
}
