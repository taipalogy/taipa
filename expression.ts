interface IExpression {
    literal: string;
}

export class Expression implements IExpression {
    literal: string;
}

export class AndExpression extends Expression {
    constructor() {
        super();
        this.literal = '&';
    }
}

export class OrExpression extends Expression {
    constructor() {
        super();
        this.literal = '|';
    }
}
