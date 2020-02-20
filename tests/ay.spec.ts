import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/version2';
import { TokenAnalysis } from '../src/token';

describe('Ay testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('sutflay');

    test('check the free tonal y', () => {
        expect(ta.soundSequences[1][2].toString()).toEqual(TonalLetterTags.y);
    });
});

describe('Ay testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('sutfay');

    test('check the free tonal y', () => {
        expect(ta.soundSequences[1][1].toString()).toEqual(TonalLetterTags.y);
    });
});

describe('Ay testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('chimfmay');

    test('check the free tonal y', () => {
        expect(ta.soundSequences[1][2].toString()).toEqual(TonalLetterTags.y);
    });
});

describe('Ay testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('chimxmay');

    test('check the free tonal y', () => {
        expect(ta.soundSequences[1][2].toString()).toEqual(TonalLetterTags.y);
    });
});

describe('Ay testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('appxbay');

    test('check the free tonal y', () => {
        expect(ta.soundSequences[1][2].toString()).toEqual(TonalLetterTags.y);
    });
});

describe('Ay testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('appxay');

    test('check the free tonal y', () => {
        expect(ta.soundSequences[1][1].toString()).toEqual(TonalLetterTags.y);
    });
});

describe('Ay testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('dekkxgay');

    test('check the free tonal y', () => {
        expect(ta.soundSequences[1][2].toString()).toEqual(TonalLetterTags.y);
    });
});

describe('Ay testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('dekkxay');

    test('check the free tonal y', () => {
        expect(ta.soundSequences[1][1].toString()).toEqual(TonalLetterTags.y);
    });
});

describe('Ay testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('cattxlay');

    test('check the free tonal y', () => {
        expect(ta.soundSequences[1][2].toString()).toEqual(TonalLetterTags.y);
    });
});

describe('Ay testing', () => {
    const cli = new Client();

    const ta = cli.processTonal('cattxay');

    test('check the free tonal y', () => {
        expect(ta.soundSequences[1][1].toString()).toEqual(TonalLetterTags.y);
    });
});

describe('Ay testing, uncombining form of the first syllable', () => {
    const cli = new Client();

    const ta = cli.processTonal('qexay');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('qe');
    });
});

describe('Ay testing, uncombining form of the first syllable', () => {
    const cli = new Client();

    const ta = cli.processTonal('boefay');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('boey');
    });
});

describe('Ay testing, uncombining form of the first syllable', () => {
    const cli = new Client();

    const ta = cli.processTonal('paufay');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('pauw');
    });
});

describe('Ay testing, uncombining form of the first syllable', () => {
    const cli = new Client();

    const ta = cli.processTonal('qoxay');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('qox');
    });
});

describe('Ay testing, uncombining form of the first syllable', () => {
    const cli = new Client();

    const ta = cli.processTonal('hoexay');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('hoez');
    });
});

describe('Ay testing, uncombining form of the first syllable', () => {
    const cli = new Client();

    const ta = cli.processTonal('mihfay');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('mih');
    });
});

describe('Ay testing, uncombining form of the first syllable', () => {
    const cli = new Client();

    const ta = cli.processTonal('hiurhhxay');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('hiurhh');
    });
});

describe('Ay testing, uncombining form of the first syllable', () => {
    const cli = new Client();

    const ta = cli.processTonal('citfay');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('cit');
    });
});

describe('Ay testing, uncombining form of the first syllable', () => {
    const cli = new Client();

    const ta = cli.processTonal('voattxay');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('voatt');
    });
});

describe('Ay testing, uncombining form of the first syllable', () => {
    const cli = new Client();

    const ta = cli.processTonal('qakfay');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('qak');
    });
});

describe('Ay testing, uncombining form of the first syllable', () => {
    const cli = new Client();

    const ta = cli.processTonal('lokkxay');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('lokk');
    });
});

describe('Ay testing, uncombining form of the first syllable', () => {
    const cli = new Client();

    const ta = cli.processTonal('qapfay');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('qap');
    });
});

describe('Ay testing, uncombining form of the first syllable', () => {
    const cli = new Client();

    const ta = cli.processTonal('liappxay');

    test('check the uncombining form', () => {
        expect(ta.uncombiningSequences[0]).toContain('liapp');
    });
});
