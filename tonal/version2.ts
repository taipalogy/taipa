import { characters } from '../character'
import { FreeTonal, CheckedTonal, StopFinal, Final, SetOfSounds, Medial, Initial, NasalFinal, Nasal,
    Tonal, Letters, Sound, PositionalSound, SoundTags } from '../grapheme'

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

enum LetterTags {
    zero = 'zero',
}

export class LettersOfTonal extends Letters {}

export let lowerLettersOfTonal = new LettersOfTonal(['a', 'e', 'i', 'o', 'u','ur',
                                                    'c', 'd', 'ch', 'j', 'q', 's', 'v',
                                                    'm', 'n', 'ng',
                                                    'nn',
                                                    'sf', 'w', 'xx', 'xxx', 'z', 'zx',
                                                    'x',
                                                    'y',
                                                    'b', 'g', 'l',
                                                    'k', 'p', 't',
                                                    'kk', 'pp', 'tt', 'hh',
                                                    'f',
                                                    'h'])

export let vowelLettersOfTonal = new LettersOfTonal(['or', 'er', 'ir'])

export let consonantLettersOfTonal = new LettersOfTonal(['dl'])

//------------------------------------------------------------------------------
//  Sound
//------------------------------------------------------------------------------

// TODO: makeCharacters method. characters = makeCharacters('ur')
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

export class TonalZ extends FreeTonal {characters = [characters.get('z')]}
export class TonalW extends FreeTonal {characters = [characters.get('w')]}
export class TonalSF extends FreeTonal {characters = [characters.get('s'), characters.get('f')]}
export class TonalXX extends FreeTonal {characters = [characters.get('x'), characters.get('x')]}
export class TonalXXX extends FreeTonal {characters = [characters.get('x'), characters.get('x'), characters.get('x')]}
export class TonalZX extends FreeTonal {characters = [characters.get('z'), characters.get('x')]}

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
    name = 'a'
    map = new Map<string, Sound>().set(SoundTags.medial, new MedialA())
}

class PSB extends PositionalSound {
    name = 'b'
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialB())
}

class PSC extends PositionalSound {
    name = 'c'
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialC())
}

class PSCH extends PositionalSound {
    name = 'ch'
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialCH())
}

class PSD extends PositionalSound {
    name = 'd'
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialD())
}

class PSE extends PositionalSound {
    name = 'e'
    map = new Map<string, Sound>().set(SoundTags.medial, new MedialE())
}

class PSF extends PositionalSound {
    name = 'f'
    map = new Map<string, Sound>().set(SoundTags.checkedTonal, new TonalF())
}

class PSG extends PositionalSound {
    name = 'g'
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialG())
}

class PSHH extends PositionalSound {
    name = 'hh'
    map = new Map<string, Sound>().set(SoundTags.stopFinal, new FinalHH())
}

class PSI extends PositionalSound {
    name = 'i'
    map = new Map<string, Sound>().set(SoundTags.medial, new MedialI())
}

class PSJ extends PositionalSound {
    name = 'j'
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialJ())
}

class PSK extends PositionalSound {
    name = 'k'
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialK()).set(SoundTags.stopFinal, new FinalK())
    initial: Initial = new InitialK()
}

class PSKK extends PositionalSound {
    name = 'kk'
    map = new Map<string, Sound>().set(SoundTags.stopFinal, new FinalKK())
}

class PSL extends PositionalSound {
    name = 'l'
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialL())
}

class PSM extends PositionalSound {
    name = 'm'
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialM()).set(SoundTags.medial, new MaterLectionisM()).set(SoundTags.nasalFinal, new FinalM())
}

class PSN extends PositionalSound {
    name = 'n'
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialN()).set(SoundTags.medial, new MaterLectionisN()).set(SoundTags.nasalFinal, new FinalN())
}

class PSNN extends PositionalSound {
    name = 'nn'
    map = new Map<string, Sound>().set(SoundTags.nasalization, new NasalizationNN())
}

class PSNG extends PositionalSound {
    name = 'ng'
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialNG()).set(SoundTags.medial, new MaterLectionisNG()).set(SoundTags.nasalFinal, new FinalNG())
}

class PSO extends PositionalSound {
    name = 'o'
    map = new Map<string, Sound>().set(SoundTags.medial, new MedialO())
}

class PSP extends PositionalSound {
    name = 'p'
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialP()).set(SoundTags.stopFinal, new FinalP())
}

