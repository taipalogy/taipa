import { Letters, Sound, SetOfSounds } from '../unit';

export class Morph {}

export class Allomorph extends Morph {
  tonal: Tonal = new Tonal();

  toString() {
    if (this.tonal.toString().length == 0) {
      // return string 'zero' for first tone. member variable characters of graph is still null.
      return TonalLetterTags.zero;
    } else return this.tonal.toString();
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

export class TonalAffix extends Morph {
  tonal: Tonal = new Tonal();
  toString() {
    return this.tonal.toString();
  }
}

class FreeAffix extends TonalAffix {}

class CheckedAffix extends TonalAffix {
  // there is no final for affix
}

export enum TonalLetterTags {
  a = 'a',
  e = 'e',
  i = 'i',
  o = 'o',
  u = 'u',
  ur = 'ur',

  c = 'c',
  d = 'd',
  ch = 'ch',
  j = 'j',
  q = 'q',
  s = 's',
  v = 'v',

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
  jj = 'jj',
  ll = 'll',
  ss = 'ss',

  h = 'h',

  zero = 'zero',

  er = 'er',
  ir = 'ir',
  or = 'or',
}

export class LettersOfTonal extends Letters {}

export const lowerLettersTonal = new LettersOfTonal([
  TonalLetterTags.a,
  TonalLetterTags.e,
  TonalLetterTags.i,
  TonalLetterTags.o,
  TonalLetterTags.u,
  TonalLetterTags.ur,
  TonalLetterTags.c,
  TonalLetterTags.d,
  TonalLetterTags.ch,
  TonalLetterTags.j,
  TonalLetterTags.q,
  TonalLetterTags.s,
  TonalLetterTags.v,
  TonalLetterTags.m,
  TonalLetterTags.n,
  TonalLetterTags.ng,
  TonalLetterTags.nn,
  TonalLetterTags.w,
  TonalLetterTags.xx,
  TonalLetterTags.z,
  TonalLetterTags.zx,
  TonalLetterTags.x,
  TonalLetterTags.y,
  TonalLetterTags.b,
  TonalLetterTags.g,
  TonalLetterTags.l,
  TonalLetterTags.k,
  TonalLetterTags.p,
  TonalLetterTags.t,
  TonalLetterTags.kk,
  TonalLetterTags.pp,
  TonalLetterTags.tt,
  TonalLetterTags.hh,
  TonalLetterTags.bb,
  TonalLetterTags.gg,
  TonalLetterTags.jj,
  TonalLetterTags.ll,
  TonalLetterTags.ss,
  TonalLetterTags.f,
  TonalLetterTags.h,
  TonalLetterTags.er,
  TonalLetterTags.ir,
  TonalLetterTags.or,
]);

export enum TonalSoundTags {
  initial = 'initial',
  medial = 'medial',
  nasalization = 'nasalization',
  stopFinal = 'stopFinal',
  nasalFinal = 'nasalFinal',
  checkedTonal = 'checkedTonal',
  freeTonal = 'freeTonal',
}

export class Initial extends Sound {
  name = TonalSoundTags.initial;
}
export class Medial extends Sound {
  name = TonalSoundTags.medial;
}
export class Final extends Sound {
  name = '';
}
export class Nasalization extends Sound {
  name = TonalSoundTags.nasalization;
}
export class Tonal extends Sound {
  name = '';
}

export class FreeTonal extends Tonal {
  name = TonalSoundTags.freeTonal;
}
export class CheckedTonal extends Tonal {
  name = TonalSoundTags.checkedTonal;
}

export class StopFinal extends Final {
  name = TonalSoundTags.stopFinal;
}
export class NasalFinal extends Final {
  name = TonalSoundTags.nasalFinal;
}

class MedialA extends Medial {
  characters = this.makeCharacters(TonalLetterTags.a);
}
class MedialE extends Medial {
  characters = this.makeCharacters(TonalLetterTags.e);
}
class MedialI extends Medial {
  characters = this.makeCharacters(TonalLetterTags.i);
}
class MedialO extends Medial {
  characters = this.makeCharacters(TonalLetterTags.o);
}
class MedialU extends Medial {
  characters = this.makeCharacters(TonalLetterTags.u);
}
class MedialUR extends Medial {
  characters = this.makeCharacters(TonalLetterTags.ur);
}
class MedialER extends Medial {
  characters = this.makeCharacters(TonalLetterTags.er);
}
class MedialIR extends Medial {
  characters = this.makeCharacters(TonalLetterTags.ir);
}
class MedialOR extends Medial {
  characters = this.makeCharacters(TonalLetterTags.or);
}

class MaterLectionisM extends Medial {
  characters = this.makeCharacters(TonalLetterTags.m);
}
class MaterLectionisN extends Medial {
  characters = this.makeCharacters(TonalLetterTags.n);
}
class MaterLectionisNG extends Medial {
  characters = this.makeCharacters(TonalLetterTags.ng);
}

class InitialC extends Initial {
  characters = this.makeCharacters(TonalLetterTags.c);
}
class InitialCH extends Initial {
  characters = this.makeCharacters(TonalLetterTags.ch);
}
class InitialJ extends Initial {
  characters = this.makeCharacters(TonalLetterTags.j);
}
class InitialL extends Initial {
  characters = this.makeCharacters(TonalLetterTags.l);
}
class InitialQ extends Initial {
  characters = this.makeCharacters(TonalLetterTags.q);
}
class InitialS extends Initial {
  characters = this.makeCharacters(TonalLetterTags.s);
}
class InitialV extends Initial {
  characters = this.makeCharacters(TonalLetterTags.v);
}

class InitialH extends Initial {
  characters = this.makeCharacters(TonalLetterTags.h);
}

class InitialP extends Initial {
  characters = this.makeCharacters(TonalLetterTags.p);
}
class InitialT extends Initial {
  characters = this.makeCharacters(TonalLetterTags.t);
}
class InitialK extends Initial {
  characters = this.makeCharacters(TonalLetterTags.k);
}
class InitialB extends Initial {
  characters = this.makeCharacters(TonalLetterTags.b);
}
class InitialD extends Initial {
  characters = this.makeCharacters(TonalLetterTags.d);
}
class InitialG extends Initial {
  characters = this.makeCharacters(TonalLetterTags.g);
}

class InitialM extends Initial {
  characters = this.makeCharacters(TonalLetterTags.m);
}
class InitialN extends Initial {
  characters = this.makeCharacters(TonalLetterTags.n);
}
class InitialNG extends Initial {
  characters = this.makeCharacters(TonalLetterTags.ng);
}

export class ZeroTonal extends Tonal {
  characters = [];
}

export class FreeTonalZ extends FreeTonal {
  characters = this.makeCharacters(TonalLetterTags.z);
}
export class FreeTonalW extends FreeTonal {
  characters = this.makeCharacters(TonalLetterTags.w);
}
export class FreeTonalF extends FreeTonal {
  characters = this.makeCharacters(TonalLetterTags.f);
}
export class FreeTonalXX extends FreeTonal {
  characters = this.makeCharacters(TonalLetterTags.xx);
}
export class FreeTonalZX extends FreeTonal {
  characters = this.makeCharacters(TonalLetterTags.zx);
}

export class FreeTonalX extends FreeTonal {
  characters = this.makeCharacters(TonalLetterTags.x);
}
export class FreeTonalY extends FreeTonal {
  characters = this.makeCharacters(TonalLetterTags.y);
}

export class CheckedTonalW extends CheckedTonal {
  characters = this.makeCharacters(TonalLetterTags.w);
}
export class CheckedTonalF extends CheckedTonal {
  characters = this.makeCharacters(TonalLetterTags.f);
}

export class CheckedTonalX extends CheckedTonal {
  characters = this.makeCharacters(TonalLetterTags.x);
}
export class CheckedTonalY extends CheckedTonal {
  characters = this.makeCharacters(TonalLetterTags.y);
}

export class FinalP extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.p);
}
export class FinalT extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.t);
}
export class FinalK extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.k);
}
export class FinalH extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.h);
}

