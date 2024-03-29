import {
  mutateInitialOfFollowingSyllable,
  mutateFinalOfPrecedingWord,
  mutateFinalConsonantOfPrecedingSyllable,
} from '../src/change/mutator';
import {
  unmutateInitialOfFollowingSyllable,
  unmutateFinalOfPrecedingWord,
  unmutateFinalOfPrecedingSyllable,
} from '../src/unchange/unmutator';
import { inflectDesinence } from '../src/change/inflector';

describe('Consonant mutation testing, agressive, duplifix', () => {
  const lx = mutateInitialOfFollowingSyllable('titwtitt');

  test('check the underlying form', () => {
    expect(lx.word.literal).toEqual('titwtitt');
  });

  test('check the surface form', () => {
    expect(lx.getForms()[0].literal).toEqual('titwlitt');
  });
});

describe('Consonant unmutation testing, agressive, duplifix', () => {
  const lx = unmutateInitialOfFollowingSyllable('titwlitt');

  test('check the surface form', () => {
    expect(lx.word.literal).toEqual('titwlitt');
  });

  test('check the underlying form', () => {
    expect(lx.getForms()[0].literal).toEqual('titwtitt');
  });
});

describe('Consonant mutation testing, regressive, final consonant', () => {
  const phr = mutateFinalOfPrecedingWord('chitw', 'giahh');

  test('check the underlying form', () => {
    expect(phr.phrase.literal).toEqual('chitw giahh');
  });

  test('check the surface form', () => {
    expect(phr.getForms()[0].literal).toEqual('chigw giahh');
  });
});

describe('Consonant unmutation testing, regressive, final consonant', () => {
  const phr = unmutateFinalOfPrecedingWord('chigw', 'giahh');

  test('check the underlying form', () => {
    expect(phr.phrase.literal).toEqual('chigw giahh');
  });

  test('check the surface form', () => {
    expect(phr.getForms()[0].literal).toEqual('chittw giahh');
  });
});

describe('Consonant mutation testing, b-, g-, h-, j-, l- for -b, -g, -l, -bb, -gg, -ll', () => {
  const lx1 = mutateFinalConsonantOfPrecedingSyllable('bietwbongx');

  test('check the surface form, -twb- to -lwb-', () => {
    expect(lx1.getForms()[0].literal).toEqual('bielwbongx');
  });

  const lx2 = mutateFinalConsonantOfPrecedingSyllable('chapwgoz');

  test('check the surface form, -pwg- to -bwg-', () => {
    expect(lx2.getForms()[0].literal).toEqual('chabwgoz');
  });

  const lx3 = mutateFinalConsonantOfPrecedingSyllable('chipfhuat');

  test('check the surface form, -pfh- to -bfh-', () => {
    expect(lx3.getForms()[0].literal).toEqual('chibfhuat');
  });

  const lx4 = mutateFinalConsonantOfPrecedingSyllable('okflangx');

  test('check the surface form, -kfl- to -gfl-', () => {
    expect(lx4.getForms()[0].literal).toEqual('ogflangx');
  });

  const lx5 = mutateFinalConsonantOfPrecedingSyllable('patwjitt');

  test('check the surface form, -twj- to -lwj-', () => {
    expect(lx5.getForms()[0].literal).toEqual('palwjitt');
  });
});

describe('Consonant unmutation testing, b-, g-, h-, j-, l- for -p, -k, -t, -pp, -kk, -tt', () => {
  const lx1 = unmutateFinalOfPrecedingSyllable('bielwbongx');

  test('check the surface form', () => {
    expect(lx1.getForms()[0].literal).toEqual('bietwbongx');
  });

  const lx2 = unmutateFinalOfPrecedingSyllable('chabwgoz');

  test('check the surface form', () => {
    expect(lx2.getForms()[0].literal).toEqual('chapwgoz');
  });

  const lx3 = unmutateFinalOfPrecedingSyllable('chibfhuat');

  test('check the surface form', () => {
    expect(lx3.getForms()[0].literal).toEqual('chipfhuat');
  });

  const lx4 = unmutateFinalOfPrecedingSyllable('ogflangx');

  test('check the surface form', () => {
    expect(lx4.getForms()[0].literal).toEqual('okflangx');
  });

  const lx5 = unmutateFinalOfPrecedingSyllable('palwjitt');

  test('check the surface form, -lwj- to -twj-', () => {
    expect(lx5.getForms()[0].literal).toEqual('patwjitt');
  });
});

