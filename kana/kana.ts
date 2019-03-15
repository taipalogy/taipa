import { Syllabary, Sound, SetOfSounds, ILetters } from '../system'
import { KanaTurner } from './turner';
import { characters } from '../character'
import { AlphabeticLetter } from '../grapheme'

export class RomanizedKana extends Syllabary {
    list: Array<Sound[]> = new Array()
    setFirstLetter(beginning: string) {
        let cog = new ClientOfGenerator()
        let entries: Array<Sound[]> = cog.generate(beginning)
        for(let i in entries) {
            this.list.push(entries[i])
        }
        //console.info(this.list)
    }
}

class RomanizedKanaGenerator {
    generate(beginning: string) {
        let strs: string[] = new Array()
        for(let i in list_of_romanized_kana) {
            if(list_of_romanized_kana[i].search(beginning) == 0) {
                strs.push(list_of_romanized_kana[i])
                // double vowels. repeat the vowel.
                strs.push(list_of_romanized_kana[i] + list_of_romanized_kana[i].charAt(list_of_romanized_kana[i].length-1))
                // consonant germination
                strs.push(list_of_romanized_kana[i].charAt(0) + list_of_romanized_kana[i])
            }
        }
        //for(let i in strs) console.info(strs[i])
        return strs
    }
}

class ClientOfGenerator {
    private analyzeAfterVowels(ls: string[], sounds: string[], index: number): string[] {
        if(this.isFinalConsonant(ls[index])) {
            let k = index
            while(k < ls.length) {
                if(this.isFinalConsonant(ls[k])) {
                    sounds.push(ls[k] + '.finalConsonant')
                }
                k++
            }            
        } 
        return sounds
    }

    private analyzeAfterInitialConsonants(ls: string[], sounds: string[], index: number): string[] {
        if(this.isSemivowel(ls[index])) {
            sounds.push(ls[index] + '.semivowel')
            if(this.isVowel(ls[index+1])) {
                sounds.push(ls[index+1] + '.vowel')
            }
        } else if(this.isVowel(ls[index])) {
            let k = index
            while(k < ls.length) {
                if(this.isVowel(ls[k])) {
                    sounds.push(ls[k] + '.vowel')
                }
                k++
            }
        }

        return sounds
    }

    private isInitialConsonant(str: string) {
        if(str.search(new RegExp(new SetOfInitialConsonants().toString())) == 0) return true

        return false
    }

    private isVowel(str: string) {
        if(str.search(new RegExp(new SetOfVowels().toString())) == 0) return true

        return false
    }

    private isFinalConsonant(str: string) {
        if(str.search(new RegExp(new SetOfFinalConsonants().toString())) == 0) return true

        return false
    }

    private isSemivowel(str: string) {
        if(str.search(new RegExp(new SetOfSemivowels().toString())) == 0) return true

        return false
    }

    private isGerminatedConsonant(str: string) {
        if(str.search(new RegExp(new SetOfGerminatedConsonants().toString())) == 0) return true

        return false
    }

    private convert(entry: string[]) {
        // convert strings in an entry to sounds
        // ex: a.medial -> ps_A.medial
        let ret: Array<Sound> = new Array()
        for(let i in entry) {
            let n = entry[i].lastIndexOf('.')
            let clasName = entry[i].slice(0, n)
            let position = entry[i].slice(n+1)
            //console.debug(entry + ' ' + clasName + ' ' + position)
            ret.push(letterClass.get(clasName)[position]) // this will call the static member of the class
        }
        return ret
    }

    generate(beginning: string) {
        let rkg = new RomanizedKanaGenerator()
        let strs: Array<string> = rkg.generate(beginning) // retrieve all needed syllables beginning with begginning
        let arrayOfSounds: Array<string[]> = new Array() // collecting all sounds to be processed
        let turner = new KanaTurner()
        let entries: Array<Sound[]> = new Array() // to be returned

        for(let i in strs) {
            // generates all needed sounds to be processed
            let gs = turner.turnIntoGraphemes(strs[i])
            let ls: string[] = []
            for(let j in gs) {
                ls.push(gs[j].letter.literal)
            }

            let sounds: string[] = []

            // analyze vowels which have no leading consonants
            // pass 0 as index to indicate it has no leading consonants
            sounds = this.analyzeAfterInitialConsonants(ls, sounds, 0)

            if(this.isGerminatedConsonant(ls[0]) && ls.length > 1 && this.isInitialConsonant(ls[1])) {
                sounds.push(ls[0] + '.germinatedConsonant')
                sounds.push(ls[1] + '.initialConsonant')
                if(ls.length > 2) sounds = this.analyzeAfterInitialConsonants(ls, sounds, 2)
            } else if(this.isInitialConsonant(ls[0])) {
                // analyze initial consonants
                sounds.push(ls[0] + '.initialConsonant')
                if(this.isVowel(ls[1]) || this.isSemivowel(ls[1])) {
                    // consonants followed by vowels
                    sounds = this.analyzeAfterInitialConsonants(ls, sounds, sounds.length)
                }
            }

            arrayOfSounds.push(sounds)
        }

        for(let k = 0; k < arrayOfSounds.length; k++) {
            entries.push(this.convert(arrayOfSounds[k]))
        }

        return entries
    }
}

