import { Analyzer } from '../analyzer';
import { TonalLemmatizationLexemeMaker, TonalLemmatizationLexeme } from './lexeme';
import { AlphabeticGrapheme, GraphemeMaker } from '../grapheme';
import { lowerLettersOfTonal } from './version2';
import { TonalUncombiningMorphemeMaker, TonalUncombiningForms, TonalUncombiningMorpheme } from './morpheme';

//------------------------------------------------------------------------------

export class TonalLemmatizationAnalyzer extends Analyzer {
    graphAnalyze(str: string): AlphabeticGrapheme[] {
        // graphemic analysis
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        return gm.makeGraphemes();
    }

    morphAnalyze(str: string): TonalUncombiningMorpheme[];
    morphAnalyze(gs: Array<AlphabeticGrapheme>): TonalUncombiningMorpheme[];
    morphAnalyze(x: string | Array<AlphabeticGrapheme>) {
        // morphological analysis
        let graphemes: AlphabeticGrapheme[] = [];
        if (typeof x == 'object') {
            graphemes = x;
        } else if (typeof x == 'string') {
            graphemes = this.graphAnalyze(x);
        }

        let tmm = new TonalUncombiningMorphemeMaker(graphemes, new TonalUncombiningForms());
        return tmm.makeMorphemes();
    }

    lexAnalyze(str: string): TonalLemmatizationLexeme;
    lexAnalyze(ms: Array<TonalUncombiningMorpheme>): TonalLemmatizationLexeme;
    lexAnalyze(x: string | Array<TonalUncombiningMorpheme>): TonalLemmatizationLexeme {
        // lexical analysis
        let morphemes: Array<TonalUncombiningMorpheme> = [];
        if (typeof x == 'object') {
            morphemes = x;
        } else if (typeof x == 'string') {
            morphemes = this.morphAnalyze(x);
        }

        let tllm = new TonalLemmatizationLexemeMaker(morphemes);
        return tllm.makeLexemes();
    }

    analyze(str: string) {
        const tilm = new TonalLemmatizationLexemeMaker(this.morphAnalyze(str));
        return tilm.makeLexemes();
    }
}