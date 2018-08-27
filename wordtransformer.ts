
import { ToneSandhiMorpheme  } from './morpheme'
import { ToneSandhiWords } from './lexeme'

//------------------------------------------------------------------------------
//  LexicalAnalyzer
//------------------------------------------------------------------------------

export class ToneSandhiWordTransformer {
    //syllables: Array<ToneSandhiSyllable>;
    morphemes: Array<ToneSandhiMorpheme>;
/*
    constructor(syllables: Array<ToneSandhiSyllable>) {
        this.syllables = new Array();
        this.syllables = syllables;
    }
*/    

    constructor(morphemes: Array<ToneSandhiMorpheme>) {
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    transform() {
        let ws = new ToneSandhiWords();
        //console.log(this.syllables);
        console.log(this.morphemes);
        //let words = ws.match(this.syllables);
        let partOfSpeeches = ws.match(this.morphemes);
        //console.log(words);
        //console.log(words[0].literal);
        console.log(partOfSpeeches);
        console.log(partOfSpeeches[0].word.literal);
        //return words;
        return partOfSpeeches;
    }
}
