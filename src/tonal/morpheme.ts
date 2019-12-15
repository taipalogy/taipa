import {
    Syllable,
    Morpheme,
    MorphemeMaker,
    MatchedPattern,
    TonalCombiningMetaplasm,
    RemovingEpenthesisOfAy,
} from '../morpheme';
import {
    freeAllomorphUncombiningRules,
    checkedAllomorphs,
    freeAllomorphs,
    ZeroAllomorph,
    AllomorphX,
    SetOfFreeTonals,
    SetOfStopFinals,
    Epenthesis,
    TonalLetterTags,
    EuphonicFinalsBGJKLPS,
    EuphonicFinalsBBGGJJKKLLPPSS,
    EuphonicTonalF,
    EuphonicTonalWAndX,
    SetOfNeutralFinals,
    SetOfNasalFinals,
    NeutralFinalH,
    NeutralFinalHH,
    SetOfMedials,
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
        }
        return []; // return empty array
    }
}

//------------------------------------------------------------------------------
//  syllabifyTonal
//------------------------------------------------------------------------------

export function syllabifyTonal(letters: Array<AlphabeticLetter>, beginOfSyllable: number) {
    // get the longest matched syllable pattern

    let literal = '';
    let matched = '';
    let begin: number = 0;
    let ltrs: Array<string> = new Array();
    let matchedLtrs: Array<string> = new Array();
    const sft = new SetOfFreeTonals();
    const ssf = new SetOfStopFinals();
    const efs_bgjklps = new EuphonicFinalsBGJKLPS();
    const et_f = new EuphonicTonalF();
    const efs_bbggjjkkllppss = new EuphonicFinalsBBGGJJKKLLPPSS();
    const et_wx = new EuphonicTonalWAndX();
    const nf_h = new NeutralFinalH();
    const nf_hh = new NeutralFinalHH();
    const nfs = new SetOfNasalFinals();
    const faurs = freeAllomorphUncombiningRules;

    for (let i = beginOfSyllable; i < letters.length; i++) {
        literal = literal + letters[i].literal;
        ltrs.push(letters[i].literal);
        //console.log(`begining of the loop: ${literal}. ${ltrs}`)
        if (list_of_lexical_roots.includes(literal) && sft.beginWith(letters[i].literal)) {
            //console.log(`i: ${i}, literal: ${literal}, tone: ${letters[i].literal}, letters[i+1]: ${letters[i + 1].literal}`)
            if (begin === beginOfSyllable) {
                matched = literal;
                Object.assign(matchedLtrs, ltrs);
            }
            break;
        } else if (list_of_lexical_roots.includes(literal) && ssf.beginWith(letters[i].literal)) {
            //console.log(`i: ${i}, literal: ${literal}, stopFinal: ${letters[i].literal}`)
            //console.log(`begin: ${begin}, beginOfSyllable: ${beginOfSyllable}`)
            if (begin === beginOfSyllable) {
                matched = literal;
                Object.assign(matchedLtrs, ltrs);
            }
            break;
        } else if(et_f.beginWith(letters[i].literal) && efs_bgjklps.beginWith(letters[i-1].literal)
                || et_wx.beginWith(letters[i].literal) && efs_bbggjjkkllppss.beginWith(letters[i-1].literal)
        ) {
            // for euphonic change of t and tt.
            // this combining form is not present in the pool.
            matched = literal;
            begin = beginOfSyllable;
            Object.assign(matchedLtrs, ltrs);
            break;
        } else if(literal.length > 2 && et_f.beginWith(letters[i].literal) && nf_h.beginWith(letters[i-1].literal) && nfs.beginWith(letters[i-2].literal)
                || literal.length > 2 && et_wx.beginWith(letters[i].literal) && nf_hh.beginWith(letters[i-1].literal) && nfs.beginWith(letters[i-2].literal)) {
            // for euphonic change of t and tt.
            // this combining form is not present in the pool.
            matched = literal;
            begin = beginOfSyllable;
            Object.assign(matchedLtrs, ltrs);
            break;
        } if (sft.beginWith(letters[i].literal)) {
            //console.log('i: %d', i)
            //console.log(`i: ${i}, literal: ${literal}, letters[i].literal, ${letters[i].literal}`)

            const ts = faurs.get(letters[i].literal);
            //console.log(ts)
            if (ts.length > 0) {
                for (let t of ts) {
                    const slicedLetters = letters.slice(beginOfSyllable, i);
                    let lit = '';
                    for (let i in slicedLetters) {
                        lit = lit + slicedLetters[i].literal;
                    }
                    //console.log(lit + t.getLiteral())
                    if (list_of_lexical_roots.includes(lit + t.getLiteral())) {
                        // this combining form is not present in the pool,
                        // but its uncombining forms are. e.g. aw.
                        matched = literal;
                        begin = beginOfSyllable;
                        Object.assign(matchedLtrs, ltrs);
                        break;
                    }
                }
                if (matched.length > 0 && matchedLtrs.length > 0) break;
            } else {
                // no uncombining forms for this combining form. e.g. ax.
                matched = '';
                matchedLtrs = [];
            }
        } else if (list_of_lexical_roots.includes(literal)) {
            matched = literal;
            Object.assign(matchedLtrs, ltrs);
            begin = beginOfSyllable;
            //console.log(matched)
        } else {
            //console.log('no matched for syllabifyTonal:' + ltrs)
            if (!sft.beginWith(letters[i].literal)) {
                // free first tone without a free tonal
                const ts = faurs.get(TonalLetterTags.zero);
                for (let t of ts) {
                    // append second tonal letter
                    // check the uncombining forms
                    if (list_of_lexical_roots.includes(literal + t.getLiteral())) {
                        // if the free first tone's lemma is included
                        Object.assign(matchedLtrs, ltrs);
                        break;
                    }
                }
            }
            // when there is no matched lexcial roots for this syllable, we still assign begin
            begin = beginOfSyllable;
        }

    }

    //console.log(`literal: ${literal}. matched: ${matched}`)
    //console.log(matchedLtrs)

    if(matched.length > 0 && literal.length > matched.length) {
        // when ~ay is longer than ~a by one letter y
        // for those first tone lexcial roots that are present
        matched = '';
        matchedLtrs = [];
    }

    //console.log('matched: ' + matched)
    const cog = new ClientOfTonalGenerator();
    //console.log('matched: ' + matched)
    let list: Array<Sound[]> = new Array();

    if (matched.length > 0) list = cog.generate(matchedLtrs);
    else if (matched.length == 0 && matchedLtrs.length > 0) {
        // free first tone without a free tonal
        list = cog.generate(matchedLtrs);
    } else {
        if (ltrs.length == 3 && ltrs[1] === 'a' && ltrs[2] === 'y') {
            const ep = new Epenthesis();
            const rea = new RemovingEpenthesisOfAy();
            const done = rea.applyToString(literal);
            //console.log(done.toString())
            if (ep.beginWith(ltrs[0]) && list_of_lexical_roots.includes(done)) {
                list = cog.generate(ltrs);
            }
        }
    }

    //console.log(list)

    let matchedLen = 0;
    let mp = new MatchedPattern();

    for (let m in list) {
        const min = Math.min(letters.length - beginOfSyllable, list[m].length);
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

    apply(): TonalSyllable[] {
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
