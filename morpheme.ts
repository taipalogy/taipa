import { AlphabeticLetter, Sound } from './grapheme'
import { Result, NoSuccess, Success } from './result';
import { TonalAffix } from './tonal/version2'

//------------------------------------------------------------------------------
//  Syllabary
//------------------------------------------------------------------------------

export abstract class Syllabary {
    list: Array<Sound[]>
    abstract setFirstLetter(beginning: string)
}

//------------------------------------------------------------------------------
//  Tone Morpheme
//------------------------------------------------------------------------------

class PluralMorpheme {}
class TonalMorpheme {}

//------------------------------------------------------------------------------
//  Root
//------------------------------------------------------------------------------

class LexicalRoot {
    stem: LexicalStem
    affix: TonalAffix
}

export class LexicalStem {
    sounds: Array<Sound>;
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

export class Morpheme {}

class TonallessMorpheme extends Morpheme {}

export class RootMorpheme extends Morpheme {}

//------------------------------------------------------------------------------
//  Syllable Patterns
//------------------------------------------------------------------------------

export class MatchedPattern {
    letters: Array<AlphabeticLetter> = new Array();
    pattern: Array<Sound> = new Array();
    get matchedLength() { return this.letters.length; } // length of pattern can be optionally returned
}

//------------------------------------------------------------------------------
//  Syllable
//------------------------------------------------------------------------------

export class Syllable {
    literal: string = '';

    letters: Array<AlphabeticLetter>;

    constructor(letters?: Array<AlphabeticLetter>) {
        this.letters = new Array();
        if(letters != undefined) {
            let len = letters.length;
            for(let i = 0; i < len; i++) {
                this.pushLetter(letters[i]);
            }
        }
    }

    pushLetter(l: AlphabeticLetter) {
        this.letters.push(l);
        this.literal += l.literal;
        //console.log("%s", l.literal);
    }

    get lastLetter() {
        if(this.letters.length >= 1) return this.letters[this.letters.length-1]
        return null
    }

    get lastSecondLetter() {
        if(this.letters.length >= 2) return this.letters[this.letters.length-2]
        return null
    }
}

//------------------------------------------------------------------------------
//  Lexeme Maker
//------------------------------------------------------------------------------

export abstract class MorphemeMaker {
    abstract graphemes

    abstract create(syllable: Syllable)

    abstract createArray() // the return type of this declaration should be left blank
                            // an abstract type of TonalCombinedMorpheme and 
                            // ToneSandhiRootMorpheme will not be passed into ToneSandhiInflectionLexemeMaker

    preprocess() {
        // unpack graphemes and get letters from them
        let letters: Array<AlphabeticLetter> = new Array();
        for(let key in this.graphemes) {
            letters.push(this.graphemes[key].letter);
        }
        return letters        
    }

    make(letters: Array<AlphabeticLetter>, syllabary: Syllabary, syllabify: (letters: Array<AlphabeticLetter>, beginOfSyllable: number, syllabary: Syllabary) => MatchedPattern) {
        // a word can be made of multiple syllables
        let morphemes = this.createArray()
        let arraysOfSounds: Array<Sound[]> = new Array()
        let result: Result = new NoSuccess()
        
        //console.log(letters);
        let beginOfSyllable: number = 0;
        for(let i = 0; i < letters.length; i++) {
            //console.debug("examining letter: %s. length of letters: %d. i: %d. beginOfSyllable: %d", letters[i].literal, letters.length, i, beginOfSyllable);
            
            let msp: MatchedPattern;
            if(i-beginOfSyllable == 0) {
                
                msp = syllabify(letters, beginOfSyllable, syllabary)

                if(msp.matchedLength == 0) {
                    result.messages.push('no matched syllables found. the syllable might need to be added')
                }

                //console.log("matchedLen: %d", msp.matchedLength);
                //console.log(msp.pattern);
                //console.log(msp.letters)

                let tsm: Morpheme;
                if(msp.letters.length > 0) {
                    for(let j in msp.letters) {
                        //console.log("msp.letters: %s", msp.letters[j].literal)
                    }
                    tsm =  this.create(new Syllable(msp.letters))

                    arraysOfSounds.push(msp.pattern)

                    // here we should match the combining form with its root

                    morphemes.push(tsm);
                }

                beginOfSyllable += msp.matchedLength;
            }
            
            if(morphemes.length == 0) {
                result.messages.push('nothing matched')
            } else if(morphemes.length >= 1) {
                if(msp == null) break

                if(msp.matchedLength > 0) {
                    i += beginOfSyllable-i-1;
                }

            }
        }
        if(result.messages.length == 0) result = new Success()
        return { 'arraysOfSounds': arraysOfSounds, 'morphemes': morphemes, 'result': result }
    }
}
