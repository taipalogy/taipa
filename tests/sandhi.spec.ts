import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/version2';
import { TokenAnalysis } from '../src/token';

describe("Epenthesis testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('sutflay');

    test("check the consonant", () => {
        expect(doc.soundSequences[1][0].getLiteral()).toEqual(TonalLetterTags.l);
    });
});