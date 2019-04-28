import { AnalyzerWrapper } from '../analyzer'
import { KanaAnalyzer } from './analyzer';
import { letterClass, lowerLettersOfKana } from './kana'
import { SetOfFinalConsonants } from './kana'
import { KanaLemmaMorpheme } from './morpheme'

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

    getBlocks(ms: KanaLemmaMorpheme[]) {
        
        if(new SetOfFinalConsonants().beginWith(ms[0].syllable.literal[ms[0].syllable.literal.length-1]) == true) {
            console.log('っ')
        }
        return ''
    }
}