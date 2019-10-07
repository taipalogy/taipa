import { Client } from '../src/client';
import { Document } from '../src/document';

describe("Dependency parsing", () => {
    let cli = new Client();
    let doc = new Document();

    doc = cli.process('goa koannw diurh');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(3);
    });

    test("check the first relation", () => {
        expect(rs[0].dependency).toEqual('prt');
        expect(rs[0].head.surface).toEqual('koannw');
        expect(rs[0].dependent.surface).toEqual('diurh');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual('nsubj');
        expect(rs[1].head.surface).toEqual('koannw');
        expect(rs[1].dependent.surface).toEqual('goa');
    });

    test("check the third relation", () => {
        expect(rs[2].dependency).toEqual('root');
        expect(rs[2].head.surface).toEqual('ROOT');
        expect(rs[2].dependent.surface).toEqual('koannw');
    });
});

describe("Dependency parsing", () => {
    let cli = new Client();
    let doc = new Document();

    doc = cli.process('goa koanny diurhhw che');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(4);
    });

    test("check the first relation", () => {
        expect(rs[0].dependency).toEqual('prt');
        expect(rs[0].head.surface).toEqual('koanny');
        expect(rs[0].dependent.surface).toEqual('diurhhw');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual('obj');
        expect(rs[1].head.surface).toEqual('koanny');
        expect(rs[1].dependent.surface).toEqual('che');
    });

    test("check the third relation", () => {
        expect(rs[2].dependency).toEqual('nsubj');
        expect(rs[2].head.surface).toEqual('koanny');
        expect(rs[2].dependent.surface).toEqual('goa');
    });

    test("check the third relation", () => {
        expect(rs[3].dependency).toEqual('root');
        expect(rs[3].head.surface).toEqual('ROOT');
        expect(rs[3].dependent.surface).toEqual('koanny');
    });
});

describe("Dependency parsing", () => {
    let cli = new Client();
    let doc = new Document();

    doc = cli.process('che goa koannw diurh');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(4);
    });

    test("check the first relation", () => {
        expect(rs[0].dependency).toEqual('prt');
        expect(rs[0].head.surface).toEqual('koannw');
        expect(rs[0].dependent.surface).toEqual('diurh');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual('nsubj');
        expect(rs[1].head.surface).toEqual('koannw');
        expect(rs[1].dependent.surface).toEqual('goa');
    });

    test("check the second relation", () => {
        expect(rs[2].dependency).toEqual('obj');
        expect(rs[2].head.surface).toEqual('koannw');
        expect(rs[2].dependent.surface).toEqual('che');
    });

    test("check the third relation", () => {
        expect(rs[3].dependency).toEqual('root');
        expect(rs[3].head.surface).toEqual('ROOT');
        expect(rs[3].dependent.surface).toEqual('koannw');
    });
});

describe("Dependency parsing", () => {
    let cli = new Client();
    let doc = new Document();

    doc = cli.process('koannw diurh aw');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(3);
    });

    test("check the first relation", () => {
        expect(rs[0].dependency).toEqual('prt');
        expect(rs[0].head.surface).toEqual('koannw');
        expect(rs[0].dependent.surface).toEqual('diurh');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual('aux');
        expect(rs[1].head.surface).toEqual('koannw');
        expect(rs[1].dependent.surface).toEqual('aw');
    });

    test("check the third relation", () => {
        expect(rs[2].dependency).toEqual('root');
        expect(rs[2].head.surface).toEqual('ROOT');
        expect(rs[2].dependent.surface).toEqual('koannw');
    });
});

describe("Dependency parsing", () => {
    let cli = new Client();
    let doc = new Document();

    doc = cli.process('koannw aw');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(2);
    });

    test("check the second relation", () => {
        expect(rs[0].dependency).toEqual('aux');
        expect(rs[0].head.surface).toEqual('koannw');
        expect(rs[0].dependent.surface).toEqual('aw');
    });

    test("check the third relation", () => {
        expect(rs[1].dependency).toEqual('root');
        expect(rs[1].head.surface).toEqual('ROOT');
        expect(rs[1].dependent.surface).toEqual('koannw');
    });
});

describe("Dependency parsing", () => {
    let cli = new Client();
    let doc = new Document();

    doc = cli.process('goa koannw diurh aw');
    let rs = doc.relations;

    test("check the number of relations", () => {    
        expect(rs.length).toEqual(4);
    });

    test("check the first relation", () => {
        expect(rs[0].dependency).toEqual('prt');
        expect(rs[0].head.surface).toEqual('koannw');
        expect(rs[0].dependent.surface).toEqual('diurh');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual('aux');
        expect(rs[1].head.surface).toEqual('koannw');
        expect(rs[1].dependent.surface).toEqual('aw');
    });

    test("check the third relation", () => {
        expect(rs[2].dependency).toEqual('nsubj');
        expect(rs[2].head.surface).toEqual('koannw');
        expect(rs[2].dependent.surface).toEqual('goa');
    });

    test("check the fourth relation", () => {
        expect(rs[3].dependency).toEqual('root');
        expect(rs[3].head.surface).toEqual('ROOT');
        expect(rs[3].dependent.surface).toEqual('koannw');
    });
});
