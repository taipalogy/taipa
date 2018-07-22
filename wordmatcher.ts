
import { Affix,  } from './morpheme'
import { ToneSandhiWords } from './lexeme'

//------------------------------------------------------------------------------
//  LexicalAnalyzer
//------------------------------------------------------------------------------

export class ToneSandhiWordMatcher {
    //syllables: Array<ToneSandhiSyllable>;
    affixes: Array<Affix>;
/*
    constructor(syllables: Array<ToneSandhiSyllable>) {
        this.syllables = new Array();
        this.syllables = syllables;
    }
*/    

    constructor(affixes: Array<Affix>) {
        this.affixes = new Array();
        this.affixes = affixes;
    }

    match() {
        let ws = new ToneSandhiWords();
        //console.log(this.syllables);
        console.log(this.affixes);
        //let words = ws.match(this.syllables);
        let partOfSpeeches = ws.match(this.affixes);
        //console.log(words);
        //console.log(words[0].literal);
        console.log(partOfSpeeches);
        console.log(partOfSpeeches[0].word.literal);
        //return words;
        return partOfSpeeches;
    }
}
