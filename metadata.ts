
import { lowerLetters } from './graphememaker'
import { characters } from './character'
import { list_of_lexical_roots } from './lexicalroots1'

export class Metadata {
    static readonly NUMBER_OF_CHARACTERS: number = 26;
    static readonly NUMBER_OF_LETTERS: number = 33;
    static readonly NUMBER_OF_ROOTS = 2209;

    constructor() {
        console.log(characters.keys().length === Metadata.NUMBER_OF_CHARACTERS);

        console.log(Object.keys(lowerLetters).length === Metadata.NUMBER_OF_LETTERS);

        console.log(list_of_lexical_roots.length === Metadata.NUMBER_OF_ROOTS);
    }
}
