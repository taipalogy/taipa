import { createTonalPhrase, createTonalInflectionLexeme, createCompoundPhraseme } from '../src/dparser/creator';

describe('Creator testing, excessive tokens', () => {
    const inputPhrase: any = 'an english key';

    const lx1 = createTonalInflectionLexeme(inputPhrase);

    test('empty phrase', () => {
        expect(lx1.word.literal).toEqual('an');
    });
});

describe('Creator testing, undefined input', () => {
    const inputUnd: any = undefined;

    const lx1 = createTonalInflectionLexeme(inputUnd);
    const p1 = createTonalPhrase(lx1.word.literal);
    const phm1 = createCompoundPhraseme('', p1.literal);

    test('empty phrase', () => {
        expect(phm1.phrase.literal).toEqual('');
    });
});

describe('Creator testing, empty word, empty phrase', () => {
    const inputEmpty: any = '';

    const lx1 = createTonalInflectionLexeme(inputEmpty);
    const p1 = createTonalPhrase(lx1.word.literal);
    const phm1 = createCompoundPhraseme('', p1.literal);

    test('empty phrase', () => {
        expect(phm1.phrase.literal).toEqual('');
    });
});
