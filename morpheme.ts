import { AlphabeticGrpheme, ToneMark, Final } from './grapheme'
import { ToneSandhiSyllable, Allomorph } from './syllable';

class ToneMorpheme {
    sandhiForm: Allomorph
    baseForm: Allomorph

    replace() {}
    remove() {}
}

export class LexicalAffix {
    syllable: ToneSandhiSyllable
    stem: LexicalStem
    affix: Affix
}

class Prefix {}
class Infix {}
class Suffix {}

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

class LexicalStem {
    //stem of free tone
    //stem of checked tone
    //stem of neutral tone
    graphemes: Array<AlphabeticGrpheme>
}


class ToneMarkMorpheme {}
class InflectionalStem {
    //stem of free tone
    //stem of checked tone
    //stem of neutral tone
    graphemes: Array<AlphabeticGrpheme>

}

class DerivationalMorpheme {}
class InflectionalMorpheme {}
class AgglutinativeMorpheme {}
class ToneSandhiMorpheme {}
class PluralMorpheme {}

class DerivationalAffix {}
class InflectionalAffix {}
class ToneSandhiAffix {}
