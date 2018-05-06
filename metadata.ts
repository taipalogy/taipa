import { Operand } from './expression';
import { Context } from './context';
import { element } from 'protractor';

class Component {

}

class MyString {
    characters: Array<Character>;
    components: Array<Component>;
    //isIsometric() {}
}

export class Metadata {
    static readonly NUMBER_OF_CHARACTERS: number = 26;
    static readonly NUMBER_OF_LETTERS: number = 33;
    static readonly NUMBER_OF_TONEMARKLESS_SYLLABLES = 0;
    static readonly NUMBER_OF_ALLOMORPHEMIC_SYLLABLES = 0;

    constructor() {
        let characters = new Characters();
        console.log(characters.length === Metadata.NUMBER_OF_CHARACTERS);

        let letters = new Letters(characters);
        console.log(letters.length === Metadata.NUMBER_OF_LETTERS);
    }
}


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
    lowerCharacterA: Character = new Character('a');
    lowerCharacterB: Character = new Character('b');
    lowerCharacterC: Character = new Character('c');
    lowerCharacterD: Character = new Character('d');
    lowerCharacterE: Character = new Character('e');
    lowerCharacterF: Character = new Character('f');
    lowerCharacterG: Character = new Character('g');
    lowerCharacterH: Character = new Character('h');
    lowerCharacterI: Character = new Character('i');
    lowerCharacterJ: Character = new Character('j');
    lowerCharacterK: Character = new Character('k');
    lowerCharacterL: Character = new Character('l');
    lowerCharacterM: Character = new Character('m');
    lowerCharacterN: Character = new Character('n');
    lowerCharacterO: Character = new Character('o');
    lowerCharacterP: Character = new Character('p');
    lowerCharacterQ: Character = new Character('q');
    lowerCharacterR: Character = new Character('r');
    lowerCharacterS: Character = new Character('s');
    lowerCharacterT: Character = new Character('t');
    lowerCharacterU: Character = new Character('u');
    lowerCharacterV: Character = new Character('v');
    lowerCharacterW: Character = new Character('w');
    lowerCharacterX: Character = new Character('x');
    lowerCharacterY: Character = new Character('y');
    lowerCharacterZ: Character = new Character('z');

    list: Array<Character>;
    constructor() {
        this.list = new Array();
        this.list.push(this.lowerCharacterA);
        this.list.push(this.lowerCharacterB);
        this.list.push(this.lowerCharacterC);
        this.list.push(this.lowerCharacterD);
        this.list.push(this.lowerCharacterE);
        this.list.push(this.lowerCharacterF);
        this.list.push(this.lowerCharacterG);
        this.list.push(this.lowerCharacterH);
        this.list.push(this.lowerCharacterI);
        this.list.push(this.lowerCharacterJ);
        this.list.push(this.lowerCharacterK);
        this.list.push(this.lowerCharacterL);
        this.list.push(this.lowerCharacterM);
        this.list.push(this.lowerCharacterN);
        this.list.push(this.lowerCharacterO);
        this.list.push(this.lowerCharacterP);
        this.list.push(this.lowerCharacterQ);
        this.list.push(this.lowerCharacterR);
        this.list.push(this.lowerCharacterS);
        this.list.push(this.lowerCharacterT);
        this.list.push(this.lowerCharacterU);
        this.list.push(this.lowerCharacterV);
        this.list.push(this.lowerCharacterW);
        this.list.push(this.lowerCharacterX);
        this.list.push(this.lowerCharacterY);
        this.list.push(this.lowerCharacterZ);
    }

    get length() {
        return this.list.length;
    }
}

//------------------------------------------------------------------------------
//  Expressions
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Letter
//------------------------------------------------------------------------------

