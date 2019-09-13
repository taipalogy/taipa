import { Word } from './lexeme';
import { Sound } from './grapheme';
import { Relation } from './dparser/relation';

export class Document {
    word: Word = new Word();
    lemmata: Array<Word> = new Array();
    iEnding: string = ''; // inflectinal ending
    soundSeqs: Array<Sound[]> = new Array(); // sound sequences
    blockSeqs: string[] = []; // block sequences
    relations: Array<Relation> = new Array(); // dependency
}
