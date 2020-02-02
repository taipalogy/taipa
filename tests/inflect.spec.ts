import { Client } from '../src/client';
import { TonalSoundTags, TonalLetterTags } from '../src/tonal/version2';
import { TokenAnalysis } from '../src/token';
import { TonalInflector } from '../src/dparser/analyzer';
import {
    TonalDesinenceInflection,
    TransfixInflection,
    AgressiveAssimilation,
    RegressiveAssimilation,
} from '../src/dparser/lexeme';
import { TonalCombiningForms, ThirdCombiningForm } from '../src/dparser/morpheme';
import { TonalZeroCombining } from '../src/morpheme';

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

    const tw = nflctr.inflect('guzleng', new TonalCombiningForms(), new TonalDesinenceInflection());

    test('check the inflected form', () => {
        expect(tw.getProceedingForms()[0].literal).toEqual('guzlengz');
    });
});

describe('Inflection testing', () => {
    const nflctr = new TonalInflector();

    const tw = nflctr.inflect('damwvurhhxoay', new ThirdCombiningForm(), new TransfixInflection());

    test('check the inflected form', () => {
        expect(tw.getProceedingForms()[0].literal).toEqual('damwvurhhwoaw');
    });
});

describe('Inflection testing, absent lexical roots', () => {
    const nflctr = new TonalInflector();

    const tw1 = nflctr.inflect('s', new TonalCombiningForms(), new TonalDesinenceInflection());

    test('check the word', () => {
        expect(tw1.word.literal).toEqual('');
    });

    test('check the number of inflected forms', () => {
        expect(tw1.getProceedingForms().length).toEqual(0);
    });

    const tw2 = nflctr.inflect('on', new TonalCombiningForms(), new TonalDesinenceInflection());

    test('check the word', () => {
        expect(tw2.word.literal).toEqual('');
    });

    test('check the number of inflected forms', () => {
        expect(tw2.getProceedingForms().length).toEqual(0);
    });

    const tw3 = nflctr.inflect('ax', new TonalCombiningForms(), new TonalDesinenceInflection());

    test('check the word', () => {
        // it used to be an empty string
        // ax is now asserted after tone sandhi of ay is incorporated
        expect(tw3.word.literal).toEqual('ax');
    });

    test('check the number of inflected forms', () => {
        // it used to be 0
        // 2 is now asserted after tone sandhi of ay is incorporated
        expect(tw3.getProceedingForms().length).toEqual(2);
    });

    const str = 'chimhhw';
    const tw4 = nflctr.inflect(str, new TonalCombiningForms(), new TonalDesinenceInflection());

    test('check the word', () => {
        expect(tw4.word.literal).toEqual(str);
    });

    test('check the number of inflected forms', () => {
        expect(tw4.getProceedingForms().length).toEqual(0);
    });
});

describe('Inflection testing, absent lexical roots', () => {
    const nflctr = new TonalInflector();

    const inputUnd: any = undefined;
    const inputEmpty: any = '';

    const lexeme1 = nflctr.inflect(inputUnd, new TonalCombiningForms(), new TonalDesinenceInflection());

    test('check the word literal', () => {
        expect(lexeme1.word.literal).toEqual('');
    });

    test('check the number of forms', () => {
        expect(lexeme1.getProceedingForms().length).toEqual(0);
    });

    const lexeme2 = nflctr.inflect(inputEmpty, new TonalCombiningForms(), new TonalDesinenceInflection());

    test('check the word literal', () => {
        expect(lexeme2.word.literal).toEqual('');
    });

    test('check the number of forms', () => {
        expect(lexeme2.getProceedingForms().length).toEqual(0);
    });

    const lexeme3 = nflctr.inflect(inputUnd, new ThirdCombiningForm(), new TransfixInflection());

    test('check the word literal', () => {
        expect(lexeme3.word.literal).toEqual('');
    });

    test('check the number of forms', () => {
        expect(lexeme3.getProceedingForms().length).toEqual(0);
    });

    const lexeme4 = nflctr.inflect(inputUnd, new ThirdCombiningForm(), new TransfixInflection());

    test('check the word literal', () => {
        expect(lexeme4.word.literal).toEqual('');
    });

    test('check the number of forms', () => {
        expect(lexeme4.getProceedingForms().length).toEqual(0);
    });
});

describe('Inflection testing', () => {
    const nflctr = new TonalInflector();

    const lexeme1 = nflctr.inflect('infay', new TonalZeroCombining(), new AgressiveAssimilation());

    test('check the epenthesis of initial n', () => {
        expect(lexeme1.getProceedingForms()[0].literal).toEqual('infnay');
    });

    const lexeme2 = nflctr.inflect('qimxay', new TonalZeroCombining(), new AgressiveAssimilation());

    test('check the epenthesis of initial m', () => {
        expect(lexeme2.getProceedingForms()[0].literal).toEqual('qimxmay');
    });

    const lexeme3 = nflctr.inflect('cangxay', new TonalZeroCombining(), new AgressiveAssimilation());

    test('check the epenthesis of initial m', () => {
        expect(lexeme3.getProceedingForms()[0].literal).toEqual('cangxngay');
    });
});

describe('Inflection testing, with x in the middle of a stem', () => {
    const nflctr = new TonalInflector();

    const lx = nflctr.inflect('moxsek', new TonalCombiningForms(), new TonalDesinenceInflection());

    test('check the base form', () => {
        expect(lx.word.literal).toEqual('');
    });

    test('check the inflected form', () => {
        expect(lx.getProceedingForms().length).toEqual(0);
    });
});

describe('Inflection testing, regressive assimilation', () => {
    const nflctr = new TonalInflector();

    const lx = nflctr.inflect('sinzbunx', new TonalZeroCombining(), new RegressiveAssimilation());

    test('check the underlying form', () => {
        expect(lx.word.literal).toEqual('sinzbunx');
    });

    test('check the surface form', () => {
        expect(lx.getProceedingForms()[0].literal).toEqual('simzbunx');
    });
});

describe('Inflection testing, agressive assimilation, duplifix', () => {
    const nflctr = new TonalInflector();

    const lx = nflctr.inflect('dittwditt', new TonalZeroCombining(), new AgressiveAssimilation());

    test('check the underlying form', () => {
        expect(lx.word.literal).toEqual('dittwditt');
    });

    test('check the surface form', () => {
        expect(lx.getProceedingForms()[0].literal).toEqual('dittwlitt');
    });
});

describe('Inflection testing', () => {
    const nflctr = new TonalInflector();

    const lx1 = nflctr.inflect('qimxay', new TonalCombiningForms(), new TonalDesinenceInflection());

    test('check the inflected form', () => {
        expect(lx1.getProceedingForms()[0].literal).toEqual('qimxa');
    });

    const lx2 = nflctr.inflect(
        lx1.getProceedingForms()[0].literal,
        new TonalZeroCombining(),
        new AgressiveAssimilation(),
    );

    test('check the surface form', () => {
        expect(lx2.getProceedingForms()[0].literal).toEqual('qimxma');
    });
});
