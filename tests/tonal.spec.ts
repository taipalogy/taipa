import { Client } from '../src/client';
import { Document } from '../src/document';
import { TonalLetterTags } from '../src/tonal/version2';

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new Document()

    doc = cli.processTonal('damwvurhhxoay');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[1][3].getLiteral()).toEqual(TonalLetterTags.x);
    });
});

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new Document()

    doc = cli.processTonal('binznafchaiw');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[1][2].getLiteral()).toEqual(TonalLetterTags.f);
    });
});

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new Document()

    doc = cli.processTonal('qinznafjitt');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[1][2].getLiteral()).toEqual(TonalLetterTags.f);
    });
});

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new Document()

    doc = cli.processTonal('chaufcheng');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[0][3].getLiteral()).toEqual(TonalLetterTags.f);
    });
});

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new Document()

    doc = cli.processTonal('daizoanx');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[1][3].getLiteral()).toEqual(TonalLetterTags.x);
    });
});

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new Document()

    doc = cli.processTonal('daizoanzoez');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[2][2].getLiteral()).toEqual(TonalLetterTags.z);
    });
});

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new Document()

    doc = cli.processTonal('daizjittwvunfdeyqok');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[2][3].getLiteral()).toEqual(TonalLetterTags.f);
    });
});

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new Document()

    doc = cli.processTonal('qurzsa');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[0][2].getLiteral()).toEqual(TonalLetterTags.z);
    });
});

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new Document()

    doc = cli.processTonal('hongzqun');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[0][3].getLiteral()).toEqual(TonalLetterTags.z);
    });
});