describe('Consonant mutation testing, sandhi tt, t', () => {
  const lx1 = mutateFinalConsonantOfPrecedingSyllable('bitwpang');

  test('check the surface form', () => {
    expect(lx1.getForms()[0].literal).toEqual('bipwpang');
  });

  const lx2 = mutateFinalConsonantOfPrecedingSyllable('hietfkiw');

  test('check the surface form', () => {
    expect(lx2.getForms()[0].literal).toEqual('hiekfkiw');
  });
});

describe('Consonant mutation testing, internal sandhi, regressive', () => {
  const lx1 = mutateFinalConsonantOfPrecedingSyllable('phokfbutwkuany');

  test('check the surface form', () => {
    expect(lx1.getForms()[0].literal).toEqual('phogfbukwkuany');
  });

  const lx2 = inflectDesinence(lx1.getForms()[0].literal);

  test('check the inflected form', () => {
    expect(lx2.getForms()[0].literal).toEqual('phogfbukwkuan');
  });

  const lx3 = mutateFinalConsonantOfPrecedingSyllable('cutfguaz');

  test('check the surface form', () => {
    expect(lx3.getForms()[0].literal).toEqual('cugfguaz');
  });

  const lx4 = mutateFinalConsonantOfPrecedingSyllable('putfjinx');

  test('check the surface form', () => {
    expect(lx4.getForms()[0].literal).toEqual('pujfjinx');
  });
});

describe('Consonant mutation testing, internal sandhi, regressive', () => {
  const lx = mutateFinalConsonantOfPrecedingSyllable('sinzbunx');

  test('check the underlying form', () => {
    expect(lx.word.literal).toEqual('sinzbunx');
  });

  test('check the surface form', () => {
    expect(lx.getForms()[0].literal).toEqual('simzbunx');
  });

  const lx2 = mutateFinalConsonantOfPrecedingSyllable('tekfnax');

  test('check the underlying form, n-', () => {
    expect(lx2.word.literal).toEqual('tekfnax');
  });

  test('check the surface form, n-', () => {
    expect(lx2.getForms()[0].literal).toEqual('tegfnax');
  });
  /*
  const lx3 = mutateFinalOfPrecedingSyllable('kekfngiz');

  test('check the underlying form, ng-', () => {
    expect(lx3.word.literal).toEqual('kekfngiz');
  });

  test('check the surface form, ng-', () => {
    expect(lx3.getForms()[0].literal).toEqual('kegfngiz');
  });
*/
  const lx4 = mutateFinalConsonantOfPrecedingSyllable('kekwmngx');

  test('check the underlying form, m-', () => {
    expect(lx4.word.literal).toEqual('kekwmngx');
  });

  test('check the surface form, m-', () => {
    expect(lx4.getForms()[0].literal).toEqual('kegwmngx');
  });
});

describe('Consonant mutation testing, internal sandhi, regressive', () => {
  const lx = mutateFinalConsonantOfPrecedingSyllable('hitfnix');

  test('check the underlying form', () => {
    expect(lx.word.literal).toEqual('hitfnix');
  });

  test('check the surface form', () => {
    expect(lx.getForms()[0].literal).toEqual('hinhfnix');
  });
});

describe('Consonant mutation testing, 1 empty word', () => {
  const inputEmpty: any = '';

  const phr1 = mutateFinalConsonantOfPrecedingSyllable(inputEmpty);

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

  const phr1 = mutateFinalConsonantOfPrecedingSyllable(inputUnd);

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