export class FinalPP extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.pp);
}
export class FinalTT extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.tt);
}
export class FinalKK extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.kk);
}
export class FinalHH extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.hh);
}

class FinalB extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.b);
}

class FinalL extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.l);
}

class FinalG extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.g);
}

class FinalJ extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.j);
}

class FinalS extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.s);
}

class FinalBB extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.bb);
}

class FinalLL extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.ll);
}

class FinalGG extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.gg);
}

class FinalJJ extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.jj);
}

class FinalSS extends StopFinal {
  characters = this.makeCharacters(TonalLetterTags.ss);
}

class FinalM extends NasalFinal {
  characters = this.makeCharacters(TonalLetterTags.m);
}
class FinalN extends NasalFinal {
  characters = this.makeCharacters(TonalLetterTags.n);
}
class FinalNG extends NasalFinal {
  characters = this.makeCharacters(TonalLetterTags.ng);
}

class NasalizationNN extends Nasalization {
  characters = this.makeCharacters(TonalLetterTags.nn);
}

export class NasalizationSound extends SetOfSounds {
  constructor() {
    super();
    this.sounds.push(new NasalizationNN());
  }
}

export class NasalFinalSounds extends SetOfSounds {
  constructor() {
    super();
    this.sounds.push(new FinalM());
    this.sounds.push(new FinalN());
    this.sounds.push(new FinalNG());
  }
}

