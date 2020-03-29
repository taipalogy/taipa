import { Relation } from './dparser/relation';
import { Token } from './token';
import { ConstructionOfPhrase } from './dparser/rules';

export const docPipe = (...fns: Array<(doc: Document) => Document>) => (
  x: Document
) => fns.reduce((v, f) => f(v), x);

/** Dependency parsing results. */
export class Document {
  /** Dependency relations. */
  relations: Array<Relation> = new Array(); // dependency
  /** Phrases. */
  phrases: Array<ConstructionOfPhrase> = new Array();
  /** Tokens */
  tokens: Array<Token> = new Array();
}
