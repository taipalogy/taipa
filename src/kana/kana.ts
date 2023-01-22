import {
  Sound,
  Letters,
  soundSequence,
  Character,
  MatchedSequence,
} from '../unit';

export enum KanaLetterTags {
  a = 'a',
  e = 'e',
  i = 'i',
  o = 'o',
  u = 'u',

  b = 'b',
  ch = 'ch',
  d = 'd',

  f = 'f',
  g = 'g',
  h = 'h',
  j = 'j',
  k = 'k',

  l = 'l',
  m = 'm',
  r = 'r',
  s = 's',
  v = 'v',

  z = 'z',
  p = 'p',
  t = 't',

  w = 'w',
  y = 'y',

  n = 'n',

  ng = 'ng',
}

export class LettersOfKana extends Letters {
  handleN(
    characters: Character[],
    beginOfLetter: number,
    listLength: number
  ): MatchedSequence {
    let ms = new MatchedSequence();
    if (
      characters.length - beginOfLetter >= 'ng'.length &&
      listLength == lowerLettersKana.size
    ) {
      if (
        characters[beginOfLetter].character === 'n' &&
        characters[beginOfLetter + 1].character === 'g'
      ) {
        // handling final n and initial ng in kana
        if (
          characters[0].character === 'n' &&
          characters[beginOfLetter + 1].character === 'g'
        ) {
          ms.characters[0] = new Character('n');
          ms.characters[1] = new Character('g');
          return ms;
        }
        ms.characters[0] = new Character('n');
        return ms;
      }
    }
    return ms;
  }
}

export const lowerLettersKana = new LettersOfKana([
  KanaLetterTags.a,
  KanaLetterTags.e,
  KanaLetterTags.i,
  KanaLetterTags.o,
  KanaLetterTags.u,
  KanaLetterTags.b,
  KanaLetterTags.ch,
  KanaLetterTags.d,
  KanaLetterTags.f,
  KanaLetterTags.g,
  KanaLetterTags.h,
  KanaLetterTags.j,
  KanaLetterTags.k,
  KanaLetterTags.l,
  KanaLetterTags.m,
  KanaLetterTags.r,
  KanaLetterTags.s,
  KanaLetterTags.v,
  KanaLetterTags.z,
  KanaLetterTags.p,
  KanaLetterTags.t,
  KanaLetterTags.w,
  KanaLetterTags.y,
  KanaLetterTags.n,
  KanaLetterTags.ng,
]);

export enum KanaSpellingTags {
  geminatedConsonant = 'geminatedConsonant', // geminated consonant
  initialConsonant = 'initialConsonant', // initial consonant
  semivowel = 'semivowel',
  vowel = 'vowel',
  finalConsonant = 'finalConsonant', // final consonant
}

class GeminatedConsonant extends Sound {
  name = KanaSpellingTags.geminatedConsonant;
}
class InitialConsonant extends Sound {
  name = KanaSpellingTags.initialConsonant;
}
class Semivowel extends Sound {
  name = KanaSpellingTags.semivowel;
}
class Vowel extends Sound {
  name = KanaSpellingTags.vowel;
}
class FinalConsonant extends Sound {
  name = KanaSpellingTags.finalConsonant;
}

class InitialConsonantB extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.b);
}
class InitialConsonantCH extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.ch);
}
class InitialConsonantD extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.d);
}
class InitialConsonantF extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.f);
}
class InitialConsonantG extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.g);
}
class InitialConsonantH extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.h);
}
class InitialConsonantJ extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.j);
}
class InitialConsonantK extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.k);
}
class InitialConsonantL extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.l);
}
class InitialConsonantM extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.m);
}
class InitialConsonantN extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.n);
}
class InitialConsonantNG extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.ng);
}
class InitialConsonantP extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.p);
}
class InitialConsonantR extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.r);
}
class InitialConsonantS extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.s);
}
class InitialConsonantT extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.t);
}
class InitialConsonantV extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.v);
}
class InitialConsonantW extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.w);
}
class InitialConsonantY extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.y);
}
class InitialConsonantZ extends InitialConsonant {
  characters = this.makeCharacters(KanaLetterTags.z);
}

class SemivowelW extends Semivowel {
  characters = this.makeCharacters(KanaLetterTags.w);
}
class SemivowelY extends Semivowel {
  characters = this.makeCharacters(KanaLetterTags.y);
}

class VowelA extends Vowel {
  characters = this.makeCharacters(KanaLetterTags.a);
}
class VowelE extends Vowel {
  characters = this.makeCharacters(KanaLetterTags.e);
}
class VowelI extends Vowel {
  characters = this.makeCharacters(KanaLetterTags.i);
}
class VowelO extends Vowel {
  characters = this.makeCharacters(KanaLetterTags.o);
}
class VowelU extends Vowel {
  characters = this.makeCharacters(KanaLetterTags.u);
}

class FinalConsonantB extends FinalConsonant {
  characters = this.makeCharacters(KanaLetterTags.b);
}
class FinalConsonantD extends FinalConsonant {
  characters = this.makeCharacters(KanaLetterTags.d);
}
class FinalConsonantG extends FinalConsonant {
  characters = this.makeCharacters(KanaLetterTags.g);
}
class FinalConsonantK extends FinalConsonant {
  characters = this.makeCharacters(KanaLetterTags.k);
}
class FinalConsonantN extends FinalConsonant {
  characters = this.makeCharacters(KanaLetterTags.n);
}
class FinalConsonantP extends FinalConsonant {
  characters = this.makeCharacters(KanaLetterTags.p);
}
class FinalConsonantS extends FinalConsonant {
  characters = this.makeCharacters(KanaLetterTags.s);
}
class FinalConsonantT extends FinalConsonant {
  characters = this.makeCharacters(KanaLetterTags.t);
}

class GeminatedConsonantB extends GeminatedConsonant {
  characters = this.makeCharacters(KanaLetterTags.b);
}
class GeminatedConsonantD extends GeminatedConsonant {
  characters = this.makeCharacters(KanaLetterTags.d);
}
class GeminatedConsonantG extends GeminatedConsonant {
  characters = this.makeCharacters(KanaLetterTags.g);
}
class GeminatedConsonantK extends GeminatedConsonant {
  characters = this.makeCharacters(KanaLetterTags.k);
}
class GeminatedConsonantP extends GeminatedConsonant {
  characters = this.makeCharacters(KanaLetterTags.p);
}
class GeminatedConsonantS extends GeminatedConsonant {
  characters = this.makeCharacters(KanaLetterTags.s);
}
class GeminatedConsonantT extends GeminatedConsonant {
  characters = this.makeCharacters(KanaLetterTags.t);
}

