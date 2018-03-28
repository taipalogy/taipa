import { Morpheme } from './morphologicalanalyzer';
import { Grapheme } from './graphemicanalyzer';
import { Lexeme } from './lexicalanalyzer';
import { Context } from "./context";

//-----------------------------------------------------------------------------
//  Expression
//-----------------------------------------------------------------------------

interface IExpression {
    literal: string;
}

export class Expression implements IExpression {
    literal: string;

    constructor() {this.literal = '';}
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

export class AstWrapper extends Expression {
    literal: string;

    isBasicForm() : Boolean {return true}
}

export class Operand extends AstWrapper {

    isBasicForm() {return this.isInitialLowerCase()}
    private isInitialLowerCase() {return true}
}

export class PhraseExpression extends Operand {

}

export class WordExpression extends Operand {
    lexeme: Lexeme;
    constructor(lexeme: Lexeme) {
        super();
        this.lexeme = lexeme;
    }
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