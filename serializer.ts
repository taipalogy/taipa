import { ToneSandhiLexeme, Lexeme} from './lexicalanalyzer';
import { Syllable, ToneSandhiSyllable } from './morphologicalanalyzer';
import { IExpression, Expression, AndExpression, OrExpression } from './expression';
import { Letter, AlphabeticLetter } from './metadata';

//------------------------------------------------------------------------------
//  turn a sequence into a series
//------------------------------------------------------------------------------

class Serializer {
}

export class SerializerOfGraphemes extends Serializer {
    // turn a sequence of graphemes to a series of letters

    letters: Array<Letter>;

    constructor(letters: Array<AlphabeticLetter>) {
        super();
        this.letters = letters;
        console.log(this.letters);
    }

    serialize() {
        let a: Array<IExpression> = new Array();
        for(var i in this.letters) {
            let g = this.letters[i];
            a.push(g);
            a.push(new AndExpression());
        }
        return a;
    }
}