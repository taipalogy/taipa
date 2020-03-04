import { Relation } from './dparser/relation';
import { Token } from './token';
import { ConstructionOfPhrase } from './dparser/rules';

export class Document {
    relations: Array<Relation> = new Array(); // dependency
    phrases: Array<ConstructionOfPhrase> = new Array();
    tokens: Array<Token> = new Array();
}
