import { characters } from '../character'
//import { FreeTonal, CheckedTonal, StopFinal, Final, Medial, Initial, NasalFinal, Nasal, Tonal, 
import { Letters, Sound, PositionalSound, SoundTags, SetOfSounds } from '../grapheme'

//------------------------------------------------------------------------------
//  Morph
//------------------------------------------------------------------------------

export class Morph {}

//------------------------------------------------------------------------------
//  Allomorph
//------------------------------------------------------------------------------

export class Allomorph extends Morph {
    tonal: Tonal = new Tonal()

    getLiteral() {
        if(this.tonal.getLiteral().length == 0) { 
            // return string 'zero' for first tone. member variable characters of graph is still null.
            return LetterTags.zero;
        } else return this.tonal.getLiteral();
    }
}

export class FreeAllomorph extends Allomorph {}

export class CheckedAllomorph extends Allomorph {
    final: Final = new Final()

    getLiteral() {
        if(this.tonal.getLiteral()) {            
            return this.final.getLiteral() + this.tonal.getLiteral()
        }
        return this.final.getLiteral()
    }
}

export class TonalAffix extends Morph {
    tonal: Tonal = new Tonal()
    getLiteral() {
        return this.tonal.getLiteral()
    }
}

class FreeAffix extends TonalAffix {}

class CheckedAffix extends TonalAffix {
    // there is no final for affix
}

//------------------------------------------------------------------------------
//  Alphabet
//------------------------------------------------------------------------------

export enum LetterTags {
    a = 'a',
    e = 'e',
    i = 'i',
    o = 'o',
    u = 'u',
    ur = 'ur',

    c = 'c',
    d = 'd',
    ch = 'ch',
    j = 'j',
    q = 'q',
    s = 's',
    v = 'v',

    m = 'm',
    n = 'n',
    ng = 'ng',

    nn = 'nn',

    sf = 'sf',
    w = 'w',
    xx = 'xx',
    xxx = 'xxx',
    z = 'z',
    zx = 'zx',

    x = 'x',
    y = 'y',

    b = 'b',
    g = 'g',
    l = 'l',

    k = 'k',
    p = 'p',
    t = 't',

    kk = 'kk',
    pp = 'pp',
    tt = 'tt',
    hh = 'hh',
    
    f = 'f',

    h = 'h',

    zero = 'zero',
}

export class LettersOfTonal extends Letters {}

export let lowerLettersOfTonal = new LettersOfTonal(
    [LetterTags.a, LetterTags.e, LetterTags.i, LetterTags.o, LetterTags.u, LetterTags.ur,
    LetterTags.c, LetterTags.d, LetterTags.ch, LetterTags.j, LetterTags.q, LetterTags.s, LetterTags.v,
    LetterTags.m, LetterTags.n, LetterTags.ng,
    LetterTags.nn,
    LetterTags.sf, LetterTags.w, LetterTags.xx, LetterTags.xxx, LetterTags.z, LetterTags.zx,
    LetterTags.x,
    LetterTags.y,
    LetterTags.b, LetterTags.g, LetterTags.l,
    LetterTags.k, LetterTags.p, LetterTags.t,
    LetterTags.kk, LetterTags.pp, LetterTags.tt, LetterTags.hh,
    LetterTags.f,
    LetterTags.h])

export let vowelLettersOfTonal = new LettersOfTonal(['or', 'er', 'ir'])

//------------------------------------------------------------------------------
//  Sound
//------------------------------------------------------------------------------

export class Initial extends Sound {name = SoundTags.initial}
export class Medial extends Sound {name = SoundTags.medial}
export class Final extends Sound {name = SoundTags.final}
export class Nasal extends Sound {name = SoundTags.nasalization}
export class Tonal extends Sound {
    name = SoundTags.tonal
    isEqualToTonal(tonal: Tonal) {
        if(this.getLiteral() === tonal.getLiteral()) {
            return true;
        }
        return false;
    }
}

export class FreeTonal extends Tonal {
    name = SoundTags.freeTonal
}
export class CheckedTonal extends Tonal {
    name = SoundTags.checkedTonal
}

export class StopFinal extends Final {name = SoundTags.stopFinal}
export class NasalFinal extends Final {name = SoundTags.nasalFinal}

