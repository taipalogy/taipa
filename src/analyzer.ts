import { PositionalSound } from './grapheme';

export abstract class Analyzer {}

export class AnalyzerWrapper {
    analyzer: Analyzer;

    constructor(analyzer: Analyzer) {
        this.analyzer = analyzer;
    }

    protected findDuplicates(map: Map<string, PositionalSound>) {
        let arr: string[] = [];
        let duplicates = [];

        // find duplicates of PositionalSound.name
        for (let e of map.values()) {
            if (e.no != e.map.size) console.debug(`size unmatched for ${e.name}`);
            arr.push(e.name);
        }

        // object of key-value pairs
        let uniq: { [key: string]: number } = arr
            .map((name: string) => {
                return { count: 1, name: name };
            })
            .reduce((a: { [key: string]: number }, b) => {
                a[b.name] = (a[b.name] || 0) + b.count;
                return a;
            }, {});

        duplicates = Object.keys(uniq).filter(a => uniq[a] > 1);

        if (duplicates.length > 0) {
            console.info('number of duplicates found: %d', duplicates.length);
            console.info(duplicates);
        }
    }
}
