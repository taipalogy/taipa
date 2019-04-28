import { AlphabeticLetter } from './grapheme'
import { Sound, Tonal, Morph, Final, Allomorph, FreeAllomorph, CheckedAllomorph, Syllabary } from './system'
import { listOfFreeAllomorphs, listOfCheckedAllomorphs, listOfUncombinedFreeAllomorphs,
    listOfUncombinedCheckedAllomorphs, freeAllomorphUncombiningRules, AllomorphHY, ZeroAllomorph,
    AllomorphX, AllomorphY, ZeroTonal } from './tonal/version2'
import { AlphabeticGrapheme } from './grapheme'
import { ListOfLexicalRoots } from './tonal/lexicalroot';
import { Result, NoSuccess, Success } from './result';
    

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

export class TonalAffix extends Morph {
    tonal: Tonal = null
    getLiteral() {
        return this.tonal.getLiteral()
    }
}

class FreeAffix extends TonalAffix {}

class CheckedAffix extends TonalAffix {
    // there is no final for affix
}

class ZeroAffix extends FreeAffix {
    tonal = new ZeroTonal()
}

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

export class CombinedMorpheme extends Morpheme {}

export class TonalCombinedMorpheme extends CombinedMorpheme {
    syllable: ToneSandhiSyllable;
    allomorph: Allomorph = null; // required to populate stems

    constructor(syllable: ToneSandhiSyllable) {
        super()
        this.syllable = syllable;
        // assign allomorph for each syllable
        this.assignAllomorph();
    }

    assignAllomorph() {
        // assign the matched allomorph for this syllable
        // don't assign if the checked syllable is already in base form
        let aoas: Array<Allomorph> = []; // array of allomorphs

        let keys = Array.from(listOfCheckedAllomorphs.keys())
        for(let k = 0; k < keys.length; k++) {
            let am = listOfCheckedAllomorphs.get(keys[k])
            if(am instanceof CheckedAllomorph) {
                if(am.tonal != null) {
                    if(am.tonal.getLiteral() === this.syllable.lastLetter.literal
                        && am.final.getLiteral() === this.syllable.lastSecondLetter.literal) {
                        aoas.push(listOfCheckedAllomorphs.get(keys[k]));
                        // there's no need to break here, as we want to collect the second match, if any
                    }
                } else {
                    if(am.final.getLiteral() === this.syllable.lastLetter.literal) {
                        aoas.push(listOfCheckedAllomorphs.get(keys[k]));
                    }
                }
            }
        }

        if(aoas.length > 0) {
            //console.debug('length of aoas: %d', aoas.length)
            if(aoas.length == 2) {
                let first = aoas[0]
                let second = aoas[1]
                if(first instanceof CheckedAllomorph && second instanceof CheckedAllomorph) {
                    if(first.final.getLiteral() === second.final.getLiteral()) {
                        // discard the base form
                        if(aoas[1].tonal != null) {
                            // the 1st element is in base form
                            aoas.shift()
                        } else if(aoas[0].tonal != null) {
                            // the 2nd element is in base form
                            aoas.pop()
                        }
                    }
                }
            }else if(aoas.length == 1 && aoas[0].tonal == null){
                // just return for stop finals without tonal
                return
            } else if(aoas.length == 1 && aoas[0].tonal.isEqualToTonal(new AllomorphHY().tonal)) {
                // there should be no more than 2 matches, either 1 match or 2
                // just fall through for the case of 'hy'
            } 

            // there is only one match after processing, we just assign it
            this.allomorph = aoas.shift();

            // we already have an allomorph assigned, just return
            return;
        }

        // after matching with checked allomorphs, we go on matching free allomorphs
        aoas = [];
        if(listOfFreeAllomorphs.has(this.syllable.lastLetter.literal)) {
            aoas.push(listOfFreeAllomorphs.get(this.syllable.lastLetter.literal));
        }

        if(aoas.length == 0) {
            // tone 1 has no allomorph
            this.allomorph = new ZeroAllomorph();
        } else if(aoas.length) {
            // are there multiple allomorphs? there should be only one.
            for(let i = 0; i < aoas.length; i++) {
                if(aoas[i].tonal.isEqualToTonal(new AllomorphX().tonal)) {
                    // this syllable is already in base form
                    // in order to display this inflectional ending, we have to assign
                    this.allomorph = aoas[i]
                } else {
                    this.allomorph = aoas[i];
                }
            }
        }
    }

