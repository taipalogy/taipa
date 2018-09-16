
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

//------------------------------------------------------------------------------
//  CharacterCase
//------------------------------------------------------------------------------

export let characters = new CharacterDictionary([
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
