import { Letters, Sound, SetOfSounds } from '../grapheme';

//------------------------------------------------------------------------------

export class Morph {}

//------------------------------------------------------------------------------

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

    f = 'f',
    w = 'w',
    x = 'x',
    xx = 'xx',
    xxx = 'xxx',
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
    or = 'or'
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
    TonalLetterTags.er,
    TonalLetterTags.ir,
    TonalLetterTags.or
]);

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
    freeTonal = 'freeTonal'
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
        if (this.toString() === tonal.toString()) {
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

export class NasalInitialSounds extends SetOfSounds {
    constructor() {
        super();
        this.sounds.push(new InitialM());
        this.sounds.push(new InitialN());
        this.sounds.push(new InitialNG());
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
        this.sounds.push(new FreeTonalXXX());
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

export class FinalSounds extends SetOfSounds {
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

export class EpenthesisSounds extends SetOfSounds {
    constructor() {
        super();
        this.sounds.push(new InitialB());
        this.sounds.push(new InitialL());
        this.sounds.push(new InitialG());
        this.sounds.push(new InitialM());
        this.sounds.push(new InitialN());
    }
}

export class EuphonicFinalsJLS extends SetOfSounds {
    constructor() {
        super();
        this.sounds.push(new FinalJ());
        this.sounds.push(new FinalL());
        this.sounds.push(new FinalS());
    }
}

export class EuphonicFinalsBGKP extends SetOfSounds {
    constructor() {
        super();
        this.sounds.push(new FinalB());
        this.sounds.push(new FinalG());
        this.sounds.push(new FinalK());
        this.sounds.push(new FinalP());
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

export class EuphonicFinalsJJLLSS extends SetOfSounds {
    constructor() {
        super();
        this.sounds.push(new FinalJJ());
        this.sounds.push(new FinalLL());
        this.sounds.push(new FinalSS());
    }
}

export class EuphonicFinalsBBGGKKPP extends SetOfSounds {
    constructor() {
        super();
        this.sounds.push(new FinalBB());
        this.sounds.push(new FinalGG());
        this.sounds.push(new FinalKK());
        this.sounds.push(new FinalPP());
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

export class FirstTonalF extends SetOfSounds {
    constructor() {
        super();
        this.sounds.push(new CheckedTonalF());
    }
}

export class ThirdFifthTonalsWX extends SetOfSounds {
    constructor() {
        super();
        this.sounds.push(new CheckedTonalW());
        this.sounds.push(new CheckedTonalX());
    }
}

export class NeutralFinalH extends SetOfSounds {
    constructor() {
        super();
        this.sounds.push(new FinalH());
    }
}

export class NeutralFinalHH extends SetOfSounds {
    constructor() {
        super();
        this.sounds.push(new FinalHH());
    }
}

export class InitialsForEuphonicT extends SetOfSounds {
    constructor() {
        super();
        this.sounds.push(new InitialP());
        this.sounds.push(new InitialK());
        this.sounds.push(new InitialB());
        this.sounds.push(new InitialG());

        this.sounds.push(new InitialJ());
        this.sounds.push(new InitialQ());
        this.sounds.push(new InitialS());
        this.sounds.push(new InitialV());

        this.sounds.push(new InitialM());
        this.sounds.push(new InitialN());
        this.sounds.push(new InitialNG());
    }
}

export class InitialsForEuphonicTT extends SetOfSounds {
    constructor() {
        super();
        this.sounds.push(new InitialP());
        this.sounds.push(new InitialK());
        this.sounds.push(new InitialG());

        this.sounds.push(new InitialQ());
        this.sounds.push(new InitialS());
        this.sounds.push(new InitialV());

        this.sounds.push(new InitialM());
        this.sounds.push(new InitialN());
        this.sounds.push(new InitialNG());
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
const ps_er = positionalSound([new MedialER()]);
const ps_f = positionalSound([new FreeTonalF(), new CheckedTonalF()]);
const ps_g = positionalSound([new InitialG(), new FinalG()]);
const ps_gg = positionalSound([new FinalGG()]);
const ps_h = positionalSound([new InitialH(), new FinalH()]);
const ps_hh = positionalSound([new FinalHH()]);
const ps_i = positionalSound([new MedialI()]);
const ps_ir = positionalSound([new MedialIR()]);
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
const ps_or = positionalSound([new MedialOR()]);
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

export const combining_rules = new Map<string, { [key: string]: Sound }>()
    .set(TonalLetterTags.zero, { z: ps_z(TonalSoundTags.freeTonal) })
    .set(TonalLetterTags.y, {
        zero: ps_zero(TonalSoundTags.freeTonal),
        f: ps_f(TonalSoundTags.freeTonal)
    })
    .set(TonalLetterTags.w, { y: ps_y(TonalSoundTags.freeTonal) })
    .set(TonalLetterTags.x, {
        z: ps_z(TonalSoundTags.freeTonal),
        w: ps_w(TonalSoundTags.freeTonal)
    })
    .set(TonalLetterTags.z, { w: ps_w(TonalSoundTags.freeTonal) })
    .set(TonalLetterTags.p, { f: ps_f(TonalSoundTags.checkedTonal) })
    .set(TonalLetterTags.t, { f: ps_f(TonalSoundTags.checkedTonal) })
    .set(TonalLetterTags.k, { f: ps_f(TonalSoundTags.checkedTonal) })
    .set(TonalLetterTags.h, {
        f: ps_f(TonalSoundTags.checkedTonal),
        y: ps_y(TonalSoundTags.checkedTonal)
    })
    .set(TonalLetterTags.pp, {
        w: ps_w(TonalSoundTags.checkedTonal),
        x: ps_x(TonalSoundTags.checkedTonal)
    })
    .set(TonalLetterTags.tt, {
        w: ps_w(TonalSoundTags.checkedTonal),
        x: ps_x(TonalSoundTags.checkedTonal)
    })
    .set(TonalLetterTags.kk, {
        w: ps_w(TonalSoundTags.checkedTonal),
        x: ps_x(TonalSoundTags.checkedTonal)
    })
    .set(TonalLetterTags.hh, {
        w: ps_w(TonalSoundTags.checkedTonal),
        x: ps_x(TonalSoundTags.checkedTonal)
    });

export const tonal_positional_sounds = new Map<string, (t: TonalSoundTags) => Sound>()
    .set(TonalLetterTags.a, ps_a)
    .set(TonalLetterTags.b, ps_b)
    .set(TonalLetterTags.bb, ps_bb)
    .set(TonalLetterTags.c, ps_c)
    .set(TonalLetterTags.ch, ps_ch)
    .set(TonalLetterTags.d, ps_d)
    .set(TonalLetterTags.e, ps_e)
    .set(TonalLetterTags.er, ps_er)
    .set(TonalLetterTags.f, ps_f)
    .set(TonalLetterTags.g, ps_g)
    .set(TonalLetterTags.gg, ps_gg)
    .set(TonalLetterTags.h, ps_h)
    .set(TonalLetterTags.hh, ps_hh)
    .set(TonalLetterTags.i, ps_i)
    .set(TonalLetterTags.ir, ps_ir)
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
    .set(TonalLetterTags.or, ps_or)
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

class AllomorphXXX extends FreeAllomorph {
    tonal = new FreeTonalXXX();
}

class AllomorphZX extends FreeAllomorph {
    tonal = new FreeTonalZX();
}

export const free_allomorphs = new Map<string, Allomorph>()
    .set(TonalLetterTags.f, new AllomorphF())
    .set(TonalLetterTags.w, new AllomorphW())
    .set(TonalLetterTags.xx, new AllomorphXX())
    .set(TonalLetterTags.xxx, new AllomorphXXX())
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

export const checked_allomorphs = new Map<string, Allomorph>()
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

export const combined_free_allomorphs = new Map<string, Allomorph>()
    .set(TonalLetterTags.w, new AllomorphW())
    .set(TonalLetterTags.z, new AllomorphZ())
    .set(TonalLetterTags.x, new AllomorphX())
    .set(TonalLetterTags.y, new AllomorphY())
    .set(TonalLetterTags.f, new AllomorphF());

export const uncombined_checked_allomorphs = new Map<string, Allomorph>()
    .set(TonalLetterTags.p, new AllomorphP())
    .set(TonalLetterTags.t, new AllomorphT())
    .set(TonalLetterTags.k, new AllomorphK())
    .set(TonalLetterTags.h, new AllomorphH())
    .set(TonalLetterTags.pp, new AllomorphPP())
    .set(TonalLetterTags.tt, new AllomorphTT())
    .set(TonalLetterTags.kk, new AllomorphKK())
    .set(TonalLetterTags.hh, new AllomorphHH());

export const combined_checked_allomorphs = new Map<string, Allomorph[]>()
    .set(TonalLetterTags.p, [new AllomorphPF()])
    .set(TonalLetterTags.t, [new AllomorphTF()])
    .set(TonalLetterTags.k, [new AllomorphKF()])
    .set(TonalLetterTags.h, [new AllomorphHF(), new AllomorphHY()])
    .set(TonalLetterTags.pp, [new AllomorphPPW(), new AllomorphPPX()])
    .set(TonalLetterTags.tt, [new AllomorphTTW(), new AllomorphTTX()])
    .set(TonalLetterTags.kk, [new AllomorphKKW(), new AllomorphKKX()])
    .set(TonalLetterTags.hh, [new AllomorphHHW(), new AllomorphHHX()]);

export const free_allomorph_uncombining_rules = new Map<string, Tonal[]>()
    .set(TonalLetterTags.f, [new FreeTonalY()])
    .set(TonalLetterTags.w, [new FreeTonalZ(), new FreeTonalX()])
    .set(TonalLetterTags.xx, [new FreeTonalZ(), new FreeTonalF(), new FreeTonalX()])
    .set(TonalLetterTags.xxx, [new FreeTonalZ(), new FreeTonalF(), new FreeTonalX()])
    .set(TonalLetterTags.z, [new FreeTonalX(), new FreeTonalF(), new ZeroTonal()])
    .set(TonalLetterTags.zx, [])
    .set(TonalLetterTags.x, [])
    .set(TonalLetterTags.y, [new FreeTonalW()])
    .set(TonalLetterTags.zero, [new FreeTonalY()]);

export const uncombining_rules_ay = new Map<string, Tonal[]>()
    .set(TonalLetterTags.f, [new FreeTonalY(), new FreeTonalW()])
    .set(TonalLetterTags.x, [new ZeroTonal(), new FreeTonalX(), new FreeTonalZ()]);

export const voiceless_voiced_finals = new Map<string, TonalLetterTags>()
    .set(TonalLetterTags.k, TonalLetterTags.g)
    .set(TonalLetterTags.p, TonalLetterTags.b)
    .set(TonalLetterTags.t, TonalLetterTags.l)
    .set(TonalLetterTags.kk, TonalLetterTags.gg)
    .set(TonalLetterTags.pp, TonalLetterTags.bb)
    .set(TonalLetterTags.tt, TonalLetterTags.ll);
// .set(TonalLetterTags.g, TonalLetterTags.k)
// .set(TonalLetterTags.b, TonalLetterTags.p)
// .set(TonalLetterTags.l, TonalLetterTags.t)
// .set(TonalLetterTags.gg, TonalLetterTags.kk)
// .set(TonalLetterTags.bb, TonalLetterTags.pp)
// .set(TonalLetterTags.ll, TonalLetterTags.tt);

export const assimilated_finals = new Map<string, TonalLetterTags>()
    .set(TonalLetterTags.t + TonalLetterTags.p, TonalLetterTags.p)
    .set(TonalLetterTags.t + TonalLetterTags.v, TonalLetterTags.p)
    .set(TonalLetterTags.t + TonalLetterTags.k, TonalLetterTags.k)
    .set(TonalLetterTags.t + TonalLetterTags.q, TonalLetterTags.k)
    .set(TonalLetterTags.t + TonalLetterTags.m, TonalLetterTags.h)
    .set(TonalLetterTags.t + TonalLetterTags.n, TonalLetterTags.h)
    .set(TonalLetterTags.t + TonalLetterTags.ng, TonalLetterTags.h)
    .set(TonalLetterTags.tt + TonalLetterTags.p, TonalLetterTags.pp)
    .set(TonalLetterTags.tt + TonalLetterTags.v, TonalLetterTags.pp)
    .set(TonalLetterTags.tt + TonalLetterTags.k, TonalLetterTags.kk)
    .set(TonalLetterTags.tt + TonalLetterTags.q, TonalLetterTags.kk)
    .set(TonalLetterTags.tt + TonalLetterTags.m, TonalLetterTags.hh)
    .set(TonalLetterTags.tt + TonalLetterTags.n, TonalLetterTags.hh)
    .set(TonalLetterTags.tt + TonalLetterTags.ng, TonalLetterTags.hh);

export const initialFollowingSyllableForVoicedFinal = [
    TonalLetterTags.b,
    TonalLetterTags.g,
    TonalLetterTags.h,
    TonalLetterTags.l
];
