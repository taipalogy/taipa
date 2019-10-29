import { Word } from './lexeme';
import { Sound } from './grapheme';
import { Relation } from './dparser/relation';
import { Token } from './token';

export class Document {
    word: Word = new Word();
    lemmata: Array<Word> = new Array();
    inflectionalEnding: string = ''; // inflectinal ending
    soundSequences: Array<Sound[]> = new Array(); // sound sequences
    blockSequences: string[] = []; // block sequences
    relations: Array<Relation> = new Array(); // dependency
    tokens: Token[] = [];
}
