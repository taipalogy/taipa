
import { ToneSandhiSyllable, ToneSandhiMorpheme } from './syllable'
import { ToneMark, Siann } from './grapheme'

class ToneMarkMorpheme {}

class Affix {
    toneMark: ToneMark
}

class ZeroSuffix extends Affix {}
class SuffixZS extends Affix {
}
class InterfixZS extends Affix {
}
class SuffixY extends Affix {}
class InterfixY extends Affix {}
class SuffixW extends Affix {}
class InterfixW extends Affix {}
class SuffixX extends Affix {}
class InterfixSS extends Affix {}
class InterfixXX extends Affix {}
class InterfixXXX extends Affix {}
class InterfixP extends Affix {
}
class InterfixT extends Affix {}
class InterfixK extends Affix {}
class InterfixH extends Affix {}
class InterfixB extends Affix {}
class InterfixD extends Affix {}
class InterfixG extends Affix {}
class InterfixF extends Affix {}

class LexcialSuffixes {

}

export class LexicalAffix {
    stem: LexicalStem
    affix: Affix
}

class LexicalPrefix {}
class LexicalInfix {}
class LexicalSuffix {}

class LexicalStem {
    //stem of free tone
    //stem of checked tone
    //stem of neutral tone
    sianns: Array<Siann>
}

class DerivationalAffix {}
class InflectionalAffix {}



class Lexeme {
}

class ToneSandhiLexeme extends Lexeme {
    constructor(syllables: Array<ToneSandhiSyllable>) {
        super();
        this.assignLexicalSuffix();
    }

    assignLexicalSuffix() {}

    getBaseForm() {
        
    }
}
