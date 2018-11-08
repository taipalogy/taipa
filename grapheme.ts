

import { Character, characters } from './character';
import { IDictionary, Dictionary } from './collection'

//------------------------------------------------------------------------------
//  Sound
//------------------------------------------------------------------------------

export class Sound {
    // an array of character objects. can be used to make a word object.
    characters: Array<Character> = null

    // we still need a method for combinning characters from each character objects.
    // this is different from an array of character objects. it is a string.
    getLiteral() {
        let l: string = '';
        // there is no characters for 1st tone
        if(this.characters != undefined) {
            // when it is not 1st tone
            for(let k in this.characters) {
                l += this.characters[k].character;
            }
        }

        return l;
    }

    isEqualTo(letter: AlphabeticLetter) {
        if(this.getLiteral() === letter.literal) {
            return true;
        }
        return false;
    }

    isCharacterNull() {
        if(this.characters == null) {
            return true;
        }
        return false;
    }

    toString() {
        if(this.characters != null) {
            return this.getLiteral();
        }
        return '';
    }
}

export class Initial extends Sound {}
export class Medial extends Sound {}
export class Final extends Sound {}
export class Nasal extends Sound {}
export class ToneMark extends Sound {
    isEqualToToneMark(toneMark: ToneMark) {
        if(this.getLiteral() === toneMark.getLiteral()) {
            return true;
        }
        return false;
    }
}

export class FreeToneMark extends ToneMark {}

export class CheckedToneMark extends ToneMark {}

//------------------------------------------------------------------------------
//  Initial, Medial, Nasal, Final Consonant, Tone Mark
//------------------------------------------------------------------------------

class MedialA extends Medial {characters = [characters['a']]}
class MedialE extends Medial {characters = [characters['e']]}
class MedialI extends Medial {characters = [characters['i']]}
class MedialO extends Medial {characters = [characters['o']]}
class MedialU extends Medial {characters = [characters['u']]}
class MedialUR extends Medial {characters = [characters['u'], characters['r']]}

class InitialNasalM extends Initial {characters = [characters['m']]}
class InitialNasalN extends Initial {characters = [characters['n']]}
class InitialNasalNG extends Initial {characters = [characters['n'], characters['g']]}

class InitialC extends Initial {characters = [characters['c']]}
class InitialJ extends Initial {characters = [characters['j']]}
class InitialL extends Initial {characters = [characters['l']]}
class InitialQ extends Initial {characters = [characters['q']]}
class InitialS extends Initial {characters = [characters['s']]}
class InitialV extends Initial {characters = [characters['v']]}
class InitialZ extends Initial {characters = [characters['z']]}

class InitialP extends Initial {characters = [characters['p']]}
class InitialT extends Initial {characters = [characters['t']]}
class InitialK extends Initial {characters = [characters['k']]}
class InitialB extends Initial {characters = [characters['b']]}
class InitialD extends Initial {characters = [characters['d']]}
class InitialG extends Initial {characters = [characters['g']]}

class InitialH extends Initial {characters = [characters['h']]}

class NasalM extends Nasal {characters = [characters['m']]}
class NasalN extends Nasal {characters = [characters['n']]}
class NasalNG extends Nasal {characters = [characters['n'], characters['g']]}
class NasalNN extends Nasal {characters = [characters['n'], characters['n']]}

export class ZeroToneMark extends FreeToneMark {characters = null;}

export class ToneMarkZS extends FreeToneMark {characters = [characters['z'], characters['s']]}
export class ToneMarkW extends FreeToneMark {characters = [characters['w']]}
export class ToneMarkSS extends FreeToneMark {characters = [characters['s'], characters['s']]}
export class ToneMarkXX extends FreeToneMark {characters = [characters['x'], characters['x']]}
export class ToneMarkXXX extends FreeToneMark {characters = [characters['x'], characters['x'], characters['x']]}
export class ToneMarkZZS extends FreeToneMark {characters = [characters['z'], characters['z'], characters['s']]}

export class FreeToneMarkX extends FreeToneMark {characters = [characters['x']]}
export class FreeToneMarkY extends FreeToneMark {characters = [characters['y']]}

export class ToneMarkP extends CheckedToneMark {characters = [characters['p']]}
export class ToneMarkT extends CheckedToneMark {characters = [characters['t']]}
export class ToneMarkK extends CheckedToneMark {characters = [characters['k']]}
export class ToneMarkH extends CheckedToneMark {characters = [characters['h']]}
export class ToneMarkB extends CheckedToneMark {characters = [characters['b']]}
export class ToneMarkD extends CheckedToneMark {characters = [characters['d']]}
export class ToneMarkG extends CheckedToneMark {characters = [characters['g']]}
export class ToneMarkF extends CheckedToneMark {characters = [characters['f']]}

export class CheckedToneMarkX extends CheckedToneMark {characters = [characters['x']]}
export class CheckedToneMarkY extends CheckedToneMark {characters = [characters['y']]}

export class FinalP extends Final {characters = [characters['p']]}
export class FinalT extends Final {characters = [characters['t']]}
export class FinalK extends Final {characters = [characters['k']]}
export class FinalH extends Final {characters = [characters['h']]}
export class FinalB extends Final {characters = [characters['b']]}
export class FinalD extends Final {characters = [characters['d']]}
export class FinalG extends Final {characters = [characters['g']]}
export class FinalF extends Final {characters = [characters['f']]}

