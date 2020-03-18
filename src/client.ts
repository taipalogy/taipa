import { TonalLemmatizationLexeme } from './tonal/lexeme';
import { checkLetterSizeTonal } from './tonal/init';
import { TonalLemmatizationAnalyzer } from './tonal/analyzer';
import { TonalUncombiningMorpheme } from './tonal/morpheme';

import { getKanaBlocks, checkLetterSizeKana } from './kana/init';
import { KanaUncombiningMorpheme } from './kana/morpheme';
import { KanaLemmatizationAnalyzer } from './kana/analyzer';

import { DependencyParser } from './dparser/parser';
import { RuleBasedTagger } from './dparser/tagger';

import { Document, pipeDoc } from './document';
import { Token, TokenAnalysis } from './token';
import { TokenLemmaLookup } from './token';

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
            ta.lemmas = lexeme.getLemmas();
            ta.inflectionalEnding = lexeme.getInflectionalEnding();

            for (let m of morphemes) {
                ta.soundSequences.push(m.sounds);
                // TODO: first free tone to fourth. first checked tone to eighth
                ta.uncombiningSequences.push(m.getForms().map(it => it.literal));
            }
        }

        return ta;
    }
}

export class Processor {
    load(name: string) {
        const getPipe = function() {
            // tagging
            const tggr = new RuleBasedTagger();

            // lemmatization
            const lmtzr = new TokenLemmaLookup();

            // dependency parsing
            const dpsr = new DependencyParser();

            return pipeDoc(tggr.tag, lmtzr.getTonalLemmas, dpsr.parse);
        };

        const pipe = function(text: string) {
            let doc: Document = new Document();

            if (text) {
                // tokenization
                const tokens = text.match(/\w+/g);
                if (tokens) {
                    tokens.filter(x => x != undefined).map(x => doc.tokens.push(new Token(x)));
                }
                doc = getPipe()(doc);
            }

            return doc;
        };

        return {
            add() {},
            get() {},
            p(text: string) {
                return pipe(text);
            }
        };
    }
}
