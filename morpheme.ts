
import { ToneMark, Siann } from './grapheme';

class ToneMorpheme {
}


class LexicalStem {
    //stem of free tone
    //stem of checked tone
    //stem of neutral tone
    sianns: Array<Siann>
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
class FinalToneInterfix extends Affix {}

class InterfixZS extends FreeToneInterfix {}
class InterfixY extends FreeToneInterfix {}
class InterfixW extends FreeToneInterfix {}
class InterfixSS extends FreeToneInterfix {}
class InterfixXX extends FreeToneInterfix {}
class InterfixXXX extends FreeToneInterfix {}

class InterfixPP extends FinalToneInterfix {}
class InterfixTT extends FinalToneInterfix {}
class InterfixKK extends FinalToneInterfix {}
class InterfixHH extends FinalToneInterfix {}
class InterfixHY extends FinalToneInterfix {}
class InterfixBB extends FinalToneInterfix {}
class InterfixDD extends FinalToneInterfix {}
class InterfixGG extends FinalToneInterfix {}
class InterfixFF extends FinalToneInterfix {}
class InterfixBX extends FinalToneInterfix {}
class InterfixDX extends FinalToneInterfix {}
class InterfixGX extends FinalToneInterfix {}
class InterfixFX extends FinalToneInterfix {}
