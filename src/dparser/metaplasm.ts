import {
  FreeAllomorph,
  Allomorph,
  ZeroAllomorph,
  AllomorphY,
  CheckedAllomorph,
  TonalLetterTags,
  TonalSoundTags,
  lowerLettersTonal,
  AllomorphH,
  nasalizationSounds,
} from '../tonal/version2';
import {
  eighthToFirst,
  combiningRules,
  finalOfPhrasalVerbParticle,
  nasalInitials,
  initialsBghjl,
  voicedVoicelessFinals,
} from '../tonal/collections';
import {
  TonalCombiningMetaplasm,
  TonalInflectionMetaplasm,
  TonalAssimilationMetaplasm,
  TonalInfectionMetaplasm,
  TonalUnassimilationMetaplasm,
  TonalUninsertionMetaplasm,
  TonalInsertionMetaplasm,
  TonalMutationMetaplasm,
  TonalPhrasalInsertionMetaplasm,
  TonalPhrasalUninsertionMetaplasm,
  TonalPhrasalUnassimilationMetaplasm,
  TonalUnmutationMetaplasm,
  TonalUninfectionMetaplasm,
  TonalPhrasalUninfectionMetaplasm,
  TonalPhrasalInfectionMetaplasm,
} from '../metaplasm';
import { TonalSyllable } from '../tonal/morpheme';
import { AlphabeticLetter, Sound } from '../unit';
import { TonalWord } from '../tonal/lexeme';
import {
  TonalCombiningMorpheme,
  TonalSoundChangingMorpheme,
  TonalSoundUnchangingMorpheme,
} from './morpheme';
import {
  TonalPhrasalAssimilationMetaplasm,
  TonalPhrasalInflectionMetaplasm,
} from '../metaplasm';
import {
  TonalAssimilationLexeme,
  TonalInflectionLexeme,
  TonalInsertionLexeme,
  TonalUninsertionLexeme,
  TonalUnassimilationLexeme,
  TonalUninfectionLexeme,
  TonalInfectionLexeme,
} from './lexeme';
import { TonalPhrase } from '../tonal/phraseme';

/** Returns the combining forms of a syllable. */
export class TonalCombiningForms extends TonalCombiningMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
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

/** Changes to 3rd tone. */
export class ThirdCombiningForm extends TonalCombiningMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
    if (allomorph) {
      const s: TonalSyllable = new TonalSyllable(
        sounds.map(x => new AlphabeticLetter(x.characters))
      );

      if (allomorph instanceof FreeAllomorph) {
        if (allomorph instanceof ZeroAllomorph) {
          s.pushLetter(lowerLettersTonal.get(TonalLetterTags.w));
        } else {
          s.popLetter();
          s.pushLetter(lowerLettersTonal.get(TonalLetterTags.w));
        }
      } else if (allomorph instanceof CheckedAllomorph) {
        if (allomorph.tonal.toString()) {
          s.popLetter();
          s.pushLetter(lowerLettersTonal.get(TonalLetterTags.w));
        } else {
          s.pushLetter(lowerLettersTonal.get(TonalLetterTags.w));
        }
      }
      return [s];
    }
    return [];
  }
}

/** Changes 4th tone to 1st tone. */
export class FourthToFirstCombining extends TonalCombiningMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
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

/** Changes 8th tone to 1st tone. */
export class EighthToFirstCombining extends TonalCombiningMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
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

/** Changes 8th tone to 2nd tone. */
export class EighthToSecondCombining extends TonalCombiningMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
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

/** Returns the combining form of enclitic e. */
export class AdnominalECombining extends TonalCombiningMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
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

/** Returns the combining form of a phrasal verb particle. */
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

  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
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

        // TODO: free form of the syllable could be handle outside of this routine by popping f/w and h/hh
        return ret;
      }
    }
    return [];
  }
}

/** Returns the combining form of enclitic le. */
export class ConjunctiveLeCombining extends TonalCombiningMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
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

/** Returns the combining form of possesive case marker ex. */
export class PossesiveExCombining extends TonalCombiningMetaplasm {
  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
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

/** Changes 4th tone to either 1st or 7th tone. */
export class FirstSeventhCombining extends TonalCombiningMetaplasm {
  constructor(private tone: TonalLetterTags) {
    super();
  }

