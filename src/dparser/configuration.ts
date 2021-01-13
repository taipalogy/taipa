import { Relation } from './relation';
import { Node } from '../document';

export abstract class Transition {
  abstract do(c: Configuration): Configuration;
}

export class Shift extends Transition {
  do(c: Configuration) {
    let s = c.queue.shift();
    if (s != undefined) {
      c.stack.push(s);
    }
    return c;
  }
}

export class RightArc extends Transition {
  do(c: Configuration) {
    c.stack.pop();
    return c;
  }
}

export class LeftArc extends Transition {
  do(c: Configuration) {
    const top = c.stack.pop();
    c.stack.pop();
    if (top) c.stack.push(top);
    return c;
  }
}

export class Configuration {
  queue: Array<Node> = new Array();
  stack: Array<Node> = new Array();
  relations: Array<Relation> = new Array();

  getGraph() {
    return this.relations;
  }

  isTerminalConfiguration() {
    if (this.queue.length > 0) {
      return false;
    }
    if (this.stack.length == 1 && this.queue.length == 0) {
      return true;
    }
    return false;
  }
}
