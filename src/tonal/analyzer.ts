import { Analyzer } from '../analyzer';
import { TonalBaseLexemeMaker, TonalBaseLexeme } from './lexeme';
import { AlphabeticGrapheme, GraphemeMaker } from '../grapheme';
import { lowerLettersOfTonal } from './version2';
import { TonalUncombiningMorphemeMaker, TonalUncombiningForms, TonalUncombiningMorpheme } from './morpheme';

//------------------------------------------------------------------------------

export class TonalBaseAnalyzer extends Analyzer {
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

    lexAnalyze(str: string): TonalBaseLexeme;
    lexAnalyze(ms: Array<TonalUncombiningMorpheme>): TonalBaseLexeme;
    lexAnalyze(x: string | Array<TonalUncombiningMorpheme>): TonalBaseLexeme {
        // lexical analysis
        let morphemes: Array<TonalUncombiningMorpheme> = [];
        if (typeof x == 'object') {
            morphemes = x;
        } else if (typeof x == 'string') {
            morphemes = this.morphAnalyze(x);
        }

        const lm = new TonalBaseLexemeMaker();
        return lm.makeLexemes(morphemes);
    }
}
// TODO: add to API
export class TonalLemmatizer {
    lemmatize(str: string) {
        const tia = new TonalBaseAnalyzer();
        const mrphs = tia.morphAnalyze(str);
        const lx = tia.lexAnalyze(mrphs);
        return lx;
    }
}
// TODO: add to API
class Unassimilator {
    unassimilate(str: string) {}
}
