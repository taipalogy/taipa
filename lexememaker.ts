
import { ToneSandhiMorpheme, ToneSandhiSyllable  } from './morpheme'
import { ToneSandhiInputingLexeme, ToneSandhiWord, DummyLexeme, Word } from './lexeme'

//------------------------------------------------------------------------------
//  Tone Sandhi Lexeme Maker
//------------------------------------------------------------------------------

export class ToneSandhiLexemeMaker {
    morphemes: Array<ToneSandhiMorpheme>;

    constructor(morphemes: Array<ToneSandhiMorpheme>) {
        this.morphemes = new Array();
        this.morphemes = morphemes;
    }

    makeLexemes() {
        //        console.log(this.morphemes);

        // extract syllables from morphemes. concatenate syllables into a word.
        // wrap the word in a lexeme. use morephemes to populate lemmata of a lexeme.
        // assign inflectinal affix to a lexeme.
        // push the lexeme into an array of lexeme.

        let lexemes: Array<ToneSandhiInputingLexeme> = new Array();

        // unpack morphemes and take syllables out from them
        let syllables: Array<ToneSandhiSyllable> = new Array();
        for(let key in this.morphemes) {
            syllables.push(this.morphemes[key].syllable);
        }

        let tsl = new ToneSandhiInputingLexeme(new ToneSandhiWord(syllables));
        if(this.morphemes.length > 0) {
            if(this.morphemes[this.morphemes.length-1].allomorph != null) {
                tsl.assignInflectionalEnding(this.morphemes[this.morphemes.length-1].allomorph);
                //console.log("pos got assigned inflectional affix")
            }
        }

        tsl.populateLemmata(this.morphemes);

        lexemes.push(tsl);

        //        console.log(lexemes);
        //        console.log(lexemes[0].word.literal);

        return lexemes
    }
}

export class DummyLexemeMaker {
    makeLexeme(str: string) {
        let l = new DummyLexeme();
        l.word = new Word();
        l.word.literal = str;
        return l;
    }
}

class InflectiveLexemeMaker {}