import { Analyzer } from '../analyzer';
import { TonalLemmatizationLexemeMaker, TonalLemmatizationLexeme } from './lexeme';
import { AlphabeticGrapheme, GraphemeMaker } from '../grapheme';
import { lowerLettersOfTonal } from './version2';
import { TonalUncombiningMorphemeMaker, TonalUncombiningForms, TonalUncombiningMorpheme } from './morpheme';

//------------------------------------------------------------------------------

export class TonalLemmatizationAnalyzer extends Analyzer {
    graphAnalyze(str: string): AlphabeticGrapheme[] {
        // graphemic analysis
        const gm = new GraphemeMaker(lowerLettersOfTonal);
        return gm.makeGraphemes(str);
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

        const mm = new TonalUncombiningMorphemeMaker(new TonalUncombiningForms());
        return mm.makeMorphemes(graphemes);
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

        const lm = new TonalLemmatizationLexemeMaker();
        return lm.makeLexemes(morphemes);
    }

    analyze(str: string) {
        const lm = new TonalLemmatizationLexemeMaker();
        return lm.makeLexemes(this.morphAnalyze(str));
    }
}
