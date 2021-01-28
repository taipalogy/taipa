import { DepRelations } from './symbols';
import { Node } from '../document';

export class Relation {
  dependency: DepRelations;
  head: Node;
  dependent: Node;

  constructor(dep: DepRelations, head: Node, dependent: Node) {
    this.dependency = dep;
    this.head = head;
    this.dependent = dependent;
  }
}
