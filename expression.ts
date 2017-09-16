import { PartOfSpeech, ToneSandhi } from './word';

export class Expression extends ToneSandhi {
  partOfSpeech: PartOfSpeech;
  baseTone: string;
  literal: string;

  // left and right must be promoted to Expression class
  // left and right are for tree traversal
  // it is in fact there are no left and right on ToneSandhiNoun
  left: Expression;
  right: Expression;

  constructor() {
    super();
    this.literal = "";
    this.left = null;
    this.right = null;
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
    this.left = null;
    this.right = null;
    console.log("%cliteral:%s", "color: purple; font-size: large", s);
  }
  evaluate() {}

  getBaseTone() {
    return this.literal;
  }
}

export class ToneSandhiVerb extends Expression {

  constructor(s) {
    super();
    this.literal = s;
    this.partOfSpeech = PartOfSpeech.Verb;   
    console.log("%cliteral:%s", "color: purple; font-size: large", s);
  }
  process() {}
  evaluate() {}
}

export class AstWrapper {
  ast: Expression;
  //nodes: any;
  literal: string;
  counter: number;
  constructor(ast) {
    //super();
    this.ast = ast;
    //this.nodes = members;
    this.counter = 0;
    this.literal = "";
    this.printPreorder(this.ast);
  }

  printPreorder(e: Expression) {

    if(e == null) {
      return;
    }

    this.counter++;
    this.literal = this.literal + e.literal;
    console.log("literal%d:%s", this.counter, e.literal);
    
    this.printPreorder(e.left);
    this.printPreorder(e.right);
  }
}

export class Series extends AstWrapper {
  constructor(ast) {
    //super(ast, sequenceOfGroups);
    super(ast);
  }
  evaluate(context) {}
}

export class Group extends AstWrapper {
  constructor(ast) {
    //super(ast, groupMembers);
    super(ast);
  }
  evaluate() {}
}
