
import { RootMorpheme  } from './morpheme'
import { ToneSandhiWords } from './lexeme'

//------------------------------------------------------------------------------
//  LexicalAnalyzer
//------------------------------------------------------------------------------

export class ToneSandhiWordTransformer {
    //syllables: Array<ToneSandhiSyllable>;
    rootMorphemes: Array<RootMorpheme>;
/*
    constructor(syllables: Array<ToneSandhiSyllable>) {
        this.syllables = new Array();
        this.syllables = syllables;
    }
*/    

    constructor(rootMorphemes: Array<RootMorpheme>) {
        this.rootMorphemes = new Array();
        this.rootMorphemes = rootMorphemes;
    }

    transform() {
        let ws = new ToneSandhiWords();
        //console.log(this.syllables);
        console.log(this.rootMorphemes);
        //let words = ws.match(this.syllables);
        let partOfSpeeches = ws.match(this.rootMorphemes);
        //console.log(words);
        //console.log(words[0].literal);
        console.log(partOfSpeeches);
        console.log(partOfSpeeches[0].word.literal);
        //return words;
        return partOfSpeeches;
    }
}
