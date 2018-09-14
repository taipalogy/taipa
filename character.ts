
import { IDictionary, Dictionary } from './dictionary'

interface ICharacterDictionary extends IDictionary {
    values(): Character[];
}

class CharacterDictionary extends Dictionary {
    constructor(init: { key: string; value: any; }[]) {
        super(init);
    }

    values(): Character[] {
        return this._values;
    }

    toLookup(): ICharacterDictionary {
        return this;
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

export let charactersNew = new CharacterDictionary([
    { key: 'a', value: new Character('a') },
    { key: 'b', value: new Character('b') },
    { key: 'c', value: new Character('c') },
    { key: 'd', value: new Character('d') },
    { key: 'e', value: new Character('e') },
    { key: 'f', value: new Character('f') },
    { key: 'g', value: new Character('g') },
    { key: 'h', value: new Character('h') },
    { key: 'i', value: new Character('i') },
    { key: 'j', value: new Character('j') },
    { key: 'k', value: new Character('k') },
    { key: 'l', value: new Character('l') },
    { key: 'm', value: new Character('m') },
    { key: 'n', value: new Character('n') },
    { key: 'o', value: new Character('o') },
    { key: 'p', value: new Character('p') },
    { key: 'q', value: new Character('q') },
    { key: 'r', value: new Character('r') },
    { key: 's', value: new Character('s') },
    { key: 't', value: new Character('t') },
    { key: 'u', value: new Character('u') },
    { key: 'v', value: new Character('v') },
    { key: 'w', value: new Character('w') },
    { key: 'x', value: new Character('x') },
    { key: 'y', value: new Character('y') },
    { key: 'z', value: new Character('z') },
]).toLookup();

console.log(charactersNew.keys().join(", "));