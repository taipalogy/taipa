


import { Character } from './character';
import { Letters } from './grapheme';

//------------------------------------------------------------------------------
//  GraphemicAnalyzer
//------------------------------------------------------------------------------

export class LetterWrapper {
    characters: Array<Character>;

    constructor(l: string) {
        this.characters = new Array();
        let len = l.length;
        for(var i = 0; i < len; i++) {
            if(l.charAt(i) != '\0') {
                this.characters.push(new Character(l.charAt(i)));
            }
        }
    }
    
    transform() {
        let ls = new Letters();
        let graphemes = ls.match(this.characters);
        return graphemes;
    }
}