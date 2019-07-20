import { characters } from '../character'
import { FreeTonal, CheckedTonal, StopFinal, Final, SetOfSounds, Medial, Initial, NasalFinal, Nasal,
    Tonal, Letters } from '../grapheme'

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
            return 'zero'; 
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
//  ISound for Lexical Root
//------------------------------------------------------------------------------

interface ISound {
    initial: Initial
    medial: Medial
    final: Final
    freeTonal: FreeTonal
    checkedTonal: CheckedTonal
    //neutralTonal: CheckedTonal
}

export type PartialISound = Partial<ISound>

interface PositionalSound extends PartialISound {
    // name should not be optional nor undefined
    name: string
}

//------------------------------------------------------------------------------
//  Alphabet
//------------------------------------------------------------------------------

export class LettersOfTonal extends Letters {}

export let lowerLettersOfTonal = new LettersOfTonal(['a', 'e', 'i', 'o', 'u','ur',
                                                    'c', 'd', 'ch', 'j', 'q', 's', 'v',
                                                    'm', 'n', 'ng',
                                                    'nn',
                                                    'cs', 'w', 'xx', 'xxx', 'zs', 'zzs',
                                                    'x',
                                                    'y',
                                                    'b', 'g', 'l',
                                                    'k', 'p', 't',
                                                    'kk', 'pp', 'tt', 'hh',
                                                    'f',
                                                    'h'])

export let vowelLettersOfTonal = new LettersOfTonal(['ee', 'or', 'er', 'ir'])

export let consonantLettersOfTonal = new LettersOfTonal(['dl'])

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
class InitialCH extends Initial {characters = [characters.get('c'), characters.get('h')]}
class InitialJ extends Initial {characters = [characters.get('j')]}
class InitialL extends Initial {characters = [characters.get('l')]}
class InitialQ extends Initial {characters = [characters.get('q')]}
class InitialS extends Initial {characters = [characters.get('s')]}
class InitialV extends Initial {characters = [characters.get('v')]}

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

export class ZeroTonal extends Tonal {characters = [];}

export class TonalZS extends FreeTonal {characters = [characters.get('z'), characters.get('s')]}
export class TonalW extends FreeTonal {characters = [characters.get('w')]}
export class TonalCS extends FreeTonal {characters = [characters.get('c'), characters.get('s')]}
export class TonalXX extends FreeTonal {characters = [characters.get('x'), characters.get('x')]}
export class TonalXXX extends FreeTonal {characters = [characters.get('x'), characters.get('x'), characters.get('x')]}
export class TonalZZS extends FreeTonal {characters = [characters.get('z'), characters.get('z'), characters.get('s')]}

export class FreeTonalX extends FreeTonal {characters = [characters.get('x')]}
export class FreeTonalY extends FreeTonal {characters = [characters.get('y')]}

export class CheckedTonalW extends CheckedTonal {characters = [characters.get('w')]}
export class TonalF extends CheckedTonal {characters = [characters.get('f')]}

export class CheckedTonalX extends CheckedTonal {characters = [characters.get('x')]}
export class CheckedTonalY extends CheckedTonal {characters = [characters.get('y')]}

export class FinalP extends StopFinal {characters = [characters.get('p')]}
export class FinalT extends StopFinal {characters = [characters.get('t')]}
export class FinalK extends StopFinal {characters = [characters.get('k')]}
export class FinalH extends StopFinal {characters = [characters.get('h')]}

export class FinalPP extends StopFinal {characters = [characters.get('p'), characters.get('p')]}
export class FinalTT extends StopFinal {characters = [characters.get('t'), characters.get('t')]}
export class FinalKK extends StopFinal {characters = [characters.get('k'), characters.get('k')]}
export class FinalHH extends StopFinal {characters = [characters.get('h'), characters.get('h')]}

class FinalM extends NasalFinal {characters = [characters.get('m')]}
class FinalN extends NasalFinal {characters = [characters.get('n')]}
class FinalNG extends NasalFinal {characters = [characters.get('n'), characters.get('g')]}