//------------------------------------------------------------------------------
//  Alphabet
//------------------------------------------------------------------------------

export let lowerLettersOfKana: ILetters = {
    // vowels
    'a': new AlphabeticLetter([characters.get('a')]),
    'e': new AlphabeticLetter([characters.get('e')]),
    'i': new AlphabeticLetter([characters.get('i')]),
    'o': new AlphabeticLetter([characters.get('o')]),
    'u': new AlphabeticLetter([characters.get('u')]),

    // consonants
    'b': new AlphabeticLetter([characters.get('b')]),
    'c': new AlphabeticLetter([characters.get('c')]),
    'd': new AlphabeticLetter([characters.get('d')]),
    'dl': new AlphabeticLetter([characters.get('d'), characters.get('l')]),
    'f': new AlphabeticLetter([characters.get('f')]),
    'g': new AlphabeticLetter([characters.get('g')]),
    'h': new AlphabeticLetter([characters.get('h')]),
    'j': new AlphabeticLetter([characters.get('j')]),
    'k': new AlphabeticLetter([characters.get('k')]),
    'l': new AlphabeticLetter([characters.get('l')]),
    'm': new AlphabeticLetter([characters.get('m')]),
    'q': new AlphabeticLetter([characters.get('q')]),
    's': new AlphabeticLetter([characters.get('s')]),
    'v': new AlphabeticLetter([characters.get('v')]),
    'z': new AlphabeticLetter([characters.get('z')]),
    'p': new AlphabeticLetter([characters.get('p')]),
    't': new AlphabeticLetter([characters.get('t')]),

    // semivowels
    'w': new AlphabeticLetter([characters.get('w')]),
    'y': new AlphabeticLetter([characters.get('y')]),

    'n': new AlphabeticLetter([characters.get('n')]),
}

//------------------------------------------------------------------------------
//  Sound
//------------------------------------------------------------------------------

class GerminatedConsonant extends Sound {name = 'germinatedConsonant'}
class InitialConsonant extends Sound {name = 'initialConsonant'}
class Semivowel extends Sound {name = 'semivowel'}
class Vowel extends Sound {name = 'vowel'}
class FinalConsonant extends Sound {name = 'finalConsonant'}

class InitialConsonantB extends InitialConsonant {characters = [characters.get('b')]}
class InitialConsonantC extends InitialConsonant {characters = [characters.get('c')]}
class InitialConsonantD extends InitialConsonant {characters = [characters.get('d')]}
class InitialConsonantDL extends InitialConsonant {characters = [characters.get('d'), characters.get('l')]}
class InitialConsonantF extends InitialConsonant {characters = [characters.get('f')]}
class InitialConsonantG extends InitialConsonant {characters = [characters.get('g')]}
class InitialConsonantH extends InitialConsonant {characters = [characters.get('h')]}
class InitialConsonantJ extends InitialConsonant {characters = [characters.get('j')]}
class InitialConsonantK extends InitialConsonant {characters = [characters.get('k')]}
class InitialConsonantL extends InitialConsonant {characters = [characters.get('l')]}
class InitialConsonantM extends InitialConsonant {characters = [characters.get('m')]}
class InitialConsonantN extends InitialConsonant {characters = [characters.get('n')]}
class InitialConsonantP extends InitialConsonant {characters = [characters.get('p')]}
class InitialConsonantQ extends InitialConsonant {characters = [characters.get('q')]}
class InitialConsonantS extends InitialConsonant {characters = [characters.get('s')]}
class InitialConsonantT extends InitialConsonant {characters = [characters.get('t')]}
class InitialConsonantV extends InitialConsonant {characters = [characters.get('v')]}
class InitialConsonantZ extends InitialConsonant {characters = [characters.get('z')]}

class SemivowelW extends Semivowel {characters = [characters.get('w')]}
class SemivowelY extends Semivowel {characters = [characters.get('y')]}

class VowelA extends Vowel {characters = [characters.get('a')]}
class VowelE extends Vowel {characters = [characters.get('e')]}
class VowelI extends Vowel {characters = [characters.get('i')]}
class VowelO extends Vowel {characters = [characters.get('o')]}
class VowelU extends Vowel {characters = [characters.get('u')]}