export const initialConsonantsKana = soundSequence([
  new InitialConsonantB(),
  new InitialConsonantCH(),
  new InitialConsonantD(),
  new InitialConsonantF(),
  new InitialConsonantG(),
  new InitialConsonantH(),
  new InitialConsonantJ(),
  new InitialConsonantK(),
  new InitialConsonantL(),
  new InitialConsonantM(),
  new InitialConsonantN(),
  new InitialConsonantNG(),
  new InitialConsonantP(),
  new InitialConsonantR(),
  new InitialConsonantS(),
  new InitialConsonantT(),
  new InitialConsonantV(),
  new InitialConsonantW(),
  new InitialConsonantY(),
  new InitialConsonantZ(),
]);

export const vowelsKana = soundSequence([
  new VowelA(),
  new VowelI(),
  new VowelU(),
  new VowelE(),
  new VowelO(),
]);

export const geminatedConsonantsKana = soundSequence([
  new GeminatedConsonantB(),
  new GeminatedConsonantD(),
  new GeminatedConsonantG(),
  new GeminatedConsonantK(),
  new GeminatedConsonantP(),
  new GeminatedConsonantS(),
  new GeminatedConsonantT(),
]);

export const semivowelsKana = soundSequence([
  new SemivowelW(),
  new SemivowelY(),
]);

export const finalConsonantsKana = soundSequence([
  new FinalConsonantB(),
  new FinalConsonantD(),
  new FinalConsonantG(),
  new FinalConsonantK(),
  new FinalConsonantN(),
  new FinalConsonantP(),
  new FinalConsonantS(),
  new FinalConsonantT(),
]);

export const hatsuonsKana = soundSequence([new FinalConsonantN()]);

function positionalSounds(sounds: Sound[]) {
  return (s: KanaSpellingTags) => {
    for (const i in sounds) {
      if (sounds[i].name === s) return sounds[i];
    }
    return new Sound();
  };
}

const psA = positionalSounds([new VowelA()]);
const psB = positionalSounds([
  new InitialConsonantB(),
  new FinalConsonantB(),
  new GeminatedConsonantB(),
]);
const psCH = positionalSounds([new InitialConsonantCH()]);
const psD = positionalSounds([
  new InitialConsonantD(),
  new FinalConsonantD(),
  new GeminatedConsonantD(),
]);
const psE = positionalSounds([new VowelE()]);
const psF = positionalSounds([new InitialConsonantF()]);
const psG = positionalSounds([
  new InitialConsonantG(),
  new FinalConsonantG(),
  new GeminatedConsonantG(),
]);
const psH = positionalSounds([new InitialConsonantH()]);
const psI = positionalSounds([new VowelI()]);
const psJ = positionalSounds([new InitialConsonantJ()]);
const psK = positionalSounds([
  new InitialConsonantK(),
  new FinalConsonantK(),
  new GeminatedConsonantK(),
]);
const psL = positionalSounds([new InitialConsonantL()]);
const psM = positionalSounds([new InitialConsonantM()]);
const psN = positionalSounds([new InitialConsonantN(), new FinalConsonantN()]);
const psNG = positionalSounds([new InitialConsonantNG()]);
const psO = positionalSounds([new VowelO()]);
const psP = positionalSounds([
  new InitialConsonantP(),
  new FinalConsonantP(),
  new GeminatedConsonantP(),
]);
const psR = positionalSounds([new InitialConsonantR()]);
const psS = positionalSounds([
  new InitialConsonantS(),
  new FinalConsonantS(),
  new GeminatedConsonantS(),
]);
const psT = positionalSounds([
  new InitialConsonantT(),
  new FinalConsonantT(),
  new GeminatedConsonantT(),
]);
const psU = positionalSounds([new VowelU()]);
const psV = positionalSounds([new InitialConsonantV()]);
const psW = positionalSounds([new InitialConsonantW(), new SemivowelW()]);
const psY = positionalSounds([new InitialConsonantY(), new SemivowelY()]);
const psZ = positionalSounds([new InitialConsonantZ()]);

export const kanaPositionalSounds = new Map<
  string,
  (s: KanaSpellingTags) => Sound
>()
  .set(KanaLetterTags.a, psA)
  .set(KanaLetterTags.b, psB)
  .set(KanaLetterTags.ch, psCH)
  .set(KanaLetterTags.d, psD)
  .set(KanaLetterTags.e, psE)
  .set(KanaLetterTags.f, psF)
  .set(KanaLetterTags.g, psG)
  .set(KanaLetterTags.h, psH)
  .set(KanaLetterTags.i, psI)
  .set(KanaLetterTags.j, psJ)
  .set(KanaLetterTags.k, psK)
  .set(KanaLetterTags.l, psL)
  .set(KanaLetterTags.m, psM)
  .set(KanaLetterTags.n, psN)
  .set(KanaLetterTags.ng, psNG)
  .set(KanaLetterTags.o, psO)
  .set(KanaLetterTags.p, psP)
  .set(KanaLetterTags.r, psR)
  .set(KanaLetterTags.s, psS)
  .set(KanaLetterTags.t, psT)
  .set(KanaLetterTags.u, psU)
  .set(KanaLetterTags.v, psV)
  .set(KanaLetterTags.w, psW)
  .set(KanaLetterTags.y, psY)
  .set(KanaLetterTags.z, psZ);

export const kogakimoji = new Map<
  string,
  Array<string>
>().set(KanaLetterTags.ch + KanaLetterTags.u, ['っ', 'ッ']);

export const hatsuon = new Map<string, Array<string>>().set(KanaLetterTags.n, [
  'ん',
  'ン',
]);