class NasalizationNN extends Nasal {characters = [characters.get('n'), characters.get('n')]}

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
        this.freeTonals.push(new TonalZS())
        this.freeTonals.push(new TonalW())
        this.freeTonals.push(new TonalXX())
        this.freeTonals.push(new TonalXXX())
        this.freeTonals.push(new TonalCS())
        this.freeTonals.push(new TonalZZS())

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

class PSA implements PositionalSound {
    name = 'a'
    medial: Medial = new MedialA()
}

class PSB implements PositionalSound {
    name = 'b'
    initial: Initial = new InitialB()
    //static final: Final = new FinalB()
}

class PSC implements PositionalSound {
    name = 'c'
    initial: Initial = new InitialC()
}

class PSCH implements PositionalSound {
    name = 'ch'
    initial: Initial = new InitialCH()
}

class PSD implements PositionalSound {
    name = 'd'
    initial: Initial = new InitialD()
    //static final: Final = new FinalD()
}

class PSE implements PositionalSound {
    name = 'e'
    medial: Medial = new MedialE()
}

class PSF implements PositionalSound {
    name = 'f'
    checkedTonal: CheckedTonal = new TonalF()
}

class PSCS implements PositionalSound {
    name = 'cs'
    freeTonal: TonalCS = new TonalCS()
}

class PSZS implements PositionalSound {
    name = 'zs'
    freeTonal: TonalZS = new TonalZS()
}

class PSG implements PositionalSound {
    name = 'g'
    initial: Initial = new InitialG()
    //static final: Final = new FinalG()
}

class PSH implements PositionalSound {
    name = 'h'
    initial: Initial = new InitialH()
    final: Final = new FinalH()
}

class PSHH implements PositionalSound {
    name = 'hh'
    final: Final = new FinalHH()
}

class PSI implements PositionalSound {
    name = 'i'
    medial: Medial = new MedialI()
}

class PSJ implements PositionalSound {
    name = 'j'
    initial: Initial = new InitialJ()
}

class PSK implements PositionalSound {
    name = 'k'
    initial: Initial = new InitialK()
    final: Final = new FinalK()
}

class PSKK implements PositionalSound {
    name = 'kk'
    final: Final = new FinalKK()
}

class PSL implements PositionalSound {
    name = 'l'
    initial: Initial = new InitialL()
    //static final: Final = new FinalL()
}

class PSM implements PositionalSound {
    name = 'm'
    initial: Initial = new InitialM()
    medial: Medial = new MaterLectionisM()
    final: Final = new FinalM()
}

class PSN implements PositionalSound {
    name = 'n'
    initial: Initial = new InitialN()
    medial: Medial = new MaterLectionisN()
    final: Final = new FinalN()
}

class PSNN implements PositionalSound {
    name = 'nn'
    nasalization: Nasal = new NasalizationNN()
}

class PSNG implements PositionalSound {
    name = 'ng'
    initial: Initial = new InitialNG()
    medial: Medial = new MaterLectionisNG()
    final: Final = new FinalNG()
}

class PSO implements PositionalSound {
    name = 'o'
    medial: Medial = new MedialO()
}

class PSP implements PositionalSound {
    name = 'p'
    initial: Initial = new InitialP()
    final: Final = new FinalP()
}

class PSPP implements PositionalSound {
    name = 'pp'
    final: Final = new FinalPP()
}

class PSQ implements PositionalSound {
    name = 'q'
    initial: Initial = new InitialQ()
}

class PSS implements PositionalSound {
    name = 's'
    initial: Initial = new InitialS()
}

class PST implements PositionalSound {
    name = 't'
    initial: Initial = new InitialT()
    final: Final = new FinalT()
}

class PSTT implements PositionalSound {
    name = 'tt'
    final: Final = new FinalTT()
}

class PSU implements PositionalSound {
    name = 'u'
    medial: Medial = new MedialU()
}

class PSUR implements PositionalSound {
    name = 'ur'
    medial: Medial = new MedialUR()
}

class PSV implements PositionalSound {
    name = 'v'
    initial: Initial = new InitialV()
}

class PSW implements PositionalSound {
    name = 'w'
    freeTonal: TonalW = new TonalW()
    checkedTonal: CheckedTonal = new CheckedTonalW()
}

