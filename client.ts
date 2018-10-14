
import { GraphemeMaker } from './graphememaker'
import { ToneSandhiMorphemeMaker } from './morphememaker'
import { ToneSandhiLexemeMaker } from './lexememaker'
import { ToneSandhiLexeme } from './lexeme'
import { indexed_dictionary } from './dictionary'
import { DependencyParser, Configuration, Guide, Transition, Arc } from './dependencyparser'

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
        console.log(c.isTerminalConfiguration())
        let tokens = str.match(/\w+/g);
        
        for(let key in tokens) {
            console.log(tokens[key])
            c.queue.push(this.turnLexeme(tokens[key])[0])
        }
        
        let guide = new Guide()
        
        while(!c.isTerminalConfiguration()) {
            let t: Transition = guide.getNextTransition(c);
            c = c.makeTransition(t);
        }

        let doc = new Document();
        doc.graph = c.getGraph();
        return doc;
    }
}