export const otherKanas = new Map<string, Array<string>>()
  .set(KanaLetterTags.a, ['ぁ', 'ァ'])
  .set(KanaLetterTags.i, ['ぃ', 'ィ'])
  .set(KanaLetterTags.u, ['ぅ', 'ゥ'])
  .set(KanaLetterTags.e, ['ぇ', 'ェ'])
  .set(KanaLetterTags.o, ['ぉ', 'ォ'])
  .set(KanaLetterTags.h + KanaLetterTags.a, ['', 'ㇵ'])
  .set(KanaLetterTags.h + KanaLetterTags.i, ['', 'ㇶ'])
  .set(KanaLetterTags.f + KanaLetterTags.u, ['', 'ㇷ'])
  .set(KanaLetterTags.h + KanaLetterTags.e, ['', 'ㇸ'])
  .set(KanaLetterTags.h + KanaLetterTags.o, ['', 'ㇹ'])
  .set(KanaLetterTags.k + KanaLetterTags.a, ['ゕ', 'ヵ'])
  .set(KanaLetterTags.k + KanaLetterTags.e, ['ゖ', 'ヶ'])
  .set(KanaLetterTags.k + KanaLetterTags.u, ['', 'ㇰ'])
  .set(KanaLetterTags.r + KanaLetterTags.a, ['', 'ㇻ'])
  .set(KanaLetterTags.r + KanaLetterTags.i, ['', 'ㇼ'])
  .set(KanaLetterTags.r + KanaLetterTags.u, ['', 'ㇽ'])
  .set(KanaLetterTags.r + KanaLetterTags.e, ['', 'ㇾ'])
  .set(KanaLetterTags.r + KanaLetterTags.o, ['', 'ㇿ'])
  .set(KanaLetterTags.m + KanaLetterTags.u, ['', 'ㇺ'])
  .set(KanaLetterTags.n + KanaLetterTags.u, ['', 'ㇴ'])
  .set(KanaLetterTags.p + KanaLetterTags.u, ['', 'ㇷ゚'])
  .set(KanaLetterTags.s + KanaLetterTags.i, ['', 'ㇱ'])
  .set(KanaLetterTags.s + KanaLetterTags.u, ['', 'ㇲ'])
  .set(KanaLetterTags.t + KanaLetterTags.o, ['', 'ㇳ'])
  .set(KanaLetterTags.y + KanaLetterTags.a, ['ゃ', 'ャ'])
  .set(KanaLetterTags.y + KanaLetterTags.u, ['ゅ', 'ュ'])
  .set(KanaLetterTags.y + KanaLetterTags.o, ['ょ', 'ョ'])
  .set(KanaLetterTags.w + KanaLetterTags.a, ['ゎ', 'ヮ'])
  .set(KanaLetterTags.w + KanaLetterTags.o, ['', '\u{1b166}'])
  .set(KanaLetterTags.b + KanaLetterTags.u, ['', 'ㇷ゙']) // 'ㇷ'+ '\u{3099}'
  .set(KanaLetterTags.g + KanaLetterTags.u, ['', 'ㇰ゙']) // 'ㇰ'+ '\u{3099}'
  .set(KanaLetterTags.j + KanaLetterTags.u, ['', 'ㇲ゙']) // 'ㇲ'+ '\u{3099}'
  .set(KanaLetterTags.n, ['', '\u{1B167}'])
  .set(KanaLetterTags.j + KanaLetterTags.i, ['ぢ', 'ヂ']) // moved from hiraganaKatakana
  .set(KanaLetterTags.z + KanaLetterTags.u, ['づ', 'ヅ']); // moved from hiraganaKatakana

