import { GraphemeMaker, AlphabeticGrapheme } from '../grapheme';
import { Analyzer } from '../analyzer';
import { TonalCombiningMorphemeMaker, TonalCombiningMorpheme } from './morpheme';
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

    lexAnalyze(morphemes: Array<TonalCombiningMorpheme>, metaplasm: TonalInflectionMetaplasm): TonalInflectionLexeme {
        // lexical analysis
        const ms: Array<TonalCombiningMorpheme> = morphemes;

        const lm = new TonalInflectionLexemeMaker(metaplasm);
        return lm.makeLexemes(ms);
    }
}
