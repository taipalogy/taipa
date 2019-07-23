import { GraphemeMaker } from '../grapheme'
import { Analyzer } from '../analyzer';
import { TonalInflexionMorphemeMaker, TonalCombiningForms } from './morpheme'
import { lowerLettersOfTonal } from '../tonal/version2'
import { TonalInflexionLexemeMaker } from './lexeme'

//------------------------------------------------------------------------------
//  Tonal Lexeme Analyzer
//------------------------------------------------------------------------------

export class TonalInflextionAnalyzer extends Analyzer {
    makeLexemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str, lowerLettersOfTonal);
        let graphemes = gm.makeGraphemes()

        // Morpheme Maker
        let tmm = new TonalInflexionMorphemeMaker(graphemes, new TonalCombiningForms());
        let morphemes = tmm.makeMorphemes();

        // Lexeme Maker
        let tslm = new TonalInflexionLexemeMaker(morphemes);
        let lexemes = tslm.makeLexemes();

        return lexemes;
    }
}
