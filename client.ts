
import { LetterWrapper } from './letterwrapper'
import { ToneSandhiSyllableWrapper } from './syllablewrapper'
import { ToneSandhiWordWrapper } from './wordwrapper'
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
        let lt = new LetterWrapper(str);
        let seqOfGraphemes = lt.transform();

        // Syllable Transformer
        let st = new ToneSandhiSyllableWrapper(seqOfGraphemes);
        let seqOfMorphemes = st.transform();

        // Word Transformer
        let wt = new ToneSandhiWordWrapper(seqOfMorphemes);
        let seqOfLexemes = wt.transform();

        let doc: Document = new Document();
        doc.lexemes = seqOfLexemes
        return doc;
    }

    process(str: string): Document {
        return new Document;
    }
}