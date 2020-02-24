import { GraphemeMaker } from '../grapheme';
import { KanaUncombiningMorphemeMaker, KanaUncombiningMorpheme } from './morpheme';
import { lowerLettersKana } from './kana';
import { Analyzer } from '../analyzer';
import { AlphabeticGrapheme } from '../grapheme';
import { KanaCombiningMetaplasm } from '../morpheme';

//------------------------------------------------------------------------------

export class KanaLemmatizationAnalyzer extends Analyzer {
    graphAnalyze(str: string) {
        // graphemic analysis
        const gm = new GraphemeMaker(lowerLettersKana);
        return gm.makeGraphemes(str);
    }

    morphAnalyze(str: string): KanaUncombiningMorpheme[];
    morphAnalyze(gs: Array<AlphabeticGrapheme>): KanaUncombiningMorpheme[];
    morphAnalyze(x: string | Array<AlphabeticGrapheme>) {
        // morphological analysis
        let graphemes: Array<AlphabeticGrapheme> = [];
        if (typeof x == 'object') {
            graphemes = x;
        } else if (typeof x == 'string') {
            graphemes = this.graphAnalyze(x);
        }

        const mm = new KanaUncombiningMorphemeMaker(new KanaCombiningMetaplasm());
        return mm.makeInputingMorphemes(graphemes);
    }
}