export class NeutralFinalSounds extends SetOfSounds {
  constructor() {
    super();
    this.sounds.push(new FinalH());
    this.sounds.push(new FinalHH());
  }
}

export class MedialSounds extends SetOfSounds {
  constructor() {
    super();
    this.sounds.push(new MedialA());
    this.sounds.push(new MedialE());
    this.sounds.push(new MedialI());
    this.sounds.push(new MedialO());
    this.sounds.push(new MedialU());
    this.sounds.push(new MedialUR());
  }
}

export class MaterLectionisSounds extends SetOfSounds {
  constructor() {
    super();
    this.sounds.push(new MaterLectionisM());
    this.sounds.push(new MaterLectionisN());
    this.sounds.push(new MaterLectionisNG());
  }
}

export class InitialSounds extends SetOfSounds {
  constructor() {
    super();
    this.sounds.push(new InitialP());
    this.sounds.push(new InitialT());
    this.sounds.push(new InitialK());
    this.sounds.push(new InitialB());
    this.sounds.push(new InitialD());
    this.sounds.push(new InitialG());

    this.sounds.push(new InitialH());

    this.sounds.push(new InitialC());
    this.sounds.push(new InitialCH());
    this.sounds.push(new InitialJ());
    this.sounds.push(new InitialL());
    this.sounds.push(new InitialQ());
    this.sounds.push(new InitialS());
    this.sounds.push(new InitialV());

    this.sounds.push(new InitialM());
    this.sounds.push(new InitialN());
    this.sounds.push(new InitialNG());
  }
}

export class FreeTonalSounds extends SetOfSounds {
  constructor() {
    super();
    this.sounds.push(new FreeTonalZ());
    this.sounds.push(new FreeTonalW());
    this.sounds.push(new FreeTonalXX());
    this.sounds.push(new FreeTonalF());
    this.sounds.push(new FreeTonalZX());

    this.sounds.push(new FreeTonalX());
    this.sounds.push(new FreeTonalY());
  }
}

export class CheckedTonalSounds extends SetOfSounds {
  constructor() {
    super();
    this.sounds.push(new CheckedTonalF());
    this.sounds.push(new CheckedTonalY());
    this.sounds.push(new CheckedTonalW());
    this.sounds.push(new CheckedTonalX());
  }
}

export class StopFinalSounds extends SetOfSounds {
  constructor() {
    super();
    this.sounds.push(new FinalP());
    this.sounds.push(new FinalT());
    this.sounds.push(new FinalK());
    this.sounds.push(new FinalH());
    this.sounds.push(new FinalPP());
    this.sounds.push(new FinalTT());
    this.sounds.push(new FinalKK());
    this.sounds.push(new FinalHH());
  }
}

export class EuphonicFinalsBGJKLPS extends SetOfSounds {
  constructor() {
    super();
    this.sounds.push(new FinalB());
    this.sounds.push(new FinalG());
    this.sounds.push(new FinalJ());
    this.sounds.push(new FinalK());
    this.sounds.push(new FinalL());
    this.sounds.push(new FinalP());
    this.sounds.push(new FinalS());
  }
}

export class EuphonicFinalsBBGGJJKKLLPPSS extends SetOfSounds {
  constructor() {
    super();
    this.sounds.push(new FinalBB());
    this.sounds.push(new FinalGG());
    this.sounds.push(new FinalJJ());
    this.sounds.push(new FinalKK());
    this.sounds.push(new FinalLL());
    this.sounds.push(new FinalPP());
    this.sounds.push(new FinalSS());
  }
}

export function positionalSound(sounds: Sound[]) {
  return (t: TonalSoundTags) => {
    for (let i in sounds) {
      if (sounds[i].name === t) return sounds[i];
    }
    return new Sound();
  };
}

