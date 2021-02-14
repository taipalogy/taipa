import { depParse } from '../src/dparser/processor';
import { DepRelations } from '../src/dparser/symbols';

describe('Dependency parsing', () => {
  const doc = depParse('gua khuannw tiurh');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(3);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DepRelations.compoundPrt);
    expect(rs[0].head.token).toEqual('khuannw');
    expect(rs[0].dependent.token).toEqual('tiurh');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DepRelations.nsubj);
    expect(rs[1].head.token).toEqual('khuannw');
    expect(rs[1].dependent.token).toEqual('gua');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DepRelations.root);
    expect(rs[2].head.token).toEqual('ROOT');
    expect(rs[2].dependent.token).toEqual('khuannw');
  });
});

describe('Dependency parsing', () => {
  const doc = depParse('gua khuanny tiurhw che');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(4);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DepRelations.compoundPrt);
    expect(rs[0].head.token).toEqual('khuanny');
    expect(rs[0].dependent.token).toEqual('tiurhw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DepRelations.obj);
    expect(rs[1].head.token).toEqual('khuanny');
    expect(rs[1].dependent.token).toEqual('che');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DepRelations.nsubj);
    expect(rs[2].head.token).toEqual('khuanny');
    expect(rs[2].dependent.token).toEqual('gua');
  });

  test('check the third relation', () => {
    expect(rs[3].dependency).toEqual(DepRelations.root);
    expect(rs[3].head.token).toEqual('ROOT');
    expect(rs[3].dependent.token).toEqual('khuanny');
  });
});

describe('Dependency parsing', () => {
  const doc = depParse('gua longy tiurhw che');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(4);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DepRelations.compoundPrt);
    expect(rs[0].head.token).toEqual('longy');
    expect(rs[0].dependent.token).toEqual('tiurhw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DepRelations.obj);
    expect(rs[1].head.token).toEqual('longy');
    expect(rs[1].dependent.token).toEqual('che');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DepRelations.nsubj);
    expect(rs[2].head.token).toEqual('longy');
    expect(rs[2].dependent.token).toEqual('gua');
  });

  test('check the third relation', () => {
    expect(rs[3].dependency).toEqual(DepRelations.root);
    expect(rs[3].head.token).toEqual('ROOT');
    expect(rs[3].dependent.token).toEqual('longy');
  });
});

describe('Dependency parsing', () => {
  const doc = depParse('che gua khuannw tiurh');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(4);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DepRelations.compoundPrt);
    expect(rs[0].head.token).toEqual('khuannw');
    expect(rs[0].dependent.token).toEqual('tiurh');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DepRelations.nsubj);
    expect(rs[1].head.token).toEqual('khuannw');
    expect(rs[1].dependent.token).toEqual('gua');
  });

  test('check the second relation', () => {
    expect(rs[2].dependency).toEqual(DepRelations.dislocated);
    expect(rs[2].head.token).toEqual('khuannw');
    expect(rs[2].dependent.token).toEqual('che');
  });

  test('check the third relation', () => {
    expect(rs[3].dependency).toEqual(DepRelations.root);
    expect(rs[3].head.token).toEqual('ROOT');
    expect(rs[3].dependent.token).toEqual('khuannw');
  });
});

describe('Dependency parsing', () => {
  const doc = depParse('khuannw tiurh aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(3);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DepRelations.compoundPrt);
    expect(rs[0].head.token).toEqual('khuannw');
    expect(rs[0].dependent.token).toEqual('tiurh');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DepRelations.prt);
    expect(rs[1].head.token).toEqual('khuannw');
    expect(rs[1].dependent.token).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DepRelations.root);
    expect(rs[2].head.token).toEqual('ROOT');
    expect(rs[2].dependent.token).toEqual('khuannw');
  });
});

describe('Dependency parsing', () => {
  const doc = depParse('khuannw aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(2);
  });

  test('check the second relation', () => {
    expect(rs[0].dependency).toEqual(DepRelations.prt);
    expect(rs[0].head.token).toEqual('khuannw');
    expect(rs[0].dependent.token).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[1].dependency).toEqual(DepRelations.root);
    expect(rs[1].head.token).toEqual('ROOT');
    expect(rs[1].dependent.token).toEqual('khuannw');
  });
});

describe('Dependency parsing', () => {
  const doc = depParse('longw aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(2);
  });

  test('check the second relation', () => {
    expect(rs[0].dependency).toEqual(DepRelations.prt);
    expect(rs[0].head.token).toEqual('longw');
    expect(rs[0].dependent.token).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[1].dependency).toEqual(DepRelations.root);
    expect(rs[1].head.token).toEqual('ROOT');
    expect(rs[1].dependent.token).toEqual('longw');
  });
});

