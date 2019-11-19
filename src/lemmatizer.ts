import { TonalLemmatizationAnalyzer } from './tonal/analyzer';
import { Document } from './document';
import { Tagset } from './dparser/symbols';
import { TonalWord } from './tonal/lexeme';
import { SetOfPhrasalVerbs } from './dparser/rules';

export class Lemmatizer {
    getTonalLemmas(doc: Document): Document {
        const tla = new TonalLemmatizationAnalyzer();
        const sophv = new SetOfPhrasalVerbs();

        for (let i = 0; i < doc.tokens.length; i++) {
            if (doc.tokens[i].orth === 'che' || doc.tokens[i].orth === 'he') continue; // defective
            if (doc.tokens[i].tag === Tagset.AUXN) continue;
            if (doc.tokens[i].tag === Tagset.VB && i + 1 < doc.tokens.length) {
                if (doc.tokens[i + 1].tag === Tagset.PPV || doc.tokens[i + 1].tag === Tagset.APPR) {
                    for (let j in sophv.phrms) {
                        if (
                            doc.tokens[i].orth === sophv.phrms[j].phrase.words[0].literal &&
                            doc.tokens[i + 1].orth === sophv.phrms[j].phrase.words[1].literal
                        ) {
                            doc.tokens[i].lemma = sophv.phrms[j].phrase.words[0].literal;
                            doc.tokens[i + 1].lemma = sophv.phrms[j].phrase.words[1].literal;
                            i++;
                            break;
                        } else if (
                            doc.tokens[i].orth === sophv.phrms[j].sandhiForm.words[0].literal &&
                            doc.tokens[i + 1].orth === sophv.phrms[j].phrase.words[1].literal
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
            let lemmas: TonalWord[] = [];
            lemmas = tla.analyze(doc.tokens[i].orth).getLemmata();
            if (lemmas.length > 0) doc.tokens[i].lemma = lemmas[0].literal;
        }
        return doc;
    }
}
