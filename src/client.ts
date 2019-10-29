import { TonalLemmatizationLexeme } from './tonal/lexeme';
import { TonalInflective } from './tonal/init';
import { TonalLemmatizationAnalyzer } from './tonal/analyzer';
import { TonalUncombiningMorpheme } from './tonal/morpheme';

import { Kana } from './kana/init';
import { KanaUncombiningMorpheme } from './kana/morpheme';
import { KanaAnalyzer } from './kana/analyzer';

import { DependencyParser } from './dparser/parser';
import { RuleBasedTagger } from './dparser/tagger';

import { Document } from './document';
import { Token } from './token';

export class Client {
    processKana(str: string) {
        // kana
        let aw = new Kana();
        let ka = <KanaAnalyzer>aw.analyzer;
        let morphemes: KanaUncombiningMorpheme[] = ka.doMorphologicalAnalysis(str);
        let doc: Document = new Document();
        doc.blockSequences = aw.getBlocks(morphemes);
        return doc;
    }

    processTonal(str: string) {
        // tonal
        let tokens = str.match(/\w+/g);
        let aw = new TonalInflective();
        let tla = <TonalLemmatizationAnalyzer>aw.analyzer;
        let doc: Document = new Document();
        if (tokens != null && tokens.length > 0) {
            let morphemes: TonalUncombiningMorpheme[] = tla.doMorphologicalAnalysis(tokens[0]);
            let lexemes: TonalLemmatizationLexeme[] = tla.doLexicalAnalysis(morphemes);
            doc.word = lexemes[0].word;
            doc.lemmata = lexemes[0].getLemmata();
            doc.inflectionalEnding = lexemes[0].getInflectionalEnding();

            // the array of sounds is promoted to the lexeme and enclosed. also needs to be output.
            for (let m of morphemes) {
                doc.soundSequences.push(m.sounds);
            }
        }
        return doc;
    }

    process(str: string): Document {
        let doc: Document = new Document();

        // tokenization
        let tokens = str.match(/\w+/g);
        if(tokens)
            for(let i = 0; i < tokens.length; i++) {
                if(tokens[i].length)
                    doc.tokens.push(new Token(tokens[i]));
            }

        // tagging
        let tagger;
        if (doc.tokens.length > 0) {
            tagger = new RuleBasedTagger(doc.tokens);
        } else {
            tagger = new RuleBasedTagger([]);
        }
        let ces = tagger.elements;

        // dependency parsing
        let dp = new DependencyParser();
        doc.relations = dp.parseCE(ces);
        return doc;
    }
}
