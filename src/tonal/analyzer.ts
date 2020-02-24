import { Analyzer } from '../analyzer';
import { TonalLemmatizationLexemeMaker, TonalLemmatizationLexeme } from './lexeme';
import { AlphabeticGrapheme, GraphemeMaker } from '../grapheme';
import { lowerLettersTonal } from './version2';
import { TonalUncombiningMorphemeMaker, TonalUncombiningMorpheme } from './morpheme';

//------------------------------------------------------------------------------

export class TonalLemmatizationAnalyzer extends Analyzer {
    graphAnalyze(str: string): AlphabeticGrapheme[] {
        // graphemic analysis
        const gm = new GraphemeMaker(lowerLettersTonal);
        return gm.makeGraphemes(str);
    }

    morphAnalyze(str: string): TonalUncombiningMorpheme[];
    morphAnalyze(graphemes: Array<AlphabeticGrapheme>): TonalUncombiningMorpheme[];
    morphAnalyze(x: string | Array<AlphabeticGrapheme>) {
        // morphological analysis
        let gs: AlphabeticGrapheme[] = [];
        if (typeof x == 'object') {
            gs = x;
        } else if (typeof x == 'string') {
            gs = this.graphAnalyze(x);
        }

        const mm = new TonalUncombiningMorphemeMaker();
        return mm.makeMorphemes(gs);
    }

    lexAnalyze(str: string): TonalLemmatizationLexeme;
    lexAnalyze(morphemes: Array<TonalUncombiningMorpheme>): TonalLemmatizationLexeme;
    lexAnalyze(x: string | Array<TonalUncombiningMorpheme>): TonalLemmatizationLexeme {
        // lexical analysis
        let ms: Array<TonalUncombiningMorpheme> = [];
        if (typeof x == 'object') {
            ms = x;
        } else if (typeof x == 'string') {
            ms = this.morphAnalyze(x);
        }

        const lm = new TonalLemmatizationLexemeMaker();
        return lm.makeLexemes(ms);
    }
}
