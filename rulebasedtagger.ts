
import { Word, ToneLexeme } from './lexeme'
import { SYMBOLS } from './symbols'
import { MORPH_RULES } from './morphrules';
import { IDictionary, Dictionary } from './collection'

//------------------------------------------------------------------------------
//  Patterns of Part-of-Speeches
//------------------------------------------------------------------------------

class PatternOfPartOfSpeech {
    poses: Array<string> = new Array()

    constructor(arr: Array<string>){
        for(let key in arr) {
            this.poses.push(arr[key])
        }
    }
}

interface IDictionaryOfStopWords extends IDictionary {
    //values(): PatternOfPartOfSpeech[];
    toString(): string;
}

class DictionaryOfStopWords extends Dictionary {
    constructor(init: { key: string; value: PatternOfPartOfSpeech; }[]) {
        super(init);
    }
/*
    values(): PatternOfPartOfSpeech[] {
        return this._values;
    }
*/
    toLookup(): IDictionaryOfStopWords {
        return this;
    }
}

export class Causatives {
    readonly causatives = new DictionaryOfStopWords([
        { key: 'uannw', value: new PatternOfPartOfSpeech(['verb', 'pronoun', 'verb']) },
    ]).toLookup();
}

export class Node {
    word: Word
    tag: SYMBOLS

    constructor (word: Word) {
        this.word = word;
    }
}

export class RuleBasedTagger {
    nodes: Array<Node> = new Array();
    constructor(lexemes: Array<ToneLexeme>) {

        for(let index in lexemes) {
            if(this.match(lexemes[index].word, SYMBOLS.VB)) { continue }
            if(this.match(lexemes[index].word, SYMBOLS.PRP)) { continue }
            this.nodes.push(new Node(lexemes[index].word))
        }
    }

    match(w: Word, symbol: SYMBOLS) {
        let kvps = MORPH_RULES[symbol]
        let k = Object.keys(kvps).find(key => w.literal === key )
        if(k != undefined) {
            console.log('key is ' + k)
            let n = new Node(w)
            n.tag = symbol
            this.nodes.push(n)
            return true;
        }
        return false;
    }
}