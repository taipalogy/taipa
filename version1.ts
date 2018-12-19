
import { Sound } from './grapheme'
import { characters } from './character'
import { list_of_lexical_roots } from './lexicalroots1'
import { GraphemeMaker } from './graphememaker'

//------------------------------------------------------------------------------
//  Sound
//------------------------------------------------------------------------------

export class Initial extends Sound {}
export class Medial extends Sound {}
export class Final extends Sound {}
export class Nasal extends Sound {}
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

class MedialM  extends Medial {characters = [characters['m']]}
class MedialN  extends Medial {characters = [characters['n']]}
class MedialNG  extends Medial {characters = [characters['n'], characters['g']]}

class InitialC extends Initial {characters = [characters['c']]}
class InitialJ extends Initial {characters = [characters['j']]}
class InitialL extends Initial {characters = [characters['l']]}
class InitialQ extends Initial {characters = [characters['q']]}
class InitialS extends Initial {characters = [characters['s']]}
class InitialV extends Initial {characters = [characters['v']]}
class InitialZ extends Initial {characters = [characters['z']]}

class InitialH extends Initial {characters = [characters['h']]}

class InitialP extends Initial {characters = [characters['p']]}
class InitialT extends Initial {characters = [characters['t']]}
class InitialK extends Initial {characters = [characters['k']]}
class InitialB extends Initial {characters = [characters['b']]}
class InitialD extends Initial {characters = [characters['d']]}
class InitialG extends Initial {characters = [characters['g']]}

class InitialM extends Initial {characters = [characters['m']]}
class InitialN extends Initial {characters = [characters['n']]}
class InitialNG extends Initial {characters = [characters['n'], characters['g']]}

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

class FinalM extends Final {characters = [characters['m']]}
class FinalN extends Final {characters = [characters['n']]}
class FinalNG extends Final {characters = [characters['n'], characters['g']]}

class NasalNN extends Nasal {characters = [characters['n'], characters['n']]}

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
    neutralToneMark: CheckedToneMark
}

type PartialPositionalSound = Partial<PositionalSound>

class PSF implements PartialPositionalSound {
    static final: Final = new FinalF()
    static neutralToneMark: CheckedToneMark = new ToneMarkF()
}

class PSH implements PartialPositionalSound {
    static initial: Initial = new InitialH()
    static final: Final = new FinalH()
    static neutralToneMark: CheckedToneMark = new ToneMarkH()
}

class PSP implements PartialPositionalSound {
    static initial: Initial = new InitialP()
    static final: Final = new FinalP()
    static checkedToneMark: ToneMark = new ToneMarkP()
}

class PST implements PartialPositionalSound {
    static initial: Initial = new InitialT()
    static final: Final = new FinalT()
    static checkedToneMark: ToneMark = new ToneMarkT()
}

class PSK implements PartialPositionalSound {
    static initial: Initial = new InitialK()
    static final: Final = new FinalK()
    static checkedToneMark: ToneMark = new ToneMarkK()
}

class PSB implements PartialPositionalSound {
    static initial: Initial = new InitialB()
    static final: Final = new FinalB()
    static checkedToneMark: ToneMark = new ToneMarkB()
}

class PSD implements PartialPositionalSound {
    static initial: Initial = new InitialD()
    static final: Final = new FinalD()
    static checkedToneMark: ToneMark = new ToneMarkD()
}

class PSG implements PartialPositionalSound {
    static initial: Initial = new InitialG()
    static final: Final = new FinalG()
    static checkedToneMark: ToneMark = new ToneMarkG()
}

class PSS implements PartialPositionalSound {
    initial: Initial
}

class PSM implements PartialPositionalSound {
    initial: Initial
    final: Final
}

class PSNN implements PartialPositionalSound {
    final: Final
}

class PSA implements PartialPositionalSound {
    static medial: Medial = new MedialA()
}

class PSI implements PartialPositionalSound {
    medial: Medial
}

class PSX implements PartialPositionalSound {
    static freeToneMark: FreeToneMarkX = new FreeToneMarkX()
    static checkedToneMark: CheckedToneMarkX = new CheckedToneMarkX()
}

class PSY implements PartialPositionalSound {
    static freeToneMark: FreeToneMarkY = new FreeToneMarkY()
    static checkedToneMark: CheckedToneMarkY = new CheckedToneMarkY()
}

class PSZS implements PartialPositionalSound {
    static freeToneMark: ToneMarkZS = new ToneMarkZS()
}

class PSW implements PartialPositionalSound {
    static freeToneMark: ToneMarkW = new ToneMarkW()
}

class PSZero implements PartialPositionalSound {
    static freeToneMark: ZeroToneMark = new ZeroToneMark()
}

//------------------------------------------------------------------------------
//  Combining Rule
//------------------------------------------------------------------------------

