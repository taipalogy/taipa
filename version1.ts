
import { Medial, Initial, FreeTonal, CheckedTonal, StopFinal, NasalFinal, Nasal, Final, Tonal,
    SetOfSounds,
    PartialPositionalSound,
    Allomorph,
    FreeAllomorph,
    CheckedAllomorph,
    } from './system'
import { characters } from './character'


//------------------------------------------------------------------------------
//  Sound
//------------------------------------------------------------------------------

class MedialA extends Medial {characters = [characters.get('a')]}
class MedialE extends Medial {characters = [characters.get('e')]}
class MedialI extends Medial {characters = [characters.get('i')]}
class MedialO extends Medial {characters = [characters.get('o')]}
class MedialU extends Medial {characters = [characters.get('u')]}
class MedialUR extends Medial {characters = [characters.get('u'), characters.get('r')]}

class MaterLectionisM  extends Medial {characters = [characters.get('m')]}
class MaterLectionisN  extends Medial {characters = [characters.get('n')]}
class MaterLectionisNG  extends Medial {characters = [characters.get('n'), characters.get('g')]}

class InitialC extends Initial {characters = [characters.get('c')]}
class InitialJ extends Initial {characters = [characters.get('j')]}
class InitialL extends Initial {characters = [characters.get('l')]}
class InitialQ extends Initial {characters = [characters.get('q')]}
class InitialS extends Initial {characters = [characters.get('s')]}
class InitialV extends Initial {characters = [characters.get('v')]}
class InitialZ extends Initial {characters = [characters.get('z')]}

class InitialH extends Initial {characters = [characters.get('h')]}

class InitialP extends Initial {characters = [characters.get('p')]}
class InitialT extends Initial {characters = [characters.get('t')]}
class InitialK extends Initial {characters = [characters.get('k')]}
class InitialB extends Initial {characters = [characters.get('b')]}
class InitialD extends Initial {characters = [characters.get('d')]}
class InitialG extends Initial {characters = [characters.get('g')]}

class InitialM extends Initial {characters = [characters.get('m')]}
class InitialN extends Initial {characters = [characters.get('n')]}
class InitialNG extends Initial {characters = [characters.get('n'), characters.get('g')]}

export class ZeroTonal extends FreeTonal {characters = null;}

export class TonalZS extends FreeTonal {characters = [characters.get('z'), characters.get('s')]}
export class TonalW extends FreeTonal {characters = [characters.get('w')]}
export class TonalSS extends FreeTonal {characters = [characters.get('s'), characters.get('s')]}
export class TonalXX extends FreeTonal {characters = [characters.get('x'), characters.get('x')]}
export class TonalXXX extends FreeTonal {characters = [characters.get('x'), characters.get('x'), characters.get('x')]}
export class TonalZZS extends FreeTonal {characters = [characters.get('z'), characters.get('z'), characters.get('s')]}

export class FreeTonalX extends FreeTonal {characters = [characters.get('x')]}
export class FreeTonalY extends FreeTonal {characters = [characters.get('y')]}

export class TonalP extends CheckedTonal {characters = [characters.get('p')]}
export class TonalT extends CheckedTonal {characters = [characters.get('t')]}
export class TonalK extends CheckedTonal {characters = [characters.get('k')]}
export class TonalH extends CheckedTonal {characters = [characters.get('h')]}
export class TonalB extends CheckedTonal {characters = [characters.get('b')]}
export class TonalD extends CheckedTonal {characters = [characters.get('d')]}
export class TonalG extends CheckedTonal {characters = [characters.get('g')]}
export class TonalF extends CheckedTonal {characters = [characters.get('f')]}

export class CheckedTonalX extends CheckedTonal {characters = [characters.get('x')]}
export class CheckedTonalY extends CheckedTonal {characters = [characters.get('y')]}

