import {
    Syllable,
    Morpheme,
    MorphemeMaker,
    MatchedPattern,
    TonalCombiningMetaplasm,
    RemovingEpenthesisOfAy
} from '../morpheme';
import {
    free_allomorph_uncombining_rules,
    checked_allomorphs,
    free_allomorphs,
    ZeroAllomorph,
    AllomorphX,
    FreeTonalSounds,
    StopFinalSounds,
    EpentheticSounds,
    TonalLetterTags,
    lowerLettersTonal,
    tonal_positional_sounds,
    TonalSoundTags,
    FirstTonalF,
    ThirdFifthTonalsWX,
    uncombining_rules_ay,
    AllomorphZ,
    ZeroTonal,
    FreeTonalZ,
    FreeTonalX
} from './version2';
import { CheckedAllomorph, FreeAllomorph, Allomorph } from './version2';
import { AlphabeticLetter, AlphabeticGrapheme, Sound } from '../grapheme';
import { TonalSoundGenerator } from './soundgen';
import { lexical_roots } from './lexicalroots2';
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
    sm_jjllss_wx
} from './matcher';
import { InitialSounds } from './version2';

//------------------------------------------------------------------------------

export class TonalUncombiningForms extends TonalCombiningMetaplasm {
    apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
        if (allomorph) {
            if (allomorph instanceof FreeAllomorph) {
                if (allomorph instanceof ZeroAllomorph) {
                    // push y to make tone 2
                    // 1 to 2
                    const s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
                    const tnls = free_allomorph_uncombining_rules.get('zero');
                    if (tnls) s.pushLetter(new AlphabeticLetter(tnls[0].characters));
                    return [s];
                } else {
                    // the 7th tone has two baseforms
                    const ret = [];
                    const rules = free_allomorph_uncombining_rules.get(allomorph.toString());
                    const tnls = !rules ? [] : rules;
                    for (let i in tnls) {
                        let s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
                        if (!(tnls[i] instanceof ZeroAllomorph)) {
                            // 2 to 3. 3 to 7. 7 to 5. 3 to 5.
                            // replace z with f or x
                            s.popLetter();
                            s.pushLetter(new AlphabeticLetter(tnls[i].characters));
                            ret.push(s);
                        } else {
                            // 7 to 1
                            // pop z
                            s.popLetter();
                            ret.push(s);
                        }
                    }
                    return ret;
                }
            } else if (allomorph instanceof CheckedAllomorph) {
                // pop the tone letter
                // 1 to 4. 3 to 8. 2 to 4. 5 to 8.
                if (allomorph.tonal.toString() === '') return [];
                const s: TonalSyllable = new TonalSyllable(sounds.map(x => new AlphabeticLetter(x.characters)));
                s.popLetter();
                return [s];
            }
        }
        return [];
    }
}

//------------------------------------------------------------------------------

export class CombiningAy extends TonalCombiningMetaplasm {
    apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
        if (allomorph) {
            if (allomorph.tonal.toString() === TonalLetterTags.f) {
                if (allomorph instanceof FreeAllomorph) {
                    const ret = [];
                    const rls = uncombining_rules_ay.get(allomorph.toString());
                    const tnls = !rls ? [] : rls;
                    for (let i in tnls) {
                        let s: TonalSyllable = new TonalSyllable(sounds.map(it => new AlphabeticLetter(it.characters)));
                        // 1 to 2. 1 to 3
                        // replace f with y or w
                        s.popLetter();
                        s.pushLetter(new AlphabeticLetter(tnls[i].characters));
                        ret.push(s);
                    }
                    return ret;
                } else if (allomorph instanceof CheckedAllomorph) {
                    const s: TonalSyllable = new TonalSyllable(sounds.map(it => new AlphabeticLetter(it.characters)));
                    // pop f
                    s.popLetter();
                    return [s];
                }
            } else if (allomorph.tonal.toString() === TonalLetterTags.x) {
                // 5 to 1. 5 to 7. 5 to 5.
                if (allomorph instanceof FreeAllomorph) {
                    const ret = [];
                    const rls = uncombining_rules_ay.get(allomorph.toString());
                    const tnls = !rls ? [] : rls;
                    for (let i in tnls) {
                        let s: TonalSyllable = new TonalSyllable(sounds.map(it => new AlphabeticLetter(it.characters)));
                        if (!(tnls[i] instanceof ZeroTonal)) {
                            if (tnls[i] instanceof FreeTonalZ) {
                                // 5 to 7
                                // replace x with z
                                s.popLetter();
                                s.pushLetter(new AlphabeticLetter(tnls[i].characters));
                                ret.push(s);
                            } else if (tnls[i] instanceof FreeTonalX) {
                                // 5 to 5
                                ret.push(s);
                            }
                        } else {
                            // 5 to 1
                            // pop x
                            s.popLetter();
                            ret.push(s);
                        }
                    }
                    return ret;
                } else if (allomorph instanceof CheckedAllomorph) {
                    // 5 to 8.
                    const s: TonalSyllable = new TonalSyllable(sounds.map(it => new AlphabeticLetter(it.characters)));
                    // pop x
                    s.popLetter();
                    return [s];
                }
            } else if (allomorph.tonal.toString() === TonalLetterTags.y) {
                return [];
            }
        }
        return [];
    }
}

