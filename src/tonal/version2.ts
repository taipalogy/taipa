import { Letters, Sound, PositionalSound, SetOfSounds } from '../grapheme';

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

export class EuphonicTonalF extends SetOfSounds<CheckedTonal> {
    constructor() {
        super();
        this.sounds.push(new CheckedTonalF());
    }
}

export class EuphonicTonalsWAndX extends SetOfSounds<CheckedTonal> {
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

class PS_A extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.a;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.medial, new MedialA());
    }
}

class PS_B extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.b;
        this.no = 2;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.initial, new InitialB())
            .set(TonalSoundTags.stopFinal, new FinalB());
    }
}

class PS_BB extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.bb;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.stopFinal, new FinalBB());
    }
}

class PS_C extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.c;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.initial, new InitialC());
    }
}

class PS_CH extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.ch;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.initial, new InitialCH());
    }
}

class PS_D extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.d;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.initial, new InitialD());
    }
}

class PS_E extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.e;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.medial, new MedialE());
    }
}

class PS_F extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.f;
        this.no = 2;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.checkedTonal, new CheckedTonalF())
            .set(TonalSoundTags.freeTonal, new FreeTonalF());
    }
}

class PS_G extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.g;
        this.no = 2;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.initial, new InitialG())
            .set(TonalSoundTags.stopFinal, new FinalG());
    }
}

class PS_GG extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.gg;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.stopFinal, new FinalGG());
    }
}

class PS_HH extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.hh;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.stopFinal, new FinalHH());
    }
}

class PS_I extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.i;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.medial, new MedialI());
    }
}

class PS_J extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.j;
        this.no = 2;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.initial, new InitialJ())
            .set(TonalSoundTags.stopFinal, new FinalJ());
    }
}

class PS_JJ extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.jj;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.stopFinal, new FinalJJ());
    }
}

class PS_K extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.k;
        this.no = 2;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.initial, new InitialK())
            .set(TonalSoundTags.stopFinal, new FinalK());
    }
}

class PS_KK extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.kk;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.stopFinal, new FinalKK());
    }
}

class PS_L extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.l;
        this.no = 2;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.initial, new InitialL())
            .set(TonalSoundTags.stopFinal, new FinalL());;
    }
}

class PS_LL extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.ll;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.stopFinal, new FinalLL());
    }
}

class PS_M extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.m;
        this.no = 3;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.initial, new InitialM())
            .set(TonalSoundTags.medial, new MaterLectionisM())
            .set(TonalSoundTags.nasalFinal, new FinalM());
    }
}

class PS_N extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.n;
        this.no = 3;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.initial, new InitialN())
            .set(TonalSoundTags.medial, new MaterLectionisN())
            .set(TonalSoundTags.nasalFinal, new FinalN());
    }
}

class PS_NN extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.nn;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.nasalization, new NasalizationNN());
    }
}

class PS_NG extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.ng;
        this.no = 3;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.initial, new InitialNG())
            .set(TonalSoundTags.medial, new MaterLectionisNG())
            .set(TonalSoundTags.nasalFinal, new FinalNG());
    }
}

class PS_O extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.o;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.medial, new MedialO());
    }
}

class PS_P extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.p;
        this.no = 2;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.initial, new InitialP())
            .set(TonalSoundTags.stopFinal, new FinalP());
    }
}

class PS_PP extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.pp;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.stopFinal, new FinalPP());
    }
}

class PS_Q extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.q;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.initial, new InitialQ());
    }
}

class PS_H extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.h;
        this.no = 2;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.initial, new InitialH())
            .set(TonalSoundTags.stopFinal, new FinalH());
    }
}

class PS_S extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.s;
        this.no = 2;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.initial, new InitialS())
            .set(TonalSoundTags.stopFinal, new FinalS());
    }
}

class PS_SS extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.ss;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.stopFinal, new FinalSS());
    }
}

class PS_T extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.t;
        this.no = 2;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.initial, new InitialT())
            .set(TonalSoundTags.stopFinal, new FinalT());
    }
}

class PS_TT extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.tt;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.stopFinal, new FinalTT());
    }
}

class PS_U extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.u;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.medial, new MedialU());
    }
}

class PS_UR extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.ur;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.medial, new MedialUR());
    }
}

class PS_V extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.v;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.initial, new InitialV());
    }
}

class PS_W extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.w;
        this.no = 2;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.freeTonal, new FreeTonalW())
            .set(TonalSoundTags.checkedTonal, new CheckedTonalW());
    }
}

