import { Relation } from './dparser/relation';
import { Token } from './token';

export class Document {
    relations: Array<Relation> = new Array(); // dependency
    tokens: Token[] = [];
}
