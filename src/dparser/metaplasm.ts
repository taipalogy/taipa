import {
  FreeAllomorph,
  Allomorph,
  ZeroAllomorph,
  AllomorphY,
  CheckedAllomorph,
  TonalLetterTags,
  tonalPositionalSounds,
  TonalSoundTags,
  lowerLettersTonal,
  AllomorphH,
  NasalizationSound
} from '../tonal/version2';
import {
  eighthToFirst,
  combiningRules,
  finalOfPhrasalVerbParticle
} from '../tonal/collections';
import { TonalCombiningMetaplasm } from '../morpheme';
import { TonalSyllable } from '../tonal/morpheme';
import { AlphabeticLetter, Sound } from '../grapheme';
import {
  TonalInflectionMetaplasm,
  TonalAssimilationMetaplasm
} from '../tonal/metaplasm';
import { TonalWord } from '../tonal/lexeme';
import { TonalCombiningMorpheme, TonalSoundChangingMorpheme } from './morpheme';
import {
  TonalPhrasalAssimilationMetaplasm,
  TonalPhrasalInflectionMetaplasm
} from '../phraseme';
import { TonalAssimilationLexeme, TonalInflectionLexeme } from './lexeme';
import { TonalPhrase } from '../tonal/phraseme';

//------------------------------------------------------------------------------

export enum AssimiDirection {
  agressive = 0,
  regressive = 1
}

//------------------------------------------------------------------------------

export class TonalCombiningForms extends TonalCombiningMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
    if (allomorph) {
      let s: TonalSyllable = new TonalSyllable(
        sounds.map(x => new AlphabeticLetter(x.characters))
      );
      if (allomorph instanceof FreeAllomorph) {
        if (allomorph instanceof ZeroAllomorph) {
          const tos = combiningRules.get(TonalLetterTags.zero);
          if (tos) {
            s.pushLetter(
              new AlphabeticLetter(lowerLettersTonal.get(tos[0]).characters)
            );
          }
          return [s];
        } else if (allomorph instanceof AllomorphY) {
          s.popLetter();
          return [s];
        } else {
          s.popLetter();
          const tos = combiningRules.get(allomorph.tonal.toString());
          const rets = [];
          if (tos) {
            for (let k = 0; k < tos.length; k++) {
              s.pushLetter(
                new AlphabeticLetter(lowerLettersTonal.get(tos[k]).characters)
              );
              rets.push(new TonalSyllable(s.letters));
              s.popLetter();
            }
          }
          return rets;
        }
      } else if (allomorph instanceof CheckedAllomorph) {
        // nothing to pop here
        if (allomorph.tonal.toString().length > 0) return [];
        const tos = combiningRules.get(allomorph.final.toString());
        const rets = [];
        if (tos) {
          for (let k = 0; k < tos.length; k++) {
            s.pushLetter(
              new AlphabeticLetter(lowerLettersTonal.get(tos[k]).characters)
            );
            rets.push(new TonalSyllable(s.letters));
            s.popLetter();
          }
        }
        return rets;
      }
    }
    return [];
  }
}

//------------------------------------------------------------------------------

export class ThirdCombiningForm extends TonalCombiningMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
    if (allomorph) {
      let s: TonalSyllable = new TonalSyllable(
        sounds.map(x => new AlphabeticLetter(x.characters))
      );
      const ps = tonalPositionalSounds.get(TonalLetterTags.w);
      let snd = new Sound();

      if (allomorph instanceof FreeAllomorph) {
        if (ps) snd = ps(TonalSoundTags.freeTonal);
        if (allomorph instanceof ZeroAllomorph) {
          s.pushLetter(new AlphabeticLetter(snd.characters));
        } else {
          s.popLetter();
          s.pushLetter(new AlphabeticLetter(snd.characters));
        }
      } else if (allomorph instanceof CheckedAllomorph) {
        if (ps) snd = ps(TonalSoundTags.checkedTonal);
        if (allomorph.tonal.toString()) {
          s.popLetter();
          s.pushLetter(new AlphabeticLetter(snd.characters));
        } else {
          s.pushLetter(new AlphabeticLetter(snd.characters));
        }
      }
      return [s];
    }
    return [];
  }
}

//------------------------------------------------------------------------------

