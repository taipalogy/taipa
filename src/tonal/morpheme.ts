import { Syllable, Morpheme, MorphemeMaker, MatchedPattern, TonalCombiningMetaplasm } from '../morpheme';
import {
    freeAllomorphUncombiningRules,
    checkedAllomorphs,
    freeAllomorphs,
    ZeroAllomorph,
    AllomorphX,
    SetOfFreeTonals,
    SetOfStopFinals,
} from './version2';
import { CheckedAllomorph, FreeAllomorph, Allomorph } from './version2';
import { AlphabeticLetter, AlphabeticGrapheme, Sound } from '../grapheme';
import { ClientOfTonalGenerator } from './lexicalroot';
import { list_of_lexical_roots } from './lexicalroots2';

//------------------------------------------------------------------------------

export class TonalUncombiningForms extends TonalCombiningMetaplasm {
    apply(syllable: TonalSyllable, allomorph: Allomorph): Array<TonalSyllable> {
        // get base forms as strings
        if (allomorph) {
            // member variable allomorph is not null
            if (allomorph instanceof FreeAllomorph) {
                if (allomorph instanceof ZeroAllomorph) {
                    // no need to pop letter
                    // push letter to make tone 2
                    // the base tone of the first tone is the second tone
                    // 1 to 2
                    let s: TonalSyllable = new TonalSyllable(syllable.letters);
                    s.pushLetter(new AlphabeticLetter(freeAllomorphUncombiningRules.get('zero')[0].characters));
                    //console.log(this.syllable)
                    return [s];
                } else {
                    // the 7th tone has two baseforms
                    let ret = [];
                    for (let i in freeAllomorphUncombiningRules.get(allomorph.getLiteral())) {
                        // pop letter
                        // push letter
                        let s: TonalSyllable = new TonalSyllable(syllable.letters);
                        if (!(freeAllomorphUncombiningRules.get(allomorph.getLiteral())[i] instanceof ZeroAllomorph)) {
                            // when there is allomorph
                            // 2 to 3. 3 to 7. 7 to 5. 3 to 5.
                            s.popLetter();
                            // there are base tonals
                            // includes ss and x, exclude zero allomorph
                            s.pushLetter(
                                new AlphabeticLetter(
                                    freeAllomorphUncombiningRules.get(allomorph.getLiteral())[i].characters,
                                ),
                            );
                            ret.push(s);
                        } else {
                            // include zero suffix. the base tone of the seventh tone.
                            // exclude ss and x.
                            // 7 to 1
                            // tone 1 has no allomorph
                            s.popLetter();
                            ret.push(s);
                        }
                    }
                    //console.log(ret)
                    return ret;
                }
            } else if (allomorph instanceof CheckedAllomorph) {
                // pop the last letter
                // no need to push letter
                // 1 to 4. 3 to 8. 2 to 4. 5 to 8.
                let s: TonalSyllable = new TonalSyllable(syllable.letters);
                s.popLetter();
                //console.log(s.literal)
                return [s];
            }
        } else {
            // member variable allomorph is null
            // this syllable is already in base form
            // is this block redundant
            return [new TonalSyllable(syllable.letters)];
        }
        return []; // return empty array
    }
}

//------------------------------------------------------------------------------
//  syllabifyTonal
//------------------------------------------------------------------------------

