import {
  mutateInitialOfFollowingSyllable,
  mutateFinalOfPrecedingWord,
  mutateFinalOfPrecedingSyllable,
} from '../src/dparser/mutator';
import {
  unmutateInitialOfFollowingSyllable,
  unmutateFinalOfPrecedingWord,
  unmutateFinalOfPrecedingSyllable,
} from '../src/tonal/unmutator';
import { inflectDesinence } from '../src/dparser/inflector';

describe('Consonant mutation testing, agressive, duplifix', () => {
  const lx = mutateInitialOfFollowingSyllable('dittwditt');

  test('check the underlying form', () => {
    expect(lx.word.literal).toEqual('dittwditt');
  });

  test('check the surface form', () => {
    expect(lx.getForms()[0].literal).toEqual('dittwlitt');
  });
});

describe('Consonant unmutation testing, agressive, duplifix', () => {
  const lx = unmutateInitialOfFollowingSyllable('dittwlitt');

  test('check the surface form', () => {
    expect(lx.word.literal).toEqual('dittwlitt');
  });

  test('check the underlying form', () => {
    expect(lx.getForms()[0].literal).toEqual('dittwditt');
  });
});

describe('Consonant mutation testing, regressive, final consonant', () => {
  const phr = mutateFinalOfPrecedingWord('chittw', 'giahh');

  test('check the underlying form', () => {
    expect(phr.phrase.literal).toEqual('chittw giahh');
  });

  test('check the surface form', () => {
    expect(phr.getForms()[0].literal).toEqual('chiggw giahh');
  });
});

describe('Consonant unmutation testing, regressive, final consonant', () => {
  const phr = unmutateFinalOfPrecedingWord('chiggw', 'giahh');

  test('check the underlying form', () => {
    expect(phr.phrase.literal).toEqual('chiggw giahh');
  });

  test('check the surface form', () => {
    expect(phr.getForms()[0].literal).toEqual('chittw giahh');
  });
});

describe('Consonant mutation testing, b-, g-, h-, j-, l- for -b, -g, -l, -bb, -gg, -ll', () => {
  const lx1 = mutateFinalOfPrecedingSyllable('biettwbongx');

  test('check the surface form, -ttwb- to -llwb-', () => {
    expect(lx1.getForms()[0].literal).toEqual('biellwbongx');
  });

  const lx2 = mutateFinalOfPrecedingSyllable('chapwgoz');

  test('check the surface form, -ppwg- to -bbwg-', () => {
    expect(lx2.getForms()[0].literal).toEqual('chabwgoz');
  });

  const lx3 = mutateFinalOfPrecedingSyllable('chipfhoat');

  test('check the surface form, -pfh- to -bfh-', () => {
    expect(lx3.getForms()[0].literal).toEqual('chibfhoat');
  });

  const lx4 = mutateFinalOfPrecedingSyllable('okflangx');

  test('check the surface form, -kfl- to -gfl-', () => {
    expect(lx4.getForms()[0].literal).toEqual('ogflangx');
  });

  const lx5 = mutateFinalOfPrecedingSyllable('vattwjitt');

  test('check the surface form, -ttwj- to -llwj-', () => {
    expect(lx5.getForms()[0].literal).toEqual('vallwjitt');
  });
});

describe('Consonant unmutation testing, b-, g-, h-, j-, l- for -p, -k, -t, -pp, -kk, -tt', () => {
  const lx1 = unmutateFinalOfPrecedingSyllable('bielwbongx');

  test('check the surface form', () => {
    expect(lx1.getForms()[0].literal).toEqual('bietwbongx');
  });

  const lx2 = unmutateFinalOfPrecedingSyllable('chabbwgoz');

  test('check the surface form', () => {
    expect(lx2.getForms()[0].literal).toEqual('chappwgoz');
  });

  const lx3 = unmutateFinalOfPrecedingSyllable('chibfhoat');

  test('check the surface form', () => {
    expect(lx3.getForms()[0].literal).toEqual('chipfhoat');
  });

  const lx4 = unmutateFinalOfPrecedingSyllable('ogflangx');

  test('check the surface form', () => {
    expect(lx4.getForms()[0].literal).toEqual('okflangx');
  });

  const lx5 = unmutateFinalOfPrecedingSyllable('valwjitt');

  test('check the surface form, -llwj- to -ttwj-', () => {
    expect(lx5.getForms()[0].literal).toEqual('vatwjitt');
  });
});

describe('Consonant mutation testing, sandhi tt, t', () => {
  const lx1 = mutateFinalOfPrecedingSyllable('bittwpang');

  test('check the surface form', () => {
    expect(lx1.getForms()[0].literal).toEqual('bippwpang');
  });

  const lx2 = mutateFinalOfPrecedingSyllable('hietfkiw');

  test('check the surface form', () => {
    expect(lx2.getForms()[0].literal).toEqual('hiekfkiw');
  });
});

describe('Consonant mutation testing, internal sandhi, regressive', () => {
  const lx1 = mutateFinalOfPrecedingSyllable('pokfbuttwqoany');

  test('check the surface form', () => {
    expect(lx1.getForms()[0].literal).toEqual('pogfbukkwqoany');
  });

  const lx2 = inflectDesinence(lx1.getForms()[0].literal);

  test('check the inflected form', () => {
    expect(lx2.getForms()[0].literal).toEqual('pogfbukkwqoan');
  });

  const lx3 = mutateFinalOfPrecedingSyllable('cutfgoaz');

  test('check the surface form', () => {
    expect(lx3.getForms()[0].literal).toEqual('cugfgoaz');
  });

  const lx4 = mutateFinalOfPrecedingSyllable('vutfjinx');

  test('check the surface form', () => {
    expect(lx4.getForms()[0].literal).toEqual('vujfjinx');
  });
});

