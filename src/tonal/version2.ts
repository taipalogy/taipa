import { Letters, Sound, SetOfSounds } from '../grapheme';

//------------------------------------------------------------------------------

export class Morph {}

//------------------------------------------------------------------------------

export class Allomorph extends Morph {
    tonal: Tonal = new Tonal();

    getLiteral() {
        if (this.tonal.getLiteral().length == 0) {
            // return string 'zero' for first tone. member variable characters of graph is still null.
            return TonalLetterTags.zero;
        } else return this.tonal.getLiteral();
    }
}

export class FreeAllomorph extends Allomorph {}

export class CheckedAllomorph extends Allomorph {
    final: Final = new Final();

    getLiteral() {
        if (this.tonal.getLiteral()) {
            return this.final.getLiteral() + this.tonal.getLiteral();
        }
        return this.final.getLiteral();
    }
}

export class TonalAffix extends Morph {
    tonal: Tonal = new Tonal();
    getLiteral() {
        return this.tonal.getLiteral();
    }
}

class FreeAffix extends TonalAffix {}

class CheckedAffix extends TonalAffix {
    // there is no final for affix
}

//------------------------------------------------------------------------------

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

    cf = 'cf',
    w = 'w',
    xx = 'xx',
    xxx = 'xxx',
    z = 'z',
    zx = 'zx',

    x = 'x',
    y = 'y',

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

    f = 'f',

    h = 'h',

    zero = 'zero',
}

export class LettersOfTonal extends Letters {}

export const lowerLettersOfTonal = new LettersOfTonal([
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
    TonalLetterTags.xxx,
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
]);

export let vowelLettersOfTonal = new LettersOfTonal(['or', 'er', 'ir']);

//------------------------------------------------------------------------------

export enum TonalSoundTags {
    initial = 'initial',
    medial = 'medial',
    nasalization = 'nasalization',
    final = 'final',
    tonal = 'tonal',
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
    name = TonalSoundTags.final;
}
export class Nasalization extends Sound {
    name = TonalSoundTags.nasalization;
}
export class Tonal extends Sound {
    name = TonalSoundTags.tonal;
    isEqualToTonal(tonal: Tonal) {
        if (this.getLiteral() === tonal.getLiteral()) {
            return true;
        }
        return false;
    }
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
export class FreeTonalXXX extends FreeTonal {
    characters = this.makeCharacters(TonalLetterTags.xxx);
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

export class SetOfNasalizations extends SetOfSounds<Nasalization> {
    constructor() {
        super();
        this.sounds.push(new NasalizationNN());
    }
}

export class SetOfNasalFinals extends SetOfSounds<Final> {
    constructor() {
        super();
        this.sounds.push(new FinalM());
        this.sounds.push(new FinalN());
        this.sounds.push(new FinalNG());
    }
}

export class SetOfNeutralFinals extends SetOfSounds<Final> {
    constructor() {
        super();
        this.sounds.push(new FinalH());
        this.sounds.push(new FinalHH());
    }
}

export class SetOfMedials extends SetOfSounds<Medial> {
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

export class SetOfMaterLectionis extends SetOfSounds<Medial> {
    constructor() {
        super();
        this.sounds.push(new MaterLectionisM());
        this.sounds.push(new MaterLectionisN());
        this.sounds.push(new MaterLectionisNG());
    }
}

export class SetOfInitials extends SetOfSounds<Initial> {
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

export class SetOfFreeTonals extends SetOfSounds<FreeTonal> {
    constructor() {
        super();
        this.sounds.push(new FreeTonalZ());
        this.sounds.push(new FreeTonalW());
        this.sounds.push(new FreeTonalXX());
        this.sounds.push(new FreeTonalXXX());
        this.sounds.push(new FreeTonalF());
        this.sounds.push(new FreeTonalZX());

        this.sounds.push(new FreeTonalX());
        this.sounds.push(new FreeTonalY());
    }
}

export class SetOfCheckedTonals extends SetOfSounds<CheckedTonal> {
    constructor() {
        super();
        this.sounds.push(new CheckedTonalF());
        this.sounds.push(new CheckedTonalY());
        this.sounds.push(new CheckedTonalW());
        this.sounds.push(new CheckedTonalX());
    }
}

export class SetOfFinals extends SetOfSounds<Final> {
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

