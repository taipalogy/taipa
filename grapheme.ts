

import { Character, characters } from './character';

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
