import { characters } from '../src/character';
import { lowerLettersTonal } from '../src/tonal/version2';
import { lexicalRoots } from '../src/tonal/lexicalroots2';

describe('Basic testing', () => {
    test('check the number of characters', () => {
        expect(characters.size).toEqual(26);
    });

    test('check the number of letters', () => {
        expect(lowerLettersTonal.size).toEqual(43);
    });

    test('check the number of lexical roots', () => {
        expect(lexicalRoots.length).toEqual(2209);
    });
});
