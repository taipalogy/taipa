import { Context } from "./context";

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