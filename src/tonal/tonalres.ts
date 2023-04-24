import {
  Letters,
  Sound,
  soundSequence,
  Character,
  MatchedSequence,
} from '../unit';

export class Morph {}

export class Allomorph extends Morph {
  tonal: Tonal = new Tonal();

  toString() {
    // this function is promoted from class FreeAllomorph
    return this.tonal.toString();
  }
}

export class FreeAllomorph extends Allomorph {}

export class CheckedAllomorph extends Allomorph {
  final: Final = new Final();

  toString() {
    if (this.tonal.toString()) {
      return this.final.toString() + this.tonal.toString();
    }
    return this.final.toString();
  }
}

class Affix {}

export class TonalAffix extends Affix {
  tonal: Tonal = new Tonal();
  toString() {
    return this.tonal.toString();
  }
}

class FreeAffix extends TonalAffix {}

class CheckedAffix extends TonalAffix {
  // there is no final for affix
}

export enum ToneLetterTags {
  a = 'a',
  e = 'e',
  i = 'i',
  o = 'o',
  u = 'u',
  ur = 'ur',

  c = 'c',
  ch = 'ch',
  j = 'j',
  s = 's',
  ph = 'ph',
  th = 'th',
  kh = 'kh',

  m = 'm',
  n = 'n',
  ng = 'ng',

  nn = 'nn',

  f = 'f',
  w = 'w',
  x = 'x',
  xx = 'xx',
  y = 'y',
  z = 'z',
  zx = 'zx',

  b = 'b',
  g = 'g',
  l = 'l',

  k = 'k',
  p = 'p',
  t = 't',

  kk = 'kk',
  pp = 'pp',
  tt = 'tt',
  hh = 'hh',

  bb = 'bb',
  gg = 'gg',
  ll = 'll',
  jj = 'jj',
  ss = 'ss',

  h = 'h',

  zero = 'zero',

  er = 'er',
  ir = 'ir',
  or = 'or',
}

export class TonalLetters extends Letters {
  handleN(
    characters: Character[],
    beginOfLetter: number,
    listLength: number
  ): MatchedSequence {
    let ms = new MatchedSequence();
    if (
      characters.length - beginOfLetter >= 'nng'.length &&
      listLength == lowerLettersTonal.size
    ) {
      if (
        characters[beginOfLetter].character === 'n' &&
        characters[beginOfLetter + 1].character === 'n' &&
        characters[beginOfLetter + 2].character === 'g'
      ) {
        // at the beginning of a letter, we should always prefer 'n' to 'nn'
        // 'nn' is not able to begin a syllable
        // 'ng' has higher associativity than 'nn' when in 'nng'
        // special case for 'nng'

        // copy the matched letter
        ms.characters[0] = new Character('n');
        return ms;
      }
    }
    return ms;
  }
}

export const lowerLettersTonal = new TonalLetters([
  ToneLetterTags.a,
  ToneLetterTags.e,
  ToneLetterTags.i,
  ToneLetterTags.o,
  ToneLetterTags.u,
  ToneLetterTags.ur,
  ToneLetterTags.c,
  ToneLetterTags.ch,
  ToneLetterTags.j,
  ToneLetterTags.jj,
  ToneLetterTags.s,
  ToneLetterTags.m,
  ToneLetterTags.n,
  ToneLetterTags.ng,
  ToneLetterTags.nn,
  ToneLetterTags.w,
  ToneLetterTags.xx,
  ToneLetterTags.z,
  ToneLetterTags.zx,
  ToneLetterTags.x,
  ToneLetterTags.y,
  ToneLetterTags.b,
  ToneLetterTags.g,
  ToneLetterTags.l,
  ToneLetterTags.k,
  ToneLetterTags.p,
  ToneLetterTags.t,
  ToneLetterTags.kk,
  ToneLetterTags.pp,
  ToneLetterTags.tt,
  ToneLetterTags.hh,
  ToneLetterTags.bb,
  ToneLetterTags.gg,
  ToneLetterTags.ll,
  ToneLetterTags.ss,
  ToneLetterTags.f,
  ToneLetterTags.h,
  ToneLetterTags.er,
  ToneLetterTags.ir,
  ToneLetterTags.or,
  ToneLetterTags.ph,
  ToneLetterTags.th,
  ToneLetterTags.kh,
]);