    getBaseForms(): Array<ToneSandhiSyllable> {
        // get base forms as strings
        if(this.allomorph != null) {
            // member variable allomorph is not null
            if(this.allomorph instanceof FreeAllomorph) {
                if(this.allomorph instanceof ZeroAllomorph) {
                    // no need to pop letter
                    // push letter to make tone 2
                    // the base tone of the first tone is the second tone
                    // 1 to 2 ---->
                    let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                    s.pushLetter(new AlphabeticLetter(freeAllomorphUncombiningRules.get('zero')[0].characters));
                    //console.log(this.syllable)
                    return [s];
                } else {
                    // the 7th tone has two baseforms
                    let ret = [];
                    for(let i in freeAllomorphUncombiningRules.get(this.allomorph.getLiteral())) {
                        // pop letter
                        // push letter
                        let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                        //if(!facrs.rules[this.allomorph.getLiteral()][i].isCharacterNull()) {
                        if(!(freeAllomorphUncombiningRules.get(this.allomorph.getLiteral())[i] instanceof ZeroAllomorph)) {
                            // when there is allomorph
                            // 2 to 3. 3 to 7. 7 to 5. 3 to 5.  ---->
                            s.popLetter();
                            // there are base tonals
                            // includes ss and x, exclude zero allomorph
                            s.pushLetter(new AlphabeticLetter(freeAllomorphUncombiningRules.get(this.allomorph.getLiteral())[i].characters));
                            ret.push(s);
                        } else {
                            // include zero suffix. the base tone of the seventh tone.
                            // exclude ss and x.
                            // 7 to 1 ---->
                            // tone 1 has no allomorph
                            s.popLetter();
                            ret.push(s);
                        }
                    }
                    //console.log(ret)
                    return ret;
                }
            } else if(this.allomorph instanceof CheckedAllomorph) {
                // pop the last letter
                // no need to push letter
                // 1 to 4. 3 to 8. 2 to 4. 5 to 8.  ---->
                let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
                s.popLetter();
                //console.log(s.literal)
                return [s];
            }
        } else {
            // member variable allomorph is null
            // this syllable is already in base form
            // is this block redundant
            return [new ToneSandhiSyllable(this.syllable.letters)];
        }
        return []; // return empty array
    }
}

export class ToneSandhiRootMorpheme extends RootMorpheme {
    syllable: ToneSandhiSyllable;
    allomorph: Allomorph = null;


    constructor(syllable: ToneSandhiSyllable) {
        super();
        this.syllable = syllable;
    }

    assignAllomorph() {}
}

export class CombiningFormMorpheme extends ToneSandhiRootMorpheme {
    assignAllomorph() {
        if(listOfUncombinedCheckedAllomorphs.has(this.syllable.lastLetter.literal)) {
            this.allomorph = listOfUncombinedCheckedAllomorphs.get(this.syllable.lastLetter.literal)
            return
        }

        if(listOfUncombinedFreeAllomorphs.has(this.syllable.lastLetter.literal)) {
            this.allomorph = listOfUncombinedFreeAllomorphs.get(this.syllable.lastLetter.literal)
            return
        }

        this.allomorph = new ZeroAllomorph()
        return
    }

    getCombiningForm(t: Tonal): ToneSandhiSyllable  {
        if(this.allomorph != null) {
            let s: ToneSandhiSyllable = new ToneSandhiSyllable(this.syllable.letters);
            if(this.allomorph instanceof FreeAllomorph) {
                if(this.allomorph instanceof ZeroAllomorph) {
                    s.pushLetter(new AlphabeticLetter(t.characters))
                } else if(this.allomorph instanceof AllomorphY) {
                    s.popLetter()
                    return s
                } else {
                    s.popLetter()
                    s.pushLetter(new AlphabeticLetter(t.characters))
                    return s
                }
            } else if(this.allomorph instanceof CheckedAllomorph) {
                s.pushLetter(new AlphabeticLetter(this.allomorph.tonal.characters))
                return s
            }
        }
        return null
    }
}

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

