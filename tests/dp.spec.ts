import { processor } from '../src/dparser/processor';
import { DependencyLabels } from '../src/dparser/symbols';

describe('Dependency parsing', () => {
  const doc = processor('gua khuannw tiurh');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(3);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.compoundPrt);
    expect(rs[0].head.text).toEqual('khuannw');
    expect(rs[0].dependent.text).toEqual('tiurh');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[1].head.text).toEqual('khuannw');
    expect(rs[1].dependent.text).toEqual('gua');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.root);
    expect(rs[2].head.text).toEqual('ROOT');
    expect(rs[2].dependent.text).toEqual('khuannw');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('gua khuanny tiurhw che');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(4);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.compoundPrt);
    expect(rs[0].head.text).toEqual('khuanny');
    expect(rs[0].dependent.text).toEqual('tiurhw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.obj);
    expect(rs[1].head.text).toEqual('khuanny');
    expect(rs[1].dependent.text).toEqual('che');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[2].head.text).toEqual('khuanny');
    expect(rs[2].dependent.text).toEqual('gua');
  });

  test('check the third relation', () => {
    expect(rs[3].dependency).toEqual(DependencyLabels.root);
    expect(rs[3].head.text).toEqual('ROOT');
    expect(rs[3].dependent.text).toEqual('khuanny');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('gua longy tiurhw che');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(4);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.compoundPrt);
    expect(rs[0].head.text).toEqual('longy');
    expect(rs[0].dependent.text).toEqual('tiurhw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.obj);
    expect(rs[1].head.text).toEqual('longy');
    expect(rs[1].dependent.text).toEqual('che');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[2].head.text).toEqual('longy');
    expect(rs[2].dependent.text).toEqual('gua');
  });

  test('check the third relation', () => {
    expect(rs[3].dependency).toEqual(DependencyLabels.root);
    expect(rs[3].head.text).toEqual('ROOT');
    expect(rs[3].dependent.text).toEqual('longy');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('che gua khuannw tiurh');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(4);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.compoundPrt);
    expect(rs[0].head.text).toEqual('khuannw');
    expect(rs[0].dependent.text).toEqual('tiurh');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[1].head.text).toEqual('khuannw');
    expect(rs[1].dependent.text).toEqual('gua');
  });

  test('check the second relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.dislocated);
    expect(rs[2].head.text).toEqual('khuannw');
    expect(rs[2].dependent.text).toEqual('che');
  });

  test('check the third relation', () => {
    expect(rs[3].dependency).toEqual(DependencyLabels.root);
    expect(rs[3].head.text).toEqual('ROOT');
    expect(rs[3].dependent.text).toEqual('khuannw');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('khuannw tiurh aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(3);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.compoundPrt);
    expect(rs[0].head.text).toEqual('khuannw');
    expect(rs[0].dependent.text).toEqual('tiurh');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.prt);
    expect(rs[1].head.text).toEqual('khuannw');
    expect(rs[1].dependent.text).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.root);
    expect(rs[2].head.text).toEqual('ROOT');
    expect(rs[2].dependent.text).toEqual('khuannw');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('khuannw aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(2);
  });

  test('check the second relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.prt);
    expect(rs[0].head.text).toEqual('khuannw');
    expect(rs[0].dependent.text).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.root);
    expect(rs[1].head.text).toEqual('ROOT');
    expect(rs[1].dependent.text).toEqual('khuannw');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('longw aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(2);
  });

  test('check the second relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.prt);
    expect(rs[0].head.text).toEqual('longw');
    expect(rs[0].dependent.text).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.root);
    expect(rs[1].head.text).toEqual('ROOT');
    expect(rs[1].dependent.text).toEqual('longw');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('gua khuannw tiurh aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(4);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.compoundPrt);
    expect(rs[0].head.text).toEqual('khuannw');
    expect(rs[0].dependent.text).toEqual('tiurh');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.prt);
    expect(rs[1].head.text).toEqual('khuannw');
    expect(rs[1].dependent.text).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[2].head.text).toEqual('khuannw');
    expect(rs[2].dependent.text).toEqual('gua');
  });

  test('check the fourth relation', () => {
    expect(rs[3].dependency).toEqual(DependencyLabels.root);
    expect(rs[3].head.text).toEqual('ROOT');
    expect(rs[3].dependent.text).toEqual('khuannw');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('phah aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(2);
  });

  test('check the second relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.prt);
    expect(rs[0].head.text).toEqual('phah');
    expect(rs[0].dependent.text).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.root);
    expect(rs[1].head.text).toEqual('ROOT');
    expect(rs[1].dependent.text).toEqual('phah');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('longw tiurh aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(3);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.compoundPrt);
    expect(rs[0].head.text).toEqual('longw');
    expect(rs[0].dependent.text).toEqual('tiurh');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.prt);
    expect(rs[1].head.text).toEqual('longw');
    expect(rs[1].dependent.text).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.root);
    expect(rs[2].head.text).toEqual('ROOT');
    expect(rs[2].dependent.text).toEqual('longw');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('kaz phah aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(3);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.prt);
    expect(rs[0].head.text).toEqual('phah');
    expect(rs[0].dependent.text).toEqual('aw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.aux);
    expect(rs[1].head.text).toEqual('phah');
    expect(rs[1].dependent.text).toEqual('kaz');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.root);
    expect(rs[2].head.text).toEqual('ROOT');
    expect(rs[2].dependent.text).toEqual('phah');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('gua kaz phah');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(3);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.aux);
    expect(rs[0].head.text).toEqual('phah');
    expect(rs[0].dependent.text).toEqual('kaz');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[1].head.text).toEqual('phah');
    expect(rs[1].dependent.text).toEqual('gua');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.root);
    expect(rs[2].head.text).toEqual('ROOT');
    expect(rs[2].dependent.text).toEqual('phah');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('gua kaz phah aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(4);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.prt);
    expect(rs[0].head.text).toEqual('phah');
    expect(rs[0].dependent.text).toEqual('aw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.aux);
    expect(rs[1].head.text).toEqual('phah');
    expect(rs[1].dependent.text).toEqual('kaz');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[2].head.text).toEqual('phah');
    expect(rs[2].dependent.text).toEqual('gua');
  });

  test('check the fourth relation', () => {
    expect(rs[3].dependency).toEqual(DependencyLabels.root);
    expect(rs[3].head.text).toEqual('ROOT');
    expect(rs[3].dependent.text).toEqual('phah');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('gua kaz khuannw aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(4);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.prt);
    expect(rs[0].head.text).toEqual('khuannw');
    expect(rs[0].dependent.text).toEqual('aw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.aux);
    expect(rs[1].head.text).toEqual('khuannw');
    expect(rs[1].dependent.text).toEqual('kaz');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[2].head.text).toEqual('khuannw');
    expect(rs[2].dependent.text).toEqual('gua');
  });

  test('check the fourth relation', () => {
    expect(rs[3].dependency).toEqual(DependencyLabels.root);
    expect(rs[3].head.text).toEqual('ROOT');
    expect(rs[3].dependent.text).toEqual('khuannw');
  });
});