export enum TonalSpellingTags {
  initialConsonant = 'initialConsonant',
  vowel = 'vowel',
  materLectionis = 'materLectionis',
  nasalization = 'nasalization',
  stopFinalConsonant = 'stopFinalConsonant',
  nasalFinalConsonant = 'nasalFinalConsonant',
  checkedTone = 'checkedTone', // checked tone
  freeTone = 'freeTone', // free tone. unchecked tone
}

export class Initial extends Sound {
  name = TonalSpellingTags.initialConsonant;
}
export class Medial extends Sound {
  name = TonalSpellingTags.vowel;
}
export class Final extends Sound {
  name = '';
}
export class Nasalization extends Sound {
  name = TonalSpellingTags.nasalization;
}
export class Tonal extends Sound {
  name = '';
}

export class FreeTonal extends Tonal {
  name = TonalSpellingTags.freeTone;
}
export class CheckedTonal extends Tonal {
  name = TonalSpellingTags.checkedTone;
}

export class StopFinal extends Final {
  name = TonalSpellingTags.stopFinalConsonant;
}
export class NasalFinal extends Final {
  name = TonalSpellingTags.nasalFinalConsonant;
}

export class MaterLectionis extends Medial {
  name = TonalSpellingTags.materLectionis;
}

class MedialA extends Medial {
  characters = this.makeCharacters(ToneLetterTags.a);
}
class MedialE extends Medial {
  characters = this.makeCharacters(ToneLetterTags.e);
}
class MedialI extends Medial {
  characters = this.makeCharacters(ToneLetterTags.i);
}
class MedialO extends Medial {
  characters = this.makeCharacters(ToneLetterTags.o);
}
class MedialU extends Medial {
  characters = this.makeCharacters(ToneLetterTags.u);
}
class MedialUR extends Medial {
  characters = this.makeCharacters(ToneLetterTags.ur);
}
class MedialER extends Medial {
  characters = this.makeCharacters(ToneLetterTags.er);
}
class MedialIR extends Medial {
  characters = this.makeCharacters(ToneLetterTags.ir);
}
class MedialOR extends Medial {
  characters = this.makeCharacters(ToneLetterTags.or);
}

class MaterLectionisM extends MaterLectionis {
  characters = this.makeCharacters(ToneLetterTags.m);
}
class MaterLectionisN extends MaterLectionis {
  characters = this.makeCharacters(ToneLetterTags.n);
}
class MaterLectionisNG extends MaterLectionis {
  characters = this.makeCharacters(ToneLetterTags.ng);
}

class InitialC extends Initial {
  characters = this.makeCharacters(ToneLetterTags.c);
}
class InitialCH extends Initial {
  characters = this.makeCharacters(ToneLetterTags.ch);
}
class InitialJ extends Initial {
  characters = this.makeCharacters(ToneLetterTags.j);
}
class InitialL extends Initial {
  characters = this.makeCharacters(ToneLetterTags.l);
}
class InitialS extends Initial {
  characters = this.makeCharacters(ToneLetterTags.s);
}
class InitialPH extends Initial {
  characters = this.makeCharacters(ToneLetterTags.ph);
}
class InitialTH extends Initial {
  characters = this.makeCharacters(ToneLetterTags.th);
}
class InitialKH extends Initial {
  characters = this.makeCharacters(ToneLetterTags.kh);
}

class InitialH extends Initial {
  characters = this.makeCharacters(ToneLetterTags.h);
}

class InitialP extends Initial {
  characters = this.makeCharacters(ToneLetterTags.p);
}
class InitialT extends Initial {
  characters = this.makeCharacters(ToneLetterTags.t);
}
class InitialK extends Initial {
  characters = this.makeCharacters(ToneLetterTags.k);
}
class InitialB extends Initial {
  characters = this.makeCharacters(ToneLetterTags.b);
}
class InitialG extends Initial {
  characters = this.makeCharacters(ToneLetterTags.g);
}

class InitialM extends Initial {
  characters = this.makeCharacters(ToneLetterTags.m);
}
class InitialN extends Initial {
  characters = this.makeCharacters(ToneLetterTags.n);
}
class InitialNG extends Initial {
  characters = this.makeCharacters(ToneLetterTags.ng);
}

