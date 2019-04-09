
import { Character } from './character';
import { AlphabeticLetter } from './grapheme'

//------------------------------------------------------------------------------
//  Sound
//------------------------------------------------------------------------------

export class Sound {
    name: string
    // an array of character objects. can be used to make a word object.
    characters: Array<Character> = null

    // we still need a method for combinning characters from each character objects.
    // this is different from an array of character objects. it is a string.
    getLiteral() {
        let l: string = '';
        // there is no characters for 1st tone
        if(this.characters != null) {
            // when it is not 1st tone
            for(let k in this.characters) {
                l += this.characters[k].character;
            }
        }

        return l;
    }
}

export class Initial extends Sound {name = 'initial'}
export class Medial extends Sound {name = 'medial'}
export class Final extends Sound {name = 'final'}
export class Nasal extends Sound {name = 'nasalization'}
export class Tonal extends Sound {
    name = 'tonal'
    isEqualToTonal(tonal: Tonal) {
        if(this.getLiteral() === tonal.getLiteral()) {
            return true;
        }
        return false;
    }
}

export class FreeTonal extends Tonal {
    name = 'free tonal'
}
export class CheckedTonal extends Tonal {
    name = 'checked tonal'
}

export class StopFinal extends Final {name = 'stop final'}
export class NasalFinal extends Final {name = 'nasal final'}

export class SetOfSounds {
    toString(elements: Array<Sound>) {
        let str = '';
        for(let i = 0; i < elements.length; i++) {
            if(i+1 < elements.length) {
                for(let k in elements[i].characters) {
                    str += elements[i].characters[k].character;
                }
                str += '|';
            } else if(i+1 == elements.length) {
                for(let k in elements[i].characters) {
                    str += elements[i].characters[k].character;
                }
            }
        }
        return str;
    }
}

//------------------------------------------------------------------------------
//  Morph
//------------------------------------------------------------------------------

export class Morph {}

//------------------------------------------------------------------------------
//  Allomorph
//------------------------------------------------------------------------------

export class Allomorph extends Morph {
    tonal: Tonal = null;

    getLiteral() {
        if(this.tonal.getLiteral().length == 0) { 
            // return string 'zero' for first tone. member variable characters of graph is still null.
            return 'zero'; 
        } else return this.tonal.getLiteral();
    }
}

export class FreeAllomorph extends Allomorph {}

export class CheckedAllomorph extends Allomorph {
    final: Final = null;

    getLiteral() {
        if(this.tonal != null) {
            return this.final.getLiteral() + this.tonal.getLiteral()
        }
        return this.final.getLiteral()
    }
}

//------------------------------------------------------------------------------
//  Syllabary
//------------------------------------------------------------------------------

export abstract class Syllabary {
    list: Array<Sound[]>
    abstract setFirstLetter(beginning: string)
}

//------------------------------------------------------------------------------
//  Alphabet
//------------------------------------------------------------------------------

export interface ILetters {
    readonly [index: string]: AlphabeticLetter
}

//------------------------------------------------------------------------------
//  Turner
//------------------------------------------------------------------------------

export abstract class Turner {
    abstract getDataOfMorphologicalAnalysis(x: any)
    abstract getDataOfLexicalAnalysis(str: string)
}