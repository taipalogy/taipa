import { Operand } from './expression';
import { Context } from './context';

class Component {

}

class MyString {
    characters: Array<Character>;
    components: Array<Component>;
    //isIsometric() {}
}

export class Metadata {
    static readonly NUMBER_OF_CHARACTERS: number = 26;
    static readonly NUMBER_OF_LETTERS: number = 34;

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
//  Letter
//------------------------------------------------------------------------------

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
    lowerLetterA: Letter;
    lowerLetterB: Letter;
    lowerLetterC: Letter;
    lowerLetterD: Letter;
    lowerLetterE: Letter;
    lowerLetterF: Letter;
    lowerLetterG: Letter;
    lowerLetterH: Letter;
    lowerLetterI: Letter;
    lowerLetterJ: Letter;
    lowerLetterK: Letter;
    lowerLetterL: Letter;
    lowerLetterM: Letter;
    lowerLetterN: Letter;
    lowerLetterNG: Letter;
    lowerLetterNN: Letter;
    lowerLetterO: Letter;
    lowerLetterP: Letter;
    lowerLetterQ: Letter;
    lowerLetterR: Letter;
    lowerLetterS: Letter;
    lowerLetterSS: Letter;
    lowerLetterT: Letter;
    lowerLetterU: Letter;
    lowerLetterUR: Letter;
    lowerLetterV: Letter;
    lowerLetterW: Letter;
    lowerLetterX: Letter;
    lowerLetterXX: Letter;
    lowerLetterXXX: Letter;
    lowerLetterY: Letter;
    lowerLetterZ: Letter;
    lowerLetterZS: Letter;
    lowerLetterZZS: Letter;
    
    list: Array<Letter>;
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
        this.list.push(this.lowerLetterQ);
        this.list.push(this.lowerLetterO);
        this.list.push(this.lowerLetterP);
        this.list.push(this.lowerLetterQ);
        this.list.push(this.lowerLetterR);
        this.list.push(this.lowerLetterS);
        this.list.push(this.lowerLetterSS);
        this.list.push(this.lowerLetterT);
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


//------------------------------------------------------------------------------
//  Expressions
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Morpheme
//------------------------------------------------------------------------------

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