class MedialA extends Medial {characters = this.makeCharacters(LetterTags.a)}
class MedialE extends Medial {characters = this.makeCharacters(LetterTags.e)}
class MedialI extends Medial {characters = this.makeCharacters(LetterTags.i)}
class MedialO extends Medial {characters = this.makeCharacters(LetterTags.o)}
class MedialU extends Medial {characters = this.makeCharacters(LetterTags.u)}
class MedialUR extends Medial {characters = this.makeCharacters(LetterTags.ur)}

class MaterLectionisM  extends Medial {characters = this.makeCharacters(LetterTags.m)}
class MaterLectionisN  extends Medial {characters = this.makeCharacters(LetterTags.n)}
class MaterLectionisNG  extends Medial {characters = this.makeCharacters(LetterTags.ng)}

class InitialC extends Initial {characters = this.makeCharacters(LetterTags.c)}
class InitialCH extends Initial {characters = this.makeCharacters(LetterTags.ch)}
class InitialJ extends Initial {characters = this.makeCharacters(LetterTags.j)}
class InitialL extends Initial {characters = this.makeCharacters(LetterTags.l)}
class InitialQ extends Initial {characters = this.makeCharacters(LetterTags.q)}
class InitialS extends Initial {characters = this.makeCharacters(LetterTags.s)}
class InitialV extends Initial {characters = this.makeCharacters(LetterTags.v)}

class InitialH extends Initial {characters = this.makeCharacters(LetterTags.h)}

class InitialP extends Initial {characters = this.makeCharacters(LetterTags.p)}
class InitialT extends Initial {characters = this.makeCharacters(LetterTags.t)}
class InitialK extends Initial {characters = this.makeCharacters(LetterTags.k)}
class InitialB extends Initial {characters = this.makeCharacters(LetterTags.b)}
class InitialD extends Initial {characters = this.makeCharacters(LetterTags.d)}
class InitialG extends Initial {characters = this.makeCharacters(LetterTags.g)}

class InitialM extends Initial {characters = this.makeCharacters(LetterTags.m)}
class InitialN extends Initial {characters = this.makeCharacters(LetterTags.n)}
class InitialNG extends Initial {characters = this.makeCharacters(LetterTags.ng)}

export class ZeroTonal extends Tonal {characters = [];}

export class TonalZ extends FreeTonal {characters = this.makeCharacters(LetterTags.z)}
export class TonalW extends FreeTonal {characters = this.makeCharacters(LetterTags.w)}
export class TonalSF extends FreeTonal {characters = this.makeCharacters(LetterTags.sf)}
export class TonalXX extends FreeTonal {characters = this.makeCharacters(LetterTags.xx)}
export class TonalXXX extends FreeTonal {characters =this.makeCharacters(LetterTags.xxx)}
export class TonalZX extends FreeTonal {characters = this.makeCharacters(LetterTags.zx)}

export class FreeTonalX extends FreeTonal {characters = this.makeCharacters(LetterTags.x)}
export class FreeTonalY extends FreeTonal {characters = this.makeCharacters(LetterTags.y)}

export class CheckedTonalW extends CheckedTonal {characters = this.makeCharacters(LetterTags.w)}
export class TonalF extends CheckedTonal {characters = this.makeCharacters(LetterTags.f)}

export class CheckedTonalX extends CheckedTonal {characters = this.makeCharacters(LetterTags.x)}
export class CheckedTonalY extends CheckedTonal {characters = this.makeCharacters(LetterTags.y)}

export class FinalP extends StopFinal {characters = this.makeCharacters(LetterTags.p)}
export class FinalT extends StopFinal {characters = this.makeCharacters(LetterTags.t)}
export class FinalK extends StopFinal {characters = this.makeCharacters(LetterTags.k)}
export class FinalH extends StopFinal {characters = this.makeCharacters(LetterTags.h)}

export class FinalPP extends StopFinal {characters = this.makeCharacters(LetterTags.pp)}
export class FinalTT extends StopFinal {characters = this.makeCharacters(LetterTags.tt)}
export class FinalKK extends StopFinal {characters = this.makeCharacters(LetterTags.kk)}
export class FinalHH extends StopFinal {characters = this.makeCharacters(LetterTags.hh)}