export class ZeroTonal extends Tonal {
  characters = [];
}

export class FreeTonalZ extends FreeTonal {
  characters = this.makeCharacters(ToneLetterTags.z);
}
export class FreeTonalW extends FreeTonal {
  characters = this.makeCharacters(ToneLetterTags.w);
}
export class FreeTonalF extends FreeTonal {
  characters = this.makeCharacters(ToneLetterTags.f);
}
export class FreeTonalXX extends FreeTonal {
  characters = this.makeCharacters(ToneLetterTags.xx);
}
export class FreeTonalZX extends FreeTonal {
  characters = this.makeCharacters(ToneLetterTags.zx);
}

export class FreeTonalX extends FreeTonal {
  characters = this.makeCharacters(ToneLetterTags.x);
}
export class FreeTonalY extends FreeTonal {
  characters = this.makeCharacters(ToneLetterTags.y);
}

export class CheckedTonalW extends CheckedTonal {
  characters = this.makeCharacters(ToneLetterTags.w);
}
export class CheckedTonalF extends CheckedTonal {
  characters = this.makeCharacters(ToneLetterTags.f);
}

export class CheckedTonalX extends CheckedTonal {
  characters = this.makeCharacters(ToneLetterTags.x);
}
export class CheckedTonalY extends CheckedTonal {
  characters = this.makeCharacters(ToneLetterTags.y);
}

export class FinalP extends StopFinal {
  characters = this.makeCharacters(ToneLetterTags.p);
}
export class FinalT extends StopFinal {
  characters = this.makeCharacters(ToneLetterTags.t);
}
export class FinalK extends StopFinal {
  characters = this.makeCharacters(ToneLetterTags.k);
}
export class FinalH extends StopFinal {
  characters = this.makeCharacters(ToneLetterTags.h);
}

export class FinalPP extends StopFinal {
  characters = this.makeCharacters(ToneLetterTags.pp);
}
export class FinalTT extends StopFinal {
  characters = this.makeCharacters(ToneLetterTags.tt);
}
export class FinalKK extends StopFinal {
  characters = this.makeCharacters(ToneLetterTags.kk);
}
export class FinalHH extends StopFinal {
  characters = this.makeCharacters(ToneLetterTags.hh);
}

class FinalB extends StopFinal {
  characters = this.makeCharacters(ToneLetterTags.b);
}

class FinalL extends StopFinal {
  characters = this.makeCharacters(ToneLetterTags.l);
}

class FinalG extends StopFinal {
  characters = this.makeCharacters(ToneLetterTags.g);
}

class FinalJ extends StopFinal {
  characters = this.makeCharacters(ToneLetterTags.j);
}

class FinalS extends StopFinal {
  characters = this.makeCharacters(ToneLetterTags.s);
}

class FinalBB extends StopFinal {
  characters = this.makeCharacters(ToneLetterTags.bb);
}

class FinalLL extends StopFinal {
  characters = this.makeCharacters(ToneLetterTags.ll);
}

class FinalGG extends StopFinal {
  characters = this.makeCharacters(ToneLetterTags.gg);
}

class FinalJJ extends StopFinal {
  characters = this.makeCharacters(ToneLetterTags.jj);
}

class FinalSS extends StopFinal {
  characters = this.makeCharacters(ToneLetterTags.ss);
}

class FinalM extends NasalFinal {
  characters = this.makeCharacters(ToneLetterTags.m);
}
class FinalN extends NasalFinal {
  characters = this.makeCharacters(ToneLetterTags.n);
}
class FinalNG extends NasalFinal {
  characters = this.makeCharacters(ToneLetterTags.ng);
}

class NasalizationNN extends Nasalization {
  characters = this.makeCharacters(ToneLetterTags.nn);
}

export const nasalizationsTonal = soundSequence([new NasalizationNN()]);

export const nasalFinalConsonantsTonal = soundSequence([
  new FinalM(),
  new FinalN(),
  new FinalNG(),
]);

export const neutralFinalConsonantsTonal = soundSequence([
  new FinalH(),
  new FinalHH(),
]);

export const vowelsTonal = soundSequence([
  new MedialA(),
  new MedialE(),
  new MedialI(),
  new MedialO(),
  new MedialU(),
  new MedialUR(),
  new MedialIR(),
  new MedialOR(),
  new MedialER(),
]);

