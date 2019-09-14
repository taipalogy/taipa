import { AlphabeticLetter, Sound, AlphabeticGrapheme } from './grapheme';
import { Allomorph, Epenthesis } from './tonal/version2';
import { TonalSyllable } from './tonal/morpheme';

export abstract class CombiningMetaplasm {}

export class TonalCombiningMetaplasm extends CombiningMetaplasm { // TODO: abstraction
    apply(syllable: TonalSyllable, allomorph: Allomorph): Array<TonalSyllable> {
        return [];
    }
}

export class RemovingEpenthesisOfAy extends TonalCombiningMetaplasm {
    applyToLetters(letters: Array<string>) {
        letters.shift()
        return letters        
    }
    applyToString(str: string) {
        return str.slice(1, 2)
    }
}

export class RemovingNasalizationOfAy extends TonalCombiningMetaplasm {}

export class KanaCombiningMetaplasm extends CombiningMetaplasm {}

//------------------------------------------------------------------------------
//  Tone Morpheme
//------------------------------------------------------------------------------

class PluralMorpheme {}
class TonalMorpheme {}

//------------------------------------------------------------------------------
//  Root
//------------------------------------------------------------------------------

class LexicalRoot {
    //stem: LexicalStem
    //affix: TonalAffix
}

export class LexicalStem {
    //sounds: Array<Sound>;
}

class VowelStem extends LexicalStem {}
class ConsonantStem extends LexicalStem {}

class DerivationalAffix {
    // lexical ending
}

class GrammaticalSuffix {
    // desinence
}

//------------------------------------------------------------------------------
//  Tone Sandhi Morpheme
//------------------------------------------------------------------------------

export abstract class Morpheme {
    abstract syllable: Syllable;
}

//------------------------------------------------------------------------------
//  Syllable Patterns
//------------------------------------------------------------------------------

export class MatchedPattern {
    letters: Array<AlphabeticLetter> = new Array();
    pattern: Array<Sound> = new Array();
    get matchedLength() {
        return this.letters.length;
    } // length of pattern can be optionally returned
}

//------------------------------------------------------------------------------
//  Syllable
//------------------------------------------------------------------------------

export class Syllable {
    literal: string = '';

    letters: Array<AlphabeticLetter>;

    constructor(letters?: Array<AlphabeticLetter>) {
        this.letters = new Array();
        if (letters != undefined) {
            let len = letters.length;
            for (let i = 0; i < len; i++) {
                this.pushLetter(letters[i]);
            }
        }
    }

    pushLetter(l: AlphabeticLetter) {
        this.letters.push(l);
        this.literal += l.literal;
    }
}

//------------------------------------------------------------------------------
//  Lexeme Maker
//------------------------------------------------------------------------------

export abstract class MorphemeMaker {
    abstract graphemes: Array<AlphabeticGrapheme>;
    abstract metaplasm: CombiningMetaplasm;

    preprocess() {
        // unpack graphemes and get letters from them
        let letters: Array<AlphabeticLetter> = new Array();
        for (let key in this.graphemes) {
            letters.push(this.graphemes[key].letter);
        }
        return letters;
    }

    abstract createMorphemes(): Morpheme[];

    abstract createMorpheme(msp: MatchedPattern, tcm: CombiningMetaplasm): Morpheme;

    make(
        letters: Array<AlphabeticLetter>,
        syllabify: (letters: Array<AlphabeticLetter>, beginOfSyllable: number) => MatchedPattern,
    ): Morpheme[] {
        let morphemes = this.createMorphemes();
        let beginOfSyllable: number = 0;
        for (let i = 0; i < letters.length; i++) {
            let msp: MatchedPattern = new MatchedPattern();
            if (i - beginOfSyllable == 0) {
                msp = syllabify(letters, beginOfSyllable);

                if (msp.matchedLength == 0) {
                    //console.log('no matched syllables found. the syllable might need to be added')
                }

                //console.log("matchedLen: %d", msp.matchedLength);
                //console.log(msp.pattern);
                //console.log(msp.letters)

                if (msp.letters.length > 0) {
                    for (let j in msp.letters) {
                        //console.log("msp.letters: %s", msp.letters[j].literal)
                    }
                    morphemes.push(this.createMorpheme(msp, this.metaplasm)); //morphemes.push(tsm);
                }

                beginOfSyllable += msp.matchedLength;
            }

            if (morphemes.length == 0) {
                //console.log('nothing matched')
            } else if (morphemes.length >= 1) {
                if (msp == undefined) break;

                if (msp.matchedLength > 0) {
                    i += beginOfSyllable - i - 1;
                }
            }
        }

        return morphemes;
    }
}
