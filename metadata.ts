import { GrammaticalUnit } from './expression';
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
        //console.log(characters.length === Metadata.NUMBER_OF_CHARACTERS);
        console.log(Object.keys(charactersNew.list).length === Metadata.NUMBER_OF_CHARACTERS);

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

    list: Array<Character>;
    constructor() {
        this.list = new Array();

        for(let key in charactersNew) {
            this.list.push(charactersNew.list[key])
        }

    }

    get length() {
        return this.list.length;
    }
}

interface CharactersNew {
    list: {
        readonly [index: string]: Character
    }
}

export let charactersNew: CharactersNew = {
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
//  Expressions
//------------------------------------------------------------------------------

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

export class Letters {
    // medial
    lowerLetterA: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['a']]);
    lowerLetterE: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['e']]);
    lowerLetterI: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['i']]);
    lowerLetterO: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['o']]);
    lowerLetterU: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['u']]);
    lowerLetterUR: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['u'], charactersNew.list['r']]);

    // initial excludes checked final and neutral final
    lowerLetterC: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['c']]);
    lowerLetterJ: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['j']]);
    lowerLetterL: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['l']]);
    lowerLetterQ: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['q']]);
    lowerLetterS: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['s']]);
    lowerLetterV: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['v']]);
    lowerLetterZ: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['z']]);

    // nasal
    lowerLetterM: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['m']]);
    lowerLetterN: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['n']]);
    lowerLetterNG: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['n'], charactersNew.list['g']]);
    lowerLetterNN: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['n'], charactersNew.list['n']]);

    // free tone mark
    lowerLetterSS: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['s'], charactersNew.list['s']]);
    lowerLetterW: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['w']]);
    lowerLetterX: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['x']]);
    lowerLetterXX: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['x'], charactersNew.list['x']]);
    lowerLetterXXX: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['x'], charactersNew.list['x'], charactersNew.list['x']]);
    lowerLetterY: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['y']]);    
    lowerLetterZS: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['z'], charactersNew.list['s']]);
    lowerLetterZZS: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['z'], charactersNew.list['z'], charactersNew.list['s']]);

    // checked tone mark and final
    lowerLetterB: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['b']]);
    lowerLetterD: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['d']]);
    lowerLetterG: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['g']]);
    lowerLetterK: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['k']]);
    lowerLetterP: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['p']]);
    lowerLetterT: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['t']]);

    // neutral final
    lowerLetterF: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['f']]);
    lowerLetterH: AlphabeticLetter = new AlphabeticLetter([charactersNew.list['h']]);
    
    list: Array<AlphabeticLetter>;
    constructor(characters: Characters) {
        this.list = new Array();

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
/*
        for(let key in lettersNew.list) {
            this.list.push(lettersNew.list[key])
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
        for(let i = 0; i < characters.length; i++) {
            //console.log("examining character: %s. length of characters: %d", characters[i].symbol, characters.length);
            //console.log("metadata letter array looping.");
            let ls: Array<AlphabeticLetter> = new Array();
            ls = this.list.filter(l => l.characters[0].symbol === characters[i].symbol);
            //console.log(ls);
            if(ls.length == 0) {
                console.log("something wrong");
            } else if(ls.length == 1) {
                //console.log(ls);
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
                    //console.log(ls);
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

interface LettersNew {
    list: {
        readonly [index: string]: AlphabeticLetter
    }
}


export let lettersNew: LettersNew = {
    list: {
        // medial
        a: new AlphabeticLetter([charactersNew.list['a']]),
        e: new AlphabeticLetter([charactersNew.list['e']]),
        i: new AlphabeticLetter([charactersNew.list['i']]),
        o: new AlphabeticLetter([charactersNew.list['o']]),
        u: new AlphabeticLetter([charactersNew.list['u']]),
        ur: new AlphabeticLetter([charactersNew.list['u'], charactersNew.list['r']]),

        // initial excludes checked final and neutral final
        c: new AlphabeticLetter([charactersNew.list['c']]),
        j: new AlphabeticLetter([charactersNew.list['j']]),
        l: new AlphabeticLetter([charactersNew.list['l']]),
        q: new AlphabeticLetter([charactersNew.list['q']]),
        s: new AlphabeticLetter([charactersNew.list['s']]),
        v: new AlphabeticLetter([charactersNew.list['v']]),
        z: new AlphabeticLetter([charactersNew.list['z']]),

        // nasal
        m: new AlphabeticLetter([charactersNew.list['m']]),
        n: new AlphabeticLetter([charactersNew.list['n']]),
        ng: new AlphabeticLetter([charactersNew.list['n'], charactersNew.list['g']]),
        nn: new AlphabeticLetter([charactersNew.list['n'], charactersNew.list['n']]),

        // free tone mark
        ss: new AlphabeticLetter([charactersNew.list['s'], charactersNew.list['s']]),
        w: new AlphabeticLetter([charactersNew.list['w']]),
        x: new AlphabeticLetter([charactersNew.list['x']]),
        xx: new AlphabeticLetter([charactersNew.list['x'], charactersNew.list['x']]),
        xxx: new AlphabeticLetter([charactersNew.list['x'], charactersNew.list['x'], charactersNew.list['x']]),
        y: new AlphabeticLetter([charactersNew.list['y']]),
        zs: new AlphabeticLetter([charactersNew.list['z'], charactersNew.list['s']]),
        zzs: new AlphabeticLetter([charactersNew.list['z'], charactersNew.list['z'], charactersNew.list['s']]),

        // checked tone mark and final
        b: new AlphabeticLetter([charactersNew.list['b']]),
        d: new AlphabeticLetter([charactersNew.list['d']]),
        g: new AlphabeticLetter([charactersNew.list['g']]),
        k: new AlphabeticLetter([charactersNew.list['k']]),
        p: new AlphabeticLetter([charactersNew.list['p']]),
        t: new AlphabeticLetter([charactersNew.list['t']]),

        // neutral final
        f: new AlphabeticLetter([charactersNew.list['f']]),
        h: new AlphabeticLetter([charactersNew.list['h']]),
    }
}

class ToneSandhi {
    //baseTone: Letter;
    //sandhiTone: Letter
    match(){}
}


