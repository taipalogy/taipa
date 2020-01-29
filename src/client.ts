import { TonalLemmatizationLexeme } from './tonal/lexeme';
import { checkLetterSizeTonal } from './tonal/init';
import { TonalLemmatizationAnalyzer } from './tonal/analyzer';
import { TonalUncombiningMorpheme } from './tonal/morpheme';

import { getKanaBlocks, checkLetterSizeKana } from './kana/init';
import { KanaUncombiningMorpheme } from './kana/morpheme';
import { KanaLemmatizationAnalyzer } from './kana/analyzer';

import { DependencyParser } from './dparser/parser';
import { RuleBasedTagger } from './dparser/tagger';

import { Document } from './document';
import { Token, TokenAnalysis } from './token';
import { TokenLemmatizer } from './token';

export class Client {
    processKana(str: string): TokenAnalysis {
        checkLetterSizeKana();
        // kana
        let ta: TokenAnalysis = new TokenAnalysis();
        if (str) {
            const ka = new KanaLemmatizationAnalyzer();
            const morphemes: KanaUncombiningMorpheme[] = ka.morphAnalyze(str);
            ta.blockSequences = getKanaBlocks(morphemes);

            for (let m of morphemes) {
                ta.soundSequences.push(m.sounds);
            }
        }

        return ta;
    }

    processTonal(str: string): TokenAnalysis {
        checkLetterSizeTonal();
        // tonal lurzmafjiz
        let ta: TokenAnalysis = new TokenAnalysis();
        if (str) {
            const tla = new TonalLemmatizationAnalyzer();
            const morphemes: TonalUncombiningMorpheme[] = tla.morphAnalyze(str);
            const lexeme: TonalLemmatizationLexeme = tla.lexAnalyze(morphemes);
            ta.word = lexeme.word;
            ta.lemmata = lexeme.getLemmata();
            ta.inflectionalEnding = lexeme.getInflectionalEnding();

            for (let m of morphemes) {
                ta.soundSequences.push(m.sounds);
            }
        }

        return ta;
    }

    process(str: string): Document {
        let doc: Document = new Document();

        // tokenization
        if (str) {
            const tokens = str.match(/\w+/g);
            if (tokens)
                for (let i = 0; i < tokens.length; i++) {
                    if (tokens[i].length) doc.tokens.push(new Token(tokens[i]));
                }

            // tagging
            const tggr = new RuleBasedTagger();
            doc = tggr.tag(doc);

            // lemmatization
            const lmtzr = new TokenLemmatizer();
            doc = lmtzr.getTonalLemmas(doc);

            // dependency parsing
            const dpsr = new DependencyParser();
            doc = dpsr.parse(doc);
        }

        return doc;
    }
}
