import { AnalyzerWrapper } from '../analyzer'
import { KanaAnalyzer } from './analyzer';
import { letterClass, lowerLettersOfKana, Hatsuon, kogakimoji } from './kana'
import { SetOfFinalConsonants } from './kana'
import { KanaUncombiningMorpheme } from './morpheme'
import { HiraganaAndKatakana } from './kana'

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
        let arr = [];
        let duplicates = [];

        for (let e of letterClass.values()) {
            arr.push(e.name)
        }
        
        let uniq = arr
            .map((name) => {
                return {count: 1, name: name}
            })
            .reduce((a, b) => {
                a[b.name] = (a[b.name] || 0) + b.count
                return a
            }, {})

        duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1)

        if(duplicates.length > 0) {
            console.log('number of duplicates found: %d', duplicates.length)
            console.log(duplicates)
        }
    }

    getBlocks(ms: KanaUncombiningMorpheme[]) {
        let kanas = ''

        for(let e of ms) {
            let ks = HiraganaAndKatakana.get(e.syllable.literal)
            if(ks != undefined && ks[0] != undefined) {
                // in case the kana is absent, we check against ks[0]
                kanas += ks[0]
            } else if(new SetOfFinalConsonants().beginWith(e.syllable.literal[e.syllable.literal.length-1]) == true) {
                ks = HiraganaAndKatakana.get(e.syllable.literal.substring(0, e.syllable.literal.length-1))
                if(ks != undefined && ks[0] != undefined) {
                    kanas += ks[0]
                }
                if(new Hatsuon().beginWith(e.syllable.literal[e.syllable.literal.length-1])) {
                    kanas += HiraganaAndKatakana.get(new Hatsuon().hatsuon[0].getLiteral())[0]
                } else {
                    kanas += kogakimoji.get("chu")[0]
                }
            }
        }
        
        return kanas
    }
}