class FinalM extends NasalFinal {characters = this.makeCharacters(LetterTags.m)}
class FinalN extends NasalFinal {characters = this.makeCharacters(LetterTags.n)}
class FinalNG extends NasalFinal {characters = this.makeCharacters(LetterTags.ng)}

class NasalizationNN extends Nasal {characters = this.makeCharacters(LetterTags.nn)}

export class SetOfNasalizations extends SetOfSounds {
    nasals: Array<Nasal> = new Array()
    constructor() {
        super()
        this.nasals.push(new NasalizationNN())
    }

    toString() {
        return super.toRegexString(this.nasals)
    }
}

export class SetOfNasalFinals extends SetOfSounds {
    nasalFinals: Array<Final> = new Array()
    constructor() {
        super()
        this.nasalFinals.push(new FinalM())
        this.nasalFinals.push(new FinalN())
        this.nasalFinals.push(new FinalNG())
    }

    toString() {
        return super.toRegexString(this.nasalFinals)
    }
}

export class SetOfNeutralFinals extends SetOfSounds {
    neutralFinals: Array<Final> = new Array()
    constructor() {
        super()
        this.neutralFinals.push(new FinalH())
    }

    toString() {
        return super.toRegexString(this.neutralFinals)
    }
}

export class SetOfMedials extends SetOfSounds {
    medials: Array<Medial> = new Array()
    constructor() {
        super()
        this.medials.push(new MedialA())
        this.medials.push(new MedialE())
        this.medials.push(new MedialI())
        this.medials.push(new MedialO())
        this.medials.push(new MedialU())
        this.medials.push(new MedialUR())
    }

    toString() {
        return super.toRegexString(this.medials)
    }
}

export class SetOfMaterLectionis extends SetOfSounds {
    materLectionis: Array<Medial> = new Array()
    constructor() {
        super()
        this.materLectionis.push(new MaterLectionisM())
        this.materLectionis.push(new MaterLectionisN())
        this.materLectionis.push(new MaterLectionisNG())
    }

    toString() {
        return super.toRegexString(this.materLectionis)
    }
}

export class SetOfInitials extends SetOfSounds {
    initials: Array<Initial> = new Array()
    constructor() {
        super()
        this.initials.push(new InitialP())
        this.initials.push(new InitialT())
        this.initials.push(new InitialK())
        this.initials.push(new InitialB())
        this.initials.push(new InitialD())
        this.initials.push(new InitialG())

        this.initials.push(new InitialH())

        this.initials.push(new InitialC())
        this.initials.push(new InitialCH())
        this.initials.push(new InitialJ())
        this.initials.push(new InitialL())
        this.initials.push(new InitialQ())
        this.initials.push(new InitialS())
        this.initials.push(new InitialV())

        this.initials.push(new InitialM())
        this.initials.push(new InitialN())
        this.initials.push(new InitialNG())
    }

    toString() {
        return super.toRegexString(this.initials)
    }
}

export class SetOfFreeTonals extends SetOfSounds {
    freeTonals: Array<FreeTonal> = new Array()
    constructor() {
        super()
        this.freeTonals.push(new TonalZ())
        this.freeTonals.push(new TonalW())
        this.freeTonals.push(new TonalXX())
        this.freeTonals.push(new TonalXXX())
        this.freeTonals.push(new TonalSF())
        this.freeTonals.push(new TonalZX())

        this.freeTonals.push(new FreeTonalX())
        this.freeTonals.push(new FreeTonalY())
    }

    toString() {
        return super.toRegexString(this.freeTonals)
    }
}

export class SetOfFinals extends SetOfSounds {
    finals: Array<Final> = new Array()
    constructor() {
        super()
        this.finals.push(new FinalP())
        this.finals.push(new FinalT())
        this.finals.push(new FinalK())
        this.finals.push(new FinalH())
        this.finals.push(new FinalPP())
        this.finals.push(new FinalTT())
        this.finals.push(new FinalKK())
        this.finals.push(new FinalHH())

        this.finals.push(new FinalM())
        this.finals.push(new FinalN())
        this.finals.push(new FinalNG())
    }

    toString() {
        return super.toRegexString(this.finals)
    }
}

