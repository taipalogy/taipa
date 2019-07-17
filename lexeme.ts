import { Syllable, Morpheme } from './morpheme';
import { TonalSyllable } from './tonal/morpheme';
import { TonalWord, InflectionalEnding } from './tonal/lexeme';


//------------------------------------------------------------------------------
//  Metaplasm
//------------------------------------------------------------------------------

export abstract class Metaplasm {}

export class TonalInflectingMetaplasm extends Metaplasm {
    apply(word: TonalWord, morphemes: Array<Morpheme>, inflectionalEnding: InflectionalEnding) {}
}

export class TonalLemmatizingMetaplasm extends Metaplasm {
    apply(word: TonalWord, morphemes: Array<Morpheme>, inflectionalEnding: InflectionalEnding) {}
}

//------------------------------------------------------------------------------
//  Lexeme
//------------------------------------------------------------------------------

export abstract class Lexeme {
    //abstract word: Word
}
/*
export class InflexionLexeme extends Lexeme {
    //abstract word: Word = new Word
    partOfSpeech: string = ''
    metaplasm: TonalInflectingMetaplasm 
}
*/
/*
export class LemmatizationLexeme extends Lexeme {
    metaplasm: TonalLemmatizingMetaplasm
}
*/
/*
export class DummyLexeme extends InflexionLexeme {
    word: Word = new Word()
}
*/
//------------------------------------------------------------------------------
//  Word
//------------------------------------------------------------------------------

export class Word {
    literal: string = '';
    syllables: Array<Syllable>

    constructor(syllables?: Array<Syllable>) {
        if(syllables) {
            this.syllables = syllables
        } else {
            this.syllables = new Array()
        }
    }

    popSyllable() {
        // trim the literal
        let tmp = this.literal.substr(0, this.literal.length-this.syllables[this.syllables.length-1].literal.length);
        // assign the new literal to this.literal
        this.literal = tmp;
        // get rid off the last syllable from array
        this.syllables = this.syllables.slice(0, this.syllables.length-1);
    }

    pushSyllable(tss: Syllable) {
        this.syllables.push(tss);
        // concatenate the new syllable
        this.literal += tss.literal;
    }
}

//------------------------------------------------------------------------------
//  Lexeme Maker
//------------------------------------------------------------------------------

export abstract class LexemeMaker {
    abstract morphemes

    preprocess() {
        // extract syllables from morphemes. concatenate syllables into a word.
        // wrap the word in a lexeme. use morephemes to populate lemmata of a lexeme.
        // assign inflectinal affix to a lexeme.
        // push the lexeme into an array of lexemes.
        // unpack morphemes and take syllables out from them
        let syllables: Array<TonalSyllable> = new Array();
        for(let key in this.morphemes) {
            syllables.push(this.morphemes[key].syllable);
        }

        return syllables
    }

    abstract make(syllables: Array<Syllable>)
}