class PSPP extends PositionalSound {
    name = 'pp'
    map = new Map<string, Sound>().set(SoundTags.stopFinal, new FinalPP())
}

class PSQ extends PositionalSound {
    name = 'q'
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialQ())
}

class PSH extends PositionalSound {
    name = 'h'
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialH()).set(SoundTags.stopFinal, new FinalH())
    initial: Initial = new InitialH()
}

class PSS extends PositionalSound {
    name = 's'
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialS())
}

class PSSF extends PositionalSound {
    name = 'sf'
    map = new Map<string, Sound>().set(SoundTags.freeTonal, new TonalSF())
}

class PST extends PositionalSound {
    name = 't'
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialT()).set(SoundTags.stopFinal, new FinalT())
    initial: Initial = new InitialT()
}

class PSTT extends PositionalSound {
    name = 'tt'
    map = new Map<string, Sound>().set(SoundTags.stopFinal, new FinalTT())
}

class PSU extends PositionalSound {
    name = 'u'
    map = new Map<string, Sound>().set(SoundTags.medial, new MedialU())
}

class PSUR extends PositionalSound {
    name = 'ur'
    map = new Map<string, Sound>().set(SoundTags.medial, new MedialUR())
}

class PSV extends PositionalSound {
    name = 'v'
    map = new Map<string, Sound>().set(SoundTags.initial, new InitialV())
}

class PSW extends PositionalSound {
    name = 'w'
    map = new Map<string, Sound>().set(SoundTags.freeTonal, new TonalW()).set(SoundTags.checkedTonal, new CheckedTonalW())
}

class PSX extends PositionalSound {
    name = 'x'
    map = new Map<string, Sound>().set(SoundTags.freeTonal, new FreeTonalX()).set(SoundTags.checkedTonal, new CheckedTonalX())
}

class PSXX extends PositionalSound {
    name = 'xx'
    map = new Map<string, Sound>().set(SoundTags.freeTonal, new TonalXX())
}

class PSXXX extends PositionalSound {
    name = 'xxx'
    map = new Map<string, Sound>().set(SoundTags.freeTonal, new TonalXXX())
}

class PSY extends PositionalSound {
    name = 'y'
    map = new Map<string, Sound>().set(SoundTags.freeTonal, new FreeTonalY()).set(SoundTags.checkedTonal, new CheckedTonalY())
    freeTonal: FreeTonal = new FreeTonalY()
}

class PSZ extends PositionalSound {
    name = 'z'
    map = new Map<string, Sound>().set(SoundTags.freeTonal, new TonalZ())
}

class PSZX extends PositionalSound {
    name = 'zx'
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
            .set('zero', { z: new PSZ().get(SoundTags.freeTonal) })
            .set('y', { zero: new PSZero().get(SoundTags.freeTonal), sf: new PSSF().get(SoundTags.freeTonal) })
            .set('w', { y: new PSY().get(SoundTags.freeTonal) })
            .set('x', { z: new PSZ().get(SoundTags.freeTonal), w: new PSW().get(SoundTags.freeTonal) })
            .set('z', { w: new PSW().get(SoundTags.freeTonal) })
            .set('p', { f: new PSF().get(SoundTags.checkedTonal) })
            .set('t', { f: new PSF().get(SoundTags.checkedTonal) })
            .set('k', { f: new PSF().get(SoundTags.checkedTonal) })
            .set('h', { f: new PSF().get(SoundTags.checkedTonal), y: new PSY().get(SoundTags.checkedTonal) })
            .set('pp', { w: new PSW().get(SoundTags.checkedTonal), x: new PSX().get(SoundTags.checkedTonal)})
            .set('tt', { w: new PSW().get(SoundTags.checkedTonal), x: new PSX().get(SoundTags.checkedTonal)})
            .set('kk', { w: new PSW().get(SoundTags.checkedTonal), x: new PSX().get(SoundTags.checkedTonal)})
            .set('hh', { w: new PSW().get(SoundTags.checkedTonal), x: new PSX().get(SoundTags.checkedTonal)})
    
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
            .set('sf', new PSSF())
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
            .set('z', new PSZ())
            .set('zx', new PSZX())
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
            .set('sf', new AllomorphSF())
            .set('w', new AllomorphW())
            .set('xx', new AllomorphXX())
            .set('xxx', new AllomorphXXX())
            .set('z', new AllomorphZ())
            .set('zx', new AllomorphZX())
            .set('y', new AllomorphY())
            .set('x', new AllomorphX())    
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
