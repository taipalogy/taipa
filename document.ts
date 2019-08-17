import { LemmatizationLexeme } from './tonal/lexeme'
import { Word } from './lexeme'
import { Sound } from './grapheme';
import { Arc } from './dparser/transition'

export class Document {
    lemmatizationLexemes: Array<LemmatizationLexeme> = new Array();
    lemmata: Array<Word> = new Array();
    inflectionalEnding: string = ''
    soundSequences: Array<Sound[]> = new Array()
    blockSequences: string[] = []
    graph: Array<Arc> = new Array()
}