export const materLectionisTonal = soundSequence([
  new MaterLectionisM(),
  new MaterLectionisN(),
  new MaterLectionisNG(),
]);

export const initialConsonantsTonal = soundSequence([
  new InitialP(),
  new InitialT(),
  new InitialK(),
  new InitialB(),
  new InitialG(),

  new InitialH(),

  new InitialC(),
  new InitialCH(),
  new InitialJ(),
  new InitialL(),
  new InitialS(),

  new InitialPH(),
  new InitialTH(),
  new InitialKH(),

  new InitialM(),
  new InitialN(),
  new InitialNG(),
]);

export const freeToneLettersTonal = soundSequence([
  new FreeTonalZ(),
  new FreeTonalW(),
  new FreeTonalXX(),
  new FreeTonalF(),
  new FreeTonalZX(),

  new FreeTonalX(),
  new FreeTonalY(),
]);

export const checkedToneLettersTonal = soundSequence([
  new CheckedTonalF(),
  new CheckedTonalY(),
  new CheckedTonalW(),
  new CheckedTonalX(),
]);

export const finalConsonantsPtkhppttkkhhTonal = soundSequence([
  new FinalP(),
  new FinalT(),
  new FinalK(),
  new FinalH(),
  new FinalPP(),
  new FinalTT(),
  new FinalKK(),
  new FinalHH(),
]);

export const finalConsonantsBgjklpsTonal = soundSequence([
  new FinalB(),
  new FinalG(),
  new FinalJ(),
  new FinalK(),
  new FinalL(),
  new FinalP(),
  new FinalS(),
]);

export const finalConsonantsBBggkkllppssTonal = soundSequence([
  new FinalBB(),
  new FinalGG(),
  new FinalJJ(),
  new FinalKK(),
  new FinalLL(),
  new FinalPP(),
  new FinalSS(),
]);

function positionalSounds(sounds: Sound[]) {
  return (s: TonalSpellingTags) => {
    for (const i in sounds) {
      if (sounds[i].name === s) return sounds[i];
    }
    return new Sound();
  };
}

const psA = positionalSounds([new MedialA()]);
const psB = positionalSounds([new InitialB(), new FinalB()]);
const psBB = positionalSounds([new FinalBB()]);
const psC = positionalSounds([new InitialC()]);
const psCH = positionalSounds([new InitialCH()]);
const psE = positionalSounds([new MedialE()]);
const psER = positionalSounds([new MedialER()]);
const psF = positionalSounds([new FreeTonalF(), new CheckedTonalF()]);
const psG = positionalSounds([new InitialG(), new FinalG()]);
const psGG = positionalSounds([new FinalGG()]);
const psH = positionalSounds([new InitialH(), new FinalH()]);
const psHH = positionalSounds([new FinalHH()]);
const psI = positionalSounds([new MedialI()]);
const psIR = positionalSounds([new MedialIR()]);
const psJ = positionalSounds([new InitialJ(), new FinalJ()]);
const psJJ = positionalSounds([new FinalJJ()]);
const psK = positionalSounds([new InitialK(), new FinalK()]);
const psKH = positionalSounds([new InitialKH()]);
const psKK = positionalSounds([new FinalKK()]);
const psL = positionalSounds([new InitialL(), new FinalL()]);
const psLL = positionalSounds([new FinalLL()]);
const psM = positionalSounds([
  new InitialM(),
  new MaterLectionisM(),
  new FinalM(),
]);
const psN = positionalSounds([
  new InitialN(),
  new MaterLectionisN(),
  new FinalN(),
]);
const psNN = positionalSounds([new NasalizationNN()]);
const psNG = positionalSounds([
  new InitialNG(),
  new MaterLectionisNG(),
  new FinalNG(),
]);
const psO = positionalSounds([new MedialO()]);
const psOR = positionalSounds([new MedialOR()]);
const psP = positionalSounds([new InitialP(), new FinalP()]);
const psPH = positionalSounds([new InitialPH()]);
const psPP = positionalSounds([new FinalPP()]);
const psS = positionalSounds([new InitialS(), new FinalS()]);
const psSS = positionalSounds([new FinalSS()]);
const psT = positionalSounds([new InitialT(), new FinalT()]);
const psTH = positionalSounds([new InitialTH()]);
const psTT = positionalSounds([new FinalTT()]);
const psU = positionalSounds([new MedialU()]);
const psUR = positionalSounds([new MedialUR()]);
const psW = positionalSounds([new FreeTonalW(), new CheckedTonalW()]);
const psX = positionalSounds([new FreeTonalX(), new CheckedTonalX()]);
const psXX = positionalSounds([new FreeTonalXX()]);
const psY = positionalSounds([new FreeTonalY(), new CheckedTonalY()]);
const psZ = positionalSounds([new FreeTonalZ()]);
const psZX = positionalSounds([new FreeTonalZX()]);

