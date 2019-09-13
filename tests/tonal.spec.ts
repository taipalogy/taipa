import { Client } from '../src/client'
import { Document } from '../src/document'
import { TonalLetterTags } from '../src/tonal/version2';

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new Document()

    doc = cli.processTonal('damwvurhhxoay');

    test("check the tonal affix", () => {
        expect(doc.soundSeqs[1][3].getLiteral()).toEqual(TonalLetterTags.x);
    });
});

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new Document()

    doc = cli.processTonal('binznacfchaiw');

    test("check the tonal affix", () => {
        expect(doc.soundSeqs[1][2].getLiteral()).toEqual(TonalLetterTags.cf);
    });
});

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new Document()

    doc = cli.processTonal('qinznacfjitt');

    test("check the tonal affix", () => {
        expect(doc.soundSeqs[1][2].getLiteral()).toEqual(TonalLetterTags.cf);
    });
});

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new Document()

    doc = cli.processTonal('chaucfchaeng');

    test("check the tonal affix", () => {
        expect(doc.soundSeqs[0][3].getLiteral()).toEqual(TonalLetterTags.cf);
    });
});