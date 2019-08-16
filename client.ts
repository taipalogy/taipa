import { TonalLemmatizationLexeme } from './tonal/lexeme'
import { DependencyParser } from './dependencyparser/dependencyparser'
import { RuleBasedTagger } from './dependencyparser/rulebasedtagger'

import { AnalyzerLoader } from './analyzer'
import { Kana } from './kana/init';
import { TonalInflective } from './tonal/init'
import { TonalLemmatizationAnalyzer } from './tonal/analyzer'
import { KanaUncombiningMorpheme } from './kana/morpheme';
import { TonalUncombiningMorpheme } from './tonal/morpheme';
import { KanaAnalyzer } from './kana/analyzer';
import { Document } from './document'

export class Client {
    processKana(str: string) {
        let al = new AnalyzerLoader()

        // kana
        al.load(Kana)
        let morphemes: KanaUncombiningMorpheme[] = (<KanaAnalyzer>al.aws[0].analyzer).doMorphologicalAnalysis(str)
        let doc: Document = new Document()
        doc.blockSequences = al.aws[0].getBlocks(morphemes)
        al.unload(Kana)
        return doc
    }

    processTonal(str: string) {
        let al = new AnalyzerLoader()

        // tonal
        al.load(TonalInflective)
        let tokens = str.match(/\w+/g)
        //let l_results
        let doc: Document = new Document();
        if(tokens != null && tokens.length > 0) {
            let morphemes: TonalUncombiningMorpheme[] = (<TonalLemmatizationAnalyzer>al.aws[0].analyzer).doMorphologicalAnalysis(tokens[0])
            let lexemes: TonalLemmatizationLexeme[] = (<TonalLemmatizationAnalyzer>al.aws[0].analyzer).doLexicalAnalysis(morphemes)
            doc.lemmatizationLexemes = lexemes
            doc.lemmata = lexemes[0].getLemmata()
            doc.inflectionalEnding = lexemes[0].getInflectionalEnding()

            // the array of sounds is promoted to the lexeme and enclosed. also needs to be output.
            for(let m of morphemes) {
                doc.soundSequences.push(m.sounds)
            }
        }
        al.unload(TonalInflective)
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
        let elems = tagger.elements;

        // dependency parsing
        let dp = new DependencyParser();
        return dp.parse(elems)
    }
}
