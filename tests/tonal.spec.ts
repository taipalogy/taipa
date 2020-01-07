import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/version2';
import { TokenAnalysis } from '../src/token';

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('damwvurhhxoay');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[1][3].toString()).toEqual(TonalLetterTags.x);
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('binznafchaiw');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[1][2].toString()).toEqual(TonalLetterTags.f);
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('qinznafjitt');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[1][2].toString()).toEqual(TonalLetterTags.f);
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('chaufcheng');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.f);
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('daizoanx');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[1][3].toString()).toEqual(TonalLetterTags.x);
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('daizoanzoez');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[2][2].toString()).toEqual(TonalLetterTags.z);
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('daiwjittwvunfdeyqok');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[2][3].toString()).toEqual(TonalLetterTags.f);
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('qurzsa');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.z);
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('hongzqun');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.z);
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('siappwjipp');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[0][4].toString()).toEqual(TonalLetterTags.w);
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('qazvi');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.z);
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('mihhwqiannz');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.w);
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('bakkwchiu');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.w);
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('ginfnay');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[0][3].toString()).toEqual(TonalLetterTags.f);
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('kazcng');

    test("check the tonal affix", () => {
        expect(doc.soundSequences[0][2].toString()).toEqual(TonalLetterTags.z);
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('ax');

    test("check if it is present", () => {
        expect(doc.word.literal).toEqual('');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('soaiw');

    test("check if it is present. 5 letters in length", () => {
        expect(doc.word.literal).toEqual('');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('a');

    test("check the syllable composition. v.", () => {
        expect(doc.word.literal).toEqual('a');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('ai');

    test("check the syllable composition. v.", () => {
        expect(doc.word.literal).toEqual('ai');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('oai');

    test("check the syllable composition. v.", () => {
        expect(doc.word.literal).toEqual('oai');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('ng');

    test("check the syllable composition. m.", () => {
        expect(doc.word.literal).toEqual('ng');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('aiy');

    test("check the syllable composition. vt.", () => {
        expect(doc.word.literal).toEqual('aiy');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('mz');

    test("check the syllable composition. mt.", () => {
        expect(doc.word.literal).toEqual('mz');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('qoai');

    test("check the syllable composition. cv.", () => {
        expect(doc.word.literal).toEqual('qoai');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('iahh');

    test("check the syllable composition. vc.", () => {
        expect(doc.word.literal).toEqual('iahh');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('ang');

    test("check the syllable composition. vc.", () => {
        expect(doc.word.literal).toEqual('ang');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('akf');

    test("check the syllable composition. vc.", () => {
        expect(doc.word.literal).toEqual('akf');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('angz');

    test("check the syllable composition. vc.", () => {
        expect(doc.word.literal).toEqual('angz');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('qoaiw');

    test("check the syllable composition. cvt.", () => {
        expect(doc.word.literal).toEqual('qoaiw');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('sip');

    test("check the syllable composition. cvc.", () => {
        expect(doc.word.literal).toEqual('sip');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('seng');

    test("check the syllable composition. cvc.", () => {
        expect(doc.word.literal).toEqual('seng');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('sipf');

    test("check the syllable composition. cvct.", () => {
        expect(doc.word.literal).toEqual('sipf');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('sengx');

    test("check the syllable composition. cvct.", () => {
        expect(doc.word.literal).toEqual('sengx');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('qng');

    test("check the syllable composition. cc.", () => {
        expect(doc.word.literal).toEqual('qng');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('qngy');

    test("check the syllable composition. cct.", () => {
        expect(doc.word.literal).toEqual('qngy');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('hngh');

    test("check the syllable composition. ccc.", () => {
        expect(doc.word.literal).toEqual('hngh');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('hmhhw');

    test("check the syllable composition. ccct.", () => {
        expect(doc.word.literal).toEqual('hmhhw');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('enn');

    test("check the syllable composition. vn.", () => {
        expect(doc.word.literal).toEqual('enn');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('ennx');

    test("check the syllable composition. vnt.", () => {
        expect(doc.word.literal).toEqual('ennx');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('senn');

    test("check the syllable composition. cvn.", () => {
        expect(doc.word.literal).toEqual('senn');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('sennw');

    test("check the syllable composition. cvnt.", () => {
        expect(doc.word.literal).toEqual('sennw');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('hiannh');

    test("check the syllable composition. cvnc.", () => {
        expect(doc.word.literal).toEqual('hiannh');
    });
});

describe("Tonal testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('hiannhy');

    test("check the syllable composition. cvnct.", () => {
        expect(doc.word.literal).toEqual('hiannhy');
    });
});