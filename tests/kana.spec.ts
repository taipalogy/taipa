import { Client } from '../src/client'
import { Document } from '../src/document'

describe("Kana testing of folumosa", () => {
    let cli = new Client()
    let doc = new Document()

    doc = cli.processKana('folumosa')

    test("kanas", () => {
        expect(doc.blockSequences[0]).toEqual('ふぉるもさ');  
        expect(doc.blockSequences[1]).toEqual('フォルモサ');
    });
});

describe("Kana testing of takasago", () => {
    let cli = new Client()
    let doc = new Document()

    doc = cli.processKana('takasago')

    test("kanas", () => {
        expect(doc.blockSequences[0]).toEqual('たかさご');
        expect(doc.blockSequences[1]).toEqual('タカサゴ');
    });
});

describe("Kana testing of taiwankun", () => {
    let cli = new Client()
    let doc = new Document()

    doc = cli.processKana('taiwankun')

    test("kanas", () => {
        expect(doc.blockSequences[0]).toEqual('たいわんくん');
        expect(doc.blockSequences[1]).toEqual('タイワンクン');
    });
});