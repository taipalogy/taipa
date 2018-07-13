
import { ToneSandhiSyllable, ToneSandhiMorpheme } from './syllable'
import { ToneSandhiWord } from './word';
import { Affix, FreeToneSuffix, FinalToneSuffix, SuffixY, SuffixW, SuffixX } from './morpheme'


class InflectionalStem {
    //stem of free tone
    //stem of checked tone
    //stem of neutral tone
}

class FormsOfLexeme {

    getMatchedBaseFormForFreeTone(syllable: ToneSandhiSyllable) {
    }
}


class Lexeme {
}

class ToneSandhiLexeme extends Lexeme {
    word: ToneSandhiWord
    form
    assimilation
    consonantMutation

    constructor(syllables: Array<ToneSandhiSyllable>) {
        super();
        this.word = new ToneSandhiWord(syllables);
        this.assignLexicalSuffix();
    }

    assignLexicalSuffix() {
        let lss
        lss = new FormsOfLexeme().getMatchedBaseFormForFreeTone(this.word.syllables[this.word.syllables.length-1]);
        this.form = lss[0];
    }

    getBaseForm() {
    }
}


class PartOfSpeech extends ToneSandhiLexeme {
}

class Verb extends PartOfSpeech {}
class Noun extends PartOfSpeech {}
class Adjective extends PartOfSpeech {}
class Particle extends PartOfSpeech {}
class Preposition extends PartOfSpeech {}
class Pronoun extends PartOfSpeech {}