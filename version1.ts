
import { Sound } from './grapheme'
import { characters } from './character'
import { list_of_lexical_roots } from './lexicalroots1'

//------------------------------------------------------------------------------
//  Sound
//------------------------------------------------------------------------------

export class Initial extends Sound {}
export class Medial extends Sound {}
export class Final extends Sound {}
export class ToneMark extends Sound {
    isEqualToToneMark(toneMark: ToneMark) {
        if(this.getLiteral() === toneMark.getLiteral()) {
            return true;
        }
        return false;
    }
}

export class FreeToneMark extends ToneMark {}
export class CheckedToneMark extends ToneMark {}

class StopFinal extends Final {}
class NasalFinal extends Final {}

class MedialA extends Medial {characters = [characters['a']]}
class MedialE extends Medial {characters = [characters['e']]}
class MedialI extends Medial {characters = [characters['i']]}
class MedialO extends Medial {characters = [characters['o']]}
class MedialU extends Medial {characters = [characters['u']]}
class MedialUR extends Medial {characters = [characters['u'], characters['r']]}

class InitialC extends Initial {characters = [characters['c']]}
class InitialJ extends Initial {characters = [characters['j']]}
class InitialL extends Initial {characters = [characters['l']]}
class InitialQ extends Initial {characters = [characters['q']]}
class InitialS extends Initial {characters = [characters['s']]}
class InitialV extends Initial {characters = [characters['v']]}
class InitialZ extends Initial {characters = [characters['z']]}

class InitialP extends Initial {characters = [characters['p']]}
class InitialT extends Initial {characters = [characters['t']]}
class InitialK extends Initial {characters = [characters['k']]}
class InitialB extends Initial {characters = [characters['b']]}
class InitialD extends Initial {characters = [characters['d']]}
class InitialG extends Initial {characters = [characters['g']]}

class InitialM {}
class InitialN {}
class InitialNG {}

class InitialH extends Initial {characters = [characters['h']]}

export class ZeroToneMark extends FreeToneMark {characters = null;}

export class ToneMarkZS extends FreeToneMark {characters = [characters['z'], characters['s']]}
export class ToneMarkW extends FreeToneMark {characters = [characters['w']]}
export class ToneMarkSS extends FreeToneMark {characters = [characters['s'], characters['s']]}
export class ToneMarkXX extends FreeToneMark {characters = [characters['x'], characters['x']]}
export class ToneMarkXXX extends FreeToneMark {characters = [characters['x'], characters['x'], characters['x']]}
export class ToneMarkZZS extends FreeToneMark {characters = [characters['z'], characters['z'], characters['s']]}

export class FreeToneMarkX extends FreeToneMark {characters = [characters['x']]}
export class FreeToneMarkY extends FreeToneMark {characters = [characters['y']]}

export class ToneMarkP extends CheckedToneMark {characters = [characters['p']]}
export class ToneMarkT extends CheckedToneMark {characters = [characters['t']]}
export class ToneMarkK extends CheckedToneMark {characters = [characters['k']]}
export class ToneMarkH extends CheckedToneMark {characters = [characters['h']]}
export class ToneMarkB extends CheckedToneMark {characters = [characters['b']]}
export class ToneMarkD extends CheckedToneMark {characters = [characters['d']]}
export class ToneMarkG extends CheckedToneMark {characters = [characters['g']]}
export class ToneMarkF extends CheckedToneMark {characters = [characters['f']]}

export class CheckedToneMarkX extends CheckedToneMark {characters = [characters['x']]}
export class CheckedToneMarkY extends CheckedToneMark {characters = [characters['y']]}

export class FinalP extends Final {characters = [characters['p']]}
export class FinalT extends Final {characters = [characters['t']]}
export class FinalK extends Final {characters = [characters['k']]}
export class FinalH extends Final {characters = [characters['h']]}
export class FinalB extends Final {characters = [characters['b']]}
export class FinalD extends Final {characters = [characters['d']]}
export class FinalG extends Final {characters = [characters['g']]}
export class FinalF extends Final {characters = [characters['f']]}

class FinalM {}
class FinalN {}
class FinalNG {}
class FinalNN {}

//------------------------------------------------------------------------------
//  Lexical Root using Positional Sound
//------------------------------------------------------------------------------

interface PositionalSound {
    initial: Initial
    medial: Medial
    final: Final
    freeToneMark: FreeToneMark
    checkedToneMark: CheckedToneMark
}

type PartialPositionalSound = Partial<PositionalSound>

class PSF implements PartialPositionalSound {
    static final: Final = new FinalF()
    static checkedToneMark: CheckedToneMark = new ToneMarkH()
}

class PSH implements PartialPositionalSound {
    static initial: Initial = new InitialH()
    static final: Final = new FinalH()
    static ToneMark: ToneMark = new ToneMarkH()
}

class PositionalSoundP implements PartialPositionalSound {
    initial: Initial
    final: Final
    toneMark: ToneMark
}

class PositionalSoundS implements PartialPositionalSound {
    initial: Initial
}

class PositionalSoundM implements PartialPositionalSound {
    initial: Initial
    final: Final
}

class PositionalSoundNN implements PartialPositionalSound {
    final: Final
}

class PSA implements PartialPositionalSound {
    static medial: Medial = new MedialA()
}

class PositionalSoundI implements PartialPositionalSound {
    medial: Medial
}

class PositionalSoundX implements PartialPositionalSound {
    freeToneMark: FreeToneMarkX
    checkedToneMark: CheckedToneMarkX
}

class PSY implements PartialPositionalSound {
    static freeToneMark: FreeToneMarkY = new FreeToneMarkY()
    static checkedToneMark: CheckedToneMarkY = new CheckedToneMarkY()
}

class PSZS implements PartialPositionalSound {
    static freeToneMark: ToneMarkZS = new ToneMarkZS()
}

class PositionalSoundZero implements PartialPositionalSound {
    freeToneMark: ZeroToneMark
}

class LexicalRoot {
    sounds: Array<Sound> = null

    constructor(ss: Array<Sound>) {
        this.sounds = new Array()
        for(let k in ss) {
            this.sounds.push(ss[k])
        }
    }
}

class LexicalRootSet {
    set =  new Array(
        [PSA.medial],
        [PSA.medial, PSY.freeToneMark],
        [PSA.medial, PSZS.freeToneMark],
        [PSA.medial, PSH.final],
        [PSA.medial, PSF.final],
    )

    toString() {
        for(let k in this.set) {
            for(let i in this.set[k]) {
                console.log(this.set[k][i].getLiteral())
            }
        }
    }
}

export class LexicalRootGenerator {
    generate() {
        for(let i in list_of_lexical_roots) {
            console.log(list_of_lexical_roots[i])
        }
    }
}