export const hiraganaKatakana = new Map<string, Array<string>>()
  .set(KanaLetterTags.a, ['あ', 'ア'])
  .set(KanaLetterTags.i, ['い', 'イ'])
  .set(KanaLetterTags.u, ['う', 'ウ'])
  .set(KanaLetterTags.e, ['え', 'エ'])
  .set(KanaLetterTags.o, ['お', 'オ'])
  .set(KanaLetterTags.k + KanaLetterTags.a, ['か', 'カ'])
  .set(KanaLetterTags.k + KanaLetterTags.i, ['き', 'キ'])
  .set(KanaLetterTags.k + KanaLetterTags.u, ['く', 'ク'])
  .set(KanaLetterTags.k + KanaLetterTags.e, ['け', 'ケ'])
  .set(KanaLetterTags.k + KanaLetterTags.o, ['こ', 'コ'])
  .set(KanaLetterTags.s + KanaLetterTags.a, ['さ', 'サ'])
  .set(KanaLetterTags.s + KanaLetterTags.i, ['し', 'シ'])
  .set(KanaLetterTags.s + KanaLetterTags.u, ['す', 'ス'])
  .set(KanaLetterTags.s + KanaLetterTags.e, ['せ', 'セ'])
  .set(KanaLetterTags.s + KanaLetterTags.o, ['そ', 'ソ'])
  .set(KanaLetterTags.t + KanaLetterTags.a, ['た', 'タ'])
  .set(KanaLetterTags.ch + KanaLetterTags.i, ['ち', 'チ'])
  .set(KanaLetterTags.ch + KanaLetterTags.u, ['つ', 'ツ'])
  .set(KanaLetterTags.t + KanaLetterTags.e, ['て', 'テ'])
  .set(KanaLetterTags.t + KanaLetterTags.o, ['と', 'ト'])
  .set(KanaLetterTags.n + KanaLetterTags.a, ['な', 'ナ'])
  .set(KanaLetterTags.n + KanaLetterTags.i, ['に', 'ニ'])
  .set(KanaLetterTags.n + KanaLetterTags.u, ['ぬ', 'ヌ'])
  .set(KanaLetterTags.n + KanaLetterTags.e, ['ね', 'ネ'])
  .set(KanaLetterTags.n + KanaLetterTags.o, ['の', 'ノ'])
  .set(KanaLetterTags.h + KanaLetterTags.a, ['は', 'ハ'])
  .set(KanaLetterTags.h + KanaLetterTags.i, ['ひ', 'ヒ'])
  .set(KanaLetterTags.f + KanaLetterTags.u, ['ふ', 'フ'])
  .set(KanaLetterTags.h + KanaLetterTags.e, ['へ', 'ヘ'])
  .set(KanaLetterTags.h + KanaLetterTags.o, ['ほ', 'ホ'])
  .set(KanaLetterTags.m + KanaLetterTags.a, ['ま', 'マ'])
  .set(KanaLetterTags.m + KanaLetterTags.i, ['み', 'ミ'])
  .set(KanaLetterTags.m + KanaLetterTags.u, ['む', 'ム'])
  .set(KanaLetterTags.m + KanaLetterTags.e, ['め', 'メ'])
  .set(KanaLetterTags.m + KanaLetterTags.o, ['も', 'モ'])
  .set(KanaLetterTags.y + KanaLetterTags.a, ['や', 'ヤ'])
  .set(KanaLetterTags.y + KanaLetterTags.u, ['ゆ', 'ユ'])
  .set(KanaLetterTags.y + KanaLetterTags.o, ['よ', 'ヨ'])
  .set(KanaLetterTags.r + KanaLetterTags.a, ['ら', 'ラ'])
  .set(KanaLetterTags.r + KanaLetterTags.i, ['り', 'リ'])
  .set(KanaLetterTags.r + KanaLetterTags.u, ['る', 'ル'])
  .set(KanaLetterTags.r + KanaLetterTags.e, ['れ', 'レ'])
  .set(KanaLetterTags.r + KanaLetterTags.o, ['ろ', 'ロ'])
  .set(KanaLetterTags.w + KanaLetterTags.a, ['わ', 'ワ'])
  .set(KanaLetterTags.w + KanaLetterTags.i, ['ゐ', 'ヰ'])
  .set(KanaLetterTags.w + KanaLetterTags.e, ['ゑ', 'ヱ'])
  .set(KanaLetterTags.w + KanaLetterTags.o, ['を', 'ヲ'])
  .set(KanaLetterTags.g + KanaLetterTags.a, ['が', 'ガ'])
  .set(KanaLetterTags.g + KanaLetterTags.i, ['ぎ', 'ギ'])
  .set(KanaLetterTags.g + KanaLetterTags.u, ['ぐ', 'グ'])
  .set(KanaLetterTags.g + KanaLetterTags.e, ['げ', 'ゲ'])
  .set(KanaLetterTags.g + KanaLetterTags.o, ['ご', 'ゴ'])
  .set(KanaLetterTags.z + KanaLetterTags.a, ['ざ', 'ザ'])
  .set(KanaLetterTags.j + KanaLetterTags.i, ['じ', 'ジ'])
  .set(KanaLetterTags.z + KanaLetterTags.u, ['ず', 'ズ'])
  .set(KanaLetterTags.z + KanaLetterTags.e, ['ぜ', 'ゼ'])
  .set(KanaLetterTags.z + KanaLetterTags.o, ['ぞ', 'ゾ'])
  .set(KanaLetterTags.d + KanaLetterTags.a, ['だ', 'ダ'])
  .set(KanaLetterTags.d + KanaLetterTags.e, ['で', 'デ'])
  .set(KanaLetterTags.d + KanaLetterTags.o, ['ど', 'ド'])
  .set(KanaLetterTags.b + KanaLetterTags.a, ['ば', 'バ'])
  .set(KanaLetterTags.b + KanaLetterTags.i, ['び', 'ビ'])
  .set(KanaLetterTags.b + KanaLetterTags.u, ['ぶ', 'ブ'])
  .set(KanaLetterTags.b + KanaLetterTags.e, ['べ', 'ベ'])
  .set(KanaLetterTags.b + KanaLetterTags.o, ['ぼ', 'ボ'])
  .set(KanaLetterTags.p + KanaLetterTags.a, ['ぱ', 'パ'])
  .set(KanaLetterTags.p + KanaLetterTags.i, ['ぴ', 'ピ'])
  .set(KanaLetterTags.p + KanaLetterTags.u, ['ぷ', 'プ'])
  .set(KanaLetterTags.p + KanaLetterTags.e, ['ぺ', 'ペ']) // U+307A. U+30DA.
  .set(KanaLetterTags.p + KanaLetterTags.o, ['ぽ', 'ポ'])
  .set(KanaLetterTags.k + KanaLetterTags.y + KanaLetterTags.a, ['きゃ', 'キャ'])
  .set(KanaLetterTags.k + KanaLetterTags.y + KanaLetterTags.u, ['きゅ', 'キュ'])
  .set(KanaLetterTags.k + KanaLetterTags.y + KanaLetterTags.o, ['きょ', 'キョ'])
  .set(KanaLetterTags.s + KanaLetterTags.y + KanaLetterTags.a, ['しゃ', 'シャ'])
  .set(KanaLetterTags.s + KanaLetterTags.y + KanaLetterTags.u, ['しゅ', 'シュ'])
  .set(KanaLetterTags.s + KanaLetterTags.y + KanaLetterTags.o, ['しょ', 'ショ'])
  .set(KanaLetterTags.ch + KanaLetterTags.y + KanaLetterTags.a, ['ちゃ', 'チャ'])
  .set(KanaLetterTags.ch + KanaLetterTags.y + KanaLetterTags.u, ['ちゅ', 'チュ'])
  .set(KanaLetterTags.ch + KanaLetterTags.y + KanaLetterTags.o, ['ちょ', 'チョ'])
  .set(KanaLetterTags.n + KanaLetterTags.y + KanaLetterTags.a, ['にゃ', 'ニャ'])
  .set(KanaLetterTags.n + KanaLetterTags.y + KanaLetterTags.u, ['にゅ', 'ニュ'])
  .set(KanaLetterTags.n + KanaLetterTags.y + KanaLetterTags.o, ['にょ', 'ニョ'])
  .set(KanaLetterTags.h + KanaLetterTags.y + KanaLetterTags.a, ['ひゃ', 'ヒャ'])
  .set(KanaLetterTags.h + KanaLetterTags.y + KanaLetterTags.u, ['ひゅ', 'ヒュ'])
  .set(KanaLetterTags.h + KanaLetterTags.y + KanaLetterTags.o, ['ひょ', 'ヒョ'])
  .set(KanaLetterTags.m + KanaLetterTags.y + KanaLetterTags.a, ['みゃ', 'ミャ'])
  .set(KanaLetterTags.m + KanaLetterTags.y + KanaLetterTags.u, ['みゅ', 'みょ'])
  .set(KanaLetterTags.m + KanaLetterTags.y + KanaLetterTags.o, ['ミュ', 'ミョ'])
  .set(KanaLetterTags.r + KanaLetterTags.y + KanaLetterTags.a, ['りゃ', 'リャ'])
  .set(KanaLetterTags.r + KanaLetterTags.y + KanaLetterTags.u, ['りゅ', 'リュ'])
  .set(KanaLetterTags.r + KanaLetterTags.y + KanaLetterTags.o, ['りょ', 'リョ'])
  .set(KanaLetterTags.g + KanaLetterTags.y + KanaLetterTags.a, ['ぎゃ', 'ギャ'])
  .set(KanaLetterTags.g + KanaLetterTags.y + KanaLetterTags.u, ['ぎゅ', 'ギュ'])
  .set(KanaLetterTags.g + KanaLetterTags.y + KanaLetterTags.o, ['ぎょ', 'ギョ'])
  .set(KanaLetterTags.j + KanaLetterTags.a, ['じゃ', 'ジャ'])
  .set(KanaLetterTags.j + KanaLetterTags.u, ['じゅ', 'ジュ'])
  .set(KanaLetterTags.j + KanaLetterTags.o, ['じょ', 'ジョ'])
  .set(KanaLetterTags.j + KanaLetterTags.y + KanaLetterTags.a, ['ぢゃ', 'ヂャ'])
  .set(KanaLetterTags.j + KanaLetterTags.y + KanaLetterTags.u, [
    'ぢ゙ゅ',
    'ヂュ',
  ])
  .set(KanaLetterTags.j + KanaLetterTags.y + KanaLetterTags.o, [
    'ぢ゙ょ',
    'ヂョ',
  ])
  .set(KanaLetterTags.b + KanaLetterTags.y + KanaLetterTags.a, ['びゃ', 'ビャ'])
  .set(KanaLetterTags.b + KanaLetterTags.y + KanaLetterTags.u, ['びゅ', 'ビュ'])
  .set(KanaLetterTags.b + KanaLetterTags.y + KanaLetterTags.o, ['びょ', 'ビョ'])
  .set(KanaLetterTags.p + KanaLetterTags.y + KanaLetterTags.a, ['ぴゃ', 'ピャ'])
  .set(KanaLetterTags.p + KanaLetterTags.y + KanaLetterTags.u, ['ぴゅ', 'ピュ'])
  .set(KanaLetterTags.p + KanaLetterTags.y + KanaLetterTags.o, [
    'ぴょ',
    'ピョ',
  ]);

