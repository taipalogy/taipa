import { GraphemeMaker, AlphabeticGrapheme } from '../grapheme';
import { Analyzer } from '../analyzer';
import { TonalCombiningMorphemeMaker, TonalCombiningMorpheme, TonalCombiningForms } from './morpheme';
import { lowerLettersOfTonal } from '../tonal/version2';
import { TonalInflexionLexemeMaker, TonalInflexionLexeme, TonalDesinenceInflexion } from './lexeme';
import { TonalInflectingMetaplasm } from '../lexeme';
import { TonalCombiningMetaplasm } from '../morpheme';
import { TonalZeroCombining } from './keywords';
import { TonalInflexionPhrasemeMaker } from './phraseme';

//------------------------------------------------------------------------------

export class TonalInflextionAnalyzer extends Analyzer {
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

    lexAnalyze(ms: Array<TonalCombiningMorpheme>, tim: TonalInflectingMetaplasm): TonalInflexionLexeme {
        // lexical analysis
        let morphemes: Array<TonalCombiningMorpheme> = ms;

        const lm = new TonalInflexionLexemeMaker(tim);
        return lm.makeLexemes(morphemes);
    }

    analyze(str: string, tcm: TonalCombiningMetaplasm, tim: TonalInflectingMetaplasm) {
        const lm = new TonalInflexionLexemeMaker(tim);
        return lm.makeLexemes(this.morphAnalyze(str, tcm));
    }
}

export class PhrasalVerbAnalyzer {
    private readonly tia = new TonalInflextionAnalyzer();
    private readonly p = new TonalInflexionPhrasemeMaker();
    analyze(verb: string, particle: string) {
        const lexemeVerb = this.tia.analyze(verb, new TonalCombiningForms(), new TonalDesinenceInflexion());
        const lexemeParticle = this.tia.analyze(particle, new TonalZeroCombining(), new TonalDesinenceInflexion());
        return this.p.makePhrasemes(lexemeVerb, lexemeParticle);
    }

    analyzeTerminalForm(verb: string, particle: string) {
        const lexemeVerb = this.tia.analyze(verb, new TonalZeroCombining(), new TonalDesinenceInflexion());
        const lexemeParticle = this.tia.analyze(particle, new TonalZeroCombining(), new TonalDesinenceInflexion());
        return this.p.makePhrasemes(lexemeVerb, lexemeParticle);
    }
}
