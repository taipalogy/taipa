import { TonalLemmatizationLexeme, LemmatizationLexeme } from './tonal/lexeme'
import { Word } from './lexeme'
import { DependencyParser, Configuration, Guide, Arc, Shift, RightArc } from './dependencyparser/dependencyparser'
import { RuleBasedTagger, ConstructionElement } from './dependencyparser/rulebasedtagger'
import { DummyLexeme } from './dependencyparser/lexeme'
import { POS, Dependency } from './dependencyparser/symbols'
import { Sound } from './grapheme';

import { AnalyzerLoader } from './analyzer'
import { Kana } from './kana/init';
import { TonalInflective } from './tonal/init'
import { TonalLemmatizationAnalyzer } from './tonal/analyzer'
import { KanaUncombiningMorpheme } from './kana/morpheme';
import { TonalUncombiningMorpheme } from './tonal/morpheme';
import { KanaAnalyzer } from './kana/analyzer';

export class Document {
    lemmatizationLexemes: Array<LemmatizationLexeme> = new Array();
    lemmata: Array<Word> = new Array();
    inflectionalEnding: string = ''
    soundSequences: Array<Sound[]> = new Array()
    blockSequences: string[] = []
    graph: Array<Arc> = new Array()
}

export class Client {
    processKana(str: string) {
        let al = new AnalyzerLoader()

        // kana
        al.load(Kana)
        let morphemes: KanaUncombiningMorpheme[] = (<KanaAnalyzer>al.aws[0].analyzer).getMorphologicalAnalysisResults(str)
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
            let morphemes: TonalUncombiningMorpheme[] = (<TonalLemmatizationAnalyzer>al.aws[0].analyzer).getMorphologicalAnalysisResults(tokens[0])
            let lexemes: TonalLemmatizationLexeme[] = (<TonalLemmatizationAnalyzer>al.aws[0].analyzer).getLexicalAnalysisResults(morphemes)
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
        let dp = new DependencyParser();
        let c: Configuration = dp.getInitialConfiguration();
        let tokens = str.match(/\w+/g);

        let lexemes: Array<TonalLemmatizationLexeme> = new Array();
        let analyzer = new TonalLemmatizationAnalyzer()
        if(tokens != null && tokens.length >0) {
            for(let key in tokens) {
                lexemes.push(analyzer.getLexicalAnalysisResults(tokens[key])[0])
            }
        }

        // can lexemes be replaced by a phraseme?
        let tagger = new RuleBasedTagger(lexemes);
        let elems = tagger.elements;

        for(let key of elems) {
            c.queue.push(key)
        }

        let guide = new Guide()
        let root = new DummyLexeme()
        root.word.literal = 'ROOT'
        c.stack.push(new ConstructionElement(root))

        if(c.stack.length == 1 && c.queue.length > 0) {
            // initial configuration
            // shift the first lexeme from queue to stack
            guide.transitions.push(new Shift())
        }

        while(!c.isTerminalConfiguration()) {
            let t = guide.getNextTransition();
            if(t == null || t == undefined) break
            c = c.makeTransition(t);
            if(c.stack[c.stack.length-1] != undefined) {
                if(c.stack[c.stack.length-1].partOfSpeech === POS.verb) {
                    let l = c.stack[c.stack.length-1]
                    if(c.queue.length > 0 && c.queue[0].partOfSpeech === POS.personal_pronoun) {
                            guide.transitions.push(new Shift())
                    } else {
                            guide.transitions.push(new RightArc())
                            c.graph.push(new Arc(Dependency.ccomp, c.stack[c.stack.length-2], c.stack[c.stack.length-1]))
                            guide.transitions.push(new RightArc())
                    }
                } if(c.stack[c.stack.length-1].partOfSpeech === POS.personal_pronoun) {
                    let l = c.stack[c.stack.length-1]
                            guide.transitions.push(new Shift())
                            c.graph.push(new Arc(Dependency.csubj, c.stack[c.stack.length-2], c.stack[c.stack.length-1]))
                }
            }
        }

        let doc = new Document();
        doc.graph = c.getGraph();
        return doc;
    }
}
