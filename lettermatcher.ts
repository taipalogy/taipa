


import { Character } from './metadata';
import { Letters } from './metadata';

//------------------------------------------------------------------------------
//  GraphemicAnalyzer
//------------------------------------------------------------------------------

export class LetterMatcher {
    characters: Array<Character>;

    constructor(l: string) {
        this.characters = new Array();
        let str = l.replace(/\0/g, ""); // get rid of the eof character
        //l = str;
        let len = str.length;
        for(var i = 0; i < len; i++) {
            this.characters.push(new Character(str.charAt(i)));
        }
    }
    
    analyze() {
        let ls = new Letters();
        let letters = ls.match(this.characters);
        //console.log("%cabout to return letter array. length %d.", "color: blue; font-size: medium", letters.length);
        //console.log(letters);
        return letters;
    }
}