export class FourthToFirstCombining extends TonalCombiningMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
    if (allomorph && allomorph instanceof AllomorphH) {
      let s: TonalSyllable = new TonalSyllable(
        sounds.map(x => new AlphabeticLetter(x.characters))
      );
      s.pushLetter(
        new AlphabeticLetter(
          lowerLettersTonal.get(TonalLetterTags.f).characters
        )
      );
      return [s];
    }
    return [];
  }
}

//------------------------------------------------------------------------------

export class EighthToFirstCombining extends TonalCombiningMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
    if (allomorph && allomorph instanceof CheckedAllomorph) {
      let s: TonalSyllable = new TonalSyllable(
        sounds.map(x => new AlphabeticLetter(x.characters))
      );
      const tnl = eighthToFirst.get(allomorph.toString());
      if (tnl) {
        s.popLetter();
        s.pushLetter(
          new AlphabeticLetter(lowerLettersTonal.get(tnl).characters)
        );
        s.pushLetter(
          new AlphabeticLetter(
            lowerLettersTonal.get(TonalLetterTags.f).characters
          )
        );
      }
      return [s];
    }
    return [];
  }
}

//------------------------------------------------------------------------------

export class EighthToSecondCombining extends TonalCombiningMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
    if (allomorph && allomorph instanceof CheckedAllomorph) {
      let s: TonalSyllable = new TonalSyllable(
        sounds.map(x => new AlphabeticLetter(x.characters))
      );

      s.popLetter();
      s.pushLetter(
        new AlphabeticLetter(
          lowerLettersTonal.get(TonalLetterTags.h).characters
        )
      );
      s.pushLetter(
        new AlphabeticLetter(
          lowerLettersTonal.get(TonalLetterTags.y).characters
        )
      );
      return [s];
    }
    return [];
  }
}

//------------------------------------------------------------------------------

export class EncliticECombining extends TonalCombiningMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
    // 1->7, 7->7, 3->3
    if (allomorph) {
      let s: TonalSyllable = new TonalSyllable(
        sounds.map(x => new AlphabeticLetter(x.characters))
      );
      if (allomorph instanceof FreeAllomorph) {
        if (allomorph instanceof ZeroAllomorph) {
          const tos = combiningRules.get(TonalLetterTags.zero);
          if (tos) {
            // it should loop only once
            s.pushLetter(
              new AlphabeticLetter(lowerLettersTonal.get(tos[0]).characters)
            );
          }
          return [s];
        }
      }
    }
    return [];
  }
}

//------------------------------------------------------------------------------

export class PhrasalVerbParticleCombining extends TonalCombiningMetaplasm {
  constructor(private tone: TonalLetterTags) {
    super();
  }

  private toThird(syllable: TonalSyllable, final: string) {
    let s: TonalSyllable = new TonalSyllable(syllable.letters);
    s.popLetter();
    const fnl = finalOfPhrasalVerbParticle.get(final);
    if (fnl) {
      // h -> hh, p -> pp
      s.pushLetter(lowerLettersTonal.get(fnl));
      s.pushLetter(lowerLettersTonal.get(TonalLetterTags.w));
    }
    return s;
  }

  private toFirst(syllable: TonalSyllable) {
    let s: TonalSyllable = new TonalSyllable(syllable.letters);
    s.pushLetter(lowerLettersTonal.get(TonalLetterTags.f));
    return s;
  }

  private toSeventh(syllable: TonalSyllable) {
    let s: TonalSyllable = new TonalSyllable(syllable.letters);
    s.popLetter();
    s.pushLetter(lowerLettersTonal.get(TonalLetterTags.z));
    return s;
  }

  apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
    if (allomorph) {
      let s: TonalSyllable = new TonalSyllable(
        sounds.map(x => new AlphabeticLetter(x.characters))
      );
      if (allomorph instanceof CheckedAllomorph) {
        const ret: TonalSyllable[] = [];
        let syl: TonalSyllable = new TonalSyllable([]);
        if (this.tone === TonalLetterTags.f) {
          syl = this.toFirst(s);
        } else if (this.tone === TonalLetterTags.w) {
          syl = this.toThird(s, sounds[sounds.length - 1].toString());
        } else if (this.tone === TonalLetterTags.z) {
          syl = this.toSeventh(s);
        }
        ret.push(syl);

        // free form of the syllable could be handle outside of this routine by popping f/w and h/hh
        return ret;
      }
    }
    return [];
  }
}

