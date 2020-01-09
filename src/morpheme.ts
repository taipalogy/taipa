import { AlphabeticLetter, Sound } from './grapheme';
import { Allomorph } from './tonal/version2';
import { TonalSyllable } from './tonal/morpheme';

export abstract class CombiningMetaplasm {}

export abstract class TonalCombiningMetaplasm extends CombiningMetaplasm {
    apply(syllable: TonalSyllable, allomorph: Allomorph): Array<TonalSyllable> { return []; }
}

export class RemovingEpenthesisOfAy extends TonalCombiningMetaplasm {
    applyToLetters(letters: Array<string>) {
        letters.shift();
        return letters;
    }
    applyToString(str: string) {
        return str.slice(1, 2);
    }
}

export class RemovingNasalizationOfAy extends TonalCombiningMetaplasm {}

export class KanaCombiningMetaplasm extends CombiningMetaplasm {}

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

export class Morpheme {}

//------------------------------------------------------------------------------

export class MatchedPattern {
    letters: Array<AlphabeticLetter> = new Array();
    pattern: Array<Sound> = new Array();
    get matchedLength() {
        return this.letters.length;
    } // length of pattern can be optionally returned
}

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

export abstract class MorphemeMaker {
    protected abstract createMorphemes(): Morpheme[];

    protected abstract createMorpheme(msp: MatchedPattern): Morpheme;

    protected make(
        letters: Array<AlphabeticLetter>,
        syllabify: (letters: Array<AlphabeticLetter>, beginOfSyllable: number) => MatchedPattern,
    ): MatchedPattern[] {
        let patterns = new Array<MatchedPattern>();
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
                    patterns.push(msp);
                }

                beginOfSyllable += msp.matchedLength;
            }

            if (patterns.length == 0) {
                //console.log('nothing matched')
            } else if (patterns.length >= 1) {
                if (msp == undefined) break;

                if (msp.matchedLength > 0) {
                    i += beginOfSyllable - i - 1;
                }
            }
        }

        return patterns;
    }
}
