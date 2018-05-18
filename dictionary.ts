class Entry {
    partOfSpeech: string;
    hanji: string;
}

interface Dictionary {
    readonly [index: string]: Array<Entry>
}

let map: Dictionary = {'a': new Array<Entry>(), 'b': new Array<Entry>()};

// hawsau/hawsa/hazssa
// vuannysauw
// 着多欵