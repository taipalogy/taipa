import { Sound, SetOfSounds } from '../grapheme'
import { KanaAnalyzer } from './analyzer';
import { characters } from '../character'
import { AlphabeticLetter, ILetters } from '../grapheme'
import { Syllabary } from '../morpheme'

export class RomanizedKana extends Syllabary {
    list: Array<Sound[]>
    setFirstLetter(beginning: string) {
        this.list = new Array()
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
                // sokuon
                strs.push(list_of_romanized_kana[i] + 'k')
            }
        }
        //for(let i in strs) console.info(strs[i])
        return strs
    }
}

function isSokuon(str: string) {
    return false
}

function getKanas(str: string) {
    if(isSokuon(str)) {}
}

class ClientOfGenerator {
    private analyzeAfterVowels(ls: string[], sounds: string[], index: number): string[] {
        if(this.isFinalConsonant(ls[index])) {
            sounds.push(ls[index] + '.finalConsonant')
        }
        return sounds
    }

    private analyzeAfterInitialConsonants(ls: string[], sounds: string[], index: number): string[] {
        let sbool = this.isSemivowel(ls[index])
        let vbool = this.isVowel(ls[index])
        if(sbool) {
            sounds.push(ls[index] + '.semivowel')
            if(this.isVowel(ls[index+1])) {
                sounds.push(ls[index+1] + '.vowel')
            }
        } else if(vbool) {
            let k = index
            while(k < ls.length) {
                if(this.isVowel(ls[k])) {
                    sounds.push(ls[k] + '.vowel')
                }
                k++
            }
        }

        if(sbool || vbool) {
            if(ls.length > sounds.length) {
                sounds = this.analyzeAfterVowels(ls, sounds, sounds.length)
            }
        }

        return sounds
    }

    private isInitialConsonant(str: string) {
        if(new SetOfInitialConsonants().beginWith(str) == true) return true

        return false
    }

    private isSemivowel(str: string) {
        if(new SetOfSemivowels().beginWith(str) == true) return true

        return false
    }

    private isVowel(str: string) {
        if(new SetOfVowels().beginWith(str) == true) return true

        return false
    }

    private isGerminatedConsonant(str: string) {
        if(new SetOfGerminatedConsonants().beginWith(str) == true) return true

        return false
    }