export class SetOfStopFinals extends SetOfSounds {
    stopFinals: Array<Final> = new Array()
    constructor() {
        super()
        this.stopFinals.push(new FinalP())
        this.stopFinals.push(new FinalT())
        this.stopFinals.push(new FinalK())
        this.stopFinals.push(new FinalH())
        this.stopFinals.push(new FinalPP())
        this.stopFinals.push(new FinalTT())
        this.stopFinals.push(new FinalKK())
        this.stopFinals.push(new FinalHH())
    }

    toString() {
        return super.toRegexString(this.stopFinals)
    }
}

//------------------------------------------------------------------------------
//  Positional Sound for Lexical Root
//------------------------------------------------------------------------------

class PSA extends PositionalSound {
    name = LetterTags.a//'a'
    map = new Map<string, Sound>().set(SoundTags.medial, new MedialA())
}

class PSB extends PositionalSound {
    name = LetterTags.b
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialB())
}

class PSC extends PositionalSound {
    name = LetterTags.c
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialC())
}

class PSCH extends PositionalSound {
    name = LetterTags.ch
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialCH())
}

class PSD extends PositionalSound {
    name = LetterTags.d
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialD())
}

class PSE extends PositionalSound {
    name = LetterTags.e
    map = new Map<string, Sound>().set(SoundTags.medial, new MedialE())
}

class PSF extends PositionalSound {
    name = LetterTags.f
    map = new Map<string, Sound>().set(SoundTags.checkedTonal, new TonalF())
}

class PSG extends PositionalSound {
    name = LetterTags.g
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialG())
}

class PSHH extends PositionalSound {
    name = LetterTags.hh
    map = new Map<string, Sound>().set(SoundTags.stopFinal, new FinalHH())
}

class PSI extends PositionalSound {
    name = LetterTags.i
    map = new Map<string, Sound>().set(SoundTags.medial, new MedialI())
}

class PSJ extends PositionalSound {
    name = LetterTags.j
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialJ())
}

class PSK extends PositionalSound {
    name = LetterTags.k
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialK()).set(SoundTags.stopFinal, new FinalK())
    initial: Initial = new InitialK()
}

class PSKK extends PositionalSound {
    name = LetterTags.kk
    map = new Map<string, Sound>().set(SoundTags.stopFinal, new FinalKK())
}

class PSL extends PositionalSound {
    name = LetterTags.l
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialL())
}

class PSM extends PositionalSound {
    name = LetterTags.m
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialM()).set(SoundTags.medial, new MaterLectionisM()).set(SoundTags.nasalFinal, new FinalM())
}

class PSN extends PositionalSound {
    name = LetterTags.n
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialN()).set(SoundTags.medial, new MaterLectionisN()).set(SoundTags.nasalFinal, new FinalN())
}

class PSNN extends PositionalSound {
    name = LetterTags.nn
    map = new Map<string, Sound>().set(SoundTags.nasalization, new NasalizationNN())
}

class PSNG extends PositionalSound {
    name = LetterTags.ng
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialNG()).set(SoundTags.medial, new MaterLectionisNG()).set(SoundTags.nasalFinal, new FinalNG())
}

class PSO extends PositionalSound {
    name = LetterTags.o
    map = new Map<string, Sound>().set(SoundTags.medial, new MedialO())
}

class PSP extends PositionalSound {
    name = LetterTags.p
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialP()).set(SoundTags.stopFinal, new FinalP())
}

class PSPP extends PositionalSound {
    name = LetterTags.pp
    map = new Map<string, Sound>().set(SoundTags.stopFinal, new FinalPP())
}

class PSQ extends PositionalSound {
    name = LetterTags.q
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialQ())
}

class PSH extends PositionalSound {
    name = LetterTags.h
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialH()).set(SoundTags.stopFinal, new FinalH())
    initial: Initial = new InitialH()
}

class PSS extends PositionalSound {
    name = LetterTags.s
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialS())
}

class PSSF extends PositionalSound {
    name = LetterTags.sf
    map = new Map<string, Sound>().set(SoundTags.freeTonal, new TonalSF())
}

class PST extends PositionalSound {
    name = LetterTags.t
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialT()).set(SoundTags.stopFinal, new FinalT())
    initial: Initial = new InitialT()
}

