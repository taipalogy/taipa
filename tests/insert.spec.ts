import {
  insertToFollowingSyllable,
  insertToFollowingWord,
} from '../src/dparser/inserter';
import { inflectDesinence } from '../src/dparser/inflector';
import {
  uninsertFromSyllable,
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
  const lx1 = uninsertFromSyllable('qimxmay');

  test('check the uninsertion of initial m', () => {
    expect(lx1.getForms()[0].literal).toEqual('qimxay');
  });

  const lx2 = uninsertFromSyllable('infnay');

  test('check the uninsertion of initial n', () => {
    expect(lx2.getForms()[0].literal).toEqual('infay');
  });

  const lx3 = uninsertFromSyllable('cangxngay');

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