class FinalConsonantN extends FinalConsonant {characters = [characters.get('n')]}

class GerminatedConsonantK extends GerminatedConsonant {characters = [characters.get('k')]}
class GerminatedConsonantC extends GerminatedConsonant {characters = [characters.get('c')]}
class GerminatedConsonantP extends GerminatedConsonant {characters = [characters.get('p')]}
class GerminatedConsonantT extends GerminatedConsonant {characters = [characters.get('t')]}

class SetOfInitialConsonants extends SetOfSounds {
    initialConsonants: Array<InitialConsonant> = new Array()
    constructor() {
        super()
        this.initialConsonants.push(new InitialConsonantB())
        this.initialConsonants.push(new InitialConsonantC())
        this.initialConsonants.push(new InitialConsonantD())
        this.initialConsonants.push(new InitialConsonantDL())
        this.initialConsonants.push(new InitialConsonantF())
        this.initialConsonants.push(new InitialConsonantG())
        this.initialConsonants.push(new InitialConsonantH())
        this.initialConsonants.push(new InitialConsonantJ())
        this.initialConsonants.push(new InitialConsonantK())
        this.initialConsonants.push(new InitialConsonantL())
        this.initialConsonants.push(new InitialConsonantM())
        this.initialConsonants.push(new InitialConsonantN())
        this.initialConsonants.push(new InitialConsonantP())
        this.initialConsonants.push(new InitialConsonantQ())
        this.initialConsonants.push(new InitialConsonantS())
        this.initialConsonants.push(new InitialConsonantT())
        this.initialConsonants.push(new InitialConsonantV())
        this.initialConsonants.push(new InitialConsonantZ())
    }

    toString() {
        return super.toString(this.initialConsonants)
    }
}

class SetOfVowels extends SetOfSounds {
    vowels: Array<Vowel> = new Array()
    constructor() {
        super()
        this.vowels.push(new VowelA())
        this.vowels.push(new VowelI())
        this.vowels.push(new VowelU())
        this.vowels.push(new VowelE())
        this.vowels.push(new VowelO())
    }

    toString() {
        return super.toString(this.vowels)
    }
}

class SetOfFinalConsonants extends SetOfSounds {
    finalConsonants: Array<FinalConsonant> = new Array()
    constructor() {
        super()
        this.finalConsonants.push(new FinalConsonantN())
    }

    toString() {
        return super.toString(this.finalConsonants)
    }
}

class SetOfGerminatedConsonants extends SetOfSounds {
    theGerminated: Array<GerminatedConsonant> = new Array()
    constructor() {
        super()
        this.theGerminated.push(new GerminatedConsonantC())
        this.theGerminated.push(new GerminatedConsonantK())
        this.theGerminated.push(new GerminatedConsonantP())
        this.theGerminated.push(new GerminatedConsonantT())
    }

    toString() {
        return super.toString(this.theGerminated)
    }
}

class SetOfSemivowels extends SetOfSounds {
    semivowels: Array<Semivowel> = new Array()
    constructor() {
        super()
        this.semivowels.push(new SemivowelW())
        this.semivowels.push(new SemivowelY())        
    }

    toString() {
        return super.toString(this.semivowels)
    }
}

//------------------------------------------------------------------------------
//  Positional Sound for Romanized Kana
//------------------------------------------------------------------------------

interface ISound {
    name: string
    germinatedConsonant: GerminatedConsonant
    initialConsonant: InitialConsonant
    semivowel: Semivowel
    vowel: Vowel
    finalConsonant: FinalConsonant
}

type PartialISound = Partial<ISound>

//------------------------------------------------------------------------------
//  Positional Sound for Romanized Kana
//------------------------------------------------------------------------------

class ps_A implements PartialISound {
    static vowel: Vowel = new VowelA()
}

class ps_B implements PartialISound {
    static initialConsonant: InitialConsonant = new InitialConsonantB()
}

class ps_C implements PartialISound {
    static initialConsonant: InitialConsonant = new InitialConsonantC()
}

class ps_D implements PartialISound {
    static initialConsonant: InitialConsonant = new InitialConsonantD()
}

class ps_DL implements PartialISound {
    static initialConsonant: InitialConsonant = new InitialConsonantDL()
}

class ps_E implements PartialISound {
    static vowel: Vowel = new VowelE()
}

class ps_F implements PartialISound {
    static initialConsonant: InitialConsonant = new InitialConsonantF()
}

class ps_G implements PartialISound {
    static initialConsonant: InitialConsonant = new InitialConsonantG()
}

