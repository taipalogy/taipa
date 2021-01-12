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
    expect(rs[0].head.token).toEqual('khuannw');
    expect(rs[0].dependent.token).toEqual('tiurh');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[1].head.token).toEqual('khuannw');
    expect(rs[1].dependent.token).toEqual('gua');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.root);
    expect(rs[2].head.token).toEqual('ROOT');
    expect(rs[2].dependent.token).toEqual('khuannw');
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
    expect(rs[0].head.token).toEqual('khuanny');
    expect(rs[0].dependent.token).toEqual('tiurhw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.obj);
    expect(rs[1].head.token).toEqual('khuanny');
    expect(rs[1].dependent.token).toEqual('che');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[2].head.token).toEqual('khuanny');
    expect(rs[2].dependent.token).toEqual('gua');
  });

  test('check the third relation', () => {
    expect(rs[3].dependency).toEqual(DependencyLabels.root);
    expect(rs[3].head.token).toEqual('ROOT');
    expect(rs[3].dependent.token).toEqual('khuanny');
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
    expect(rs[0].head.token).toEqual('longy');
    expect(rs[0].dependent.token).toEqual('tiurhw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.obj);
    expect(rs[1].head.token).toEqual('longy');
    expect(rs[1].dependent.token).toEqual('che');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[2].head.token).toEqual('longy');
    expect(rs[2].dependent.token).toEqual('gua');
  });

  test('check the third relation', () => {
    expect(rs[3].dependency).toEqual(DependencyLabels.root);
    expect(rs[3].head.token).toEqual('ROOT');
    expect(rs[3].dependent.token).toEqual('longy');
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
    expect(rs[0].head.token).toEqual('khuannw');
    expect(rs[0].dependent.token).toEqual('tiurh');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[1].head.token).toEqual('khuannw');
    expect(rs[1].dependent.token).toEqual('gua');
  });

  test('check the second relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.dislocated);
    expect(rs[2].head.token).toEqual('khuannw');
    expect(rs[2].dependent.token).toEqual('che');
  });

  test('check the third relation', () => {
    expect(rs[3].dependency).toEqual(DependencyLabels.root);
    expect(rs[3].head.token).toEqual('ROOT');
    expect(rs[3].dependent.token).toEqual('khuannw');
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
    expect(rs[0].head.token).toEqual('khuannw');
    expect(rs[0].dependent.token).toEqual('tiurh');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.prt);
    expect(rs[1].head.token).toEqual('khuannw');
    expect(rs[1].dependent.token).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.root);
    expect(rs[2].head.token).toEqual('ROOT');
    expect(rs[2].dependent.token).toEqual('khuannw');
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
    expect(rs[0].head.token).toEqual('khuannw');
    expect(rs[0].dependent.token).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.root);
    expect(rs[1].head.token).toEqual('ROOT');
    expect(rs[1].dependent.token).toEqual('khuannw');
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
    expect(rs[0].head.token).toEqual('longw');
    expect(rs[0].dependent.token).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.root);
    expect(rs[1].head.token).toEqual('ROOT');
    expect(rs[1].dependent.token).toEqual('longw');
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
    expect(rs[0].head.token).toEqual('khuannw');
    expect(rs[0].dependent.token).toEqual('tiurh');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.prt);
    expect(rs[1].head.token).toEqual('khuannw');
    expect(rs[1].dependent.token).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[2].head.token).toEqual('khuannw');
    expect(rs[2].dependent.token).toEqual('gua');
  });

  test('check the fourth relation', () => {
    expect(rs[3].dependency).toEqual(DependencyLabels.root);
    expect(rs[3].head.token).toEqual('ROOT');
    expect(rs[3].dependent.token).toEqual('khuannw');
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
    expect(rs[0].head.token).toEqual('phah');
    expect(rs[0].dependent.token).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.root);
    expect(rs[1].head.token).toEqual('ROOT');
    expect(rs[1].dependent.token).toEqual('phah');
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
    expect(rs[0].head.token).toEqual('longw');
    expect(rs[0].dependent.token).toEqual('tiurh');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.prt);
    expect(rs[1].head.token).toEqual('longw');
    expect(rs[1].dependent.token).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.root);
    expect(rs[2].head.token).toEqual('ROOT');
    expect(rs[2].dependent.token).toEqual('longw');
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
    expect(rs[0].head.token).toEqual('phah');
    expect(rs[0].dependent.token).toEqual('aw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.aux);
    expect(rs[1].head.token).toEqual('phah');
    expect(rs[1].dependent.token).toEqual('kaz');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.root);
    expect(rs[2].head.token).toEqual('ROOT');
    expect(rs[2].dependent.token).toEqual('phah');
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
    expect(rs[0].head.token).toEqual('phah');
    expect(rs[0].dependent.token).toEqual('kaz');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[1].head.token).toEqual('phah');
    expect(rs[1].dependent.token).toEqual('gua');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.root);
    expect(rs[2].head.token).toEqual('ROOT');
    expect(rs[2].dependent.token).toEqual('phah');
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
    expect(rs[0].head.token).toEqual('phah');
    expect(rs[0].dependent.token).toEqual('aw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.aux);
    expect(rs[1].head.token).toEqual('phah');
    expect(rs[1].dependent.token).toEqual('kaz');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[2].head.token).toEqual('phah');
    expect(rs[2].dependent.token).toEqual('gua');
  });

  test('check the fourth relation', () => {
    expect(rs[3].dependency).toEqual(DependencyLabels.root);
    expect(rs[3].head.token).toEqual('ROOT');
    expect(rs[3].dependent.token).toEqual('phah');
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
    expect(rs[0].head.token).toEqual('khuannw');
    expect(rs[0].dependent.token).toEqual('aw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.aux);
    expect(rs[1].head.token).toEqual('khuannw');
    expect(rs[1].dependent.token).toEqual('kaz');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[2].head.token).toEqual('khuannw');
    expect(rs[2].dependent.token).toEqual('gua');
  });

  test('check the fourth relation', () => {
    expect(rs[3].dependency).toEqual(DependencyLabels.root);
    expect(rs[3].head.token).toEqual('ROOT');
    expect(rs[3].dependent.token).toEqual('khuannw');
  });
});