export const gailaigo = new Map<string, Array<string>>()
  .set(KanaLetterTags.s + KanaLetterTags.i, ['', 'スィ'])
  .set(KanaLetterTags.s + KanaLetterTags.y + KanaLetterTags.e, ['', 'シェ'])
  .set(KanaLetterTags.z + KanaLetterTags.i, ['', 'ズィ'])
  .set(KanaLetterTags.j + KanaLetterTags.e, ['', 'ジェ'])
  .set(KanaLetterTags.j + KanaLetterTags.w + KanaLetterTags.a, ['', 'ジュァ'])
  .set(KanaLetterTags.j + KanaLetterTags.w + KanaLetterTags.i, ['', 'ジュィ'])
  .set(KanaLetterTags.j + KanaLetterTags.w + KanaLetterTags.e, ['', 'ジュェ'])
  .set(KanaLetterTags.j + KanaLetterTags.w + KanaLetterTags.o, ['', 'ジュォ'])
  .set(KanaLetterTags.t + KanaLetterTags.i, ['', 'ティ'])
  .set(KanaLetterTags.t + KanaLetterTags.u, ['', 'トゥ'])
  .set(KanaLetterTags.ch + KanaLetterTags.y + KanaLetterTags.e, ['', 'チェ'])
  .set(KanaLetterTags.j + KanaLetterTags.y + KanaLetterTags.e, ['', 'ヂェ'])
  .set(KanaLetterTags.ch + KanaLetterTags.w + KanaLetterTags.a, ['', 'チュァ'])
  .set(KanaLetterTags.ch + KanaLetterTags.w + KanaLetterTags.i, ['', 'チュィ'])
  .set(KanaLetterTags.ch + KanaLetterTags.w + KanaLetterTags.e, ['', 'チュェ'])
  .set(KanaLetterTags.ch + KanaLetterTags.w + KanaLetterTags.o, ['', 'チュォ'])
  .set(KanaLetterTags.ch + KanaLetterTags.a, ['', 'ツァ'])
  .set(KanaLetterTags.ch + KanaLetterTags.i, ['', 'ツィ'])
  .set(KanaLetterTags.ch + KanaLetterTags.e, ['', 'ツェ'])
  .set(KanaLetterTags.ch + KanaLetterTags.o, ['', 'ツォ'])
  .set(KanaLetterTags.d + KanaLetterTags.i, ['', 'ディ'])
  .set(KanaLetterTags.d + KanaLetterTags.u, ['', 'ドゥ'])
  .set(KanaLetterTags.f + KanaLetterTags.a, ['', 'ファ'])
  .set(KanaLetterTags.f + KanaLetterTags.i, ['', 'フィ'])
  .set(KanaLetterTags.f + KanaLetterTags.e, ['', 'フェ'])
  .set(KanaLetterTags.f + KanaLetterTags.o, ['', 'フォ'])
  .set(KanaLetterTags.y + KanaLetterTags.i, ['', 'イィ'])
  .set(KanaLetterTags.y + KanaLetterTags.e, ['', 'イェ'])
  .set(KanaLetterTags.w + KanaLetterTags.a, ['', 'ウァ'])
  .set(KanaLetterTags.w + KanaLetterTags.i, ['', 'ウィ'])
  .set(KanaLetterTags.w + KanaLetterTags.e, ['', 'ウェ'])
  .set(KanaLetterTags.w + KanaLetterTags.o, ['', 'ウォ'])
  .set(KanaLetterTags.v + KanaLetterTags.a, ['', 'ヴァ'])
  .set(KanaLetterTags.v + KanaLetterTags.i, ['', 'ヴィ'])
  .set(KanaLetterTags.v + KanaLetterTags.u, ['', 'ヴ'])
  .set(KanaLetterTags.v + KanaLetterTags.e, ['', 'ヴェ'])
  .set(KanaLetterTags.v + KanaLetterTags.o, ['', 'ヴォ']);

