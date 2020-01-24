import { TonalLemmatizationAnalyzer } from "../src/tonal/analyzer";

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('a')

    test("check the syllable composition. v.", () => {
        expect(lexeme.word.literal).toEqual('a');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('ai')

    test("check the syllable composition. v.", () => {
        expect(lexeme.word.literal).toEqual('ai');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('oai')

    test("check the syllable composition. v.", () => {
        expect(lexeme.word.literal).toEqual('oai');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('ng')

    test("check the syllable composition. m.", () => {
        expect(lexeme.word.literal).toEqual('ng');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('aiy')

    test("check the syllable composition. vt.", () => {
        expect(lexeme.word.literal).toEqual('aiy');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('mz')

    test("check the syllable composition. mt.", () => {
        expect(lexeme.word.literal).toEqual('mz');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('qoai')

    test("check the syllable composition. cv.", () => {
        expect(lexeme.word.literal).toEqual('qoai');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('iahh')

    test("check the syllable composition. vc.", () => {
        expect(lexeme.word.literal).toEqual('iahh');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('ang')

    test("check the syllable composition. vc.", () => {
        expect(lexeme.word.literal).toEqual('ang');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('akf')

    test("check the syllable composition. vc.", () => {
        expect(lexeme.word.literal).toEqual('akf');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('angz')

    test("check the syllable composition. vc.", () => {
        expect(lexeme.word.literal).toEqual('angz');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('qoaiw')

    test("check the syllable composition. cvt.", () => {
        expect(lexeme.word.literal).toEqual('qoaiw');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('sip')

    test("check the syllable composition. cvc.", () => {
        expect(lexeme.word.literal).toEqual('sip');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('seng')

    test("check the syllable composition. cvc.", () => {
        expect(lexeme.word.literal).toEqual('seng');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('sipf')

    test("check the syllable composition. cvct.", () => {
        expect(lexeme.word.literal).toEqual('sipf');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('sengx')

    test("check the syllable composition. cvct.", () => {
        expect(lexeme.word.literal).toEqual('sengx');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('qng')

    test("check the syllable composition. cc.", () => {
        expect(lexeme.word.literal).toEqual('qng');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('qngy')

    test("check the syllable composition. cct.", () => {
        expect(lexeme.word.literal).toEqual('qngy');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('hngh')

    test("check the syllable composition. ccc.", () => {
        expect(lexeme.word.literal).toEqual('hngh');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('hmhhw')

    test("check the syllable composition. ccct.", () => {
        expect(lexeme.word.literal).toEqual('hmhhw');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('enn')

    test("check the syllable composition. vn.", () => {
        expect(lexeme.word.literal).toEqual('enn');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('ennx')

    test("check the syllable composition. vnt.", () => {
        expect(lexeme.word.literal).toEqual('ennx');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('senn')

    test("check the syllable composition. cvn.", () => {
        expect(lexeme.word.literal).toEqual('senn');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('sennw')

    test("check the syllable composition. cvnt.", () => {
        expect(lexeme.word.literal).toEqual('sennw');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('hiannh')

    test("check the syllable composition. cvnc.", () => {
        expect(lexeme.word.literal).toEqual('hiannh');
    });
});

describe("Syllable composition testing", () => {
    const tla = new TonalLemmatizationAnalyzer();
    const lexeme = tla.analyze('hiannhy')

    test("check the syllable composition. cvnct.", () => {
        expect(lexeme.word.literal).toEqual('hiannhy');
    });
});
