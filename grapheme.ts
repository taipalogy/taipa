

import { Character, characters } from './character';

//------------------------------------------------------------------------------
//  Sound
//------------------------------------------------------------------------------

export class Sound {
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
}

