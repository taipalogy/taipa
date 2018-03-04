import { ToneSandhiPartOfSpeech, AndLexemeExpression, OrLexemeExpression, Lexeme} from './lexicalanalyzer';
import { ToneSandhiAffix, AndMorphemeExpression, Morpheme } from './morphologicalanalyzer';

//------------------------------------------------------------------------------
//  turn a sequence into a series
//------------------------------------------------------------------------------

export class Serializer {

    // turn a sequence of morphemes into a series of morphemes
    serializeMorphemes(morphemes: Array<ToneSandhiAffix>) {
        let a: Array<Morpheme> = new Array();
        for(var i in morphemes) {
            let m = morphemes.shift();
            a.push(m);
            a.push(new AndMorphemeExpression());
        }
        return a;
    }

    // turn a sequence of lexemes into a series of lexemes
    serializeLexemes(lexemes: Array<ToneSandhiPartOfSpeech>) {
        let a: Array<Lexeme> = new Array();
        for(var i in lexemes) {
            let l = lexemes.shift();
            a.push(l);
            if(l.isBaseForm()) {
                a.push(new OrLexemeExpression());
            } else {
                a.push(new AndLexemeExpression());
            }
        }
        return a;
    }
}