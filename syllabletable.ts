import { Letters, Letter } from './metadata';


//------------------------------------------------------------------------------
//  typescript interface, allomorphemic syllables, tonemarkless syllables, table
//------------------------------------------------------------------------------

class SyllableEntry {
    literal: string = '';
    stem: string = '';
    tonemark: string = '';

    constructor(stem: Array<Letter>, tonemark?: Array<Letter>) {
        for (let entry of stem) {
            this.stem += entry.literal;
            this.literal += entry.literal;
        }

        for (let entry of tonemark) {
            this.tonemark += entry.literal;
            this.literal += entry.literal;
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