export const tonalPositionalSounds = new Map<
  string,
  (s: TonalSpellingTags) => Sound
>()
  .set(ToneLetterTags.a, psA)
  .set(ToneLetterTags.b, psB)
  .set(ToneLetterTags.bb, psBB)
  .set(ToneLetterTags.c, psC)
  .set(ToneLetterTags.ch, psCH)
  .set(ToneLetterTags.e, psE)
  .set(ToneLetterTags.er, psER)
  .set(ToneLetterTags.f, psF)
  .set(ToneLetterTags.g, psG)
  .set(ToneLetterTags.gg, psGG)
  .set(ToneLetterTags.h, psH)
  .set(ToneLetterTags.hh, psHH)
  .set(ToneLetterTags.i, psI)
  .set(ToneLetterTags.ir, psIR)
  .set(ToneLetterTags.j, psJ)
  .set(ToneLetterTags.jj, psJJ)
  .set(ToneLetterTags.k, psK)
  .set(ToneLetterTags.kh, psKH)
  .set(ToneLetterTags.kk, psKK)
  .set(ToneLetterTags.l, psL)
  .set(ToneLetterTags.ll, psLL)
  .set(ToneLetterTags.m, psM)
  .set(ToneLetterTags.n, psN)
  .set(ToneLetterTags.nn, psNN)
  .set(ToneLetterTags.ng, psNG)
  .set(ToneLetterTags.o, psO)
  .set(ToneLetterTags.or, psOR)
  .set(ToneLetterTags.p, psP)
  .set(ToneLetterTags.ph, psPH)
  .set(ToneLetterTags.pp, psPP)
  .set(ToneLetterTags.s, psS)
  .set(ToneLetterTags.ss, psSS)
  .set(ToneLetterTags.t, psT)
  .set(ToneLetterTags.th, psTH)
  .set(ToneLetterTags.tt, psTT)
  .set(ToneLetterTags.u, psU)
  .set(ToneLetterTags.ur, psUR)
  .set(ToneLetterTags.w, psW)
  .set(ToneLetterTags.x, psX)
  .set(ToneLetterTags.xx, psXX)
  .set(ToneLetterTags.y, psY)
  .set(ToneLetterTags.z, psZ)
  .set(ToneLetterTags.zx, psZX);

export class ZeroAllomorph extends FreeAllomorph {
  tonal = new ZeroTonal();
}

class AllomorphF extends FreeAllomorph {
  tonal = new FreeTonalF();
}

export class AllomorphZ extends FreeAllomorph {
  tonal = new FreeTonalZ();
}

export class AllomorphY extends FreeAllomorph {
  tonal = new FreeTonalY();
}

export class AllomorphW extends FreeAllomorph {
  tonal = new FreeTonalW();
}

export class AllomorphX extends FreeAllomorph {
  tonal = new FreeTonalX();
}

class AllomorphXX extends FreeAllomorph {
  tonal = new FreeTonalXX();
}

class AllomorphZX extends FreeAllomorph {
  tonal = new FreeTonalZX();
}

export const freeAllomorphs = new Map<string, Allomorph>()
  .set(ToneLetterTags.f, new AllomorphF())
  .set(ToneLetterTags.w, new AllomorphW())
  .set(ToneLetterTags.xx, new AllomorphXX())
  .set(ToneLetterTags.z, new AllomorphZ())
  .set(ToneLetterTags.zx, new AllomorphZX())
  .set(ToneLetterTags.y, new AllomorphY())
  .set(ToneLetterTags.x, new AllomorphX());

