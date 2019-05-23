import { TonalLexeme } from './tonal/lexeme'
import { DummyLexeme, Lexeme, Word } from './lexeme'
import { dictionary } from './dictionary'
import { DependencyParser, Configuration, Guide, Transition, Arc, Shift, RightArc, Dependency } from './dependencyparser/dependencyparser'
import { RuleBasedTagger, SandhiFormLexeme, ToneSandhiInflectionLexeme } from './dependencyparser/rulebasedtagger'
import { SYMBOLS } from './dependencyparser/symbols'
import { Sound } from './grapheme';

import { AnalyzerLoader } from './analyzer'
import { Kana } from './kana/init';
import { TonalAnalyzer } from './tonal/analyzer'

export class Document {
    lexemes: Array<TonalLexeme> = new Array();
    forms: Array<Word> = new Array();
    inflectionalEnding: string
    parsingLexemes: Array<Lexeme> = new Array();
    combinedMorphemes: Array<Sound[]> = new Array()
    graph: Array<Arc>
}

export class Client {
    output(input: string) {
        let clt = new Client();
        let doc = clt.processOneToken(input);
        let output = ''
        for(let i in doc.lexemes) {
            let l = doc.lexemes[i].word.literal
            let en = doc.inflectionalEnding
            if(l.length-en.length != 0) {
                output += l.substr(0, l.length-en.length) + ' - ' + 'inflectional stem'
            }
            let filler: string = ''
            for(let n = 0; n < l.substr(0, l.length-en.length).length; n++) { 
                filler += ' '
            }
            if(en.length > 0) output += '\n' + filler + en + ' - ' + 'inflectional ending'
    
            for(let j in doc.combinedMorphemes) {
                let syll = ''
                let saunz = []
                for(let k in doc.combinedMorphemes[j]) {
                    let sou = doc.combinedMorphemes[j][k]
                    saunz.push('  - ' + sou.getLiteral() + ' - ' + sou.name)
                    syll += sou.getLiteral()
                }
                output += '\n' + '- ' + syll
                for(let k in saunz) {
                    output += '\n' + saunz[k]
                }
            }
    
            let ipw = clt.lookup(doc.lexemes[i].word.literal);
            // when the input word can be found in the dictionary
            if(ipw != null) {
                output += '\n' + ipw
            }
    
            let ls = doc.forms
    
            for(let j in ls) {
                let bsw = clt.lookup(ls[j].literal);
                // when the base form of the word can be found in the dictionary
                if(bsw != null) {
                    output += '\n' + bsw
                }
            }
    
        }

        return output
    }

    lookup(k: string) {
        for(let key in dictionary) {
            if(key == k) {
                var value = dictionary[key];
            }
            if(value != null) {
                return value[0];
            }
        }
        return null;
    }

    processOneToken(str: string) {

        let al = new AnalyzerLoader()

        // kana
        al.load(Kana)
        let m_results = al.aws[0].analyzer.getMorphologicalAnalysisResults(str)
        if(m_results.result.successful == true) {
            al.aws[0].getBlocks(m_results.morphemes)
        } else al.aws[0].getBlocks(m_results.morphemes)

        // tonal
        let doc: Document = new Document();
        let turner = new TonalAnalyzer()
        let l_results = turner.getLexicalAnalysisResults(str.match(/\w+/g)[0])
        doc.lexemes = l_results.lexemes
        doc.forms = l_results.lemmata
        doc.inflectionalEnding = l_results.inflectionalEnding

        // the array of sounds is promoted to the lexeme and enclosed. also needs to be output.
        doc.combinedMorphemes = l_results.arraysOfSounds

        return doc;
    }

    process(str: string): Document {
        let dp = new DependencyParser();
        let c: Configuration = dp.getInitialConfiguration();
        let tokens = str.match(/\w+/g);

        let lexemes: Array<TonalLexeme> = new Array();
        let turner = new TonalAnalyzer()
        for(let key in tokens) {
            lexemes.push(turner.getLexicalAnalysisResults(tokens[key]).lexemes[0])
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
            
            let t: Transition = guide.getNextTransition();
            if(t == null) break
            c = c.makeTransition(t);
            if(c.stack[c.stack.length-1] != undefined) {
                if(c.stack[c.stack.length-1].partOfSpeech === SYMBOLS.VERB) {
                    let l = c.stack[c.stack.length-1]
                    if(l instanceof SandhiFormLexeme) {
                        if(l.kvp.key === 'transitive') {
                            guide.transitions.push(new Shift())
                        }
                    } else if(l instanceof ToneSandhiInflectionLexeme) {
                        if(l.kvp.key === 'intransitive') {
                            guide.transitions.push(new RightArc())
                            c.graph.push(new Arc(Dependency.ccomp, c.stack[c.stack.length-2], c.stack[c.stack.length-1]))
                            guide.transitions.push(new RightArc())
                            
                        }
                    }
                } if(c.stack[c.stack.length-1].partOfSpeech === SYMBOLS.PERSONALPRONOUN) {
                    let l = c.stack[c.stack.length-1]
                    if(l instanceof SandhiFormLexeme) {
                        if(l.kvp.key === 'proceeding') {
                            guide.transitions.push(new Shift())
                            c.graph.push(new Arc(Dependency.csubj, c.stack[c.stack.length-2], c.stack[c.stack.length-1]))
                        }
                    }
                }
            }
        }

        let doc = new Document();
        doc.graph = c.getGraph();
        return doc;
    }
}
