import { TonalLemmatizationAnalyzer } from './tonal/analyzer';
import { Document } from './document';
import { Tagset } from './dparser/symbols';
import { TonalWord } from './tonal/lexeme';
import { SetOfPhrasalVerbs } from './dparser/rules';

export class Lemmatizer {
    getTonalLemmas(doc: Document): Document {
        const tla = new TonalLemmatizationAnalyzer();
        const sophv = new SetOfPhrasalVerbs();
        let j: number = 0;
        let k: number = 0;
        let len: number = 0;

        for (let i = 0; i < doc.tokens.length; i++) {
            if (len == i) {
                // loop over the doc.speeches sequence
                if (j < doc.speeches.length) {
                    len += doc.speeches[j].elements.length;
                    if (j + 1 < doc.speeches.length) j++;
                    k = 0;
                }
            } else {
                k++;
            }

            if (doc.tokens[i].text === 'che' || doc.tokens[i].text === 'he') {
                doc.tokens[i].lemma = doc.tokens[i].text;
                continue; // defective
            }
            if (doc.tokens[i].tag === Tagset.AUXN || doc.tokens[i].tag === Tagset.AUX) {
                doc.tokens[i].lemma = doc.tokens[i].text;
                continue;
            }
            if (doc.tokens[i].tag === Tagset.VB && i + 1 < doc.tokens.length) {
                if (doc.tokens[i + 1].tag === Tagset.PPV || doc.tokens[i + 1].tag === Tagset.APPR) {
                    for (let j in sophv.phrms) {
                        if (
                            doc.tokens[i].text === sophv.phrms[j].phrase.words[0].literal &&
                            doc.tokens[i + 1].text === sophv.phrms[j].phrase.words[1].literal
                        ) {
                            doc.tokens[i].lemma = sophv.phrms[j].phrase.words[0].literal;
                            doc.tokens[i + 1].lemma = sophv.phrms[j].phrase.words[1].literal;
                            i++;
                            break;
                        } else if (
                            doc.tokens[i].text === sophv.phrms[j].sandhiForm.words[0].literal &&
                            doc.tokens[i + 1].text === sophv.phrms[j].phrase.words[1].literal
                        ) {
                            doc.tokens[i].lemma = sophv.phrms[j].phrase.words[0].literal;
                            doc.tokens[i + 1].lemma = sophv.phrms[j].phrase.words[1].literal;
                            i++;
                            break;
                        }
                    }
                    continue;
                }
            }
            if (doc.tokens[i].tag === Tagset.VB) {
                if (i + 1 < doc.tokens.length && doc.tokens[i + 1].tag === Tagset.AUXN) {
                    doc.tokens[i].lemma = doc.tokens[i].text; // copy the base form
                    continue;
                }
            }
            if (k + 1 == doc.speeches[j].elements.length) {
                // at the end of a speech
                // need to further check if the speech is a noun chunk or verb phrase
                doc.tokens[i].lemma = doc.tokens[i].text; // copy the base form
                continue;
            }

            let lemmas: TonalWord[] = [];
            lemmas = tla.analyze(doc.tokens[i].text).getLemmata();
            if (lemmas.length > 0) doc.tokens[i].lemma = lemmas[0].literal;
        }
        return doc;
    }
}
