import { Expression } from './expression'
import { ToneSandhiSyllable } from './syllable'
import { ToneSandhiWords } from './word'

//------------------------------------------------------------------------------
//  LexicalAnalyzer
//------------------------------------------------------------------------------

export class ToneSandhiLexicalAnalyzer {
    syllables: Array<ToneSandhiSyllable>;

    constructor(syllables: Array<ToneSandhiSyllable>) {
        this.syllables = syllables;
    }
    
    analyze() {
        let ws = new ToneSandhiWords();
        console.log(this.syllables);
        let words = ws.match(this.syllables);
        console.log(words);
        console.log(words[0].literal);
        return words;
    }
}