//------------------------------------------------------------------------------

export class TonalReduplication extends TonalCombiningMetaplasm {
    constructor(private sounds: Sound[]) {
        super();
    }
    apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
        if (allomorph) {
            // skip the last syllable. it is the baseform
            if (this.sounds[this.sounds.length - 1].toString() === sounds[sounds.length - 1].toString()) return [];
            const s: TonalSyllable = new TonalSyllable(this.sounds.map(it => new AlphabeticLetter(it.characters)));
            return [s];
        }
        return [];
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
    const sft = new FreeTonalSounds();
    const ssf = new StopFinalSounds();
    const faurs = free_allomorph_uncombining_rules;
    const ursa = uncombining_rules_ay;

    for (let i = beginOfSyllable; i < letters.length; i++) {
        literal = literal + letters[i].literal;
        ltrs.push(letters[i].literal);
        //console.log(`begining of the loop: ${literal}. ${ltrs}`)
        if (lexical_roots.includes(literal) && sft.includes(letters[i].literal)) {
            //console.log(`i: ${i}, literal: ${literal}, tone: ${letters[i].literal}, letters[i+1]: ${letters[i + 1].literal}`)
            if (begin === beginOfSyllable) {
                matched = literal;
                Object.assign(matchedLtrs, ltrs);
            }
            break;
        } else if (lexical_roots.includes(literal) && ssf.includes(letters[i].literal)) {
            //console.log(`i: ${i}, literal: ${literal}, stopFinal: ${letters[i].literal}`)
            //console.log(`begin: ${begin}, beginOfSyllable: ${beginOfSyllable}`)
            if (begin === beginOfSyllable) {
                matched = literal;
                Object.assign(matchedLtrs, ltrs);
            }
            break;
        } else if (sft.includes(letters[i].literal)) {
            // check tonals is the subset of free tonals

            // console.log('i: %d', i)
            // console.log(`i: ${i}, literal: ${literal}, letters[i].literal, ${letters[i].literal}`)

            // when there are tonals

            if (
                literal.length > 1 &&
                letters[i] &&
                letters[i - 1] &&
                (sm_bgkp_f(letters[i - 1].literal, letters[i].literal) ||
                    sm_bbggkkpp_wx(letters[i - 1].literal, letters[i].literal))
            ) {
                // this combining form is not present in the pool.
                matched = literal;
                Object.assign(matchedLtrs, ltrs);
                break;
            } else if (
                literal.length > 2 &&
                letters[i] &&
                letters[i - 1] &&
                letters[i - 2] &&
                sm_m_hh_w(letters[i - 2].literal, letters[i - 1].literal, letters[i].literal)
            ) {
                // for lexical roots end with ~mhhw.
                matched = literal;
                Object.assign(matchedLtrs, ltrs);
                break;
            }

            // tone sandhi of free allomorph
            const rules_fa = faurs.get(letters[i].literal);
            const tnls_fa = !rules_fa ? [] : rules_fa.map(x => x.toString());
            // tone sandhi of ay
            const rules_ay = ursa.get(letters[i].literal);
            const tnls_ay = !rules_ay ? [] : rules_ay.map(x => x.toString());
            // merge the above twoo arrays
            const tnls = tnls_fa.concat(tnls_ay.filter(item => tnls_fa.indexOf(item) < 0));
            //console.log(ts)
            if (tnls.length > 0) {
                for (let t of tnls) {
                    //console.log(lit + t.toString())
                    if (
                        lexical_roots.includes(
                            letters
                                .slice(beginOfSyllable, i)
                                .map(x => x.literal)
                                .join('') + t
                        )
                    ) {
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
        } else if (lexical_roots.includes(literal)) {
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
            } else if (!sft.includes(letters[i].literal)) {
                // free first tone without a free tonal
                const rules = faurs.get(TonalLetterTags.zero);
                const tnls = !rules ? [] : rules;
                for (let t of tnls) {
                    // append second tonal letter
                    // check the uncombining forms
                    if (lexical_roots.includes(literal + t.toString())) {
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
            const ep = new EpentheticSounds();
            const rea = new RemovingEpenthesisOfAy();
            const done = rea.applyToString(literal);
            //console.log(done.toString())
            if (ep.includes(ltrs[0]) && lexical_roots.includes(done)) {
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
        return new AlphabeticLetter([]);
    }

    get lastSecondLetter() {
        if (this.letters.length >= 2) return this.letters[this.letters.length - 2];
        return new AlphabeticLetter([]);
    }
}

//------------------------------------------------------------------------------

export class TonalUncombiningMorpheme extends Morpheme {
    syllable: TonalSyllable;
    allomorph: Allomorph;
    private metaplasm: TonalCombiningMetaplasm;
    private forms: TonalSyllable[];
    sounds: Array<Sound>;

    constructor(syllable: TonalSyllable, sounds: Array<Sound>, metaplasm: TonalCombiningMetaplasm) {
        super();
        this.syllable = syllable;
        this.metaplasm = metaplasm;

        // assign allomorph for each syllable
        this.allomorph = this.assignAllomorph(this.syllable);
        this.sounds = sounds;
        this.forms = this.metaplasm.apply(this.sounds, this.allomorph);
    }

    getForms(): TonalSyllable[] {
        return this.forms;
    }

    private assignAllomorph(syllable: TonalSyllable): Allomorph {
        let allomorph: Allomorph = new ZeroAllomorph();
        // assign the matched allomorph for this syllable
        let aoas: Array<Allomorph> = []; // array of allomorphs

        let keys = Array.from(checked_allomorphs.keys());
        for (let k = 0; k < keys.length; k++) {
            let am = checked_allomorphs.get(keys[k]);
            if (am && am instanceof CheckedAllomorph) {
                if (am.tonal) {
                    if (
                        am.tonal.toString() === syllable.lastLetter.literal &&
                        am.final.toString() === syllable.lastSecondLetter.literal
                    ) {
                        aoas.push(am);
                        break;
                    } else {
                        if (am.final.toString() === syllable.lastLetter.literal) {
                            aoas.push(am);
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
        if (free_allomorphs.has(syllable.lastLetter.literal)) {
            const am = free_allomorphs.get(syllable.lastLetter.literal);
            if (am) aoas.push(am);
            else aoas.push(new Allomorph());
        }

        if (aoas.length == 0) {
            // tone 1 has no allomorph
            allomorph = new ZeroAllomorph();
        } else if (aoas.length == 1) {
            // are there multiple allomorphs? there should be only one.
            for (let i = 0; i < aoas.length; i++) {
                if (aoas[i].tonal.toString() === new AllomorphX().tonal.toString()) {
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
    private euphonicFinals = new Array<AlphabeticLetter>();
    private euphonicFinalTonals = new Array<{ index: number; letters: AlphabeticLetter[] }>();

    constructor() {
        super();
    }

    protected createMorphemes() {
        return new Array<TonalUncombiningMorpheme>();
    }

    protected createMorpheme(matched: MatchedPattern, metaplasm: TonalCombiningMetaplasm) {
        const tum: TonalUncombiningMorpheme = new TonalUncombiningMorpheme(
            new TonalSyllable(matched.letters),
            matched.pattern,
            metaplasm
        );
        return tum;
    }

    private isCombiningAy(patterns: MatchedPattern[]) {
        const keys_ay = Array.from(uncombining_rules_ay.keys());

        if (
            patterns.length == 2 &&
            keys_ay.filter(it => it === patterns[patterns.length - 2].lastLetter.literal).length > 0 &&
            ((patterns[patterns.length - 1].lastSecondLetter.literal === TonalLetterTags.a &&
                patterns[patterns.length - 1].lastLetter.literal === TonalLetterTags.y) ||
                patterns[patterns.length - 1].lastLetter.literal === TonalLetterTags.a)
        ) {
            return true;
        }
        return false;
    }

    private isReduplicated3x(matches: MatchedPattern[]) {
        if (matches.length == 3) {
            const stms = matches
                .map(it => it.pattern.filter(s => s.name !== TonalSoundTags.freeTonal))
                .map(seq => seq.map(s => s.toString()).join(''));

            // TODO: add checks for tone group
            const tnls = matches
                .map(it => it.pattern.filter(s => s.name === TonalSoundTags.freeTonal))
                .map(seq => seq.map(s => s.toString()).join(''));

            // compare 3 strings/lexical stems
            if (stms.every((v, i, a) => v === a[0])) return true; // identical
        }
        return false;
    }

    private preprocessEuphonicFinal(letters: Array<AlphabeticLetter>) {
        this.euphonicFinals.push(letters[letters.length - 1]);
        return letters.slice(0, letters.length - 1);
    }

    private preprocessEuphonicFinalTonal(
        letters: Array<AlphabeticLetter>,
        literal: string,
        regex: RegExp,
        len: number
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
                if (new InitialSounds().includes(sub1)) return letters;

                let fnl;
                if (new FirstTonalF().includes(arr[i].charAt(arr[i].length - 1))) {
                    literal = sub1.concat(TonalLetterTags.t + TonalLetterTags.f, sub2);
                    fnl = letters.splice(indx, len, lowerLettersTonal.get(TonalLetterTags.t));
                } else if (new ThirdFifthTonalsWX().includes(arr[i].charAt(arr[i].length - 1))) {
                    if (arr[i].charAt(arr[i].length - 1) === TonalLetterTags.w)
                        literal = sub1.concat(TonalLetterTags.tt + TonalLetterTags.w, sub2);
                    else if (arr[i].charAt(arr[i].length - 1) === TonalLetterTags.x)
                        literal = sub1.concat(TonalLetterTags.tt + TonalLetterTags.x, sub2);
                    fnl = letters.splice(indx, len, lowerLettersTonal.get(TonalLetterTags.tt));
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
            lexical_roots.includes(literal + TonalLetterTags.tt) &&
            !lexical_roots.includes(literal + TonalLetterTags.kk)
        ) {
            // for surface form gg whose underlying form is tt but not kk
            const ls = this.preprocessEuphonicFinal(letters);
            ls.push(lowerLettersTonal.get(TonalLetterTags.tt));
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

    protected preprocess(graphemes: Array<AlphabeticGrapheme>): AlphabeticLetter[] {
        let ltrs = new Array<AlphabeticLetter>();

        ltrs = graphemes.map(it => it.letter);

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
                const snd = tonal_positional_sounds.get(fnl.literal);
                if (snd) pattern.pattern.push(snd(TonalSoundTags.stopFinal));
            }
        } else if (this.euphonicFinalTonals.length > 0) {
            const fnl = this.euphonicFinalTonals.pop();
            if (fnl) {
                if (fnl.letters.length == 1) {
                    pattern.letters.splice(fnl.index, 1, fnl.letters[0]);
                    const snd = tonal_positional_sounds.get(fnl.letters[0].literal);
                    if (snd) pattern.pattern.splice(fnl.index, 1, snd(TonalSoundTags.stopFinal));
                } else if (fnl.letters.length == 2) {
                    // console.log(pattern)
                    pattern.letters.splice(fnl.index, 1, fnl.letters[0], fnl.letters[1]);
                    const snd1 = tonal_positional_sounds.get(fnl.letters[0].literal);
                    const snd2 = tonal_positional_sounds.get(fnl.letters[1].literal);
                    if (snd1 && snd2)
                        pattern.pattern.splice(
                            fnl.index,
                            1,
                            snd1(TonalSoundTags.nasalFinal),
                            snd2(TonalSoundTags.stopFinal)
                        );
                    // console.log(pattern)
                }
            }
        }
        return pattern;
    }

    protected postprocess(matched: MatchedPattern[]): Array<Morpheme> {
        const morphemes = this.createMorphemes();

        for (let i in matched) {
            const ptn = this.postprocess_euphonic_t_or_tt(matched[i]);

            if (this.isCombiningAy(matched)) {
                // ~fa, ~xa, fay, or ~xay
                morphemes.push(this.createMorpheme(ptn, new CombiningAy()));
            } else if (this.isReduplicated3x(matched)) {
                // reduplicate by 3
                morphemes.push(this.createMorpheme(ptn, new TonalReduplication(matched[2].pattern)));
            } else {
                morphemes.push(this.createMorpheme(ptn, new TonalUncombiningForms()));
            }
        }

        return morphemes;
    }

    makeMorphemes(graphemes: Array<AlphabeticGrapheme>) {
        const ltrs = this.preprocess(graphemes);
        const ptns = this.make(ltrs, syllabifyTonal);
        const ms = this.postprocess(ptns);

        return ms;
    }
}
