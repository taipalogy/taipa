import { GrammaticalUnit } from './expression';
import { Context } from './context';
import { element } from 'protractor';


export class Metadata {
    static readonly NUMBER_OF_CHARACTERS: number = 26;
    static readonly NUMBER_OF_LETTERS: number = 33;
    static readonly NUMBER_OF_TONEMARKLESS_SYLLABLES = 0;
    static readonly NUMBER_OF_ALLOMORPHEMIC_SYLLABLES = 0;

    constructor() {
        let characters = new Characters();
        console.log(characters.length === Metadata.NUMBER_OF_CHARACTERS);
        //console.log(Object.keys(characters.list).length === Metadata.NUMBER_OF_CHARACTERS);

        let letters = new Letters();
        console.log(letters.length === Metadata.NUMBER_OF_LETTERS);
        //console.log(Object.keys(letters.list).length === Metadata.NUMBER_OF_LETTERS);
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

        for(let key in characters.list) {
            this.list.push(characters.list[key])
        }

    }

    get length() {
        return this.list.length;
    }
}

interface ICharacters {
    list: {
        readonly [index: string]: Character
    }
}

let characters: ICharacters = {
    list: {
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

export class AlphabetFactory extends AbstractLetterFactory {
    createAll() {
        let ret: Array<AlphabeticLetter> = new Array();
        ret.push(this.createLowerLetterA());
        ret.push(this.createLowerLetterE());
        ret.push(this.createLowerLetterI());
        ret.push(this.createLowerLetterO());
        ret.push(this.createLowerLetterU());
        ret.push(this.createLowerLetterUR());
        ret.push(this.createLowerLetterC());
        ret.push(this.createLowerLetterJ());
        ret.push(this.createLowerLetterL());
        ret.push(this.createLowerLetterQ());
        ret.push(this.createLowerLetterS());
        ret.push(this.createLowerLetterV());
        ret.push(this.createLowerLetterZ());
        ret.push(this.createLowerLetterM());
        ret.push(this.createLowerLetterN());
        ret.push(this.createLowerLetterNG());
        ret.push(this.createLowerLetterNN());
        ret.push(this.createLowerLetterSS());
        ret.push(this.createLowerLetterW());
        ret.push(this.createLowerLetterX());
        ret.push(this.createLowerLetterXX());
        ret.push(this.createLowerLetterXXX());
        ret.push(this.createLowerLetterY());
        ret.push(this.createLowerLetterZS());
        ret.push(this.createLowerLetterZZS());
        ret.push(this.createLowerLetterB());
        ret.push(this.createLowerLetterD());
        ret.push(this.createLowerLetterG());
        ret.push(this.createLowerLetterP());
        ret.push(this.createLowerLetterT());
        ret.push(this.createLowerLetterK());
        ret.push(this.createLowerLetterF());
        ret.push(this.createLowerLetterH());
        return ret;
    }

    // medial
    createLowerLetterA() {return new AlphabeticLetter([characters.list['a']]);}
    createLowerLetterE() {return new AlphabeticLetter([characters.list['e']]);}
    createLowerLetterI() {return new AlphabeticLetter([characters.list['i']]);}
    createLowerLetterO() {return new AlphabeticLetter([characters.list['o']]);}
    createLowerLetterU() {return new AlphabeticLetter([characters.list['u']]);}
    createLowerLetterUR() {return new AlphabeticLetter([characters.list['u'], characters.list['r']]);}

    // initial excludes checked final and neutral final
    createLowerLetterC() {return new AlphabeticLetter([characters.list['c']]);}
    createLowerLetterJ() {return new AlphabeticLetter([characters.list['j']]);}
    createLowerLetterL() {return new AlphabeticLetter([characters.list['l']]);}
    createLowerLetterQ() {return new AlphabeticLetter([characters.list['q']]);}
    createLowerLetterS() {return new AlphabeticLetter([characters.list['s']]);}
    createLowerLetterV() {return new AlphabeticLetter([characters.list['v']]);}
    createLowerLetterZ() {return new AlphabeticLetter([characters.list['z']]);}
 
    // nasal
    createLowerLetterM() {return new AlphabeticLetter([characters.list['m']]);}
    createLowerLetterN() {return new AlphabeticLetter([characters.list['n']]);}
    createLowerLetterNG() {return new AlphabeticLetter([characters.list['n'], characters.list['g']]);}
    createLowerLetterNN() {return new AlphabeticLetter([characters.list['n'], characters.list['n']]);}

    // free tone mark
    createLowerLetterSS() {return new AlphabeticLetter([characters.list['s'], characters.list['s']]);}
    createLowerLetterW() {return new AlphabeticLetter([characters.list['w']]);}
    createLowerLetterX() {return new AlphabeticLetter([characters.list['x']]);}
    createLowerLetterXX() {return new AlphabeticLetter([characters.list['x'], characters.list['x']]);}
    createLowerLetterXXX() {return new AlphabeticLetter([characters.list['x'], characters.list['x'], characters.list['x']]);}
    createLowerLetterY() {return new AlphabeticLetter([characters.list['y']]);}
    createLowerLetterZS() {return new AlphabeticLetter([characters.list['z'], characters.list['s']]);}
    createLowerLetterZZS() {return new AlphabeticLetter([characters.list['z'], characters.list['z'], characters.list['s']]);}

    // checked tone mark and final
    createLowerLetterB() {return new AlphabeticLetter([characters.list['b']]);}
    createLowerLetterD() {return new AlphabeticLetter([characters.list['d']]);}
    createLowerLetterG() {return new AlphabeticLetter([characters.list['g']]);}
    createLowerLetterK() {return new AlphabeticLetter([characters.list['k']]);}
    createLowerLetterP() {return new AlphabeticLetter([characters.list['p']]);}
    createLowerLetterT() {return new AlphabeticLetter([characters.list['t']]);}

    // neutral final
    createLowerLetterF() {return new AlphabeticLetter([characters.list['f']]);}
    createLowerLetterH() {return new AlphabeticLetter([characters.list['h']]);}
}

export class Letters {
    list: Array<AlphabeticLetter>;
    constructor() {
        this.list = new Array();

        let af = new AlphabetFactory();
        let alphabet = af.createAll();
        for(let key in alphabet) {
            this.list.push(alphabet[key]);
        }
/*
        for(let key in lowerLetters.list) {
            this.list.push(lowerLetters.list[key])
        }
*/
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
