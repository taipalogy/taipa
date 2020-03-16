import { TonalLemmatizationAnalyzer } from './tonal/analyzer';
import { Document } from './document';
import { Tagset } from './dparser/symbols';
import { TonalWord } from './tonal/lexeme';
import { PhrasalVerbs } from './dparser/rules';
import { Word } from './lexeme';
import { Sound } from './grapheme';
import { TonalLemmatizer } from './tonal/lemmatizer';

export class Token {
    pos: string = '';
    tag: string = '';
    lemma: string = '';
    dep: string = '';
    head: Token | undefined = undefined;

    constructor(public text: string) {}
}

export class TokenAnalysis {
    word: Word = new Word();
    lemmas: Array<Word> = new Array();
    inflectionalEnding: string = '';
    soundSequences: Array<Sound[]> = new Array();
    blockSequences: string[] = [];
    uncombiningSequences: Array<string[]> = new Array(); // uncombining form sequences
}

export class TokenLemmaLookup {
    getTonalLemmas = (doc: Document): Document => {
        const tla = new TonalLemmatizationAnalyzer();
        const lmtzr = new TonalLemmatizer();
        const sophv = new PhrasalVerbs();
        let j: number = 0;
        let k: number = 0;
        let len: number = 0;

        for (let i = 0; i < doc.tokens.length; i++) {
            if (len == i) {
                // loop over the doc.speeches sequence
                if (j < doc.phrases.length) {
                    len += doc.phrases[j].elements.length;
                    if (j + 1 < doc.phrases.length) j++;
                    k = 0;
                }
            } else {
                k++;
            }

            if (doc.tokens[i].text === 'che' || doc.tokens[i].text === 'he') {
                doc.tokens[i].lemma = doc.tokens[i].text;
                continue; // defective
            }
            if (doc.tokens[i].tag === Tagset.auxn || doc.tokens[i].tag === Tagset.aux) {
                doc.tokens[i].lemma = doc.tokens[i].text;
                continue;
            }
            if (doc.tokens[i].tag === Tagset.vb && i + 1 < doc.tokens.length) {
                if (i + 2 < doc.tokens.length && doc.tokens[i + 2].tag === Tagset.ppv) {
                    // phrasal verbs of length 3

                    const base = sophv.match([doc.tokens[i].text, doc.tokens[i + 1].text, doc.tokens[i + 2].text]);
                    if (base != '') {
                        const lemmas = base.split(' ');
                        doc.tokens[i].lemma = lemmas[0];
                        doc.tokens[i + 1].lemma = lemmas[1];
                        doc.tokens[i + 2].lemma = lemmas[2];
                        i++;
                    }
                    continue;
                } else if (doc.tokens[i + 1].tag === Tagset.ppv || doc.tokens[i + 1].tag === Tagset.appr) {
                    // phrasal verbs of length 2

                    const base = sophv.match([doc.tokens[i].text, doc.tokens[i + 1].text]);
                    if (base != '') {
                        const lemmas = base.split(' ');
                        doc.tokens[i].lemma = lemmas[0];
                        doc.tokens[i + 1].lemma = lemmas[1];
                        i++;
                    }
                    continue;
                }
            }
            if (doc.tokens[i].tag === Tagset.vb) {
                if (i + 1 < doc.tokens.length && doc.tokens[i + 1].tag === Tagset.auxn) {
                    doc.tokens[i].lemma = doc.tokens[i].text; // copy the base form
                    continue;
                }
            }
            if (doc.phrases[j] && k + 1 == doc.phrases[j].elements.length) {
                // at the end of a speech
                // need to further check if the speech is a noun chunk or verb phrase
                doc.tokens[i].lemma = doc.tokens[i].text; // copy the base form
                continue;
            }

            let lemmas: TonalWord[] = [];
            lemmas = lmtzr.lemmatize(doc.tokens[i].text).getLemmas();
            if (lemmas.length > 0) doc.tokens[i].lemma = lemmas[0].literal;
        }
        return doc;
    };
}
