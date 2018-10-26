
import { GraphemeMaker } from './graphememaker'
import { ToneSandhiMorphemeMaker } from './morphememaker'
import { ToneSandhiLexemeMaker } from './lexememaker'
import { ToneSandhiLexeme } from './lexeme'
import { indexed_dictionary } from './dictionary'
import { DependencyParser, Configuration, Guide, Transition, Arc, Shift, RightArc, LeftArc } from './dependencyparser'
import { Node, RuleBasedTagger } from './rulebasedtagger'

export class Document {
    lexemes: Array<ToneSandhiLexeme> = new Array();
    graph: Set<Arc>
}

export class Client {
    lookup(k: string) {
        for(let key in indexed_dictionary) {
            if(key == k) {
            var value = indexed_dictionary[key];
            }
            if(value != null) {
            //console.log(value[0]);
            return value[0];
            }
        }
        return null;
    }

    turnLexeme(str: string) {
        // Grapheme Maker
        let lt = new GraphemeMaker(str);
        let seqOfGraphemes = lt.makeGrapheme();

        // Morpheme Maker
        let st = new ToneSandhiMorphemeMaker(seqOfGraphemes);
        let seqOfMorphemes = st.makeMorpheme();

        // Lexeme Maker
        let wt = new ToneSandhiLexemeMaker(seqOfMorphemes);
        let seqOfLexemes = wt.makeLexeme();

        return seqOfLexemes;
    }
    
    processOneToken(str: string) {
        let doc: Document = new Document();
        doc.lexemes = this.turnLexeme(str.match(/\w+/g)[0]);
        return doc;
    }

    process(str: string): Document {

        console.log(str)
        let dp = new DependencyParser();
        let c: Configuration = dp.getInitialConfiguration();
        let tokens = str.match(/\w+/g);

        let lexemes: Array<ToneSandhiLexeme> = new Array();
        for(let key in tokens) {
            lexemes.push(this.turnLexeme(tokens[key])[0])
        }
        let tagger = new RuleBasedTagger(lexemes);
        let nodes = tagger.nodes;

        for(let key in nodes) {
            c.queue.push(nodes[key])
        }
        
        let guide = new Guide()
        
        if(c.stack.length == 0 && c.queue.length > 0) {
            // initial configuration
            // shift the first lexeme from queue to stack
            guide.transitions.push(new Shift())
        }

        while(!c.isTerminalConfiguration()) {
            let t: Transition = guide.getNextTransition();
            c = c.makeTransition(t);
        }

        let doc = new Document();
        doc.graph = c.getGraph();
        return doc;
    }
}