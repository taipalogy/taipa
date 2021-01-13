import { Relation } from './dparser/relation';
import { Node } from './token';
import { ConstructionOfPhrase } from './dparser/rules';

/** Parsing */
export class Document {
  /** Dependency relations. */
  relations: Array<Relation> = new Array();
  /** Phrases. */
  phrases: Array<ConstructionOfPhrase> = new Array();
  /** Nodes as stack or queue elements */
  nodes: Array<Node> = new Array();
}
