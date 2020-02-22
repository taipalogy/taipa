import { GraphemeMaker, AlphabeticGrapheme } from '../grapheme';
import { Analyzer } from '../analyzer';
import { TonalCombiningMorphemeMaker, TonalCombiningMorpheme, TonalCombiningForms } from './morpheme';
import { lowerLettersOfTonal } from '../tonal/version2';
import { TonalInflectionLexemeMaker, TonalInflectionLexeme } from './lexeme';
import { TonalInflectionMetaplasm } from '../lexeme';
import { TonalCombiningMetaplasm } from '../morpheme';

//------------------------------------------------------------------------------

export class TonalInflectionAnalyzer extends Analyzer {
    graphAnalyze(str: string): AlphabeticGrapheme[] {
        // graphemic analysis
        const gm = new GraphemeMaker(lowerLettersOfTonal);
        return gm.makeGraphemes(str);
    }

    morphAnalyze(str: string, metaplasm: TonalCombiningMetaplasm): TonalCombiningMorpheme[];
    morphAnalyze(graphemes: Array<AlphabeticGrapheme>, metaplasm: TonalCombiningMetaplasm): TonalCombiningMorpheme[];
    morphAnalyze(x: string | Array<AlphabeticGrapheme>, metaplasm: TonalCombiningMetaplasm) {
        // morphological analysis
        let gs: AlphabeticGrapheme[] = [];
        if (typeof x == 'object') {
            gs = x;
        } else if (typeof x == 'string') {
            gs = this.graphAnalyze(x);
        }

        const mm = new TonalCombiningMorphemeMaker(metaplasm);
        return mm.makeMorphemes(gs);
    }

    lexAnalyze(str: string, metaplasm: TonalInflectionMetaplasm): TonalInflectionLexeme;
    lexAnalyze(morphemes: Array<TonalCombiningMorpheme>, metaplasm: TonalInflectionMetaplasm): TonalInflectionLexeme;
    lexAnalyze(x: string | Array<TonalCombiningMorpheme>, metaplasm: TonalInflectionMetaplasm): TonalInflectionLexeme {
        // lexical analysis
        let ms: Array<TonalCombiningMorpheme> = [];
        if (typeof x == 'object') {
            ms = x;
        } else if (typeof x == 'string') {
            ms = this.morphAnalyze(x, new TonalCombiningForms());
        }

        const lm = new TonalInflectionLexemeMaker(metaplasm);
        return lm.makeLexemes(ms);
    }
}
