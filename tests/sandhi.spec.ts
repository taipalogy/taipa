import { Client } from '../src/client';
import { TonalLetterTags } from '../src/tonal/version2';
import { TokenAnalysis } from '../src/token';
import { TonalInflector, TonalAssimilator } from '../src/dparser/analyzer';
import { RegressiveInternal } from '../src/dparser/lexeme';
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
    const assimi = new TonalAssimilator();

    const lx = assimi.assimilateRegressive('lakkwex');

    test('chech the surface form', () => {
        expect(lx.getInflectedForms()[0].literal).toEqual('laggwex');
    });
});