        this.sounds.push(new FinalM());
        this.sounds.push(new FinalN());
        this.sounds.push(new FinalNG());
    }
}

export class SetOfStopFinals extends SetOfSounds<Final> {
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

export class Epenthesis extends SetOfSounds<Initial> {
    constructor() {
        super();
        this.sounds.push(new InitialB());
        this.sounds.push(new InitialL());
        this.sounds.push(new InitialG());
        this.sounds.push(new InitialM());
        this.sounds.push(new InitialN());
    }
}

export class EuphonicFinalsBGJKLPS extends SetOfSounds<Final> {
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

export class EuphonicFinalsBBGGJJKKLLPPSS extends SetOfSounds<Final> {
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

export class FirstTonalF extends SetOfSounds<CheckedTonal> {
    constructor() {
        super();
        this.sounds.push(new CheckedTonalF());
    }
}

export class ThirdFifthTonalsWX extends SetOfSounds<CheckedTonal> {
    constructor() {
        super();
        this.sounds.push(new CheckedTonalW());
        this.sounds.push(new CheckedTonalX());
    }
}

export class NeutralFinalH extends SetOfSounds<StopFinal> {
    constructor() {
        super();
        this.sounds.push(new FinalH());
    }
}

export class NeutralFinalHH extends SetOfSounds<StopFinal> {
    constructor() {
        super();
        this.sounds.push(new FinalHH());
    }
}

//------------------------------------------------------------------------------

export function positionalSound(sounds: Sound[]) {
    return (t: TonalSoundTags) => {
        for (let i in sounds) {
            if (sounds[i].name === t) return sounds[i];
        }
        return new Sound();
    };
}

const ps_a = positionalSound([new MedialA()]);
const ps_b = positionalSound([new InitialB(), new FinalB()]);
const ps_bb = positionalSound([new FinalBB()]);
const ps_c = positionalSound([new InitialC()]);
const ps_ch = positionalSound([new InitialCH()]);
const ps_d = positionalSound([new InitialD()]);
const ps_e = positionalSound([new MedialE()]);
const ps_f = positionalSound([new FreeTonalF(), new CheckedTonalF()]);
const ps_g = positionalSound([new InitialG(), new FinalG()]);
const ps_gg = positionalSound([new FinalGG()]);
const ps_h = positionalSound([new InitialH(), new FinalH()]);
const ps_hh = positionalSound([new FinalHH()]);
const ps_i = positionalSound([new MedialI()]);
const ps_j = positionalSound([new InitialJ(), new FinalJ()]);
const ps_jj = positionalSound([new FinalJJ()]);
const ps_k = positionalSound([new InitialK(), new FinalK()]);
const ps_kk = positionalSound([new FinalKK()]);
const ps_l = positionalSound([new InitialL(), new FinalL()]);
const ps_ll = positionalSound([new FinalLL()]);
const ps_m = positionalSound([new InitialM(), new MaterLectionisM(), new FinalM()]);
const ps_n = positionalSound([new InitialN(), new MaterLectionisN(), new FinalN()]);
const ps_nn = positionalSound([new NasalizationNN()]);
const ps_ng = positionalSound([new InitialNG(), new MaterLectionisNG(), new FinalNG()]);
const ps_o = positionalSound([new MedialO()]);
const ps_p = positionalSound([new InitialP(), new FinalP()]);
const ps_pp = positionalSound([new FinalPP()]);
const ps_q = positionalSound([new InitialQ()]);
const ps_s = positionalSound([new InitialS(), new FinalS()]);
const ps_ss = positionalSound([new FinalSS()]);
const ps_t = positionalSound([new InitialT(), new FinalT()]);
const ps_tt = positionalSound([new FinalTT()]);
const ps_u = positionalSound([new MedialU()]);
const ps_ur = positionalSound([new MedialUR()]);
const ps_v = positionalSound([new InitialV()]);
const ps_w = positionalSound([new FreeTonalW(), new CheckedTonalW()]);
const ps_x = positionalSound([new FreeTonalX(), new CheckedTonalX()]);
const ps_xx = positionalSound([new FreeTonalXX()]);
const ps_xxx = positionalSound([new FreeTonalXXX()]);
const ps_y = positionalSound([new FreeTonalY(), new CheckedTonalY()]);
const ps_z = positionalSound([new FreeTonalZ()]);
const ps_zx = positionalSound([new FreeTonalZX()]);
const ps_zero = positionalSound([new ZeroTonal()]);

//------------------------------------------------------------------------------

class CombiningRules {
    private o: Map<string, { [key: string]: Sound }> = new Map();

