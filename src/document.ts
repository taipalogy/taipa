import { Relation } from './dparser/relation';
import { Node } from './token';
import { ConstructionOfPhrase } from './dparser/rules';

/** Dependency parsing results. */
export class Document {
  /** Dependency relations. */
  relations: Array<Relation> = new Array(); // dependency
  /** Phrases. */
  phrases: Array<ConstructionOfPhrase> = new Array();
  /** Nodes */
  nodes: Array<Node> = new Array();
}