export const gailaigoY = new Map<string, Array<string>>()
  .set(KanaLetterTags.k + KanaLetterTags.y + KanaLetterTags.i, ['', 'キィ'])
  .set(KanaLetterTags.k + KanaLetterTags.y + KanaLetterTags.e, ['', 'キェ'])
  .set(KanaLetterTags.g + KanaLetterTags.y + KanaLetterTags.i, ['', 'ギィ'])
  .set(KanaLetterTags.g + KanaLetterTags.y + KanaLetterTags.e, ['', 'ギェ'])
  .set(KanaLetterTags.s + KanaLetterTags.y + KanaLetterTags.a, ['', 'スャ'])
  .set(KanaLetterTags.s + KanaLetterTags.y + KanaLetterTags.u, ['', 'スュ'])
  .set(KanaLetterTags.s + KanaLetterTags.y + KanaLetterTags.e, ['', 'スィェ'])
  .set(KanaLetterTags.s + KanaLetterTags.y + KanaLetterTags.o, ['', 'スョ'])
  .set(KanaLetterTags.z + KanaLetterTags.y + KanaLetterTags.a, ['', 'ズャ'])
  .set(KanaLetterTags.z + KanaLetterTags.y + KanaLetterTags.u, ['', 'ズュ'])
  .set(KanaLetterTags.z + KanaLetterTags.y + KanaLetterTags.e, ['', 'ズィェ'])
  .set(KanaLetterTags.z + KanaLetterTags.y + KanaLetterTags.o, ['', 'ズョ'])
  .set(KanaLetterTags.t + KanaLetterTags.y + KanaLetterTags.a, ['', 'テャ'])
  .set(KanaLetterTags.t + KanaLetterTags.y + KanaLetterTags.u, ['', 'テュ'])
  .set(KanaLetterTags.t + KanaLetterTags.y + KanaLetterTags.e, ['', 'ティェ'])
  .set(KanaLetterTags.t + KanaLetterTags.y + KanaLetterTags.o, ['', 'テョ'])
  .set(KanaLetterTags.d + KanaLetterTags.y + KanaLetterTags.a, ['', 'デャ'])
  .set(KanaLetterTags.d + KanaLetterTags.y + KanaLetterTags.u, ['', 'デュ'])
  .set(KanaLetterTags.d + KanaLetterTags.y + KanaLetterTags.e, [
    '',
    'デェ',
    'ディェ',
  ])
  .set(KanaLetterTags.d + KanaLetterTags.y + KanaLetterTags.o, ['', 'デョ'])
  .set(KanaLetterTags.n + KanaLetterTags.y + KanaLetterTags.i, ['', 'ニィ'])
  .set(KanaLetterTags.n + KanaLetterTags.y + KanaLetterTags.e, ['', 'ニェ'])
  .set(KanaLetterTags.h + KanaLetterTags.y + KanaLetterTags.i, ['', 'ヒィ'])
  .set(KanaLetterTags.h + KanaLetterTags.y + KanaLetterTags.e, ['', 'ヒェ'])
  .set(KanaLetterTags.f + KanaLetterTags.y + KanaLetterTags.a, ['', 'フャ'])
  .set(KanaLetterTags.f + KanaLetterTags.y + KanaLetterTags.u, ['', 'フュ'])
  .set(KanaLetterTags.f + KanaLetterTags.y + KanaLetterTags.e, ['', 'フィェ'])
  .set(KanaLetterTags.f + KanaLetterTags.y + KanaLetterTags.o, ['', 'フョ'])
  .set(KanaLetterTags.b + KanaLetterTags.y + KanaLetterTags.e, ['', 'ビェ'])
  .set(KanaLetterTags.p + KanaLetterTags.y + KanaLetterTags.e, ['', 'ピェ'])
  .set(KanaLetterTags.m + KanaLetterTags.y + KanaLetterTags.i, ['', 'ミィ'])
  .set(KanaLetterTags.m + KanaLetterTags.y + KanaLetterTags.e, ['', 'ミェ'])
  .set(KanaLetterTags.r + KanaLetterTags.y + KanaLetterTags.i, ['', 'リィ'])
  .set(KanaLetterTags.r + KanaLetterTags.y + KanaLetterTags.e, ['', 'リェ'])
  .set(KanaLetterTags.w + KanaLetterTags.y + KanaLetterTags.a, ['', 'ウャ'])
  .set(KanaLetterTags.w + KanaLetterTags.y + KanaLetterTags.u, ['', 'ウュ'])
  .set(KanaLetterTags.w + KanaLetterTags.y + KanaLetterTags.o, ['', 'ウョ'])
  .set(KanaLetterTags.v + KanaLetterTags.y + KanaLetterTags.a, ['', 'ヴャ'])
  .set(KanaLetterTags.v + KanaLetterTags.y + KanaLetterTags.u, ['', 'ヴュ'])
  .set(KanaLetterTags.v + KanaLetterTags.y + KanaLetterTags.e, ['', 'ヴィェ'])
  .set(KanaLetterTags.v + KanaLetterTags.y + KanaLetterTags.o, ['', 'ヴョ']);

