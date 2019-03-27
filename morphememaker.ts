import { AlphabeticGrapheme, AlphabeticLetter } from './grapheme'
import { CombinedMorpheme, TonalCombinedMorpheme, ToneSandhiSyllable, MatchedPattern, ToneSandhiRootMorpheme, Syllable, CombiningFormMorpheme } from './morpheme'
import { ListOfLexicalRoots } from './lexicalroot';
import { Syllabary, Sound } from './system';
import { Result, NoSuccess, Success } from './result';

//------------------------------------------------------------------------------
//  Lexeme Maker
//------------------------------------------------------------------------------

export abstract class MorphemeMaker {
    abstract graphemes

    abstract create(syllable: Syllable)

    abstract createArray() // the return type of this declaration should be left blank
                            // an abstract type of TonalCombinedMorpheme and 
                            // ToneSandhiRootMorpheme will not be passed into ToneSandhiInflectionLexemeMaker

    getMatchedSyllablePattern(letters: Array<AlphabeticLetter>, beginOfSyllable: number, syllabary: Syllabary) {
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

    preprocess() {
        // unpack graphemes and get letters from them
        let letters: Array<AlphabeticLetter> = new Array();
        for(let key in this.graphemes) {
            letters.push(this.graphemes[key].letter);
        }
        return letters        
    }

    make(letters: Array<AlphabeticLetter>, syllabary: Syllabary) {
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
                
                msp = this.getMatchedSyllablePattern(letters, beginOfSyllable, syllabary);

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
        return this.make(this.preprocess(), new ListOfLexicalRoots());
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
        return this.make(this.preprocess(), new ListOfLexicalRoots());
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
