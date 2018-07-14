
import { ToneMark, Sound } from './grapheme';

class ToneMorpheme {
}


class DerivationalAffix {}
class InflectionalAffix {}


class LexicalStem {
    //stem of free tone
    //stem of checked tone
    //stem of neutral tone
    sounds: Array<Sound>
}


class DerivationalMorpheme {}
class InflectionalMorpheme {}
class AgglutinativeMorpheme {}
class PluralMorpheme {}

export class Affix {
    toneMark: ToneMark
}

export class FreeToneSuffix extends Affix {}
export class FinalToneSuffix extends Affix {}

class ZeroSuffix extends FreeToneSuffix {}
class SuffixZS extends FreeToneSuffix {}
export class SuffixY extends FreeToneSuffix {}
export class SuffixW extends FreeToneSuffix {}

export class SuffixX extends FreeToneSuffix {}

class SuffixP extends FinalToneSuffix {}
class SuffixT extends FinalToneSuffix {}
class SuffixK extends FinalToneSuffix {}
class SuffixH extends FinalToneSuffix {}
class SuffixB extends FinalToneSuffix {}
class SuffixD extends FinalToneSuffix {}
class SuffixG extends FinalToneSuffix {}
class SuffixF extends FinalToneSuffix {}

class FreeToneInterfix extends Affix {}
class CheckedToneInterfix extends Affix {}

class InterfixZS extends FreeToneInterfix {}
class InterfixY extends FreeToneInterfix {}
class InterfixW extends FreeToneInterfix {}
class InterfixSS extends FreeToneInterfix {}
class InterfixXX extends FreeToneInterfix {}
class InterfixXXX extends FreeToneInterfix {}

class InterfixP extends CheckedToneInterfix {}
class InterfixT extends CheckedToneInterfix {}
class InterfixK extends CheckedToneInterfix {}
class InterfixH extends CheckedToneInterfix {}
class InterfixB extends CheckedToneInterfix {}
class InterfixD extends CheckedToneInterfix {}
class InterfixG extends CheckedToneInterfix {}
class InterfixF extends CheckedToneInterfix {}
class InterfixX extends CheckedToneInterfix {}
