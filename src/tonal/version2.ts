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

    f = 'f',

    h = 'h',

    zero = 'zero',
}

export class LettersOfTonal extends Letters {}

export let lowerLettersOfTonal = new LettersOfTonal([
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
export class Nasal extends Sound {
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

export class TonalZ extends FreeTonal {
    characters = this.makeCharacters(TonalLetterTags.z);
}
export class TonalW extends FreeTonal {
    characters = this.makeCharacters(TonalLetterTags.w);
}
export class TonalF extends FreeTonal {
    characters = this.makeCharacters(TonalLetterTags.f);
}
export class TonalXX extends FreeTonal {
    characters = this.makeCharacters(TonalLetterTags.xx);
}
export class TonalXXX extends FreeTonal {
    characters = this.makeCharacters(TonalLetterTags.xxx);
}
export class TonalZX extends FreeTonal {
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

class FinalM extends NasalFinal {
    characters = this.makeCharacters(TonalLetterTags.m);
}
class FinalN extends NasalFinal {
    characters = this.makeCharacters(TonalLetterTags.n);
}
class FinalNG extends NasalFinal {
    characters = this.makeCharacters(TonalLetterTags.ng);
}

class NasalizationNN extends Nasal {
    characters = this.makeCharacters(TonalLetterTags.nn);
}

export class SetOfNasalizations extends SetOfSounds {
    nasals: Array<Nasal> = new Array();
    constructor() {
        super();
        this.nasals.push(new NasalizationNN());
    }

    toString() {
        return super.toRegexString(this.nasals);
    }
}

export class SetOfNasalFinals extends SetOfSounds {
    nasalFinals: Array<Final> = new Array();
    constructor() {
        super();
        this.nasalFinals.push(new FinalM());
        this.nasalFinals.push(new FinalN());
        this.nasalFinals.push(new FinalNG());
    }

    toString() {
        return super.toRegexString(this.nasalFinals);
    }
}

export class SetOfNeutralFinals extends SetOfSounds {
    neutralFinals: Array<Final> = new Array();
    constructor() {
        super();
        this.neutralFinals.push(new FinalH());
    }

    toString() {
        return super.toRegexString(this.neutralFinals);
    }
}

export class SetOfMedials extends SetOfSounds {
    medials: Array<Medial> = new Array();
    constructor() {
        super();
        this.medials.push(new MedialA());
        this.medials.push(new MedialE());
        this.medials.push(new MedialI());
        this.medials.push(new MedialO());
        this.medials.push(new MedialU());
        this.medials.push(new MedialUR());
    }

    toString() {
        return super.toRegexString(this.medials);
    }
}

export class SetOfMaterLectionis extends SetOfSounds {
    materLectionis: Array<Medial> = new Array();
    constructor() {
        super();
        this.materLectionis.push(new MaterLectionisM());
        this.materLectionis.push(new MaterLectionisN());
        this.materLectionis.push(new MaterLectionisNG());
    }

    toString() {
        return super.toRegexString(this.materLectionis);
    }
}

export class SetOfInitials extends SetOfSounds {
    initials: Array<Initial> = new Array();
    constructor() {
        super();
        this.initials.push(new InitialP());
        this.initials.push(new InitialT());
        this.initials.push(new InitialK());
        this.initials.push(new InitialB());
        this.initials.push(new InitialD());
        this.initials.push(new InitialG());

        this.initials.push(new InitialH());

        this.initials.push(new InitialC());
        this.initials.push(new InitialCH());
        this.initials.push(new InitialJ());
        this.initials.push(new InitialL());
        this.initials.push(new InitialQ());
        this.initials.push(new InitialS());
        this.initials.push(new InitialV());

        this.initials.push(new InitialM());
        this.initials.push(new InitialN());
        this.initials.push(new InitialNG());
    }

    toString() {
        return super.toRegexString(this.initials);
    }
}

export class SetOfFreeTonals extends SetOfSounds {
    freeTonals: Array<FreeTonal> = new Array();
    constructor() {
        super();
        this.freeTonals.push(new TonalZ());
        this.freeTonals.push(new TonalW());
        this.freeTonals.push(new TonalXX());
        this.freeTonals.push(new TonalXXX());
        this.freeTonals.push(new TonalF());
        this.freeTonals.push(new TonalZX());

        this.freeTonals.push(new FreeTonalX());
        this.freeTonals.push(new FreeTonalY());
    }

    toString() {
        return super.toRegexString(this.freeTonals);
    }
}

export class SetOfCheckedTonals extends SetOfSounds {
    checkedTonals: Array<FreeTonal> = new Array();
    constructor() {
        super();
        this.checkedTonals.push(new CheckedTonalF());
        this.checkedTonals.push(new CheckedTonalY());
        this.checkedTonals.push(new CheckedTonalW());
        this.checkedTonals.push(new CheckedTonalX());
    }

    toString() {
        return super.toRegexString(this.checkedTonals);
    }
}

export class SetOfFinals extends SetOfSounds {
    finals: Array<Final> = new Array();
    constructor() {
        super();
        this.finals.push(new FinalP());
        this.finals.push(new FinalT());
        this.finals.push(new FinalK());
        this.finals.push(new FinalH());
        this.finals.push(new FinalPP());
        this.finals.push(new FinalTT());
        this.finals.push(new FinalKK());
        this.finals.push(new FinalHH());

        this.finals.push(new FinalM());
        this.finals.push(new FinalN());
        this.finals.push(new FinalNG());
    }

    toString() {
        return super.toRegexString(this.finals);
    }
}

export class SetOfStopFinals extends SetOfSounds {
    stopFinals: Array<Final> = new Array();
    constructor() {
        super();
        this.stopFinals.push(new FinalP());
        this.stopFinals.push(new FinalT());
        this.stopFinals.push(new FinalK());
        this.stopFinals.push(new FinalH());
        this.stopFinals.push(new FinalPP());
        this.stopFinals.push(new FinalTT());
        this.stopFinals.push(new FinalKK());
        this.stopFinals.push(new FinalHH());
    }

    toString() {
        return super.toRegexString(this.stopFinals);
    }
}

export class Epenthesis extends SetOfSounds {
    letters: Array<Initial> = new Array();
    constructor() {
        super();
        this.letters.push(new InitialB());
        this.letters.push(new InitialL());
        this.letters.push(new InitialG());
        this.letters.push(new InitialM());
        this.letters.push(new InitialN());
    }

    toString() {
        return super.toRegexString(this.letters);
    }
}

//------------------------------------------------------------------------------

class PSA extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.a;
        this.map = new Map<string, Sound>().set(TonalSoundTags.medial, new MedialA());
    }
}

class PSB extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.b;
        this.map = new Map<string, Sound>().set(TonalSoundTags.initial, new InitialB());
    }
}

