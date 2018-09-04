
import { ToneSandhiMorpheme  } from './morpheme'
import { ToneSandhiWords } from './lexeme'

//------------------------------------------------------------------------------
//  LexicalAnalyzer
//------------------------------------------------------------------------------

export class ToneSandhiWordTransformer {
    morphemes: Array<ToneSandhiMorpheme>;

    constructor(morphemes: Array<ToneSandhiMorpheme>) {
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    transform() {
        let ws = new ToneSandhiWords();
//        console.log(this.morphemes);
        let ls = ws.match(this.morphemes);
//        console.log(partOfSpeeches);
//        console.log(partOfSpeeches[0].word.literal);
        return ls;
    }
}
