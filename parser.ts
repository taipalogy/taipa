import { Word, Group, Series } from './word';
import { PartOfSpeech } from './word';

class Shunter {
  nodes: Word[];

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
      let n = operands.pop();

      if (typeof n !== 'undefined') {
        o.right = n;
      } else {
        o.right = null;
      }

      n = operands.pop();

      if (typeof n !== 'undefined') {
        o.left = n;
      } else {
        o.left = null;
      }

      operands.push(o);
    }
  }

  shunt(): Series {
    // use shunting yard algorithm

    let operators = [];
    let operands = [];
    let grouping = false;
    let previousOriginal = true;
    let count = 0;

    console.log("entering shunt function");

    for (let i in this.nodes) {

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
        console.log(operands);

        if (!node.isOriginal() && previousOriginal === true && grouping === false) {
          // start grouping
          previousOriginal = false;
          grouping = true;
          //groupMembers = [];
          //groupMembers.push(node);
        } else if (node.isOriginal() && previousOriginal === false && grouping === true) {
          // end grouping
          previousOriginal = true;
          grouping = false;

          while (count > 0) {
              this.join(operators, operands);
              count = count - 1;
          }

          //groupMembers.push(node);
          // make group members a group
          //let group = new Group(operands.pop(), groupMembers);
          let group = new Group(operands.pop());
          //sequenceOfGroups.push(group);
          operands.push(group);
        } else if (!node.isOriginal() && previousOriginal === false && grouping === true) {
          //groupMembers.push(node);
        } else if (node.isOriginal() && previousOriginal === true && grouping === false) {
          //sequenceOfGroups.push(node);
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
        //console.log(sequenceOfGroups);
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
  constructor(nodes: Array<Word>) {
    this.s = new Shunter(nodes);
  }

  parse(): Series {
    return this.s.shunt();
  }
}