class Graphs {
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

export class MedialGraphs extends Graphs {
    medials: Array<Sound> = new Array()

    constructor() {
        super()
        this.medials.push(new MedialA())
        this.medials.push(new MedialE())
        this.medials.push(new MedialI())
        this.medials.push(new MedialO())
        this.medials.push(new MedialU())
        this.medials.push(new MedialUR())
    }

    toString() {
        return super.toString(this.medials)
    }
}

export class NasalGraphs extends Graphs {
    nasals: Array<Sound> = new Array()

    constructor() {
        super()
        this.nasals.push(new NasalM())
        this.nasals.push(new NasalN())
        this.nasals.push(new NasalNG())
        this.nasals.push(new NasalNN())
    }

    toString() {
        return super.toString(this.nasals)
    }
}

export class FreeToneMarkGraphs extends Graphs {
    freeToneMarks: Array<Sound> = new Array()

    constructor() {
        super()
        this.freeToneMarks.push(new ToneMarkSS())
        this.freeToneMarks.push(new ToneMarkW())
        this.freeToneMarks.push(new ToneMarkXX())
        this.freeToneMarks.push(new ToneMarkXXX())
        this.freeToneMarks.push(new ToneMarkZS())
        this.freeToneMarks.push(new ToneMarkZZS())

        this.freeToneMarks.push(new FreeToneMarkX())
        this.freeToneMarks.push(new FreeToneMarkY())
    }

    toString() {
        return super.toString(this.freeToneMarks)
    }
}

export class CheckedToneMarkGraphs extends Graphs {
    checkedToneMarks: Array<Sound> = new Array()

    constructor() {
        super()
        this.checkedToneMarks.push(new ToneMarkP())
        this.checkedToneMarks.push(new ToneMarkT())
        this.checkedToneMarks.push(new ToneMarkK())
        this.checkedToneMarks.push(new ToneMarkB())
        this.checkedToneMarks.push(new ToneMarkD())
        this.checkedToneMarks.push(new ToneMarkG())

        this.checkedToneMarks.push(new ToneMarkH())
        this.checkedToneMarks.push(new ToneMarkF())

        this.checkedToneMarks.push(new CheckedToneMarkX())
        this.checkedToneMarks.push(new CheckedToneMarkY())
    }

    toString() {
        return super.toString(this.checkedToneMarks)
    }
}

export class NeutralFinalGraphs extends Graphs {
    neutralFinals: Array<Sound> = new Array()

    constructor() {
        super()
        this.neutralFinals.push(new FinalH())
        this.neutralFinals.push(new FinalF())
    }

    toString() {
        return super.toString(this.neutralFinals)
    }
}

export class FinalGraphs extends Graphs {
    finals: Array<Sound> = new Array()

    constructor() {
        super()
        this.finals.push(new FinalP())
        this.finals.push(new FinalT())
        this.finals.push(new FinalK())
        this.finals.push(new FinalB())
        this.finals.push(new FinalD())
        this.finals.push(new FinalG())

        this.finals.push(new FinalH())
        this.finals.push(new FinalF())
    }

    toString() {
        return super.toString(this.finals)
    }
}

export class InitialNasalGraphs extends Graphs {
    initialNasals: Array<Sound> = new Array()

    constructor() {
        super()
        this.initialNasals.push(new InitialNasalM())
        this.initialNasals.push(new InitialNasalN())
        this.initialNasals.push(new InitialNasalNG())
    }

    toString() {
        return super.toString(this.initialNasals)
    }
}

export class InitialGraphs extends Graphs {
    initials: Array<Sound> = new Array()

    constructor() {
        super()
        this.initials.push(new InitialC())
        this.initials.push(new InitialJ())
        this.initials.push(new InitialL())
        this.initials.push(new InitialQ())
        this.initials.push(new InitialS())
        this.initials.push(new InitialV())
        this.initials.push(new InitialZ())

        this.initials.push(new InitialP())
        this.initials.push(new InitialT())
        this.initials.push(new InitialK())
        this.initials.push(new InitialB())
        this.initials.push(new InitialD())
        this.initials.push(new InitialG())

        this.initials.push(new InitialNasalM())
        this.initials.push(new InitialNasalN())
        this.initials.push(new InitialNasalNG())

        this.initials.push(new InitialH())
    }

    toString() {
        return super.toString(this.initials)
    }
}

//------------------------------------------------------------------------------
//  Grapheme
//------------------------------------------------------------------------------

class Grapheme {}

export class AlphabeticGrapheme extends Grapheme {
    letter: AlphabeticLetter
    
    constructor(letter?: AlphabeticLetter) {
        super();
        this.letter = letter;
    }
}

//------------------------------------------------------------------------------
//  Letter
//------------------------------------------------------------------------------

export class Letter {
    literal: string = '';
}

export class AlphabeticLetter extends Letter {
    characters: Array<Character>;

    constructor(characters?: Array<Character>) {
        super();
        this.characters = new Array();
        if(characters != null) {
            let len = characters.length;
            for(var i = 0; i < len; i++) {
                this.pushCharacter(characters[i]);
            }
        }
    }

    pushCharacter(c: Character){
        this.characters.push(c);
        this.literal += c.character;
    }
}

export class MatchedSequence {
    characters: Array<Character> = new Array();
    get matchedLength() { return this.characters.length; }
}
