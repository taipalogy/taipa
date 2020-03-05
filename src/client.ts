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
import { TokenLemmaLookup } from './token';

const pipe = (...fns: Array<(doc: Document) => Document>) => (x: Document) => fns.reduce((v, f) => f(v), x);

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

    process(str: string): Document {
        let doc: Document = new Document();

        if (str) {
            // tokenization
            const tokens = str.match(/\w+/g);
            if (tokens) {
                tokens.filter(x => x != undefined).map(x => doc.tokens.push(new Token(x)));
            }

            // tagging
            const tggr = new RuleBasedTagger();

            // lemmatization
            const lmtzr = new TokenLemmaLookup();

            // dependency parsing
            const dpsr = new DependencyParser();

            doc = pipe(tggr.tag, lmtzr.getTonalLemmas, dpsr.parse)(doc);
        }

        return doc;
    }
}