class PSC extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.c;
        this.map = new Map<string, Sound>().set(TonalSoundTags.initial, new InitialC());
    }
}

class PSCH extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.ch;
        this.map = new Map<string, Sound>().set(TonalSoundTags.initial, new InitialCH());
    }
}

class PSD extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.d;
        this.map = new Map<string, Sound>().set(TonalSoundTags.initial, new InitialD());
    }
}

class PSE extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.e;
        this.map = new Map<string, Sound>().set(TonalSoundTags.medial, new MedialE());
    }
}

class PSF extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.f;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.checkedTonal, new CheckedTonalF())
            .set(TonalSoundTags.freeTonal, new TonalF()); // TODO: add tests to check the size of the map
    }
}

class PSG extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.g;
        this.map = new Map<string, Sound>().set(TonalSoundTags.initial, new InitialG());
    }
}

class PSHH extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.hh;
        this.map = new Map<string, Sound>().set(TonalSoundTags.stopFinal, new FinalHH());
    }
}

class PSI extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.i;
        this.map = new Map<string, Sound>().set(TonalSoundTags.medial, new MedialI());
    }
}

class PSJ extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.j;
        this.map = new Map<string, Sound>().set(TonalSoundTags.initial, new InitialJ());
    }
}

class PSK extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.k;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.initial, new InitialK())
            .set(TonalSoundTags.stopFinal, new FinalK());
    }
}

class PSKK extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.kk;
        this.map = new Map<string, Sound>().set(TonalSoundTags.stopFinal, new FinalKK());
    }
}

