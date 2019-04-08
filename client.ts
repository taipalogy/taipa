
import { TonalTurner } from './lexememaker'
import { TonalLemmaLexeme, ToneSandhiInflectionLexeme, DummyLexeme, SandhiFormLexeme, Lexeme } from './lexeme'
import { dictionary } from './dictionary'
import { DependencyParser, Configuration, Guide, Transition, Arc, Shift, RightArc, Dependency } from './dependencyparser'
import { RuleBasedTagger } from './rulebasedtagger'
import { SYMBOLS } from './symbols'
import { Sound } from './system';

import { Analyzer, AnalyzerLoader, Tonal } from './analyzer'
import { Tonalless } from './tonalless/init'
import { Kana } from './kana/init';
import { Hangul } from './hangul/init'
import { KanaTurner } from './kana/turner';

export class Document {
    lemmaLexemes: Array<TonalLemmaLexeme> = new Array();
    parsingLexemes: Array<Lexeme> = new Array();
    combinedMorphemes: Array<Sound[]> = new Array()
    graph: Array<Arc>
}

export class Client {
    output(input: string) {
        let clt = new Client();
        let doc = clt.processOneToken(input);
        let output = ''
        for(let i in doc.lemmaLexemes) {
            let l = doc.lemmaLexemes[i].word.literal
            let en = doc.lemmaLexemes[i].getInflectionalEnding()
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
    
            let ipw = clt.lookup(doc.lemmaLexemes[i].word.literal);
            // when the input word can be found in the dictionary
            if(ipw != null) {
                output += '\n' + ipw
            }
    
            let ls = doc.lemmaLexemes[i].getBaseForms()
    
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
        al.load(Kana)
        let obj = al.analyzers[0].turner.getDataOfMorphologicalAnalysis(str)
        if(obj.result.successful == true) {
            console.log('>true')
        }

        let doc: Document = new Document();
        let turner = new TonalTurner()
        doc.lemmaLexemes = turner.getDataOfLexicalAnalysis(str.match(/\w+/g)[0])

        // the array of sounds is promoted to the lexeme and enclosed. also needs to be output.
        doc.combinedMorphemes = turner.arraysOfSounds

        return doc;
    }

    process(str: string): Document {
        let dp = new DependencyParser();
        let c: Configuration = dp.getInitialConfiguration();
        let tokens = str.match(/\w+/g);

        let lexemes: Array<TonalLemmaLexeme> = new Array();
        let turner = new TonalTurner()
        for(let key in tokens) {
            lexemes.push(turner.getDataOfLexicalAnalysis(tokens[key])[0])
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
