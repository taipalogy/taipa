import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/version2';
import { TokenAnalysis } from '../src/token';
import { TonalAssimilator, TonalInserter, TonalInflector } from '../src/dparser/analyzer';

describe('Epenthesis testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('sutflay');

    test('check the consonant', () => {
        expect(ta.soundSequences[1][0].toString()).toEqual(TonalLetterTags.l);
    });
});

describe('Epenthesis testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('jiokkxgay');

    test('check the consonant', () => {
        expect(ta.soundSequences[1][0].toString()).toEqual(TonalLetterTags.g);
    });
});

describe('Epenthesis testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('qapfbay');

    test('check the consonant', () => {
        expect(ta.soundSequences[1][0].toString()).toEqual(TonalLetterTags.b);
    });
});

describe('Epenthesis testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('qamxmay');

    test('check the consonant', () => {
        expect(ta.soundSequences[1][0].toString()).toEqual(TonalLetterTags.m);
    });
});

describe('Epenthesis testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('soanfnay');

    test('check the consonant', () => {
        expect(ta.soundSequences[1][0].toString()).toEqual(TonalLetterTags.n);
    });
});

describe('Voiced final testing', () => {
    const assimi = new TonalAssimilator();

    const lx = assimi.assimilateRegressive('lakkwex');

    test('chech the surface form', () => {
        expect(lx.getForms()[0].literal).toEqual('laggwex');
    });
});

describe('Epenthesis testing', () => {
    const inst = new TonalInserter();

    const lx1 = inst.insert('infay');

    test('check the epenthesis of initial n', () => {
        expect(lx1.getForms()[0].literal).toEqual('infnay');
    });

    const lx2 = inst.insert('qimxay');

    test('check the epenthesis of initial m', () => {
        expect(lx2.getForms()[0].literal).toEqual('qimxmay');
    });

    const lx3 = inst.insert('cangxay');

    test('check the epenthesis of initial ng', () => {
        expect(lx3.getForms()[0].literal).toEqual('cangxngay');
    });
});

describe('Epenthesis testing', () => {
    const infl = new TonalInflector();

    const lx1 = infl.inflectDesinence('qimxay');

    test('check the inflected form', () => {
        expect(lx1.getForms()[0].literal).toEqual('qimxa');
    });

    const inst = new TonalInserter();

    const lx2 = inst.insert(lx1.getForms()[0].literal);

    test('check the epenthesis of initial m', () => {
        expect(lx2.getForms()[0].literal).toEqual('qimxma');
    });
});

describe('Reduplication testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('siurfsiurzsiur');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('siur');
    });
});

describe('Reduplication testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('sanfsanfsany');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('sany');
    });
});

describe('Reduplication testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('samysamysamw');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('samw');
    });
});

describe('Reduplication testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('sipfsipfsip');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('sip');
    });
});

describe('Reduplication testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('angfangwangx');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('angx');
    });
});

describe('Reduplication testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('qufquwquz');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('quz');
    });
});

describe('Reduplication testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('sittxsittwsitt');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('sitt');
    });
});
