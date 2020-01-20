import { Client } from '../src/client';
import { TokenAnalysis } from '../src/token';
import { TonalLemmatizationAnalyzer } from '../src/tonal/analyzer';

describe("Lemma testing", () => {
    const cli = new Client()
    let doc = new TokenAnalysis()

    doc = cli.processTonal('chitt')

    test("check the number of lemmata", () => {
      expect(doc.lemmata.length).toEqual(0);
    });
});

describe("Lemma testing", () => {
  const cli = new Client()
  let doc = new TokenAnalysis()

  doc = cli.processTonal('suzjippwhoatf');

  test("check the number of lemmata", () => {
    expect(doc.lemmata.length).toEqual(1);
  });

  test("check the lemma", () => {
    expect(doc.lemmata[0].literal).toEqual('suzjippwhoat');
  });
});

describe("Lemma testing", () => {
  const cli = new Client()
  let doc = new TokenAnalysis()

  doc = cli.processTonal('sia');

  test("check the number of lemmata", () => {
    expect(doc.lemmata.length).toEqual(1);
  });

  test("check the lemma", () => {
    expect(doc.lemmata[0].literal).toEqual('siay');
  });
});

describe("Lemma testing", () => {
  const cli = new Client()
  let doc = new TokenAnalysis()

  doc = cli.processTonal('siay');

  test("check the number of lemmata", () => {
    expect(doc.lemmata.length).toEqual(1);
  });

  test("check the lemma", () => {
    expect(doc.lemmata[0].literal).toEqual('siaw');
  });
});

describe("Lemma testing", () => {
  const cli = new Client()
  let doc = new TokenAnalysis()

  doc = cli.processTonal('siaw');

  test("check the number of lemmata", () => {
    expect(doc.lemmata.length).toEqual(2);
  });

  test("check the lemma", () => {
    expect(doc.lemmata[0].literal).toEqual('siaz');
    expect(doc.lemmata[1].literal).toEqual('siax');
  });
});

describe("Lemma testing", () => {
  const cli = new Client()
  let doc = new TokenAnalysis()

  doc = cli.processTonal('siaz');

  test("check the number of lemmata", () => {
    expect(doc.lemmata.length).toEqual(3);
  });

  test("check the lemma", () => {
    expect(doc.lemmata[0].literal).toEqual('siax');
    expect(doc.lemmata[1].literal).toEqual('siaf');
    expect(doc.lemmata[2].literal).toEqual('sia');
  });
});

describe("Lemma testing", () => {
  const cli = new Client()
  let doc = new TokenAnalysis()

  doc = cli.processTonal('siax');

  test("check the number of lemmata", () => {
    expect(doc.lemmata.length).toEqual(0);
  });
});

describe("Lemma testing", () => {
  const cli = new Client()
  let doc = new TokenAnalysis()

  doc = cli.processTonal('goa');

  test("check the number of lemmata", () => {
    expect(doc.lemmata.length).toEqual(1);
  });

  test("check the lemma", () => {
    expect(doc.lemmata[0].literal).toEqual('goay');
  });
});

describe("Lemma testing, empty string as an argument", () => {
  const tla = new TonalLemmatizationAnalyzer();

  const tw = tla.analyze('');

  test("check the word", () => {
    expect(tw.word.literal).toEqual('');
  });

  test("check the lemma", () => {
    expect(tw.getLemmata.length).toEqual(0);
  });
});