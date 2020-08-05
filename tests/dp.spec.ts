import { processor } from '../src/dparser/processor';
import { DependencyLabels } from '../src/dparser/symbols';

describe('Dependency parsing', () => {
  const doc = processor('goa koannw diurh');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(3);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.compoundPrt);
    expect(rs[0].head.text).toEqual('koannw');
    expect(rs[0].dependent.text).toEqual('diurh');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[1].head.text).toEqual('koannw');
    expect(rs[1].dependent.text).toEqual('goa');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.root);
    expect(rs[2].head.text).toEqual('ROOT');
    expect(rs[2].dependent.text).toEqual('koannw');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('goa koanny diurhw che');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(4);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.compoundPrt);
    expect(rs[0].head.text).toEqual('koanny');
    expect(rs[0].dependent.text).toEqual('diurhw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.obj);
    expect(rs[1].head.text).toEqual('koanny');
    expect(rs[1].dependent.text).toEqual('che');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[2].head.text).toEqual('koanny');
    expect(rs[2].dependent.text).toEqual('goa');
  });

  test('check the third relation', () => {
    expect(rs[3].dependency).toEqual(DependencyLabels.root);
    expect(rs[3].head.text).toEqual('ROOT');
    expect(rs[3].dependent.text).toEqual('koanny');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('goa longy diurhw che');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(4);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.compoundPrt);
    expect(rs[0].head.text).toEqual('longy');
    expect(rs[0].dependent.text).toEqual('diurhw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.obj);
    expect(rs[1].head.text).toEqual('longy');
    expect(rs[1].dependent.text).toEqual('che');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[2].head.text).toEqual('longy');
    expect(rs[2].dependent.text).toEqual('goa');
  });

  test('check the third relation', () => {
    expect(rs[3].dependency).toEqual(DependencyLabels.root);
    expect(rs[3].head.text).toEqual('ROOT');
    expect(rs[3].dependent.text).toEqual('longy');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('che goa koannw diurh');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(4);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.compoundPrt);
    expect(rs[0].head.text).toEqual('koannw');
    expect(rs[0].dependent.text).toEqual('diurh');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[1].head.text).toEqual('koannw');
    expect(rs[1].dependent.text).toEqual('goa');
  });

  test('check the second relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.dislocated);
    expect(rs[2].head.text).toEqual('koannw');
    expect(rs[2].dependent.text).toEqual('che');
  });

  test('check the third relation', () => {
    expect(rs[3].dependency).toEqual(DependencyLabels.root);
    expect(rs[3].head.text).toEqual('ROOT');
    expect(rs[3].dependent.text).toEqual('koannw');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('koannw diurh aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(3);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.compoundPrt);
    expect(rs[0].head.text).toEqual('koannw');
    expect(rs[0].dependent.text).toEqual('diurh');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.prt);
    expect(rs[1].head.text).toEqual('koannw');
    expect(rs[1].dependent.text).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.root);
    expect(rs[2].head.text).toEqual('ROOT');
    expect(rs[2].dependent.text).toEqual('koannw');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('koannw aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(2);
  });

  test('check the second relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.prt);
    expect(rs[0].head.text).toEqual('koannw');
    expect(rs[0].dependent.text).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.root);
    expect(rs[1].head.text).toEqual('ROOT');
    expect(rs[1].dependent.text).toEqual('koannw');
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
  const doc = processor('goa koannw diurh aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(4);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.compoundPrt);
    expect(rs[0].head.text).toEqual('koannw');
    expect(rs[0].dependent.text).toEqual('diurh');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.prt);
    expect(rs[1].head.text).toEqual('koannw');
    expect(rs[1].dependent.text).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[2].head.text).toEqual('koannw');
    expect(rs[2].dependent.text).toEqual('goa');
  });

  test('check the fourth relation', () => {
    expect(rs[3].dependency).toEqual(DependencyLabels.root);
    expect(rs[3].head.text).toEqual('ROOT');
    expect(rs[3].dependent.text).toEqual('koannw');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('pah aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(2);
  });

  test('check the second relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.prt);
    expect(rs[0].head.text).toEqual('pah');
    expect(rs[0].dependent.text).toEqual('aw');
  });

  test('check the third relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.root);
    expect(rs[1].head.text).toEqual('ROOT');
    expect(rs[1].dependent.text).toEqual('pah');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('longw diurh aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(3);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.compoundPrt);
    expect(rs[0].head.text).toEqual('longw');
    expect(rs[0].dependent.text).toEqual('diurh');
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
  const doc = processor('qaz pah aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(3);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.prt);
    expect(rs[0].head.text).toEqual('pah');
    expect(rs[0].dependent.text).toEqual('aw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.aux);
    expect(rs[1].head.text).toEqual('pah');
    expect(rs[1].dependent.text).toEqual('qaz');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.root);
    expect(rs[2].head.text).toEqual('ROOT');
    expect(rs[2].dependent.text).toEqual('pah');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('goa qaz pah');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(3);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.aux);
    expect(rs[0].head.text).toEqual('pah');
    expect(rs[0].dependent.text).toEqual('qaz');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[1].head.text).toEqual('pah');
    expect(rs[1].dependent.text).toEqual('goa');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.root);
    expect(rs[2].head.text).toEqual('ROOT');
    expect(rs[2].dependent.text).toEqual('pah');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('goa qaz pah aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(4);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.prt);
    expect(rs[0].head.text).toEqual('pah');
    expect(rs[0].dependent.text).toEqual('aw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.aux);
    expect(rs[1].head.text).toEqual('pah');
    expect(rs[1].dependent.text).toEqual('qaz');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[2].head.text).toEqual('pah');
    expect(rs[2].dependent.text).toEqual('goa');
  });

  test('check the fourth relation', () => {
    expect(rs[3].dependency).toEqual(DependencyLabels.root);
    expect(rs[3].head.text).toEqual('ROOT');
    expect(rs[3].dependent.text).toEqual('pah');
  });
});

describe('Dependency parsing', () => {
  const doc = processor('goa qaz koannw aw');
  const rs = doc.relations;

  test('check the number of relations', () => {
    expect(rs.length).toEqual(4);
  });

  test('check the first relation', () => {
    expect(rs[0].dependency).toEqual(DependencyLabels.prt);
    expect(rs[0].head.text).toEqual('koannw');
    expect(rs[0].dependent.text).toEqual('aw');
  });

  test('check the second relation', () => {
    expect(rs[1].dependency).toEqual(DependencyLabels.aux);
    expect(rs[1].head.text).toEqual('koannw');
    expect(rs[1].dependent.text).toEqual('qaz');
  });

  test('check the third relation', () => {
    expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
    expect(rs[2].head.text).toEqual('koannw');
    expect(rs[2].dependent.text).toEqual('goa');
  });

  test('check the fourth relation', () => {
    expect(rs[3].dependency).toEqual(DependencyLabels.root);
    expect(rs[3].head.text).toEqual('ROOT');
    expect(rs[3].dependent.text).toEqual('koannw');
  });
});