export class ToneSandhiSyllable extends Syllable {
    popLetter() {
        let tmp = this.literal.substr(0, this.literal.length-this.letters[this.letters.length-1].literal.length);
        this.literal = '';
        this.literal = tmp;
        this.letters = this.letters.slice(0, this.letters.length-1);
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

                let tsm: CombinedMorpheme;
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

function syllabifyTonal(letters: Array<AlphabeticLetter>, beginOfSyllable: number, syllabary: Syllabary) {
    // get the longest matched syllable pattern
    syllabary.setFirstLetter(letters[beginOfSyllable].literal)
    let matchedLen = 0;
    let mp = new MatchedPattern();
    for(let m in syllabary.list) {
        let min = Math.min(letters.length-beginOfSyllable, syllabary.list[m].length);
        if(syllabary.list[m].length == min) {
            for(let n = 0; n < min; n++) {
                if(syllabary.list[m][n] != undefined) {
                    if(letters[beginOfSyllable+n].literal === syllabary.list[m][n].getLiteral()) {
                        if(n+1 == min && min > matchedLen) {
                            // to make sure it is longer than previous patterns
                            // last letter matched for the pattern
                            matchedLen = min;
                            // copy the matched letters
                            for(let q = 0; q < matchedLen; q++) {
                                mp.letters[q] = letters[beginOfSyllable+q];
                            }
                            
                            // copy the pattern of sounds
                            mp.pattern = syllabary.list[m];
                            //console.log(syllabary.list[m])
                            //console.log(mp.letters)
                        }
                    } else {
                        break;
                    }    
                }
            }
        }
    }
    return mp;
}

//------------------------------------------------------------------------------
//  Tone Sandhi Morpheme Maker
//------------------------------------------------------------------------------

export class TonalCombinedMorphemeMaker extends MorphemeMaker {
    graphemes: Array<AlphabeticGrapheme>;
    
    constructor(gs: Array<AlphabeticGrapheme>) {
        super()
        this.graphemes = new Array();
        this.graphemes = gs;
    }

    create(syllable: ToneSandhiSyllable) { return new TonalCombinedMorpheme(syllable) }

    createArray() { return new Array<TonalCombinedMorpheme>() }

    makeCombinedMorphemes() {
        return this.make(this.preprocess(), new ListOfLexicalRoots(), syllabifyTonal);
    }
}

export class ToneSandhiRootMorphemeMaker extends MorphemeMaker {
    graphemes: Array<AlphabeticGrapheme>;
    
    constructor(graphemes: Array<AlphabeticGrapheme>) {
        super()
        this.graphemes = new Array();
        this.graphemes = graphemes;
    }

    create(syllable: ToneSandhiSyllable) { return new ToneSandhiRootMorpheme(syllable) }

    createArray() { return new Array<ToneSandhiRootMorpheme>() }

    makeRootMorphemes() {
        return this.make(this.preprocess(), new ListOfLexicalRoots(), syllabifyTonal);
    }
}

export class CombiningFormMorphemeMaker extends ToneSandhiRootMorphemeMaker {
    
    constructor(graphemes: Array<AlphabeticGrapheme>) {
        super(graphemes)
    }

    createCombiningFormMorpheme(syllable: ToneSandhiSyllable) { 
        let s = new CombiningFormMorpheme(syllable)
        s.assignAllomorph()
        return s 
    }

    makeCombiningMorphemes() {
        // make morphemes and the last of them is a sandhi form
        return this.postprecess(super.makeRootMorphemes().morphemes);
    }

    postprecess(tspms: Array<ToneSandhiRootMorpheme>) {
        // replace the last morpheme with its sandhi form
        if(tspms.length > 0) {
            let last = tspms.pop()
            tspms.push(this.createCombiningFormMorpheme(last.syllable))
        }
        return tspms
    }
}
