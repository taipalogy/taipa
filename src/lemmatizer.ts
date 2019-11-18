import { TonalLemmatizationAnalyzer } from "./tonal/analyzer";
import { Document } from "./document";
import { Tagset } from "./dparser/symbols";
import { TonalWord } from "./tonal/lexeme";

export class Lemmatizer {
    getTonalLemmas(doc: Document): Document {
        const tla = new TonalLemmatizationAnalyzer();

        for(let i = 0; i < doc.tokens.length; i++) {
            if(doc.tokens[i].text === 'che' || doc.tokens[i].text === 'he') continue; // defective
            if(doc.tokens[i].tag === Tagset.AUXN) continue;
            if(doc.tokens[i].tag === Tagset.VB) continue;
            let lemmas: TonalWord[] = [];
            lemmas = tla.analyze(doc.tokens[i].text).getLemmata();
            if(lemmas.length > 0)
                doc.tokens[i].lemma = lemmas[0].literal;
        }
        return doc;
    }
}