import { TonalCombiningMetaplasm } from '../metaplasm';
import {
  TonalWord,
  InflectionalEnding,
  FreeInflectionalEnding,
  CheckedInflectionalEnding,
} from './lexeme';
import { TonalSyllable, TonalUncombiningMorpheme } from './morpheme';
import {
  Allomorph,
  FreeAllomorph,
  ZeroAllomorph,
  freeAllomorphUncombiningRules,
  CheckedAllomorph,
  TonalLetterTags,
  uncombiningRulesAy,
  ZeroTonal,
  FreeTonalZ,
  FreeTonalX,
  lowerLettersTonal,
  neutralFinalSounds,
  TonalSoundTags,
} from './version2';
import { Sound, AlphabeticLetter } from '../unit';
import { TonalLemmatizationMetaplasm } from '../metaplasm';
import {
  finalsBgjlsbbggllss,
  voicedVoicelessFinals,
  nasalFinals,
  fourthToEighthFinals,
} from './collections';

/** Returns the uncombining forms of a syllable. */
export class TonalUncombiningForms extends TonalCombiningMetaplasm {
  constructor(private soundsFollowing: Sound[]) {
    super();
  }
  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
    if (allomorph) {
      if (allomorph instanceof FreeAllomorph) {
        if (allomorph instanceof ZeroAllomorph) {
          // push y to make tone 2
          // 1 to 2
          const s: TonalSyllable = new TonalSyllable(
            sounds.map(x => new AlphabeticLetter(x.characters))
          );
          const tnls = freeAllomorphUncombiningRules.get('zero');
          if (tnls) s.pushLetter(new AlphabeticLetter(tnls[0].characters));
          return [s];
        } else {
          // the 7th tone has two baseforms
          const ret = [];
          const rules = freeAllomorphUncombiningRules.get(allomorph.toString());
          const tnls = !rules ? [] : rules;
          for (let i in tnls) {
            let s: TonalSyllable = new TonalSyllable(
              sounds.map(x => new AlphabeticLetter(x.characters))
            );
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
        const s: TonalSyllable = new TonalSyllable(
          sounds.map(it => new AlphabeticLetter(it.characters))
        );
        const fnl = s.letters[s.letters.length - 1].literal;
        const nslFnls = sounds.filter(
          it => it.name === TonalSoundTags.nasalFinal
        );
        s.popLetter(); // pop out the tonal
        if (
          nslFnls.length == 0 &&
          (fnl === TonalLetterTags.w || fnl === TonalLetterTags.x) &&
          Array.from(fourthToEighthFinals.keys()).includes(s.lastLetter.literal)
        ) {
          // in case of no internal sandhi
          const fnl = s.lastLetter.literal;
          s.popLetter(); // pop the 4th final
          const got = fourthToEighthFinals.get(fnl);
          if (got) s.pushLetter(lowerLettersTonal.get(got)); // push the 8th final
        } else if (finalsBgjlsbbggllss.has(s.lastLetter.literal)) {
          // in case of internal or external sandhi
          const fnlsOfLemma = finalsBgjlsbbggllss.get(
            s.lastLetter.literal + fnl
          );
          // console.log(s, allomorph, fnl, fnlsOfLemma);
          if (fnlsOfLemma) {
            const clones = fnlsOfLemma.map(it => {
              const clone: TonalSyllable = Object.create(s);
              clone.replaceLetter(
                s.letters.length - 1,
                lowerLettersTonal.get(it.toString())
              );
              return clone;
            });
            const ret: TonalSyllable[] = [];
            clones.map(it => ret.push(it));
            return clones;
          }
        } else if (
          sounds.filter(it => it.name === TonalSoundTags.medial).length > 0 &&
          nasalFinals.includes(s.lastSecondLetter.literal) &&
          neutralFinalSounds.includes(s.lastLetter.literal)
        ) {
          // in case of internal sandhi of p or t
          // if there is no medials, e.g. hmhh, hngh, just bypass this block
          // mhh, mh, nhh, nh, nghh, ngh
          if (
            this.soundsFollowing[0] &&
            this.soundsFollowing[0].name === TonalSoundTags.initial &&
            s.lastSecondLetter.literal === this.soundsFollowing[0].toString()
          ) {
            // unchange to -tt or -t
            s.popLetter(); // pop the neutral
            s.popLetter(); // pop the nasal
            const clone: TonalSyllable = Object.create(s);
            // if (ntrl === TonalLetterTags.hh) {
            if (fnl === TonalLetterTags.w) {
              clone.pushLetter(lowerLettersTonal.get(TonalLetterTags.tt));
            } else {
              clone.pushLetter(lowerLettersTonal.get(TonalLetterTags.t));
            }
            return [clone];
          } else if (this.soundsFollowing[0]) {
            // there has to be a following syllable for this syllable to change form
            // unchange to -pp or -p
            s.popLetter(); // pop the neutral
            s.popLetter(); // pop the nasal
            const clone: TonalSyllable = Object.create(s);
            // if (ntrl === TonalLetterTags.hh) {
            if (fnl === TonalLetterTags.w) {
              clone.pushLetter(lowerLettersTonal.get(TonalLetterTags.pp));
            } else {
              clone.pushLetter(lowerLettersTonal.get(TonalLetterTags.p));
            }
            return [clone];
          }
        }
        return [s];
      }
    }
    return [];
  }
}

/** Returns the uncombining forms of the syllable preceding ay */
export class UncombiningPrecedingAyex extends TonalCombiningMetaplasm {
  private undoChangedFinal(syllable: TonalSyllable, sounds: Array<Sound>) {
    const keysFinalsPrecedingAy = Array.from(voicedVoicelessFinals.keys());
    if (keysFinalsPrecedingAy.includes(sounds[sounds.length - 2].toString())) {
      if (
        voicedVoicelessFinals.has(
          syllable.lastLetter.literal + sounds[sounds.length - 1].toString()
        )
      ) {
        const fnl = voicedVoicelessFinals.get(
          syllable.lastLetter.literal + sounds[sounds.length - 1].toString()
        );
        if (fnl)
          syllable.replaceLetter(
            syllable.letters.length - 1,
            lowerLettersTonal.get(fnl)
          );
      }
    }
  }

  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
    if (allomorph) {
      if (allomorph.tonal.toString() === TonalLetterTags.f) {
        if (allomorph instanceof FreeAllomorph) {
          const ret = [];
          const rls = uncombiningRulesAy.get(allomorph.toString());
          const tnls = !rls ? [] : rls;
          for (let i in tnls) {
            let s: TonalSyllable = new TonalSyllable(
              sounds.map(it => new AlphabeticLetter(it.characters))
            );
            // 1 to 2. 1 to 3
            // replace f with y or w
            s.popLetter();
            s.pushLetter(new AlphabeticLetter(tnls[i].characters));
            ret.push(s);
          }
          return ret;
        } else if (allomorph instanceof CheckedAllomorph) {
          const s: TonalSyllable = new TonalSyllable(
            sounds.map(it => new AlphabeticLetter(it.characters))
          );
          // pop f
          s.popLetter();
          this.undoChangedFinal(s, sounds);
          return [s];
        }
      } else if (allomorph.tonal.toString() === TonalLetterTags.x) {
        // 5 to 1. 5 to 7. 5 to 5.
        if (allomorph instanceof FreeAllomorph) {
          const ret = [];
          const rls = uncombiningRulesAy.get(allomorph.toString());
          const tnls = !rls ? [] : rls;
          for (let i in tnls) {
            let s: TonalSyllable = new TonalSyllable(
              sounds.map(it => new AlphabeticLetter(it.characters))
            );
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
          const s: TonalSyllable = new TonalSyllable(
            sounds.map(it => new AlphabeticLetter(it.characters))
          );
          // pop x
          s.popLetter();
          this.undoChangedFinal(s, sounds);
          return [s];
        }
      } else if (allomorph.tonal.toString() === TonalLetterTags.y) {
        return [];
      }
    }
    return [];
  }
}

/** Returns the last syllable of a double or triple construction as an uncombining form. */
export class TonalReduplication extends TonalCombiningMetaplasm {
  constructor(private soundsLastSyllable: Sound[]) {
    super();
  }
  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
    if (allomorph) {
      // skip the last syllable. it is the base form of the preceding 2 syllables.
      if (
        this.soundsLastSyllable[
          this.soundsLastSyllable.length - 1
        ].toString() === sounds[sounds.length - 1].toString()
      )
        return [];
      const s: TonalSyllable = new TonalSyllable(
        this.soundsLastSyllable.map(it => new AlphabeticLetter(it.characters))
      );
      return [s];
    }
    return [];
  }
}