    constructor() {
        this.o
            .set(TonalLetterTags.zero, { z: ps_z(TonalSoundTags.freeTonal) })
            .set(TonalLetterTags.y, {
                zero: ps_zero(TonalSoundTags.freeTonal),
                f: ps_f(TonalSoundTags.freeTonal),
            })
            .set(TonalLetterTags.w, { y: ps_y(TonalSoundTags.freeTonal) })
            .set(TonalLetterTags.x, {
                z: ps_z(TonalSoundTags.freeTonal),
                w: ps_w(TonalSoundTags.freeTonal),
            })
            .set(TonalLetterTags.z, { w: ps_w(TonalSoundTags.freeTonal) })
            .set(TonalLetterTags.p, { f: ps_f(TonalSoundTags.checkedTonal) })
            .set(TonalLetterTags.t, { f: ps_f(TonalSoundTags.checkedTonal) })
            .set(TonalLetterTags.k, { f: ps_f(TonalSoundTags.checkedTonal) })
            .set(TonalLetterTags.h, {
                f: ps_f(TonalSoundTags.checkedTonal),
                y: ps_y(TonalSoundTags.checkedTonal),
            })
            .set(TonalLetterTags.pp, {
                w: ps_w(TonalSoundTags.checkedTonal),
                x: ps_x(TonalSoundTags.checkedTonal),
            })
            .set(TonalLetterTags.tt, {
                w: ps_w(TonalSoundTags.checkedTonal),
                x: ps_x(TonalSoundTags.checkedTonal),
            })
            .set(TonalLetterTags.kk, {
                w: ps_w(TonalSoundTags.checkedTonal),
                x: ps_x(TonalSoundTags.checkedTonal),
            })
            .set(TonalLetterTags.hh, {
                w: ps_w(TonalSoundTags.checkedTonal),
                x: ps_x(TonalSoundTags.checkedTonal),
            });
    }

    get(key: string) {
        let value = this.o.get(key);
        if (value) {
            return value;
        }
        return {};
    }
}

export const combiningRules = new CombiningRules();

export const tonalPositionalSound = new Map<string, (t: TonalSoundTags) => Sound>()
    .set(TonalLetterTags.a, ps_a)
    .set(TonalLetterTags.b, ps_b)
    .set(TonalLetterTags.bb, ps_bb)
    .set(TonalLetterTags.c, ps_c)
    .set(TonalLetterTags.ch, ps_ch)
    .set(TonalLetterTags.d, ps_d)
    .set(TonalLetterTags.e, ps_e)
    .set(TonalLetterTags.f, ps_f)
    .set(TonalLetterTags.g, ps_g)
    .set(TonalLetterTags.gg, ps_gg)
    .set(TonalLetterTags.h, ps_h)
    .set(TonalLetterTags.hh, ps_hh)
    .set(TonalLetterTags.i, ps_i)
    .set(TonalLetterTags.j, ps_j)
    .set(TonalLetterTags.jj, ps_jj)
    .set(TonalLetterTags.k, ps_k)
    .set(TonalLetterTags.kk, ps_kk)
    .set(TonalLetterTags.l, ps_l)
    .set(TonalLetterTags.ll, ps_ll)
    .set(TonalLetterTags.m, ps_m)
    .set(TonalLetterTags.n, ps_n)
    .set(TonalLetterTags.nn, ps_nn)
    .set(TonalLetterTags.ng, ps_ng)
    .set(TonalLetterTags.o, ps_o)
    .set(TonalLetterTags.p, ps_p)
    .set(TonalLetterTags.pp, ps_pp)
    .set(TonalLetterTags.q, ps_q)
    .set(TonalLetterTags.s, ps_s)
    .set(TonalLetterTags.ss, ps_ss)
    .set(TonalLetterTags.t, ps_t)
    .set(TonalLetterTags.tt, ps_tt)
    .set(TonalLetterTags.u, ps_u)
    .set(TonalLetterTags.ur, ps_ur)
    .set(TonalLetterTags.v, ps_v)
    .set(TonalLetterTags.w, ps_w)
    .set(TonalLetterTags.x, ps_x)
    .set(TonalLetterTags.xx, ps_xx)
    .set(TonalLetterTags.xxx, ps_xxx)
    .set(TonalLetterTags.y, ps_y)
    .set(TonalLetterTags.z, ps_z)
    .set(TonalLetterTags.zx, ps_zx);

//------------------------------------------------------------------------------

export class ZeroAllomorph extends FreeAllomorph {
    tonal = new ZeroTonal();
}

class AllomorphF extends FreeAllomorph {
    tonal = new FreeTonalF();
}

class AllomorphZ extends FreeAllomorph {
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

class AllomorphXXX extends FreeAllomorph {
    tonal = new FreeTonalXXX();
}

class AllomorphZX extends FreeAllomorph {
    tonal = new FreeTonalZX();
}

class FreeAllomorphs {
    private o: Map<string, Allomorph> = new Map();