class AllomorphP extends CheckedAllomorph {
  final = new FinalP();
}

class AllomorphT extends CheckedAllomorph {
  final = new FinalT();
}

class AllomorphK extends CheckedAllomorph {
  final = new FinalK();
}

export class AllomorphH extends CheckedAllomorph {
  final = new FinalH();
}

class AllomorphB extends CheckedAllomorph {
  final = new FinalB();
}

class AllomorphL extends CheckedAllomorph {
  final = new FinalL();
}

class AllomorphG extends CheckedAllomorph {
  final = new FinalG();
}

class AllomorphJ extends CheckedAllomorph {
  final = new FinalJ();
}

class AllomorphPP extends CheckedAllomorph {
  final = new FinalPP();
}

class AllomorphTT extends CheckedAllomorph {
  final = new FinalTT();
}

class AllomorphKK extends CheckedAllomorph {
  final = new FinalKK();
}

class AllomorphHH extends CheckedAllomorph {
  final = new FinalHH();
}

class AllomorphBB extends CheckedAllomorph {
  final = new FinalBB();
}

class AllomorphLL extends CheckedAllomorph {
  final = new FinalLL();
}

class AllomorphGG extends CheckedAllomorph {
  final = new FinalGG();
}

class AllomorphJJ extends CheckedAllomorph {
  final = new FinalJJ();
}

class AllomorphSS extends CheckedAllomorph {
  final = new FinalSS();
}

class AllomorphPF extends CheckedAllomorph {
  final = new FinalP();
  tonal = new CheckedTonalF();
}

class AllomorphPW extends CheckedAllomorph {
  final = new FinalP();
  tonal = new CheckedTonalW();
}

class AllomorphTF extends CheckedAllomorph {
  final = new FinalT();
  tonal = new CheckedTonalF();
}

class AllomorphKF extends CheckedAllomorph {
  final = new FinalK();
  tonal = new CheckedTonalF();
}

class AllomorphHF extends CheckedAllomorph {
  final = new FinalH();
  tonal = new CheckedTonalF();
}

export class AllomorphHY extends CheckedAllomorph {
  final = new FinalH();
  tonal = new CheckedTonalY();
}

class AllomorphHW extends CheckedAllomorph {
  final = new FinalH();
  tonal = new CheckedTonalW();
}

class AllomorphTW extends CheckedAllomorph {
  final = new FinalT();
  tonal = new CheckedTonalW();
}

class AllomorphKW extends CheckedAllomorph {
  final = new FinalK();
  tonal = new CheckedTonalW();
}

class AllomorphPX extends CheckedAllomorph {
  final = new FinalP();
  tonal = new CheckedTonalX();
}

class AllomorphTX extends CheckedAllomorph {
  final = new FinalT();
  tonal = new CheckedTonalX();
}

class AllomorphKX extends CheckedAllomorph {
  final = new FinalK();
  tonal = new CheckedTonalX();
}

class AllomorphHX extends CheckedAllomorph {
  final = new FinalH();
  tonal = new CheckedTonalX();
}

class AllomorphBF extends CheckedAllomorph {
  final = new FinalB();
  tonal = new CheckedTonalF();
}

class AllomorphGF extends CheckedAllomorph {
  final = new FinalG();
  tonal = new CheckedTonalF();
}

class AllomorphJF extends CheckedAllomorph {
  final = new FinalJ();
  tonal = new CheckedTonalF();
}

class AllomorphLF extends CheckedAllomorph {
  final = new FinalL();
  tonal = new CheckedTonalF();
}

class AllomorphSF extends CheckedAllomorph {
  final = new FinalS();
  tonal = new CheckedTonalF();
}

class AllomorphBW extends CheckedAllomorph {
  final = new FinalB();
  tonal = new CheckedTonalW();
}

class AllomorphGW extends CheckedAllomorph {
  final = new FinalG();
  tonal = new CheckedTonalW();
}

class AllomorphJW extends CheckedAllomorph {
  final = new FinalJ();
  tonal = new CheckedTonalW();
}

class AllomorphLW extends CheckedAllomorph {
  final = new FinalL();
  tonal = new CheckedTonalW();
}

class AllomorphSW extends CheckedAllomorph {
  final = new FinalS();
  tonal = new CheckedTonalW();
}

