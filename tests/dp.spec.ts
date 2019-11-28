import { Client } from '../src/client';
import { Document } from '../src/document';
import { DependencyLabels } from '../src/dparser/symbols';

describe("Dependency parsing", () => {
    const cli = new Client();
    let doc = new Document();

    doc = cli.process('goa koannw diurh');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(3);
    });

    test("check the first relation", () => {
        expect(rs[0].dependency).toEqual(DependencyLabels.compound_prt);
        expect(rs[0].head.orth).toEqual('koannw');
        expect(rs[0].dependent.orth).toEqual('diurh');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual(DependencyLabels.nsubj);
        expect(rs[1].head.orth).toEqual('koannw');
        expect(rs[1].dependent.orth).toEqual('goa');
    });

    test("check the third relation", () => {
        expect(rs[2].dependency).toEqual(DependencyLabels.root);
        expect(rs[2].head.orth).toEqual('ROOT');
        expect(rs[2].dependent.orth).toEqual('koannw');
    });
});

describe("Dependency parsing", () => {
    const cli = new Client();
    let doc = new Document();

    doc = cli.process('goa koanny diurh che');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(4);
    });

    test("check the first relation", () => {
        expect(rs[0].dependency).toEqual(DependencyLabels.compound_prt);
        expect(rs[0].head.orth).toEqual('koanny');
        expect(rs[0].dependent.orth).toEqual('diurh');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual(DependencyLabels.obj);
        expect(rs[1].head.orth).toEqual('koanny');
        expect(rs[1].dependent.orth).toEqual('che');
    });

    test("check the third relation", () => {
        expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
        expect(rs[2].head.orth).toEqual('koanny');
        expect(rs[2].dependent.orth).toEqual('goa');
    });

    test("check the third relation", () => {
        expect(rs[3].dependency).toEqual(DependencyLabels.root);
        expect(rs[3].head.orth).toEqual('ROOT');
        expect(rs[3].dependent.orth).toEqual('koanny');
    });
});

describe("Dependency parsing", () => {
    const cli = new Client();
    let doc = new Document();

    doc = cli.process('goa longy diurh che');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(4);
    });

    test("check the first relation", () => {
        expect(rs[0].dependency).toEqual(DependencyLabels.compound_prt);
        expect(rs[0].head.orth).toEqual('longy');
        expect(rs[0].dependent.orth).toEqual('diurh');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual(DependencyLabels.obj);
        expect(rs[1].head.orth).toEqual('longy');
        expect(rs[1].dependent.orth).toEqual('che');
    });

    test("check the third relation", () => {
        expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
        expect(rs[2].head.orth).toEqual('longy');
        expect(rs[2].dependent.orth).toEqual('goa');
    });

    test("check the third relation", () => {
        expect(rs[3].dependency).toEqual(DependencyLabels.root);
        expect(rs[3].head.orth).toEqual('ROOT');
        expect(rs[3].dependent.orth).toEqual('longy');
    });
});

describe("Dependency parsing", () => {
    const cli = new Client();
    let doc = new Document();

    doc = cli.process('che goa koannw diurh');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(4);
    });

    test("check the first relation", () => {
        expect(rs[0].dependency).toEqual(DependencyLabels.compound_prt);
        expect(rs[0].head.orth).toEqual('koannw');
        expect(rs[0].dependent.orth).toEqual('diurh');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual(DependencyLabels.nsubj);
        expect(rs[1].head.orth).toEqual('koannw');
        expect(rs[1].dependent.orth).toEqual('goa');
    });

    test("check the second relation", () => {
        expect(rs[2].dependency).toEqual(DependencyLabels.dislocated);
        expect(rs[2].head.orth).toEqual('koannw');
        expect(rs[2].dependent.orth).toEqual('che');
    });

    test("check the third relation", () => {
        expect(rs[3].dependency).toEqual(DependencyLabels.root);
        expect(rs[3].head.orth).toEqual('ROOT');
        expect(rs[3].dependent.orth).toEqual('koannw');
    });
});