export class FinalP extends StopFinal {characters = [characters.get('p')]}
export class FinalT extends StopFinal {characters = [characters.get('t')]}
export class FinalK extends StopFinal {characters = [characters.get('k')]}
export class FinalH extends StopFinal {characters = [characters.get('h')]}
export class FinalB extends StopFinal {characters = [characters.get('b')]}
export class FinalD extends StopFinal {characters = [characters.get('d')]}
export class FinalG extends StopFinal {characters = [characters.get('g')]}
export class FinalF extends StopFinal {characters = [characters.get('f')]}

class FinalM extends NasalFinal {characters = [characters.get('m')]}
class FinalN extends NasalFinal {characters = [characters.get('n')]}
class FinalNG extends NasalFinal {characters = [characters.get('n'), characters.get('g')]}

class NasalNN extends Nasal {characters = [characters.get('n'), characters.get('n')]}

export class SetOfNasals extends SetOfSounds {
    nasals: Array<Nasal> = new Array()
    constructor() {
        super()
        this.nasals.push(new NasalNN())
    }

    toString() {
        return super.toString(this.nasals)
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
        return super.toString(this.nasalFinals)
    }
}


export class SetOfNeutralFinals extends SetOfSounds {
    neutralFinals: Array<Final> = new Array()
    constructor() {
        super()
        this.neutralFinals.push(new FinalH())
    }

    toString() {
        return super.toString(this.neutralFinals)
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
        return super.toString(this.medials)
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
        return super.toString(this.materLectionis)
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
        this.initials.push(new InitialJ())
        this.initials.push(new InitialL())
        this.initials.push(new InitialQ())
        this.initials.push(new InitialS())
        this.initials.push(new InitialV())
        this.initials.push(new InitialZ())

        this.initials.push(new InitialM())
        this.initials.push(new InitialN())
        this.initials.push(new InitialNG())
    }

    toString() {
        return super.toString(this.initials)
    }
}

export class SetOfFreeTonals extends SetOfSounds {
    freeTonals: Array<FreeTonal> = new Array()
    constructor() {
        super()
        this.freeTonals.push(new TonalZS())
        this.freeTonals.push(new TonalW())
        this.freeTonals.push(new TonalXX())
        this.freeTonals.push(new TonalXXX())
        this.freeTonals.push(new TonalSS())
        this.freeTonals.push(new TonalZZS())

        this.freeTonals.push(new FreeTonalX())
        this.freeTonals.push(new FreeTonalY())
    }

    toString() {
        return super.toString(this.freeTonals)
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
        this.finals.push(new FinalB())
        this.finals.push(new FinalD())
        this.finals.push(new FinalG())
        this.finals.push(new FinalF())

        this.finals.push(new FinalM())
        this.finals.push(new FinalN())
        this.finals.push(new FinalNG())
    }

    toString() {
        return super.toString(this.finals)
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
        this.stopFinals.push(new FinalB())
        this.stopFinals.push(new FinalD())
        this.stopFinals.push(new FinalG())
        this.stopFinals.push(new FinalF())
    }

    toString() {
        return super.toString(this.stopFinals)
    }
}

//------------------------------------------------------------------------------
//  Positional Sound for Lexical Root
//------------------------------------------------------------------------------

class PSA implements PartialPositionalSound {
    static medial: Medial = new MedialA()
}

class PSB implements PartialPositionalSound {
    static initial: Initial = new InitialB()
    static final: Final = new FinalB()
    static checkedTonal: Tonal = new TonalB()
}

class PSC implements PartialPositionalSound {
    static initial: Initial = new InitialC()
}

class PSD implements PartialPositionalSound {
    static initial: Initial = new InitialD()
    static final: Final = new FinalD()
    static checkedTonal: Tonal = new TonalD()
}

class PSE implements PartialPositionalSound {
    static medial: Medial = new MedialE()
}

class PSF implements PartialPositionalSound {
    static final: Final = new FinalF()
    static checkedTonal: CheckedTonal = new TonalF()
}

class PSG implements PartialPositionalSound {
    static initial: Initial = new InitialG()
    static final: Final = new FinalG()
    static checkedTonal: Tonal = new TonalG()
}

class PSH implements PartialPositionalSound {
    static initial: Initial = new InitialH()
    static final: Final = new FinalH()
    static checkedTonal: CheckedTonal = new TonalH()
}