class AllomorphBX extends CheckedAllomorph {
  final = new FinalB();
  tonal = new CheckedTonalX();
}

class AllomorphGX extends CheckedAllomorph {
  final = new FinalG();
  tonal = new CheckedTonalX();
}

class AllomorphLX extends CheckedAllomorph {
  final = new FinalL();
  tonal = new CheckedTonalX();
}

export const checkedAllomorphs = new Map<string, Allomorph>()
  .set(ToneLetterTags.p, new AllomorphP())
  .set(ToneLetterTags.t, new AllomorphT())
  .set(ToneLetterTags.k, new AllomorphK())
  .set(ToneLetterTags.h, new AllomorphH())
  .set(ToneLetterTags.b, new AllomorphB())
  .set(ToneLetterTags.g, new AllomorphG())
  .set(ToneLetterTags.j, new AllomorphJ())
  .set(ToneLetterTags.l, new AllomorphL())
  .set(ToneLetterTags.pp, new AllomorphPP())
  .set(ToneLetterTags.tt, new AllomorphTT())
  .set(ToneLetterTags.kk, new AllomorphKK())
  .set(ToneLetterTags.hh, new AllomorphHH())
  .set(ToneLetterTags.bb, new AllomorphBB())
  .set(ToneLetterTags.gg, new AllomorphGG())
  .set(ToneLetterTags.jj, new AllomorphJJ())
  .set(ToneLetterTags.ll, new AllomorphLL())
  .set(ToneLetterTags.ss, new AllomorphSS())
  .set(ToneLetterTags.p + ToneLetterTags.f, new AllomorphPF())
  .set(ToneLetterTags.t + ToneLetterTags.f, new AllomorphTF())
  .set(ToneLetterTags.k + ToneLetterTags.f, new AllomorphKF())
  .set(ToneLetterTags.h + ToneLetterTags.f, new AllomorphHF())
  .set(ToneLetterTags.b + ToneLetterTags.f, new AllomorphBF())
  .set(ToneLetterTags.g + ToneLetterTags.f, new AllomorphGF())
  .set(ToneLetterTags.j + ToneLetterTags.f, new AllomorphJF())
  .set(ToneLetterTags.l + ToneLetterTags.f, new AllomorphLF())
  .set(ToneLetterTags.s + ToneLetterTags.f, new AllomorphSF())
  .set(ToneLetterTags.h + ToneLetterTags.y, new AllomorphHY())
  .set(ToneLetterTags.p + ToneLetterTags.w, new AllomorphPW())
  .set(ToneLetterTags.t + ToneLetterTags.w, new AllomorphTW())
  .set(ToneLetterTags.k + ToneLetterTags.w, new AllomorphKW())
  .set(ToneLetterTags.h + ToneLetterTags.w, new AllomorphHW())
  .set(ToneLetterTags.b + ToneLetterTags.w, new AllomorphBW())
  .set(ToneLetterTags.g + ToneLetterTags.w, new AllomorphGW())
  .set(ToneLetterTags.j + ToneLetterTags.w, new AllomorphJW())
  .set(ToneLetterTags.l + ToneLetterTags.w, new AllomorphLW())
  .set(ToneLetterTags.s + ToneLetterTags.w, new AllomorphSW())
  .set(ToneLetterTags.p + ToneLetterTags.x, new AllomorphPX())
  .set(ToneLetterTags.t + ToneLetterTags.x, new AllomorphTX())
  .set(ToneLetterTags.k + ToneLetterTags.x, new AllomorphKX())
  .set(ToneLetterTags.h + ToneLetterTags.x, new AllomorphHX())
  .set(ToneLetterTags.b + ToneLetterTags.x, new AllomorphBX())
  .set(ToneLetterTags.g + ToneLetterTags.x, new AllomorphGX())
  .set(ToneLetterTags.l + ToneLetterTags.x, new AllomorphLX());

export const combinedFreeAllomorphs = new Map<string, Allomorph>()
  .set(ToneLetterTags.w, new AllomorphW())
  .set(ToneLetterTags.z, new AllomorphZ())
  .set(ToneLetterTags.x, new AllomorphX())
  .set(ToneLetterTags.y, new AllomorphY())
  .set(ToneLetterTags.f, new AllomorphF())
  .set(ToneLetterTags.xx, new AllomorphXX());

