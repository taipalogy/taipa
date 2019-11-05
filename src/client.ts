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
    readonly kana_aw = Kana.getInstance();
    readonly tonal_inflective_aw = TonalInflective.getInstance();

    processKana(str: string): TokenAnalysis {
        // kana
        const ka = <KanaAnalyzer>this.kana_aw.analyzer;
        const morphemes: KanaUncombiningMorpheme[] = ka.morphAnalyze(str);
        let ta: TokenAnalysis = new TokenAnalysis();
        ta.blockSequences = this.kana_aw.getBlocks(morphemes);
        return ta;
    }

    processTonal(str: string): TokenAnalysis {
        // tonal
        let tokens = str.match(/\w+/g);
        
        const tla = <TonalLemmatizationAnalyzer>this.tonal_inflective_aw.analyzer;
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

    getTonalLemmas(str: string): string[] {
        const tokens = str.match(/\w+/g);
        const tla = new TonalLemmatizationAnalyzer();
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