export function syllabifyTonal(letters: Array<AlphabeticLetter>, beginOfSyllable: number/*, syllabary: Syllabary*/) {
    // get the longest matched syllable pattern
    let len = 0; // limit on the length of fetched syllables, hence the amount of syllables limited
    for (let l of letters) {
        len = len + l.characters.length;
    }

    let literal = '';
    let matched = '';
    let begin: number = 0;
    //let count: number = 0;
    const sft = new SetOfFreeTonals();
    const ssf = new SetOfStopFinals()
    const urs = freeAllomorphUncombiningRules;

    for(let i = beginOfSyllable; i < letters.length; i++) {
        literal = literal + letters[i].literal;
        //const idx = list_of_lexical_roots.indexOf(literal)
        //count += 1;
        if(list_of_lexical_roots.includes(literal)) {
            if(sft.beginWith(letters[i].literal)) {
                //console.log(`i: ${i}, literal: ${literal}, tone: ${letters[i].literal}`)
                if(begin === beginOfSyllable) matched = literal;
                break;
            } else if(ssf.beginWith(letters[i].literal)) {
                //console.log(`i: ${i}, literal: ${literal}, stopFinal: ${letters[i].literal}`)
                //console.log(`begin: ${begin}, beginOfSyllable: ${beginOfSyllable}`)
                if(begin === beginOfSyllable) matched = literal;
                break;
            } else {
                //console.log(`i: ${i}, literal: ${literal}`)
                if(i+1 < letters.length && sft.beginWith(letters[i+1].literal)) {
                    //console.log(`tone: ${letters[i+1].literal}, rule: ${urs.get(letters[i+1].literal)[0].getLiteral()}`)
                    const ts = urs.get(letters[i+1].literal)
                    for(let t of ts) {
                        if(list_of_lexical_roots.includes(literal+t.getLiteral())) {
                            matched = literal + letters[i+1].literal;
                            begin = beginOfSyllable + 1;
                        }
                    }
                } else {
                    matched = literal;
                    begin = beginOfSyllable;
                }
            }
        } else {
            // when there is no matched lexcial roots
            //console.log(`i: ${i}, letter[i]: ${letters[i].literal}, literal: ${literal}`)
            if(i+1 < letters.length && sft.beginWith(letters[i+1].literal)) {
                //console.log(`tone: ${letters[i+1].literal}, rule: ${urs.get(letters[i+1].literal)[0].getLiteral()}`)
                const ts = urs.get(letters[i+1].literal)
                for(let t of ts) {
                    if(list_of_lexical_roots.includes(literal+t.getLiteral())) {
                        matched = literal + letters[i+1].literal;
                        begin = beginOfSyllable + 1;
                    }
                }
            } else {
                // when there is not matched lexciall roots for this syllable, we still assign begin
                begin = beginOfSyllable;
            }
        }
    }
    //console.log('matched: ' + matched)
    const cog = new ClientOfTonalGenerator()
    //console.log('matched: ' + matched)
    let list: Array<Sound[]> = new Array()
    if(matched.length > 0) list = cog.generate('', 0, matched)
    //console.log(list)

    //const list = syllabary.getFirstLetter(letters[beginOfSyllable].literal, len);

    let matchedLen = 0;
    let mp = new MatchedPattern();

    for (let m in list) {
        let min = Math.min(letters.length - beginOfSyllable, list[m].length);
        if (list[m].length == min) {
            for (let n = 0; n < min; n++) {
                if (list[m][n] != undefined) {
                    if (letters[beginOfSyllable + n].literal === list[m][n].getLiteral()) {
                        //console.log(syllabary[m])
                        if (n + 1 == min && min > matchedLen) {
                            // to make sure it is longer than previous patterns
                            // last letter matched for the pattern
                            matchedLen = min;
                            // copy the matched letters
                            for (let q = 0; q < matchedLen; q++) {
                                mp.letters[q] = letters[beginOfSyllable + q];
                            }

                            // copy the pattern of sounds
                            mp.pattern = list[m];
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

export class TonalSyllable extends Syllable {
    popLetter() {
        let tmp = this.literal.substr(0, this.literal.length - this.letters[this.letters.length - 1].literal.length);
        this.literal = '';
        this.literal = tmp;
        this.letters = this.letters.slice(0, this.letters.length - 1);
    }

    get lastLetter() {
        if (this.letters.length >= 1) return this.letters[this.letters.length - 1];
        return new AlphabeticLetter();
    }

    get lastSecondLetter() {
        if (this.letters.length >= 2) return this.letters[this.letters.length - 2];
        return new AlphabeticLetter();
    }
}

//------------------------------------------------------------------------------
//  Tonal Uncombining Morpheme
//------------------------------------------------------------------------------

export class TonalUncombiningMorpheme extends Morpheme {
    syllable: TonalSyllable;
    allomorph: Allomorph; // required to populate stems
    metaplasm: TonalCombiningMetaplasm;
    sounds: Array<Sound>; // populated in MorphemeMaker.make

    constructor(syllable: TonalSyllable, tsm: TonalCombiningMetaplasm) {
        super();
        this.syllable = syllable;
        this.metaplasm = tsm;

        // assign allomorph for each syllable
        this.allomorph = this.assignAllomorph(this.syllable);
        this.sounds = new Array();
    }

    apply(): any {
        return this.metaplasm.apply(this.syllable, this.allomorph);
    }

    private assignAllomorph(syllable: TonalSyllable): Allomorph {
        let allomorph: Allomorph = new ZeroAllomorph();
        // assign the matched allomorph for this syllable
        let aoas: Array<Allomorph> = []; // array of allomorphs

        let keys = Array.from(checkedAllomorphs.keys());
        for (let k = 0; k < keys.length; k++) {
            let am = checkedAllomorphs.get(keys[k]);
            if (am instanceof CheckedAllomorph) {
                if (am.tonal) {
                    if (
                        am.tonal.getLiteral() === syllable.lastLetter.literal &&
                        am.final.getLiteral() === syllable.lastSecondLetter.literal
                    ) {
                        aoas.push(checkedAllomorphs.get(keys[k]));
                        break;
                    } else {
                        if (am.final.getLiteral() === syllable.lastLetter.literal) {
                            aoas.push(checkedAllomorphs.get(keys[k]));
                            break;
                        }
                    }
                }
            }
        }

        if (aoas.length > 0) {
            // there is only one match after processing, we just assign it
            let ret = aoas.shift();
            if (ret) return ret;
        }

        // after matching with checked allomorphs, we go on matching free allomorphs
        aoas = [];
        if (freeAllomorphs.has(syllable.lastLetter.literal)) {
            aoas.push(freeAllomorphs.get(syllable.lastLetter.literal));
        }

        if (aoas.length == 0) {
            // tone 1 has no allomorph
            allomorph = new ZeroAllomorph();
        } else if (aoas.length == 1) {
            // are there multiple allomorphs? there should be only one.
            for (let i = 0; i < aoas.length; i++) {
                if (aoas[i].tonal.isEqualToTonal(new AllomorphX().tonal)) {
                    // this syllable is already in base form
                    // in order to display this inflectional ending, we have to assign
                    allomorph = aoas[i];
                } else {
                    allomorph = aoas[i];
                }
            }
        }
        return allomorph;
    }
}

//------------------------------------------------------------------------------
//  Tonal Lemmatization Morpheme Maker
//------------------------------------------------------------------------------

export class TonalUncombiningMorphemeMaker extends MorphemeMaker {
    graphemes: Array<AlphabeticGrapheme>;
    metaplasm: TonalCombiningMetaplasm;

    constructor(gs: Array<AlphabeticGrapheme>, tsm: TonalCombiningMetaplasm) {
        super();
        this.graphemes = new Array();
        this.graphemes = gs;
        this.metaplasm = tsm;
    }

    createMorphemes() {
        return new Array<TonalUncombiningMorpheme>();
    }

    createMorpheme(msp: MatchedPattern, tcm: TonalCombiningMetaplasm) {
        let tsm: TonalUncombiningMorpheme;
        tsm = new TonalUncombiningMorpheme(new TonalSyllable(msp.letters), tcm);
        tsm.sounds = msp.pattern;
        return tsm;
    }

    makeMorphemes() {
        return this.make(this.preprocess(), syllabifyTonal);
    }
}
