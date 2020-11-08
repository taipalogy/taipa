import {
  Letters,
  PositionalLetter,
  letterSequence,
  Character,
  MatchedSequence,
} from '../unit';

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
  ss = 'ss',

  h = 'h',

  zero = 'zero',

  er = 'er',
  ir = 'ir',
  or = 'or',
}

export class LettersOfTonal extends Letters {
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

export const lowerLettersTonal = new LettersOfTonal([
  TonalLetterTags.a,
  TonalLetterTags.e,
  TonalLetterTags.i,
  TonalLetterTags.o,
  TonalLetterTags.u,
  TonalLetterTags.ur,
  TonalLetterTags.c,
  TonalLetterTags.ch,
  TonalLetterTags.j,
  TonalLetterTags.s,
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
  TonalLetterTags.ll,
  TonalLetterTags.ss,
  TonalLetterTags.f,
  TonalLetterTags.h,
  TonalLetterTags.er,
  TonalLetterTags.ir,
  TonalLetterTags.or,
  TonalLetterTags.ph,
  TonalLetterTags.th,
  TonalLetterTags.kh,
]);

export enum TonalSpellingTags {
  initialConsonant = 'initialConsonant', // initial consonant
  vowel = 'vowel',
  nasalization = 'nasalization',
  stopFinalConsonant = 'stopFinalConsonant', // stop final consonant
  nasalFinalConsonant = 'nasalFinalConsonant', // nasal final consonant
  checkedTone = 'checkedTone', // checked tone letter
  freeTone = 'freeTone', // free tone letter
}

export class Initial extends PositionalLetter {
  name = TonalSpellingTags.initialConsonant;
}
export class Medial extends PositionalLetter {
  name = TonalSpellingTags.vowel;
}
export class Final extends PositionalLetter {
  name = '';
}
export class Nasalization extends PositionalLetter {
  name = TonalSpellingTags.nasalization;
}
export class Tonal extends PositionalLetter {
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
class InitialS extends Initial {
  characters = this.makeCharacters(TonalLetterTags.s);
}
class InitialPH extends Initial {
  characters = this.makeCharacters(TonalLetterTags.ph);
}
class InitialTH extends Initial {
  characters = this.makeCharacters(TonalLetterTags.th);
}
class InitialKH extends Initial {
  characters = this.makeCharacters(TonalLetterTags.kh);
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

export const nasalizationsTonal = letterSequence([new NasalizationNN()]);

export const nasalFinalConsonantsTonal = letterSequence([
  new FinalM(),
  new FinalN(),
  new FinalNG(),
]);

export const neutralFinalConsonantsTonal = letterSequence([
  new FinalH(),
  new FinalHH(),
]);

export const vowelsTonal = letterSequence([
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

export const materLectionisTonal = letterSequence([
  new MaterLectionisM(),
  new MaterLectionisN(),
  new MaterLectionisNG(),
]);

export const initialConsonantsTonal = letterSequence([
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

export const freeToneLettersTonal = letterSequence([
  new FreeTonalZ(),
  new FreeTonalW(),
  new FreeTonalXX(),
  new FreeTonalF(),
  new FreeTonalZX(),

  new FreeTonalX(),
  new FreeTonalY(),
]);

export const checkedToneLettersTonal = letterSequence([
  new CheckedTonalF(),
  new CheckedTonalY(),
  new CheckedTonalW(),
  new CheckedTonalX(),
]);

export const stopFinalConsonantsTonal = letterSequence([
  new FinalP(),
  new FinalT(),
  new FinalK(),
  new FinalH(),
  new FinalPP(),
  new FinalTT(),
  new FinalKK(),
  new FinalHH(),
]);

export const stopFinalConsonantsBgjklpsTonal = letterSequence([
  new FinalB(),
  new FinalG(),
  new FinalJ(),
  new FinalK(),
  new FinalL(),
  new FinalP(),
  new FinalS(),
]);

export const stopFinalConsonantsBBggkkllppssTonal = letterSequence([
  new FinalBB(),
  new FinalGG(),
  new FinalKK(),
  new FinalLL(),
  new FinalPP(),
  new FinalSS(),
]);

function letterPositions(letters: PositionalLetter[]) {
  return (t: TonalSpellingTags) => {
    for (let i in letters) {
      if (letters[i].name === t) return letters[i];
    }
    return new PositionalLetter();
  };
}

const lpA = letterPositions([new MedialA()]);
const lpB = letterPositions([new InitialB(), new FinalB()]);
const lpBB = letterPositions([new FinalBB()]);
const lpC = letterPositions([new InitialC()]);
const lpCH = letterPositions([new InitialCH()]);
const lpE = letterPositions([new MedialE()]);
const lpER = letterPositions([new MedialER()]);
const lpF = letterPositions([new FreeTonalF(), new CheckedTonalF()]);
const lpG = letterPositions([new InitialG(), new FinalG()]);
const lpGG = letterPositions([new FinalGG()]);
const lpH = letterPositions([new InitialH(), new FinalH()]);
const lpHH = letterPositions([new FinalHH()]);
const lpI = letterPositions([new MedialI()]);
const lpIR = letterPositions([new MedialIR()]);
const lpJ = letterPositions([new InitialJ(), new FinalJ()]);
const lpK = letterPositions([new InitialK(), new FinalK()]);
const lpKH = letterPositions([new InitialKH()]);
const lpKK = letterPositions([new FinalKK()]);
const lpL = letterPositions([new InitialL(), new FinalL()]);
const lpLL = letterPositions([new FinalLL()]);
const lpM = letterPositions([
  new InitialM(),
  new MaterLectionisM(),
  new FinalM(),
]);
const lpN = letterPositions([
  new InitialN(),
  new MaterLectionisN(),
  new FinalN(),
]);
const lpNN = letterPositions([new NasalizationNN()]);
const lpNG = letterPositions([
  new InitialNG(),
  new MaterLectionisNG(),
  new FinalNG(),
]);
const lpO = letterPositions([new MedialO()]);
const lpOR = letterPositions([new MedialOR()]);
const lpP = letterPositions([new InitialP(), new FinalP()]);
const lpPH = letterPositions([new InitialPH()]);
const lpPP = letterPositions([new FinalPP()]);
const lpS = letterPositions([new InitialS(), new FinalS()]);
const lpSS = letterPositions([new FinalSS()]);
const lpT = letterPositions([new InitialT(), new FinalT()]);
const lpTH = letterPositions([new InitialTH()]);
const lpTT = letterPositions([new FinalTT()]);
const lpU = letterPositions([new MedialU()]);
const lpUR = letterPositions([new MedialUR()]);
const lpW = letterPositions([new FreeTonalW(), new CheckedTonalW()]);
const lpX = letterPositions([new FreeTonalX(), new CheckedTonalX()]);
const lpXX = letterPositions([new FreeTonalXX()]);
const lpY = letterPositions([new FreeTonalY(), new CheckedTonalY()]);
const lpZ = letterPositions([new FreeTonalZ()]);
const lpZX = letterPositions([new FreeTonalZX()]);

export const tonalPositionalLetters = new Map<
  string,
  (t: TonalSpellingTags) => PositionalLetter
>()
  .set(TonalLetterTags.a, lpA)
  .set(TonalLetterTags.b, lpB)
  .set(TonalLetterTags.bb, lpBB)
  .set(TonalLetterTags.c, lpC)
  .set(TonalLetterTags.ch, lpCH)
  .set(TonalLetterTags.e, lpE)
  .set(TonalLetterTags.er, lpER)
  .set(TonalLetterTags.f, lpF)
  .set(TonalLetterTags.g, lpG)
  .set(TonalLetterTags.gg, lpGG)
  .set(TonalLetterTags.h, lpH)
  .set(TonalLetterTags.hh, lpHH)
  .set(TonalLetterTags.i, lpI)
  .set(TonalLetterTags.ir, lpIR)
  .set(TonalLetterTags.j, lpJ)
  .set(TonalLetterTags.k, lpK)
  .set(TonalLetterTags.kh, lpKH)
  .set(TonalLetterTags.kk, lpKK)
  .set(TonalLetterTags.l, lpL)
  .set(TonalLetterTags.ll, lpLL)
  .set(TonalLetterTags.m, lpM)
  .set(TonalLetterTags.n, lpN)
  .set(TonalLetterTags.nn, lpNN)
  .set(TonalLetterTags.ng, lpNG)
  .set(TonalLetterTags.o, lpO)
  .set(TonalLetterTags.or, lpOR)
  .set(TonalLetterTags.p, lpP)
  .set(TonalLetterTags.ph, lpPH)
  .set(TonalLetterTags.pp, lpPP)
  .set(TonalLetterTags.s, lpS)
  .set(TonalLetterTags.ss, lpSS)
  .set(TonalLetterTags.t, lpT)
  .set(TonalLetterTags.th, lpTH)
  .set(TonalLetterTags.tt, lpTT)
  .set(TonalLetterTags.u, lpU)
  .set(TonalLetterTags.ur, lpUR)
  .set(TonalLetterTags.w, lpW)
  .set(TonalLetterTags.x, lpX)
  .set(TonalLetterTags.xx, lpXX)
  .set(TonalLetterTags.y, lpY)
  .set(TonalLetterTags.z, lpZ)
  .set(TonalLetterTags.zx, lpZX);

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
  .set(TonalLetterTags.b + TonalLetterTags.f, new AllomorphBF())
  .set(TonalLetterTags.g + TonalLetterTags.f, new AllomorphGF())
  .set(TonalLetterTags.j + TonalLetterTags.f, new AllomorphJF())
  .set(TonalLetterTags.l + TonalLetterTags.f, new AllomorphLF())
  .set(TonalLetterTags.s + TonalLetterTags.f, new AllomorphSF())
  .set(TonalLetterTags.h + TonalLetterTags.y, new AllomorphHY())
  .set(TonalLetterTags.p + TonalLetterTags.w, new AllomorphPW())
  .set(TonalLetterTags.t + TonalLetterTags.w, new AllomorphTW())
  .set(TonalLetterTags.k + TonalLetterTags.w, new AllomorphKW())
  .set(TonalLetterTags.h + TonalLetterTags.w, new AllomorphHW())
  .set(TonalLetterTags.b + TonalLetterTags.w, new AllomorphBW())
  .set(TonalLetterTags.g + TonalLetterTags.w, new AllomorphGW())
  .set(TonalLetterTags.l + TonalLetterTags.w, new AllomorphLW())
  .set(TonalLetterTags.s + TonalLetterTags.w, new AllomorphSW())
  .set(TonalLetterTags.p + TonalLetterTags.x, new AllomorphPX())
  .set(TonalLetterTags.t + TonalLetterTags.x, new AllomorphTX())
  .set(TonalLetterTags.k + TonalLetterTags.x, new AllomorphKX())
  .set(TonalLetterTags.h + TonalLetterTags.x, new AllomorphHX())
  .set(TonalLetterTags.b + TonalLetterTags.x, new AllomorphBX())
  .set(TonalLetterTags.g + TonalLetterTags.x, new AllomorphGX())
  .set(TonalLetterTags.l + TonalLetterTags.x, new AllomorphLX());

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
  .set(TonalLetterTags.p + TonalLetterTags.f, [new AllomorphPF()])
  .set(TonalLetterTags.p + TonalLetterTags.w, [new AllomorphPW()])
  .set(TonalLetterTags.p + TonalLetterTags.x, [new AllomorphPX()])
  .set(TonalLetterTags.t + TonalLetterTags.f, [new AllomorphTF()])
  .set(TonalLetterTags.t + TonalLetterTags.w, [new AllomorphTW()])
  .set(TonalLetterTags.t + TonalLetterTags.x, [new AllomorphTX()])
  .set(TonalLetterTags.k + TonalLetterTags.f, [new AllomorphKF()])
  .set(TonalLetterTags.k + TonalLetterTags.w, [new AllomorphKW()])
  .set(TonalLetterTags.k + TonalLetterTags.x, [new AllomorphKX()])
  .set(TonalLetterTags.h + TonalLetterTags.f, [new AllomorphHF()])
  .set(TonalLetterTags.h + TonalLetterTags.y, [new AllomorphHY()])
  .set(TonalLetterTags.h + TonalLetterTags.w, [new AllomorphHW()])
  .set(TonalLetterTags.h + TonalLetterTags.x, [new AllomorphHX()])
  .set(TonalLetterTags.b + TonalLetterTags.f, [new AllomorphBF()])
  .set(TonalLetterTags.b + TonalLetterTags.w, [new AllomorphBW()])
  .set(TonalLetterTags.b + TonalLetterTags.x, [new AllomorphBX()])
  .set(TonalLetterTags.g + TonalLetterTags.f, [new AllomorphGF()])
  .set(TonalLetterTags.g + TonalLetterTags.w, [new AllomorphGW()])
  .set(TonalLetterTags.g + TonalLetterTags.x, [new AllomorphGX()])
  .set(TonalLetterTags.j + TonalLetterTags.f, [new AllomorphJF()])
  .set(TonalLetterTags.l + TonalLetterTags.f, [new AllomorphLF()])
  .set(TonalLetterTags.l + TonalLetterTags.w, [new AllomorphLW()])
  .set(TonalLetterTags.l + TonalLetterTags.x, [new AllomorphLX()])
  .set(TonalLetterTags.s + TonalLetterTags.f, [new AllomorphSF()])
  .set(TonalLetterTags.s + TonalLetterTags.w, [new AllomorphSW()]);

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
