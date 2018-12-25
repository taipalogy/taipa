
//------------------------------------------------------------------------------
//  Character
//------------------------------------------------------------------------------

export class Character {
    character: string;

    constructor(s: string) {
        this.character = s;
    }
}

//------------------------------------------------------------------------------
//  CharacterCase
//------------------------------------------------------------------------------

export const characters: Map<string, Character> = new Map()
    .set('a', new Character('a'))
    .set('b', new Character('b'))
    .set('c', new Character('c'))
    .set('d', new Character('d'))
    .set('e', new Character('e'))
    .set('f', new Character('f'))
    .set('g', new Character('g'))
    .set('h', new Character('h'))
    .set('i', new Character('i'))
    .set('j', new Character('j'))
    .set('k', new Character('k'))
    .set('l', new Character('l'))
    .set('m', new Character('m'))
    .set('n', new Character('n'))
    .set('o', new Character('o'))
    .set('p', new Character('p'))
    .set('q', new Character('q'))
    .set('r', new Character('r'))
    .set('s', new Character('s'))
    .set('t', new Character('t'))
    .set('u', new Character('u'))
    .set('v', new Character('v'))
    .set('w', new Character('w'))
    .set('x', new Character('x'))
    .set('y', new Character('y'))
    .set('z', new Character('z'))