
import { ToneSandhiWord } from './word';
import { GrammaticalUnit } from './expression'
import { LexicalAffix } from './morpheme';

class PartOfSpeeches {
}


class Lexeme extends GrammaticalUnit {
}

class ToneSandhiLexeme extends Lexeme {
    word: ToneSandhiWord
    baseForm
    assimilation
    consonantMutation

    constructor(word: ToneSandhiWord) {
        super();
        this.word = word;
        this.assignLexicalSuffix();
    }

    assignLexicalSuffix() {
    }

    getBaseForm() {
    }
}

export class PartOfSpeech extends ToneSandhiLexeme {
    lexicalAffixes: Array<LexicalAffix>
    isAssimilated() {}
    isConsonantMutated() {}
}

class Verb extends PartOfSpeech {}
class Noun extends PartOfSpeech {}
class Adjective extends PartOfSpeech {}
class Particle extends PartOfSpeech {}
class Preposition extends PartOfSpeech {}
class Pronoun extends PartOfSpeech {}
class Adverb extends PartOfSpeech {}
