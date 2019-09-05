import { LemmatizationLexeme } from './tonal/lexeme'
import { Word } from './lexeme'
import { Sound } from './grapheme';
import { Relation } from './dparser/relation'

export class Document {
    word: Word = new Word()
    lemmata: Array<Word> = new Array();
    inflectionalEnding: string = ''
    soundSequences: Array<Sound[]> = new Array()
    blockSequences: string[] = []
    relations: Array<Relation> = new Array()
}