class PSL extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.l;
        this.map = new Map<string, Sound>().set(TonalSoundTags.initial, new InitialL());
    }
}

class PSM extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.m;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.initial, new InitialM())
            .set(TonalSoundTags.medial, new MaterLectionisM())
            .set(TonalSoundTags.nasalFinal, new FinalM());
    }
}

class PSN extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.n;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.initial, new InitialN())
            .set(TonalSoundTags.medial, new MaterLectionisN())
            .set(TonalSoundTags.nasalFinal, new FinalN());
    }
}

class PSNN extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.nn;
        this.map = new Map<string, Sound>().set(TonalSoundTags.nasalization, new NasalizationNN());
    }
}

class PSNG extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.ng;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.initial, new InitialNG())
            .set(TonalSoundTags.medial, new MaterLectionisNG())
            .set(TonalSoundTags.nasalFinal, new FinalNG());
    }
}

class PSO extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.o;
        this.map = new Map<string, Sound>().set(TonalSoundTags.medial, new MedialO());
    }
}

class PSP extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.p;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.initial, new InitialP())
            .set(TonalSoundTags.stopFinal, new FinalP());
    }
}

class PSPP extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.pp;
        this.map = new Map<string, Sound>().set(TonalSoundTags.stopFinal, new FinalPP());
    }
}

class PSQ extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.q;
        this.map = new Map<string, Sound>().set(TonalSoundTags.initial, new InitialQ());
    }
}

class PSH extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.h;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.initial, new InitialH())
            .set(TonalSoundTags.stopFinal, new FinalH());
    }
}

class PSS extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.s;
        this.map = new Map<string, Sound>().set(TonalSoundTags.initial, new InitialS());
    }
}

class PST extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.t;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.initial, new InitialT())
            .set(TonalSoundTags.stopFinal, new FinalT());
    }
}

class PSTT extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.tt;
        this.map = new Map<string, Sound>().set(TonalSoundTags.stopFinal, new FinalTT());
    }
}

class PSU extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.u;
        this.map = new Map<string, Sound>().set(TonalSoundTags.medial, new MedialU());
    }
}

class PSUR extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.ur;
        this.map = new Map<string, Sound>().set(TonalSoundTags.medial, new MedialUR());
    }
}

class PSV extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.v;
        this.map = new Map<string, Sound>().set(TonalSoundTags.initial, new InitialV());
    }
}

class PSW extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.w;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.freeTonal, new TonalW())
            .set(TonalSoundTags.checkedTonal, new CheckedTonalW());
    }
}

class PSX extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.x;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.freeTonal, new FreeTonalX())
            .set(TonalSoundTags.checkedTonal, new CheckedTonalX());
    }
}

class PSXX extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.xx;
        this.map = new Map<string, Sound>().set(TonalSoundTags.freeTonal, new TonalXX());
    }
}

class PSXXX extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.xxx;
        this.map = new Map<string, Sound>().set(TonalSoundTags.freeTonal, new TonalXXX());
    }
}

class PSY extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.y;
        this.map = new Map<string, Sound>()
            .set(TonalSoundTags.freeTonal, new FreeTonalY())
            .set(TonalSoundTags.checkedTonal, new CheckedTonalY());
    }
}

class PSZ extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.z;
        this.map = new Map<string, Sound>().set(TonalSoundTags.freeTonal, new TonalZ());
    }
}

class PSZX extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.zx;
        this.map = new Map<string, Sound>().set(TonalSoundTags.freeTonal, new TonalZX());
    }
}

class PSZero extends PositionalSound {
    constructor() {
        super();
        this.name = TonalLetterTags.zero;
        this.map = new Map<string, Sound>().set(TonalSoundTags.freeTonal, new ZeroTonal());
    }
}

//------------------------------------------------------------------------------

class CombiningRules {
    private o: Map<string, { [key: string]: Sound }> = new Map();

