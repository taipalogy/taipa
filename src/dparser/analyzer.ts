import { GraphemeMaker, AlphabeticGrapheme } from '../grapheme';
import { Analyzer } from '../analyzer';
import { TonalCombiningMorphemeMaker, TonalCombiningMorpheme, TonalCombiningForms, AssimiDirection } from './morpheme';
import { lowerLettersOfTonal } from '../tonal/version2';
import {
    TonalSandhiLexemeMaker,
    TonalSandhiLexeme,
    TonalDesinenceInflection,
    AgressiveAssimilation,
    RegressiveAssimilation,
} from './lexeme';
import { TonalSandhiMetaplasm } from '../lexeme';
import { TonalCombiningMetaplasm } from '../morpheme';
import { TonalZeroCombining } from '../morpheme';
import { TonalSandhiPhrasemeMaker, Assimilation } from './phraseme';
import { TonalPhrasalSandhiMetaplasm } from '../phraseme';

//------------------------------------------------------------------------------

export class TonalSandhiAnalyzer extends Analyzer {
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

    lexAnalyze(ms: Array<TonalCombiningMorpheme>, tim: TonalSandhiMetaplasm): TonalSandhiLexeme {
        // lexical analysis
        let morphemes: Array<TonalCombiningMorpheme> = ms;

        const lm = new TonalSandhiLexemeMaker(tim);
        return lm.makeLexemes(morphemes);
    }
}
// TODO: add to API
export class TonalInflector {
    inflect(str: string, tcm: TonalCombiningMetaplasm, tim: TonalSandhiMetaplasm) {
        const tia = new TonalSandhiAnalyzer();
        const mrphs = tia.morphAnalyze(str, tcm);
        const lx = tia.lexAnalyze(mrphs, tim);
        return lx;
    }
}
// TODO: add to API
export class TonalAssimilator {
    assimilate(str: string, dir: AssimiDirection) {
        const tia = new TonalSandhiAnalyzer();
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
    private readonly p = new TonalSandhiPhrasemeMaker();

    analyzeTransitive(verb: string, particle: string) {
        const lexemeVerb = this.infl.inflect(verb, new TonalCombiningForms(), new TonalDesinenceInflection());
        const lexemeParticle = this.infl.inflect(particle, new TonalZeroCombining(), new TonalDesinenceInflection());
        return this.p.makeTransitivePhrasemes(lexemeVerb, lexemeParticle);
    }

    analyzeIntransitive(verb: string, particle: string) {
        const lexemeVerb = this.infl.inflect(verb, new TonalZeroCombining(), new TonalDesinenceInflection());
        const lexemeParticle = this.infl.inflect(particle, new TonalZeroCombining(), new TonalDesinenceInflection());
        return this.p.makeIntransitivePhrasemes(lexemeVerb, lexemeParticle);
    }

    analyzeAdjective(adjectivalNoun: string, e: string, metaplasm: TonalPhrasalSandhiMetaplasm) {
        const lexemeAdjective = this.infl.inflect(
            adjectivalNoun,
            new TonalZeroCombining(),
            new TonalDesinenceInflection(),
        );
        const lexemeE = this.infl.inflect(e, new TonalCombiningForms(), new TonalDesinenceInflection());
        return this.p.makeAdjectivePhrasemes(lexemeAdjective, lexemeE, metaplasm);
    }
}

export class TonalPhrasalAssimilator {
    private readonly infl = new TonalInflector();
    private readonly p = new TonalSandhiPhrasemeMaker();

    analyzeAdjective(adjectivalNoun: string, e: string, dir: AssimiDirection) {
        const lexemeAdjective = this.infl.inflect(
            adjectivalNoun,
            new TonalZeroCombining(),
            new TonalDesinenceInflection(),
        );
        const lexemeE = this.infl.inflect(e, new TonalCombiningForms(), new TonalDesinenceInflection());
        return this.p.makeAdjectivePhrasemes(lexemeAdjective, lexemeE, new Assimilation());
    }
}
