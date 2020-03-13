import {
    createTonalWord,
    createTonalPhrase,
    createTonalInflectionLexeme,
    createCompoundPhraseme
} from '../src/dparser/creator';

describe('Creator testing, undefined input', () => {
    const inputUnd: any = undefined;

    const w1 = createTonalWord(inputUnd);
    const lx1 = createTonalInflectionLexeme(w1.literal);
    const p1 = createTonalPhrase(lx1.word.literal);
    const phm1 = createCompoundPhraseme('', p1.literal);

    test('empty phrase', () => {
        expect(phm1.phrase.literal).toEqual('');
    });
});

describe('Creator testing, empty word, empty phrase', () => {
    const inputEmpty: any = '';

    const w1 = createTonalWord(inputEmpty);
    const lx1 = createTonalInflectionLexeme(w1.literal);
    const p1 = createTonalPhrase(lx1.word.literal);
    const phm1 = createCompoundPhraseme('', p1.literal);

    test('empty phrase', () => {
        expect(phm1.phrase.literal).toEqual('');
    });
});
