


import { Character } from './character';
import { Letters } from './grapheme';

//------------------------------------------------------------------------------
//  GraphemicAnalyzer
//------------------------------------------------------------------------------

export class LetterTransformer {
    characters: Array<Character>;

    constructor(l: string) {
        this.characters = new Array();
        //let str = l.replace(/\0/g, ""); // get rid of the eof character
        //l = str;
        let len = l.length;
        for(var i = 0; i < len; i++) {
            if(l.charAt(i) != '\0') {
                this.characters.push(new Character(l.charAt(i)));
            }
        }
    }
    
    transform() {
        let ls = new Letters();
        //let letters = ls.match(this.characters);
        let sounds = ls.match(this.characters);
        //console.log("%cabout to return letter array. length %d.", "color: blue; font-size: medium", letters.length);
        //console.log(letters);
        //return letters;
        return sounds;
    }
}