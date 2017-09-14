import { PartOfSpeech, ToneSandhi } from './word';

export class Expression extends ToneSandhi {
  partOfSpeech: PartOfSpeech;
  baseTone: string;
  literal: string;
  constructor() {
    super();
    this.literal = "";
  }

  evaluate(context) {}
}

export class ToneSandhiNoun extends Expression {
  literal: string;
  constructor(s) {
    super();
    this.literal = s;
    this.partOfSpeech = PartOfSpeech.Noun;
    console.log("%cliteral:%s", "color: purple; font-size: large", s);
  }
  evaluate() {}

  get baseTone() {
    return this.literal;
  }
}

export class ToneSandhiVerb extends Expression {
  left: Expression;
  right: Expression;

  constructor(s) {
    super();
    this.literal = s;
    this.partOfSpeech = PartOfSpeech.Verb;   
    console.log("%cliteral:%s", "color: purple; font-size: large", s);
  }
  process() {}
  evaluate() {}
}

export class AstWrapper extends Expression {
  ast: any;
  nodes: any;
  constructor(ast, sequence) {
    super();
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

export class Series extends Expression {
  constructor(ast, sequence) {
    super();
  }
  evaluate(context) {}
}

export class Group extends AstWrapper {
  constructor(ast, sequence) {
    super(ast, sequence);
  }
  evaluate() {}
}
