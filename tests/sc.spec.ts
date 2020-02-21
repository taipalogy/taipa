import { TonalLemmatizer } from '../src/tonal/lemmatizer';

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('a');

    test('check the syllable composition. v.', () => {
        expect(lx.word.literal).toEqual('a');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('ai');

    test('check the syllable composition. v.', () => {
        expect(lx.word.literal).toEqual('ai');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('oai');

    test('check the syllable composition. v.', () => {
        expect(lx.word.literal).toEqual('oai');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('ng');

    test('check the syllable composition. m.', () => {
        expect(lx.word.literal).toEqual('ng');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('aiy');

    test('check the syllable composition. vt.', () => {
        expect(lx.word.literal).toEqual('aiy');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('mz');

    test('check the syllable composition. mt.', () => {
        expect(lx.word.literal).toEqual('mz');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('qoai');

    test('check the syllable composition. cv.', () => {
        expect(lx.word.literal).toEqual('qoai');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('iahh');

    test('check the syllable composition. vc.', () => {
        expect(lx.word.literal).toEqual('iahh');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('ang');

    test('check the syllable composition. vc.', () => {
        expect(lx.word.literal).toEqual('ang');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('akf');

    test('check the syllable composition. vc.', () => {
        expect(lx.word.literal).toEqual('akf');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('angz');

    test('check the syllable composition. vc.', () => {
        expect(lx.word.literal).toEqual('angz');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('qoaiw');

    test('check the syllable composition. cvt.', () => {
        expect(lx.word.literal).toEqual('qoaiw');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('sip');

    test('check the syllable composition. cvc.', () => {
        expect(lx.word.literal).toEqual('sip');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('seng');

    test('check the syllable composition. cvc.', () => {
        expect(lx.word.literal).toEqual('seng');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('sipf');

    test('check the syllable composition. cvct.', () => {
        expect(lx.word.literal).toEqual('sipf');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('sengx');

    test('check the syllable composition. cvct.', () => {
        expect(lx.word.literal).toEqual('sengx');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('qng');

    test('check the syllable composition. cc.', () => {
        expect(lx.word.literal).toEqual('qng');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('qngy');

    test('check the syllable composition. cct.', () => {
        expect(lx.word.literal).toEqual('qngy');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('hngh');

    test('check the syllable composition. ccc.', () => {
        expect(lx.word.literal).toEqual('hngh');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('hmhhw');

    test('check the syllable composition. ccct.', () => {
        expect(lx.word.literal).toEqual('hmhhw');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('enn');

    test('check the syllable composition. vn.', () => {
        expect(lx.word.literal).toEqual('enn');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('ennx');

    test('check the syllable composition. vnt.', () => {
        expect(lx.word.literal).toEqual('ennx');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('senn');

    test('check the syllable composition. cvn.', () => {
        expect(lx.word.literal).toEqual('senn');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('sennw');

    test('check the syllable composition. cvnt.', () => {
        expect(lx.word.literal).toEqual('sennw');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('hiannh');

    test('check the syllable composition. cvnc.', () => {
        expect(lx.word.literal).toEqual('hiannh');
    });
});

describe('Syllable composition testing', () => {
    const lmtzr = new TonalLemmatizer();
    const lx = lmtzr.lemmatize('hiannhy');

    test('check the syllable composition. cvnct.', () => {
        expect(lx.word.literal).toEqual('hiannhy');
    });
});
