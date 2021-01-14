import { Relation } from './dparser/relation';
import { ConstructionOfPhrase } from './dparser/rules';

/** Parsing */
export class Document {
  /** Dependency relations. */
  relations: Array<Relation> = new Array();
  /** Nodes as stack or queue elements */
  nodes: Array<Node> = new Array();
}

export class Node {
  /** The simple part-of-speech tag. */
  pos: string = ''; // upos. universal pos.
  /** The detailed, language-specific part-of-speech tag. */
  tag: string = ''; // xpos
  /** The base form of the word. */
  lemma: string = '';
  /** Syntactic dependnecy */
  dep: string = ''; // deprel
  /** The head of this token */
  head: string = '';

  /**
   * Constructor of Token.
   * @param token The text of the token
   */
  constructor(public token: string) {}
}
