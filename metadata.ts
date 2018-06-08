import { GrammaticalUnit } from './expression';
import { Context } from './context';


export class Metadata {
    static readonly NUMBER_OF_CHARACTERS: number = 26;
    static readonly NUMBER_OF_LETTERS: number = 33;
    static readonly NUMBER_OF_TONEMARKLESS_SYLLABLES = 0;
    static readonly NUMBER_OF_ALLOMORPHEMIC_SYLLABLES = 0;

    constructor() {
        //let characters = new Characters();
        //console.log(characters.length === Metadata.NUMBER_OF_CHARACTERS);
        console.log(Object.keys(characters).length === Metadata.NUMBER_OF_CHARACTERS);

        //let letters = new Letters();
        //console.log(letters.length === Metadata.NUMBER_OF_LETTERS);
        console.log(Object.keys(lowerLetters).length === Metadata.NUMBER_OF_LETTERS);
    }
}

//------------------------------------------------------------------------------
//  Grapheme
//------------------------------------------------------------------------------

class Grapheme {

}

//------------------------------------------------------------------------------
//  Morpheme
//------------------------------------------------------------------------------

class Morpheme {
    baseForm: string
}

class ToneSandhiMorpheme extends Morpheme {
    sandhiRule: string
}

class CheckedToneMorpheme extends Morpheme {
    sandhiRule: string
}

class NeutralToneMorpheme extends Morpheme {
    sandhiRule: string
}

//------------------------------------------------------------------------------
//  Expressions
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Character
//------------------------------------------------------------------------------

export class Character {
    symbol: string;

    constructor(s: string) {
        this.symbol = s;
    }
}

export class Characters {

    list: Array<Character>;
    constructor() {
        this.list = new Array();

        for(let key in characters) {
            this.list.push(characters[key])
        }

    }

    get length() {
        return this.list.length;
    }
}

interface ICharacters {
    readonly [index: string]: Character

}

let characters: ICharacters = {
    a: new Character('a'),
    b: new Character('b'),
    c: new Character('c'),
    d: new Character('d'),
    e: new Character('e'),
    f: new Character('f'),
    g: new Character('g'),
    h: new Character('h'),
    i: new Character('i'),
    j: new Character('j'),
    k: new Character('k'),
    l: new Character('l'),
    m: new Character('m'),
    n: new Character('n'),
    o: new Character('o'),
    p: new Character('p'),
    q: new Character('q'),
    r: new Character('r'),
    s: new Character('s'),
    t: new Character('t'),
    u: new Character('u'),
    v: new Character('v'),
    w: new Character('w'),
    x: new Character('x'),
    y: new Character('y'),
    z: new Character('z'),
}

//------------------------------------------------------------------------------
//  Letter
//------------------------------------------------------------------------------

export class Letter extends GrammaticalUnit {
    literal: string = '';
    evaluate(context: Context){}
}

export class AlphabeticLetter extends Letter {
    characters: Array<Character>;

    constructor(characters?: Array<Character>) {
        super();
        this.characters = new Array();
        if(characters != null) {
            let len = characters.length;
            for(var i = 0; i < len; i++) {
                this.pushCharacter(characters[i]);
            }
        }
    }

    pushCharacter(c: Character){
        this.characters.push(c);
        this.literal += c.symbol;
    }
}

class AbstractLetterFactory {}

export class AlphabetFactory extends AbstractLetterFactory {}

export class Letters {
    list: Array<AlphabeticLetter>;
    constructor() {
        this.list = new Array();

        for(let key in lowerLetters) {
            this.list.push(lowerLetters[key])
        }

    }

    get length() {
        return this.list.length;
    }

