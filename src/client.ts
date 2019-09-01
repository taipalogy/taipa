import { TonalLemmatizationLexeme } from './tonal/lexeme'
import { DependencyParser } from './dparser/parser'
import { RuleBasedTagger } from './dparser/tagger'

import { Kana } from './kana/init';
import { TonalInflective } from './tonal/init'
import { TonalLemmatizationAnalyzer } from './tonal/analyzer'
import { KanaUncombiningMorpheme } from './kana/morpheme';
import { TonalUncombiningMorpheme } from './tonal/morpheme';
import { KanaAnalyzer } from './kana/analyzer';
import { Document } from './document'

export class Client {
    processKana(str: string) {
        // kana
        let aw = new Kana()
        let ka = <KanaAnalyzer>aw.analyzer
        let morphemes: KanaUncombiningMorpheme[] = ka.doMorphologicalAnalysis(str)
        let doc: Document = new Document()
        doc.blockSequences = aw.getBlocks(morphemes)
        return doc
    }

    processTonal(str: string) {
        // tonal
        let tokens = str.match(/\w+/g)
        let aw = new TonalInflective()
        let tla = <TonalLemmatizationAnalyzer>aw.analyzer
        let doc: Document = new Document();
        if(tokens != null && tokens.length > 0) {
            let morphemes: TonalUncombiningMorpheme[] = tla.doMorphologicalAnalysis(tokens[0])
            let lexemes: TonalLemmatizationLexeme[] = tla.doLexicalAnalysis(morphemes)
            doc.lemmatizationLexemes = lexemes
            doc.lemmata = lexemes[0].getLemmata()
            doc.inflectionalEnding = lexemes[0].getInflectionalEnding()

            // the array of sounds is promoted to the lexeme and enclosed. also needs to be output.
            for(let m of morphemes) {
                doc.soundSequences.push(m.sounds)
            }
        }
        return doc;
    }

    process(str: string): Document {
        // tokenization
        let tokens = str.match(/\w+/g);

        // tagging
        let tagger
        if(tokens != null && tokens.length >0) {
            tagger = new RuleBasedTagger(tokens);
        } else {
            tagger = new RuleBasedTagger([])
        }
        let ces = tagger.getCes();

        // dependency parsing
        let dp = new DependencyParser();
        let doc: Document = new Document();
        doc.graph = dp.parseCE(ces)
        return doc;
    }
}
