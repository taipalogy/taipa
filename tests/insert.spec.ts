import { insertToAffix } from '../src/dparser/inserter';
import { inflectDesinence } from '../src/dparser/inflector';
import { uninsertFromAffix } from '../src/tonal/uninserter';

describe('Epenthesis testing', () => {
  const lx1 = insertToAffix('qimxay');

  test('check the epenthesis of initial m', () => {
    expect(lx1.getForms()[0].literal).toEqual('qimxmay');
  });

  const lx2 = insertToAffix('infay');

  test('check the epenthesis of initial n', () => {
    expect(lx2.getForms()[0].literal).toEqual('infnay');
  });

  const lx3 = insertToAffix('cangxay');

  test('check the epenthesis of initial ng', () => {
    expect(lx3.getForms()[0].literal).toEqual('cangxngay');
  });
});

describe('Epenthesis testing', () => {
  const lx1 = inflectDesinence('qimxay');

  test('check the inflected form', () => {
    expect(lx1.getForms()[0].literal).toEqual('qimxa');
  });

  const lx2 = insertToAffix(lx1.getForms()[0].literal);

  test('check the epenthesis of initial m. surface form', () => {
    expect(lx2.getForms()[0].literal).toEqual('qimxma');
  });

  const lx3 = insertToAffix('qimza');

  test('check the epenthesis of initial m', () => {
    expect(lx3.getForms()[0].literal).toEqual('qimzma');
  });

  const lx4 = insertToAffix('ginfa');

  test('check the epenthesis of initial n', () => {
    expect(lx4.getForms()[0].literal).toEqual('ginfna');
  });

  const lx5 = insertToAffix('tangza');

  test('check the epenthesis of initial ng', () => {
    expect(lx5.getForms()[0].literal).toEqual('tangznga');
  });
});

describe('Uninsertion testing', () => {
  const lx1 = uninsertFromAffix('qimxmay');

  test('check the uninsertion of initial m', () => {
    expect(lx1.getForms()[0].literal).toEqual('qimxay');
  });

  const lx2 = uninsertFromAffix('infnay');

  test('check the uninsertion of initial n', () => {
    expect(lx2.getForms()[0].literal).toEqual('infay');
  });

  const lx3 = uninsertFromAffix('cangxngay');

  test('check the uninsertion of initial ng', () => {
    expect(lx3.getForms()[0].literal).toEqual('cangxay');
  });
});
