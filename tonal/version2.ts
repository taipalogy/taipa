import { characters } from '../character'
import { FreeTonal, CheckedTonal, StopFinal, Final, SetOfSounds, Medial, Initial, NasalFinal, Nasal,
    Tonal,
    ILetters
    } from '../system'
import { FreeAllomorph, CheckedAllomorph, Allomorph } from '../system'
import { Syllabary } from '../system'
import { AlphabeticLetter, AlphabeticGrapheme } from '../grapheme'
import { MatchedPattern, MorphemeMaker, ToneSandhiRootMorpheme,
    CombiningFormMorpheme, 
    Morpheme, Syllable } from '../morpheme'
import { ListOfLexicalRoots } from './lexicalroot'


//------------------------------------------------------------------------------
//  syllabifyTonal
//------------------------------------------------------------------------------

export function syllabifyTonal(letters: Array<AlphabeticLetter>, beginOfSyllable: number, syllabary: Syllabary) {
    // get the longest matched syllable pattern
    syllabary.setFirstLetter(letters[beginOfSyllable].literal)
    let matchedLen = 0;
    let mp = new MatchedPattern();
    for(let m in syllabary.list) {
        let min = Math.min(letters.length-beginOfSyllable, syllabary.list[m].length);
        if(syllabary.list[m].length == min) {
            for(let n = 0; n < min; n++) {
                if(syllabary.list[m][n] != undefined) {
                    if(letters[beginOfSyllable+n].literal === syllabary.list[m][n].getLiteral()) {
                        if(n+1 == min && min > matchedLen) {
                            // to make sure it is longer than previous patterns
                            // last letter matched for the pattern
                            matchedLen = min;
                            // copy the matched letters
                            for(let q = 0; q < matchedLen; q++) {
                                mp.letters[q] = letters[beginOfSyllable+q];
                            }
                            
                            // copy the pattern of sounds
                            mp.pattern = syllabary.list[m];
                            //console.log(syllabary.list[m])
                            //console.log(mp.letters)
                        }
                    } else {
                        break;
                    }    
                }
            }
        }
    }
    return mp;
}

//------------------------------------------------------------------------------
//  ISound for Lexical Root
//------------------------------------------------------------------------------

interface ISound {
    name: string
    initial: Initial
    medial: Medial
    final: Final
    freeTonal: FreeTonal
    checkedTonal: CheckedTonal
    //neutralTonal: CheckedTonal
}

export type PartialISound = Partial<ISound>

//------------------------------------------------------------------------------
//  Alphabet
//------------------------------------------------------------------------------

export let lowerLettersOfTonal: ILetters = {
    // medials
    'a': new AlphabeticLetter([characters.get('a')]),
    'e': new AlphabeticLetter([characters.get('e')]),
    'i': new AlphabeticLetter([characters.get('i')]),
    'o': new AlphabeticLetter([characters.get('o')]),
    'u': new AlphabeticLetter([characters.get('u')]),
    'ur': new AlphabeticLetter([characters.get('u'), characters.get('r')]),

    // initials excludes checked finals and neutral finals
    'c': new AlphabeticLetter([characters.get('c')]),
    'j': new AlphabeticLetter([characters.get('j')]),
    'q': new AlphabeticLetter([characters.get('q')]),
    's': new AlphabeticLetter([characters.get('s')]),
    'v': new AlphabeticLetter([characters.get('v')]),
    'z': new AlphabeticLetter([characters.get('z')]),

    // initials, medial, and nasal finals
    'm': new AlphabeticLetter([characters.get('m')]),
    'n': new AlphabeticLetter([characters.get('n')]),
    'ng': new AlphabeticLetter([characters.get('n'), characters.get('g')]),
    
    // nasalization
    'nn': new AlphabeticLetter([characters.get('n'), characters.get('n')]),

    // free tonals
    'cs': new AlphabeticLetter([characters.get('c'), characters.get('s')]),
    'w': new AlphabeticLetter([characters.get('w')]),
    'xx': new AlphabeticLetter([characters.get('x'), characters.get('x')]),
    'xxx': new AlphabeticLetter([characters.get('x'), characters.get('x'), characters.get('x')]),
    'zs': new AlphabeticLetter([characters.get('z'), characters.get('s')]),
    'zzs': new AlphabeticLetter([characters.get('z'), characters.get('z'), characters.get('s')]),

    // free tonal, checked tonal
    'x': new AlphabeticLetter([characters.get('x')]),

    // free tonal, neutral tonal
    'y': new AlphabeticLetter([characters.get('y')]),

    // initials, stop finals
    'b': new AlphabeticLetter([characters.get('b')]),
    'd': new AlphabeticLetter([characters.get('d')]),
    'g': new AlphabeticLetter([characters.get('g')]),
    'l': new AlphabeticLetter([characters.get('l')]),

    // initials and stop finals
    'k': new AlphabeticLetter([characters.get('k')]),
    'p': new AlphabeticLetter([characters.get('p')]),
    't': new AlphabeticLetter([characters.get('t')]),

    // stop finals
    'kk': new AlphabeticLetter([characters.get('k'), characters.get('k')]),
    'pp': new AlphabeticLetter([characters.get('p'), characters.get('p')]),
    'tt': new AlphabeticLetter([characters.get('t'), characters.get('t')]),
    'hh': new AlphabeticLetter([characters.get('h'), characters.get('h')]),
    
    // checked tonal
    'f': new AlphabeticLetter([characters.get('f')]),

    // initia and neutral final
    'h': new AlphabeticLetter([characters.get('h')]),
}

