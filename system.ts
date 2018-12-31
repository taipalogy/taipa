
import { Character } from './character';

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
export class Nasal extends Sound {name = 'nasal'}
export class ToneMark extends Sound {
    name = 'tone mark'
    isEqualToToneMark(toneMark: ToneMark) {
        if(this.getLiteral() === toneMark.getLiteral()) {
            return true;
        }
        return false;
    }
}

export class FreeToneMark extends ToneMark {
    name = 'free tone mark'
}
export class CheckedToneMark extends ToneMark {
    name = 'checked tone mark'
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
//  Positional Sound for Lexical Root
//------------------------------------------------------------------------------


interface PositionalSound {
    initial: Initial
    medial: Medial
    final: Final
    freeToneMark: FreeToneMark
    checkedToneMark: CheckedToneMark
    //neutralToneMark: CheckedToneMark
}

export type PartialPositionalSound = Partial<PositionalSound>