describe('Dependency parsing', () => {
  const doc = depParse('gua khuannw tiurh aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(4);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DepRelations.compoundPrt);
    expect(rs[0].head.token).toEqual('khuannw');
    expect(rs[0].dependent.token).toEqual('tiurh');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DepRelations.prt);
    expect(rs[1].head.token).toEqual('khuannw');
    expect(rs[1].dependent.token).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DepRelations.nsubj);
    expect(rs[2].head.token).toEqual('khuannw');
    expect(rs[2].dependent.token).toEqual('gua');
  });

  test('check the fourth relation', () => {
    expect(rs[3].dependency).toEqual(DepRelations.root);
    expect(rs[3].head.token).toEqual('ROOT');
    expect(rs[3].dependent.token).toEqual('khuannw');
  });
});

describe('Dependency parsing', () => {
  const doc = depParse('phah aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(2);
  });

  test('check the second relation', () => {
    expect(rs[0].dependency).toEqual(DepRelations.prt);
    expect(rs[0].head.token).toEqual('phah');
    expect(rs[0].dependent.token).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[1].dependency).toEqual(DepRelations.root);
    expect(rs[1].head.token).toEqual('ROOT');
    expect(rs[1].dependent.token).toEqual('phah');
  });
});

describe('Dependency parsing', () => {
  const doc = depParse('longw tiurh aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(3);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DepRelations.compoundPrt);
    expect(rs[0].head.token).toEqual('longw');
    expect(rs[0].dependent.token).toEqual('tiurh');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DepRelations.prt);
    expect(rs[1].head.token).toEqual('longw');
    expect(rs[1].dependent.token).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DepRelations.root);
    expect(rs[2].head.token).toEqual('ROOT');
    expect(rs[2].dependent.token).toEqual('longw');
  });
});

describe('Dependency parsing', () => {
  const doc = depParse('kaz phah aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(3);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DepRelations.prt);
    expect(rs[0].head.token).toEqual('phah');
    expect(rs[0].dependent.token).toEqual('aw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DepRelations.aux);
    expect(rs[1].head.token).toEqual('phah');
    expect(rs[1].dependent.token).toEqual('kaz');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DepRelations.root);
    expect(rs[2].head.token).toEqual('ROOT');
    expect(rs[2].dependent.token).toEqual('phah');
  });
});

describe('Dependency parsing', () => {
  const doc = depParse('gua kaz phah');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(3);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DepRelations.aux);
    expect(rs[0].head.token).toEqual('phah');
    expect(rs[0].dependent.token).toEqual('kaz');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DepRelations.nsubj);
    expect(rs[1].head.token).toEqual('phah');
    expect(rs[1].dependent.token).toEqual('gua');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DepRelations.root);
    expect(rs[2].head.token).toEqual('ROOT');
    expect(rs[2].dependent.token).toEqual('phah');
  });
});

describe('Dependency parsing', () => {
  const doc = depParse('gua kaz phah aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(4);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DepRelations.prt);
    expect(rs[0].head.token).toEqual('phah');
    expect(rs[0].dependent.token).toEqual('aw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DepRelations.aux);
    expect(rs[1].head.token).toEqual('phah');
    expect(rs[1].dependent.token).toEqual('kaz');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DepRelations.nsubj);
    expect(rs[2].head.token).toEqual('phah');
    expect(rs[2].dependent.token).toEqual('gua');
  });

  test('check the fourth relation', () => {
    expect(rs[3].dependency).toEqual(DepRelations.root);
    expect(rs[3].head.token).toEqual('ROOT');
    expect(rs[3].dependent.token).toEqual('phah');
  });
});

describe('Dependency parsing', () => {
  const doc = depParse('gua kaz khuannw aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(4);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DepRelations.prt);
    expect(rs[0].head.token).toEqual('khuannw');
    expect(rs[0].dependent.token).toEqual('aw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DepRelations.aux);
    expect(rs[1].head.token).toEqual('khuannw');
    expect(rs[1].dependent.token).toEqual('kaz');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DepRelations.nsubj);
    expect(rs[2].head.token).toEqual('khuannw');
    expect(rs[2].dependent.token).toEqual('gua');
  });

  test('check the fourth relation', () => {
    expect(rs[3].dependency).toEqual(DepRelations.root);
    expect(rs[3].head.token).toEqual('ROOT');
    expect(rs[3].dependent.token).toEqual('khuannw');
  });
});