class PSI implements PartialPositionalSound {
    static medial: Medial = new MedialI()
}

class PSJ implements PartialPositionalSound {
    static initial: Initial = new InitialJ()
}

class PSK implements PartialPositionalSound {
    static initial: Initial = new InitialK()
    static final: Final = new FinalK()
    static checkedTonal: Tonal = new TonalK()
}

class PSL implements PartialPositionalSound {
    static initial: Initial = new InitialL()
}

class PSM implements PartialPositionalSound {
    static initial: Initial = new InitialM()
    static medial: Medial = new MaterLectionisM()
    static final: Final = new FinalM()
}

class PSN implements PartialPositionalSound {
    static initial: Initial = new InitialN()
    static medial: Medial = new MaterLectionisN()
    static final: Final = new FinalN()
}

class PSNN implements PartialPositionalSound {
    static nasal: Nasal = new NasalNN()
}

class PSNG implements PartialPositionalSound {
    static initial: Initial = new InitialNG()
    static medial: Medial = new MaterLectionisNG()
    static final: Final = new FinalNG()
}

class PSO implements PartialPositionalSound {
    static medial: Medial = new MedialO()
}

class PSP implements PartialPositionalSound {
    static initial: Initial = new InitialP()
    static final: Final = new FinalP()
    static checkedTonal: Tonal = new TonalP()
}

class PSQ implements PartialPositionalSound {
    static initial: Initial = new InitialQ()
}

class PSS implements PartialPositionalSound {
    static initial: Initial = new InitialS()
}

class PSSS implements PartialPositionalSound {
    static freeTonal: TonalSS = new TonalSS()
}

class PST implements PartialPositionalSound {
    static initial: Initial = new InitialT()
    static final: Final = new FinalT()
    static checkedTonal: Tonal = new TonalT()
}

class PSU implements PartialPositionalSound {
    static medial: Medial = new MedialU()
}

class PSUR implements PartialPositionalSound {
    static medial: Medial = new MedialUR()
}

class PSV implements PartialPositionalSound {
    static initial: Initial = new InitialV()
}

class PSW implements PartialPositionalSound {
    static freeTonal: TonalW = new TonalW()
}

class PSX implements PartialPositionalSound {
    static freeTonal: FreeTonalX = new FreeTonalX()
    static checkedTonal: CheckedTonalX = new CheckedTonalX()
}

class PSXX implements PartialPositionalSound {
    static freeTonal: TonalXX = new TonalXX()
}

class PSXXX implements PartialPositionalSound {
    static freeTonal: TonalXX = new TonalXXX()
}

class PSY implements PartialPositionalSound {
    static freeTonal: FreeTonalY = new FreeTonalY()
    static checkedTonal: CheckedTonalY = new CheckedTonalY()
}

class PSZ implements PartialPositionalSound {
    static initial: Initial = new InitialZ()
}

class PSZS implements PartialPositionalSound {
    static freeTonal: TonalZS = new TonalZS()
}

class PSZZS implements PartialPositionalSound {
    static freeTonal: TonalZZS = new TonalZZS()
}

class PSZero implements PartialPositionalSound {
    static freeTonal: ZeroTonal = new ZeroTonal()
}


//------------------------------------------------------------------------------
//  Combining Rule
//------------------------------------------------------------------------------

export const combiningRules: Map<string, any> = new Map()
    .set('zero', { zs: PSZS.freeTonal })
    .set('y', { zero: PSZero.freeTonal, ss: PSSS.freeTonal })
    .set('w', { y: PSY.freeTonal })
    .set('x', { zs: PSZS.freeTonal, w: PSW.freeTonal })
    .set('zs', { w: PSW.freeTonal })
    .set('p', { p: PSP.checkedTonal })
    .set('t', { t: PST.checkedTonal })
    .set('k', { k: PSK.checkedTonal })
    .set('h', { h: PSH.checkedTonal, y: PSY.checkedTonal })
    .set('b', { b: PSB.checkedTonal, x: PSX.checkedTonal })
    .set('d', { d: PSD.checkedTonal, x: PSX.checkedTonal })
    .set('g', { g: PSG.checkedTonal, x: PSX.checkedTonal })
    .set('f', { f: PSF.checkedTonal, x: PSX.checkedTonal })