//------------------------------------------------------------------------------

export class ConjunctiveLeCombining extends TonalCombiningMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
    if (allomorph) {
      let s: TonalSyllable = new TonalSyllable(
        sounds.map(x => new AlphabeticLetter(x.characters))
      );
      if (allomorph instanceof FreeAllomorph) {
        if (
          allomorph.tonal.toString() === TonalLetterTags.z ||
          allomorph.tonal.toString() === TonalLetterTags.w
        ) {
          s.popLetter();
          return [s];
        }
      }
    }
    return [];
  }
}

//------------------------------------------------------------------------------

export class PossesiveExCombining extends TonalCombiningMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
    if (allomorph) {
      let s: TonalSyllable = new TonalSyllable(
        sounds.map(x => new AlphabeticLetter(x.characters))
      );
      s.popLetter();
      s.pushLetter(
        new AlphabeticLetter(
          lowerLettersTonal.get(TonalLetterTags.w).characters
        )
      );
      return [s];
    }
    return [];
  }
}

//------------------------------------------------------------------------------

export class FirstSeventhCombining extends TonalCombiningMetaplasm {
  constructor(private tone: TonalLetterTags) {
    super();
  }

  apply(sounds: Array<Sound>, allomorph: Allomorph): Array<TonalSyllable> {
    // from -h to 1 or 7
    if (allomorph) {
      let s: TonalSyllable = new TonalSyllable(
        sounds.map(x => new AlphabeticLetter(x.characters))
      );
      if (s.lastLetter.literal === TonalLetterTags.h) {
        s.popLetter();
      }
      if (this.tone === TonalLetterTags.z) {
        s.pushLetter(
          new AlphabeticLetter(
            lowerLettersTonal.get(TonalLetterTags.z).characters
          )
        );
      } else if (
        this.tone === TonalLetterTags.zero &&
        sounds[sounds.length - 1].toString() === TonalLetterTags.t
      ) {
        s.pushLetter(
          new AlphabeticLetter(
            lowerLettersTonal.get(TonalLetterTags.f).characters
          )
        );
      }
      return [s];
    }
    return [];
  }
}

//------------------------------------------------------------------------------

export class TonalDesinenceInflection extends TonalInflectionMetaplasm {
  apply(ms: Array<TonalCombiningMorpheme>): TonalWord[] {
    if (ms.length > 0 && ms[ms.length - 1]) {
      const last = ms[ms.length - 1];
      const syls = last.getForms();
      let rets = [];
      if (syls) {
        for (let i in syls) {
          let wd = new TonalWord(
            ms.map(x => new TonalSyllable(x.syllable.letters))
          );
          wd.popSyllable();
          wd.pushSyllable(syls[i]);
          rets.push(wd);
        }
      }
      return rets;
    }
    return [];
  }
}

//------------------------------------------------------------------------------

export class TransfixInflection extends TonalInflectionMetaplasm {
  apply(ms: Array<TonalCombiningMorpheme>): TonalWord[] {
    const rets = [];
    if (ms.length > 0) {
      const tw = new TonalWord(
        ms.map(x => new TonalSyllable(x.syllable.letters))
      );

      for (let i = 0; i < ms.length; i++) {
        const form = ms[i].getForms()[0];
        if (form) tw.replaceSyllable(i, form);
      }
      rets.push(tw);
    }

    return rets;
  }
}

//------------------------------------------------------------------------------

export class RegressiveInternal extends TonalAssimilationMetaplasm {
  apply(ms: Array<TonalSoundChangingMorpheme>): TonalWord[] {
    let tw = new TonalWord(ms.map(x => new TonalSyllable(x.syllable.letters)));

    if (ms.length > 1) {
      for (let i = 1; i < ms.length; i++) {
        if (
          ms[i].sounds[0].name === TonalSoundTags.initial &&
          (ms[i - 1].syllable.lastSecondLetter.literal === TonalLetterTags.t ||
            ms[i - 1].syllable.lastSecondLetter.literal === TonalLetterTags.tt)
        ) {
          tw.replaceSyllable(
            i - 1,
            ms[i - 1].changeSoundWith(
              ms[i].sounds[0],
              AssimiDirection.regressive
            )[0]
          );
        } else {
          const syls = ms[i - 1].changeSoundWith(
            ms[i].sounds[0],
            AssimiDirection.regressive
          );
          if (syls.length) tw.replaceSyllable(i - 1, syls[0]);
        }
      }
    }

    return [tw];
  }
}

