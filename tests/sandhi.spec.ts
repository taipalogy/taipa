import { Client } from '../src/client';
import { Document } from '../src/document';
import { TonalLetterTags } from '../src/tonal/version2';

describe("Epenthesis testing", () => {
    let cli = new Client()
    let doc = new Document()

    doc = cli.processTonal('sutflay');

    test("check the consonant", () => {
        expect(doc.soundSequences[1][0].getLiteral()).toEqual(TonalLetterTags.l);
    });
});