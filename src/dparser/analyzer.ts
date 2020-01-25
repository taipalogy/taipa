import { GraphemeMaker, AlphabeticGrapheme } from '../grapheme';
import { Analyzer } from '../analyzer';
import { TonalCombiningMorphemeMaker, TonalCombiningMorpheme, TonalCombiningForms } from './morpheme';
import { lowerLettersOfTonal } from '../tonal/version2';
import { TonalInflectionLexemeMaker, TonalInflectionLexeme, TonalDesinenceInflection } from './lexeme';
import { TonalInflectingMetaplasm } from '../lexeme';
import { TonalCombiningMetaplasm } from '../morpheme';
import { TonalZeroCombining } from '../morpheme';
import { TonalInflectionPhrasemeMaker } from './phraseme';
import { TonalPhrasalInflectingMetaplasm } from '../phraseme';

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

    lexAnalyze(ms: Array<TonalCombiningMorpheme>, tim: TonalInflectingMetaplasm): TonalInflectionLexeme {
        // lexical analysis
        let morphemes: Array<TonalCombiningMorpheme> = ms;

        const lm = new TonalInflectionLexemeMaker(tim);
        return lm.makeLexemes(morphemes);
    }

    analyze(str: string, tcm: TonalCombiningMetaplasm, tim: TonalInflectingMetaplasm) {
        const lm = new TonalInflectionLexemeMaker(tim);
        return lm.makeLexemes(this.morphAnalyze(str, tcm));
    }
}

export class PhrasalInflectionAnalyzer {
    private readonly tia = new TonalInflectionAnalyzer();
    private readonly p = new TonalInflectionPhrasemeMaker();

    analyzeTransitive(verb: string, particle: string) {
        const lexemeVerb = this.tia.analyze(verb, new TonalCombiningForms(), new TonalDesinenceInflection());
        const lexemeParticle = this.tia.analyze(particle, new TonalZeroCombining(), new TonalDesinenceInflection());
        return this.p.makeTransitivePhrasemes(lexemeVerb, lexemeParticle);
    }

    analyzeIntransitive(verb: string, particle: string) {
        const lexemeVerb = this.tia.analyze(verb, new TonalZeroCombining(), new TonalDesinenceInflection());
        const lexemeParticle = this.tia.analyze(particle, new TonalZeroCombining(), new TonalDesinenceInflection());
        return this.p.makeIntransitivePhrasemes(lexemeVerb, lexemeParticle);
    }

    analyzeAdjective(adjectivalNoun: string, e: string, metaplasm: TonalPhrasalInflectingMetaplasm) {
        const lexemeAdjective = this.tia.analyze(
            adjectivalNoun,
            new TonalZeroCombining(),
            new TonalDesinenceInflection(),
        );
        const lexemeE = this.tia.analyze(e, new TonalCombiningForms(), new TonalDesinenceInflection());
        return this.p.makeAdjectivePhrasemes(lexemeAdjective, lexemeE, metaplasm);
    }
}
