import { Client } from '../src/client';
import { TokenAnalysis } from '../src/token';

describe("Kana testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processKana('forumosa')

    test("kanas", () => {
        expect(doc.blockSequences[0]).toEqual('ふぉるもさ');  
        expect(doc.blockSequences[1]).toEqual('フォルモサ');
    });
});

describe("Kana testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processKana('takasago')

    test("kanas", () => {
        expect(doc.blockSequences[0]).toEqual('たかさご');
        expect(doc.blockSequences[1]).toEqual('タカサゴ');
    });
});

describe("Kana testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processKana('taiwankun')

    test("kanas", () => {
        expect(doc.blockSequences[0]).toEqual('たいわんくん');
        expect(doc.blockSequences[1]).toEqual('タイワンクン');
    });
});

describe("Kana testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processKana('taggu')

    test("kanas", () => {
        expect(doc.blockSequences[0]).toEqual('たっぐ');
        expect(doc.blockSequences[1]).toEqual('タッグ');
    });
});

describe("Kana testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processKana('ggu')

    test("kanas", () => {
        expect(doc.blockSequences[0]).toEqual('っぐ');
        expect(doc.blockSequences[1]).toEqual('ッグ');
    });
});

describe("Kana testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processKana('paddo')

    test("kanas", () => {
        expect(doc.blockSequences[0]).toEqual('ぱっど');
        expect(doc.blockSequences[1]).toEqual('パッド');
    });
});

describe("Kana testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processKana('ddo')

    test("kanas", () => {
        expect(doc.blockSequences[0]).toEqual('っど');
        expect(doc.blockSequences[1]).toEqual('ッド');
    });
});