class PS_X extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.x;
        this.no = 2;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.freeTonal, new FreeTonalX())
            .set(TonalSoundTags.checkedTonal, new CheckedTonalX());
    }
}

class PS_XX extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.xx;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.freeTonal, new FreeTonalXX());
    }
}

class PS_XXX extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.xxx;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.freeTonal, new FreeTonalXXX());
    }
}

class PS_Y extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.y;
        this.no = 2;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.freeTonal, new FreeTonalY())
            .set(TonalSoundTags.checkedTonal, new CheckedTonalY());
    }
}

class PS_Z extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.z;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.freeTonal, new FreeTonalZ());
    }
}

class PS_ZX extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.zx;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.freeTonal, new FreeTonalZX());
    }
}

class PS_Zero extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.zero;
        this.no = 1;
        this.map = new Map<string, Sound>().set(TonalSoundTags.freeTonal, new ZeroTonal());
    }
}

//------------------------------------------------------------------------------

class CombiningRules {
    private o: Map<string, { [key: string]: Sound }> = new Map();

    constructor() {
        this.o
            .set(TonalLetterTags.zero, { z: new PS_Z().get(TonalSoundTags.freeTonal) })
            .set(TonalLetterTags.y, {
                zero: new PS_Zero().get(TonalSoundTags.freeTonal),
                f: new PS_F().get(TonalSoundTags.freeTonal),
            })
            .set(TonalLetterTags.w, { y: new PS_Y().get(TonalSoundTags.freeTonal) })
            .set(TonalLetterTags.x, {
                z: new PS_Z().get(TonalSoundTags.freeTonal),
                w: new PS_W().get(TonalSoundTags.freeTonal),
            })
            .set(TonalLetterTags.z, { w: new PS_W().get(TonalSoundTags.freeTonal) })
            .set(TonalLetterTags.p, { f: new PS_F().get(TonalSoundTags.checkedTonal) })
            .set(TonalLetterTags.t, { f: new PS_F().get(TonalSoundTags.checkedTonal) })
            .set(TonalLetterTags.k, { f: new PS_F().get(TonalSoundTags.checkedTonal) })
            .set(TonalLetterTags.h, {
                f: new PS_F().get(TonalSoundTags.checkedTonal),
                y: new PS_Y().get(TonalSoundTags.checkedTonal),
            })
            .set(TonalLetterTags.pp, {
                w: new PS_W().get(TonalSoundTags.checkedTonal),
                x: new PS_X().get(TonalSoundTags.checkedTonal),
            })
            .set(TonalLetterTags.tt, {
                w: new PS_W().get(TonalSoundTags.checkedTonal),
                x: new PS_X().get(TonalSoundTags.checkedTonal),
            })
            .set(TonalLetterTags.kk, {
                w: new PS_W().get(TonalSoundTags.checkedTonal),
                x: new PS_X().get(TonalSoundTags.checkedTonal),
            })
            .set(TonalLetterTags.hh, {
                w: new PS_W().get(TonalSoundTags.checkedTonal),
                x: new PS_X().get(TonalSoundTags.checkedTonal),
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

export const letterClasses = new Map<string, PositionalSound>()
    .set(TonalLetterTags.a, new PS_A())
    .set(TonalLetterTags.b, new PS_B())
    .set(TonalLetterTags.bb, new PS_BB())
    .set(TonalLetterTags.c, new PS_C())
    .set(TonalLetterTags.ch, new PS_CH())
    .set(TonalLetterTags.d, new PS_D())
    .set(TonalLetterTags.e, new PS_E())
    .set(TonalLetterTags.f, new PS_F())
    .set(TonalLetterTags.g, new PS_G())
    .set(TonalLetterTags.gg, new PS_GG())
    .set(TonalLetterTags.h, new PS_H())
    .set(TonalLetterTags.hh, new PS_HH())
    .set(TonalLetterTags.i, new PS_I())
    .set(TonalLetterTags.j, new PS_J())
    .set(TonalLetterTags.jj, new PS_JJ())
    .set(TonalLetterTags.k, new PS_K())
    .set(TonalLetterTags.kk, new PS_KK())
    .set(TonalLetterTags.l, new PS_L())
    .set(TonalLetterTags.ll, new PS_LL())
    .set(TonalLetterTags.m, new PS_M())
    .set(TonalLetterTags.n, new PS_N())
    .set(TonalLetterTags.nn, new PS_NN())
    .set(TonalLetterTags.ng, new PS_NG())
    .set(TonalLetterTags.o, new PS_O())
    .set(TonalLetterTags.p, new PS_P())
    .set(TonalLetterTags.pp, new PS_PP())
    .set(TonalLetterTags.q, new PS_Q())
    .set(TonalLetterTags.s, new PS_S())
    .set(TonalLetterTags.ss, new PS_SS())
    .set(TonalLetterTags.t, new PS_T())
    .set(TonalLetterTags.tt, new PS_TT())
    .set(TonalLetterTags.u, new PS_U())
    .set(TonalLetterTags.ur, new PS_UR())
    .set(TonalLetterTags.v, new PS_V())
    .set(TonalLetterTags.w, new PS_W())
    .set(TonalLetterTags.x, new PS_X())
    .set(TonalLetterTags.xx, new PS_XX())
    .set(TonalLetterTags.xxx, new PS_XXX())
    .set(TonalLetterTags.y, new PS_Y())
    .set(TonalLetterTags.z, new PS_Z())
    .set(TonalLetterTags.zx, new PS_ZX());

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
            .set(new PS_P().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphP())
            .set(new PS_T().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphT())
            .set(new PS_K().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphK())
            .set(new PS_H().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphH())
            .set(new PS_PP().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphPP())
            .set(new PS_TT().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphTT())
            .set(new PS_KK().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphKK())
            .set(new PS_HH().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphHH())
            .set(
                new PS_P().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PS_F().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphPF(),
            )
            .set(
                new PS_T().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PS_F().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphTF(),
            )
            .set(
                new PS_K().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PS_F().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphKF(),
            )
            .set(
                new PS_H().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PS_F().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphHF(),
            )
            .set(
                new PS_PP().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PS_W().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphPPW(),
            )
            .set(
                new PS_TT().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PS_W().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphTTW(),
            )
            .set(
                new PS_KK().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PS_W().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphKKW(),
            )
            .set(
                new PS_HH().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PS_W().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphHHW(),
            )
            .set(
                new PS_H().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PS_Y().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphHY(),
            )
            .set(
                new PS_PP().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PS_X().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphPPX(),
            )
            .set(
                new PS_TT().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PS_X().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphTTX(),
            )
            .set(
                new PS_KK().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PS_X().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphKKX(),
            )
            .set(
                new PS_HH().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PS_X().get(TonalSoundTags.checkedTonal).getLiteral(),
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
            .set(new PS_W().get(TonalSoundTags.freeTonal).getLiteral(), new AllomorphW())
            .set(new PS_Z().get(TonalSoundTags.freeTonal).getLiteral(), new AllomorphZ())
            .set(new PS_X().get(TonalSoundTags.freeTonal).getLiteral(), new AllomorphX())
            .set(new PS_Y().get(TonalSoundTags.freeTonal).getLiteral(), new AllomorphY());
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
            .set(new PS_P().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphP())
            .set(new PS_T().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphT())
            .set(new PS_K().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphK())
            .set(new PS_H().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphH())
            .set(new PS_PP().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphPP())
            .set(new PS_TT().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphTT())
            .set(new PS_KK().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphKK())
            .set(new PS_HH().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphHH());
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
            .set(new PS_F().get(TonalSoundTags.freeTonal).getLiteral(), [new FreeTonalY()])
            .set(new PS_W().get(TonalSoundTags.freeTonal).getLiteral(), [new FreeTonalZ(), new FreeTonalX()])
            .set(new PS_XX().get(TonalSoundTags.freeTonal).getLiteral(), [new FreeTonalZ(), new FreeTonalF(), new FreeTonalX()])
            .set(new PS_XXX().get(TonalSoundTags.freeTonal).getLiteral(), [new FreeTonalZ(), new FreeTonalF(), new FreeTonalX()])
            .set(new PS_Z().get(TonalSoundTags.freeTonal).getLiteral(), [
                new FreeTonalX(),
                new FreeTonalF(),
                new ZeroTonal(),
            ])
            .set(new PS_ZX().get(TonalSoundTags.freeTonal).getLiteral(), [])
            .set(new PS_X().get(TonalSoundTags.freeTonal).getLiteral(), [])
            .set(new PS_Y().get(TonalSoundTags.freeTonal).getLiteral(), [new FreeTonalW()])
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
                zero: new PS_Zero().get(TonalSoundTags.freeTonal),
                w: new PS_W().get(TonalSoundTags.freeTonal),
                z: new PS_Z().get(TonalSoundTags.freeTonal),
            })
            .set(TonalLetterTags.zero, {
                w: new PS_W().get(TonalSoundTags.freeTonal),
                z: new PS_Z().get(TonalSoundTags.freeTonal),
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
