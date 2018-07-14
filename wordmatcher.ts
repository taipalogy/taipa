import { Expression } from './expression'
import { ToneSandhiSyllable, LexicalAffix } from './syllable'
import { ToneSandhiWords } from './word'

//------------------------------------------------------------------------------
//  LexicalAnalyzer
//------------------------------------------------------------------------------

export class ToneSandhiWordMatcher {
    //syllables: Array<ToneSandhiSyllable>;
    lexicalAffixes: Array<LexicalAffix>;
/*
    constructor(syllables: Array<ToneSandhiSyllable>) {
        this.syllables = new Array();
        this.syllables = syllables;
    }
*/    

    constructor(lexicalAffixes: Array<LexicalAffix>) {
        this.lexicalAffixes = new Array();
        this.lexicalAffixes = lexicalAffixes;
    }

    match() {
        let ws = new ToneSandhiWords();
        //console.log(this.syllables);
        console.log(this.lexicalAffixes);
        //let words = ws.match(this.syllables);
        let partOfSpeeches = ws.match(this.lexicalAffixes);
        //console.log(words);
        //console.log(words[0].literal);
        console.log(partOfSpeeches);
        console.log(partOfSpeeches[0].word.literal);
        //return words;
        return partOfSpeeches;
    }
}