const combiningRules: Map<string, any> = new Map()
    .set('zero', { zs: PSZS.freeToneMark })
    .set('y', { zero: PSZero.freeToneMark })
    .set('w', { y: PSY.freeToneMark })
    .set('x', { zs: PSZS.freeToneMark, w: PSW.freeToneMark })
    .set('zs', { w: PSW.freeToneMark })
    .set('p', { p: PSP.checkedToneMark })
    .set('t', { t: PST.checkedToneMark })
    .set('k', { k: PSK.checkedToneMark })
    .set('h', { h: PSH.neutralToneMark, y: PSY.checkedToneMark })
    .set('b', { b: PSB.checkedToneMark, x: PSX.checkedToneMark })
    .set('d', { d: PSD.checkedToneMark, x: PSX.checkedToneMark })
    .set('g', { g: PSG.checkedToneMark, x: PSX.checkedToneMark })
    .set('f', { f: PSF.neutralToneMark, x: PSX.checkedToneMark })

//------------------------------------------------------------------------------
//  Lexical Root
//------------------------------------------------------------------------------
/*
class LexicalRoot {
    sounds: Array<Sound> = null

    constructor(ss: Array<Sound>) {
        this.sounds = new Array()
        for(let k in ss) {
            this.sounds.push(ss[k])
        }
    }
}
*/
class SetOfLexicalRoots {
    set: Array<Sound[]> =  new Array(
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
        let strs: string[] = new Array
        for(let i in list_of_lexical_roots) {
            strs.push(list_of_lexical_roots[i])
        }
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
        if(this.isFreeToneMark(ls[index])) {
            sounds.push(ls[ls.length-1] + '.toneMark')
        }

        return sounds
    }

    private analyzeAfterVowels(ls: string[], sounds: string[], index: number): string[] {
        if(this.isFreeToneMark(ls[index])) {
            sounds.push(ls[ls.length-1] + '.toneMark')
        } else if(this.isFinalConsonant(ls[index])) {
            let k = index
            while(k < ls.length) {
                if(this.isFinalConsonant(ls[k])) {
                    if(this.isNasal(ls[k])) {
                        sounds.push(ls[k] + '.nasal')
                    } else {
                        sounds.push(ls[k] + '.final')
                    }
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

    generate() {
        let lrg = new LexicalRootGenerator()
        let strs: Array<string> = lrg.generate()
        let arrayOfSounds: Array<string[]> = new Array()
        for(let i in strs) {
            let gs = this.turnIntoGraphemes(strs[i])
            let ls: string[] = []
            for(let j in gs) {
                ls.push(gs[j].letter.literal)
            }
            
            let sounds: string[] = []
            
            if(this.isMaterLectionis(ls[0])) {
                sounds.push(ls[0] + '.medial')
                if(ls.length > sounds.length) {
                    if(this.isFreeToneMark(ls[sounds.length])) {
                        sounds = this.analyzeAfterFinalConsonants(ls, sounds, sounds.length)
                    } else if(this.isVowel(ls[sounds.length])) {
                        sounds = this.analyzeAfterInitialConsonants(ls, sounds, sounds.length)
                    }
                }

                //console.log(sounds)
                arrayOfSounds.push(sounds)
                continue
            }

            // analyze vowels, which have null initial consonants
            // pass 0 as index to indicate it has null initial consonants
            sounds = this.analyzeAfterInitialConsonants(ls, sounds, 0)

            let initials: string = ''
            if(this.isInitialConsonant(ls[0])) {
                sounds.push(ls[0] + '.initial')
                if(this.isVowel(ls[1])) {
                    sounds = this.analyzeAfterInitialConsonants(ls, sounds, sounds.length)
                } else if(this.isFinalConsonant(ls[1])) {
                    // CC
                    sounds = this.analyzeAfterVowels(ls, sounds, sounds.length)
                }
            }

            //console.log(sounds)
            arrayOfSounds.push(sounds)
        }

        //console.log(arrayOfSounds)
        for(let k in arrayOfSounds) {
            console.log(arrayOfSounds[k])
            let entry = arrayOfSounds[k]
            let element = entry[entry.length-1]
            if(element.lastIndexOf('toneMark') > 0) {
                let n = element.lastIndexOf('.')
                let i = element.slice(0, n)
                console.log(combiningRules.get(i))
            } else if(element.lastIndexOf('final') > 0) {
                let n = element.lastIndexOf('.')
                let i = element.slice(0, n)
                if(this.isStopFinal(element)) {
                    console.log(combiningRules.get(i))
                } else if(this.isNasalFinal(element)) {
                    let n = element.lastIndexOf('.')
                    let i = element.slice(0, n)    
                    console.log(combiningRules.get('zero'))
                }
            } else if(element.lastIndexOf('medial') > 0) {
                let n = element.lastIndexOf('.')
                let i = element.slice(0, n)    
                console.log(combiningRules.get('zero'))
            } else if(element.lastIndexOf('nasal') > 0) {
                let n = element.lastIndexOf('.')
                let i = element.slice(0, n)    
                console.log(combiningRules.get('zero'))
            }
        }
    }
}