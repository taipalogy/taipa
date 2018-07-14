
import { ToneSandhiSyllable, Allomorph } from './syllable'
import { ToneSandhiWord } from './word';
import { GrammaticalUnit } from './expression'

class InternalSandhi {
    allomorph: Allomorph
}

class InflectionalStem {
    //stem of free tone
    //stem of checked tone
    //stem of neutral tone
}

class InternalSandhiOfLexeme {
}


class Lexeme extends GrammaticalUnit {
}

class ToneSandhiLexeme extends Lexeme {
    word: ToneSandhiWord
    form
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
}

class Verb extends PartOfSpeech {}
class Noun extends PartOfSpeech {}
class Adjective extends PartOfSpeech {}
class Particle extends PartOfSpeech {}
class Preposition extends PartOfSpeech {}
class Pronoun extends PartOfSpeech {}