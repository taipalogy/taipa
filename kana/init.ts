import { Analyzer } from '../analyser'
import { KanaAnalyser } from './analyser';
import { letterClass, lowerLettersOfKana } from './kana'
import { Analyser } from '../system'

export class Kana extends Analyzer {
    analyser: Analyser = new KanaAnalyser()

    constructor() {
        super()
        this.checkSize()
        this.findDuplicates()
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
}