export const letterClass: Map<string, PartialPositionalSound> = new Map()
    .set('a', PSA)
    .set('b', PSB)
    .set('c', PSC)
    .set('d', PSD)
    .set('e', PSE)
    .set('f', PSF)
    .set('g', PSG)
    .set('h', PSH)
    .set('i', PSI)
    .set('j', PSJ)
    .set('k', PSK)
    .set('l', PSL)
    .set('m', PSM)
    .set('n', PSN)
    .set('nn', PSNN)
    .set('ng', PSNG)
    .set('o', PSO)
    .set('p', PSP)
    .set('q', PSQ)
    .set('s', PSS)
    .set('ss', PSSS)
    .set('t', PST)
    .set('u', PSU)
    .set('ur', PSUR)
    .set('v', PSV)
    .set('w', PSW)
    .set('x', PSX)
    .set('xx', PSXX)
    .set('xxx', PSXXX)
    .set('y', PSY)
    .set('z', PSZ)
    .set('zs', PSZS)
    .set('zzs', PSZZS)


//------------------------------------------------------------------------------
//  Allomorph
//------------------------------------------------------------------------------

export class ZeroAllomorph extends FreeAllomorph {
    tonal = new ZeroTonal()
}

class AllomorphSS extends FreeAllomorph {
    tonal = new TonalSS()
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

class AllomorphZZS extends FreeAllomorph {
    tonal = new TonalZZS()
}

export class AllomorphZS extends FreeAllomorph {
    tonal = new TonalZS()
}

export const listOfFreeAllomorphs: Map<string, Allomorph> = new Map()
    .set('ss', new AllomorphSS())
    .set('w', new AllomorphW())
    .set('xx', new AllomorphXX())
    .set('xxx', new AllomorphXXX())
    .set('zzs', new AllomorphZZS())
    .set('zs', new AllomorphZS())
    .set('y', new AllomorphY())
    .set('x', new AllomorphX())

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

class AllomorphB extends CheckedAllomorph {
    final = new FinalB()
}

class AllomorphD extends CheckedAllomorph {
    final = new FinalD()
}

class AllomorphG extends CheckedAllomorph {
    final = new FinalG()
}

class AllomorphF extends CheckedAllomorph {
    final = new FinalF()
}

class AllomorphPP extends CheckedAllomorph {
    final = new FinalP()
    tonal = new TonalP()
}

class AllomorphTT extends CheckedAllomorph {
    final = new FinalT()
    tonal = new TonalT()
}

class AllomorphKK extends CheckedAllomorph {
    final = new FinalK()
    tonal = new TonalK()
}

class AllomorphHH extends CheckedAllomorph {
    final = new FinalH()
    tonal = new TonalH()
}

export class AllomorphHY extends CheckedAllomorph {
    final = new FinalH()
    tonal = new CheckedTonalY()
}

class AllomorphBB extends CheckedAllomorph {
    final = new FinalB()
    tonal = new TonalB()
}

class AllomorphDD extends CheckedAllomorph {
    final = new FinalD()
    tonal = new TonalD()
}

class AllomorphGG extends CheckedAllomorph {
    final = new FinalG()
    tonal = new TonalG()
}

class AllomorphFF extends CheckedAllomorph {
    final = new FinalF()
    tonal = new TonalF()
}

class AllomorphBX extends CheckedAllomorph {
    final = new FinalB()
    tonal = new CheckedTonalX()
}

class AllomorphDX extends CheckedAllomorph {
    final = new FinalD()
    tonal = new CheckedTonalX()
}

class AllomorphGX extends CheckedAllomorph {
    final = new FinalG()
    tonal = new CheckedTonalX()
}

class AllomorphFX extends CheckedAllomorph {
    final = new FinalF()
    tonal = new CheckedTonalX()
}

export const listOfCheckedAllomorphs: Map<string, Allomorph> = new Map()
    .set(PSP.final.getLiteral(), new AllomorphP())
    .set(PST.final.getLiteral(), new AllomorphT())
    .set(PSK.final.getLiteral(), new AllomorphK())
    .set(PSH.final.getLiteral(), new AllomorphH())
    .set(PSB.final.getLiteral(), new AllomorphB())
    .set(PSD.final.getLiteral(), new AllomorphD())
    .set(PSG.final.getLiteral(), new AllomorphG())
    .set(PSF.final.getLiteral(), new AllomorphF())
    .set(PSP.final.getLiteral() + PSP.checkedTonal.getLiteral(), new AllomorphPP())
    .set(PST.final.getLiteral() + PST.checkedTonal.getLiteral(), new AllomorphTT())
    .set(PSK.final.getLiteral() + PSK.checkedTonal.getLiteral(), new AllomorphKK())
    .set(PSH.final.getLiteral() + PSH.checkedTonal.getLiteral(), new AllomorphHH())
    .set(PSB.final.getLiteral() + PSB.checkedTonal.getLiteral(), new AllomorphBB())
    .set(PSD.final.getLiteral() + PSD.checkedTonal.getLiteral(), new AllomorphDD())
    .set(PSG.final.getLiteral() + PSG.checkedTonal.getLiteral(), new AllomorphGG())
    .set(PSF.final.getLiteral() + PSF.checkedTonal.getLiteral(), new AllomorphFF())
    .set(PSH.final.getLiteral() + PSY.checkedTonal.getLiteral(), new AllomorphHY())
    .set(PSB.final.getLiteral() + PSX.checkedTonal.getLiteral(), new AllomorphBX())
    .set(PSD.final.getLiteral() + PSX.checkedTonal.getLiteral(), new AllomorphDX())
    .set(PSG.final.getLiteral() + PSX.checkedTonal.getLiteral(), new AllomorphGX())
    .set(PSF.final.getLiteral() + PSX.checkedTonal.getLiteral(), new AllomorphFX())

export const listOfUncombinedFreeAllomorphs: Map<string, Allomorph> = new Map()
    .set(PSW.freeTonal.getLiteral(), new AllomorphW())
    .set(PSZS.freeTonal.getLiteral(), new AllomorphZS())
    .set(PSX.freeTonal.getLiteral(), new AllomorphX())
    .set(PSY.freeTonal.getLiteral(), new AllomorphY())

export const listOfUncombinedCheckedAllomorphs: Map<string, Allomorph> = new Map()
    .set(PSP.final.getLiteral(), new AllomorphP())
    .set(PST.final.getLiteral(), new AllomorphT())
    .set(PSK.final.getLiteral(), new AllomorphK())
    .set(PSH.final.getLiteral(), new AllomorphH())
    .set(PSB.final.getLiteral(), new AllomorphB())
    .set(PSD.final.getLiteral(), new AllomorphD())
    .set(PSG.final.getLiteral(), new AllomorphG())
    .set(PSF.final.getLiteral(), new AllomorphF())

export const freeAllomorphUncombiningRules: Map<string, Tonal[]> = new Map()
    .set(PSSS.freeTonal.getLiteral(), [new FreeTonalY()])
    .set(PSW.freeTonal.getLiteral(), [new TonalZS(), new FreeTonalX()])
    .set(PSXX.freeTonal.getLiteral(), [new TonalZS(), new TonalSS, new FreeTonalX()])
    .set(PSXXX.freeTonal.getLiteral(), [new TonalZS(), new TonalSS(), new FreeTonalX()])
    .set(PSZS.freeTonal.getLiteral(), [new FreeTonalX(), new TonalSS(), new ZeroTonal()])
    .set(PSZZS.freeTonal.getLiteral(), [])
    .set(PSX.freeTonal.getLiteral(), [])
    .set(PSY.freeTonal.getLiteral(), [new TonalW()])
    .set('zero', [new FreeTonalY()])

