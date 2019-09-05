import { GraphemeMaker, AlphabeticGrapheme } from '../grapheme';
import { Analyzer } from '../analyzer';
import { TonalCombiningMorphemeMaker, TonalCombiningMorpheme } from './morpheme';
import { lowerLettersOfTonal } from '../tonal/version2';
import { TonalInflexionLexemeMaker, TonalInflexionLexeme } from './lexeme';
import { TonalInflectingMetaplasm } from '../lexeme';
import { TonalCombiningMetaplasm } from '../morpheme';

//------------------------------------------------------------------------------
//  Tonal Lexeme Analyzer
//------------------------------------------------------------------------------

export class TonalInflextionAnalyzer extends Analyzer {
    doGraphemicAnalysis(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        return gm.makeGraphemes();
    }

    doMorphologicalAnalysis(str: string, tcm: TonalCombiningMetaplasm): TonalCombiningMorpheme[];
    doMorphologicalAnalysis(gs: Array<AlphabeticGrapheme>, tcm: TonalCombiningMetaplasm): TonalCombiningMorpheme[];
    doMorphologicalAnalysis(x: string | Array<AlphabeticGrapheme>, tcm: TonalCombiningMetaplasm) {
        let graphemes: AlphabeticGrapheme[] = [];
        if (typeof x == 'object') {
            graphemes = x;
        } else if (typeof x == 'string') {
            graphemes = this.doGraphemicAnalysis(x);
        }

        // Morpheme Maker
        let tmm = new TonalCombiningMorphemeMaker(graphemes, tcm);
        return tmm.makeMorphemes();
    }

    doLexicalAnalysis(ms: Array<TonalCombiningMorpheme>, tim: TonalInflectingMetaplasm): TonalInflexionLexeme[] {
        let morphemes: Array<TonalCombiningMorpheme> = ms;

        // Lexeme Maker
        let tllm = new TonalInflexionLexemeMaker(morphemes, tim);
        return tllm.makeLexemes();
    }

    doAnalysis(str: string, tcm: TonalCombiningMetaplasm, tim: TonalInflectingMetaplasm) {
        const tilm = new TonalInflexionLexemeMaker(this.doMorphologicalAnalysis(str, tcm), tim);
        return tilm.makeLexemes();
    }
}

export const tonal_inflextion_analyzer = new TonalInflextionAnalyzer();
