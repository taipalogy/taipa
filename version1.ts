
import { Sound } from './grapheme'
import { characters } from './character'
import { list_of_lexical_roots } from './lexicalroots1'
import { GraphemeMaker } from './graphememaker'


//------------------------------------------------------------------------------
//  Sound
//------------------------------------------------------------------------------

export class Initial extends Sound {name = 'initial'}
export class Medial extends Sound {name = 'medial'}
export class Final extends Sound {name = 'final'}
export class Nasal extends Sound {name = 'nasal'}
export class ToneMark extends Sound {
    name = 'tone mark'
    isEqualToToneMark(toneMark: ToneMark) {
        if(this.getLiteral() === toneMark.getLiteral()) {
            return true;
        }
        return false;
    }
}

export class FreeToneMark extends ToneMark {
    name = 'free tone mark'
}
export class CheckedToneMark extends ToneMark {
    name = 'checked tone mark'
}

class StopFinal extends Final {name = 'stop final'}
class NasalFinal extends Final {name = 'nasal final'}

class MedialA extends Medial {characters = [characters.get('a')]}
class MedialE extends Medial {characters = [characters.get('e')]}
class MedialI extends Medial {characters = [characters.get('i')]}
class MedialO extends Medial {characters = [characters.get('o')]}
class MedialU extends Medial {characters = [characters.get('u')]}
class MedialUR extends Medial {characters = [characters.get('u'), characters.get('r')]}

class MedialM  extends Medial {characters = [characters.get('m')]}
class MedialN  extends Medial {characters = [characters.get('n')]}
class MedialNG  extends Medial {characters = [characters.get('n'), characters.get('g')]}

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

export class ZeroToneMark extends FreeToneMark {characters = null;}

export class ToneMarkZS extends FreeToneMark {characters = [characters.get('z'), characters.get('s')]}
export class ToneMarkW extends FreeToneMark {characters = [characters.get('w')]}
export class ToneMarkSS extends FreeToneMark {characters = [characters.get('s'), characters.get('s')]}
export class ToneMarkXX extends FreeToneMark {characters = [characters.get('x'), characters.get('x')]}
export class ToneMarkXXX extends FreeToneMark {characters = [characters.get('x'), characters.get('x'), characters.get('x')]}
export class ToneMarkZZS extends FreeToneMark {characters = [characters.get('z'), characters.get('z'), characters.get('s')]}

export class FreeToneMarkX extends FreeToneMark {characters = [characters.get('x')]}
export class FreeToneMarkY extends FreeToneMark {characters = [characters.get('y')]}

export class ToneMarkP extends CheckedToneMark {characters = [characters.get('p')]}
export class ToneMarkT extends CheckedToneMark {characters = [characters.get('t')]}
export class ToneMarkK extends CheckedToneMark {characters = [characters.get('k')]}
export class ToneMarkH extends CheckedToneMark {characters = [characters.get('h')]}
export class ToneMarkB extends CheckedToneMark {characters = [characters.get('b')]}
export class ToneMarkD extends CheckedToneMark {characters = [characters.get('d')]}
export class ToneMarkG extends CheckedToneMark {characters = [characters.get('g')]}
export class ToneMarkF extends CheckedToneMark {characters = [characters.get('f')]}

export class CheckedToneMarkX extends CheckedToneMark {characters = [characters.get('x')]}
export class CheckedToneMarkY extends CheckedToneMark {characters = [characters.get('y')]}

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

