import { TonalLemmatizationLexeme, TonalWord } from './tonal/lexeme';
import { TonalInflective } from './tonal/init';
import { TonalLemmatizationAnalyzer } from './tonal/analyzer';
import { TonalUncombiningMorpheme } from './tonal/morpheme';

import { Kana } from './kana/init';
import { KanaUncombiningMorpheme } from './kana/morpheme';
import { KanaAnalyzer } from './kana/analyzer';

import { DependencyParser } from './dparser/parser';
import { RuleBasedTagger } from './dparser/tagger';

import { Document } from './document';
import { Token, TokenAnalysis } from './token';
import { Tagset } from './dparser/symbols';

export class Client {
    processKana(str: string): TokenAnalysis {
        // kana
        const kana_aw = Kana.getInstance();
        const ka = <KanaAnalyzer>kana_aw.analyzer;
        const morphemes: KanaUncombiningMorpheme[] = ka.morphAnalyze(str);
        let ta: TokenAnalysis = new TokenAnalysis();
        ta.blockSequences = kana_aw.getBlocks(morphemes);
        return ta;
    }

    processTonal(str: string): TokenAnalysis {
        // tonal
        let tokens = str.match(/\w+/g);
        const tonal_inflective_aw = TonalInflective.getInstance();        
        const tla = <TonalLemmatizationAnalyzer>tonal_inflective_aw.analyzer;
        let ta: TokenAnalysis = new TokenAnalysis();
        if (tokens != null && tokens.length > 0) {
            const morphemes: TonalUncombiningMorpheme[] = tla.morphAnalyze(tokens[0]);
            const lexemes: TonalLemmatizationLexeme = tla.lexAnalyze(morphemes);
            ta.word = lexemes.word;
            ta.lemmata = lexemes.getLemmata();
            ta.inflectionalEnding = lexemes.getInflectionalEnding();

            // the array of sounds is promoted to the lexeme and enclosed. also needs to be output.
            for (let m of morphemes) {
                ta.soundSequences.push(m.sounds);
            }
        }
        return ta;
    }

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

    process(str: string): Document {
        let doc: Document = new Document();

        // tokenization
        const tokens = str.match(/\w+/g);
        if(tokens)
            for(let i = 0; i < tokens.length; i++) {
                if(tokens[i].length)
                    doc.tokens.push(new Token(tokens[i]));
            }

        // tagging
        const tggr = new RuleBasedTagger();
        doc = tggr.tag(doc);

        // lemmatization
        doc = this.getTonalLemmas(doc);

        // dependency parsing
        const dpsr = new DependencyParser();
        doc = dpsr.parse(doc);
        return doc;
    }
}