/** Lemmatizes a word and returns its base forms. */
export class TonalLemmatization extends TonalLemmatizationMetaplasm {
  apply(
    morphemes: Array<TonalUncombiningMorpheme>,
    inflectionalEnding: InflectionalEnding
  ): TonalWord[] {
    return this.populateLemmata(morphemes, inflectionalEnding);
  }

  private getLemmas(
    morphemes: Array<TonalUncombiningMorpheme>,
    inflectionalEnding: InflectionalEnding
  ): Array<TonalWord> {
    if (inflectionalEnding) {
      if (inflectionalEnding instanceof FreeInflectionalEnding) {
        const ret = [];
        const arr = morphemes[morphemes.length - 1].getForms();

        for (const key in arr) {
          const wrd = new TonalWord(morphemes.map(it => it.syllable));
          wrd.popSyllable();
          wrd.pushSyllable(arr[key]);
          ret.push(wrd);
        }
        return ret;
      } else if (inflectionalEnding instanceof CheckedInflectionalEnding) {
        if (morphemes[morphemes.length - 1].getForms().length == 0) return [];
        const wrd = new TonalWord(morphemes.map(it => it.syllable));
        wrd.popSyllable();
        wrd.pushSyllable(morphemes[morphemes.length - 1].getForms()[0]);
        return [wrd];
      }
    }

    return [];
  }

  private populateLemmata(
    morphemes: Array<TonalUncombiningMorpheme>,
    inflectionalEnding: InflectionalEnding
  ) {
    let lemmata: Array<TonalWord> = new Array();

    // turn morphemes into lemmas
    let lms = this.getLemmas(morphemes, inflectionalEnding);
    if (lms.length > 0) {
      for (let key in lms) {
        lemmata.push(lms[key]);
      }
    }
    return lemmata;
  }
}
