import { characters } from '../src/character';
import { lowerLettersOfTonal } from '../src/tonal/version2';
import { lexical_roots } from '../src/tonal/lexicalroots2';

describe('Basic testing', () => {
    test('check the number of characters', () => {
        expect(characters.size).toEqual(26);
    });

    test('check the number of letters', () => {
        expect(lowerLettersOfTonal.size).toEqual(44);
    });

    test('check the number of lexical roots', () => {
        expect(lexical_roots.length).toEqual(2209);
    });
});
