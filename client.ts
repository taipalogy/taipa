
import { GraphemeMaker } from './graphememaker'
import { ToneSandhiMorphemeMaker } from './morphememaker'
import { ToneSandhiLexemeMaker } from './lexememaker'
import { ToneSandhiLexeme } from './lexeme'
import { indexed_dictionary } from './dictionary'
import { DependencyParser, Configuration, Guide, Transition, Dependencies } from './dependencyparser'

export class Document {
    lexemes: Array<ToneSandhiLexeme> = new Array();
    dependencies: Dependencies
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

    take(str: string) {
        
        // Grapheme Maker
        let lt = new GraphemeMaker(str);
        let seqOfGraphemes = lt.makeGrapheme();

        // Morpheme Maker
        let st = new ToneSandhiMorphemeMaker(seqOfGraphemes);
        let seqOfMorphemes = st.makeMorpheme();

        // Lexeme Maker
        let wt = new ToneSandhiLexemeMaker(seqOfMorphemes);
        let seqOfLexemes = wt.makeLexeme();

        let doc: Document = new Document();
        doc.lexemes = seqOfLexemes
        return doc;
    }

    process(str: string): Document {
        /*
        let dp = new DependencyParser();
        let c: Configuration = dp.getInitialConfiguration(str);
        let guide = new Guide()
        while(!c.isTerminalConfiguration()) {
            let t: Transition = guide.getNextTransition(c);
            c = c.makeTransition(t);
        }
*/
        let d = new Document();
        //d.dependencies = c.getGraph();
        return new Document;
    }
}