describe('Consonant mutation testing, internal sandhi, regressive', () => {
  const lx = mutateFinalOfPrecedingSyllable('sinzbunx');

  test('check the underlying form', () => {
    expect(lx.word.literal).toEqual('sinzbunx');
  });

  test('check the surface form', () => {
    expect(lx.getForms()[0].literal).toEqual('simzbunx');
  });

  const lx2 = mutateFinalOfPrecedingSyllable('dekfnax');

  test('check the underlying form, n-', () => {
    expect(lx2.word.literal).toEqual('dekfnax');
  });

  test('check the surface form, n-', () => {
    expect(lx2.getForms()[0].literal).toEqual('degfnax');
  });
  /*
  const lx3 = mutateFinalOfPrecedingSyllable('qekfngiz');

  test('check the underlying form, ng-', () => {
    expect(lx3.word.literal).toEqual('qekfngiz');
  });

  test('check the surface form, ng-', () => {
    expect(lx3.getForms()[0].literal).toEqual('qegfngiz');
  });
*/
  const lx4 = mutateFinalOfPrecedingSyllable('qekkwmngx');

  test('check the underlying form, m-', () => {
    expect(lx4.word.literal).toEqual('qekkwmngx');
  });

  test('check the surface form, m-', () => {
    expect(lx4.getForms()[0].literal).toEqual('qeggwmngx');
  });
});

describe('Consonant mutation testing, internal sandhi, regressive', () => {
  const lx = mutateFinalOfPrecedingSyllable('hitfnix');

  test('check the underlying form', () => {
    expect(lx.word.literal).toEqual('hitfnix');
  });

  test('check the surface form', () => {
    expect(lx.getForms()[0].literal).toEqual('hinhfnix');
  });
});

describe('Consonant mutation testing, 1 empty word', () => {
  const inputEmpty: any = '';

  const phr1 = mutateFinalOfPrecedingSyllable(inputEmpty);

  test('check the empty word', () => {
    expect(phr1.word.literal).toEqual('');
  });

  test('check the number of other forms of an empty word', () => {
    expect(phr1.getForms().length).toEqual(0);
  });

  const phr2 = mutateInitialOfFollowingSyllable(inputEmpty);

  test('check the empty word', () => {
    expect(phr2.word.literal).toEqual('');
  });

  test('check the number of other forms of an empty word', () => {
    expect(phr2.getForms().length).toEqual(0);
  });

  const phr3 = unmutateInitialOfFollowingSyllable(inputEmpty);

  test('check the empty word', () => {
    expect(phr3.word.literal).toEqual('');
  });

  test('check the number of other forms of an empty word', () => {
    expect(phr3.getForms().length).toEqual(0);
  });

  const phr4 = unmutateFinalOfPrecedingSyllable(inputEmpty);

  test('check the empty word', () => {
    expect(phr4.word.literal).toEqual('');
  });

  test('check the number of other forms of an empty word', () => {
    expect(phr4.getForms().length).toEqual(0);
  });
});

describe('Consonant mutation testing, undefined input', () => {
  const inputUnd: any = undefined;

  const phr1 = mutateFinalOfPrecedingSyllable(inputUnd);

  test('check the empty word', () => {
    expect(phr1.word.literal).toEqual('');
  });

  test('check the number of other forms of an undefined word', () => {
    expect(phr1.getForms().length).toEqual(0);
  });

  const phr2 = mutateInitialOfFollowingSyllable(inputUnd);

  test('check the empty word', () => {
    expect(phr2.word.literal).toEqual('');
  });

  test('check the number of other forms of an undefined word', () => {
    expect(phr2.getForms().length).toEqual(0);
  });

  const phr3 = unmutateInitialOfFollowingSyllable(inputUnd);

  test('check the empty word', () => {
    expect(phr3.word.literal).toEqual('');
  });

  test('check the number of other forms of an empty word', () => {
    expect(phr3.getForms().length).toEqual(0);
  });

  const phr4 = unmutateFinalOfPrecedingSyllable(inputUnd);

  test('check the empty word', () => {
    expect(phr4.word.literal).toEqual('');
  });

  test('check the number of other forms of an empty word', () => {
    expect(phr4.getForms().length).toEqual(0);
  });
});

describe('Consonant mutation testing, external sandhi, 2 empty words, 1 empty phrase', () => {
  const inputEmpty: any = '';

  const ph2 = mutateFinalOfPrecedingWord(inputEmpty, inputEmpty);

  test('check the empty phrase', () => {
    expect(ph2.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph2.getForms().length).toEqual(0);
  });
});

describe('Consonant mutation testing, external sandhi, undefined input', () => {
  const inputUnd: any = undefined;

  const ph1 = mutateFinalOfPrecedingWord(inputUnd, inputUnd);

  test('check the empty phrase', () => {
    expect(ph1.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an undefined phrase', () => {
    expect(ph1.getForms().length).toEqual(0);
  });
});