    private isFinalConsonant(str: string) {
        if(new SetOfFinalConsonants().beginWith(str) == true) return true

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
            let o = new Object()
            o = Object.assign({}, letterClass.get(clasName))
            if(o.hasOwnProperty(position)) {
                ret.push(letterClass.get(clasName)[position]) // this will call the static member of the class
            }
        }
        return ret
    }

    generate(beginning: string) {
        let rkg = new RomanizedKanaGenerator()
        let strs: Array<string> = rkg.generate(beginning) // retrieve all needed syllables beginning with begginning
        let arrayOfSounds: Array<string[]> = new Array() // collecting all sounds to be processed
        let turner = new KanaAnalyzer()
        let entries: Array<Sound[]> = new Array() // to be returned

        for(let i in strs) {
            // generates all needed sounds to be processed
            let output = turner.getGraphemicAnalysisResults(strs[i])
            let ls: string[] = []
            for(let j in output.graphemes) {
                ls.push(output.graphemes[j].letter.literal)
            }

            let sounds: string[] = []

            // analyze vowels which have no leading consonants
            // pass 0 as index to indicate it has no leading consonants
            sounds = this.analyzeAfterInitialConsonants(ls, sounds, 0)

            if((this.isInitialConsonant(ls[0]) || this.isGerminatedConsonant(ls[0])) && ls.length > 1) {

                if(this.isVowel(ls[1]) || this.isSemivowel(ls[1])) {
                    // analyze initial consonants
                    sounds.push(ls[0] + '.initialConsonant')
                    // consonants followed by vowels
                    sounds = this.analyzeAfterInitialConsonants(ls, sounds, sounds.length)
                } else if(this.isInitialConsonant(ls[1])) {
                    sounds.push(ls[0] + '.germinatedConsonant')
                    sounds.push(ls[1] + '.initialConsonant')
                    if(ls.length > 2) sounds = this.analyzeAfterInitialConsonants(ls, sounds, 2)
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
    'ch': new AlphabeticLetter([characters.get('c'), characters.get('h')]),
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
class InitialConsonantCH extends InitialConsonant {characters = [characters.get('c'), characters.get('h')]}
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

class FinalConsonantK extends FinalConsonant {characters = [characters.get('k')]}
class FinalConsonantH extends FinalConsonant {characters = [characters.get('h')]}
class FinalConsonantN extends FinalConsonant {characters = [characters.get('n')]}
class FinalConsonantP extends FinalConsonant {characters = [characters.get('p')]}
class FinalConsonantS extends FinalConsonant {characters = [characters.get('s')]}
class FinalConsonantT extends FinalConsonant {characters = [characters.get('t')]}

class GerminatedConsonantK extends GerminatedConsonant {characters = [characters.get('k')]}
class GerminatedConsonantC extends GerminatedConsonant {characters = [characters.get('c')]}
class GerminatedConsonantP extends GerminatedConsonant {characters = [characters.get('p')]}
class GerminatedConsonantS extends GerminatedConsonant {characters = [characters.get('s')]}
class GerminatedConsonantT extends GerminatedConsonant {characters = [characters.get('t')]}

export class SetOfInitialConsonants extends SetOfSounds {
    initialConsonants: Array<InitialConsonant> = new Array()
    constructor() {
        super()
        this.initialConsonants.push(new InitialConsonantB())
        this.initialConsonants.push(new InitialConsonantC())
        this.initialConsonants.push(new InitialConsonantCH())
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
        return super.toRegexString(this.initialConsonants)
    }
}

export class SetOfVowels extends SetOfSounds {
    vowels: Array<Vowel> = new Array()
    constructor() {
        super()
        this.vowels.push(new VowelA())
        this.vowels.push(new VowelI())
        this.vowels.push(new VowelU())
        this.vowels.push(new VowelE())
        this.vowels.push(new VowelO())
    }

    beginWith(str: string) {
        if(str.search(new RegExp(this.toString())) == 0) return true
        return false
    }

    toString() {
        return super.toRegexString(this.vowels)
    }
}

class SetOfGerminatedConsonants extends SetOfSounds {
    theGerminated: Array<GerminatedConsonant> = new Array()
    constructor() {
        super()
        this.theGerminated.push(new GerminatedConsonantC())
        this.theGerminated.push(new GerminatedConsonantK())
        this.theGerminated.push(new GerminatedConsonantP())
        this.theGerminated.push(new GerminatedConsonantS())
        this.theGerminated.push(new GerminatedConsonantT())
    }

    toString() {
        return super.toRegexString(this.theGerminated)
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
        return super.toRegexString(this.semivowels)
    }
}

export class SetOfFinalConsonants extends SetOfSounds {
    finalConsonants: Array<FinalConsonant> = new Array()
    constructor() {
        super()
        this.finalConsonants.push(new FinalConsonantK())
        this.finalConsonants.push(new FinalConsonantP())
        this.finalConsonants.push(new FinalConsonantS())
        this.finalConsonants.push(new FinalConsonantT())
    }
/*
    beginWith(str: string) {
        if(str.search(new RegExp(this.toString())) == 0) return true
        return false
    }
*/
    toString() {
        return super.toRegexString(this.finalConsonants)
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

class PSA implements PartialISound {
    name = 'a'
    vowel: Vowel = new VowelA()
}

class PSB implements PartialISound {
    name = 'b'
    initialConsonant: InitialConsonant = new InitialConsonantB()
}

class PSC implements PartialISound {
    name = 'c'
    germinatedConsonant: GerminatedConsonant = new GerminatedConsonantC()
    initialConsonant: InitialConsonant = new InitialConsonantC()
}

class PSCH implements PartialISound {
    name = 'ch'
    initialConsonant: InitialConsonant = new InitialConsonantCH()
}

class PSD implements PartialISound {
    name = 'd'
    initialConsonant: InitialConsonant = new InitialConsonantD()
}

class PSDL implements PartialISound {
    name = 'dl'
    initialConsonant: InitialConsonant = new InitialConsonantDL()
}

class PSE implements PartialISound {
    name = 'e'
    vowel: Vowel = new VowelE()
}

class PSF implements PartialISound {
    name = 'f'
    initialConsonant: InitialConsonant = new InitialConsonantF()
}

class PSG implements PartialISound {
    name = 'g'
    initialConsonant: InitialConsonant = new InitialConsonantG()
}

class PSH implements PartialISound {
    name = 'h'
    initialConsonant: InitialConsonant = new InitialConsonantH()
}

class PSI implements PartialISound {
    name = 'i'
    vowel: Vowel = new VowelI()
}

class PSJ implements PartialISound {
    name = 'j'
    initialConsonant: InitialConsonant = new InitialConsonantJ()
}

class PSK implements PartialISound {
    name = 'k'
    germinatedConsonant: GerminatedConsonant = new GerminatedConsonantK()
    initialConsonant: InitialConsonant = new InitialConsonantK()
    finalConsonant: FinalConsonant = new FinalConsonantK()
}

class PSL implements PartialISound {
    name = 'l'
    initialConsonant: InitialConsonant = new InitialConsonantL()
}

class PSM implements PartialISound {
    name = 'm'
    initialConsonant: InitialConsonant = new InitialConsonantM()
}

class PSN implements PartialISound {
    name = 'n'
    initialConsonant: InitialConsonant = new InitialConsonantN()
}

class PSO implements PartialISound {
    name = 'o'
    vowel: Vowel = new VowelO()
}

class PSP implements PartialISound {
    name = 'p'
    initialConsonant: InitialConsonant = new InitialConsonantP()
}

class PSQ implements PartialISound {
    name = 'q'
    initialConsonant: InitialConsonant = new InitialConsonantQ()
}

class PSS implements PartialISound {
    name = 's';
    germinatedConsonant: GerminatedConsonant = new GerminatedConsonantS();
    initialConsonant: InitialConsonant = new InitialConsonantS();
}

class PST implements PartialISound {
    name = 't'
    initialConsonant: InitialConsonant = new InitialConsonantT()
}

class PSU implements PartialISound {
    name = 'u'
    vowel: Vowel = new VowelU()
}

class PSV implements PartialISound {
    name = 'v'
    initialConsonant: InitialConsonant = new InitialConsonantV()
}

class PSW implements PartialISound {
    name = 'w'
    semivowel: Semivowel = new SemivowelW()
}

class PSY implements PartialISound {
    name = 'y'
    semivowel: Semivowel = new SemivowelY()
}

class PSZ implements PartialISound {
    name = 'z'
    initialConsonant: InitialConsonant = new InitialConsonantZ()
}

//------------------------------------------------------------------------------
//  Letter Class
//------------------------------------------------------------------------------

export const letterClass: Map<string, PartialISound> = new Map()
    .set('a', new PSA())
    .set('b', new PSB())
    .set('c', new PSC())
    .set('ch', new PSCH())
    .set('d', new PSD())
    .set('dl', new PSDL())
    .set('e', new PSE())
    .set('f', new PSF())
    .set('g', new PSG())
    .set('h', new PSH())
    .set('i', new PSI())
    .set('j', new PSJ())
    .set('k', new PSK())
    .set('l', new PSL())
    .set('m', new PSM())
    .set('n', new PSN())
    .set('o', new PSO())
    .set('p', new PSP())
    .set('q', new PSQ())
    .set('s', new PSS())
    .set('t', new PST())
    .set('u', new PSU())
    .set('v', new PSV())
    .set('w', new PSW())
    .set('y', new PSY())
    .set('z', new PSZ())

//------------------------------------------------------------------------------
//  Romanized Kana
//------------------------------------------------------------------------------

export const HiraganaAndKatakana: Map<string, Array<string>> = new Map()
    .set('a', ['あ', 'ア'])
    .set('i', ['い', 'イ'])
    .set('u', ['う', 'ウ'])
    .set('e', ['え', 'エ'])
    .set('o', ['お', 'オ'])
    .set('ka', ['か', 'カ'])
    .set('ki', ['き', 'キ'])
    .set('ku', ['く', 'ク'])
    .set('ke', ['け', 'ケ'])
    .set('ko', ['こ', 'コ'])
    .set('qa', [])
    .set('qi', [])
    .set('qu', [])
    .set('qe', [])
    .set('qo', [])
    .set('sa', ['さ'])
    .set('si', ['し'])
    .set('su', ['す'])
    .set('se', ['せ'])
    .set('so', ['そ'])
    .set('ta', ['た', 'タ'])
    .set('ci', ['ち', 'チ'])
    .set('chu', ['つ', 'ツ'])
    .set('te', ['て', 'テ'])
    .set('to', ['と', 'ト'])
    .set('da', [])
    .set('de', [])
    .set('do', [])
    .set('na', ['な', 'ナ'])
    .set('ni', ['に', 'ニ'])
    .set('nu', ['ぬ', 'ヌ'])
    .set('ne', ['ね', 'ネ'])
    .set('no', ['の', 'ノ'])
    .set('ha', ['は', 'ハ'])
    .set('hi', ['ひ', 'ヒ'])
    .set('fu', ['ふ', 'フ'])
    .set('he', ['へ', 'ヘ'])
    .set('ho', ['ほ', 'ホ'])
    .set('ma', ['ま', 'マ'])
    .set('mi', ['み', 'ミ'])
    .set('mu', ['む', 'ム'])
    .set('me', ['め', 'メ'])
    .set('mo', ['も', 'モ'])
    .set('ya', ['や', 'ヤ'])
    .set('yu', ['ゆ', 'ユ'])
    .set('yo', ['よ', 'ヨ'])
    .set('la', ['ら', 'ラ'])
    .set('li', ['り', 'リ'])
    .set('lu', ['る', 'ル'])
    .set('le', ['れ', 'レ'])
    .set('lo', ['ろ', 'ロ'])
    .set('wa', ['わ', 'ワ'])
    .set('wi', ['ゐ', 'ヰ'])
    .set('we', ['ゑ', 'ヱ'])
    .set('wo', ['を', 'ヲ'])
    .set('ga', ['が', 'ガ'])
    .set('gi', ['ぎ', 'ギ'])
    .set('gu', ['ぐ', 'グ'])
    .set('ge', ['げ', 'ゲ'])
    .set('go', ['ご', 'ゴ'])
    .set('za', ['ざ', 'ザ'])
    .set('ji', ['じ', 'ジ'])
    .set('zu', ['ず', 'ズ'])
    .set('ze', ['ぜ', 'ゼ'])
    .set('zo', ['ぞ', 'ゾ'])
    .set('dla', ['だ', 'ダ'])
    .set('dle', ['で', 'デ'])
    .set('dlo', ['ど', 'ド'])
    .set('ba', ['ば', 'バ'])
    .set('bi', ['び', 'ビ'])
    .set('bu', ['ぶ', 'ブ'])
    .set('be', ['べ', 'ベ'])
    .set('bo', ['ぼ', 'ボ'])
    .set('pa', ['ぱ', 'パ'])
    .set('pi', ['ぴ', 'ピ'])
    .set('pu', ['ぷ', 'プ'])
    .set('pe', ['ぺ', 'ペ'])
    .set('po', ['ぽ', 'ポ'])
    .set('va', [])
    .set('vi', [])
    .set('vu', ['ゔ', 'ヴ'])
    .set('ve', [])
    .set('vo', [])
    .set('kya', ['きゃ', 'キャ'])
    .set('kyu', ['きゅ', 'キュ'])
    .set('kyo', ['きょ', 'キョ'])
    .set('qya', [])
    .set('qyu', [])
    .set('qyo', [])
    .set('sya', ['しゃ', 'シャ'])
    .set('syu', ['しゅ', 'シュ'])
    .set('syo', ['しょ', 'ショ'])
    .set('cya', ['ちゃ', 'チャ'])
    .set('cyu', ['ちゅ', 'チュ'])
    .set('cyo', ['ちょ', 'チョ'])
    .set('nya', ['にゃ', 'ニャ'])
    .set('nyu', ['にゅ', 'ニュ'])
    .set('nyo', ['にょ', 'ニョ'])
    .set('hya', ['ひゃ', 'ヒャ'])
    .set('hyu', ['ひゅ', 'ヒュ'])
    .set('hyo', ['ひょ', 'ヒョ'])
    .set('mya', ['みゃ', 'ミャ'])
    .set('myu', ['みゅ', 'みょ'])
    .set('myo', ['ミュ', 'ミョ'])
    .set('lya', ['りゃ', 'リャ'])
    .set('lyu', ['りゅ', 'リュ'])
    .set('lyo', ['りょ', 'リョ'])
    .set('gya', ['ぎゃ', 'ギャ'])
    .set('gyu', ['ぎゅ', 'ギュ'])
    .set('gyo', ['ぎょ', 'ギョ'])
    .set('jya', ['じゃ', 'ジャ'])
    .set('jyu', ['じゅ', 'ジュ'])
    .set('jyo', ['じょ', 'ジョ'])
    .set('bya', ['びゃ', 'ビャ'])
    .set('byu', ['びゅ', 'ビュ'])
    .set('byo', ['びょ', 'ビョ'])
    .set('pya', ['ぴゃ', 'ピャ'])
    .set('pyu', ['ぴゅ', 'ピュ'])
    .set('pyo', ['ぴょ', 'ピョ'])
    .set('vya', [])
    .set('vyu', [])
    .set('vyo', [])

let list_of_romanized_kana = Array.from(HiraganaAndKatakana.keys())
