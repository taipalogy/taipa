import { characters } from '../src/character';
import { lowerLettersOfTonal } from '../src/tonal/version2';
import { list_of_lexical_roots } from '../src/tonal/lexicalroots2';

describe("Base testing", () => {
    test("check the number of characters", () => {
      expect(characters.size).toEqual(26);
    });

    test("check the number of letters", () => {
        expect(lowerLettersOfTonal.size).toEqual(36);
    });

    test("check the number of lexical roots", () => {
        expect(list_of_lexical_roots.length).toEqual(2209);
    });

});