export class Letter extends Operand {
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

export class Letters {
    lowerLetterA: AlphabeticLetter;
    lowerLetterB: AlphabeticLetter;
    lowerLetterC: AlphabeticLetter;
    lowerLetterD: AlphabeticLetter;
    lowerLetterE: AlphabeticLetter;
    lowerLetterF: AlphabeticLetter;
    lowerLetterG: AlphabeticLetter;
    lowerLetterH: AlphabeticLetter;
    lowerLetterI: AlphabeticLetter;
    lowerLetterJ: AlphabeticLetter;
    lowerLetterK: AlphabeticLetter;
    lowerLetterL: AlphabeticLetter;
    lowerLetterM: AlphabeticLetter;
    lowerLetterN: AlphabeticLetter;
    lowerLetterNG: AlphabeticLetter;
    lowerLetterNN: AlphabeticLetter;
    lowerLetterO: AlphabeticLetter;
    lowerLetterP: AlphabeticLetter;
    lowerLetterQ: AlphabeticLetter;
    lowerLetterS: AlphabeticLetter;
    lowerLetterSS: AlphabeticLetter;
    lowerLetterT: AlphabeticLetter;
    lowerLetterU: AlphabeticLetter;
    lowerLetterUR: AlphabeticLetter;
    lowerLetterV: AlphabeticLetter;
    lowerLetterW: AlphabeticLetter;
    lowerLetterX: AlphabeticLetter;
    lowerLetterXX: AlphabeticLetter;
    lowerLetterXXX: AlphabeticLetter;
    lowerLetterY: AlphabeticLetter;
    lowerLetterZ: AlphabeticLetter;
    lowerLetterZS: AlphabeticLetter;
    lowerLetterZZS: AlphabeticLetter;
    
    list: Array<AlphabeticLetter>;
    constructor(characters: Characters) {
        this.list = new Array();

        // medial
        this.lowerLetterA = new AlphabeticLetter([characters.lowerCharacterA]);
        this.lowerLetterE = new AlphabeticLetter([characters.lowerCharacterE]);
        this.lowerLetterI = new AlphabeticLetter([characters.lowerCharacterI]);
        this.lowerLetterO = new AlphabeticLetter([characters.lowerCharacterO]);
        this.lowerLetterU = new AlphabeticLetter([characters.lowerCharacterU]);
        this.lowerLetterUR = new AlphabeticLetter([characters.lowerCharacterU, characters.lowerCharacterR]);

        // initial excludes checked final and neutral final
        this.lowerLetterC = new AlphabeticLetter([characters.lowerCharacterC]);
        this.lowerLetterJ = new AlphabeticLetter([characters.lowerCharacterJ]);
        this.lowerLetterL = new AlphabeticLetter([characters.lowerCharacterL]);
        this.lowerLetterQ = new AlphabeticLetter([characters.lowerCharacterQ]);
        this.lowerLetterS = new AlphabeticLetter([characters.lowerCharacterS]);
        this.lowerLetterV = new AlphabeticLetter([characters.lowerCharacterV]);
        this.lowerLetterZ = new AlphabeticLetter([characters.lowerCharacterZ]);

        // nasal
        this.lowerLetterM = new AlphabeticLetter([characters.lowerCharacterM]);
        this.lowerLetterN = new AlphabeticLetter([characters.lowerCharacterN]);
        this.lowerLetterNG = new AlphabeticLetter([characters.lowerCharacterN, characters.lowerCharacterG]);
        this.lowerLetterNN = new AlphabeticLetter([characters.lowerCharacterN, characters.lowerCharacterN]);

        // free tone mark
        this.lowerLetterSS = new AlphabeticLetter([characters.lowerCharacterS, characters.lowerCharacterS]);
        this.lowerLetterW = new AlphabeticLetter([characters.lowerCharacterW]);
        this.lowerLetterX = new AlphabeticLetter([characters.lowerCharacterX]);
        this.lowerLetterXX = new AlphabeticLetter([characters.lowerCharacterX, characters.lowerCharacterX]);
        this.lowerLetterXXX = new AlphabeticLetter([characters.lowerCharacterX, characters.lowerCharacterX, characters.lowerCharacterX]);
        this.lowerLetterY = new AlphabeticLetter([characters.lowerCharacterY]);
        this.lowerLetterZS = new AlphabeticLetter([characters.lowerCharacterZ, characters.lowerCharacterS]);
        this.lowerLetterZZS = new AlphabeticLetter([characters.lowerCharacterZ, characters.lowerCharacterZ, characters.lowerCharacterS]);
        
        // checked tone mark and final
        this.lowerLetterB = new AlphabeticLetter([characters.lowerCharacterB]);
        this.lowerLetterD = new AlphabeticLetter([characters.lowerCharacterD]);
        this.lowerLetterG = new AlphabeticLetter([characters.lowerCharacterG]);
        this.lowerLetterK = new AlphabeticLetter([characters.lowerCharacterK]);
        this.lowerLetterP = new AlphabeticLetter([characters.lowerCharacterP]);
        this.lowerLetterT = new AlphabeticLetter([characters.lowerCharacterT]);

        // neutral final
        this.lowerLetterF = new AlphabeticLetter([characters.lowerCharacterF]);
        this.lowerLetterH = new AlphabeticLetter([characters.lowerCharacterH]);

        this.list.push(this.lowerLetterA);
        this.list.push(this.lowerLetterB);
        this.list.push(this.lowerLetterC);
        this.list.push(this.lowerLetterD);
        this.list.push(this.lowerLetterE);
        this.list.push(this.lowerLetterF);
        this.list.push(this.lowerLetterG);
        this.list.push(this.lowerLetterH);
        this.list.push(this.lowerLetterI);
        this.list.push(this.lowerLetterJ);
        this.list.push(this.lowerLetterK);
        this.list.push(this.lowerLetterL);
        this.list.push(this.lowerLetterM);
        this.list.push(this.lowerLetterN);
        this.list.push(this.lowerLetterNG);
        this.list.push(this.lowerLetterNN);
        this.list.push(this.lowerLetterO);
        this.list.push(this.lowerLetterP);
        this.list.push(this.lowerLetterQ);
        this.list.push(this.lowerLetterS);
        this.list.push(this.lowerLetterSS);
        this.list.push(this.lowerLetterT);
        this.list.push(this.lowerLetterU);
        this.list.push(this.lowerLetterUR);
        this.list.push(this.lowerLetterV);
        this.list.push(this.lowerLetterW);
        this.list.push(this.lowerLetterX);
        this.list.push(this.lowerLetterXX);
        this.list.push(this.lowerLetterXXX);
        this.list.push(this.lowerLetterY);
        this.list.push(this.lowerLetterZ);
        this.list.push(this.lowerLetterZS);
        this.list.push(this.lowerLetterZZS);
    }

