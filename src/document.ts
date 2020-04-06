import { Relation } from './dparser/relation';
import { Token } from './token';
import { ConstructionOfPhrase } from './dparser/rules';

/** Dependency parsing results. */
export class Document {
  /** Dependency relations. */
  relations: Array<Relation> = new Array(); // dependency
  /** Phrases. */
  phrases: Array<ConstructionOfPhrase> = new Array();
  /** Tokens */
  tokens: Array<Token> = new Array();
}
