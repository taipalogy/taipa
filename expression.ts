export interface Expression {

}

export class ToneSandhiNoun implements Expression {
  evaluate() {}
}

export class ToneSandhiVerb implements Expression {
  left: Expression;
  right: Expression;

  process() {}
  evaluate() {}
}

export class AstWrapper implements Expression {
  ast: any;
  nodes: any;
  constructor(ast, sequence) {
    this.ast = ast;
    this.nodes = sequence;
  }

  get Literal() {
    //return the literals from this.nodes
    return null;
  }

  evaluate(context) {
    return this.ast.evaluate(context);
  }
}

export class Series implements Expression {
  constructor(ast: any, sequence: any) {}
  evaluate() {}
}

export class Group implements Expression {
  constructor(ast: any, sequence: any) {}
  evaluate() {}
}