class SetOfSounds {
    toString(elements: Array<Sound>) {
        let str = '';
        for(let i = 0; i < elements.length; i++) {
            if(i+1 < elements.length) {
                for(let k in elements[i].characters) {
                    str += elements[i].characters[k].character;
                }
                str += '|';
            } else if(i+1 == elements.length) {
                for(let k in elements[i].characters) {
                    str += elements[i].characters[k].character;
                }
            }
        }
        return str;
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
        this.materLectionis.push(new MedialM())
        this.materLectionis.push(new MedialN())
        this.materLectionis.push(new MedialNG())
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

export class SetOfFreeToneMarks extends SetOfSounds {
    freeToneMarks: Array<FreeToneMark> = new Array()
    constructor() {
        super()
        this.freeToneMarks.push(new ToneMarkZS())
        this.freeToneMarks.push(new ToneMarkW())
        this.freeToneMarks.push(new ToneMarkXX())
        this.freeToneMarks.push(new ToneMarkXXX())
        this.freeToneMarks.push(new ToneMarkSS())
        this.freeToneMarks.push(new ToneMarkZZS())

        this.freeToneMarks.push(new FreeToneMarkX())
        this.freeToneMarks.push(new FreeToneMarkY())
    }

    toString() {
        return super.toString(this.freeToneMarks)
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

//------------------------------------------------------------------------------
//  Lexical Root using Positional Sound
//------------------------------------------------------------------------------

interface PositionalSound {
    initial: Initial
    medial: Medial
    final: Final
    freeToneMark: FreeToneMark
    checkedToneMark: CheckedToneMark
    //neutralToneMark: CheckedToneMark
}

type PartialPositionalSound = Partial<PositionalSound>

class PSA implements PartialPositionalSound {
    static medial: Medial = new MedialA()
}

class PSB implements PartialPositionalSound {
    static initial: Initial = new InitialB()
    static final: Final = new FinalB()
    static checkedToneMark: ToneMark = new ToneMarkB()
}

class PSC implements PartialPositionalSound {
    static initial: Initial = new InitialC()
}

class PSD implements PartialPositionalSound {
    static initial: Initial = new InitialD()
    static final: Final = new FinalD()
    static checkedToneMark: ToneMark = new ToneMarkD()
}

class PSE implements PartialPositionalSound {
    static medial: Medial = new MedialE()
}

class PSF implements PartialPositionalSound {
    static final: Final = new FinalF()
    static checkedToneMark: CheckedToneMark = new ToneMarkF()
}

class PSG implements PartialPositionalSound {
    static initial: Initial = new InitialG()
    static final: Final = new FinalG()
    static checkedToneMark: ToneMark = new ToneMarkG()
}

class PSH implements PartialPositionalSound {
    static initial: Initial = new InitialH()
    static final: Final = new FinalH()
    static checkedToneMark: CheckedToneMark = new ToneMarkH()
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
    static checkedToneMark: ToneMark = new ToneMarkK()
}

class PSL implements PartialPositionalSound {
    static initial: Initial = new InitialL()
}

class PSM implements PartialPositionalSound {
    static initial: Initial = new InitialM()
    static medial: Medial = new MedialM()
    static final: Final = new FinalM()
}

class PSN implements PartialPositionalSound {
    static initial: Initial = new InitialN()
    static medial: Medial = new MedialN()
    static final: Final = new FinalN()
}

class PSNN implements PartialPositionalSound {
    static nasal: Nasal = new NasalNN()
}

class PSNG implements PartialPositionalSound {
    static initial: Initial = new InitialNG()
    static medial: Medial = new MedialNG()
    static final: Final = new FinalNG()
}

class PSO implements PartialPositionalSound {
    static medial: Medial = new MedialO()
}

class PSP implements PartialPositionalSound {
    static initial: Initial = new InitialP()
    static final: Final = new FinalP()
    static checkedToneMark: ToneMark = new ToneMarkP()
}

class PSQ implements PartialPositionalSound {
    static initial: Initial = new InitialQ()
}

class PSS implements PartialPositionalSound {
    static initial: Initial = new InitialS()
}

class PSSS implements PartialPositionalSound {
    static freeToneMark: ToneMarkSS = new ToneMarkSS()
}

class PST implements PartialPositionalSound {
    static initial: Initial = new InitialT()
    static final: Final = new FinalT()
    static checkedToneMark: ToneMark = new ToneMarkT()
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
    static freeToneMark: ToneMarkW = new ToneMarkW()
}

class PSX implements PartialPositionalSound {
    static freeToneMark: FreeToneMarkX = new FreeToneMarkX()
    static checkedToneMark: CheckedToneMarkX = new CheckedToneMarkX()
}

class PSY implements PartialPositionalSound {
    static freeToneMark: FreeToneMarkY = new FreeToneMarkY()
    static checkedToneMark: CheckedToneMarkY = new CheckedToneMarkY()
}

class PSZ implements PartialPositionalSound {
    static initial: Initial = new InitialZ()
}

class PSZS implements PartialPositionalSound {
    static freeToneMark: ToneMarkZS = new ToneMarkZS()
}

class PSZero implements PartialPositionalSound {
    static freeToneMark: ZeroToneMark = new ZeroToneMark()
}


//------------------------------------------------------------------------------
//  Combining Rule
//------------------------------------------------------------------------------

export const combiningRules: Map<string, any> = new Map()
    .set('zero', { zs: PSZS.freeToneMark })
    .set('y', { zero: PSZero.freeToneMark, ss: PSSS.freeToneMark })
    .set('w', { y: PSY.freeToneMark })
    .set('x', { zs: PSZS.freeToneMark, w: PSW.freeToneMark })
    .set('zs', { w: PSW.freeToneMark })
    .set('p', { p: PSP.checkedToneMark })
    .set('t', { t: PST.checkedToneMark })
    .set('k', { k: PSK.checkedToneMark })
    .set('h', { h: PSH.checkedToneMark, y: PSY.checkedToneMark })
    .set('b', { b: PSB.checkedToneMark, x: PSX.checkedToneMark })
    .set('d', { d: PSD.checkedToneMark, x: PSX.checkedToneMark })
    .set('g', { g: PSG.checkedToneMark, x: PSX.checkedToneMark })
    .set('f', { f: PSF.checkedToneMark, x: PSX.checkedToneMark })

const letterClass: Map<string, PartialPositionalSound> = new Map()
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
    .set('y', PSY)
    .set('z', PSZ)
    .set('zs', PSZS)

//------------------------------------------------------------------------------
//  Lexical Root
//------------------------------------------------------------------------------

export class ListOfLexicalRoots {
    list: Array<Sound[]> =  new Array()

    setFirstLetter(init: string) {
        let cog = new ClientOfGenerator
        let entries: Array<Sound[]> = cog.generate(init)
        for(let i in entries) {
            this.list.push(entries[i])
        }
    }

    toString() {
        for(let k in this.list) {
            let str: string = ''
            for(let i in this.list[k]) {
                str += this.list[k][i].getLiteral()
                
            }
            console.log(str)
        }
    }
}

export class LexicalRootGenerator {
    generate(init: string) {
        let strs: string[] = new Array
        for(let i in list_of_lexical_roots) {
            if(list_of_lexical_roots[i].search(init) == 0) {
                strs.push(list_of_lexical_roots[i])
            }
        }
        //for(let i in strs) console.log(strs[i])
        return strs
    }
}

export class ClientOfGenerator {
    private turnIntoGraphemes(str: string) {
        // Grapheme Maker
        let gm = new GraphemeMaker(str);
        let graphemes = gm.makeGraphemes();
        return graphemes
    }

    private analyzeAfterFinalConsonants(ls: string[], sounds: string[], index: number): string[] {
        // base form of checked tone do not have a tone mark
        if(this.isFreeToneMark(ls[index])) {
            sounds.push(ls[ls.length-1] + '.freeToneMark')
        }

        return sounds
    }

    private analyzeAfterVowels(ls: string[], sounds: string[], index: number): string[] {
        if(this.isFreeToneMark(ls[index])) {
            sounds.push(ls[ls.length-1] + '.freeToneMark')
        } else if(this.isNasal(ls[index])) {
            sounds.push(ls[index] + '.nasal')
            if(ls.length > sounds.length) {
                sounds = this.analyzeAfterFinalConsonants(ls, sounds, sounds.length)
            }
        } else if(this.isFinalConsonant(ls[index])) {
            let k = index
            while(k < ls.length) {
                if(this.isFinalConsonant(ls[k])) {
                    sounds.push(ls[k] + '.final')
                }
                k++
            }

            if(ls.length > sounds.length) {
                sounds = this.analyzeAfterFinalConsonants(ls, sounds, sounds.length)
            }
            
        } 

        return sounds
    }

    private analyzeAfterInitialConsonants(ls: string[], sounds: string[], index: number): string[] {
        if(this.isVowel(ls[index])) {
            let k = index
            while(k < ls.length) {
                if(this.isVowel(ls[k])) {
                    sounds.push(ls[k] + '.medial')
                }
                k++
            }
            
            if(ls.length == sounds.length) {
                // vowels with no tone marks
                return sounds
            }

            if(ls.length > sounds.length) {
                sounds = this.analyzeAfterVowels(ls, sounds, sounds.length)
            }
        }

        return sounds
    }

    private isMaterLectionis(str: string) {
        if(str.search(new RegExp(new SetOfMaterLectionis().toString())) == 0) return true

        return false
    }

    private isVowel(str: string) {
        if(str.search(new RegExp(new SetOfMedials().toString())) == 0) return true

        return false
    }

    private isInitialConsonant(str: string) {
        if(str.search(new RegExp(new SetOfInitials().toString())) == 0) return true

        return false
    }

    private isFreeToneMark(str: string) {
        if(str.search(new RegExp(new SetOfFreeToneMarks().toString())) == 0) return true

        return false
    }
    
    private isFinalConsonant(str: string) {
        if(str.search(new RegExp(new SetOfFinals().toString())) == 0) return true

        return false
    }

    private isNasal(str: string) {
        if(str.search(new RegExp(new SetOfNasals().toString())) == 0) return true
        
        return false
    }

    private isStopFinal(str: string) {
        if(str.search(new RegExp(new SetOfStopFinals().toString())) == 0) return true
        
        return false
    }

    private isNasalFinal(str: string) {
        if(str.search(new RegExp(new SetOfNasalFinals().toString())) == 0) return true
        
        return false
    }

    private makeCombiningForms(entry: string[]) {
        let lastElement = entry[entry.length-1]
        //let tm: string = ''
        let n = lastElement.lastIndexOf('.')
        let key = lastElement.slice(0, n)
        let tos = combiningRules.get(key)
        let ret: Array<string[]> = new Array

        if(lastElement.lastIndexOf('freeToneMark') > 0) {
            let e: string[] = []
            for(let k in tos) {
                
                e = []
                e = Object.assign([], entry)
                e.pop()
                if(tos[k].getLiteral() != 0) {
                    // zero-tone-mark for first tone will not be pushed
                    e.push(tos[k].getLiteral() + '.freeToneMark')
                }
                //console.log(e + '-')
                // first tone is still pushed to return
                ret.push(e)
            }
        } else {
            let e: string[] = []
            e = Object.assign([], entry)
            e.push(combiningRules.get('zero').zs.getLiteral() + '.freeToneMark')
            //console.log(e + '+')
            ret.push(e)
        }
    
        return ret
    }

    private findNew(buffer: Array<string[]>) {
        // find new tones based on the same stem
        let cfs
        for(let i in buffer) {
            cfs = this.makeCombiningForms(buffer[i])
        
            for(let m in cfs) {
                for(let n = 0 ; n < buffer.length; n++) {
                    let entry = buffer[n]
                    if(entry[entry.length-1] === cfs[m][cfs[m].length-1]) {
                        break
                    }
                    if(n == buffer.length-1) {
                        // pushed to fill the slot, block following duplicates
                        // duplicates come from combining rules
                        buffer.push(cfs[m])
                        //console.log(cfs[m] + '*')
                    }
                }
            }
        }
    }

    private convert(entry: string[]) {
        // convert strings in an entry to sounds
        // ex: a.medial -> PSA.medial
        let ret: Array<Sound> = new Array()
        for(let i in entry) {
            let n = entry[i].lastIndexOf('.')
            let clasName = entry[i].slice(0, n)
            let position = entry[i].slice(n+1)
            ret.push(letterClass.get(clasName)[position])
        }
        return ret
    }

    generate(init: string) {
        let lrg = new LexicalRootGenerator()
        let strs: Array<string> = lrg.generate(init) // retrieve all needed roots beginning with init
        let arrayOfSounds: Array<string[]> = new Array() // collecting all sounds to be processed
        let entries: Array<Sound[]> = new Array() // to be returned

        for(let i in strs) {
            // generates all needed sounds to be processed
            let gs = this.turnIntoGraphemes(strs[i])
            let ls: string[] = []
            for(let j in gs) {
                ls.push(gs[j].letter.literal)
            }
            
            let sounds: string[] = []
            
            if((this.isMaterLectionis(ls[0]) && ls.length == 1) 
                || (ls.length == 2 && this.isMaterLectionis(ls[0]) && this.isFreeToneMark(ls[1]))) {
                sounds.push(ls[0] + '.medial')
                if(ls.length > sounds.length) {
                    if(this.isFreeToneMark(ls[sounds.length])) {
                        sounds = this.analyzeAfterFinalConsonants(ls, sounds, sounds.length)
                    } else if(this.isVowel(ls[sounds.length])) {
                        sounds = this.analyzeAfterInitialConsonants(ls, sounds, sounds.length)
                    }
                }

                arrayOfSounds.push(sounds)
                continue
            }

            // analyze vowels, which have null initial consonants
            // pass 0 as index to indicate it has null initial consonants
            sounds = this.analyzeAfterInitialConsonants(ls, sounds, 0)

            let initials: string = ''
            if(this.isInitialConsonant(ls[0])) {
                // analyze initial consonants
                sounds.push(ls[0] + '.initial')
                if(this.isVowel(ls[1])) {
                    // consonants followed by vowels
                    sounds = this.analyzeAfterInitialConsonants(ls, sounds, sounds.length)
                } else if(this.isFinalConsonant(ls[1])) {
                    // consonants followed by consonants. CC
                    // there should be a vowel -ir-
                    sounds = this.analyzeAfterVowels(ls, sounds, sounds.length)
                }
            }

            arrayOfSounds.push(sounds)
        }

        let buffer: Array<string[]> = new Array()
        let currentStem: string[] = []
        let nextStem: string[] = []
        for(let k = 0; k < arrayOfSounds.length; k++) {

            //console.log(arrayOfSounds[k])
            entries.push(this.convert(arrayOfSounds[k]))

            let entry = arrayOfSounds[k]
            let lastElement = entry[entry.length-1]

            if(this.isStopFinal(lastElement)) {
                let lastElement = entry[entry.length-1]
                let n = lastElement.lastIndexOf('.')
                let key = lastElement.slice(0, n)
                let tos = combiningRules.get(key)
        
                let e: string[] = []
                for(let k in tos) {
                    e = []
                    e = Object.assign([], entry)
                    e.push(tos[k].getLiteral() + '.checkedToneMark')

                    //console.log(e + '$')
                    entries.push(this.convert(e))
                }
    
                if(k == arrayOfSounds.length-1) {
                    // terminal condition of iterator of arrayofSounds
                    this.findNew(buffer)
                    for(let i in buffer) {
                        entries.push(this.convert(buffer[i]))
                    }
                }
            } else {
                if(lastElement.lastIndexOf('freeToneMark') > 0) {
                    nextStem = entry.slice(0, entry.length-1)
                } else {
                    nextStem = entry
                }

                if(nextStem.length != currentStem.length) {
                    // when the stems are not in the same length
                    currentStem = nextStem
                    this.findNew(buffer)
                    for(let i in buffer) {
                        entries.push(this.convert(buffer[i]))
                    }
                    buffer = []
                } else {
                    for(let e in currentStem) {
                        if(currentStem[e] !== nextStem[e]) {
                            // when the stems are not the same
                            currentStem = nextStem
                            this.findNew(buffer)
                            for(let i in buffer) {
                                entries.push(this.convert(buffer[i]))
                            }
                            buffer = []
                            break
                        }
                    }
                }
                buffer.push(entry)
            }
        }

        return entries
    }
}