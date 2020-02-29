import { TonalCreator } from '../src/dparser/creator';

describe('Creator testing, undefined input', () => {
    const inputUnd: any = undefined;

    const tc = new TonalCreator();

    const w1 = tc.createWord(inputUnd);
    const lx1 = tc.createLexeme(w1.literal);
    const p1 = tc.createPhrase(lx1.word.literal);
    const phm1 = tc.createCompoundPhraseme('', p1.literal);

    test('empty phrase', () => {
        expect(phm1.phrase.literal).toEqual('');
    });
});

describe('Creator testing, empty word, empty phrase', () => {
    const inputEmpty: any = '';

    const tc = new TonalCreator();

    const w1 = tc.createWord(inputEmpty);
    const lx1 = tc.createLexeme(w1.literal);
    const p1 = tc.createPhrase(lx1.word.literal);
    const phm1 = tc.createCompoundPhraseme('', p1.literal);

    test('empty phrase', () => {
        expect(phm1.phrase.literal).toEqual('');
    });
});