  apply(sounds: Array<Sound>, allomorph: Allomorph): TonalSyllable[] {
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

/** Inflects an inflectional suffix. */
export class TonalDesinenceInflection extends TonalInflectionMetaplasm {
  apply(morphemes: Array<TonalCombiningMorpheme>): TonalWord[] {
    if (morphemes.length > 0 && morphemes[morphemes.length - 1]) {
      const last = morphemes[morphemes.length - 1];
      const syls = last.getForms();
      let rets = [];
      if (syls) {
        for (let i in syls) {
          let wd = new TonalWord(
            morphemes.map(x => new TonalSyllable(x.syllable.letters))
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

/** Inflects a transfix. */
export class TransfixInflection extends TonalInflectionMetaplasm {
  apply(morphemes: Array<TonalCombiningMorpheme>): TonalWord[] {
    const rets = [];
    if (morphemes.length > 0) {
      const tw = new TonalWord(
        morphemes.map(x => new TonalSyllable(x.syllable.letters))
      );

      for (let i = 0; i < morphemes.length; i++) {
        const form = morphemes[i].getForms()[0];
        if (form) tw.replaceSyllable(i, form);
      }
      rets.push(tw);
    }

    return rets;
  }
}

/** Regressive assimilation inside a word. */
export class RegressiveInternal extends TonalAssimilationMetaplasm {
  apply(morphemes: Array<TonalSoundChangingMorpheme>): TonalWord[] {
    let wrd = new TonalWord(
      morphemes.map(it => new TonalSyllable(it.syllable.letters))
    );

    if (morphemes.length > 1) {
      for (let i = 1; i < morphemes.length; i++) {
        if (
          morphemes[i].sounds[0].name === TonalSoundTags.initial &&
          (morphemes[i - 1].syllable.lastSecondLetter.literal ===
            TonalLetterTags.t ||
            morphemes[i - 1].syllable.lastSecondLetter.literal ===
              TonalLetterTags.tt)
        ) {
          const syls = morphemes[i - 1].changeFinalPtkppttkk(
            morphemes[i].sounds[0]
          );
          if (syls && syls.length > 0) {
            wrd.replaceSyllable(i - 1, syls[0]);
          }
        } else if (
          morphemes[i].sounds[0].toString() === TonalLetterTags.b &&
          morphemes[i - 1].syllable.lastSecondLetter.literal ===
            TonalLetterTags.n
        ) {
          const syls = morphemes[i - 1].changeFinalN(morphemes[i].sounds[0]);
          if (syls && syls.length > 0) {
            wrd.replaceSyllable(i - 1, syls[0]);
          }
        } else {
          const syls = morphemes[i - 1].changeFinalPtkppttkk(
            morphemes[i].sounds[0]
          );
          if (syls && syls.length > 0) wrd.replaceSyllable(i - 1, syls[0]);
        }
      }
    }

    return [wrd];
  }
}

/** Inserts an initial m, n, or ng to syllable ay. */
export class Epenthesis extends TonalInsertionMetaplasm {
  // adding of nasal consonants. insertion
  apply(morphemes: Array<TonalSoundChangingMorpheme>): TonalWord[] {
    if (morphemes.length > 1 && morphemes[morphemes.length - 2]) {
      const snds = morphemes[morphemes.length - 2].sounds;
      const wrd = new TonalWord(
        morphemes.map(x => new TonalSyllable(x.syllable.letters))
      );
      if (
        snds[snds.length - 2].name == TonalSoundTags.nasalFinal &&
        morphemes[morphemes.length - 1].syllable.letters[0].literal ===
          TonalLetterTags.a
      ) {
        // m, n, ng followed by -ay. pass the preceding nasal to get forms
        wrd.popSyllable();
        wrd.pushSyllable(
          morphemes[morphemes.length - 1].insertNasal(snds[snds.length - 2])[0]
        );
        return [wrd];
      }
      // TODO: insert to syllable e
    }
    return [];
  }
}

/** Uninsert an initial m, n, or ng from syllable ~ay */
export class Uninsertion extends TonalUninsertionMetaplasm {
  // removal of nasal consonants
  apply(morphemes: Array<TonalSoundUnchangingMorpheme>): TonalWord[] {
    if (morphemes.length > 1 && morphemes[morphemes.length - 2]) {
      const snds = morphemes[morphemes.length - 2].sounds;
      const wrd = new TonalWord(
        morphemes.map(it => new TonalSyllable(it.syllable.letters))
      );
      if (
        snds[snds.length - 2].name == TonalSoundTags.nasalFinal &&
        nasalInitials.includes(
          morphemes[morphemes.length - 1].syllable.letters[0].literal
        ) &&
        morphemes[morphemes.length - 1].syllable.letters[1].literal ===
          TonalLetterTags.a
      ) {
        wrd.popSyllable();
        wrd.pushSyllable(morphemes[morphemes.length - 1].uninsertNasal()[0]);
        return [wrd];
      }
    }
    return [];
  }
}

/** Reverse regressive assimilation inside a word. */
export class ReverseRegressiveInternal extends TonalUnassimilationMetaplasm {
  apply(morphemes: Array<TonalSoundUnchangingMorpheme>): TonalWord[] {
    let wrd = new TonalWord(
      morphemes.map(it => new TonalSyllable(it.syllable.letters))
    );

    if (morphemes.length > 1) {
      for (let i = 1; i < morphemes.length; i++) {
        // combine b, g, h, j, l with m, n, ng
        const initialsBghjlmnng = initialsBghjl.concat(nasalInitials);
        const finalsBglbbggll = Array.from(voicedVoicelessFinals.keys());
        if (
          morphemes[i].sounds[0].name === TonalSoundTags.initial &&
          finalsBglbbggll.includes(
            morphemes[i - 1].syllable.lastSecondLetter.literal
          ) &&
          initialsBghjlmnng.includes(morphemes[i].sounds[0].toString())
        ) {
          const syls = morphemes[i - 1].toVoicelessFinal();
          wrd.replaceSyllable(i - 1, syls[0]);
        }
      }
    }
    return [wrd];
  }
}

export class Infection extends TonalInfectionMetaplasm {
  apply(morphemes: Array<TonalSoundChangingMorpheme>): TonalWord[] {
    if (morphemes.length > 1 && morphemes[morphemes.length - 2]) {
      const snds = morphemes[morphemes.length - 2].sounds;
      const wrd = new TonalWord(
        morphemes.map(it => new TonalSyllable(it.syllable.letters))
      );

      if (
        snds.filter(it => it.name === TonalSoundTags.nasalization).length == 1
      ) {
        // nasalization of vowels
        wrd.replaceSyllable(
          wrd.syllables.length - 1,
          morphemes[morphemes.length - 1].infect()[0]
        );
        return [wrd];
      }
    }
    return [];
  }
}

export class Uninfection extends TonalUninfectionMetaplasm {
  apply(morphemes: Array<TonalSoundUnchangingMorpheme>): TonalWord[] {
    if (morphemes.length > 1 && morphemes[morphemes.length - 2]) {
      const snds = morphemes[morphemes.length - 2].sounds;
      const wrd = new TonalWord(
        morphemes.map(it => new TonalSyllable(it.syllable.letters))
      );

      if (
        snds.filter(it => it.name === TonalSoundTags.nasalization).length == 1
      ) {
        // nasalization of vowels
        wrd.replaceSyllable(
          wrd.syllables.length - 1,
          morphemes[morphemes.length - 1].uninfect()[0]
        );
        return [wrd];
      }
    }
    return [];
  }
}

export class ConsonantMutation extends TonalMutationMetaplasm {
  apply(morphemes: Array<TonalSoundChangingMorpheme>): TonalWord[] {
    if (morphemes.length > 1 && morphemes[morphemes.length - 2]) {
      const snds = morphemes[morphemes.length - 2].sounds;
      const wrd = new TonalWord(
        morphemes.map(it => new TonalSyllable(it.syllable.letters))
      );

      // duplifix. pass the preceding initial to get forms
      wrd.replaceSyllable(
        wrd.syllables.length - 1,
        morphemes[morphemes.length - 1].mutateConsonant(snds[0])[0]
      );
      return [wrd];
    }
    return [];
  }
}

export class ConsonantUnmutation extends TonalUnmutationMetaplasm {
  apply(morphemes: Array<TonalSoundUnchangingMorpheme>): TonalWord[] {
    if (morphemes.length > 1 && morphemes[morphemes.length - 2]) {
      const snds = morphemes[morphemes.length - 2].sounds;
      const wrd = new TonalWord(
        morphemes.map(it => new TonalSyllable(it.syllable.letters))
      );

      // duplifix. pass the preceding initial to get forms
      wrd.replaceSyllable(
        wrd.syllables.length - 1,
        morphemes[morphemes.length - 1].unmutateConsonant(snds[0])[0]
      );
      return [wrd];
    }
    return [];
  }
}

/** Returns the proceeding forms of a phrasal verb of length 2. */
export class ConjugateToProceeding extends TonalPhrasalInflectionMetaplasm {
  apply(
    verb: TonalInflectionLexeme,
    particle: TonalInflectionLexeme
  ): TonalPhrase[] {
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

/** Returns the proceeding forms of a phrasal verb of length 3. */
export class ConjugateVppToProceeding extends TonalPhrasalInflectionMetaplasm {
  applyVpp(
    verb: TonalInflectionLexeme,
    particle: TonalInflectionLexeme,
    particleTwo: TonalInflectionLexeme
  ): TonalPhrase[] {
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
          particleTwo.getForms()[0],
        ]),
      ];
    }
    return [new TonalPhrase([])];
  }
}

/** Returns the transitive forms of a phrasal verb of length 3. */
export class ConjugateVppToTransitive extends TonalPhrasalInflectionMetaplasm {
  applyVpp(
    verb: TonalInflectionLexeme,
    particle: TonalInflectionLexeme,
    particleTwo: TonalInflectionLexeme
  ): TonalPhrase[] {
    if (
      verb.word.literal === '' ||
      particle.word.literal === '' ||
      particleTwo.word.literal === ''
    )
      return [];

    if (verb.getForms().length > 0) {
      return [
        new TonalPhrase([verb.getForms()[0], particle.word, particleTwo.word]),
      ];
    }
    return [new TonalPhrase([])];
  }
}

/** Returns the participle forms of a phrasal verb of length 2. */
export class ConjugateToParticiple extends TonalPhrasalInflectionMetaplasm {
  apply(
    verb: TonalInflectionLexeme,
    particle: TonalInflectionLexeme
  ): TonalPhrase[] {
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

/** Returns the participle forms of a phrasal verb of length 3. */
export class ConjugateVppToParticiple extends TonalPhrasalInflectionMetaplasm {
  applyVpp(
    verb: TonalInflectionLexeme,
    particle: TonalInflectionLexeme,
    particleTwo: TonalInflectionLexeme
  ): TonalPhrase[] {
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
            particleTwo.getForms()[0],
          ])
        );
      }
      return ret;
    }
    return [new TonalPhrase([])];
  }
}

/** Returns the adnominal forms of a possesive or e-adjective. */
export class Adnominal extends TonalPhrasalInflectionMetaplasm {
  apply(
    noun: TonalInflectionLexeme,
    particle: TonalInflectionLexeme
  ): TonalPhrase[] {
    if (noun.word.literal === '' || particle.word.literal === '') return [];
    if (particle.getForms().length > 0) {
      return [new TonalPhrase([noun.word, particle.getForms()[0]])];
    } else {
      return [new TonalPhrase([])];
    }
  }
}

/** Returns the conjunctive form of le form. */
export class Conjunctive extends TonalPhrasalInflectionMetaplasm {
  apply(verb: TonalInflectionLexeme, le: TonalInflectionLexeme): TonalPhrase[] {
    if (verb.word.literal === '' || le.word.literal === '') return [];
    if (le.getForms().length > 0) {
      return [new TonalPhrase([verb.getForms()[0], le.getForms()[0]])];
    } else if (verb.getForms().length > 0) {
      return [new TonalPhrase([verb.getForms()[0], le.word])];
    } else {
      return [new TonalPhrase([])];
    }
  }
}

/** Assimilates regressively between 2 words. */
export class RegressiveExternal extends TonalPhrasalAssimilationMetaplasm {
  apply(
    preceding: TonalAssimilationLexeme,
    following: TonalAssimilationLexeme
  ): TonalPhrase[] {
    const wrds = preceding.assimilateWith(following);
    if (wrds.length > 0) return [new TonalPhrase([wrds[0], following.word])];
    return [];
  }
}

export class ReverseRegressiveExternal extends TonalPhrasalUnassimilationMetaplasm {
  apply(
    preceding: TonalUnassimilationLexeme,
    following: TonalUnassimilationLexeme
  ): TonalPhrase[] {
    const wrds = preceding.unassimilateWith(following);
    if (wrds.length > 0) return [new TonalPhrase([wrds[0], following.word])];
    return [];
  }
}

export class InsertToEnclitic extends TonalPhrasalInsertionMetaplasm {
  apply(
    preceding: TonalInsertionLexeme,
    following: TonalInsertionLexeme
  ): TonalPhrase[] {
    const wrds = following.insertWith(preceding);
    if (wrds.length > 0)
      return [new TonalPhrase([preceding.word].concat(wrds))];
    return [];
  }
}

export class UninsertFromEnclitic extends TonalPhrasalUninsertionMetaplasm {
  apply(
    preceding: TonalUninsertionLexeme,
    following: TonalUninsertionLexeme
  ): TonalPhrase[] {
    const wrds = following.uninsertWith(preceding);
    if (wrds.length > 0)
      return [new TonalPhrase([preceding.word].concat(wrds))];
    return [];
  }
}

export class InfectExternal extends TonalPhrasalInfectionMetaplasm {
  apply(
    preceding: TonalInfectionLexeme,
    following: TonalInfectionLexeme
  ): TonalPhrase[] {
    const wrds = following.infectWith(preceding);
    if (wrds.length > 0)
      return [new TonalPhrase([preceding.word].concat(wrds))];
    return [];
  }
}

export class UninfectExternal extends TonalPhrasalUninfectionMetaplasm {
  apply(
    preceding: TonalUninfectionLexeme,
    following: TonalUninfectionLexeme
  ): TonalPhrase[] {
    const wrds = following.uninfectWith(preceding);
    if (wrds.length > 0)
      return [new TonalPhrase([preceding.word].concat(wrds))];
    return [];
  }
}
