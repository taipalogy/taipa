import { Relation } from './dparser/relation';
import { Token } from './token';
import { ConstructionOfSpeech } from './dparser/rules';

export class Document {
    relations: Array<Relation> = new Array(); // dependency
    speeches: Array<ConstructionOfSpeech> = new Array();
    tokens: Array<Token> = new Array();
}
