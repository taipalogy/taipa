import { PartOfSpeech, ToneSandhi } from './word';

export class Expression extends ToneSandhi {
  partOfSpeech: PartOfSpeech;
  baseTone: string;
  literal: string;
  constructor() {
    super();
    this.literal = "";
  }

  getLiteral() {
    return this.literal;
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

  getBaseTone() {
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
  ast: Expression;
  nodes: any;
  constructor(ast, members) {
    super();
    this.ast = ast;
    this.nodes = members;
  }

  getLiteral() {
    return this.ast.getLiteral();
  }

}

export class Series extends AstWrapper {
  constructor(ast, sequenceOfGroups) {
    super(ast, sequenceOfGroups);
  }
  evaluate(context) {}
}

export class Group extends AstWrapper {
  constructor(ast, groupMembers) {
    super(ast, groupMembers);
  }
  evaluate() {}
}
