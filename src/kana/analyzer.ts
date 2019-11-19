import { GraphemeMaker } from '../grapheme';
import { KanaUncombiningMorphemeMaker, KanaUncombiningMorpheme } from './morpheme';
import { lowerLettersOfKana } from './kana';
import { Analyzer } from '../analyzer';
import { AlphabeticGrapheme } from '../grapheme';
import { KanaCombiningMetaplasm } from '../morpheme';

//------------------------------------------------------------------------------
//  Kana Analyxer
//------------------------------------------------------------------------------

export class KanaAnalyzer extends Analyzer {
    graphAnalyze(str: string) {
        // graphemic analysis
        let gm = new GraphemeMaker(str, lowerLettersOfKana);
        return gm.makeGraphemes();
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

        let kimm = new KanaUncombiningMorphemeMaker(graphemes, new KanaCombiningMetaplasm());
        return kimm.makeInputingMorphemes();
    }
}