class ps_H implements PartialISound {
    static initialConsonant: InitialConsonant = new InitialConsonantH()
}

class ps_I implements PartialISound {
    static vowel: Vowel = new VowelI()
}

class ps_J implements PartialISound {
    static initialConsonant: InitialConsonant = new InitialConsonantJ()
}

class ps_K implements PartialISound {
    static germinatedConsonant: GerminatedConsonant = new GerminatedConsonantK()
    static initialConsonant: InitialConsonant = new InitialConsonantK()
}

class ps_L implements PartialISound {
    static initialConsonant: InitialConsonant = new InitialConsonantL()
}

class ps_M implements PartialISound {
    static initialConsonant: InitialConsonant = new InitialConsonantM()
}

class ps_N implements PartialISound {
    static initialConsonant: InitialConsonant = new InitialConsonantN()
    static finalConsonant: FinalConsonant = new FinalConsonantN()
}

class ps_O implements PartialISound {
    static vowel: Vowel = new VowelO()
}

class ps_P implements PartialISound {
    static initialConsonant: InitialConsonant = new InitialConsonantP()
}

class ps_Q implements PartialISound {
    static initialConsonant: InitialConsonant = new InitialConsonantQ()
}

class ps_S implements PartialISound {
    static initialConsonant: InitialConsonant = new InitialConsonantS()
}

class ps_T implements PartialISound {
    static initialConsonant: InitialConsonant = new InitialConsonantT()
}

class ps_U implements PartialISound {
    static vowel: Vowel = new VowelU()
}

class ps_V implements PartialISound {
    static initialConsonant: InitialConsonant = new InitialConsonantV()
}

class ps_W implements PartialISound {
    static semivowel: Semivowel = new SemivowelW()
}

class ps_Y implements PartialISound {
    static semivowel: Semivowel = new SemivowelY()
}

class ps_Z implements PartialISound {
    static initialConsonant: InitialConsonant = new InitialConsonantZ()
}

//------------------------------------------------------------------------------
//  Letter Class
//------------------------------------------------------------------------------

// need to verify the size of the map
export const letterClass: Map<string, PartialISound> = new Map()
    .set('a', ps_A)
    .set('b', ps_B)
    .set('c', ps_C)
    .set('d', ps_D)
    .set('dl', ps_DL)
    .set('e', ps_E)
    .set('f', ps_F)
    .set('g', ps_G)
    .set('h', ps_H)
    .set('i', ps_I)
    .set('j', ps_J)
    .set('k', ps_K)
    .set('l', ps_L)
    .set('m', ps_M)
    .set('n', ps_N)
    .set('o', ps_O)
    .set('p', ps_P)
    .set('q', ps_Q)
    .set('s', ps_S)
    .set('t', ps_T)
    .set('u', ps_U)
    .set('v', ps_V)
    .set('w', ps_W)
    .set('y', ps_Y)
    .set('z', ps_Z)

//------------------------------------------------------------------------------
//  Romanized Kana
//------------------------------------------------------------------------------

let list_of_romanized_kana = [
    'a', 'i', 'u', 'e', 'o',
    'ka', 'ki', 'ku', 'ke', 'ko',
    'qa', 'qi', 'qu', 'qe', 'qo',
    'sa', 'si', 'su', 'se', 'so',
    'ta', 'ci', 'zu', 'te', 'to',
    'da', 'de', 'do',
    'na', 'ni', 'nu', 'ne', 'no',
    'ha', 'hi', 'fu', 'he', 'ho', 
    'ma', 'mi', 'mu', 'me', 'mo',
    'ya', 'yu', 'yo',
    'la', 'li', 'lu', 'le', 'lo',
    'wa', 'wi', 'we', 'wo',
    'ga', 'gi', 'gu', 'ge', 'go',
    'ja', 'ji', 'ju', 'je', 'jo',
    'dla', 'ji', 'ju', 'dle', 'dlo',
    'ba', 'bi', 'bu', 'be', 'bo',
    'pa', 'pi', 'pu', 'pe', 'po',
    'va', 'vi', 'vu', 've', 'vo',
    'kya', 'kyu', 'kyo',
    'qya', 'qyu', 'qyo',
    'sya', 'syu', 'syo',
    'cya', 'cyu', 'cyo',
    'nya', 'nyu', 'nyo',
    'hya', 'hyu', 'hyo',
    'mya', 'myu', 'myo',
    'lya', 'lyu', 'lyo',
    'gya', 'gyu', 'gyo',
    'jya', 'jyu', 'jyo',
    'bya', 'byu', 'byo',
    'pya', 'pyu', 'pyo',
    'vya', 'vyu', 'vyo',
]