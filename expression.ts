
import { Letter } from './metadata';
import { Lexeme } from './lexicalanalyzer';
import { Context } from "./context";
import { IConstituent} from './constituent';

//-----------------------------------------------------------------------------
//  Expression
//-----------------------------------------------------------------------------

export interface IExpression {
    literal: string;
    evaluate(context: Context);
}

export class Expression implements IExpression {
    literal: string = '';
    evaluate(context: Context){}
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
//  AstWrapper for Abstract Syntax Tree
//-----------------------------------------------------------------------------

export interface IOperand extends IExpression {
    literal: string;

    isBasicForm() : Boolean;
}

export class GrammaticalUnit implements IOperand, IConstituent {
    literal: string;
    partOfSpeech: string;
    
    evaluate(context: Context){}
    isBasicForm() {return this.isInitialLowerCase()}
    private isInitialLowerCase() {return true}
}