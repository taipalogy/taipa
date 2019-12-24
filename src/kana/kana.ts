import { Sound, SetOfSounds, Letters } from '../grapheme';

//------------------------------------------------------------------------------

enum KanaLetterTags {
    a = 'a',
    e = 'e',
    i = 'i',
    o = 'o',
    u = 'u',

    b = 'b',
    c = 'c',
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
}

export class LettersOfKana extends Letters {}
export let lowerLettersOfKana = new LettersOfKana([
    KanaLetterTags.a,
    KanaLetterTags.e,
    KanaLetterTags.i,
    KanaLetterTags.o,
    KanaLetterTags.u,
    KanaLetterTags.b,
    KanaLetterTags.c,
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
]);

//------------------------------------------------------------------------------

export enum KanaSoundTags {
    germinatedConsonant = 'germinatedConsonant',
    initialConsonant = 'initialConsonant',
    semivowel = 'semivowel',
    vowel = 'vowel',
    finalConsonant = 'finalConsonant',
}

class GerminatedConsonant extends Sound {
    name = KanaSoundTags.germinatedConsonant;
}
class InitialConsonant extends Sound {
    name = KanaSoundTags.initialConsonant;
}
class Semivowel extends Sound {
    name = KanaSoundTags.semivowel;
}
class Vowel extends Sound {
    name = KanaSoundTags.vowel;
}
class FinalConsonant extends Sound {
    name = KanaSoundTags.finalConsonant;
}

