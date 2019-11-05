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

export class Client {
    processKana(str: string): TokenAnalysis {
        // kana
        let aw = new Kana();
        let ka = <KanaAnalyzer>aw.analyzer;
        let morphemes: KanaUncombiningMorpheme[] = ka.doMorphologicalAnalysis(str);
        let ta: TokenAnalysis = new TokenAnalysis();
        ta.blockSequences = aw.getBlocks(morphemes);
        return ta;
    }

    processTonal(str: string): TokenAnalysis {
        // tonal
        let tokens = str.match(/\w+/g);
        let aw = new TonalInflective();
        let tla = <TonalLemmatizationAnalyzer>aw.analyzer;
        let ta: TokenAnalysis = new TokenAnalysis();
        if (tokens != null && tokens.length > 0) {
            let morphemes: TonalUncombiningMorpheme[] = tla.doMorphologicalAnalysis(tokens[0]);
            let lexemes: TonalLemmatizationLexeme = tla.doLexicalAnalysis(morphemes);
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

    getTonalLemmas(str: string): string[] {
        const tokens = str.match(/\w+/g);
        const aw = new TonalInflective();
        const tla = <TonalLemmatizationAnalyzer>aw.analyzer;
        let lemmas: TonalWord[] = [];
        if (tokens != null && tokens.length > 0) {
            lemmas = tla.analyze(tokens[0]).getLemmata();
        }
        let ret: string [] = [];
        for(let i in lemmas) {
            ret.push(lemmas[i].literal)
        }
        return ret;
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

        // dependency parsing
        const dpsr = new DependencyParser();
        doc = dpsr.parse(doc);
        return doc;
    }
}
