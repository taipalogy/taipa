import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/version2';
import { TokenAnalysis } from '../src/token';

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('damwvurhhxoay');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[1][3].getLiteral()).toEqual(TonalLetterTags.x);
    });
});

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('binznafchaiw');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[1][2].getLiteral()).toEqual(TonalLetterTags.f);
    });
});

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('qinznafjitt');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[1][2].getLiteral()).toEqual(TonalLetterTags.f);
    });
});

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('chaufcheng');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[0][3].getLiteral()).toEqual(TonalLetterTags.f);
    });
});

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('daizoanx');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[1][3].getLiteral()).toEqual(TonalLetterTags.x);
    });
});

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('daizoanzoez');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[2][2].getLiteral()).toEqual(TonalLetterTags.z);
    });
});

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('daiwjittwvunfdeyqok');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[2][3].getLiteral()).toEqual(TonalLetterTags.f);
    });
});

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('qurzsa');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[0][2].getLiteral()).toEqual(TonalLetterTags.z);
    });
});

describe("Tonal testing", () => {
    let cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('hongzqun');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[0][3].getLiteral()).toEqual(TonalLetterTags.z);
    });
});