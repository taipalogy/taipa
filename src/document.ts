import { LemmatizationLexeme } from './tonal/lexeme'
import { Word } from './lexeme'
import { Sound } from './grapheme';
import { Relation } from './dparser/relation'

export class Document {
    lemmatizationLexemes: Array<LemmatizationLexeme> = new Array();
    //word: Word = new Word()
    lemmata: Array<Word> = new Array();
    inflectionalEnding: string = ''
    soundSequences: Array<Sound[]> = new Array()
    blockSequences: string[] = []
    graph: Array<Relation> = new Array()
}
