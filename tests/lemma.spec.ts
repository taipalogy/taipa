import { Client } from '../src/client';
import { TokenAnalysis } from '../src/token';
import { TonalLemmatizationAnalyzer } from '../src/tonal/analyzer';
import { TonalLemmatizer } from '../src/tonal/lemmatizer';

describe('Lemma testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('chitt');

    test('check the number of lemmata', () => {
        expect(doc.lemmas.length).toEqual(0);
    });
});

describe('Lemma testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('suzjippwhoatf');

    test('check the number of lemmata', () => {
        expect(doc.lemmas.length).toEqual(1);
    });

    test('check the lemma', () => {
        expect(doc.lemmas[0].literal).toEqual('suzjippwhoat');
    });
});

describe('Lemma testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('sia');

    test('check the number of lemmata', () => {
        expect(doc.lemmas.length).toEqual(1);
    });

    test('check the lemma', () => {
        expect(doc.lemmas[0].literal).toEqual('siay');
    });
});

describe('Lemma testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('siay');

    test('check the number of lemmata', () => {
        expect(doc.lemmas.length).toEqual(1);
    });

    test('check the lemma', () => {
        expect(doc.lemmas[0].literal).toEqual('siaw');
    });
});

describe('Lemma testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('siaw');

    test('check the number of lemmata', () => {
        expect(doc.lemmas.length).toEqual(2);
    });

    test('check the lemma', () => {
        expect(doc.lemmas[0].literal).toEqual('siaz');
        expect(doc.lemmas[1].literal).toEqual('siax');
    });
});

describe('Lemma testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('siaz');

    test('check the number of lemmata', () => {
        expect(doc.lemmas.length).toEqual(3);
    });

    test('check the lemma', () => {
        expect(doc.lemmas[0].literal).toEqual('siax');
        expect(doc.lemmas[1].literal).toEqual('siaf');
        expect(doc.lemmas[2].literal).toEqual('sia');
    });
});

describe('Lemma testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('siax');

    test('check the number of lemmata', () => {
        expect(doc.lemmas.length).toEqual(0);
    });
});

describe('Lemma testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('goa');

    test('check the number of lemmata', () => {
        expect(doc.lemmas.length).toEqual(1);
    });

    test('check the lemma', () => {
        expect(doc.lemmas[0].literal).toEqual('goay');
    });
});

describe('Lemma testing, empty string as an argument', () => {
    const tla = new TonalLemmatizationAnalyzer();

    const inputEmpty: any = '';

    const gs2 = tla.graphAnalyze(inputEmpty).map(x => x.letter && x.letter.literal);

    test('given empty string, check the letter literal', () => {
        expect(gs2.length).toEqual(0);
    });

    const soudnSeqs1 = tla.morphAnalyze(inputEmpty).map(x => x.sounds);

    test('given empty string, check the letter literal', () => {
        expect(soudnSeqs1.length).toEqual(0);
    });

    const lmtzr = new TonalLemmatizer();
    const lx1 = lmtzr.lemmatize(inputEmpty);

    test('check the word literal', () => {
        expect(lx1.word.literal).toEqual('');
    });

    test('check the inflectional ending literal', () => {
        expect(lx1.getInflectionalEnding()).toEqual('');
    });

    test('check the lemmas', () => {
        expect(lx1.getLemmas().map(x => x.literal).length).toEqual(0);
    });

    test('check the lemmas', () => {
        expect(lx1.getLemmas.length).toEqual(0);
    });
});

describe('Lemma testing, undefined string as an argument', () => {
    const tla = new TonalLemmatizationAnalyzer();

    const inputUnd: any = undefined;

    const gs1 = tla.graphAnalyze(inputUnd).map(x => x.letter && x.letter.literal);

    test('given undefined string, check the letter literal', () => {
        expect(gs1.length).toEqual(0);
    });

    const soudnSeqs2 = tla.morphAnalyze(inputUnd).map(x => x.sounds);

    test('given undefined string, check the letter literal', () => {
        expect(soudnSeqs2.length).toEqual(0);
    });

    const lmtzr = new TonalLemmatizer();

    const lx2 = lmtzr.lemmatize(inputUnd);

    test('check the word literal', () => {
        expect(lx2.word.literal).toEqual('');
    });

    test('check the inflectional ending literal', () => {
        expect(lx2.getInflectionalEnding()).toEqual('');
    });

    test('check the lemmas', () => {
        expect(lx2.getLemmas().map(x => x.literal).length).toEqual(0);
    });

    test('check the lemmas', () => {
        expect(lx2.getLemmas.length).toEqual(0);
    });
});
