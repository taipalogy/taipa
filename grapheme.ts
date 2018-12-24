

import { Character, characters } from './character';

//------------------------------------------------------------------------------
//  Sound
//------------------------------------------------------------------------------

export class Sound {
    name: string
    // an array of character objects. can be used to make a word object.
    characters: Array<Character> = null

    // we still need a method for combinning characters from each character objects.
    // this is different from an array of character objects. it is a string.
    getLiteral() {
        let l: string = '';
        // there is no characters for 1st tone
        if(this.characters != null) {
            // when it is not 1st tone
            for(let k in this.characters) {
                l += this.characters[k].character;
            }
        }

        return l;
    }
}

//------------------------------------------------------------------------------
//  Grapheme
//------------------------------------------------------------------------------

class Grapheme {}

export class AlphabeticGrapheme extends Grapheme {
    letter: AlphabeticLetter
    
    constructor(letter?: AlphabeticLetter) {
        super();
        this.letter = letter;
    }
}

//------------------------------------------------------------------------------
//  Letter
//------------------------------------------------------------------------------

export class Letter {
    literal: string = '';
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
        this.literal += c.character;
    }
}

export class MatchedSequence {
    characters: Array<Character> = new Array();
    get matchedLength() { return this.characters.length; }
    toString() {
        let str = ''
        for(let i in this.characters) {
            str += this.characters[i].character
        }
        return str
    }
}


//------------------------------------------------------------------------------
//  Alphabet
//------------------------------------------------------------------------------

interface ILetters {
    readonly [index: string]: AlphabeticLetter
}

export let lowerLetters: ILetters = {
    // medials
    'a': new AlphabeticLetter([characters.get('a')]),
    'e': new AlphabeticLetter([characters.get('e')]),
    'i': new AlphabeticLetter([characters.get('i')]),
    'o': new AlphabeticLetter([characters.get('o')]),
    'u': new AlphabeticLetter([characters.get('u')]),
    'ur': new AlphabeticLetter([characters.get('u'), characters.get('r')]),

    // initials excludes checked finals and neutral finals
    'c': new AlphabeticLetter([characters.get('c')]),
    'j': new AlphabeticLetter([characters.get('j')]),
    'l': new AlphabeticLetter([characters.get('l')]),
    'q': new AlphabeticLetter([characters.get('q')]),
    's': new AlphabeticLetter([characters.get('s')]),
    'v': new AlphabeticLetter([characters.get('v')]),
    'z': new AlphabeticLetter([characters.get('z')]),

    // initials, medial, and nasal finals
    'm': new AlphabeticLetter([characters.get('m')]),
    'n': new AlphabeticLetter([characters.get('n')]),
    'ng': new AlphabeticLetter([characters.get('n'), characters.get('g')]),
    
    // nasal
    'nn': new AlphabeticLetter([characters.get('n'), characters.get('n')]),

    // free tone marks
    'ss': new AlphabeticLetter([characters.get('s'), characters.get('s')]),
    'w': new AlphabeticLetter([characters.get('w')]),
    'xx': new AlphabeticLetter([characters.get('x'), characters.get('x')]),
    'xxx': new AlphabeticLetter([characters.get('x'), characters.get('x'), characters.get('x')]),
    'zs': new AlphabeticLetter([characters.get('z'), characters.get('s')]),
    'zzs': new AlphabeticLetter([characters.get('z'), characters.get('z'), characters.get('s')]),

    // free tone mark, checked tone mark
    'x': new AlphabeticLetter([characters.get('x')]),

    // free tone mark, neutral tone mark
    'y': new AlphabeticLetter([characters.get('y')]),

    // initials, stop finals, and checked tone marks
    'b': new AlphabeticLetter([characters.get('b')]),
    'd': new AlphabeticLetter([characters.get('d')]),
    'g': new AlphabeticLetter([characters.get('g')]),
    'k': new AlphabeticLetter([characters.get('k')]),
    'p': new AlphabeticLetter([characters.get('p')]),
    't': new AlphabeticLetter([characters.get('t')]),
    
    // neutral final
    'f': new AlphabeticLetter([characters.get('f')]),

    // initial and neutral final
    'h': new AlphabeticLetter([characters.get('h')]),
}

let ziangLetters: ILetters = {
    // medial
    'ee': new AlphabeticLetter([characters.get('e'), characters.get('e')]),
    'or': new AlphabeticLetter([characters.get('o'), characters.get('r')]),
}

let zuanxLetters: ILetters = {
    // medial
    'er': new AlphabeticLetter([characters.get('e'), characters.get('r')]),
    'ir': new AlphabeticLetter([characters.get('i'), characters.get('r')]),
}

let consonantLetters: ILetters = {
    // voiced d
    'dr': new AlphabeticLetter([characters.get('d'), characters.get('r')]),
}
