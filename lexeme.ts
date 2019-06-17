import { Syllable } from './morpheme';
import { TonalSyllable } from './tonal/morpheme';
import { TonalInflectingMetaplasm } from './tonal/lexeme';


//------------------------------------------------------------------------------
//  Metaplasm
//------------------------------------------------------------------------------

export abstract class Metaplasm {}

//------------------------------------------------------------------------------
//  Lexeme
//------------------------------------------------------------------------------

export class Lexeme {
    word: Word
}

export class InflexionLexeme extends Lexeme {
    word: Word = new Word
    partOfSpeech: string = ''
    metaplasm: TonalInflectingMetaplasm
}

export class LemmatizationLexeme extends Lexeme {
    metaplasm: TonalInflectingMetaplasm
}

export class DummyLexeme extends InflexionLexeme {
    word: Word = new Word()
}

//------------------------------------------------------------------------------
//  Word
//------------------------------------------------------------------------------

export class Word {
    literal: string = '';
    syllables: Array<Syllable>

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

export class DummyLexemeMaker {
    makeLexeme(str: string) {
        let l = new DummyLexeme();
        l.word = new Word();
        l.word.literal = str;
        return l;
    }
}