//------------------------------------------------------------------------------

export class AgressiveInternal extends TonalAssimilationMetaplasm {
  apply(ms: Array<TonalSoundChangingMorpheme>): TonalWord[] {
    if (ms.length > 1 && ms[ms.length - 2]) {
      const snds = ms[ms.length - 2].sounds;
      let wrd = new TonalWord(
        ms.map(x => new TonalSyllable(x.syllable.letters))
      );

      if (
        snds.filter(x => x.name === TonalSoundTags.nasalization).length == 1
      ) {
        // nasalization of vowels
        wrd.replaceSyllable(
          wrd.syllables.length - 1,
          ms[ms.length - 1].changeSoundWith(
            new NasalizationSound().sounds[0],
            AssimiDirection.agressive
          )[0]
        );
        return [wrd];
      }

      // duplifix. pass the preceding initial to get forms
      wrd.replaceSyllable(
        wrd.syllables.length - 1,
        ms[ms.length - 1].changeSoundWith(snds[0], AssimiDirection.agressive)[0]
      );
      return [wrd];
    }
    return [];
  }
}

//------------------------------------------------------------------------------

export class Epenthesis extends TonalAssimilationMetaplasm {
  // adding of nasal consonants. insertion
  apply(ms: Array<TonalSoundChangingMorpheme>): TonalWord[] {
    if (ms.length > 1 && ms[ms.length - 2]) {
      const snds = ms[ms.length - 2].sounds;
      let wrd = new TonalWord(
        ms.map(x => new TonalSyllable(x.syllable.letters))
      );
      if (
        snds[snds.length - 2].name == TonalSoundTags.nasalFinal &&
        ms[ms.length - 1].syllable.letters[0].literal === TonalLetterTags.a
      ) {
        // m, n, ng followed by -ay. pass the preceding nasal to get forms
        wrd.replaceSyllable(
          wrd.syllables.length - 1,
          ms[ms.length - 1].changeSoundWith(
            snds[snds.length - 2],
            AssimiDirection.agressive
          )[0]
        );
        return [wrd];
      }
    }
    return [];
  }
}

//------------------------------------------------------------------------------

export class ConjugateToProceeding extends TonalPhrasalInflectionMetaplasm {
  apply(verb: TonalInflectionLexeme, particle: TonalInflectionLexeme) {
    if (verb.word.literal === '' || particle.word.literal === '') return [];
    if (particle.getForms().length > 0) {
      const forms = particle.getForms();
      const ret: TonalPhrase[] = [];
      forms.map(it => ret.push(new TonalPhrase([verb.getForms()[0], it])));
      return ret;
    } else if (verb.getForms().length > 0) {
      // equivalent to compound in terms of phrasal verb
      return [new TonalPhrase([verb.getForms()[0], particle.word])];
    } else {
      return [new TonalPhrase([])];
    }
  }
}

//------------------------------------------------------------------------------

export class ConjugateVppToProceeding extends TonalPhrasalInflectionMetaplasm {
  applyVpp(
    verb: TonalInflectionLexeme,
    particle: TonalInflectionLexeme,
    particleTwo: TonalInflectionLexeme
  ) {
    if (
      verb.word.literal === '' ||
      particle.word.literal === '' ||
      particleTwo.word.literal === ''
    )
      return [];

    if (particle.getForms().length > 0 || particleTwo.getForms().length > 0) {
      return [
        new TonalPhrase([
          verb.getForms()[0],
          particle.getForms()[0],
          particleTwo.getForms()[0]
        ])
      ];
    }
    return [new TonalPhrase([])];
  }
}

