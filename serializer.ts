import { ToneSandhiLexeme, Lexeme} from './lexicalanalyzer';
import { ToneSandhiMorpheme, Morpheme } from './morphologicalanalyzer';
import { AndExpression, OrExpression } from './expression';

//------------------------------------------------------------------------------
//  turn a sequence into a series
//------------------------------------------------------------------------------

class Serializer {

    // turn a sequence of morphemes into a series of morphemes
    serializeMorphemes(morphemes: Array<ToneSandhiMorpheme>) {
        let a: Array<Morpheme> = new Array();
        for(var i in morphemes) {
            let m = morphemes.shift();
            a.push(m);
            a.push(new AndExpression());
        }
        return a;
    }

    // turn a sequence of lexemes into a series of lexemes
    serializeLexemes(lexemes: Array<ToneSandhiLexeme>) {
        let a: Array<Lexeme> = new Array();
        for(var i in lexemes) {
            let l = lexemes.shift();
            a.push(l);
            if(l.isBaseForm()) {
                a.push(new OrExpression());
            } else {
                a.push(new AndExpression());
            }
        }
        return a;
    }
}