    constructor() {
        this.o
            .set(TonalLetterTags.f, new AllomorphF())
            .set(TonalLetterTags.w, new AllomorphW())
            .set(TonalLetterTags.xx, new AllomorphXX())
            .set(TonalLetterTags.xxx, new AllomorphXXX())
            .set(TonalLetterTags.z, new AllomorphZ())
            .set(TonalLetterTags.zx, new AllomorphZX())
            .set(TonalLetterTags.y, new AllomorphY())
            .set(TonalLetterTags.x, new AllomorphX());
    }

    get(key: string) {
        let value = this.o.get(key);
        if (value) {
            return value;
        }
        return new Allomorph();
    }

    has(key: string) {
        return this.o.has(key);
    }
}

export const freeAllomorphs = new FreeAllomorphs();

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

class CheckedAllomorphs {
    private o: Map<string, Allomorph> = new Map();

    constructor() {
        this.o
            .set(ps_p(TonalSoundTags.stopFinal).getLiteral(), new AllomorphP())
            .set(ps_t(TonalSoundTags.stopFinal).getLiteral(), new AllomorphT())
            .set(ps_k(TonalSoundTags.stopFinal).getLiteral(), new AllomorphK())
            .set(ps_h(TonalSoundTags.stopFinal).getLiteral(), new AllomorphH())
            .set(ps_pp(TonalSoundTags.stopFinal).getLiteral(), new AllomorphPP())
            .set(ps_tt(TonalSoundTags.stopFinal).getLiteral(), new AllomorphTT())
            .set(ps_kk(TonalSoundTags.stopFinal).getLiteral(), new AllomorphKK())
            .set(ps_hh(TonalSoundTags.stopFinal).getLiteral(), new AllomorphHH())
            .set(
                ps_p(TonalSoundTags.stopFinal).getLiteral() + ps_f(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphPF(),
            )
            .set(
                ps_t(TonalSoundTags.stopFinal).getLiteral() + ps_f(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphTF(),
            )
            .set(
                ps_k(TonalSoundTags.stopFinal).getLiteral() + ps_f(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphKF(),
            )
            .set(
                ps_h(TonalSoundTags.stopFinal).getLiteral() + ps_f(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphHF(),
            )
            .set(
                ps_pp(TonalSoundTags.stopFinal).getLiteral() + ps_w(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphPPW(),
            )
            .set(
                ps_tt(TonalSoundTags.stopFinal).getLiteral() + ps_w(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphTTW(),
            )
            .set(
                ps_kk(TonalSoundTags.stopFinal).getLiteral() + ps_w(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphKKW(),
            )
            .set(
                ps_hh(TonalSoundTags.stopFinal).getLiteral() + ps_w(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphHHW(),
            )
            .set(
                ps_h(TonalSoundTags.stopFinal).getLiteral() + ps_y(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphHY(),
            )
            .set(
                ps_pp(TonalSoundTags.stopFinal).getLiteral() + ps_x(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphPPX(),
            )
            .set(
                ps_tt(TonalSoundTags.stopFinal).getLiteral() + ps_x(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphTTX(),
            )
            .set(
                ps_kk(TonalSoundTags.stopFinal).getLiteral() + ps_x(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphKKX(),
            )
            .set(
                ps_hh(TonalSoundTags.stopFinal).getLiteral() + ps_x(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphHHX(),
            );
    }

    get(key: string) {
        let value = this.o.get(key);
        if (value) {
            return value;
        }
        return new Allomorph();
    }

    keys() {
        return this.o.keys();
    }
}

export const checkedAllomorphs = new CheckedAllomorphs();

class UncombinedFreeAllomorphs {
    private o: Map<string, Allomorph> = new Map();

    constructor() {
        this.o
            .set(ps_w(TonalSoundTags.freeTonal).getLiteral(), new AllomorphW())
            .set(ps_z(TonalSoundTags.freeTonal).getLiteral(), new AllomorphZ())
            .set(ps_x(TonalSoundTags.freeTonal).getLiteral(), new AllomorphX())
            .set(ps_y(TonalSoundTags.freeTonal).getLiteral(), new AllomorphY());
    }

    has(key: string) {
        return this.o.has(key);
    }

    get(key: string) {
        let value = this.o.get(key);
        if (value) {
            return value;
        }
        return new Allomorph();
    }
}

export const uncombinedFreeAllomorphs = new UncombinedFreeAllomorphs();

class UncombinedCheckedAllomorphs {
    private o: Map<string, Allomorph> = new Map();

    constructor() {
        this.o
            .set(ps_p(TonalSoundTags.stopFinal).getLiteral(), new AllomorphP())
            .set(ps_t(TonalSoundTags.stopFinal).getLiteral(), new AllomorphT())
            .set(ps_k(TonalSoundTags.stopFinal).getLiteral(), new AllomorphK())
            .set(ps_h(TonalSoundTags.stopFinal).getLiteral(), new AllomorphH())
            .set(ps_pp(TonalSoundTags.stopFinal).getLiteral(), new AllomorphPP())
            .set(ps_tt(TonalSoundTags.stopFinal).getLiteral(), new AllomorphTT())
            .set(ps_kk(TonalSoundTags.stopFinal).getLiteral(), new AllomorphKK())
            .set(ps_hh(TonalSoundTags.stopFinal).getLiteral(), new AllomorphHH());
    }

    get(key: string) {
        let value = this.o.get(key);
        if (value) {
            return value;
        }
        return new Allomorph();
    }

    has(key: string) {
        return this.o.has(key);
    }
}

export const uncombinedCheckedAllomorphs = new UncombinedCheckedAllomorphs();

class FreeAllomorphUncombiningRules {
    private o: Map<string, Tonal[]> = new Map();

    constructor() {
        this.o
            .set(ps_f(TonalSoundTags.freeTonal).getLiteral(), [new FreeTonalY()])
            .set(ps_w(TonalSoundTags.freeTonal).getLiteral(), [new FreeTonalZ(), new FreeTonalX()])
            .set(ps_xx(TonalSoundTags.freeTonal).getLiteral(), [new FreeTonalZ(), new FreeTonalF(), new FreeTonalX()])
            .set(ps_xxx(TonalSoundTags.freeTonal).getLiteral(), [new FreeTonalZ(), new FreeTonalF(), new FreeTonalX()])
            .set(ps_z(TonalSoundTags.freeTonal).getLiteral(), [new FreeTonalX(), new FreeTonalF(), new ZeroTonal()])
            .set(ps_zx(TonalSoundTags.freeTonal).getLiteral(), [])
            .set(ps_x(TonalSoundTags.freeTonal).getLiteral(), [])
            .set(ps_y(TonalSoundTags.freeTonal).getLiteral(), [new FreeTonalW()])
            .set(TonalLetterTags.zero, [new FreeTonalY()]);
    }

    get(key: string) {
        let value = this.o.get(key);
        if (value) {
            return value;
        }
        return [];
    }
}

export const freeAllomorphUncombiningRules = new FreeAllomorphUncombiningRules();

class DeclensionRules {
    private o: Map<string, { [key: string]: Sound }> = new Map();

    constructor() {
        this.o
            .set(TonalLetterTags.y, {
                zero: ps_zero(TonalSoundTags.freeTonal),
                w: ps_w(TonalSoundTags.freeTonal),
                z: ps_z(TonalSoundTags.freeTonal),
            })
            .set(TonalLetterTags.zero, {
                w: ps_w(TonalSoundTags.freeTonal),
                z: ps_z(TonalSoundTags.freeTonal),
            });
    }

    get(key: string) {
        let value = this.o.get(key);
        if (value) {
            return value;
        }
        return {};
    }

    get keys() {
        let obj = this.o.get(TonalLetterTags.y);
        if (obj) return Object.keys(obj);
    }
}

export const declensionRules = new DeclensionRules();
