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
    lowerLettersOfTonal,
    tonalPositionalSound,
    TonalSoundTags,
    FirstTonalF,
    ThirdFifthTonalsWX,
} from './version2';
import { CheckedAllomorph, FreeAllomorph, Allomorph } from './version2';
import { AlphabeticLetter, AlphabeticGrapheme, Sound } from '../grapheme';
import { TonalSoundGenerator } from './soundgen';
import { list_of_lexical_roots } from './lexicalroots2';
import {
    sm_mnng_h_f,
    sm_mnng_hh_wx,
    sm_bgkp_f,
    sm_bbggkkpp_wx,
    regex_jls_f,
    regex_mnng_h_f,
    regex_jjllss_wx,
    regex_mnng_hh_wx,
    sm_m_hh_w,
    sm_jls_f,
    sm_jjllss_wx,
} from './matcher';
import { SetOfInitialConsonants } from '../kana/kana';

//------------------------------------------------------------------------------

export class TonalUncombiningForms extends TonalCombiningMetaplasm {
    apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
        // get base forms as strings
        if (allomorph) {
            // member variable allomorph is not null
            if (allomorph instanceof FreeAllomorph) {
                if (allomorph instanceof ZeroAllomorph) {
                    // no need to pop letter
                    // push letter to make tone 2
                    // the base tone of the first tone is the second tone
                    // 1 to 2
                    let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
                    s.pushLetter(new AlphabeticLetter(freeAllomorphUncombiningRules.get('zero')[0].characters));
                    //console.log(this.syllable)
                    return [s];
                } else {
                    // the 7th tone has two baseforms
                    let ret = [];
                    for (let i in freeAllomorphUncombiningRules.get(allomorph.toString())) {
                        // pop letter
                        // push letter
                        let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
                        if (!(freeAllomorphUncombiningRules.get(allomorph.toString())[i] instanceof ZeroAllomorph)) {
                            // when there is allomorph
                            // 2 to 3. 3 to 7. 7 to 5. 3 to 5.
                            s.popLetter();
                            // there are base tonals
                            // includes ss and x, exclude zero allomorph
                            s.pushLetter(
                                new AlphabeticLetter(
                                    freeAllomorphUncombiningRules.get(allomorph.toString())[i].characters,
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
                let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
                s.popLetter();
                //console.log(s.literal)
                return [s];
            }
        }
        return []; // return empty array
    }
}

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
    const faurs = freeAllomorphUncombiningRules;

    const slicer = function(letters: Array<AlphabeticLetter>, beginOfSyllable: number, i: number) {
        const slicedLetters = letters.slice(beginOfSyllable, i);
        let lit = '';
        for (let i in slicedLetters) {
            lit = lit + slicedLetters[i].literal;
        }
        return lit;
    };

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
        } else if (sft.beginWith(letters[i].literal)) {
            // console.log('i: %d', i)
            // console.log(`i: ${i}, literal: ${literal}, letters[i].literal, ${letters[i].literal}`)

            // when there are tonals

            if (
                (literal.length > 1 && sm_bgkp_f(letters[i - 1].literal, letters[i].literal)) ||
                (literal.length > 1 && sm_bbggkkpp_wx(letters[i - 1].literal, letters[i].literal))
            ) {
                // this combining form is not present in the pool.
                matched = literal;
                Object.assign(matchedLtrs, ltrs);
                break;
            } else if (
                literal.length > 2 &&
                sm_m_hh_w(letters[i - 2].literal, letters[i - 1].literal, letters[i].literal)
            ) {
                // for lexical roots end with ~mhhw.
                matched = literal;
                Object.assign(matchedLtrs, ltrs);
                break;
            }

            const ts = faurs.get(letters[i].literal);
            //console.log(ts)
            if (ts.length > 0) {
                for (let t of ts) {
                    //console.log(lit + t.toString())
                    if (list_of_lexical_roots.includes(slicer(letters, beginOfSyllable, i) + t.toString())) {
                        // this combining form is not present in the pool,
                        // but its uncombining forms are. e.g. aw.
                        matched = literal;
                        //begin = beginOfSyllable;
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

            // when there are no tonals

            if (letters[i].literal === TonalLetterTags.gg) {
                // for surface form gg whose underlying form could be tt or kk.
                matched = literal;
                Object.assign(matchedLtrs, ltrs);
            } else if (!sft.beginWith(letters[i].literal)) {
                // free first tone without a free tonal
                const ts = faurs.get(TonalLetterTags.zero);
                for (let t of ts) {
                    // append second tonal letter
                    // check the uncombining forms
                    if (list_of_lexical_roots.includes(literal + t.toString())) {
                        // if the free first tone's lemma is included
                        matched = literal;
                        Object.assign(matchedLtrs, ltrs);
                        //break;
                    }
                }
            }

            // when there is no matched lexcial roots for this syllable, we still assign begin
            begin = beginOfSyllable;
        }
    }

    // console.log(`literal: ${literal}. matched: ${matched}`)
    // console.log(matchedLtrs)

    if (matched.length > 0 && literal.length > matched.length) {
        // when ~ay is longer than ~a by one letter y
        // for those first tone lexcial roots that are present
        matched = '';
        matchedLtrs = [];
    }

    //console.log('matched: ' + matched)
    const tsg = new TonalSoundGenerator();
    //console.log('matched: ' + matched)
    let list: Array<Sound[]> = new Array();

    if (matched.length > 0) {
        list = tsg.generate(matchedLtrs);
    } else {
        if (ltrs.length == 3 && ltrs[1] === 'a' && ltrs[2] === 'y') {
            const ep = new Epenthesis();
            const rea = new RemovingEpenthesisOfAy();
            const done = rea.applyToString(literal);
            //console.log(done.toString())
            if (ep.beginWith(ltrs[0]) && list_of_lexical_roots.includes(done)) {
                list = tsg.generate(ltrs);
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
                    if (letters[beginOfSyllable + n].literal === list[m][n].toString()) {
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
        this.letters = this.letters.slice(0, this.letters.length - 1);
        this.concat();
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

export class TonalUncombiningMorpheme extends Morpheme {
    syllable: TonalSyllable;
    allomorph: Allomorph;
    private metaplasm: TonalCombiningMetaplasm;
    sounds: Array<Sound>;

    constructor(syllable: TonalSyllable, sounds: Array<Sound>, tcm: TonalCombiningMetaplasm) {
        super();
        this.syllable = syllable;
        this.metaplasm = tcm;

        // assign allomorph for each syllable
        this.allomorph = this.assignAllomorph(this.syllable);
        this.sounds = new Array();
        this.sounds = sounds;
    }

    getForms(): TonalSyllable[] {
        return this.metaplasm.apply(this.sounds, this.allomorph);
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
                        am.tonal.toString() === syllable.lastLetter.literal &&
                        am.final.toString() === syllable.lastSecondLetter.literal
                    ) {
                        aoas.push(checkedAllomorphs.get(keys[k]));
                        break;
                    } else {
                        if (am.final.toString() === syllable.lastLetter.literal) {
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

export class TonalUncombiningMorphemeMaker extends MorphemeMaker {
    private metaplasm: TonalCombiningMetaplasm;
    private euphonicFinals = new Array<AlphabeticLetter>();
    private euphonicFinalTonals = new Array<{ index: number; letters: AlphabeticLetter[] }>();

    constructor(tcm: TonalCombiningMetaplasm) {
        super();
        this.metaplasm = tcm;
    }

    protected createMorphemes() {
        return new Array<TonalUncombiningMorpheme>();
    }

    protected createMorpheme(msp: MatchedPattern) {
        const tum: TonalUncombiningMorpheme = new TonalUncombiningMorpheme(
            new TonalSyllable(msp.letters),
            msp.pattern,
            this.metaplasm,
        );
        return tum;
    }

    private preprocessEuphonicFinal(letters: Array<AlphabeticLetter>) {
        this.euphonicFinals.push(letters[letters.length - 1]);
        return letters.slice(0, letters.length - 1);
    }

    private preprocessEuphonicFinalTonal(
        letters: Array<AlphabeticLetter>,
        literal: string,
        regex: RegExp,
        len: number,
    ) {
        const arr = literal.match(regex);
        // console.log(arr)

        let indx = -1;
        if (len == 1) {
            for (let i = 0; i < letters.length - 1; i++) {
                if (
                    sm_jls_f(letters[i].literal, letters[i + 1].literal) ||
                    sm_jjllss_wx(letters[i].literal, letters[i + 1].literal)
                ) {
                    indx = i;
                    break;
                }
            }
        } else if (len == 2) {
            for (let i = 0; i < letters.length - 2; i++) {
                if (
                    sm_mnng_h_f(letters[i].literal, letters[i + 1].literal, letters[i + 2].literal) ||
                    sm_mnng_hh_wx(letters[i].literal, letters[i + 1].literal, letters[i + 2].literal)
                ) {
                    indx = i;
                    break;
                }
            }
        }

        if (arr) {
            for (let i in arr) {
                const idxl = literal.search(arr[i]);
                const sub1 = literal.substring(0, idxl);
                const sub2 = literal.substring(idxl + arr[i].length);

                // in case of hmhhw or hmhhwhmhhw
                // check if the previous letter is a consonant
                if (new SetOfInitialConsonants().beginWith(sub1)) return letters;

                let fnl;
                if (new FirstTonalF().beginWith(arr[i].charAt(arr[i].length - 1))) {
                    literal = sub1.concat(TonalLetterTags.t + TonalLetterTags.f, sub2);
                    fnl = letters.splice(indx, len, lowerLettersOfTonal.get(TonalLetterTags.t));
                } else if (new ThirdFifthTonalsWX().beginWith(arr[i].charAt(arr[i].length - 1))) {
                    if (arr[i].charAt(arr[i].length - 1) === TonalLetterTags.w)
                        literal = sub1.concat(TonalLetterTags.tt + TonalLetterTags.w, sub2);
                    else if (arr[i].charAt(arr[i].length - 1) === TonalLetterTags.x)
                        literal = sub1.concat(TonalLetterTags.tt + TonalLetterTags.x, sub2);
                    fnl = letters.splice(indx, len, lowerLettersOfTonal.get(TonalLetterTags.tt));
                }

                // console.log(literal)

                if (fnl && len == 1) this.euphonicFinalTonals.push({ index: indx, letters: [fnl[0]] });
                else if (fnl && len == 2) this.euphonicFinalTonals.push({ index: indx, letters: [fnl[0], fnl[1]] });
            }

            // console.log(this.euphonicFinalTonals[0].letters)
        }

        return letters;
    }

    private replaceEuphonicFinal(letters: Array<AlphabeticLetter>) {
        const slicedLetters = letters.slice(0, letters.length - 1);
        const literal = slicedLetters.map(it => it.literal).join('');
        if (
            letters.length > 0 &&
            letters[letters.length - 1].literal === TonalLetterTags.gg &&
            list_of_lexical_roots.includes(literal + TonalLetterTags.tt) &&
            !list_of_lexical_roots.includes(literal + TonalLetterTags.kk)
        ) {
            // for surface form gg whose underlying form is tt but not kk
            const ls = this.preprocessEuphonicFinal(letters);
            ls.push(lowerLettersOfTonal.get(TonalLetterTags.tt));
            return ls;
        }
        return letters;
    }

    private replaceEuphonicFinalTonal(letters: Array<AlphabeticLetter>) {
        let literal = letters.map(x => x.literal).join('');

        if (literal.length > 1 && regex_jls_f.test(literal)) {
            const ls = this.preprocessEuphonicFinalTonal(letters, literal, regex_jls_f, 1);
            return ls;
        } else if (literal.length > 1 && regex_jjllss_wx.test(literal)) {
            const ls = this.preprocessEuphonicFinalTonal(letters, literal, regex_jjllss_wx, 1);
            return ls;
        } else if (literal.length > 2 && regex_mnng_h_f.test(literal)) {
            const ls = this.preprocessEuphonicFinalTonal(letters, literal, regex_mnng_h_f, 2);
            return ls;
        } else if (literal.length > 2 && regex_mnng_hh_wx.test(literal)) {
            const ls = this.preprocessEuphonicFinalTonal(letters, literal, regex_mnng_hh_wx, 2);
            return ls;
        }

        return letters;
    }

    private replaceInitial() {
        return [];
    }

    private replaceMedial() {
        return [];
    }

    protected preprocess(gs: Array<AlphabeticGrapheme>): AlphabeticLetter[] {
        let ltrs = new Array<AlphabeticLetter>();

        ltrs = gs.map(it => it.letter);

        ltrs = this.replaceEuphonicFinal(ltrs);

        ltrs = this.replaceEuphonicFinalTonal(ltrs);

        return ltrs;
    }

    private postprocess_euphonic_t_or_tt(pattern: MatchedPattern) {
        if (
            (pattern.letters[pattern.letters.length - 1].literal === TonalLetterTags.t ||
                pattern.letters[pattern.letters.length - 1].literal === TonalLetterTags.tt) &&
            this.euphonicFinals.length > 0
        ) {
            pattern.letters.pop();
            pattern.pattern.pop();
            const fnl = this.euphonicFinals.pop();
            if (fnl) {
                pattern.letters.push(fnl);
                const snd = tonalPositionalSound.get(fnl.literal);
                if (snd) pattern.pattern.push(snd(TonalSoundTags.stopFinal));
            }
        } else if (this.euphonicFinalTonals.length > 0) {
            const fnl = this.euphonicFinalTonals.pop();
            if (fnl) {
                if (fnl.letters.length == 1) {
                    pattern.letters.splice(fnl.index, 1, fnl.letters[0]);
                    const snd = tonalPositionalSound.get(fnl.letters[0].literal);
                    if (snd) pattern.pattern.splice(fnl.index, 1, snd(TonalSoundTags.stopFinal));
                } else if (fnl.letters.length == 2) {
                    // console.log(pattern)
                    pattern.letters.splice(fnl.index, 1, fnl.letters[0], fnl.letters[1]);
                    const snd1 = tonalPositionalSound.get(fnl.letters[0].literal);
                    const snd2 = tonalPositionalSound.get(fnl.letters[1].literal);
                    if (snd1 && snd2)
                        pattern.pattern.splice(
                            fnl.index,
                            1,
                            snd1(TonalSoundTags.nasalFinal),
                            snd2(TonalSoundTags.stopFinal),
                        );
                    // console.log(pattern)
                }
            }
        }
        return pattern;
    }

    protected postprocess(patterns: MatchedPattern[]): Array<Morpheme> {
        let morphemes = this.createMorphemes();
        for (let i in patterns) {
            const pat = this.postprocess_euphonic_t_or_tt(patterns[i]);

            morphemes.push(this.createMorpheme(pat));
        }
        return morphemes;
    }

    makeMorphemes(gs: Array<AlphabeticGrapheme>) {
        const ltrs = this.preprocess(gs);
        const ptrns = this.make(ltrs, syllabifyTonal);
        const ms = this.postprocess(ptrns);

        return ms;
    }
}
