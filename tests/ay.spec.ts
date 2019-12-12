import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/version2';
import { TokenAnalysis } from '../src/token';

describe("Ay testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('sutflay');

    test("check the free tonal y", () => {
        expect(doc.soundSequences[1][2].getLiteral()).toEqual(TonalLetterTags.y);
    });
});

describe("Ay testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('sutfay');

    test("check the free tonal y", () => {
        expect(doc.soundSequences[1][1].getLiteral()).toEqual(TonalLetterTags.y);
    });
});

describe("Ay testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('chimfmay');

    test("check the free tonal y", () => {
        expect(doc.soundSequences[1][2].getLiteral()).toEqual(TonalLetterTags.y);
    });
});

describe("Ay testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('chimxmay');

    test("check the free tonal y", () => {
        expect(doc.soundSequences[1][2].getLiteral()).toEqual(TonalLetterTags.y);
    });
});

describe("Ay testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('appxbay');

    test("check the free tonal y", () => {
        expect(doc.soundSequences[1][2].getLiteral()).toEqual(TonalLetterTags.y);
    });
});

describe("Ay testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('appxay');

    test("check the free tonal y", () => {
        expect(doc.soundSequences[1][1].getLiteral()).toEqual(TonalLetterTags.y);
    });
});

describe("Ay testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('dekkxgay');

    test("check the free tonal y", () => {
        expect(doc.soundSequences[1][2].getLiteral()).toEqual(TonalLetterTags.y);
    });
});

describe("Ay testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('dekkxay');

    test("check the free tonal y", () => {
        expect(doc.soundSequences[1][1].getLiteral()).toEqual(TonalLetterTags.y);
    });
});

describe("Ay testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('cattxlay');

    test("check the free tonal y", () => {
        expect(doc.soundSequences[1][2].getLiteral()).toEqual(TonalLetterTags.y);
    });
});

describe("Ay testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('cattxay');

    test("check the free tonal y", () => {
        expect(doc.soundSequences[1][1].getLiteral()).toEqual(TonalLetterTags.y);
    });
});