const psA = positionalSound([new MedialA()]);
const psB = positionalSound([new InitialB(), new FinalB()]);
const psBb = positionalSound([new FinalBB()]);
const psC = positionalSound([new InitialC()]);
const psCh = positionalSound([new InitialCH()]);
const psD = positionalSound([new InitialD()]);
const psE = positionalSound([new MedialE()]);
const psEr = positionalSound([new MedialER()]);
const psF = positionalSound([new FreeTonalF(), new CheckedTonalF()]);
const psG = positionalSound([new InitialG(), new FinalG()]);
const psGg = positionalSound([new FinalGG()]);
const psH = positionalSound([new InitialH(), new FinalH()]);
const psHh = positionalSound([new FinalHH()]);
const psI = positionalSound([new MedialI()]);
const psIr = positionalSound([new MedialIR()]);
const psJ = positionalSound([new InitialJ(), new FinalJ()]);
const psJj = positionalSound([new FinalJJ()]);
const psK = positionalSound([new InitialK(), new FinalK()]);
const psKk = positionalSound([new FinalKK()]);
const psL = positionalSound([new InitialL(), new FinalL()]);
const psLl = positionalSound([new FinalLL()]);
const psM = positionalSound([
  new InitialM(),
  new MaterLectionisM(),
  new FinalM(),
]);
const psN = positionalSound([
  new InitialN(),
  new MaterLectionisN(),
  new FinalN(),
]);
const psNn = positionalSound([new NasalizationNN()]);
const psNg = positionalSound([
  new InitialNG(),
  new MaterLectionisNG(),
  new FinalNG(),
]);
const psO = positionalSound([new MedialO()]);
const psOr = positionalSound([new MedialOR()]);
const psP = positionalSound([new InitialP(), new FinalP()]);
const psPp = positionalSound([new FinalPP()]);
const psQ = positionalSound([new InitialQ()]);
const psS = positionalSound([new InitialS(), new FinalS()]);
const psSs = positionalSound([new FinalSS()]);
const psT = positionalSound([new InitialT(), new FinalT()]);
const psTt = positionalSound([new FinalTT()]);
const psU = positionalSound([new MedialU()]);
const psUr = positionalSound([new MedialUR()]);
const psV = positionalSound([new InitialV()]);
const psW = positionalSound([new FreeTonalW(), new CheckedTonalW()]);
const psX = positionalSound([new FreeTonalX(), new CheckedTonalX()]);
const psXx = positionalSound([new FreeTonalXX()]);
const psY = positionalSound([new FreeTonalY(), new CheckedTonalY()]);
const psZ = positionalSound([new FreeTonalZ()]);
const psZx = positionalSound([new FreeTonalZX()]);

export const tonalPositionalSounds = new Map<
  string,
  (t: TonalSoundTags) => Sound
>()
  .set(TonalLetterTags.a, psA)
  .set(TonalLetterTags.b, psB)
  .set(TonalLetterTags.bb, psBb)
  .set(TonalLetterTags.c, psC)
  .set(TonalLetterTags.ch, psCh)
  .set(TonalLetterTags.d, psD)
  .set(TonalLetterTags.e, psE)
  .set(TonalLetterTags.er, psEr)
  .set(TonalLetterTags.f, psF)
  .set(TonalLetterTags.g, psG)
  .set(TonalLetterTags.gg, psGg)
  .set(TonalLetterTags.h, psH)
  .set(TonalLetterTags.hh, psHh)
  .set(TonalLetterTags.i, psI)
  .set(TonalLetterTags.ir, psIr)
  .set(TonalLetterTags.j, psJ)
  .set(TonalLetterTags.jj, psJj)
  .set(TonalLetterTags.k, psK)
  .set(TonalLetterTags.kk, psKk)
  .set(TonalLetterTags.l, psL)
  .set(TonalLetterTags.ll, psLl)
  .set(TonalLetterTags.m, psM)
  .set(TonalLetterTags.n, psN)
  .set(TonalLetterTags.nn, psNn)
  .set(TonalLetterTags.ng, psNg)
  .set(TonalLetterTags.o, psO)
  .set(TonalLetterTags.or, psOr)
  .set(TonalLetterTags.p, psP)
  .set(TonalLetterTags.pp, psPp)
  .set(TonalLetterTags.q, psQ)
  .set(TonalLetterTags.s, psS)
  .set(TonalLetterTags.ss, psSs)
  .set(TonalLetterTags.t, psT)
  .set(TonalLetterTags.tt, psTt)
  .set(TonalLetterTags.u, psU)
  .set(TonalLetterTags.ur, psUr)
  .set(TonalLetterTags.v, psV)
  .set(TonalLetterTags.w, psW)
  .set(TonalLetterTags.x, psX)
  .set(TonalLetterTags.xx, psXx)
  .set(TonalLetterTags.y, psY)
  .set(TonalLetterTags.z, psZ)
  .set(TonalLetterTags.zx, psZx);

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
  .set(TonalLetterTags.f, new AllomorphF())
  .set(TonalLetterTags.w, new AllomorphW())
  .set(TonalLetterTags.xx, new AllomorphXX())
  .set(TonalLetterTags.z, new AllomorphZ())
  .set(TonalLetterTags.zx, new AllomorphZX())
  .set(TonalLetterTags.y, new AllomorphY())
  .set(TonalLetterTags.x, new AllomorphX());

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

