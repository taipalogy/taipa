import {
  insertToFollowingSyllable,
  insertToFollowingWord,
} from '../src/dparser/inserter';
import { inflectDesinence } from '../src/dparser/inflector';
import {
  uninsertFromFollowingSyllable,
  uninsertFromFollowingWord,
} from '../src/tonal/uninserter';

describe('Epenthesis testing', () => {
  const lx1 = insertToFollowingSyllable('qimxay');

  test('check the epenthesis of initial m', () => {
    expect(lx1.getForms()[0].literal).toEqual('qimxmay');
  });

  const lx2 = insertToFollowingSyllable('infay');

  test('check the epenthesis of initial n', () => {
    expect(lx2.getForms()[0].literal).toEqual('infnay');
  });

  const lx3 = insertToFollowingSyllable('cangxay');

  test('check the epenthesis of initial ng', () => {
    expect(lx3.getForms()[0].literal).toEqual('cangxngay');
  });
});

describe('Epenthesis testing', () => {
  const lx1 = inflectDesinence('qimxay');

  test('check the inflected form', () => {
    expect(lx1.getForms()[0].literal).toEqual('qimxa');
  });

  const lx2 = insertToFollowingSyllable(lx1.getForms()[0].literal);

  test('check the epenthesis of initial m. surface form', () => {
    expect(lx2.getForms()[0].literal).toEqual('qimxma');
  });

  const lx3 = insertToFollowingSyllable('qimza');

  test('check the epenthesis of initial m', () => {
    expect(lx3.getForms()[0].literal).toEqual('qimzma');
  });

  const lx4 = insertToFollowingSyllable('ginfa');

  test('check the epenthesis of initial n', () => {
    expect(lx4.getForms()[0].literal).toEqual('ginfna');
  });

  const lx5 = insertToFollowingSyllable('tangza');

  test('check the epenthesis of initial ng', () => {
    expect(lx5.getForms()[0].literal).toEqual('tangznga');
  });
});

describe('Uninsertion testing', () => {
  const lx1 = uninsertFromFollowingSyllable('qimxmay');

  test('check the uninsertion of initial m', () => {
    expect(lx1.getForms()[0].literal).toEqual('qimxay');
  });

  const lx2 = uninsertFromFollowingSyllable('infnay');

  test('check the uninsertion of initial n', () => {
    expect(lx2.getForms()[0].literal).toEqual('infay');
  });

  const lx3 = uninsertFromFollowingSyllable('cangxngay');

  test('check the uninsertion of initial ng', () => {
    expect(lx3.getForms()[0].literal).toEqual('cangxay');
  });
});

describe('Insertion testing', () => {
  const lx1 = insertToFollowingWord('lim', 'a');

  test('check the underlying form', () => {
    expect(lx1.phrase.literal).toEqual('lim a');
  });

  test('check the surface form', () => {
    expect(lx1.getForms()[0].literal).toEqual('lim ma');
  });
});

describe('Uninsertion testing', () => {
  const lx1 = uninsertFromFollowingWord('lim', 'ma');

  test('check the surface form', () => {
    expect(lx1.phrase.literal).toEqual('lim ma');
  });

  test('check the underlying form', () => {
    expect(lx1.getForms()[0].literal).toEqual('lim a');
  });
});

describe('Insertion testing, 1 empty word', () => {
  const inputEmpty: any = '';

  const phr1 = insertToFollowingSyllable(inputEmpty);

  test('check the empty phrase', () => {
    expect(phr1.word.literal).toEqual('');
  });

  test('check the number of other forms of an empty word', () => {
    expect(phr1.getForms().length).toEqual(0);
  });

  const phr2 = uninsertFromFollowingSyllable(inputEmpty);

  test('check the empty phrase', () => {
    expect(phr2.word.literal).toEqual('');
  });

  test('check the number of other forms of an empty word', () => {
    expect(phr2.getForms().length).toEqual(0);
  });
});

describe('Insertion testing, undefined input', () => {
  const inputUnd: any = undefined;

  const phr1 = insertToFollowingSyllable(inputUnd);

  test('check the empty phrase', () => {
    expect(phr1.word.literal).toEqual('');
  });

  test('check the number of other forms of an undefined word', () => {
    expect(phr1.getForms().length).toEqual(0);
  });

  const phr2 = uninsertFromFollowingSyllable(inputUnd);

  test('check the empty phrase', () => {
    expect(phr2.word.literal).toEqual('');
  });

  test('check the number of other forms of an undefined word', () => {
    expect(phr2.getForms().length).toEqual(0);
  });
});

describe('Phrasal insertion testing, 2 empty words, 1 empty phrase', () => {
  const inputEmpty: any = '';

  const ph1 = insertToFollowingWord(inputEmpty, inputEmpty);

  test('check the empty phrase', () => {
    expect(ph1.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph1.getForms().length).toEqual(0);
  });

  const ph2 = uninsertFromFollowingWord(inputEmpty, inputEmpty);

  test('check the empty phrase', () => {
    expect(ph2.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an empty phrase', () => {
    expect(ph2.getForms().length).toEqual(0);
  });
});

describe('Phrasal insertion testing, undefined input', () => {
  const inputUnd: any = undefined;

  const ph1 = insertToFollowingWord(inputUnd, inputUnd);

  test('check the empty phrase', () => {
    expect(ph1.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an undefined phrase', () => {
    expect(ph1.getForms().length).toEqual(0);
  });

  const ph2 = uninsertFromFollowingWord(inputUnd, inputUnd);

  test('check the empty phrase', () => {
    expect(ph2.phrase.literal).toEqual('');
  });

  test('check the number of other forms of an undefined phrase', () => {
    expect(ph2.getForms().length).toEqual(0);
  });
});
