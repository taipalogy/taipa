import { Client } from '../src/client'
import { Document } from '../src/document'

describe("Inflectional ending testing", () => {
    let cli = new Client();
    let doc = new Document();

    doc = cli.processTonal('gengzchiapf');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('gengzchiap');
    });
  
    test("check the inflectional ending", () => {
        expect(doc.inflectionalEnding).toEqual('f');
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSequences[1][4].getLiteral()).toEqual('f');
    });
});

describe("Inflectional ending testing", () => {
    let cli = new Client();
    let doc = new Document();

    doc = cli.processTonal('piauzpietf');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('piauzpiet');
    });
  
    test("check the inflectional ending", () => {
        expect(doc.inflectionalEnding).toEqual('f');
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSequences[1][4].getLiteral()).toEqual('f');
    });
});

describe("Inflectional ending testing", () => {
    let cli = new Client();
    let doc = new Document();

    doc = cli.processTonal('tengzsekf');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('tengzsek');
    });
  
    test("check the inflectional ending", () => {
        expect(doc.inflectionalEnding).toEqual('f');
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSequences[1][3].getLiteral()).toEqual('f');
    });
});

describe("Inflectional ending testing", () => {
    let cli = new Client();
    let doc = new Document();

    doc = cli.processTonal('sekfhappw');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('sekfhapp');
    });
  
    test("check the inflectional ending", () => {
        expect(doc.inflectionalEnding).toEqual('w');
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSequences[1][3].getLiteral()).toEqual('w');
    });
});

describe("Inflectional ending testing", () => {
    let cli = new Client();
    let doc = new Document();

    doc = cli.processTonal('kakfsittw');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('kakfsitt');
    });
  
    test("check the inflectional ending", () => {
        expect(doc.inflectionalEnding).toEqual('w');
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSequences[1][3].getLiteral()).toEqual('w');
    });
});

describe("Inflectional ending testing", () => {
    let cli = new Client();
    let doc = new Document();

    doc = cli.processTonal('qeysiokkw');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('qeysiokk');
    });
  
    test("check the inflectional ending", () => {
        expect(doc.inflectionalEnding).toEqual('w');
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSequences[1][4].getLiteral()).toEqual('w');
    });
});
