
import { Word, ToneLexeme, ToneSandhiWord } from './lexeme'
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
    toString(): string;
}

class DictionaryOfStopWords extends Dictionary {
    constructor(init: { key: string; value: PatternOfPartOfSpeech; }[]) {
        super(init);
    }

    toLookup(): IDictionaryOfStopWords {
        return this;
    }
}

export class Causatives {
    readonly causatives = new DictionaryOfStopWords([
        { key: 'uannw', value: new PatternOfPartOfSpeech([SYMBOLS.VB, SYMBOLS.PRP, SYMBOLS.VB]) },
        { key: 'uannw', value: new PatternOfPartOfSpeech([SYMBOLS.VB, SYMBOLS.PRP]) },
    ]).toLookup();
}

export class Ditransitives {
    readonly ditransitives = new DictionaryOfStopWords([
        { key: 'hingzs', value: new PatternOfPartOfSpeech([SYMBOLS.VB, SYMBOLS.PRP, SYMBOLS.NN]) },
    ]).toLookup();
}

class MatchedPattern {
    words: Array<ToneSandhiWord> = new Array();
    pattern: Array<PatternOfPartOfSpeech> = new Array();
    get matchedLength() { return this.pattern.length; }
}

export class Node {
    word: Word
    tag: SYMBOLS
}

export class RuleBasedTagger {
    nodes: Array<Node> = new Array();
    constructor(lexemes: Array<ToneLexeme>) {
        this.match(lexemes[0].word)
    }

    match(w: Word) {
        for(let s in MORPH_RULES) {
            let kvps = MORPH_RULES[s]
            let k = Object.keys(kvps).find(key => w.literal === key )
            if(k != undefined) {
                console.log('key is ' + k)
                console.log('type is ' + kvps[k].Type)
                return true;
            }
        }
        return false;
    }
}