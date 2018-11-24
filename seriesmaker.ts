
import { IExpression, Expression, AndExpression, OrExpression, GrammaticalUnit } from './expressionparser';
import { ToneSandhiLexeme } from './lexeme';

class Node extends GrammaticalUnit {
    lexeme: ToneSandhiLexeme
}

//------------------------------------------------------------------------------
//  turn a sequence into a series
//------------------------------------------------------------------------------

class SeriesMaker {
}

export class SeriesOfLexeme extends SeriesMaker {
    // turn a sequence of lexemes to a series of lexemes

    nodes: Array<Node>;

    constructor(nodes: Array<Node>) {
        super();
        this.nodes = nodes;
        console.log(this.nodes);
    }

    make() {
        let a: Array<IExpression> = new Array();
        for(var i in this.nodes) {
            let g = this.nodes[i];
            a.push(g);
            a.push(new AndExpression());
        }
        return a;
    }
}