export class ConjugateVppToTransitive extends TonalPhrasalInflectionMetaplasm {
  applyVpp(
    verb: TonalInflectionLexeme,
    particle: TonalInflectionLexeme,
    particleTwo: TonalInflectionLexeme
  ) {
    if (
      verb.word.literal === '' ||
      particle.word.literal === '' ||
      particleTwo.word.literal === ''
    )
      return [];

    if (verb.getForms().length > 0) {
      return [
        new TonalPhrase([verb.getForms()[0], particle.word, particleTwo.word])
      ];
    }
    return [new TonalPhrase([])];
  }
}

//------------------------------------------------------------------------------

export class ConjugateToParticiple extends TonalPhrasalInflectionMetaplasm {
  apply(verb: TonalInflectionLexeme, particle: TonalInflectionLexeme) {
    if (verb.word.literal === '' || particle.word.literal === '') return [];
    if (particle.getForms().length > 0) {
      const forms = particle.getForms();
      const ret: TonalPhrase[] = [];
      if (verb.getForms().length > 0) {
        forms.map(it => ret.push(new TonalPhrase([verb.getForms()[0], it])));
      } else {
        forms.map(it => ret.push(new TonalPhrase([verb.word, it])));
      }
      return ret;
    }
    return [new TonalPhrase([])];
  }
}

export class ConjugateVppToParticiple extends TonalPhrasalInflectionMetaplasm {
  applyVpp(
    verb: TonalInflectionLexeme,
    particle: TonalInflectionLexeme,
    particleTwo: TonalInflectionLexeme
  ) {
    if (
      verb.word.literal === '' ||
      particle.word.literal === '' ||
      particleTwo.word.literal === ''
    )
      return [];
    if (particle.getForms().length > 0 && particleTwo.getForms().length > 0) {
      const ret: TonalPhrase[] = [];
      if (verb.getForms().length > 0) {
        ret.push(
          new TonalPhrase([
            verb.getForms()[0],
            particle.getForms()[0],
            particleTwo.getForms()[0]
          ])
        );
      }
      return ret;
    }
    return [new TonalPhrase([])];
  }
}

//------------------------------------------------------------------------------

export class Adnominal extends TonalPhrasalInflectionMetaplasm {
  apply(
    lexemeNoun: TonalInflectionLexeme,
    lexemeParticle: TonalInflectionLexeme
  ) {
    if (lexemeNoun.word.literal === '' || lexemeParticle.word.literal === '')
      return [];
    if (lexemeParticle.getForms().length > 0) {
      return [new TonalPhrase([lexemeNoun.word, lexemeParticle.getForms()[0]])];
    } else {
      return [new TonalPhrase([])];
    }
  }
}

//------------------------------------------------------------------------------

export class Conjunctive extends TonalPhrasalInflectionMetaplasm {
  apply(lexemeVerb: TonalInflectionLexeme, lexemeLe: TonalInflectionLexeme) {
    if (lexemeVerb.word.literal === '' || lexemeLe.word.literal === '')
      return [];
    if (lexemeLe.getForms().length > 0) {
      return [
        new TonalPhrase([lexemeVerb.getForms()[0], lexemeLe.getForms()[0]])
      ];
    } else if (lexemeVerb.getForms().length > 0) {
      return [new TonalPhrase([lexemeVerb.getForms()[0], lexemeLe.word])];
    } else {
      return [new TonalPhrase([])];
    }
  }
}

//------------------------------------------------------------------------------

export class AgressiveExternal extends TonalPhrasalAssimilationMetaplasm {
  apply(
    lexemePreceding: TonalAssimilationLexeme,
    lexemeFollowing: TonalAssimilationLexeme
  ) {
    const wrds = lexemeFollowing.assimilateWith(
      lexemePreceding,
      AssimiDirection.agressive
    );
    if (wrds.length > 0)
      return [new TonalPhrase([lexemePreceding.word].concat(wrds))];
    return [];
  }
}

//------------------------------------------------------------------------------

export class RegressiveExternal extends TonalPhrasalAssimilationMetaplasm {
  apply(
    lexemePreceding: TonalAssimilationLexeme,
    lexemeFollowing: TonalAssimilationLexeme
  ) {
    const wrds = lexemePreceding.assimilateWith(
      lexemeFollowing,
      AssimiDirection.regressive
    );
    if (wrds.length > 0)
      return [new TonalPhrase([lexemePreceding.word].concat(wrds))];
    return [];
  }
}
