import { LexicalAffix } from './morpheme'
import { ToneSandhiSyllable } from './syllable';
import { ToneSandhiWord } from './word';

class Lexeme {
}

class ToneSandhiLexeme extends Lexeme {
    word: ToneSandhiWord
    constructor(syllables: Array<ToneSandhiSyllable>) {
        super();
        this.word = new ToneSandhiWord(syllables);
    }

    getBaseForm() {
        
    }
}

class PartOfSpeech {
    lexicalAffixes: Array<LexicalAffix>
}