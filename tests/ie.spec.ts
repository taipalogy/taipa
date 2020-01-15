import { Client } from '../src/client';
import { TonalSoundTags, TonalLetterTags } from '../src/tonal/version2';
import { TokenAnalysis } from '../src/token';
import { TonalInflectionAnalyzer } from '../src/dparser/analyzer';
import { TonalDesinenceInflection, TransfixInflection } from '../src/dparser/lexeme';
import { TonalCombiningForms, ThirdCombiningForm } from '../src/dparser/morpheme';

describe("Inflectional ending testing", () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('gengzchiapf');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('gengzchiap');
    });
  
    test("check the inflectional ending", () => {
        expect(doc.inflectionalEnding).toEqual(TonalLetterTags.f);
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSequences[1][4].toString()).toEqual(TonalLetterTags.f);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSequences[1][4].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe("Inflectional ending testing", () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('piauzpietf');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('piauzpiet');
    });
  
    test("check the inflectional ending", () => {
        expect(doc.inflectionalEnding).toEqual(TonalLetterTags.f);
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSequences[1][4].toString()).toEqual(TonalLetterTags.f);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSequences[1][4].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe("Inflectional ending testing", () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('tengzsekf');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('tengzsek');
    });
  
    test("check the inflectional ending", () => {
        expect(doc.inflectionalEnding).toEqual(TonalLetterTags.f);
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSequences[1][3].toString()).toEqual(TonalLetterTags.f);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSequences[1][3].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe("Inflectional ending testing", () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('sekfhappw');

    test("check the inflectional stem", () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length-en.length)).toEqual('sekfhapp');
    });

    test("check the inflectional ending", () => {
        expect(doc.inflectionalEnding).toEqual(TonalLetterTags.w);
    });

    test("check the sound of inflectional ending", () => {
        expect(doc.soundSequences[1][3].toString()).toEqual(TonalLetterTags.w);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSequences[0][3].name).toEqual(TonalSoundTags.checkedTonal);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSequences[1][3].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe("Inflectional ending testing", () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

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
        expect(doc.soundSequences[1][3].toString()).toEqual(TonalLetterTags.w);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSequences[0][3].name).toEqual(TonalSoundTags.checkedTonal);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSequences[1][3].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe("Inflectional ending testing", () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

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
        expect(doc.soundSequences[1][4].toString()).toEqual(TonalLetterTags.w);
    });

    test("check the name of checked tonal", () => {
        expect(doc.soundSequences[1][4].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe("Inflection testing", () => {
    const tia = new TonalInflectionAnalyzer();

    const tw = tia.analyze('guzleng', new TonalCombiningForms(), new TonalDesinenceInflection());

    test("check the inflected form", () => {
        expect(tw.otherForms[0].literal).toEqual('guzlengz');
    });
});

describe("Inflection testing", () => {
    const tia = new TonalInflectionAnalyzer();

    const tw = tia.analyze('damwvurhhxoay', new ThirdCombiningForm(), new TransfixInflection());

    test("check the inflected form", () => {
        expect(tw.otherForms[0].literal).toEqual('damwvurhhwoaw');
    });
});