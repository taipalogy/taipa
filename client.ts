
import { GraphemeMaker } from './graphememaker'
import { ToneSandhiMorphemeMaker } from './morphememaker'
import { ToneSandhiLexemeMaker } from './lexememaker'
import { ToneSandhiLexeme } from './lexeme'
import { dictionary } from './dictionary'

export class Document {
    lexemes: Array<ToneSandhiLexeme> = new Array();
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

    take(str: string) {
        
        // Letter Transformer
        let lt = new GraphemeMaker(str);
        let seqOfGraphemes = lt.makeGrapheme();

        // Syllable Transformer
        let st = new ToneSandhiMorphemeMaker(seqOfGraphemes);
        let seqOfMorphemes = st.makeMorpheme();

        // Word Transformer
        let wt = new ToneSandhiLexemeMaker(seqOfMorphemes);
        let seqOfLexemes = wt.makeLexeme();

        let doc: Document = new Document();
        doc.lexemes = seqOfLexemes
        return doc;
    }

    process(str: string): Document {
        return new Document;
    }
}