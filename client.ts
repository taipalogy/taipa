import { TonalLemmatizationLexeme, LemmatizationLexeme } from './tonal/lexeme'
import { Word } from './lexeme'
import { DependencyParser, Configuration, Guide, Arc, Shift, RightArc, Dependency } from './dependencyparser/dependencyparser'
import { RuleBasedTagger, DummyLexeme } from './dependencyparser/rulebasedtagger'
import { SYMBOLS } from './dependencyparser/symbols'
import { Sound } from './grapheme';

import { AnalyzerLoader } from './analyzer'
import { Kana } from './kana/init';
import { TonalInflective } from './tonal/init'
import { TonalLemmatizationAnalyzer } from './tonal/analyzer'
import { KanaUncombiningMorpheme } from './kana/morpheme';

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
        let morphemes: KanaUncombiningMorpheme[] = al.aws[0].analyzer.getMorphologicalAnalysisResults(str)
        let doc: Document = new Document()
        //let blocks: string = al.aws[0].getBlocks(morphemes)
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
            let morphemes = al.aws[0].analyzer.getMorphologicalAnalysisResults(tokens[0])
            let lexemes = al.aws[0].analyzer.getLexicalAnalysisResults(morphemes)
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
        let nodes = tagger.lexemes;

        for(let key in nodes) {
            c.queue.push(nodes[key])
        }

        let guide = new Guide()
        let root = new DummyLexeme()
        root.word.literal = 'ROOT'
        c.stack.push(root)

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
                if(c.stack[c.stack.length-1].partOfSpeech === SYMBOLS.VERB) {
                    let l = c.stack[c.stack.length-1]
                    if(c.queue.length > 0 && c.queue[0].partOfSpeech === SYMBOLS.PERSONALPRONOUN) {
                            guide.transitions.push(new Shift())
                    } else {
                            guide.transitions.push(new RightArc())
                            c.graph.push(new Arc(Dependency.ccomp, c.stack[c.stack.length-2], c.stack[c.stack.length-1]))
                            guide.transitions.push(new RightArc())
                    }
                } if(c.stack[c.stack.length-1].partOfSpeech === SYMBOLS.PERSONALPRONOUN) {
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
