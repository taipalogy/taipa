import { Analyzer } from '../analyzer';
import { TonalLemmatizationLexemeMaker, TonalLemmatizationLexeme } from './lexeme';
import { AlphabeticGrapheme, GraphemeMaker } from '../grapheme';
import { lowerLettersOfTonal } from './version2';
import { TonalUncombiningMorphemeMaker, TonalUncombiningForms, TonalUncombiningMorpheme } from './morpheme';

//------------------------------------------------------------------------------

export class TonalLemmatizationAnalyzer extends Analyzer {
    doGraphemicAnalysis(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        return gm.makeGraphemes();
    }

    doMorphologicalAnalysis(str: string): TonalUncombiningMorpheme[];
    doMorphologicalAnalysis(gs: Array<AlphabeticGrapheme>): TonalUncombiningMorpheme[];
    doMorphologicalAnalysis(x: string | Array<AlphabeticGrapheme>) {
        let graphemes: AlphabeticGrapheme[] = [];
        //let g_results
        if (typeof x == 'object') {
            graphemes = x;
        } else if (typeof x == 'string') {
            graphemes = this.doGraphemicAnalysis(x);
        }

        // Morpheme Maker
        let tmm = new TonalUncombiningMorphemeMaker(graphemes, new TonalUncombiningForms());
        return tmm.makeMorphemes();
    }

    doLexicalAnalysis(str: string): TonalLemmatizationLexeme[];
    doLexicalAnalysis(ms: Array<TonalUncombiningMorpheme>): TonalLemmatizationLexeme[];
    doLexicalAnalysis(x: string | Array<TonalUncombiningMorpheme>) {
        let morphemes: Array<TonalUncombiningMorpheme> = [];
        if (typeof x == 'object') {
            morphemes = x;
        } else if (typeof x == 'string') {
            morphemes = this.doMorphologicalAnalysis(x);
        }

        // Lexeme Maker
        let tllm = new TonalLemmatizationLexemeMaker(morphemes);
        return tllm.makeLexemes();
    }

    analyze(str: string) {
        const tilm = new TonalLemmatizationLexemeMaker(this.doMorphologicalAnalysis(str));
        return tilm.makeLexemes();
    }
}

export const tonal_lemmatization_analyzer = new TonalLemmatizationAnalyzer();