let ziangLetters: ILetters = {
    // medial
    'ee': new AlphabeticLetter([characters.get('e'), characters.get('e')]),
    'or': new AlphabeticLetter([characters.get('o'), characters.get('r')]),
}

let zuanxLetters: ILetters = {
    // medial
    'er': new AlphabeticLetter([characters.get('e'), characters.get('r')]),
    'ir': new AlphabeticLetter([characters.get('i'), characters.get('r')]),
}

let consonantLetters: ILetters = {
    // voiced d
    'dl': new AlphabeticLetter([characters.get('d'), characters.get('l')]),
}

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
/*
export class FinalB extends StopFinal {characters = [characters.get('b')]}
export class FinalD extends StopFinal {characters = [characters.get('d')]}
export class FinalG extends StopFinal {characters = [characters.get('g')]}
export class FinalL extends StopFinal {characters = [characters.get('l')]}
*/
export class FinalPP extends StopFinal {characters = [characters.get('p'), characters.get('p')]}
export class FinalTT extends StopFinal {characters = [characters.get('t'), characters.get('t')]}
export class FinalKK extends StopFinal {characters = [characters.get('k'), characters.get('k')]}
export class FinalHH extends StopFinal {characters = [characters.get('h'), characters.get('h')]}
/*
export class FinalBB extends StopFinal {characters = [characters.get('b'), characters.get('b')]}
export class FinalDD extends StopFinal {characters = [characters.get('d'), characters.get('d')]}
export class FinalGG extends StopFinal {characters = [characters.get('g'), characters.get('g')]}
export class FinalLL extends StopFinal {characters = [characters.get('l'), characters.get('l')]}
*/

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
        this.freeTonals.push(new TonalCS())
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
        this.finals.push(new FinalPP())
        this.finals.push(new FinalTT())
        this.finals.push(new FinalKK())
        this.finals.push(new FinalHH())

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
        this.stopFinals.push(new FinalPP())
        this.stopFinals.push(new FinalTT())
        this.stopFinals.push(new FinalKK())
        this.stopFinals.push(new FinalHH())
    }

    toString() {
        return super.toString(this.stopFinals)
    }
}

//------------------------------------------------------------------------------
//  Positional Sound for Lexical Root
//------------------------------------------------------------------------------

class PSA implements PartialISound {
    name = 'a'
    medial: Medial = new MedialA()
}

class PSB implements PartialISound {
    name = 'b'
    initial: Initial = new InitialB()
    //static final: Final = new FinalB()
}

class PSC implements PartialISound {
    name = 'c'
    initial: Initial = new InitialC()
}

class PSD implements PartialISound {
    name = 'd'
    initial: Initial = new InitialD()
    //static final: Final = new FinalD()
}

class PSE implements PartialISound {
    name = 'e'
    medial: Medial = new MedialE()
}

class PSF implements PartialISound {
    name = 'f'
    checkedTonal: CheckedTonal = new TonalF()
}

