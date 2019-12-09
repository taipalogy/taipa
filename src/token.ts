import { Word } from './lexeme';
import { Sound } from './grapheme';

export class Token {
    pos: string = '';
    tag: string = '';
    lemma: string = '';
    dep: string = '';
    head: Token | null = null;

    constructor(public text: string) {}
}

export class TokenAnalysis {
    word: Word = new Word();
    lemmata: Array<Word> = new Array();
    inflectionalEnding: string = ''; // inflectinal ending
    soundSequences: Array<Sound[]> = new Array(); // sound sequences
    blockSequences: string[] = []; // block sequences
}