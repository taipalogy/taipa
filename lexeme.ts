
import { ToneSandhiSyllable, ToneSandhiMorpheme } from './syllable'
import { ToneSandhiWord } from './word';
import { Affix, FreeToneSuffix, FinalToneSuffix, SuffixY, SuffixW, SuffixX } from './morpheme'

export class LexicalAffix {
    // affixes
    affix: Affix
}

class LexicalPrefix {}
class LexicalInfix {}
class LexicalSuffix extends LexicalAffix{}

class BaseFormForFreeTone extends LexicalSuffix {
    // affixes
    freeToneSuffix: FreeToneSuffix
}

class BaseFormForFreeToneY extends BaseFormForFreeTone {
    affix = new SuffixY();
    freeToneSuffix = new SuffixW();
}

class BaseFormForFinalTone extends LexicalSuffix {
    // affixes
    //finalToneSuffix: FinalToneSuffix
}

class BaseFormForFinalToneX extends BaseFormForFinalTone {
    affix = new SuffixX();
}

class LexcialSuffixes {
    list_of_base_form_for_free_tone: Array<BaseFormForFreeTone> = new Array();
    list_of_base_form_for_final_tone: Array<BaseFormForFinalTone> = new Array();

    constructor() {
        this.list_of_base_form_for_free_tone.push(new BaseFormForFreeToneY());
    }

    getMatchedBaseFormForFreeTone(syllable: ToneSandhiSyllable) {
        for(let key in this.list_of_base_form_for_free_tone) {
            /*
            if(syllable.isSuffixMatched(this.list_of_base_form_for_free_tone[key].affix)) {
                return this.list_of_base_form_for_free_tone[key];
            }
            */
        }
    }
}


class DerivationalAffix {}
class InflectionalAffix {}



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
        lss = new LexcialSuffixes().getMatchedBaseFormForFreeTone(this.word.syllables[this.word.syllables.length-1]);
        this.form = lss[0];
    }

    getBaseForm() {
    }
}