class PSTT extends PositionalSound {
    name = LetterTags.tt
    map = new Map<string, Sound>().set(SoundTags.stopFinal, new FinalTT())
}

class PSU extends PositionalSound {
    name = LetterTags.u
    map = new Map<string, Sound>().set(SoundTags.medial, new MedialU())
}

class PSUR extends PositionalSound {
    name = LetterTags.ur
    map = new Map<string, Sound>().set(SoundTags.medial, new MedialUR())
}

class PSV extends PositionalSound {
    name = LetterTags.v
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialV())
}

class PSW extends PositionalSound {
    name = LetterTags.w
    map = new Map<string, Sound>().set(SoundTags.freeTonal, new TonalW()).set(SoundTags.checkedTonal, new CheckedTonalW())
}

class PSX extends PositionalSound {
    name = LetterTags.x
    map = new Map<string, Sound>().set(SoundTags.freeTonal, new FreeTonalX()).set(SoundTags.checkedTonal, new CheckedTonalX())
}

class PSXX extends PositionalSound {
    name = LetterTags.xx
    map = new Map<string, Sound>().set(SoundTags.freeTonal, new TonalXX())
}

class PSXXX extends PositionalSound {
    name = LetterTags.xxx
    map = new Map<string, Sound>().set(SoundTags.freeTonal, new TonalXXX())
}

class PSY extends PositionalSound {
    name = LetterTags.y
    map = new Map<string, Sound>().set(SoundTags.freeTonal, new FreeTonalY()).set(SoundTags.checkedTonal, new CheckedTonalY())
    freeTonal: FreeTonal = new FreeTonalY()
}

class PSZ extends PositionalSound {
    name = LetterTags.z
    map = new Map<string, Sound>().set(SoundTags.freeTonal, new TonalZ())
}

class PSZX extends PositionalSound {
    name = LetterTags.zx
    map = new Map<string, Sound>().set(SoundTags.freeTonal, new TonalZX())
}

class PSZero extends PositionalSound {
    name = LetterTags.zero
    map = new Map<string, Sound>().set(SoundTags.freeTonal, new ZeroTonal())
}

//------------------------------------------------------------------------------
//  Combining Rule
//------------------------------------------------------------------------------


class CombiningRules {
    // return value of PositionalSound.get is of type Sound
    private o: Map<string, { [key: string]: Sound }> = new Map()

    constructor() {
        this.o
            .set(LetterTags.zero, { z: new PSZ().get(SoundTags.freeTonal) })
            .set(LetterTags.y, { zero: new PSZero().get(SoundTags.freeTonal), sf: new PSSF().get(SoundTags.freeTonal) })
            .set(LetterTags.w, { y: new PSY().get(SoundTags.freeTonal) })
            .set(LetterTags.x, { z: new PSZ().get(SoundTags.freeTonal), w: new PSW().get(SoundTags.freeTonal) })
            .set(LetterTags.z, { w: new PSW().get(SoundTags.freeTonal) })
            .set(LetterTags.p, { f: new PSF().get(SoundTags.checkedTonal) })
            .set(LetterTags.t, { f: new PSF().get(SoundTags.checkedTonal) })
            .set(LetterTags.k, { f: new PSF().get(SoundTags.checkedTonal) })
            .set(LetterTags.h, { f: new PSF().get(SoundTags.checkedTonal), y: new PSY().get(SoundTags.checkedTonal) })
            .set(LetterTags.pp, { w: new PSW().get(SoundTags.checkedTonal), x: new PSX().get(SoundTags.checkedTonal)})
            .set(LetterTags.tt, { w: new PSW().get(SoundTags.checkedTonal), x: new PSX().get(SoundTags.checkedTonal)})
            .set(LetterTags.kk, { w: new PSW().get(SoundTags.checkedTonal), x: new PSX().get(SoundTags.checkedTonal)})
            .set(LetterTags.hh, { w: new PSW().get(SoundTags.checkedTonal), x: new PSX().get(SoundTags.checkedTonal)})
    
    }

    get(key: string) {
        let value = this.o.get(key)
        if(value) {
            return value
        }
        return {}
    }
}

export const combiningRules = new CombiningRules()

class LetterClasses {
    private o: Map<string, PositionalSound> = new Map()

