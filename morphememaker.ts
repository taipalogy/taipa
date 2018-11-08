
import { AlphabeticGrapheme, AlphabeticLetter } from './grapheme'
import { ToneSandhiMorpheme, ToneSandhiSyllable, MatchedPattern, SyllablePatterns } from './morpheme'


//------------------------------------------------------------------------------
//  Tone Sandhi Morpheme Maker
//------------------------------------------------------------------------------

export class ToneSandhiMorphemeMaker {
    graphemes: Array<AlphabeticGrapheme>;
    
    constructor(graphemes: Array<AlphabeticGrapheme>) {
        this.graphemes = new Array();
        this.graphemes = graphemes;
    }

    makeMorphemes() {
        //let ss = new Syllables();
        let morphemes = this.make(this.graphemes);//ss.process(this.graphemes);
        return morphemes;
    }

    createSyllable(letters: Array<AlphabeticLetter>): ToneSandhiSyllable {
        return new ToneSandhiSyllable(letters);
    }

    getMatchedSyllablePattern(letters: Array<AlphabeticLetter>, i: number, beginOfSyllable: number) {
        // get the longest matched syllable pattern
        let sps = new SyllablePatterns();
        let matchedLen = 0;
        let mp = new MatchedPattern();
        for(let m in sps.list) {
            let min = Math.min(letters.length-beginOfSyllable, sps.list[m].length);
            if(sps.list[m].length == min) {
                for(let n = 0; n < min; n++) {
                    if(letters[i+n].literal.search(new RegExp(sps.list[m][n].toString())) == 0) {
                        //console.log(sp.list[m][n].toString())
                        if(n+1 == min && min > matchedLen) {
                            // to make sure it is longer than previous patterns
                            // last letter matched for the pattern
                            matchedLen = min;
                            // copy the matched letters
                            for(let q = 0; q < matchedLen; q++) {
                                mp.letters[q] = letters[i+q];
                            }
                            mp.pattern = sps.list[m];
                            //console.log(sp.list[m])
                            //console.log(letters[i+n].literal)
                        }
                    } else {
                        break;
                    }
                }
            }
        }
        return mp;
    }

    make(graphemes: Array<AlphabeticGrapheme>) {

        let morphemes: Array<ToneSandhiMorpheme> = new Array();
        //console.log("metadata letter array length %s. ", letters[0].literal);
        
        // unpack graphemes and get letters from them
        let letters: Array<AlphabeticLetter> = new Array();
        for(let key in graphemes) {
            letters.push(graphemes[key].letter);
        }

        //console.log(letters);
        let beginOfSyllable: number = 0;
        for(let i = 0; i < letters.length; i++) {
            //console.log("examining letter: %s. length of letters: %d. i: %d. beginOfSyllable: %d", letters[i].literal, letters.length, i, beginOfSyllable);
            //console.log("metadata letter array looping.");
            
            let msp: MatchedPattern;
            if(i-beginOfSyllable == 0) {
                //console.log("i:%d. begin of syllable hit: %d", i, beginOfSyllable);
                
                //console.log(letters[letters.length-1].literal)
                msp = this.getMatchedSyllablePattern(letters, i, beginOfSyllable);

                if(msp.matchedLength == 0) {
                    console.log('no matched pattern of sounds found. the pattern needs to be added.')
                }
                //console.log("matchedLen: %d", msp.matchedLength);
                //console.log(msp.pattern);
                //console.log(msp.letters)

                let tsm: ToneSandhiMorpheme;
                if(msp.letters.length > 0) {
                    for(let j in msp.letters) {
                        //console.log("msp.letters: %s", msp.letters[j].literal)
                    }
                    tsm =  new ToneSandhiMorpheme(new ToneSandhiSyllable(msp.letters));

                    morphemes.push(tsm);
                }

                //console.log(morphemes);
                //console.log("beginOfSyllable: %d. msp.matchedLength: %d", beginOfSyllable, msp.matchedLength);
                beginOfSyllable += msp.matchedLength;
                //console.log("beginOfSyllable: %d. msp.matchedLength: %d", beginOfSyllable, msp.matchedLength);
            }

            //console.log(morphemes);
            //console.log(syllables[p].literal)
            
            if(morphemes.length == 0) {
                //console.log("nothing matched");
            } else if(morphemes.length >= 1) {
                //beginOfSyllable += msp.letters.length;
                if(msp.matchedLength > 0) {
                    //console.log("i: %d. beginOfSyllable: %d", i, beginOfSyllable);
                    i += beginOfSyllable-i-1;
                    //console.log("i: %d. beginOfSyllable: %d", i, beginOfSyllable);    
                }
            }
        }

        //console.log(morphemes);
        //console.log("length of affixes: %d", affixes.length);
        return morphemes;
    }
}
  