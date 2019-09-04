import { Client } from '../src/client'
import { Document } from '../src/document'

describe("Number testing", () => {
    let cli = new Client()
    let doc = new Document()
    doc = cli.processTonal('chitt')

    test("check the number of lemmata", () => {
      expect(doc.lemmata.length).toEqual(0);
    });

    test("check the inflectional ending", () => {
        expect(doc.inflectionalEnding).toEqual('');
      });
  
});