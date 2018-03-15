import { Expression, Operator, AndExpression, OrExpression, PeriodExpression } from './expression';
import { Operand } from './astwrapper';

class Shunter {
  nodes: Array<Expression>;

  constructor(nodes) {
    this.nodes = nodes;
    console.log("shunter constructor");
    //console.log(this.nodes);
  }

  join(operators: Array<Operator>, output: Array<Expression>) {
    try {
      // If you call pop() on an empty array, it returns null.
      let o = operators.pop();
      if (typeof o !== null) {
        let n = output.pop();

        if (typeof n !== null) {
          o.right = n;
        } else {
          o.right = null;
        }

        n = output.pop();

        if (typeof n !== null) {
          o.left = n;
        } else {
          o.left = null;
        }

        output.push(o);
      }
    } catch (message) {
      console.log("failed in join method.");
    }
  }

  shunt(): Expression {
    // use shunting yard algorithm

    let operators: Array<Operator> = new Array();
    let output: Array<Expression> = new Array();

    for(var i in this.nodes) {
      let node = this.nodes[i];

      if(node instanceof Operand && !node.isInitialCapitalized()) {
        output.push(node);
      } else if(node instanceof AndExpression || node instanceof OrExpression) {
        operators.push(node);
      } else if(node instanceof Operand && node.isInitialCapitalized()) {
        output.push(node);
      } else if(node instanceof PeriodExpression) {
        if(output[output.length-1] instanceof Operator) {
          console.log("something wrong!");
        } else if(output[output.length-1] instanceof Operand) {
          this.join(operators, output);
        }
      }
    }

    while(operators.length > 0){
      this.join(operators, output);
    }
    
    console.log(output);
    return output[0]; // return the top of the ast
  }
}

export class Parser {
  private s: Shunter;
  constructor(nodes: Array<Expression>) {
    this.s = new Shunter(nodes);
  }

  parse(): Expression {
    return this.s.shunt();
  }
}