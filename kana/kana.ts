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
                strs.push(list_of_romanized_kana[i] + list_of_romanized_kana[i][list_of_romanized_kana.length-1])
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
        if(this.isVowel(ls[index])) {
            let k = index
            while(k < ls.length) {
                if(this.isVowel(ls[k])) {
                    sounds.push(ls[k] + '.vowel')
                }
                k++
            }

            if(ls.length > sounds.length) {
                sounds = this.analyzeAfterVowels(ls, sounds, sounds.length)
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

    private convert(entry: string[]) {
        // convert strings in an entry to sounds
        // ex: a.medial -> PSA.medial
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

            // analyze vowels, which have null initial consonants
            // pass 0 as index to indicate it has null initial consonants
            sounds = this.analyzeAfterInitialConsonants(ls, sounds, 0)

            if(this.isInitialConsonant(ls[0])) {
                // analyze initial consonants
                sounds.push(ls[0] + '.initialConsonant')
                if(this.isVowel(ls[1])) {
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
    'k': new AlphabeticLetter([characters.get('k')]),
    'p': new AlphabeticLetter([characters.get('p')]),
    't': new AlphabeticLetter([characters.get('t')]),
}

//------------------------------------------------------------------------------
//  Sound
//------------------------------------------------------------------------------

class InitialConsonant extends Sound {name = 'initialConsonant'}
class Vowel extends Sound {name = 'vowel'}
class FinalConsonant extends Sound {name = 'finalConsonant'}

class InitialConsonantK extends InitialConsonant {characters = [characters.get('k')]}
class InitialConsonantP extends InitialConsonant {characters = [characters.get('p')]}
class InitialConsonantS extends InitialConsonant {characters = [characters.get('s')]}
class InitialConsonantT extends InitialConsonant {characters = [characters.get('t')]}

class VowelA extends Vowel {characters = [characters.get('a')]}
class VowelI extends Vowel {characters = [characters.get('i')]}
class VowelU extends Vowel {characters = [characters.get('u')]}
class VowelE extends Vowel {characters = [characters.get('e')]}
class VowelO extends Vowel {characters = [characters.get('o')]}

class FinalConsonantK extends FinalConsonant {characters = [characters.get('k')]}
class FinalConsonantN extends FinalConsonant {characters = [characters.get('n')]}

class SetOfInitialConsonants extends SetOfSounds {
    initialConsonants: Array<InitialConsonant> = new Array()
    constructor() {
        super()
        this.initialConsonants.push(new InitialConsonantK())
        this.initialConsonants.push(new InitialConsonantP())
        this.initialConsonants.push(new InitialConsonantS())
        this.initialConsonants.push(new InitialConsonantT())
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
        this.finalConsonants.push(new FinalConsonantK())
        this.finalConsonants.push(new FinalConsonantN())
    }

    toString() {
        return super.toString(this.finalConsonants)
    }
}

//------------------------------------------------------------------------------
//  Positional Sound for Romanized Kana
//------------------------------------------------------------------------------

interface PositionalSound {
    initialConsonant: InitialConsonant
    vowel: Vowel
    finalConsonant: FinalConsonant
}

type PartialPositionalSound = Partial<PositionalSound>

//------------------------------------------------------------------------------
//  Positional Sound for Romanized Kana
//------------------------------------------------------------------------------

class PSA implements PartialPositionalSound {
    static vowel: Vowel = new VowelA()
}

class PSE implements PartialPositionalSound {
    static vowel: Vowel = new VowelE()
}

class PSI implements PartialPositionalSound {
    static vowel: Vowel = new VowelI()
}

class PSK implements PartialPositionalSound {
    static initialConsonant: InitialConsonant = new InitialConsonantK()
    static finalConsonant: FinalConsonant = new FinalConsonantK()
}

class PSO implements PartialPositionalSound {
    static vowel: Vowel = new VowelO()
}

let p = { initialConsonant: new InitialConsonantP() }

class PSU implements PartialPositionalSound {
    static vowel: Vowel = new VowelU()
}

//------------------------------------------------------------------------------
//  Letter Class
//------------------------------------------------------------------------------

// need to verify the size of the map
const letterClass: Map<string, PartialPositionalSound> = new Map()
    .set('a', PSA)
    .set('e', PSE)
    .set('i', PSI)
    .set('k', PSK)
    .set('o', PSO)
    .set('p', p)
    .set('u', PSU)

//------------------------------------------------------------------------------
//  Romanized Kana
//------------------------------------------------------------------------------

let list_of_romanized_kana = [
    'a', 'i', 'u', 'e', 'o',
    'ka', 'ki', 'ku', 'ke', 'ko',
    'pa',
]