    match(characters: Array<Character>) {
        
        let letters: Array<AlphabeticLetter> = new Array();
        //console.log("metadata letter array length %d. ", letters.length);
        //console.log(characters);
        let ls: Array<AlphabeticLetter> = new Array();
        for(let i = 0; i < characters.length; i++) {
            //console.log("examining character: %s. length of characters: %d", characters[i].symbol, characters.length);
            //console.log("metadata letter array looping.");
            
            ls = this.list.filter(l => l.characters[0].symbol === characters[i].symbol);

            //console.log(ls);
            if(ls.length == 0) {
                console.log("something wrong");
            } else if(ls.length == 1) {
                //console.log("just one matched. i:%d. ls[0].characters.length:%d", i, ls[0].characters.length);
                letters.push(ls.shift()); // push the matched letter
            } else if(ls.length > 1) {
                let j = 0;
                do {
                    //ls.filter(l => console.log(l.characters) );
                    //console.log(ls);
                    //console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    let atLeastJ: Array<AlphabeticLetter> = new Array();
                    atLeastJ = ls.filter(l => l.characters.length >= j+1);
                    //console.log(atLeastJ);

                    //console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    let underJ: Array<AlphabeticLetter> = new Array();
                    underJ = ls.filter(l => l.characters.length < j+1);
                    //console.log(underJ);

                    if(atLeastJ.length > 0){
                        ls = atLeastJ.filter(l => l.characters[j].symbol === characters[i+j].symbol);
                        if(ls.length > 0){
                            ;
                        } else {
                            ls = underJ;
                        }
                    }
                    
                    //console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    j++;
                    // continue looping when there are more than one results
                    // stop looping when j goes beyond the end of target
                } while(ls.length > 1 && i+j < characters.length);
                i += ls[0].characters.length-1; // skip the length-1 of characters of the found letter
                letters.push(ls.shift()); // push the matched letter
                //console.log(letters);
            }
        }
        //console.log("metadata letter array length %d", letters.length);
        //console.log(letters);
        return letters;
    }
}

interface ILetters {
    readonly [index: string]: AlphabeticLetter
}

export let lowerLetters: ILetters = {
    // medial
    'a': new AlphabeticLetter([characters['a']]),
    'e': new AlphabeticLetter([characters['e']]),
    'i': new AlphabeticLetter([characters['i']]),
    'o': new AlphabeticLetter([characters['o']]),
    'u': new AlphabeticLetter([characters['u']]),
    'ur': new AlphabeticLetter([characters['u'], characters['r']]),

    // initial excludes checked final and neutral final
    'c': new AlphabeticLetter([characters['c']]),
    'j': new AlphabeticLetter([characters['j']]),
    'l': new AlphabeticLetter([characters['l']]),
    'q': new AlphabeticLetter([characters['q']]),
    's': new AlphabeticLetter([characters['s']]),
    'v': new AlphabeticLetter([characters['v']]),
    'z': new AlphabeticLetter([characters['z']]),

    // nasal
    'm': new AlphabeticLetter([characters['m']]),
    'n': new AlphabeticLetter([characters['n']]),
    'ng': new AlphabeticLetter([characters['n'], characters['g']]),
    'nn': new AlphabeticLetter([characters['n'], characters['n']]),

    // free tone mark
    'ss': new AlphabeticLetter([characters['s'], characters['s']]),
    'w': new AlphabeticLetter([characters['w']]),
    'x': new AlphabeticLetter([characters['x']]),
    'xx': new AlphabeticLetter([characters['x'], characters['x']]),
    'xxx': new AlphabeticLetter([characters['x'], characters['x'], characters['x']]),
    'y': new AlphabeticLetter([characters['y']]),
    'zs': new AlphabeticLetter([characters['z'], characters['s']]),
    'zzs': new AlphabeticLetter([characters['z'], characters['z'], characters['s']]),
   
    // checked tone mark and final
    'b': new AlphabeticLetter([characters['b']]),
    'd': new AlphabeticLetter([characters['d']]),
    'g': new AlphabeticLetter([characters['g']]),
    'k': new AlphabeticLetter([characters['k']]),
    'p': new AlphabeticLetter([characters['p']]),
    't': new AlphabeticLetter([characters['t']]),
    
    // neutral final
    'f': new AlphabeticLetter([characters['f']]),
    'h': new AlphabeticLetter([characters['h']]),
}