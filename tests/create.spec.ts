import { createWord, createPhrase, createLexeme, createCompoundPhraseme } from '../src/dparser/creator';

describe('Creator testing, undefined input', () => {
    const inputUnd: any = undefined;

    const w1 = createWord(inputUnd);
    const lx1 = createLexeme(w1.literal);
    const p1 = createPhrase(lx1.word.literal);
    const phm1 = createCompoundPhraseme('', p1.literal);

    test('empty phrase', () => {
        expect(phm1.phrase.literal).toEqual('');
    });
});

describe('Creator testing, empty word, empty phrase', () => {
    const inputEmpty: any = '';

    const w1 = createWord(inputEmpty);
    const lx1 = createLexeme(w1.literal);
    const p1 = createPhrase(lx1.word.literal);
    const phm1 = createCompoundPhraseme('', p1.literal);

    test('empty phrase', () => {
        expect(phm1.phrase.literal).toEqual('');
    });
});
