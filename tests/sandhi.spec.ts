import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/version2';
import { TokenAnalysis } from '../src/token';
import { TonalInflector } from '../src/dparser/analyzer';
import { RegressiveAssimilation } from '../src/dparser/lexeme';
import { TonalZeroCombining } from '../src/morpheme';

describe('Epenthesis testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('sutflay');

    test('check the consonant', () => {
        expect(doc.soundSequences[1][0].toString()).toEqual(TonalLetterTags.l);
    });
});

describe('Epenthesis testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('jiokkxgay');

    test('check the consonant', () => {
        expect(doc.soundSequences[1][0].toString()).toEqual(TonalLetterTags.g);
    });
});

describe('Epenthesis testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('qapfbay');

    test('check the consonant', () => {
        expect(doc.soundSequences[1][0].toString()).toEqual(TonalLetterTags.b);
    });
});

describe('Epenthesis testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('qamxmay');

    test('check the consonant', () => {
        expect(doc.soundSequences[1][0].toString()).toEqual(TonalLetterTags.m);
    });
});

describe('Epenthesis testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('soanfnay');

    test('check the consonant', () => {
        expect(doc.soundSequences[1][0].toString()).toEqual(TonalLetterTags.n);
    });
});

describe('Voiced final testing', () => {
    const nflctr = new TonalInflector();
    const lx = nflctr.inflect('lakkwex', new TonalZeroCombining(), new RegressiveAssimilation());

    test('chech the surface form', () => {
        expect(lx.getProceedingForms()[0].literal).toEqual('laggwex');
    });
});
