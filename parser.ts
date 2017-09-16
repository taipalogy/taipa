import { Expression, Group, Series } from './expression';
import { PartOfSpeech } from './word';

class Shunter {
  nodes: Expression[];

  constructor(nodes) {
    //for (var i in nodes) {
    //this.nodes.push(nodes[i]);
    //}
    this.nodes = nodes;
    console.log("shunter constructor");
    //console.log(this.nodes);
  }

  join(operators, operands) {
    // If you call pop() on an empty array, it returns undefined.
    let o = operators.pop();
    if (typeof o !== 'undefined') {
      var tmpo = operands.pop();

      if (typeof tmpo !== 'undefined') {
        o.left = tmpo;
      } else {
        o.left = null;
      }

      tmpo = operands.pop();

      if (typeof tmpo !== 'undefined') {
        o.right = tmpo;
      } else {
        o.right = null;
      }

      operands.push(o);
    }
  }

  shunt(): Series {
    // use shunting yard algorithm

    var operators = [];
    var operands = [];
    var grouping = false;
    var previousOriginal = true;
    var count = 0;
    var sequenceOfGroups = [];
    var groupMembers = [];

    console.log("entering shunt function");

    for (var i in this.nodes) {

      let node = this.nodes[i];

      if (node.partOfSpeech == PartOfSpeech.Verb) {
        // collecting operators/verbs
        if (grouping) {
            count = count + 1;
        }

        console.log("verb:%s", node.literal);
        console.log("operator found");

        operators.push(node);
        console.log("operators length" + operators.length);
      } else {
        // collecting operands/nouns
        if (!node.isOriginal()) {
          console.log("noun:%s", node.literal);
        }

        operands.push(node);
        console.log("operands length:" + operands.length);

        if (!node.isOriginal() && previousOriginal === true && grouping === false) {
          // start grouping
          previousOriginal = false;
          grouping = true;
          groupMembers = [];
          groupMembers.push(node);
        } else if (node.isOriginal() && previousOriginal === false && grouping === true) {
          // end grouping
          previousOriginal = true;
          grouping = false;

          while (count > 0) {
              this.join(operators, operands);
              count = count - 1;
          }

          groupMembers.push(node);
          // make group members a group
          //let group = new Group(operands.pop(), groupMembers);
          let group = new Group(operands.pop());
          sequenceOfGroups.push(group);
          operands.push(group);
        } else if (!node.isOriginal() && previousOriginal === false && grouping === true) {
          groupMembers.push(node);
        } else if (node.isOriginal() && previousOriginal === true && grouping === false) {
          sequenceOfGroups.push(node);
        }
      }
    }

    console.log("length of operands(before joining):" + operands.length);

    while (operators.length) {
        this.join(operators, operands);
    }

    let s: Series = null;
    if (operands.length == 1) {

        let last = operands.pop();
        // when i delcared an variable s without using keyword var
        // this s was assigned to a sequence instance
        // hence i changed s to sqn and add keyword var before s
        //s = new Series(last, sequenceOfGroups);
        s = new Series(last);
        console.log(sequenceOfGroups);
    } else if (operands.length !== 1) {
        console.log("length of operands:" + operands.length);
        console.log("parsing error!!");
    }

    console.log(s);
    return s;
  }
}

export class Parser {
  private s: Shunter;
  constructor(nodes: Expression[]) {
    this.s = new Shunter(nodes);
  }

  parse(): Series {
    return this.s.shunt();
  }
}