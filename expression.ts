import { Morpheme } from './morphologicalanalyzer';
import { Grapheme } from './graphemicanalyzer';
import { Context } from "./context";

//-----------------------------------------------------------------------------
//  Expression
//-----------------------------------------------------------------------------

interface IExpression {
    literal: string;
}

export class Expression implements IExpression {
    literal: string;

    evaluate(context: Context) {}
}

export class Operator extends Expression {
    right: Expression;
    left: Expression;
}

export class AndExpression extends Operator {
    constructor() {
        super();
        this.literal = '&';
    }
}

export class OrExpression extends Operator {
    constructor() {
        super();
        this.literal = '|';
    }
}

export class PeriodExpression extends Operator {
    constructor() {
        super();
        this.literal = '.';
    }
}

//-----------------------------------------------------------------------------
//  Adapter Pattern
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
//  Wrapper for Abstract Syntax Tree
//-----------------------------------------------------------------------------

export class AstWrapperTwo extends Expression {
    literal: string;

    isBase(){}
}

export class Operand extends AstWrapperTwo {

    isInitialCapitalized() {}
}

export class PhraseExpression extends Operand {

}

export class WordExpression extends Operand {

}

export class SyllableExpression extends Operand {
    morpheme: Morpheme;
    constructor(morpheme: Morpheme) {
        super();
        this.morpheme = morpheme;
    }
}

export class LetterExpression extends Operand {
    grapheme: Grapheme;
    constructor(grapheme: Grapheme) {
        super();
        this.grapheme = grapheme;
    }
}