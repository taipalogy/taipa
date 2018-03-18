import { ToneSandhiLexeme, Lexeme} from './lexicalanalyzer';
import { ToneSandhiMorpheme, Morpheme } from './morphologicalanalyzer';
import { Expression, AndExpression, OrExpression } from './expression';
import { Grapheme, AlphabetGrapheme } from './graphemicanalyzer';
import { LetterExpression } from './expression';

//------------------------------------------------------------------------------
//  turn a sequence into a series
//------------------------------------------------------------------------------

class Serializer {
}

export class SerializerOfGraphemes extends Serializer {
    graphemes: Array<Grapheme>;

    constructor(graphemes: Array<AlphabetGrapheme>) {
        super();
        this.graphemes = graphemes;
        console.log(this.graphemes);
    }

    serialize() {
        let a: Array<Expression> = new Array();
        for(var i in this.graphemes) {
            let g = this.graphemes[i];
            let le = new LetterExpression(g);
            a.push(le);
            a.push(new AndExpression());
        }
        return a;
    }
}