class PSCS implements PartialISound {
    name = 'cs'
    freeTonal: TonalCS = new TonalCS()
}

class PSZS implements PartialISound {
    name = 'zs'
    freeTonal: TonalZS = new TonalZS()
}

class PSG implements PartialISound {
    name = 'g'
    initial: Initial = new InitialG()
    //static final: Final = new FinalG()
}

class PSH implements PartialISound {
    name = 'h'
    initial: Initial = new InitialH()
    final: Final = new FinalH()
}

class PSHH implements PartialISound {
    name = 'hh'
    final: Final = new FinalHH()
}

class PSI implements PartialISound {
    name = 'i'
    medial: Medial = new MedialI()
}

class PSJ implements PartialISound {
    name = 'j'
    initial: Initial = new InitialJ()
}

class PSK implements PartialISound {
    name = 'k'
    initial: Initial = new InitialK()
    final: Final = new FinalK()
}

class PSKK implements PartialISound {
    name = 'kk'
    final: Final = new FinalKK()
}

class PSL implements PartialISound {
    name = 'l'
    initial: Initial = new InitialL()
    //static final: Final = new FinalL()
}

class PSM implements PartialISound {
    name = 'm'
    initial: Initial = new InitialM()
    medial: Medial = new MaterLectionisM()
    final: Final = new FinalM()
}

class PSN implements PartialISound {
    name = 'n'
    initial: Initial = new InitialN()
    medial: Medial = new MaterLectionisN()
    final: Final = new FinalN()
}

class PSNN implements PartialISound {
    name = 'nn'
    nasalization: Nasal = new NasalizationNN()
}

class PSNG implements PartialISound {
    name = 'ng'
    initial: Initial = new InitialNG()
    medial: Medial = new MaterLectionisNG()
    final: Final = new FinalNG()
}

class PSO implements PartialISound {
    name = 'o'
    medial: Medial = new MedialO()
}

class PSP implements PartialISound {
    name = 'p'
    initial: Initial = new InitialP()
    final: Final = new FinalP()
}

class PSPP implements PartialISound {
    name = 'pp'
    final: Final = new FinalPP()
}

class PSQ implements PartialISound {
    name = 'q'
    initial: Initial = new InitialQ()
}

class PSS implements PartialISound {
    name = 's'
    initial: Initial = new InitialS()
}

class PST implements PartialISound {
    name = 't'
    initial: Initial = new InitialT()
    final: Final = new FinalT()
}

class PSTT implements PartialISound {
    name = 'tt'
    final: Final = new FinalTT()
}

class PSU implements PartialISound {
    name = 'u'
    medial: Medial = new MedialU()
}

class PSUR implements PartialISound {
    name = 'ur'
    medial: Medial = new MedialUR()
}

class PSV implements PartialISound {
    name = 'v'
    initial: Initial = new InitialV()
}

class PSW implements PartialISound {
    name = 'w'
    freeTonal: TonalW = new TonalW()
    checkedTonal: CheckedTonal = new CheckedTonalW()
}

class PSX implements PartialISound {
    name = 'x'
    freeTonal: FreeTonalX = new FreeTonalX()
    checkedTonal: CheckedTonalX = new CheckedTonalX()
}

class PSXX implements PartialISound {
    name = 'xx'
    freeTonal: TonalXX = new TonalXX()
}

class PSXXX implements PartialISound {
    name = 'xxx'
    freeTonal: TonalXX = new TonalXXX()
}

class PSY implements PartialISound {
    name = 'y'
    freeTonal: FreeTonalY = new FreeTonalY()
    checkedTonal: CheckedTonalY = new CheckedTonalY()
}

class PSZ implements PartialISound {
    name = 'z'
    initial: Initial = new InitialZ()
}

class PSZZS implements PartialISound {
    name = 'zzs'
    freeTonal: TonalZZS = new TonalZZS()
}

class PSZero implements PartialISound {
    name = 'zero'
    freeTonal: ZeroTonal = new ZeroTonal()
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
export const letterClass: Map<string, PartialISound> = new Map()
    .set('a', new PSA())
    .set('b', new PSB())
    .set('c', new PSC())
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
    .set('z', new PSZ())
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