    constructor() {
        this.o
            .set(LetterTags.a, new PSA())
            .set(LetterTags.b, new PSB())
            .set(LetterTags.c, new PSC())
            .set(LetterTags.ch, new PSCH())
            .set(LetterTags.d, new PSD())
            .set(LetterTags.e, new PSE())
            .set(LetterTags.f, new PSF())
            .set(LetterTags.g, new PSG())
            .set(LetterTags.h, new PSH())
            .set(LetterTags.hh, new PSHH())
            .set(LetterTags.i, new PSI())
            .set(LetterTags.j, new PSJ())
            .set(LetterTags.k, new PSK())
            .set(LetterTags.kk, new PSKK())
            .set(LetterTags.l, new PSL())
            .set(LetterTags.m, new PSM())
            .set(LetterTags.n, new PSN())
            .set(LetterTags.nn, new PSNN())
            .set(LetterTags.ng, new PSNG())
            .set(LetterTags.o, new PSO())
            .set(LetterTags.p, new PSP())
            .set(LetterTags.pp, new PSPP())
            .set(LetterTags.q, new PSQ())
            .set(LetterTags.s, new PSS())
            .set(LetterTags.sf, new PSSF())
            .set(LetterTags.t, new PST())
            .set(LetterTags.tt, new PSTT())
            .set(LetterTags.u, new PSU())
            .set(LetterTags.ur, new PSUR())
            .set(LetterTags.v, new PSV())
            .set(LetterTags.w, new PSW())
            .set(LetterTags.x, new PSX())
            .set(LetterTags.xx, new PSXX())
            .set(LetterTags.xxx, new PSXXX())
            .set(LetterTags.y, new PSY())
            .set(LetterTags.z, new PSZ())
            .set(LetterTags.zx, new PSZX())
    }

    get(key: string) {
        let value = this.o.get(key)
        if(value) {
            return value
        }
        return new PositionalSound()
    }
}

export const letterClasses = new LetterClasses()

//------------------------------------------------------------------------------
//  Allomorph
//------------------------------------------------------------------------------

export class ZeroAllomorph extends FreeAllomorph {
    tonal = new ZeroTonal()
}

class AllomorphSF extends FreeAllomorph {
    tonal = new TonalSF()
}

class AllomorphZ extends FreeAllomorph {
    tonal = new TonalZ()
}

export class AllomorphY extends FreeAllomorph {
    tonal = new FreeTonalY()
}

export class AllomorphW extends FreeAllomorph {
    tonal = new TonalW()
}

export class AllomorphX extends FreeAllomorph {
    tonal = new FreeTonalX()
}

class AllomorphXX extends FreeAllomorph {
    tonal = new TonalXX()
}

class AllomorphXXX extends FreeAllomorph {
    tonal = new TonalXXX()
}

class AllomorphZX extends FreeAllomorph {
    tonal = new TonalZX()
}

class FreeAllomorphs {
    private o: Map<string, Allomorph> = new Map()

    constructor() {
        this.o
            .set(LetterTags.sf, new AllomorphSF())
            .set(LetterTags.w, new AllomorphW())
            .set(LetterTags.xx, new AllomorphXX())
            .set(LetterTags.xxx, new AllomorphXXX())
            .set(LetterTags.z, new AllomorphZ())
            .set(LetterTags.zx, new AllomorphZX())
            .set(LetterTags.y, new AllomorphY())
            .set(LetterTags.x, new AllomorphX())    
    }

    get(key: string) {
        let value = this.o.get(key)
        if(value) {
            return value
        }
        return new Allomorph()
    }

    has(key: string) {
        return this.o.has(key)
    }
}

export const freeAllomorphs = new FreeAllomorphs()

class AllomorphP extends CheckedAllomorph {
    final = new FinalP()
}

class AllomorphT extends CheckedAllomorph {
    final = new FinalT()
}

class AllomorphK extends CheckedAllomorph {
    final = new FinalK()
}

class AllomorphH extends CheckedAllomorph {
    final = new FinalH()
}

class AllomorphPP extends CheckedAllomorph {
    final = new FinalPP()
}

class AllomorphTT extends CheckedAllomorph {
    final = new FinalTT()
}

