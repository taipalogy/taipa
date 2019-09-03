import { characters } from '../src/character'
import { lowerLettersOfTonal } from '../src/tonal/version2'
import { list_of_lexical_roots } from '../src/tonal/lexicalroots2'

describe("Number testing", () => {
    test("Check the number of characters", () => {
      expect(characters.size).toEqual(26);
    });

    test("Check the number of letters", () => {
        expect(lowerLettersOfTonal.size).toEqual(37);
    });

    test("Check the number of lexical roots", () => {
        expect(list_of_lexical_roots.length).toEqual(2209);
    });

});