class InitialConsonantB extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.b);
}
class InitialConsonantC extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.c);
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
class FinalConsonantH extends FinalConsonant {
    characters = this.makeCharacters(KanaLetterTags.h);
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

class GerminatedConsonantB extends GerminatedConsonant {
    characters = this.makeCharacters(KanaLetterTags.b);
}
class GerminatedConsonantC extends GerminatedConsonant {
    characters = this.makeCharacters(KanaLetterTags.c);
}
class GerminatedConsonantD extends GerminatedConsonant {
    characters = this.makeCharacters(KanaLetterTags.d);
}
class GerminatedConsonantG extends GerminatedConsonant {
    characters = this.makeCharacters(KanaLetterTags.g);
}
class GerminatedConsonantK extends GerminatedConsonant {
    characters = this.makeCharacters(KanaLetterTags.k);
}
class GerminatedConsonantP extends GerminatedConsonant {
    characters = this.makeCharacters(KanaLetterTags.p);
}
class GerminatedConsonantS extends GerminatedConsonant {
    characters = this.makeCharacters(KanaLetterTags.s);
}
class GerminatedConsonantT extends GerminatedConsonant {
    characters = this.makeCharacters(KanaLetterTags.t);
}

export class SetOfInitialConsonants extends SetOfSounds<InitialConsonant> {
    constructor() {
        super();
        this.sounds.push(new InitialConsonantB());
        this.sounds.push(new InitialConsonantC());
        this.sounds.push(new InitialConsonantCH());
        this.sounds.push(new InitialConsonantD());
        this.sounds.push(new InitialConsonantF());
        this.sounds.push(new InitialConsonantG());
        this.sounds.push(new InitialConsonantH());
        this.sounds.push(new InitialConsonantJ());
        this.sounds.push(new InitialConsonantK());
        this.sounds.push(new InitialConsonantL());
        this.sounds.push(new InitialConsonantM());
        this.sounds.push(new InitialConsonantN());
        this.sounds.push(new InitialConsonantP());
        this.sounds.push(new InitialConsonantR());
        this.sounds.push(new InitialConsonantS());
        this.sounds.push(new InitialConsonantT());
        this.sounds.push(new InitialConsonantV());
        this.sounds.push(new InitialConsonantW());
        this.sounds.push(new InitialConsonantY());
        this.sounds.push(new InitialConsonantZ());
    }
}

export class SetOfVowels extends SetOfSounds<Vowel> {
    constructor() {
        super();
        this.sounds.push(new VowelA());
        this.sounds.push(new VowelI());
        this.sounds.push(new VowelU());
        this.sounds.push(new VowelE());
        this.sounds.push(new VowelO());
    }
}

export class SetOfGerminatedConsonants extends SetOfSounds<GerminatedConsonant> {
    constructor() {
        super();
        this.sounds.push(new GerminatedConsonantB());
        this.sounds.push(new GerminatedConsonantC());
        this.sounds.push(new GerminatedConsonantD());
        this.sounds.push(new GerminatedConsonantG());
        this.sounds.push(new GerminatedConsonantK());
        this.sounds.push(new GerminatedConsonantP());
        this.sounds.push(new GerminatedConsonantS());
        this.sounds.push(new GerminatedConsonantT());
    }
}

export class SetOfSemivowels extends SetOfSounds<Semivowel> {
    constructor() {
        super();
        this.sounds.push(new SemivowelW());
        this.sounds.push(new SemivowelY());
    }
}

export class SetOfFinalConsonants extends SetOfSounds<FinalConsonant> {
    constructor() {
        super();
        this.sounds.push(new FinalConsonantB());
        this.sounds.push(new FinalConsonantD());
        this.sounds.push(new FinalConsonantG());
        this.sounds.push(new FinalConsonantK());
        this.sounds.push(new FinalConsonantN());
        this.sounds.push(new FinalConsonantP());
        this.sounds.push(new FinalConsonantS());
        this.sounds.push(new FinalConsonantT());
    }
}

export class Hatsuon extends SetOfSounds<FinalConsonant> {
    constructor() {
        super();
        this.sounds.push(new FinalConsonantN());
    }
}

//------------------------------------------------------------------------------

export function positionalSound(sounds: Sound[]) {
    return (t: KanaSoundTags) => {
        for(let i in sounds) {
            if(sounds[i].name === t) return sounds[i];
        }
        return new Sound();
    }
}

const ps_a = positionalSound([new VowelA()]);
const ps_b = positionalSound([new InitialConsonantB(), new FinalConsonantB(), new GerminatedConsonantB()]);
const ps_c = positionalSound([new InitialConsonantC(), new GerminatedConsonantC()]);
const ps_ch = positionalSound([new InitialConsonantCH()]);
const ps_d = positionalSound([new InitialConsonantD(), new FinalConsonantD(), new GerminatedConsonantD()]);
const ps_e = positionalSound([new VowelE()]);
const ps_f = positionalSound([new InitialConsonantF()]);
const ps_g = positionalSound([new InitialConsonantG(), new FinalConsonantG(), new GerminatedConsonantG()]);
const ps_h = positionalSound([new InitialConsonantH()]);
const ps_i = positionalSound([new VowelI()]);
const ps_j = positionalSound([new InitialConsonantJ()]);
const ps_k = positionalSound([new InitialConsonantK(), new FinalConsonantK(), new GerminatedConsonantK()]);
const ps_l = positionalSound([new InitialConsonantL()]);
const ps_m = positionalSound([new InitialConsonantM()]);
const ps_n = positionalSound([new InitialConsonantN(), new FinalConsonantN()]);
const ps_o = positionalSound([new VowelO()]);
const ps_p = positionalSound([new InitialConsonantP(), new FinalConsonantP(), new GerminatedConsonantP()]);
const ps_r = positionalSound([new InitialConsonantR()]);
const ps_s = positionalSound([new InitialConsonantS(), new FinalConsonantS(), new GerminatedConsonantS()]);
const ps_t = positionalSound([new InitialConsonantT(), new FinalConsonantT(), new GerminatedConsonantT()]);
const ps_u = positionalSound([new VowelU()]);
const ps_v = positionalSound([new InitialConsonantV()]);
const ps_w = positionalSound([new InitialConsonantW(), new SemivowelW()]);
const ps_y = positionalSound([new InitialConsonantY(), new SemivowelY()]);
const ps_z = positionalSound([new InitialConsonantZ()]);

//------------------------------------------------------------------------------
export const kanaPositionalSound = new Map<string, (t: KanaSoundTags) => Sound>()
    .set(KanaLetterTags.a, ps_a)
    .set(KanaLetterTags.b, ps_b)
    .set(KanaLetterTags.c, ps_c)
    .set(KanaLetterTags.ch, ps_ch)
    .set(KanaLetterTags.d, ps_d)
    .set(KanaLetterTags.e, ps_e)
    .set(KanaLetterTags.f, ps_f)
    .set(KanaLetterTags.g, ps_g)
    .set(KanaLetterTags.h, ps_h)
    .set(KanaLetterTags.i, ps_i)
    .set(KanaLetterTags.j, ps_j)
    .set(KanaLetterTags.k, ps_k)
    .set(KanaLetterTags.l, ps_l)
    .set(KanaLetterTags.m, ps_m)
    .set(KanaLetterTags.n, ps_n)
    .set(KanaLetterTags.o, ps_o)
    .set(KanaLetterTags.p, ps_p)
    .set(KanaLetterTags.r, ps_r)
    .set(KanaLetterTags.s, ps_s)
    .set(KanaLetterTags.t, ps_t)
    .set(KanaLetterTags.u, ps_u)
    .set(KanaLetterTags.v, ps_v)
    .set(KanaLetterTags.w, ps_w)
    .set(KanaLetterTags.y, ps_y)
    .set(KanaLetterTags.z, ps_z);

//------------------------------------------------------------------------------

export const hiragana_katakana = new Map<string, Array<string>>()
    .set(ps_a(KanaSoundTags.vowel).getLiteral(), ['あ', 'ア'])
    .set(ps_i(KanaSoundTags.vowel).getLiteral(), ['い', 'イ'])
    .set(ps_u(KanaSoundTags.vowel).getLiteral(), ['う', 'ウ'])
    .set(ps_e(KanaSoundTags.vowel).getLiteral(), ['え', 'エ'])
    .set(ps_o(KanaSoundTags.vowel).getLiteral(), ['お', 'オ'])
    .set(ps_k(KanaSoundTags.initialConsonant).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['か', 'カ'])
    .set(ps_k(KanaSoundTags.initialConsonant).getLiteral() + ps_i(KanaSoundTags.vowel).getLiteral(), ['き', 'キ'])
    .set(ps_k(KanaSoundTags.initialConsonant).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['く', 'ク'])
    .set(ps_k(KanaSoundTags.initialConsonant).getLiteral() + ps_e(KanaSoundTags.vowel).getLiteral(), ['け', 'ケ'])
    .set(ps_k(KanaSoundTags.initialConsonant).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['こ', 'コ'])
    .set(ps_s(KanaSoundTags.initialConsonant).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['さ', 'サ'])
    .set(ps_s(KanaSoundTags.initialConsonant).getLiteral() + ps_i(KanaSoundTags.vowel).getLiteral(), ['し', 'シ'])
    .set(ps_s(KanaSoundTags.initialConsonant).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['す', 'ス'])
    .set(ps_s(KanaSoundTags.initialConsonant).getLiteral() + ps_e(KanaSoundTags.vowel).getLiteral(), ['せ', 'セ'])
    .set(ps_s(KanaSoundTags.initialConsonant).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['そ', 'ソ'])
    .set(ps_t(KanaSoundTags.initialConsonant).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['た', 'タ'])
    .set(ps_c(KanaSoundTags.initialConsonant).getLiteral() + ps_i(KanaSoundTags.vowel).getLiteral(), ['ち', 'チ'])
    .set(ps_ch(KanaSoundTags.initialConsonant).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['つ', 'ツ'])
    .set(ps_t(KanaSoundTags.initialConsonant).getLiteral() + ps_e(KanaSoundTags.vowel).getLiteral(), ['て', 'テ'])
    .set(ps_t(KanaSoundTags.initialConsonant).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['と', 'ト'])
    .set(ps_n(KanaSoundTags.initialConsonant).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['な', 'ナ'])
    .set(ps_n(KanaSoundTags.initialConsonant).getLiteral() + ps_i(KanaSoundTags.vowel).getLiteral(), ['に', 'ニ'])
    .set(ps_n(KanaSoundTags.initialConsonant).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['ぬ', 'ヌ'])
    .set(ps_n(KanaSoundTags.initialConsonant).getLiteral() + ps_e(KanaSoundTags.vowel).getLiteral(), ['ね', 'ネ'])
    .set(ps_n(KanaSoundTags.initialConsonant).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['の', 'ノ'])
    .set(ps_h(KanaSoundTags.initialConsonant).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['は', 'ハ'])
    .set(ps_h(KanaSoundTags.initialConsonant).getLiteral() + ps_i(KanaSoundTags.vowel).getLiteral(), ['ひ', 'ヒ'])
    .set(ps_f(KanaSoundTags.initialConsonant).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['ふ', 'フ'])
    .set(ps_h(KanaSoundTags.initialConsonant).getLiteral() + ps_e(KanaSoundTags.vowel).getLiteral(), ['へ', 'ヘ'])
    .set(ps_h(KanaSoundTags.initialConsonant).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['ほ', 'ホ'])
    .set(ps_m(KanaSoundTags.initialConsonant).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['ま', 'マ'])
    .set(ps_m(KanaSoundTags.initialConsonant).getLiteral() + ps_i(KanaSoundTags.vowel).getLiteral(), ['み', 'ミ'])
    .set(ps_m(KanaSoundTags.initialConsonant).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['む', 'ム'])
    .set(ps_m(KanaSoundTags.initialConsonant).getLiteral() + ps_e(KanaSoundTags.vowel).getLiteral(), ['め', 'メ'])
    .set(ps_m(KanaSoundTags.initialConsonant).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['も', 'モ'])
    .set(ps_y(KanaSoundTags.initialConsonant).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['や', 'ヤ'])
    .set(ps_y(KanaSoundTags.initialConsonant).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['ゆ', 'ユ'])
    .set(ps_y(KanaSoundTags.initialConsonant).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['よ', 'ヨ'])
    .set(ps_r(KanaSoundTags.initialConsonant).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['ら', 'ラ'])
    .set(ps_r(KanaSoundTags.initialConsonant).getLiteral() + ps_i(KanaSoundTags.vowel).getLiteral(), ['り', 'リ'])
    .set(ps_r(KanaSoundTags.initialConsonant).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['る', 'ル'])
    .set(ps_r(KanaSoundTags.initialConsonant).getLiteral() + ps_e(KanaSoundTags.vowel).getLiteral(), ['れ', 'レ'])
    .set(ps_r(KanaSoundTags.initialConsonant).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['ろ', 'ロ'])
    .set(ps_w(KanaSoundTags.initialConsonant).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['わ', 'ワ'])
    .set(ps_w(KanaSoundTags.initialConsonant).getLiteral() + ps_i(KanaSoundTags.vowel).getLiteral(), ['ゐ', 'ヰ'])
    .set(ps_w(KanaSoundTags.initialConsonant).getLiteral() + ps_e(KanaSoundTags.vowel).getLiteral(), ['ゑ', 'ヱ'])
    .set(ps_w(KanaSoundTags.initialConsonant).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['を', 'ヲ'])
    .set(ps_g(KanaSoundTags.initialConsonant).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['が', 'ガ'])
    .set(ps_g(KanaSoundTags.initialConsonant).getLiteral() + ps_i(KanaSoundTags.vowel).getLiteral(), ['ぎ', 'ギ'])
    .set(ps_g(KanaSoundTags.initialConsonant).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['ぐ', 'グ'])
    .set(ps_g(KanaSoundTags.initialConsonant).getLiteral() + ps_e(KanaSoundTags.vowel).getLiteral(), ['げ', 'ゲ'])
    .set(ps_g(KanaSoundTags.initialConsonant).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['ご', 'ゴ'])
    .set(ps_z(KanaSoundTags.initialConsonant).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['ざ', 'ザ'])
    .set(ps_j(KanaSoundTags.initialConsonant).getLiteral() + ps_i(KanaSoundTags.vowel).getLiteral(), ['じ', 'ジ'])
    .set(ps_z(KanaSoundTags.initialConsonant).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['ず', 'ズ'])
    .set(ps_z(KanaSoundTags.initialConsonant).getLiteral() + ps_e(KanaSoundTags.vowel).getLiteral(), ['ぜ', 'ゼ'])
    .set(ps_z(KanaSoundTags.initialConsonant).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['ぞ', 'ゾ'])
    .set(ps_d(KanaSoundTags.initialConsonant).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['だ', 'ダ'])
    .set(ps_d(KanaSoundTags.initialConsonant).getLiteral() + ps_e(KanaSoundTags.vowel).getLiteral(), ['で', 'デ'])
    .set(ps_d(KanaSoundTags.initialConsonant).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['ど', 'ド'])
    .set(ps_b(KanaSoundTags.initialConsonant).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['ば', 'バ'])
    .set(ps_b(KanaSoundTags.initialConsonant).getLiteral() + ps_i(KanaSoundTags.vowel).getLiteral(), ['び', 'ビ'])
    .set(ps_b(KanaSoundTags.initialConsonant).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['ぶ', 'ブ'])
    .set(ps_b(KanaSoundTags.initialConsonant).getLiteral() + ps_e(KanaSoundTags.vowel).getLiteral(), ['べ', 'ベ'])
    .set(ps_b(KanaSoundTags.initialConsonant).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['ぼ', 'ボ'])
    .set(ps_p(KanaSoundTags.initialConsonant).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['ぱ', 'パ'])
    .set(ps_p(KanaSoundTags.initialConsonant).getLiteral() + ps_i(KanaSoundTags.vowel).getLiteral(), ['ぴ', 'ピ'])
    .set(ps_p(KanaSoundTags.initialConsonant).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['ぷ', 'プ'])
    .set(ps_p(KanaSoundTags.initialConsonant).getLiteral() + ps_e(KanaSoundTags.vowel).getLiteral(), ['ぺ', 'ペ'])
    .set(ps_p(KanaSoundTags.initialConsonant).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['ぽ', 'ポ'])
    .set(ps_k(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['きゃ', 'キャ'])
    .set(ps_k(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['きゅ', 'キュ'])
    .set(ps_k(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['きょ', 'キョ'])
    .set(ps_s(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['しゃ', 'シャ'])
    .set(ps_s(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['しゅ', 'シュ'])
    .set(ps_s(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['しょ', 'ショ'])
    .set(ps_c(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['ちゃ', 'チャ'])
    .set(ps_c(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['ちゅ', 'チュ'])
    .set(ps_c(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['ちょ', 'チョ'])
    .set(ps_n(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['にゃ', 'ニャ'])
    .set(ps_n(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['にゅ', 'ニュ'])
    .set(ps_n(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['にょ', 'ニョ'])
    .set(ps_h(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['ひゃ', 'ヒャ'])
    .set(ps_h(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['ひゅ', 'ヒュ'])
    .set(ps_h(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['ひょ', 'ヒョ'])
    .set(ps_m(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['みゃ', 'ミャ'])
    .set(ps_m(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['みゅ', 'みょ'])
    .set(ps_m(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['ミュ', 'ミョ'])
    .set(ps_r(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['りゃ', 'リャ'])
    .set(ps_r(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['りゅ', 'リュ'])
    .set(ps_r(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['りょ', 'リョ'])
    .set(ps_g(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['ぎゃ', 'ギャ'])
    .set(ps_g(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['ぎゅ', 'ギュ'])
    .set(ps_g(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['ぎょ', 'ギョ'])
    .set(ps_j(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['じゃ', 'ジャ'])
    .set(ps_j(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['じゅ', 'ジュ'])
    .set(ps_j(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['じょ', 'ジョ'])
    .set(ps_b(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['びゃ', 'ビャ'])
    .set(ps_b(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['びゅ', 'ビュ'])
    .set(ps_b(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['びょ', 'ビョ'])
    .set(ps_p(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['ぴゃ', 'ピャ'])
    .set(ps_p(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['ぴゅ', 'ピュ'])
    .set(ps_p(KanaSoundTags.initialConsonant).getLiteral() + ps_y(KanaSoundTags.semivowel).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['ぴょ', 'ピョ'])
    .set(ps_f(KanaSoundTags.initialConsonant).getLiteral() + ps_a(KanaSoundTags.vowel).getLiteral(), ['ふぁ', 'ファ'])
    .set(ps_f(KanaSoundTags.initialConsonant).getLiteral() + ps_i(KanaSoundTags.vowel).getLiteral(), ['ふぃ', 'フィ'])
    .set(ps_f(KanaSoundTags.initialConsonant).getLiteral() + ps_e(KanaSoundTags.vowel).getLiteral(), ['ふぇ', 'フェ'])
    .set(ps_f(KanaSoundTags.initialConsonant).getLiteral() + ps_o(KanaSoundTags.vowel).getLiteral(), ['ふぉ', 'フォ']);

export const kogakimoji = new Map<string, Array<string>>()
    .set(ps_ch(KanaSoundTags.initialConsonant).getLiteral() + ps_u(KanaSoundTags.vowel).getLiteral(), ['っ', 'ッ']);

export const hatsuon = new Map<string, Array<string>>()
    .set(ps_n(KanaSoundTags.initialConsonant).getLiteral(), ['ん', 'ン']);

export const gailaigo = new Map<string, Array<string>>()
    .set(ps_d(KanaSoundTags.initialConsonant).getLiteral() + ps_i(KanaSoundTags.vowel).getLiteral(), ['でぃ', 'ディ']);
