
import { ToneSandhiMorpheme  } from './morpheme'
import { ToneSandhiWords } from './lexeme'

//------------------------------------------------------------------------------
//  LexicalAnalyzer
//------------------------------------------------------------------------------

export class ToneSandhiLexemeMaker {
    morphemes: Array<ToneSandhiMorpheme>;

    constructor(morphemes: Array<ToneSandhiMorpheme>) {
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    makeLexeme() {
        let ws = new ToneSandhiWords();
//        console.log(this.morphemes);
        let lexemes = ws.process(this.morphemes);
//        console.log(partOfSpeeches);
//        console.log(partOfSpeeches[0].word.literal);
        return lexemes;
    }
}