class PSX implements PositionalSound {
    name = 'x'
    freeTonal: FreeTonalX = new FreeTonalX()
    checkedTonal: CheckedTonal = new CheckedTonalX()
}

class PSXX implements PositionalSound {
    name = 'xx'
    freeTonal: FreeTonal = new TonalXX()
}

class PSXXX implements PositionalSound {
    name = 'xxx'
    freeTonal: FreeTonal = new TonalXXX()
}

class PSY implements PositionalSound {
    name = 'y'
    freeTonal: FreeTonal = new FreeTonalY()
    checkedTonal: CheckedTonal = new CheckedTonalY()
}

class PSZZS implements PositionalSound {
    name = 'zzs'
    freeTonal: FreeTonal = new TonalZZS()
}

class PSZero implements PositionalSound {
    name = 'zero'
    freeTonal: FreeTonal = new ZeroTonal()
}

//------------------------------------------------------------------------------
//  Combining Rule
//------------------------------------------------------------------------------

export const combiningRules: Map<string, any> = new Map()
    .set('zero', { zs: new PSZS().freeTonal })
    .set('y', { zero: new PSZero().freeTonal, cs: new PSCS().freeTonal })
    .set('w', { y: new PSY().freeTonal })
    .set('x', { zs: new PSZS().freeTonal, w: new PSW().freeTonal })
    .set('zs', { w: new PSW().freeTonal })
    .set('p', { f: new PSF().checkedTonal })
    .set('t', { f: new PSF().checkedTonal })
    .set('k', { f: new PSF().checkedTonal })
    .set('h', { f: new PSF().checkedTonal, y: new PSY().checkedTonal })
    .set('pp', { w: new PSW().checkedTonal, x: new PSX().checkedTonal})
    .set('tt', { w: new PSW().checkedTonal, x: new PSX().checkedTonal})
    .set('kk', { w: new PSW().checkedTonal, x: new PSX().checkedTonal})
    .set('hh', { w: new PSW().checkedTonal, x: new PSX().checkedTonal})


// need to verify the size of the map
export const letterClass: Map<string, PositionalSound> = new Map()
    .set('a', new PSA())
    .set('b', new PSB())
    .set('c', new PSC())
    .set('ch', new PSCH())
    .set('d', new PSD())
    .set('e', new PSE())
    .set('f', new PSF())
    .set('g', new PSG())
    .set('h', new PSH())
    .set('hh', new PSHH())
    .set('i', new PSI())
    .set('j', new PSJ())
    .set('k', new PSK())
    .set('kk', new PSKK())
    .set('l', new PSL())
    .set('m', new PSM())
    .set('n', new PSN())
    .set('nn', new PSNN())
    .set('ng', new PSNG())
    .set('o', new PSO())
    .set('p', new PSP())
    .set('pp', new PSPP())
    .set('q', new PSQ())
    .set('s', new PSS())
    .set('cs', new PSCS())
    .set('t', new PST())
    .set('tt', new PSTT())
    .set('u', new PSU())
    .set('ur', new PSUR())
    .set('v', new PSV())
    .set('w', new PSW())
    .set('x', new PSX())
    .set('xx', new PSXX())
    .set('xxx', new PSXXX())
    .set('y', new PSY())
    .set('zs', new PSZS())
    .set('zzs', new PSZZS())


//------------------------------------------------------------------------------
//  Allomorph
//------------------------------------------------------------------------------

export class ZeroAllomorph extends FreeAllomorph {
    tonal = new ZeroTonal()
}

class AllomorphCS extends FreeAllomorph {
    tonal = new TonalCS()
}

