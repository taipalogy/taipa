import { ToneMark } from './grapheme'
import { Allomorph } from './syllable';

class ToneMorpheme {
    sandhiForm: Allomorph
    baseForm: Allomorph

    replace() {}
    remove() {}
}

export class LexicalAffix {
    stem: LexicalStem
    affix: Affix
}

class LexicalPrefix {}
class LexicalInfix {}
class LexicalSuffix {}

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
}


class ToneMarkMorpheme {}
class InflectionalStem {
    //stem of free tone
    //stem of checked tone
    //stem of neutral tone
}

class DerivationalMorpheme {}
class InflectionalMorpheme {}
class AgglutinativeMorpheme {}
class PluralMorpheme {}

class DerivationalAffix {}
class InflectionalAffix {}
class ToneSandhiAffix {}
