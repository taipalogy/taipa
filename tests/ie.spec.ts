import { Client } from '../src/client'
import { Document } from '../src/document'
import { TonalSoundTags, TonalLetterTags } from '../src/tonal/version2';

describe("Inflectional ending testing", () => {
    let cli = new Client();
    let doc = new Document();

    doc = cli.processTonal('gengzchiapf');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.iEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('gengzchiap');
    });
  
    test("check the inflectional ending", () => {
        expect(doc.iEnding).toEqual(TonalLetterTags.f);
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSeqs[1][4].getLiteral()).toEqual(TonalLetterTags.f);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSeqs[1][4].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe("Inflectional ending testing", () => {
    let cli = new Client();
    let doc = new Document();

    doc = cli.processTonal('piauzpietf');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.iEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('piauzpiet');
    });
  
    test("check the inflectional ending", () => {
        expect(doc.iEnding).toEqual(TonalLetterTags.f);
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSeqs[1][4].getLiteral()).toEqual(TonalLetterTags.f);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSeqs[1][4].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe("Inflectional ending testing", () => {
    let cli = new Client();
    let doc = new Document();

    doc = cli.processTonal('tengzsekf');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.iEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('tengzsek');
    });
  
    test("check the inflectional ending", () => {
        expect(doc.iEnding).toEqual(TonalLetterTags.f);
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSeqs[1][3].getLiteral()).toEqual(TonalLetterTags.f);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSeqs[1][3].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe("Inflectional ending testing", () => {
    let cli = new Client();
    let doc = new Document();

    doc = cli.processTonal('sekfhappw');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.iEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('sekfhapp');
    });

    test("check the inflectional ending", () => {
        expect(doc.iEnding).toEqual(TonalLetterTags.w);
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSeqs[1][3].getLiteral()).toEqual(TonalLetterTags.w);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSeqs[0][3].name).toEqual(TonalSoundTags.checkedTonal);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSeqs[1][3].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe("Inflectional ending testing", () => {
    let cli = new Client();
    let doc = new Document();

    doc = cli.processTonal('kakfsittw');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.iEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('kakfsitt');
    });
  
    test("check the inflectional ending", () => {
        expect(doc.iEnding).toEqual('w');
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSeqs[1][3].getLiteral()).toEqual(TonalLetterTags.w);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSeqs[0][3].name).toEqual(TonalSoundTags.checkedTonal);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSeqs[1][3].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe("Inflectional ending testing", () => {
    let cli = new Client();
    let doc = new Document();

    doc = cli.processTonal('qeysiokkw');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.iEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('qeysiokk');
    });
  
    test("check the inflectional ending", () => {
        expect(doc.iEnding).toEqual('w');
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSeqs[1][4].getLiteral()).toEqual(TonalLetterTags.w);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSeqs[1][4].name).toEqual(TonalSoundTags.checkedTonal);
    });
});