    constructor() {
        this.o
            .set(TonalLetterTags.zero, { z: new PSZ().get(TonalSoundTags.freeTonal) })
            .set(TonalLetterTags.y, {
                zero: new PSZero().get(TonalSoundTags.freeTonal),
                f: new PSF().get(TonalSoundTags.freeTonal),
            })
            .set(TonalLetterTags.w, { y: new PSY().get(TonalSoundTags.freeTonal) })
            .set(TonalLetterTags.x, {
                z: new PSZ().get(TonalSoundTags.freeTonal),
                w: new PSW().get(TonalSoundTags.freeTonal),
            })
            .set(TonalLetterTags.z, { w: new PSW().get(TonalSoundTags.freeTonal) })
            .set(TonalLetterTags.p, { f: new PSF().get(TonalSoundTags.checkedTonal) })
            .set(TonalLetterTags.t, { f: new PSF().get(TonalSoundTags.checkedTonal) })
            .set(TonalLetterTags.k, { f: new PSF().get(TonalSoundTags.checkedTonal) })
            .set(TonalLetterTags.h, {
                f: new PSF().get(TonalSoundTags.checkedTonal),
                y: new PSY().get(TonalSoundTags.checkedTonal),
            })
            .set(TonalLetterTags.pp, {
                w: new PSW().get(TonalSoundTags.checkedTonal),
                x: new PSX().get(TonalSoundTags.checkedTonal),
            })
            .set(TonalLetterTags.tt, {
                w: new PSW().get(TonalSoundTags.checkedTonal),
                x: new PSX().get(TonalSoundTags.checkedTonal),
            })
            .set(TonalLetterTags.kk, {
                w: new PSW().get(TonalSoundTags.checkedTonal),
                x: new PSX().get(TonalSoundTags.checkedTonal),
            })
            .set(TonalLetterTags.hh, {
                w: new PSW().get(TonalSoundTags.checkedTonal),
                x: new PSX().get(TonalSoundTags.checkedTonal),
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

class LetterClasses {
    private o: Map<string, PositionalSound> = new Map();

    constructor() {
        this.o
            .set(TonalLetterTags.a, new PSA())
            .set(TonalLetterTags.b, new PSB())
            .set(TonalLetterTags.c, new PSC())
            .set(TonalLetterTags.ch, new PSCH())
            .set(TonalLetterTags.d, new PSD())
            .set(TonalLetterTags.e, new PSE())
            .set(TonalLetterTags.f, new PSF())
            .set(TonalLetterTags.g, new PSG())
            .set(TonalLetterTags.h, new PSH())
            .set(TonalLetterTags.hh, new PSHH())
            .set(TonalLetterTags.i, new PSI())
            .set(TonalLetterTags.j, new PSJ())
            .set(TonalLetterTags.k, new PSK())
            .set(TonalLetterTags.kk, new PSKK())
            .set(TonalLetterTags.l, new PSL())
            .set(TonalLetterTags.m, new PSM())
            .set(TonalLetterTags.n, new PSN())
            .set(TonalLetterTags.nn, new PSNN())
            .set(TonalLetterTags.ng, new PSNG())
            .set(TonalLetterTags.o, new PSO())
            .set(TonalLetterTags.p, new PSP())
            .set(TonalLetterTags.pp, new PSPP())
            .set(TonalLetterTags.q, new PSQ())
            .set(TonalLetterTags.s, new PSS())
            .set(TonalLetterTags.t, new PST())
            .set(TonalLetterTags.tt, new PSTT())
            .set(TonalLetterTags.u, new PSU())
            .set(TonalLetterTags.ur, new PSUR())
            .set(TonalLetterTags.v, new PSV())
            .set(TonalLetterTags.w, new PSW())
            .set(TonalLetterTags.x, new PSX())
            .set(TonalLetterTags.xx, new PSXX())
            .set(TonalLetterTags.xxx, new PSXXX())
            .set(TonalLetterTags.y, new PSY())
            .set(TonalLetterTags.z, new PSZ())
            .set(TonalLetterTags.zx, new PSZX());
    }

    get(key: string) {
        let value = this.o.get(key);
        if (value) {
            return value;
        }
        return new PositionalSound();
    }
}

export const letterClasses = new LetterClasses();

//------------------------------------------------------------------------------

export class ZeroAllomorph extends FreeAllomorph {
    tonal = new ZeroTonal();
}

class AllomorphF extends FreeAllomorph {
    tonal = new TonalF();
}

class AllomorphZ extends FreeAllomorph {
    tonal = new TonalZ();
}

export class AllomorphY extends FreeAllomorph {
    tonal = new FreeTonalY();
}

export class AllomorphW extends FreeAllomorph {
    tonal = new TonalW();
}

export class AllomorphX extends FreeAllomorph {
    tonal = new FreeTonalX();
}

class AllomorphXX extends FreeAllomorph {
    tonal = new TonalXX();
}

class AllomorphXXX extends FreeAllomorph {
    tonal = new TonalXXX();
}

class AllomorphZX extends FreeAllomorph {
    tonal = new TonalZX();
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
            .set(new PSP().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphP())
            .set(new PST().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphT())
            .set(new PSK().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphK())
            .set(new PSH().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphH())
            .set(new PSPP().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphPP())
            .set(new PSTT().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphTT())
            .set(new PSKK().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphKK())
            .set(new PSHH().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphHH())
            .set(
                new PSP().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PSF().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphPF(),
            )
            .set(
                new PST().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PSF().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphTF(),
            )
            .set(
                new PSK().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PSF().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphKF(),
            )
            .set(
                new PSH().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PSF().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphHF(),
            )
            .set(
                new PSPP().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PSW().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphPPW(),
            )
            .set(
                new PSTT().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PSW().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphTTW(),
            )
            .set(
                new PSKK().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PSW().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphKKW(),
            )
            .set(
                new PSHH().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PSW().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphHHW(),
            )
            .set(
                new PSH().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PSY().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphHY(),
            )
            .set(
                new PSPP().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PSX().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphPPX(),
            )
            .set(
                new PSTT().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PSX().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphTTX(),
            )
            .set(
                new PSKK().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PSX().get(TonalSoundTags.checkedTonal).getLiteral(),
                new AllomorphKKX(),
            )
            .set(
                new PSHH().get(TonalSoundTags.stopFinal).getLiteral() +
                    new PSX().get(TonalSoundTags.checkedTonal).getLiteral(),
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
            .set(new PSW().get(TonalSoundTags.freeTonal).getLiteral(), new AllomorphW())
            .set(new PSZ().get(TonalSoundTags.freeTonal).getLiteral(), new AllomorphZ())
            .set(new PSX().get(TonalSoundTags.freeTonal).getLiteral(), new AllomorphX())
            .set(new PSY().get(TonalSoundTags.freeTonal).getLiteral(), new AllomorphY());
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
            .set(new PSP().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphP())
            .set(new PST().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphT())
            .set(new PSK().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphK())
            .set(new PSH().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphH())
            .set(new PSPP().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphPP())
            .set(new PSTT().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphTT())
            .set(new PSKK().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphKK())
            .set(new PSHH().get(TonalSoundTags.stopFinal).getLiteral(), new AllomorphHH());
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
            .set(new PSF().get(TonalSoundTags.freeTonal).getLiteral(), [new FreeTonalY()])
            .set(new PSW().get(TonalSoundTags.freeTonal).getLiteral(), [new TonalZ(), new FreeTonalX()])
            .set(new PSXX().get(TonalSoundTags.freeTonal).getLiteral(), [new TonalZ(), new TonalF(), new FreeTonalX()])
            .set(new PSXXX().get(TonalSoundTags.freeTonal).getLiteral(), [new TonalZ(), new TonalF(), new FreeTonalX()])
            .set(new PSZ().get(TonalSoundTags.freeTonal).getLiteral(), [
                new FreeTonalX(),
                new TonalF(),
                new ZeroTonal(),
            ])
            .set(new PSZX().get(TonalSoundTags.freeTonal).getLiteral(), [])
            .set(new PSX().get(TonalSoundTags.freeTonal).getLiteral(), [])
            .set(new PSY().get(TonalSoundTags.freeTonal).getLiteral(), [new TonalW()])
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
                zero: new PSZero().get(TonalSoundTags.freeTonal),
                w: new PSW().get(TonalSoundTags.freeTonal),
                z: new PSZ().get(TonalSoundTags.freeTonal),
            })
            .set(TonalLetterTags.zero, {
                w: new PSW().get(TonalSoundTags.freeTonal),
                z: new PSZ().get(TonalSoundTags.freeTonal),
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
