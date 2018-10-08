
import { IExpression, Expression, AndExpression, OrExpression } from './expressionparser';
import { ToneSandhiLexeme } from './lexeme';

//------------------------------------------------------------------------------
//  turn a sequence into a series
//------------------------------------------------------------------------------

class SeriesMaker {
}

export class SeriesOfLexeme extends SeriesMaker {
    // turn a sequence of lexemes to a series of lexemes

    lexemes: Array<ToneSandhiLexeme>;

    constructor(lexemes: Array<ToneSandhiLexeme>) {
        super();
        this.lexemes = lexemes;
        console.log(this.lexemes);
    }

    make() {
        let a: Array<IExpression> = new Array();
        for(var i in this.lexemes) {
            let g = this.lexemes[i];
            a.push(g);
            a.push(new AndExpression());
        }
        return a;
    }
}