export const uncombinedCheckedAllomorphs = new Map<string, Allomorph>()
  .set(ToneLetterTags.p, new AllomorphP())
  .set(ToneLetterTags.t, new AllomorphT())
  .set(ToneLetterTags.k, new AllomorphK())
  .set(ToneLetterTags.h, new AllomorphH())
  .set(ToneLetterTags.pp, new AllomorphPP())
  .set(ToneLetterTags.tt, new AllomorphTT())
  .set(ToneLetterTags.kk, new AllomorphKK())
  .set(ToneLetterTags.hh, new AllomorphHH());

export const combinedCheckedAllomorphs = new Map<string, Allomorph[]>()
  .set(ToneLetterTags.p + ToneLetterTags.f, [new AllomorphPF()])
  .set(ToneLetterTags.p + ToneLetterTags.w, [new AllomorphPW()])
  .set(ToneLetterTags.p + ToneLetterTags.x, [new AllomorphPX()])
  .set(ToneLetterTags.t + ToneLetterTags.f, [new AllomorphTF()])
  .set(ToneLetterTags.t + ToneLetterTags.w, [new AllomorphTW()])
  .set(ToneLetterTags.t + ToneLetterTags.x, [new AllomorphTX()])
  .set(ToneLetterTags.k + ToneLetterTags.f, [new AllomorphKF()])
  .set(ToneLetterTags.k + ToneLetterTags.w, [new AllomorphKW()])
  .set(ToneLetterTags.k + ToneLetterTags.x, [new AllomorphKX()])
  .set(ToneLetterTags.h + ToneLetterTags.f, [new AllomorphHF()])
  .set(ToneLetterTags.h + ToneLetterTags.y, [new AllomorphHY()])
  .set(ToneLetterTags.h + ToneLetterTags.w, [new AllomorphHW()])
  .set(ToneLetterTags.h + ToneLetterTags.x, [new AllomorphHX()])
  .set(ToneLetterTags.b + ToneLetterTags.f, [new AllomorphBF()])
  .set(ToneLetterTags.b + ToneLetterTags.w, [new AllomorphBW()])
  .set(ToneLetterTags.b + ToneLetterTags.x, [new AllomorphBX()])
  .set(ToneLetterTags.g + ToneLetterTags.f, [new AllomorphGF()])
  .set(ToneLetterTags.g + ToneLetterTags.w, [new AllomorphGW()])
  .set(ToneLetterTags.g + ToneLetterTags.x, [new AllomorphGX()])
  .set(ToneLetterTags.j + ToneLetterTags.f, [new AllomorphJF()])
  .set(ToneLetterTags.j + ToneLetterTags.w, [new AllomorphJW()])
  .set(ToneLetterTags.l + ToneLetterTags.f, [new AllomorphLF()])
  .set(ToneLetterTags.l + ToneLetterTags.w, [new AllomorphLW()])
  .set(ToneLetterTags.l + ToneLetterTags.x, [new AllomorphLX()])
  .set(ToneLetterTags.s + ToneLetterTags.f, [new AllomorphSF()])
  .set(ToneLetterTags.s + ToneLetterTags.w, [new AllomorphSW()]);

export const freeAllomorphUncombiningRules = new Map<string, Tonal[]>()
  .set(ToneLetterTags.f, [new FreeTonalY()])
  .set(ToneLetterTags.w, [new FreeTonalZ(), new FreeTonalX()])
  .set(ToneLetterTags.xx, [
    new FreeTonalZ(),
    new FreeTonalF(),
    new FreeTonalX(),
  ])
  .set(ToneLetterTags.z, [new ZeroTonal(), new FreeTonalX(), new FreeTonalF()])
  .set(ToneLetterTags.zx, [])
  .set(ToneLetterTags.x, [])
  .set(ToneLetterTags.y, [new FreeTonalW()])
  .set(ToneLetterTags.zero, [new FreeTonalY()]);

export const uncombiningRulesAy = new Map<string, Tonal[]>()
  .set(ToneLetterTags.f, [new FreeTonalY(), new FreeTonalW()])
  .set(ToneLetterTags.x, [new ZeroTonal(), new FreeTonalX(), new FreeTonalZ()]);