    get length() {
        return this.list.length;
    }
/*
    select(arr: Array<AlphabeticLetter>, begin: number, end?: number) {
        let selected: Array<AlphabeticLetter> = new Array();
        if(end != null) {
            for(let elem in arr) {
                if(elem.)
            }
        }
        return selected;
    }
*/
    match(characters: Array<Character>) {
        
        let letters: Array<AlphabeticLetter> = new Array();
        console.log("metadata letter array length %d. ", letters.length);
        console.log(characters);
        for(let i = 0; i < characters.length; i++) {
            console.log("metadata letter array looping.");
            let ls = new Array();
            ls = this.list.filter(l => l.characters[0].symbol === characters[i].symbol);
            console.log(ls);
            if(ls.length == 0) {
                console.log("something wrong");
            } else if(ls.length == 1) {
                console.log(ls);
                letters.push(ls.shift()); // push the matched letter
            } else if(ls.length > 1) {
                let j = 0;
                do {
                    //ls.filter(l => console.log(l.characters) );
                    console.log(ls);
                    console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    let atLeastJ = new Array();
                    atLeastJ = ls.filter(l => l.characters.length >= j+1);
                    console.log(atLeastJ);

                    console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    let underJ = new Array();
                    underJ = ls.filter(l => l.characters.length < j+1);
                    console.log(underJ);

                    if(atLeastJ.length > 0){
                        ls = atLeastJ.filter(l => l.characters[j].symbol === characters[i+j].symbol);
                        if(ls.length > 0){
                            ;
                        } else {
                            ls = underJ;
                        }
                    }
                    
                    console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    j++;
                    console.log(ls);
                    // continue looping when there are more than one results
                    // stop looping when j goes beyond the end of target
                } while(ls.length > 1 && i+j < characters.length);
                i += j; // skip j characters
                letters.push(ls.shift()); // push the matched letter
                console.log(letters);
            }
        }
        console.log("metadata letter array length %d", letters.length);
        console.log(letters);
        return letters;
    }
}


class ToneSandhi {
    //baseTone: Letter;
    //sandhiTone: Letter
    match(){}
}


//------------------------------------------------------------------------------
//  Syllable
//------------------------------------------------------------------------------

class Accent {
    evaluate(){}
}

export class Syllable extends Operand {
    literal: string = '';
    evaluate(context: Context){}
}

export class ToneSandhiSyllable extends Syllable {
    letters: Array<AlphabeticLetter>;

    constructor(letters?: Array<AlphabeticLetter>) {
        super();
        this.letters = new Array();
    }

    isBaseForm() {
        // look up in the lexicon to check if this syllable is in base form
    }

    get Stem() { return ''; }
    get Suffix() { return ''; }

    pushLetter(g: AlphabeticLetter) {
        this.letters.push(g);
        this.literal += g.literal;
    }
}