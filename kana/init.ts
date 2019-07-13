import { AnalyzerWrapper } from '../analyzer'
import { KanaAnalyzer } from './analyzer';
import { letterClass, lowerLettersOfKana, Hatsuon, kogakimoji, hiragana_katakana, SetOfFinalConsonants, SetOfGerminatedConsonants, SetOfInitialConsonants, hatsuon } from './kana'
import { KanaUncombiningMorpheme } from './morpheme'
import { Morpheme } from '../morpheme';

export class Kana extends AnalyzerWrapper {

    constructor() {
        super()
        this.checkSize()
        this.findDuplicates()
        super.analyzer = new KanaAnalyzer()
    }

    checkSize() {
        if(letterClass.size !== Object.keys(lowerLettersOfKana).length) {
            console.log('sizes unmatched')
        }
    }

    findDuplicates() {
        let arr: string[] = [];
        let duplicates = [];

        for (let e of letterClass.values()) {
            arr.push(e.name)
        }
        
        // object of key-value pairs
        let uniq: { [key: string]: number } = arr
            .map((name: string) => {
                return {count: 1, name: name}
            })
            .reduce((a: { [key: string]: number }, b) => {
                a[b.name] = (a[b.name] || 0) + b.count
                return a
            }, {})

        duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1)

        if(duplicates.length > 0) {
            console.log('number of duplicates found: %d', duplicates.length)
            console.log(duplicates)
        }
    }

    checkChouon(previousLetter: string, nextLetter: string): boolean {

        if(previousLetter === nextLetter) return true
        if(previousLetter === 'e' && nextLetter === 'i') return true
        if(previousLetter === 'o' && nextLetter === 'u') return true
        return false
    }

    //getBlocks(ms: KanaUncombiningMorpheme[]) {
    getBlocks(ms: Morpheme[]): string[] {
        // string one is hiragan, string two is katakana, string 3 is chouon
        let kana_compositions: [string, string, string] = ['', '', '']
        let previous = ''

        for(let e of ms) {
            let ks = hiragana_katakana.get(e.syllable.literal)
            if(ks != undefined && ks[0] != undefined) {
                // in case the kana is absent, we check against ks[0]
                kana_compositions[0] += ks[0]
                kana_compositions[1] += ks[1]
                
                if(this.checkChouon(previous[previous.length-1], e.syllable.literal[e.syllable.literal.length-1])
                    && new SetOfInitialConsonants().beginWith(e.syllable.literal) == false) {
                    kana_compositions[2] += 'ー'
                } else {
                    kana_compositions[2] += ks[1]
                }
                
            } else if(new SetOfFinalConsonants().beginWith(e.syllable.literal[e.syllable.literal.length-1]) == true) {
                ks = hiragana_katakana.get(e.syllable.literal.substring(0, e.syllable.literal.length-1))
                if(ks != undefined && ks[0] != undefined) {
                    kana_compositions[0] += ks[0]
                    kana_compositions[1] += ks[1]
                    kana_compositions[2] += ks[1]
                }
                if(new Hatsuon().beginWith(e.syllable.literal[e.syllable.literal.length-1])) {
                    ks = hatsuon.get("n")
                    if(ks) {
                        kana_compositions[0] += ks[0]
                        kana_compositions[1] += ks[1]
                        kana_compositions[2] += ks[1]
                    }
                } else {
                    ks = kogakimoji.get("chu")
                    if(ks) {
                        kana_compositions[0] += ks[0]
                        kana_compositions[1] += ks[1]
                        kana_compositions[2] += ks[1]
                    }
                }
            } else {
                let first = e.syllable.literal[0]
                let second = e.syllable.literal[1]

                if(first === second && new SetOfGerminatedConsonants().beginWith(first) == true) {
                    ks = kogakimoji.get("chu")
                    if(ks) {
                        kana_compositions[0] += ks[0]
                        kana_compositions[1] += ks[1]
                        kana_compositions[2] += ks[1]
                    }

                    ks = hiragana_katakana.get(e.syllable.literal.substring(1, e.syllable.literal.length))
                    if(ks) {
                        kana_compositions[0] += ks[0]
                        kana_compositions[1] += ks[1]
                        kana_compositions[2] += ks[1]
                    }
                }
            }

            previous = e.syllable.literal
        }
        
        // remove duplicates
        if(kana_compositions[1] === kana_compositions[2]) kana_compositions[2] = ''

        return kana_compositions
    }
}