import { inflectDesinence } from '../src/dparser/inflector';
import {
  assimilateRegressiveLexical,
  assimilateRegressivePhrasal,
} from '../src/dparser/assimilator';
import { unassimilateRegressiveLexical } from '../src/tonal/unassimilator';

describe('Assimilation testing, b-, g-, h-, j-, l- for -b, -g, -l, -bb, -gg, -ll', () => {
  const lx1 = assimilateRegressiveLexical('biettwbongx');

  test('check the surface form, -ttwb- to llwb', () => {
    expect(lx1.getForms()[0].literal).toEqual('biellwbongx');
  });

  const lx2 = assimilateRegressiveLexical('chappwgoz');

  test('check the surface form, -ppwg- to -bbwg-', () => {
    expect(lx2.getForms()[0].literal).toEqual('chabbwgoz');
  });

  const lx3 = assimilateRegressiveLexical('chipfhoat');

  test('check the surface form, -pfh- to -bfh-', () => {
    expect(lx3.getForms()[0].literal).toEqual('chibfhoat');
  });

  const lx4 = assimilateRegressiveLexical('okflangx');

  test('check the surface form, -kfl- to -gfl-', () => {
    expect(lx4.getForms()[0].literal).toEqual('ogflangx');
  });

  const lx5 = assimilateRegressiveLexical('vattwjitt');

  test('check the surface form, -ttwj- to -llwj-', () => {
    expect(lx5.getForms()[0].literal).toEqual('vallwjitt');
  });
});

describe('Unassimilation testing, b-, g-, h-, j-, l- for -p, -k, -t, -pp, -kk, -tt', () => {
  const lx1 = unassimilateRegressiveLexical('biellwbongx');

  test('check the surface form', () => {
    expect(lx1.getForms()[0].literal).toEqual('biettwbongx');
  });

  const lx2 = unassimilateRegressiveLexical('chabbwgoz');

  test('check the surface form', () => {
    expect(lx2.getForms()[0].literal).toEqual('chappwgoz');
  });

  const lx3 = unassimilateRegressiveLexical('chibfhoat');

  test('check the surface form', () => {
    expect(lx3.getForms()[0].literal).toEqual('chipfhoat');
  });

  const lx4 = unassimilateRegressiveLexical('ogflangx');

  test('check the surface form', () => {
    expect(lx4.getForms()[0].literal).toEqual('okflangx');
  });

  const lx5 = unassimilateRegressiveLexical('vallwjitt');

  test('check the surface form, -llwj- to -ttwj-', () => {
    expect(lx5.getForms()[0].literal).toEqual('vattwjitt');
  });
});

describe('Assimilation testing, euphonic t, tt', () => {
  const lx1 = assimilateRegressiveLexical('bittwpang');

  test('check the surface form', () => {
    expect(lx1.getForms()[0].literal).toEqual('bippwpang');
  });

  const lx2 = assimilateRegressiveLexical('hietfkiw');

  test('check the surface form', () => {
    expect(lx2.getForms()[0].literal).toEqual('hiekfkiw');
  });
});

describe('Assimilation testing, internal sandhi, regressive', () => {
  const lx1 = assimilateRegressiveLexical('pokfbuttwqoany');

  test('check the surface form', () => {
    expect(lx1.getForms()[0].literal).toEqual('pogfbukkwqoany');
  });

  const lx2 = inflectDesinence(lx1.getForms()[0].literal);

  test('check the inflected form', () => {
    expect(lx2.getForms()[0].literal).toEqual('pogfbukkwqoan');
  });

  const lx3 = assimilateRegressiveLexical('cutfgoaz');

  test('check the surface form', () => {
    expect(lx3.getForms()[0].literal).toEqual('cugfgoaz');
  });

  const lx4 = assimilateRegressiveLexical('vutfjinx');

  test('check the surface form', () => {
    expect(lx4.getForms()[0].literal).toEqual('vujfjinx');
  });
});

describe('Assimilation testing, regressive', () => {
  const lx = assimilateRegressiveLexical('sinzbunx');

  test('check the underlying form', () => {
    expect(lx.word.literal).toEqual('sinzbunx');
  });

  test('check the surface form', () => {
    expect(lx.getForms()[0].literal).toEqual('simzbunx');
  });
});

describe('Assimilation testing, regressive', () => {
  const lx = assimilateRegressiveLexical('hitfnix');

  test('check the underlying form', () => {
    expect(lx.word.literal).toEqual('hitfnix');
  });

  test('check the surface form', () => {
    expect(lx.getForms()[0].literal).toEqual('hinhfnix');
  });
});

describe('Assimilation testing, regressive, phrasal', () => {
  const phr = assimilateRegressivePhrasal('chittw', 'giahh');

  test('check the underlying form', () => {
    expect(phr.phrase.literal).toEqual('chittw giahh');
  });

  test('check the surface form', () => {
    expect(phr.getForms()[0].literal).toEqual('chiggw giahh');
  });
});

describe('Assmilation testing, 1 empty word', () => {
  const inputEmpty: any = '';

  const phr1 = assimilateRegressiveLexical(inputEmpty);

  test('check the empty phrase', () => {
    expect(phr1.word.literal).toEqual('');
  });

  test('check the number of other forms of an empty word', () => {
    expect(phr1.getForms().length).toEqual(0);
  });
});

describe('Assmilation testing, undefined input', () => {
  const inputUnd: any = undefined;

  const phr1 = assimilateRegressiveLexical(inputUnd);

  test('check the empty phrase', () => {
    expect(phr1.word.literal).toEqual('');
  });

  test('check the number of other forms of an undefined word', () => {
    expect(phr1.getForms().length).toEqual(0);
  });
});

describe('Phrasal assmilation testing, 2 empty words, 1 empty phrase', () => {
  const inputEmpty: any = '';

  const ph2 = assimilateRegressivePhrasal(inputEmpty, inputEmpty);

  test('check the empty phrase', () => {
    expect(ph2.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph2.getForms().length).toEqual(0);
  });
});

describe('Phrasal assimilation testing, undefined input', () => {
  const inputUnd: any = undefined;

  const ph1 = assimilateRegressivePhrasal(inputUnd, inputUnd);

  test('check the empty phrase', () => {
    expect(ph1.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an undefined phrase', () => {
    expect(ph1.getForms().length).toEqual(0);
  });
});