describe("Dependency parsing", () => {
    const cli = new Client();
    let doc = new Document();

    doc = cli.process('koannw diurh aw');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(3);
    });

    test("check the first relation", () => {
        expect(rs[0].dependency).toEqual(DependencyLabels.compound_prt);
        expect(rs[0].head.orth).toEqual('koannw');
        expect(rs[0].dependent.orth).toEqual('diurh');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual(DependencyLabels.aux);
        expect(rs[1].head.orth).toEqual('koannw');
        expect(rs[1].dependent.orth).toEqual('aw');
    });

    test("check the third relation", () => {
        expect(rs[2].dependency).toEqual(DependencyLabels.root);
        expect(rs[2].head.orth).toEqual('ROOT');
        expect(rs[2].dependent.orth).toEqual('koannw');
    });
});

describe("Dependency parsing", () => {
    const cli = new Client();
    let doc = new Document();

    doc = cli.process('koannw aw');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(2);
    });

    test("check the second relation", () => {
        expect(rs[0].dependency).toEqual(DependencyLabels.aux);
        expect(rs[0].head.orth).toEqual('koannw');
        expect(rs[0].dependent.orth).toEqual('aw');
    });

    test("check the third relation", () => {
        expect(rs[1].dependency).toEqual(DependencyLabels.root);
        expect(rs[1].head.orth).toEqual('ROOT');
        expect(rs[1].dependent.orth).toEqual('koannw');
    });
});

describe("Dependency parsing", () => {
    const cli = new Client();
    let doc = new Document();

    doc = cli.process('longw aw');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(2);
    });

    test("check the second relation", () => {
        expect(rs[0].dependency).toEqual(DependencyLabels.aux);
        expect(rs[0].head.orth).toEqual('longw');
        expect(rs[0].dependent.orth).toEqual('aw');
    });

    test("check the third relation", () => {
        expect(rs[1].dependency).toEqual(DependencyLabels.root);
        expect(rs[1].head.orth).toEqual('ROOT');
        expect(rs[1].dependent.orth).toEqual('longw');
    });
});

describe("Dependency parsing", () => {
    const cli = new Client();
    let doc = new Document();

    doc = cli.process('goa koannw diurh aw');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(4);
    });

    test("check the first relation", () => {
        expect(rs[0].dependency).toEqual(DependencyLabels.compound_prt);
        expect(rs[0].head.orth).toEqual('koannw');
        expect(rs[0].dependent.orth).toEqual('diurh');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual(DependencyLabels.aux);
        expect(rs[1].head.orth).toEqual('koannw');
        expect(rs[1].dependent.orth).toEqual('aw');
    });

    test("check the third relation", () => {
        expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
        expect(rs[2].head.orth).toEqual('koannw');
        expect(rs[2].dependent.orth).toEqual('goa');
    });

    test("check the fourth relation", () => {
        expect(rs[3].dependency).toEqual(DependencyLabels.root);
        expect(rs[3].head.orth).toEqual('ROOT');
        expect(rs[3].dependent.orth).toEqual('koannw');
    });
});

describe("Dependency parsing", () => {
    const cli = new Client();
    let doc = new Document();

    doc = cli.process('pah aw');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(2);
    });

    test("check the second relation", () => {
        expect(rs[0].dependency).toEqual(DependencyLabels.aux);
        expect(rs[0].head.orth).toEqual('pah');
        expect(rs[0].dependent.orth).toEqual('aw');
    });

    test("check the third relation", () => {
        expect(rs[1].dependency).toEqual(DependencyLabels.root);
        expect(rs[1].head.orth).toEqual('ROOT');
        expect(rs[1].dependent.orth).toEqual('pah');
    });
});

