import { TonalInflector } from '../src/dparser/inflector';
import { TonalAssimilator } from '../src/dparser/assimilator';

describe('Assimilation testing, -b, -g, -h, -l', () => {
    const assimi = new TonalAssimilator();

    const lx1 = assimi.assimilateRegressive('biettwbongx');

    test('check the surface form', () => {
        expect(lx1.getForms()[0].literal).toEqual('biellwbongx');
    });

    const lx2 = assimi.assimilateRegressive('chappwgoz');

    test('check the surface form', () => {
        expect(lx2.getForms()[0].literal).toEqual('chabbwgoz');
    });

    const lx3 = assimi.assimilateRegressive('chipfhoat');

    test('check the surface form', () => {
        expect(lx3.getForms()[0].literal).toEqual('chibfhoat');
    });

    const lx4 = assimi.assimilateRegressive('okflangx');

    test('check the surface form', () => {
        expect(lx4.getForms()[0].literal).toEqual('ogflangx');
    });
});

describe('Assimilation testing, euphonic t, tt', () => {
    const assimi = new TonalAssimilator();

    const lx1 = assimi.assimilateRegressive('bittwpang');

    test('check the surface form', () => {
        expect(lx1.getForms()[0].literal).toEqual('bippwpang');
    });

    const lx2 = assimi.assimilateRegressive('hietfkiw');

    test('check the surface form', () => {
        expect(lx2.getForms()[0].literal).toEqual('hiekfkiw');
    });
});

describe('Assimilation testing, internal sandhi', () => {
    const assimi = new TonalAssimilator();

    const lx1 = assimi.assimilateRegressive('pokfbuttwqoany');

    test('check the surface form', () => {
        expect(lx1.getForms()[0].literal).toEqual('pogfbukkwqoany');
    });

    const infl = new TonalInflector();
    const lx2 = infl.inflectDesinence(lx1.getForms()[0].literal);

    test('check the inflected form', () => {
        expect(lx2.getForms()[0].literal).toEqual('pogfbukkwqoan');
    });
});

describe('Assimilation testing, regressive', () => {
    const assimi = new TonalAssimilator();

    const lx = assimi.assimilateRegressive('sinzbunx');

    test('check the underlying form', () => {
        expect(lx.word.literal).toEqual('sinzbunx');
    });

    test('check the surface form', () => {
        expect(lx.getForms()[0].literal).toEqual('simzbunx');
    });
});

describe('Assimilation testing, agressive, duplifix', () => {
    const assimi = new TonalAssimilator();

    const lx = assimi.assimilateAgressive('dittwditt');

    test('check the underlying form', () => {
        expect(lx.word.literal).toEqual('dittwditt');
    });

    test('check the surface form', () => {
        expect(lx.getForms()[0].literal).toEqual('dittwlitt');
    });
});

describe('Assimilation testing, agressive, duplifix', () => {
    const assimi = new TonalAssimilator();

    const lx = assimi.assimilateRegressive('hitfnix');

    test('check the underlying form', () => {
        expect(lx.word.literal).toEqual('hitfnix');
    });

    test('check the surface form', () => {
        expect(lx.getForms()[0].literal).toEqual('hinhfnix');
    });
});

describe('Assimilation testing, nasalization', () => {
    const assimi = new TonalAssimilator();

    const lx = assimi.assimilateAgressive('ennxiay');

    test('check the underlying form', () => {
        expect(lx.word.literal).toEqual('ennxiay');
    });

    test('check the surface form', () => {
        expect(lx.getForms()[0].literal).toEqual('ennxianny');
    });
});
