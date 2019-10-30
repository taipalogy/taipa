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
        expect(rs[0].head.text).toEqual('koannw');
        expect(rs[0].dependent.text).toEqual('diurh');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual('nsubj');
        expect(rs[1].head.text).toEqual('koannw');
        expect(rs[1].dependent.text).toEqual('goa');
    });

    test("check the third relation", () => {
        expect(rs[2].dependency).toEqual('root');
        expect(rs[2].head.text).toEqual('ROOT');
        expect(rs[2].dependent.text).toEqual('koannw');
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
        expect(rs[0].head.text).toEqual('koanny');
        expect(rs[0].dependent.text).toEqual('diurhhw');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual('obj');
        expect(rs[1].head.text).toEqual('koanny');
        expect(rs[1].dependent.text).toEqual('che');
    });

    test("check the third relation", () => {
        expect(rs[2].dependency).toEqual('nsubj');
        expect(rs[2].head.text).toEqual('koanny');
        expect(rs[2].dependent.text).toEqual('goa');
    });

    test("check the third relation", () => {
        expect(rs[3].dependency).toEqual('root');
        expect(rs[3].head.text).toEqual('ROOT');
        expect(rs[3].dependent.text).toEqual('koanny');
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
        expect(rs[0].head.text).toEqual('koannw');
        expect(rs[0].dependent.text).toEqual('diurh');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual('nsubj');
        expect(rs[1].head.text).toEqual('koannw');
        expect(rs[1].dependent.text).toEqual('goa');
    });

    test("check the second relation", () => {
        expect(rs[2].dependency).toEqual('obj');
        expect(rs[2].head.text).toEqual('koannw');
        expect(rs[2].dependent.text).toEqual('che');
    });

    test("check the third relation", () => {
        expect(rs[3].dependency).toEqual('root');
        expect(rs[3].head.text).toEqual('ROOT');
        expect(rs[3].dependent.text).toEqual('koannw');
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
        expect(rs[0].head.text).toEqual('koannw');
        expect(rs[0].dependent.text).toEqual('diurh');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual('aux');
        expect(rs[1].head.text).toEqual('koannw');
        expect(rs[1].dependent.text).toEqual('aw');
    });

    test("check the third relation", () => {
        expect(rs[2].dependency).toEqual('root');
        expect(rs[2].head.text).toEqual('ROOT');
        expect(rs[2].dependent.text).toEqual('koannw');
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
        expect(rs[0].head.text).toEqual('koannw');
        expect(rs[0].dependent.text).toEqual('aw');
    });

    test("check the third relation", () => {
        expect(rs[1].dependency).toEqual('root');
        expect(rs[1].head.text).toEqual('ROOT');
        expect(rs[1].dependent.text).toEqual('koannw');
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
        expect(rs[0].head.text).toEqual('koannw');
        expect(rs[0].dependent.text).toEqual('diurh');
    });

    test("check the second relation", () => {
        expect(rs[1].dependency).toEqual('aux');
        expect(rs[1].head.text).toEqual('koannw');
        expect(rs[1].dependent.text).toEqual('aw');
    });

    test("check the third relation", () => {
        expect(rs[2].dependency).toEqual('nsubj');
        expect(rs[2].head.text).toEqual('koannw');
        expect(rs[2].dependent.text).toEqual('goa');
    });

    test("check the fourth relation", () => {
        expect(rs[3].dependency).toEqual('root');
        expect(rs[3].head.text).toEqual('ROOT');
        expect(rs[3].dependent.text).toEqual('koannw');
    });
});
