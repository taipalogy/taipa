import { Client } from '../src/client';
import { TokenAnalysis } from '../src/token';
import { TonalLemmatizationAnalyzer, TonalLemmatizer } from '../src/tonal/analyzer';

describe('Lemma testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('chitt');

    test('check the number of lemmata', () => {
        expect(doc.lemmata.length).toEqual(0);
    });
});

describe('Lemma testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('suzjippwhoatf');

    test('check the number of lemmata', () => {
        expect(doc.lemmata.length).toEqual(1);
    });

    test('check the lemma', () => {
        expect(doc.lemmata[0].literal).toEqual('suzjippwhoat');
    });
});

describe('Lemma testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('sia');

    test('check the number of lemmata', () => {
        expect(doc.lemmata.length).toEqual(1);
    });

    test('check the lemma', () => {
        expect(doc.lemmata[0].literal).toEqual('siay');
    });
});

describe('Lemma testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('siay');

    test('check the number of lemmata', () => {
        expect(doc.lemmata.length).toEqual(1);
    });

    test('check the lemma', () => {
        expect(doc.lemmata[0].literal).toEqual('siaw');
    });
});

describe('Lemma testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('siaw');

    test('check the number of lemmata', () => {
        expect(doc.lemmata.length).toEqual(2);
    });

    test('check the lemma', () => {
        expect(doc.lemmata[0].literal).toEqual('siaz');
        expect(doc.lemmata[1].literal).toEqual('siax');
    });
});

describe('Lemma testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('siaz');

    test('check the number of lemmata', () => {
        expect(doc.lemmata.length).toEqual(3);
    });

    test('check the lemma', () => {
        expect(doc.lemmata[0].literal).toEqual('siax');
        expect(doc.lemmata[1].literal).toEqual('siaf');
        expect(doc.lemmata[2].literal).toEqual('sia');
    });
});

describe('Lemma testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('siax');

    test('check the number of lemmata', () => {
        expect(doc.lemmata.length).toEqual(0);
    });
});

describe('Lemma testing', () => {
    const cli = new Client();
    let doc = new TokenAnalysis();

    doc = cli.processTonal('goa');

    test('check the number of lemmata', () => {
        expect(doc.lemmata.length).toEqual(1);
    });

    test('check the lemma', () => {
        expect(doc.lemmata[0].literal).toEqual('goay');
    });
});

describe('Lemma testing, empty string as an argument', () => {
    const tla = new TonalLemmatizationAnalyzer();

    const inputEmpty: any = '';
    const inputUnd: any = undefined;

    const gs1 = tla.graphAnalyze(inputUnd).map(x => x.letter && x.letter.literal);

    test('given undefined string, check the letter literal', () => {
        expect(gs1.length).toEqual(0);
    });

    const gs2 = tla.graphAnalyze(inputEmpty).map(x => x.letter && x.letter.literal);

    test('given empty string, check the letter literal', () => {
        expect(gs2.length).toEqual(0);
    });

    const soudnSeqs1 = tla.morphAnalyze(inputEmpty).map(x => x.sounds);

    test('given empty string, check the letter literal', () => {
        expect(soudnSeqs1.length).toEqual(0);
    });

    const soudnSeqs2 = tla.morphAnalyze(inputUnd).map(x => x.sounds);

    test('given undefined string, check the letter literal', () => {
        expect(soudnSeqs2.length).toEqual(0);
    });

    const lmtzr = new TonalLemmatizer();
    const lexemeLemma1 = lmtzr.lemmatize(inputEmpty);

    test('check the word literal', () => {
        expect(lexemeLemma1.word.literal).toEqual('');
    });

    test('check the inflectional ending literal', () => {
        expect(lexemeLemma1.getInflectionalEnding()).toEqual('');
    });

    test('check the lemmas', () => {
        expect(lexemeLemma1.getLemmata().map(x => x.literal).length).toEqual(0);
    });

    const lexemeLemma2 = lmtzr.lemmatize(inputEmpty);

    test('check the word literal', () => {
        expect(lexemeLemma2.word.literal).toEqual('');
    });

    test('check the inflectional ending literal', () => {
        expect(lexemeLemma2.getInflectionalEnding()).toEqual('');
    });

    test('check the lemmas', () => {
        expect(lexemeLemma2.getLemmata().map(x => x.literal).length).toEqual(0);
    });

    const lexeme3 = lmtzr.lemmatize(inputEmpty);

    test('check the word literal', () => {
        expect(lexeme3.word.literal).toEqual('');
    });

    test('check the lemmas', () => {
        expect(lexeme3.getLemmata.length).toEqual(0);
    });

    const lexeme4 = lmtzr.lemmatize(inputUnd);

    test('check the word literal', () => {
        expect(lexeme4.word.literal).toEqual('');
    });

    test('check the lemmas', () => {
        expect(lexeme4.getLemmata.length).toEqual(0);
    });
});
