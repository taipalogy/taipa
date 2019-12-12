import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/version2';
import { TokenAnalysis } from '../src/token';

describe("Euphonic change testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('isfseng');

    test("check the stop final", () => {
        expect(doc.soundSequences[0][1].getLiteral()).toEqual(TonalLetterTags.s);
    });

    test("check the tonal", () => {
        expect(doc.soundSequences[0][2].getLiteral()).toEqual(TonalLetterTags.f);
    });
});

describe("Euphonic change testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('jisswsix');

    test("check the stop final", () => {
        expect(doc.soundSequences[0][2].getLiteral()).toEqual(TonalLetterTags.ss);
    });

    test("check the tonal", () => {
        expect(doc.soundSequences[0][3].getLiteral()).toEqual(TonalLetterTags.w);
    });
});

describe("Euphonic change testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('bajfjiz');

    test("check the stop final", () => {
        expect(doc.soundSequences[0][2].getLiteral()).toEqual(TonalLetterTags.j);
    });

    test("check the tonal", () => {
        expect(doc.soundSequences[0][3].getLiteral()).toEqual(TonalLetterTags.f);
    });
});

describe("Euphonic change testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('chibfhoat');

    test("check the stop final", () => {
        expect(doc.soundSequences[0][2].getLiteral()).toEqual(TonalLetterTags.b);
    });

    test("check the tonal", () => {
        expect(doc.soundSequences[0][3].getLiteral()).toEqual(TonalLetterTags.f);
    });
});

describe("Euphonic change testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('habbwliy');

    test("check the stop final", () => {
        expect(doc.soundSequences[0][2].getLiteral()).toEqual(TonalLetterTags.bb);
    });

    test("check the tonal", () => {
        expect(doc.soundSequences[0][3].getLiteral()).toEqual(TonalLetterTags.w);
    });
});

describe("Euphonic change testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('silfley');

    test("check the stop final", () => {
        expect(doc.soundSequences[0][2].getLiteral()).toEqual(TonalLetterTags.l);
    });

    test("check the tonal", () => {
        expect(doc.soundSequences[0][3].getLiteral()).toEqual(TonalLetterTags.f);
    });
});

describe("Euphonic change testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('vallwjipp');

    test("check the stop final", () => {
        expect(doc.soundSequences[0][2].getLiteral()).toEqual(TonalLetterTags.ll);
    });

    test("check the tonal", () => {
        expect(doc.soundSequences[0][3].getLiteral()).toEqual(TonalLetterTags.w);
    });
});

describe("Euphonic change testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('cugfgoaz');

    test("check the stop final", () => {
        expect(doc.soundSequences[0][2].getLiteral()).toEqual(TonalLetterTags.g);
    });

    test("check the tonal", () => {
        expect(doc.soundSequences[0][3].getLiteral()).toEqual(TonalLetterTags.f);
    });
});

describe("Euphonic change testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('baggwbaix');

    test("check the stop final", () => {
        expect(doc.soundSequences[0][2].getLiteral()).toEqual(TonalLetterTags.gg);
    });

    test("check the tonal", () => {
        expect(doc.soundSequences[0][3].getLiteral()).toEqual(TonalLetterTags.w);
    });
});

describe("Euphonic change testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('abbxbay');

    test("check the stop final", () => {
        expect(doc.soundSequences[0][1].getLiteral()).toEqual(TonalLetterTags.bb);
    });

    test("check the tonal", () => {
        expect(doc.soundSequences[0][2].getLiteral()).toEqual(TonalLetterTags.x);
    });
});

describe("Euphonic change testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('caggxgay');

    test("check the stop final", () => {
        expect(doc.soundSequences[0][2].getLiteral()).toEqual(TonalLetterTags.gg);
    });

    test("check the tonal", () => {
        expect(doc.soundSequences[0][3].getLiteral()).toEqual(TonalLetterTags.x);
    });
});

describe("Euphonic change testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('callxlay');

    test("check the stop final", () => {
        expect(doc.soundSequences[0][2].getLiteral()).toEqual(TonalLetterTags.ll);
    });

    test("check the tonal", () => {
        expect(doc.soundSequences[0][3].getLiteral()).toEqual(TonalLetterTags.x);
    });
});