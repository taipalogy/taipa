import { Letters, Letter } from './metadata';

class SyllableEntry {
    literal: string = '';
    stem: string = '';
    tonemark: string = '';

    constructor(stem: Array<Letter>, tonemark?: Array<Letter>) {
        for(var i = 0; i < stem.length; i++) {
            this.stem += stem[i].literal;
            this.literal += stem[i].literal;
        }

        for(var i = 0; i < tonemark.length; i++) {
            this.tonemark += tonemark[i].literal;
            this.literal += tonemark[i].literal;
        }
    }
}

class SyllableTable {
    syllableA;
    syllableAy;

    constructor(letters: Letters){
        this.syllableA = new SyllableEntry([letters.lowerLetterA]);
        this.syllableAy = new SyllableEntry([letters.lowerLetterA], [letters.lowerLetterY]);

    }
}