describe("Dependency parsing", () => {
    const cli = new Client();
    let doc = new Document();

    doc = cli.process('longw diurh aw');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(3);
    });

    test("check the first relation", () => {
        expect(rs[0].dependency).toEqual(DependencyLabels.compound_prt);
        expect(rs[0].head.orth).toEqual('longw');
        expect(rs[0].dependent.orth).toEqual('diurh');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual(DependencyLabels.aux);
        expect(rs[1].head.orth).toEqual('longw');
        expect(rs[1].dependent.orth).toEqual('aw');
    });

    test("check the third relation", () => {
        expect(rs[2].dependency).toEqual(DependencyLabels.root);
        expect(rs[2].head.orth).toEqual('ROOT');
        expect(rs[2].dependent.orth).toEqual('longw');
    });
});

describe("Dependency parsing", () => {
    const cli = new Client();
    let doc = new Document();

    doc = cli.process('qaz pah aw');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(3);
    });

    test("check the first relation", () => {
        expect(rs[0].dependency).toEqual(DependencyLabels.aux);
        expect(rs[0].head.orth).toEqual('pah');
        expect(rs[0].dependent.orth).toEqual('aw');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual(DependencyLabels.aux);
        expect(rs[1].head.orth).toEqual('pah');
        expect(rs[1].dependent.orth).toEqual('qaz');
    });

    test("check the third relation", () => {
        expect(rs[2].dependency).toEqual(DependencyLabels.root);
        expect(rs[2].head.orth).toEqual('ROOT');
        expect(rs[2].dependent.orth).toEqual('pah');
    });
});

describe("Dependency parsing", () => {
    const cli = new Client();
    let doc = new Document();

    doc = cli.process('goa qaz pah');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(3);
    });

    test("check the first relation", () => {
        expect(rs[0].dependency).toEqual(DependencyLabels.aux);
        expect(rs[0].head.orth).toEqual('pah');
        expect(rs[0].dependent.orth).toEqual('qaz');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual(DependencyLabels.nsubj);
        expect(rs[1].head.orth).toEqual('pah');
        expect(rs[1].dependent.orth).toEqual('goa');
    });

    test("check the third relation", () => {
        expect(rs[2].dependency).toEqual(DependencyLabels.root);
        expect(rs[2].head.orth).toEqual('ROOT');
        expect(rs[2].dependent.orth).toEqual('pah');
    });
});

describe("Dependency parsing", () => {
    const cli = new Client();
    let doc = new Document();

    doc = cli.process('goa qaz pah aw');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(4);
    });

    test("check the first relation", () => {
        expect(rs[0].dependency).toEqual(DependencyLabels.aux);
        expect(rs[0].head.orth).toEqual('pah');
        expect(rs[0].dependent.orth).toEqual('aw');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual(DependencyLabels.aux);
        expect(rs[1].head.orth).toEqual('pah');
        expect(rs[1].dependent.orth).toEqual('qaz');
    });

    test("check the third relation", () => {
        expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
        expect(rs[2].head.orth).toEqual('pah');
        expect(rs[2].dependent.orth).toEqual('goa');
    });

    test("check the fourth relation", () => {
        expect(rs[3].dependency).toEqual(DependencyLabels.root);
        expect(rs[3].head.orth).toEqual('ROOT');
        expect(rs[3].dependent.orth).toEqual('pah');
    });
});

describe("Dependency parsing", () => {
    const cli = new Client();
    let doc = new Document();

    doc = cli.process('goa qaz koannw aw');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(4);
    });

    test("check the first relation", () => {
        expect(rs[0].dependency).toEqual(DependencyLabels.aux);
        expect(rs[0].head.orth).toEqual('koannw');
        expect(rs[0].dependent.orth).toEqual('aw');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual(DependencyLabels.aux);
        expect(rs[1].head.orth).toEqual('koannw');
        expect(rs[1].dependent.orth).toEqual('qaz');
    });

    test("check the third relation", () => {
        expect(rs[2].dependency).toEqual(DependencyLabels.nsubj);
        expect(rs[2].head.orth).toEqual('koannw');
        expect(rs[2].dependent.orth).toEqual('goa');
    });

    test("check the fourth relation", () => {
        expect(rs[3].dependency).toEqual(DependencyLabels.root);
        expect(rs[3].head.orth).toEqual('ROOT');
        expect(rs[3].dependent.orth).toEqual('koannw');
    });
});