class AllomorphKK extends CheckedAllomorph {
    final = new FinalKK()
}

class AllomorphHH extends CheckedAllomorph {
    final = new FinalHH()
}

class AllomorphPF extends CheckedAllomorph {
    final = new FinalP()
    tonal = new TonalF()
}

class AllomorphTF extends CheckedAllomorph {
    final = new FinalT()
    tonal = new TonalF()
}

class AllomorphKF extends CheckedAllomorph {
    final = new FinalK()
    tonal = new TonalF()
}

class AllomorphHF extends CheckedAllomorph {
    final = new FinalH()
    tonal = new TonalF()
}

export class AllomorphHY extends CheckedAllomorph {
    final = new FinalH()
    tonal = new CheckedTonalY()
}

class AllomorphPPW extends CheckedAllomorph {
    final = new FinalPP()
    tonal = new TonalW()
}

class AllomorphTTW extends CheckedAllomorph {
    final = new FinalTT()
    tonal = new TonalW()
}

class AllomorphKKW extends CheckedAllomorph {
    final = new FinalKK()
    tonal = new TonalW()
}

class AllomorphHHW extends CheckedAllomorph {
    final = new FinalHH()
    tonal = new TonalW()
}

class AllomorphPPX extends CheckedAllomorph {
    final = new FinalPP()
    tonal = new CheckedTonalX()
}

class AllomorphTTX extends CheckedAllomorph {
    final = new FinalTT()
    tonal = new CheckedTonalX()
}

class AllomorphKKX extends CheckedAllomorph {
    final = new FinalKK()
    tonal = new CheckedTonalX()
}

class AllomorphHHX extends CheckedAllomorph {
    final = new FinalHH()
    tonal = new CheckedTonalX()
}

class CheckedAllomorphs {
    private o: Map<string, Allomorph> = new Map()

    constructor() {
        this.o
            .set(new PSP().get(SoundTags.stopFinal).getLiteral(), new AllomorphP())
            .set(new PST().get(SoundTags.stopFinal).getLiteral(), new AllomorphT())
            .set(new PSK().get(SoundTags.stopFinal).getLiteral(), new AllomorphK())
            .set(new PSH().get(SoundTags.stopFinal).getLiteral(), new AllomorphH())
            .set(new PSPP().get(SoundTags.stopFinal).getLiteral(), new AllomorphPP())
            .set(new PSTT().get(SoundTags.stopFinal).getLiteral(), new AllomorphTT())
            .set(new PSKK().get(SoundTags.stopFinal).getLiteral(), new AllomorphKK())
            .set(new PSHH().get(SoundTags.stopFinal).getLiteral(), new AllomorphHH())
            .set(new PSP().get(SoundTags.stopFinal).getLiteral() + new PSF().get(SoundTags.checkedTonal).getLiteral(), new AllomorphPF())
            .set(new PST().get(SoundTags.stopFinal).getLiteral() + new PSF().get(SoundTags.checkedTonal).getLiteral(), new AllomorphTF())
            .set(new PSK().get(SoundTags.stopFinal).getLiteral() + new PSF().get(SoundTags.checkedTonal).getLiteral(), new AllomorphKF())
            .set(new PSH().get(SoundTags.stopFinal).getLiteral() + new PSF().get(SoundTags.checkedTonal).getLiteral(), new AllomorphHF())
            .set(new PSPP().get(SoundTags.stopFinal).getLiteral() + new PSW().get(SoundTags.checkedTonal).getLiteral(), new AllomorphPPW())
            .set(new PSTT().get(SoundTags.stopFinal).getLiteral() + new PSW().get(SoundTags.checkedTonal).getLiteral(), new AllomorphTTW())
            .set(new PSKK().get(SoundTags.stopFinal).getLiteral() + new PSW().get(SoundTags.checkedTonal).getLiteral(), new AllomorphKKW())
            .set(new PSHH().get(SoundTags.stopFinal).getLiteral() + new PSW().get(SoundTags.checkedTonal).getLiteral(), new AllomorphHHW())
            .set(new PSH().get(SoundTags.stopFinal).getLiteral() + new PSY().get(SoundTags.checkedTonal).getLiteral(), new AllomorphHY())
            .set(new PSPP().get(SoundTags.stopFinal).getLiteral() + new PSX().get(SoundTags.checkedTonal).getLiteral(), new AllomorphPPX())
            .set(new PSTT().get(SoundTags.stopFinal).getLiteral() + new PSX().get(SoundTags.checkedTonal).getLiteral(), new AllomorphTTX())
            .set(new PSKK().get(SoundTags.stopFinal).getLiteral() + new PSX().get(SoundTags.checkedTonal).getLiteral(), new AllomorphKKX())
            .set(new PSHH().get(SoundTags.stopFinal).getLiteral() + new PSX().get(SoundTags.checkedTonal).getLiteral(), new AllomorphHHX())    
    }

