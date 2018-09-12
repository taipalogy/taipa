
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

        for(let key in characters) {
            this.list.push(characters[key])
        }

    }

    get length() {
        return this.list.length;
    }
}

//------------------------------------------------------------------------------
//  CharacterCase
//------------------------------------------------------------------------------

export class CharacterCase {
}

class UpperCharacterCase extends CharacterCase {}
class LowerCharacterCase extends CharacterCase {}

interface ICharacters {
    readonly [index: string]: Character

}

export let characters: ICharacters = {
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