class AllomorphZS extends FreeAllomorph {
    tonal = new TonalZS()
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

export const listOfFreeAllomorphs: Map<string, Allomorph> = new Map()
    .set('cs', new AllomorphCS())
    .set('w', new AllomorphW())
    .set('xx', new AllomorphXX())
    .set('xxx', new AllomorphXXX())
    .set('zs', new AllomorphZS())
    .set('zzs', new AllomorphZZS())
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

export const listOfCheckedAllomorphs: Map<string, Allomorph> = new Map()
    .set(new PSP().final.getLiteral(), new AllomorphP())
    .set(new PST().final.getLiteral(), new AllomorphT())
    .set(new PSK().final.getLiteral(), new AllomorphK())
    .set(new PSH().final.getLiteral(), new AllomorphH())
    .set(new PSPP().final.getLiteral(), new AllomorphPP())
    .set(new PSTT().final.getLiteral(), new AllomorphTT())
    .set(new PSKK().final.getLiteral(), new AllomorphKK())
    .set(new PSHH().final.getLiteral(), new AllomorphHH())
    .set(new PSP().final.getLiteral() + new PSF().checkedTonal.getLiteral(), new AllomorphPF())
    .set(new PST().final.getLiteral() + new PSF().checkedTonal.getLiteral(), new AllomorphTF())
    .set(new PSK().final.getLiteral() + new PSF().checkedTonal.getLiteral(), new AllomorphKF())
    .set(new PSH().final.getLiteral() + new PSF().checkedTonal.getLiteral(), new AllomorphHF())
    .set(new PSPP().final.getLiteral() + new PSW().checkedTonal.getLiteral(), new AllomorphPPW())
    .set(new PSTT().final.getLiteral() + new PSW().checkedTonal.getLiteral(), new AllomorphTTW())
    .set(new PSKK().final.getLiteral() + new PSW().checkedTonal.getLiteral(), new AllomorphKKW())
    .set(new PSHH().final.getLiteral() + new PSW().checkedTonal.getLiteral(), new AllomorphHHW())
    .set(new PSH().final.getLiteral() + new PSY().checkedTonal.getLiteral(), new AllomorphHY())
    .set(new PSPP().final.getLiteral() + new PSX().checkedTonal.getLiteral(), new AllomorphPPX())
    .set(new PSTT().final.getLiteral() + new PSX().checkedTonal.getLiteral(), new AllomorphTTX())
    .set(new PSKK().final.getLiteral() + new PSX().checkedTonal.getLiteral(), new AllomorphKKX())
    .set(new PSHH().final.getLiteral() + new PSX().checkedTonal.getLiteral(), new AllomorphHHX())

export const listOfUncombinedFreeAllomorphs: Map<string, Allomorph> = new Map()
    .set(new PSW().freeTonal.getLiteral(), new AllomorphW())
    .set(new PSZS().freeTonal.getLiteral(), new AllomorphZS())
    .set(new PSX().freeTonal.getLiteral(), new AllomorphX())
    .set(new PSY().freeTonal.getLiteral(), new AllomorphY())

export const listOfUncombinedCheckedAllomorphs: Map<string, Allomorph> = new Map()
    .set(new PSP().final.getLiteral(), new AllomorphP())
    .set(new PST().final.getLiteral(), new AllomorphT())
    .set(new PSK().final.getLiteral(), new AllomorphK())
    .set(new PSH().final.getLiteral(), new AllomorphH())
    .set(new PSPP().final.getLiteral(), new AllomorphPP())
    .set(new PSTT().final.getLiteral(), new AllomorphTT())
    .set(new PSKK().final.getLiteral(), new AllomorphKK())
    .set(new PSHH().final.getLiteral(), new AllomorphHH())

export const freeAllomorphUncombiningRules: Map<string, Tonal[]> = new Map()
    .set(new PSCS().freeTonal.getLiteral(), [new FreeTonalY()])
    .set(new PSW().freeTonal.getLiteral(), [new TonalZS(), new FreeTonalX()])
    .set(new PSXX().freeTonal.getLiteral(), [new TonalZS(), new TonalCS, new FreeTonalX()])
    .set(new PSXXX().freeTonal.getLiteral(), [new TonalZS(), new TonalCS(), new FreeTonalX()])
    .set(new PSZS().freeTonal.getLiteral(), [new FreeTonalX(), new TonalCS(), new ZeroTonal()])
    .set(new PSZZS().freeTonal.getLiteral(), [])
    .set(new PSX().freeTonal.getLiteral(), [])
    .set(new PSY().freeTonal.getLiteral(), [new TonalW()])
    .set('zero', [new FreeTonalY()])