export const gailaigoW = new Map<string, Array<string>>()
  .set(KanaLetterTags.k + KanaLetterTags.w + KanaLetterTags.a, ['', 'クァ'])
  .set(KanaLetterTags.k + KanaLetterTags.w + KanaLetterTags.i, ['', 'クィ'])
  .set(KanaLetterTags.k + KanaLetterTags.w + KanaLetterTags.u, ['', 'クゥ'])
  .set(KanaLetterTags.k + KanaLetterTags.w + KanaLetterTags.e, ['', 'クェ'])
  .set(KanaLetterTags.k + KanaLetterTags.w + KanaLetterTags.o, ['', 'クォ'])
  .set(KanaLetterTags.g + KanaLetterTags.w + KanaLetterTags.a, ['', 'グァ'])
  .set(KanaLetterTags.g + KanaLetterTags.w + KanaLetterTags.i, ['', 'グィ'])
  .set(KanaLetterTags.g + KanaLetterTags.w + KanaLetterTags.u, ['', 'グゥ'])
  .set(KanaLetterTags.g + KanaLetterTags.w + KanaLetterTags.e, ['', 'グェ'])
  .set(KanaLetterTags.g + KanaLetterTags.w + KanaLetterTags.o, ['', 'グォ'])
  .set(KanaLetterTags.s + KanaLetterTags.w + KanaLetterTags.a, ['', 'スァ'])
  .set(KanaLetterTags.s + KanaLetterTags.w + KanaLetterTags.i, ['', 'スゥィ'])
  .set(KanaLetterTags.s + KanaLetterTags.w + KanaLetterTags.e, ['', 'スェ'])
  .set(KanaLetterTags.s + KanaLetterTags.w + KanaLetterTags.o, ['', 'スォ'])
  .set(KanaLetterTags.z + KanaLetterTags.w + KanaLetterTags.e, ['', 'ズェ'])
  .set(KanaLetterTags.t + KanaLetterTags.w + KanaLetterTags.a, ['', 'トァ'])
  .set(KanaLetterTags.t + KanaLetterTags.w + KanaLetterTags.i, ['', 'トィ'])
  .set(KanaLetterTags.t + KanaLetterTags.w + KanaLetterTags.e, ['', 'トェ'])
  .set(KanaLetterTags.t + KanaLetterTags.w + KanaLetterTags.o, ['', 'トォ'])
  .set(KanaLetterTags.d + KanaLetterTags.w + KanaLetterTags.a, ['', 'ドァ'])
  .set(KanaLetterTags.d + KanaLetterTags.w + KanaLetterTags.i, ['', 'ドィ'])
  .set(KanaLetterTags.d + KanaLetterTags.w + KanaLetterTags.e, ['', 'ドェ'])
  .set(KanaLetterTags.d + KanaLetterTags.w + KanaLetterTags.o, ['', 'ドォ'])
  .set(KanaLetterTags.n + KanaLetterTags.w + KanaLetterTags.a, ['', 'ヌァ'])
  .set(KanaLetterTags.n + KanaLetterTags.w + KanaLetterTags.i, ['', 'ヌィ'])
  .set(KanaLetterTags.n + KanaLetterTags.w + KanaLetterTags.e, ['', 'ヌェ'])
  .set(KanaLetterTags.n + KanaLetterTags.w + KanaLetterTags.o, ['', 'ヌォ'])
  .set(KanaLetterTags.b + KanaLetterTags.w + KanaLetterTags.a, ['', 'ブァ'])
  .set(KanaLetterTags.b + KanaLetterTags.w + KanaLetterTags.i, ['', 'ブィ'])
  .set(KanaLetterTags.b + KanaLetterTags.w + KanaLetterTags.e, ['', 'ブェ'])
  .set(KanaLetterTags.b + KanaLetterTags.w + KanaLetterTags.o, ['', 'ブォ'])
  .set(KanaLetterTags.p + KanaLetterTags.w + KanaLetterTags.a, ['', 'プァ'])
  .set(KanaLetterTags.p + KanaLetterTags.w + KanaLetterTags.i, ['', 'プィ'])
  .set(KanaLetterTags.p + KanaLetterTags.w + KanaLetterTags.e, ['', 'プェ'])
  .set(KanaLetterTags.p + KanaLetterTags.w + KanaLetterTags.o, ['', 'プォ'])
  .set(KanaLetterTags.m + KanaLetterTags.w + KanaLetterTags.a, ['', 'ムァ'])
  .set(KanaLetterTags.m + KanaLetterTags.w + KanaLetterTags.i, ['', 'ムィ'])
  .set(KanaLetterTags.m + KanaLetterTags.w + KanaLetterTags.e, ['', 'ムェ'])
  .set(KanaLetterTags.m + KanaLetterTags.w + KanaLetterTags.o, ['', 'ムォ'])
  .set(KanaLetterTags.r + KanaLetterTags.w + KanaLetterTags.a, ['', 'ルァ'])
  .set(KanaLetterTags.r + KanaLetterTags.w + KanaLetterTags.i, ['', 'ルィ'])
  .set(KanaLetterTags.r + KanaLetterTags.w + KanaLetterTags.e, ['', 'ルェ'])
  .set(KanaLetterTags.r + KanaLetterTags.w + KanaLetterTags.o, ['', 'ルォ']);

export const special = new Map<string, Array<string>>()
  .set(KanaLetterTags.ng + KanaLetterTags.a, ['', 'カ゚'])
  .set(KanaLetterTags.ng + KanaLetterTags.i, ['', 'キ゚'])
  .set(KanaLetterTags.ng + KanaLetterTags.u, ['', 'ク゚'])
  .set(KanaLetterTags.ng + KanaLetterTags.e, ['', 'ケ゚'])
  .set(KanaLetterTags.ng + KanaLetterTags.o, ['', 'コ゚'])
  .set(KanaLetterTags.s + KanaLetterTags.i, ['', 'セィ'])
  .set(KanaLetterTags.z + KanaLetterTags.i, ['', 'ゼィ'])
  .set(KanaLetterTags.s + KanaLetterTags.y + KanaLetterTags.i, ['', 'シィ'])
  .set(KanaLetterTags.j + KanaLetterTags.i, ['', 'ジィ'])
  .set(KanaLetterTags.ch + KanaLetterTags.y + KanaLetterTags.i, ['', 'チィ'])
  .set(KanaLetterTags.ch + KanaLetterTags.u, ['', 'ツゥ'])
  .set(KanaLetterTags.j + KanaLetterTags.y + KanaLetterTags.i, ['', 'ヂィ'])
  .set(KanaLetterTags.h + KanaLetterTags.u, ['', 'ホゥ'])
  .set(KanaLetterTags.f + KanaLetterTags.u, ['', 'フゥ'])
  .set(KanaLetterTags.y + KanaLetterTags.e, ['', 'ユェ'])
  .set(KanaLetterTags.l + KanaLetterTags.a, ['', 'ラ゚'])
  .set(KanaLetterTags.l + KanaLetterTags.i, ['', 'リ゚'])
  .set(KanaLetterTags.l + KanaLetterTags.u, ['', 'ル゚'])
  .set(KanaLetterTags.l + KanaLetterTags.e, ['', 'レ゚'])
  .set(KanaLetterTags.l + KanaLetterTags.o, ['', 'ロ゚'])
  .set(KanaLetterTags.w + KanaLetterTags.u, ['', 'ウゥ'])
  .set(KanaLetterTags.v + KanaLetterTags.a, ['', 'ヷ'])
  .set(KanaLetterTags.v + KanaLetterTags.i, ['', 'ヸ'])
  .set(KanaLetterTags.v + KanaLetterTags.e, ['', 'ヹ'])
  .set(KanaLetterTags.v + KanaLetterTags.o, ['', 'ヺ']);

