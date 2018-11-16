
import { GraphemeMaker } from './graphememaker'
import { ToneSandhiMorphemeMaker } from './morphememaker'
import { ToneSandhiLexemeMaker } from './lexememaker'
import { ToneSandhiInputingLexeme, TurnLexemeFromString } from './lexeme'
import { dictionary } from './dictionary'
import { DependencyParser, Configuration, Guide, Transition, Arc, Shift } from './dependencyparser'
import { RuleBasedTagger } from './rulebasedtagger'

export class Document {
    lexemes: Array<ToneSandhiInputingLexeme> = new Array();
    graph: Set<Arc>
}

export class Client {
    lookup(k: string) {
        for(let key in dictionary) {
            if(key == k) {
            var value = dictionary[key];
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
        let gm = new GraphemeMaker(str);
        let graphemes = gm.makeGraphemes();

        // Morpheme Maker
        let tsmm = new ToneSandhiMorphemeMaker(graphemes);
        let morphemes = tsmm.makeMorphemes();

        // Lexeme Maker
        let tslm = new ToneSandhiLexemeMaker(morphemes);
        let lexemes = tslm.makeLexemes();

        return lexemes;
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

        let lexemes: Array<ToneSandhiInputingLexeme> = new Array();
        let turner = new TurnLexemeFromString()
        for(let key in tokens) {
            lexemes.push(turner.turnLexeme(tokens[key])[0])
        }

        // can lexemes be replaced by a phraseme?
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
            if(t == null) break;
            c = c.makeTransition(t);
        }

        let doc = new Document();
        doc.graph = c.getGraph();
        return doc;
    }
}