    get(key: string) {
        let value = this.o.get(key)
        if(value) {
            return value
        }
        return new Allomorph()
    }

    keys() {
        return this.o.keys()
    }
}

export const checkedAllomorphs = new CheckedAllomorphs()

class UncombinedFreeAllomorphs {
    private o: Map<string, Allomorph> = new Map()

    constructor() {
        this.o
        .set(new PSW().get(SoundTags.freeTonal).getLiteral(), new AllomorphW())
        .set(new PSZ().get(SoundTags.freeTonal).getLiteral(), new AllomorphZ())
        .set(new PSX().get(SoundTags.freeTonal).getLiteral(), new AllomorphX())
        .set(new PSY().get(SoundTags.freeTonal).getLiteral(), new AllomorphY())    
    }

    has(key: string) {
        return this.o.has(key)
    }

    get(key: string) {
        let value = this.o.get(key)
        if(value) {
            return value
        }
        return new Allomorph()
    }
}

export const uncombinedFreeAllomorphs = new UncombinedFreeAllomorphs()

class UncombinedCheckedAllomorphs {
    private o: Map<string, Allomorph> = new Map()

    constructor() {
        this.o
            .set(new PSP().get(SoundTags.stopFinal).getLiteral(), new AllomorphP())
            .set(new PST().get(SoundTags.stopFinal).getLiteral(), new AllomorphT())
            .set(new PSK().get(SoundTags.stopFinal).getLiteral(), new AllomorphK())
            .set(new PSH().get(SoundTags.stopFinal).getLiteral(), new AllomorphH())
            .set(new PSPP().get(SoundTags.stopFinal).getLiteral(), new AllomorphPP())
            .set(new PSTT().get(SoundTags.stopFinal).getLiteral(), new AllomorphTT())
            .set(new PSKK().get(SoundTags.stopFinal).getLiteral(), new AllomorphKK())
            .set(new PSHH().get(SoundTags.stopFinal).getLiteral(), new AllomorphHH())    
    }

    get(key: string) {
        let value = this.o.get(key)
        if(value) {
            return value
        }
        return new Allomorph()
    }

    has(key: string) {
        return this.o.has(key)
    }
}

export const uncombinedCheckedAllomorphs = new UncombinedCheckedAllomorphs()

class FreeAllomorphUncombiningRules {
    private o: Map<string, Tonal[]> = new Map()

    constructor() {
        this.o
            .set(new PSSF().get(SoundTags.freeTonal).getLiteral(), [new FreeTonalY()])
            .set(new PSW().get(SoundTags.freeTonal).getLiteral(), [new TonalZ(), new FreeTonalX()])
            .set(new PSXX().get(SoundTags.freeTonal).getLiteral(), [new TonalZ(), new TonalSF, new FreeTonalX()])
            .set(new PSXXX().get(SoundTags.freeTonal).getLiteral(), [new TonalZ(), new TonalSF(), new FreeTonalX()])
            .set(new PSZ().get(SoundTags.freeTonal).getLiteral(), [new FreeTonalX(), new TonalSF(), new ZeroTonal()])
            .set(new PSZX().get(SoundTags.freeTonal).getLiteral(), [])
            .set(new PSX().get(SoundTags.freeTonal).getLiteral(), [])
            .set(new PSY().get(SoundTags.freeTonal).getLiteral(), [new TonalW()])
            .set(LetterTags.zero, [new FreeTonalY()])
    }

    get(key: string) {
        let value = this.o.get(key)
        if(value) {
            return value
        }
        return []
    }
}

export const freeAllomorphUncombiningRules = new FreeAllomorphUncombiningRules()