class AllomorphPF extends CheckedAllomorph {
  final = new FinalP();
  tonal = new CheckedTonalF();
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

class AllomorphPPW extends CheckedAllomorph {
  final = new FinalPP();
  tonal = new CheckedTonalW();
}

class AllomorphTTW extends CheckedAllomorph {
  final = new FinalTT();
  tonal = new CheckedTonalW();
}

class AllomorphKKW extends CheckedAllomorph {
  final = new FinalKK();
  tonal = new CheckedTonalW();
}

class AllomorphHHW extends CheckedAllomorph {
  final = new FinalHH();
  tonal = new CheckedTonalW();
}

class AllomorphPPX extends CheckedAllomorph {
  final = new FinalPP();
  tonal = new CheckedTonalX();
}

class AllomorphTTX extends CheckedAllomorph {
  final = new FinalTT();
  tonal = new CheckedTonalX();
}

class AllomorphKKX extends CheckedAllomorph {
  final = new FinalKK();
  tonal = new CheckedTonalX();
}

class AllomorphHHX extends CheckedAllomorph {
  final = new FinalHH();
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

class AllomorphBBW extends CheckedAllomorph {
  final = new FinalBB();
  tonal = new CheckedTonalW();
}

class AllomorphGGW extends CheckedAllomorph {
  final = new FinalGG();
  tonal = new CheckedTonalW();
}

class AllomorphJJW extends CheckedAllomorph {
  final = new FinalJJ();
  tonal = new CheckedTonalW();
}

class AllomorphLLW extends CheckedAllomorph {
  final = new FinalLL();
  tonal = new CheckedTonalW();
}

class AllomorphSSW extends CheckedAllomorph {
  final = new FinalSS();
  tonal = new CheckedTonalW();
}

class AllomorphBBX extends CheckedAllomorph {
  final = new FinalBB();
  tonal = new CheckedTonalX();
}

class AllomorphGGX extends CheckedAllomorph {
  final = new FinalGG();
  tonal = new CheckedTonalX();
}

class AllomorphJJX extends CheckedAllomorph {
  final = new FinalJJ();
  tonal = new CheckedTonalX();
}

class AllomorphLLX extends CheckedAllomorph {
  final = new FinalLL();
  tonal = new CheckedTonalX();
}

class AllomorphSSX extends CheckedAllomorph {
  final = new FinalSS();
  tonal = new CheckedTonalX();
}

export const checkedAllomorphs = new Map<string, Allomorph>()
  .set(TonalLetterTags.p, new AllomorphP())
  .set(TonalLetterTags.t, new AllomorphT())
  .set(TonalLetterTags.k, new AllomorphK())
  .set(TonalLetterTags.h, new AllomorphH())
  .set(TonalLetterTags.pp, new AllomorphPP())
  .set(TonalLetterTags.tt, new AllomorphTT())
  .set(TonalLetterTags.kk, new AllomorphKK())
  .set(TonalLetterTags.hh, new AllomorphHH())
  .set(TonalLetterTags.p + TonalLetterTags.f, new AllomorphPF())
  .set(TonalLetterTags.t + TonalLetterTags.f, new AllomorphTF())
  .set(TonalLetterTags.k + TonalLetterTags.f, new AllomorphKF())
  .set(TonalLetterTags.h + TonalLetterTags.f, new AllomorphHF())
  .set(TonalLetterTags.pp + TonalLetterTags.w, new AllomorphPPW())
  .set(TonalLetterTags.tt + TonalLetterTags.w, new AllomorphTTW())
  .set(TonalLetterTags.kk + TonalLetterTags.w, new AllomorphKKW())
  .set(TonalLetterTags.hh + TonalLetterTags.w, new AllomorphHHW())
  .set(TonalLetterTags.h + TonalLetterTags.y, new AllomorphHY())
  .set(TonalLetterTags.pp + TonalLetterTags.x, new AllomorphPPX())
  .set(TonalLetterTags.tt + TonalLetterTags.x, new AllomorphTTX())
  .set(TonalLetterTags.kk + TonalLetterTags.x, new AllomorphKKX())
  .set(TonalLetterTags.hh + TonalLetterTags.x, new AllomorphHHX());

export const combinedFreeAllomorphs = new Map<string, Allomorph>()
  .set(TonalLetterTags.w, new AllomorphW())
  .set(TonalLetterTags.z, new AllomorphZ())
  .set(TonalLetterTags.x, new AllomorphX())
  .set(TonalLetterTags.y, new AllomorphY())
  .set(TonalLetterTags.f, new AllomorphF())
  .set(TonalLetterTags.xx, new AllomorphXX());

export const uncombinedCheckedAllomorphs = new Map<string, Allomorph>()
  .set(TonalLetterTags.p, new AllomorphP())
  .set(TonalLetterTags.t, new AllomorphT())
  .set(TonalLetterTags.k, new AllomorphK())
  .set(TonalLetterTags.h, new AllomorphH())
  .set(TonalLetterTags.pp, new AllomorphPP())
  .set(TonalLetterTags.tt, new AllomorphTT())
  .set(TonalLetterTags.kk, new AllomorphKK())
  .set(TonalLetterTags.hh, new AllomorphHH());

export const combinedCheckedAllomorphs = new Map<string, Allomorph[]>()
  .set(TonalLetterTags.p, [new AllomorphPF()])
  .set(TonalLetterTags.t, [new AllomorphTF()])
  .set(TonalLetterTags.k, [new AllomorphKF()])
  .set(TonalLetterTags.h, [new AllomorphHF(), new AllomorphHY()])
  .set(TonalLetterTags.b, [new AllomorphBF()])
  .set(TonalLetterTags.g, [new AllomorphGF()])
  .set(TonalLetterTags.j, [new AllomorphJF()])
  .set(TonalLetterTags.l, [new AllomorphLF()])
  .set(TonalLetterTags.s, [new AllomorphSF()])
  .set(TonalLetterTags.pp, [new AllomorphPPW(), new AllomorphPPX()])
  .set(TonalLetterTags.tt, [new AllomorphTTW(), new AllomorphTTX()])
  .set(TonalLetterTags.kk, [new AllomorphKKW(), new AllomorphKKX()])
  .set(TonalLetterTags.hh, [new AllomorphHHW(), new AllomorphHHX()])
  .set(TonalLetterTags.bb, [new AllomorphBBW(), new AllomorphBBX()])
  .set(TonalLetterTags.gg, [new AllomorphGGW(), new AllomorphGGX()])
  .set(TonalLetterTags.jj, [new AllomorphJJW(), new AllomorphJJX()])
  .set(TonalLetterTags.ll, [new AllomorphLLW(), new AllomorphLLX()])
  .set(TonalLetterTags.ss, [new AllomorphSSW(), new AllomorphSSX()]);

export const freeAllomorphUncombiningRules = new Map<string, Tonal[]>()
  .set(TonalLetterTags.f, [new FreeTonalY()])
  .set(TonalLetterTags.w, [new FreeTonalZ(), new FreeTonalX()])
  .set(TonalLetterTags.xx, [
    new FreeTonalZ(),
    new FreeTonalF(),
    new FreeTonalX(),
  ])
  .set(TonalLetterTags.z, [new FreeTonalX(), new FreeTonalF(), new ZeroTonal()])
  .set(TonalLetterTags.zx, [])
  .set(TonalLetterTags.x, [])
  .set(TonalLetterTags.y, [new FreeTonalW()])
  .set(TonalLetterTags.zero, [new FreeTonalY()]);

export const uncombiningRulesAy = new Map<string, Tonal[]>()
  .set(TonalLetterTags.f, [new FreeTonalY(), new FreeTonalW()])
  .set(TonalLetterTags.x, [
    new ZeroTonal(),
    new FreeTonalX(),
    new FreeTonalZ(),
  ]);
