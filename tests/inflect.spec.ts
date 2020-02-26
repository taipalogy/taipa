import { Client } from '../src/client';
import { TonalSoundTags, TonalLetterTags } from '../src/tonal/version2';
import { TokenAnalysis } from '../src/token';
import { TonalInflector } from '../src/dparser/inflector';
import { TonalInserter } from '../src/dparser/inserter';
import { TonalCreator } from '../src/dparser/creator';
import { FourthToFirstCombining } from '../src/dparser/morpheme';

describe('Inflectional ending testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('gengzchiapf');

    test('check the inflectional stem', () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length - en.length)).toEqual('gengzchiap');
    });

    test('check the inflectional ending', () => {
        expect(doc.inflectionalEnding).toEqual(TonalLetterTags.f);
    });

    test('check the sound of inflectional ending', () => {
        expect(doc.soundSequences[1][4].toString()).toEqual(TonalLetterTags.f);
    });

    test('check the name of checked tonal', () => {
        expect(doc.soundSequences[1][4].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe('Inflectional ending testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('piauzpietf');

    test('check the inflectional stem', () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length - en.length)).toEqual('piauzpiet');
    });

    test('check the inflectional ending', () => {
        expect(doc.inflectionalEnding).toEqual(TonalLetterTags.f);
    });

    test('check the sound of inflectional ending', () => {
        expect(doc.soundSequences[1][4].toString()).toEqual(TonalLetterTags.f);
    });

    test('check the name of checked tonal', () => {
        expect(doc.soundSequences[1][4].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe('Inflectional ending testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('tengzsekf');

    test('check the inflectional stem', () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length - en.length)).toEqual('tengzsek');
    });

    test('check the inflectional ending', () => {
        expect(doc.inflectionalEnding).toEqual(TonalLetterTags.f);
    });

    test('check the sound of inflectional ending', () => {
        expect(doc.soundSequences[1][3].toString()).toEqual(TonalLetterTags.f);
    });

    test('check the name of checked tonal', () => {
        expect(doc.soundSequences[1][3].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe('Inflectional ending testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('sekfhappw');

    test('check the inflectional stem', () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length - en.length)).toEqual('sekfhapp');
    });

    test('check the inflectional ending', () => {
        expect(doc.inflectionalEnding).toEqual(TonalLetterTags.w);
    });

    test('check the sound of inflectional ending', () => {
        expect(doc.soundSequences[1][3].toString()).toEqual(TonalLetterTags.w);
    });

    test('check the name of checked tonal', () => {
        expect(doc.soundSequences[0][3].name).toEqual(TonalSoundTags.checkedTonal);
    });

    test('check the name of checked tonal', () => {
        expect(doc.soundSequences[1][3].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe('Inflectional ending testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('kakfsittw');

    test('check the inflectional stem', () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length - en.length)).toEqual('kakfsitt');
    });

    test('check the inflectional ending', () => {
        expect(doc.inflectionalEnding).toEqual('w');
    });

    test('check the sound of inflectional ending', () => {
        expect(doc.soundSequences[1][3].toString()).toEqual(TonalLetterTags.w);
    });

    test('check the name of checked tonal', () => {
        expect(doc.soundSequences[0][3].name).toEqual(TonalSoundTags.checkedTonal);
    });

    test('check the name of checked tonal', () => {
        expect(doc.soundSequences[1][3].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe('Inflectional ending testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('qeysiokkw');

    test('check the inflectional stem', () => {
        let l = doc.word.literal;
        let en = doc.inflectionalEnding;
        expect(l.substr(0, l.length - en.length)).toEqual('qeysiokk');
    });

    test('check the inflectional ending', () => {
        expect(doc.inflectionalEnding).toEqual('w');
    });

    test('check the sound of inflectional ending', () => {
        expect(doc.soundSequences[1][4].toString()).toEqual(TonalLetterTags.w);
    });

    test('check the name of checked tonal', () => {
        expect(doc.soundSequences[1][4].name).toEqual(TonalSoundTags.checkedTonal);
    });
});

describe('Inflection testing', () => {
    const nflctr = new TonalInflector();

    const tw = nflctr.inflectDesinence('guzleng');

    test('check the inflected form', () => {
        expect(tw.getForms()[0].literal).toEqual('guzlengz');
    });
});

describe('Inflection testing', () => {
    const nflctr = new TonalInflector();

    const tw = nflctr.inflectTransfix('damwvurhhxoay');

    test('check the inflected form', () => {
        expect(tw.getForms()[0].literal).toEqual('damwvurhhwoaw');
    });
});

describe('Inflection testing, absent lexical roots', () => {
    const nflctr = new TonalInflector();

    const tw1 = nflctr.inflectDesinence('s');

    test('check the word', () => {
        expect(tw1.word.literal).toEqual('');
    });

    test('check the number of inflected forms', () => {
        expect(tw1.getForms().length).toEqual(0);
    });

    const tw2 = nflctr.inflectDesinence('on');

    test('check the word', () => {
        expect(tw2.word.literal).toEqual('');
    });

    test('check the number of inflected forms', () => {
        expect(tw2.getForms().length).toEqual(0);
    });

    const tw3 = nflctr.inflectDesinence('ax');

    test('check the word', () => {
        // it used to be an empty string
        // ax is now asserted after tone sandhi of ay is incorporated
        expect(tw3.word.literal).toEqual('ax');
    });

    test('check the number of inflected forms', () => {
        // it used to be 0
        // 2 is now asserted after tone sandhi of ay is incorporated
        expect(tw3.getForms().length).toEqual(2);
    });

    const str = 'chimhhw';
    const tw4 = nflctr.inflectDesinence(str);

    test('check the word', () => {
        expect(tw4.word.literal).toEqual(str);
    });

    test('check the number of inflected forms', () => {
        expect(tw4.getForms().length).toEqual(0);
    });
});

describe('Inflection testing, absent lexical roots', () => {
    const nflctr = new TonalInflector();

    const inputUnd: any = undefined;
    const inputEmpty: any = '';

    const lexeme1 = nflctr.inflectDesinence(inputUnd);

    test('check the word literal', () => {
        expect(lexeme1.word.literal).toEqual('');
    });

    test('check the number of forms', () => {
        expect(lexeme1.getForms().length).toEqual(0);
    });

    const lexeme2 = nflctr.inflectDesinence(inputEmpty);

    test('check the word literal', () => {
        expect(lexeme2.word.literal).toEqual('');
    });

    test('check the number of forms', () => {
        expect(lexeme2.getForms().length).toEqual(0);
    });

    const lexeme3 = nflctr.inflectTransfix(inputUnd);

    test('check the word literal', () => {
        expect(lexeme3.word.literal).toEqual('');
    });

    test('check the number of forms', () => {
        expect(lexeme3.getForms().length).toEqual(0);
    });

    const lexeme4 = nflctr.inflectTransfix(inputEmpty);

    test('check the word literal', () => {
        expect(lexeme4.word.literal).toEqual('');
    });

    test('check the number of forms', () => {
        expect(lexeme4.getForms().length).toEqual(0);
    });
});

describe('Inflection testing, with x in the middle of a stem', () => {
    const nflctr = new TonalInflector();

    const lx = nflctr.inflectDesinence('moxsek');

    test('check the base form', () => {
        expect(lx.word.literal).toEqual('');
    });

    test('check the inflected form', () => {
        expect(lx.getForms().length).toEqual(0);
    });
});

describe('Inflection testing', () => {
    const nflctr = new TonalInflector();

    const lx1 = nflctr.inflectDesinence('qimxay');

    test('check the inflected form', () => {
        expect(lx1.getForms()[0].literal).toEqual('qimxa');
    });

    const inst = new TonalInserter();
    const lx2 = inst.insert(lx1.getForms()[0].literal);

    test('check the surface form', () => {
        expect(lx2.getForms()[0].literal).toEqual('qimxma');
    });
});

describe('Inflection testing', () => {
    const infl = new TonalInflector();

    const lx1 = infl.inflectDesinence('siax');

    test('check the inflected form', () => {
        expect(lx1.getForms()[0].literal).toEqual('siaz');
    });

    test('check the inflected form', () => {
        expect(lx1.getForms()[1].literal).toEqual('siaw');
    });
});

describe('Inflection testing', () => {
    const infl = new TonalInflector();

    const lx1 = infl.inflectDesinence('giapp');

    test('check the inflected form', () => {
        expect(lx1.getForms()[0].literal).toEqual('giappw');
    });

    test('check the inflected form', () => {
        expect(lx1.getForms()[1].literal).toEqual('giappx');
    });
});

describe('Inflection testing', () => {
    const infl = new TonalInflector();

    const lx1 = infl.inflectDesinence('cattx');

    test('check the length of inflected forms', () => {
        expect(lx1.getForms().length).toEqual(0);
    });

    test('check the inflectional ending', () => {
        expect(lx1.getInflectionalEnding()).toEqual('x');
    });
});

describe('Inflection testing', () => {
    const infl = new TonalInflector();

    const lx1 = infl.inflectDesinence('ekkw');

    test('check the length of inflected forms', () => {
        expect(lx1.getForms().length).toEqual(0);
    });

    test('check the inflectional ending', () => {
        expect(lx1.getInflectionalEnding()).toEqual('w');
    });
});

describe('Inflection testing', () => {
    const infl = new TonalInflector();

    const lx1 = infl.inflectDesinence('dok');

    test('check the inflected form', () => {
        expect(lx1.getForms()[0].literal).toEqual('dokf');
    });
});

describe('Inflection testing', () => {
    const infl = new TonalInflector();

    const lx1 = infl.inflectDesinence('qurh');

    test('check the inflected form', () => {
        expect(lx1.getForms()[0].literal).toEqual('qurhy');
    });

    test('check the inflected form', () => {
        expect(lx1.getForms()[1].literal).toEqual('qurhf');
    });
});

describe('Inflection testing', () => {
    const infl = new TonalInflector();

    const lx1 = infl.inflectTransfix('chittwvoexiay');

    test('check the inflected form', () => {
        expect(lx1.getForms()[0].literal).toEqual('chittwvoewiaw');
    });
});

describe('Inflection testing', () => {
    const infl = new TonalInflector();

    const lx1 = infl.inflectTransfix('damwvurhhxoay');

    test('check the inflected form', () => {
        expect(lx1.getForms()[0].literal).toEqual('damwvurhhwoaw');
    });
});

describe('Inflection testing', () => {
    const crt = new TonalCreator();

    const lx1 = crt.createLexeme('qurh', new FourthToFirstCombining());

    test('check the inflected form', () => {
        expect(lx1.getForms()[0].literal).toEqual('qurhf');
    });
});
