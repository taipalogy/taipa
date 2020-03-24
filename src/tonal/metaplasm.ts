import { Metaplasm } from '../metaplasm';
import { Morpheme, TonalCombiningMetaplasm } from '../morpheme';
import {
  TonalWord,
  InflectionalEnding,
  FreeInflectionalEnding,
  CheckedInflectionalEnding
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
  FreeTonalX
} from './version2';
import { Sound, AlphabeticLetter } from '../grapheme';

//------------------------------------------------------------------------------

export class TonalInflectionMetaplasm extends Metaplasm {
  apply(morphemes: Array<Morpheme>): TonalWord[] {
    return [];
  }
}

export class TonalZeroInflection extends TonalInflectionMetaplasm {}

export class TonalAssimilationMetaplasm extends Metaplasm {
  apply(morphemes: Array<Morpheme>): TonalWord[] {
    return [];
  }
}

export class TonalZeroAssimilation extends TonalInflectionMetaplasm {}

export class TonalLemmatizationMetaplasm extends Metaplasm {
  apply(morphemes: Array<Morpheme>, inflectionalEnding: InflectionalEnding) {}
}

//------------------------------------------------------------------------------

export class TonalUncombiningForms extends TonalCombiningMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
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
          sounds.map(x => new AlphabeticLetter(x.characters))
        );
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
      if (
        this.sounds[this.sounds.length - 1].toString() ===
        sounds[sounds.length - 1].toString()
      )
        return [];
      const s: TonalSyllable = new TonalSyllable(
        this.sounds.map(it => new AlphabeticLetter(it.characters))
      );
      return [s];
    }
    return [];
  }
}

//------------------------------------------------------------------------------

export class TonalLemmatization extends TonalLemmatizationMetaplasm {
  apply(
    morphemes: Array<TonalUncombiningMorpheme>,
    inflectionalEnding: InflectionalEnding
  ) {
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

        for (let key in arr) {
          const wrd = new TonalWord(morphemes.map(x => x.syllable));
          wrd.popSyllable();
          wrd.pushSyllable(arr[key]);
          ret.push(wrd);
        }
        return ret;
      } else if (inflectionalEnding instanceof CheckedInflectionalEnding) {
        if (morphemes[morphemes.length - 1].getForms().length == 0) return [];
        const wrd = new TonalWord(morphemes.map(x => x.syllable));
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