export const specialY = new Map<string, Array<string>>()
  .set(KanaLetterTags.ng + KanaLetterTags.y + KanaLetterTags.a, ['', 'キ゚ャ'])
  .set(KanaLetterTags.ng + KanaLetterTags.y + KanaLetterTags.u, ['', 'キ゚ュ'])
  .set(KanaLetterTags.ng + KanaLetterTags.y + KanaLetterTags.o, ['', 'キ゚ョ'])
  .set(KanaLetterTags.t + KanaLetterTags.y + KanaLetterTags.e, ['', 'テェ'])
  .set(KanaLetterTags.ch + KanaLetterTags.y + KanaLetterTags.a, ['', 'ツャ'])
  .set(KanaLetterTags.ch + KanaLetterTags.y + KanaLetterTags.u, ['', 'ツュ'])
  .set(KanaLetterTags.ch + KanaLetterTags.y + KanaLetterTags.o, ['', 'ツョ'])
  .set(KanaLetterTags.b + KanaLetterTags.y + KanaLetterTags.i, ['', 'ビィ'])
  .set(KanaLetterTags.p + KanaLetterTags.y + KanaLetterTags.i, ['', 'ピィ'])
  .set(KanaLetterTags.l + KanaLetterTags.y + KanaLetterTags.a, ['', 'リ゚ャ'])
  .set(KanaLetterTags.l + KanaLetterTags.y + KanaLetterTags.u, ['', 'リ゚ュ'])
  .set(KanaLetterTags.l + KanaLetterTags.y + KanaLetterTags.o, ['', 'リ゚ョ'])
  .set(KanaLetterTags.w + KanaLetterTags.y + KanaLetterTags.a, ['', 'ヰャ'])
  .set(KanaLetterTags.w + KanaLetterTags.y + KanaLetterTags.u, ['', 'ヰュ'])
  .set(KanaLetterTags.w + KanaLetterTags.y + KanaLetterTags.o, ['', 'ヰョ']);

export const specialW = new Map<string, Array<string>>()
  .set(KanaLetterTags.k + KanaLetterTags.w + KanaLetterTags.a, ['', 'クヮ'])
  .set(KanaLetterTags.g + KanaLetterTags.w + KanaLetterTags.a, ['', 'グヮ'])
  .set(KanaLetterTags.s + KanaLetterTags.w + KanaLetterTags.u, ['', 'スゥ'])
  .set(KanaLetterTags.z + KanaLetterTags.w + KanaLetterTags.a, ['', 'ズァ'])
  .set(KanaLetterTags.z + KanaLetterTags.w + KanaLetterTags.i, ['', 'ズゥィ'])
  .set(KanaLetterTags.z + KanaLetterTags.w + KanaLetterTags.e, ['', 'ズゥ'])
  .set(KanaLetterTags.z + KanaLetterTags.w + KanaLetterTags.o, ['', 'ズォ'])
  .set(KanaLetterTags.t + KanaLetterTags.w + KanaLetterTags.a, ['', 'トゥァ'])
  .set(KanaLetterTags.t + KanaLetterTags.w + KanaLetterTags.i, ['', 'トゥィ'])
  .set(KanaLetterTags.t + KanaLetterTags.w + KanaLetterTags.u, ['', 'トゥゥ'])
  .set(KanaLetterTags.t + KanaLetterTags.w + KanaLetterTags.e, ['', 'トゥェ'])
  .set(KanaLetterTags.t + KanaLetterTags.w + KanaLetterTags.o, ['', 'トゥォ'])
  .set(KanaLetterTags.d + KanaLetterTags.w + KanaLetterTags.a, ['', 'ドゥァ'])
  .set(KanaLetterTags.d + KanaLetterTags.w + KanaLetterTags.i, ['', 'ドゥィ'])
  .set(KanaLetterTags.d + KanaLetterTags.w + KanaLetterTags.u, ['', 'ドゥゥ'])
  .set(KanaLetterTags.d + KanaLetterTags.w + KanaLetterTags.e, ['', 'ドゥェ'])
  .set(KanaLetterTags.d + KanaLetterTags.w + KanaLetterTags.o, ['', 'ドゥォ'])
  .set(KanaLetterTags.n + KanaLetterTags.w + KanaLetterTags.u, ['', 'ヌゥ'])
  .set(KanaLetterTags.h + KanaLetterTags.w + KanaLetterTags.a, ['', 'ホゥァ'])
  .set(KanaLetterTags.h + KanaLetterTags.w + KanaLetterTags.i, ['', 'ホゥィ'])
  .set(KanaLetterTags.h + KanaLetterTags.w + KanaLetterTags.u, ['', 'ホゥゥ'])
  .set(KanaLetterTags.h + KanaLetterTags.w + KanaLetterTags.e, ['', 'ホゥェ'])
  .set(KanaLetterTags.h + KanaLetterTags.w + KanaLetterTags.o, ['', 'ホゥォ'])
  .set(KanaLetterTags.b + KanaLetterTags.w + KanaLetterTags.u, ['', 'ブゥ'])
  .set(KanaLetterTags.p + KanaLetterTags.w + KanaLetterTags.u, ['', 'プゥ'])
  .set(KanaLetterTags.m + KanaLetterTags.w + KanaLetterTags.u, ['', 'ムゥ'])
  .set(KanaLetterTags.v + KanaLetterTags.w + KanaLetterTags.a, ['', 'ヴゥァ'])
  .set(KanaLetterTags.v + KanaLetterTags.w + KanaLetterTags.i, ['', 'ヴゥィ'])
  .set(KanaLetterTags.v + KanaLetterTags.w + KanaLetterTags.u, ['', 'ヴゥゥ'])
  .set(KanaLetterTags.v + KanaLetterTags.w + KanaLetterTags.e, ['', 'ヴゥェ'])
  .set(KanaLetterTags.v + KanaLetterTags.w + KanaLetterTags.o, ['', 'ヴゥォ']);

export const specialH = new Map<string, Array<string>>()
  .set(KanaLetterTags.t + KanaLetterTags.h + KanaLetterTags.a, ['', 'テァ'])
  .set(KanaLetterTags.t + KanaLetterTags.h + KanaLetterTags.u, ['', 'テゥ'])
  .set(KanaLetterTags.t + KanaLetterTags.h + KanaLetterTags.o, ['', 'テォ'])
  .set(KanaLetterTags.d + KanaLetterTags.h + KanaLetterTags.a, ['', 'デァ'])
  .set(KanaLetterTags.d + KanaLetterTags.h + KanaLetterTags.u, ['', 'デゥ'])
  .set(KanaLetterTags.d + KanaLetterTags.h + KanaLetterTags.o, ['', 'デォ']);
