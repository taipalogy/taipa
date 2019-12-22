import { Sound, SetOfSounds, Letters, PositionalSound } from '../grapheme';

export class ClientOfKanaGenerator {
    private analyzeAfterVowels(ls: string[], sounds: string[], index: number): string[] {
        if (this.isFinalConsonant(ls[index])) {
            sounds.push(ls[index] + '.' + KanaSoundTags.finalConsonant);
        }
        return sounds;
    }

    private analyzeAfterInitialConsonants(ls: string[], sounds: string[], index: number): string[] {
        let sbool = this.isSemivowel(ls[index]);
        let vbool = this.isVowel(ls[index]);
        if (sbool) {
            sounds.push(ls[index] + '.' + KanaSoundTags.semivowel);
            if (this.isVowel(ls[index + 1])) {
                sounds.push(ls[index + 1] + '.' + KanaSoundTags.vowel);
            }
        } else if (vbool) {
            let k = index;
            while (k < ls.length) {
                if (this.isVowel(ls[k])) {
                    sounds.push(ls[k] + '.' + KanaSoundTags.vowel);
                }
                k++;
            }
        }

        if (sbool || vbool) {
            if (ls.length > sounds.length) {
                sounds = this.analyzeAfterVowels(ls, sounds, sounds.length);
            }
        }

        return sounds;
    }

    private isInitialConsonant(str: string) {
        if (new SetOfInitialConsonants().beginWith(str) == true) return true;

        return false;
    }

    private isSemivowel(str: string) {
        if (new SetOfSemivowels().beginWith(str) == true) return true;

        return false;
    }

    private isVowel(str: string) {
        if (new SetOfVowels().beginWith(str) == true) return true;

        return false;
    }

    private isGerminatedConsonant(str: string) {
        if (new SetOfGerminatedConsonants().beginWith(str) == true) return true;

        return false;
    }

    private isFinalConsonant(str: string) {
        if (new SetOfFinalConsonants().beginWith(str) == true) return true;

        return false;
    }

    private convert(entry: string[]) {
        // convert strings in an entry to sounds
        // ex: a.medial -> PS_A.medial
        let ret: Array<Sound> = new Array();
        for (let i in entry) {
            let n = entry[i].lastIndexOf('.');
            let clasName = entry[i].slice(0, n);
            let position = entry[i].slice(n + 1);
            let ps = kanaPositionalSound.get(clasName);
            if (ps) {
                let snd = ps.map.get(position);
                if (snd) {
                    ret.push(snd);
                }
            }
        }

        return ret;
    }

    private genSokuonAndGerminated(letters: string[], lookahead: string) {
        let strs: Array<string[]> = new Array();

        strs.push(letters);

        // consonant germination
        if (new SetOfGerminatedConsonants().beginWith(letters[0]) == true) {
            let syl: string[] = new Array();
            syl.push(letters[0].charAt(0));
            for (let e of letters) {
                syl.push(e);
            }
            strs.push(syl);
        }

        // sokuon
        let fcs = new SetOfFinalConsonants();
        for (let e of fcs.sounds) {
            let syl: string[] = new Array();
            Object.assign(syl, letters);
            syl.push(e.getLiteral());
            if (e.getLiteral() === lookahead) strs.push(syl);
        }

        return strs;
    }

    generate(letters: string[], lookahead: string) {
        let strs: Array<string[]> = new Array();
        let arrayOfSounds: Array<string[]> = new Array(); // collecting all sounds to be processed
        let entries: Array<Sound[]> = new Array(); // to be returned

        strs = this.genSokuonAndGerminated(letters, lookahead);

        for (let i in strs) {
            // generates all needed sounds to be processed
            let ls: string[] = strs[i];

            let sounds: string[] = [];

            // analyze vowels which have no leading consonants
            // pass 0 as index to indicate it has no leading consonants
            sounds = this.analyzeAfterInitialConsonants(ls, sounds, 0);

            if ((this.isInitialConsonant(ls[0]) || this.isGerminatedConsonant(ls[0])) && ls.length > 1) {
                if (this.isVowel(ls[1]) || this.isSemivowel(ls[1])) {
                    // analyze initial consonants
                    sounds.push(ls[0] + '.' + KanaSoundTags.initialConsonant);
                    // consonants followed by vowels
                    sounds = this.analyzeAfterInitialConsonants(ls, sounds, sounds.length);
                } else if (this.isInitialConsonant(ls[1])) {
                    sounds.push(ls[0] + '.' + KanaSoundTags.germinatedConsonant);
                    sounds.push(ls[1] + '.' + KanaSoundTags.initialConsonant);
                    if (ls.length > 2) sounds = this.analyzeAfterInitialConsonants(ls, sounds, 2);
                }
            }

            arrayOfSounds.push(sounds);
        }

        for (let k = 0; k < arrayOfSounds.length; k++) {
            entries.push(this.convert(arrayOfSounds[k]));
        }

        return entries;
    }
}

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
/*
class InitialConsonantW extends InitialConsonant {
    characters = this.makeCharacters(KanaLetterTags.w);
}
*/
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
        //this.sounds.push(new InitialConsonantW());
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

class PS_A extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.a;
        this.no = 1;
        this.map = new Map<string, Sound>().set(KanaSoundTags.vowel, new VowelA());
    }
}

class PS_B extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.b;
        this.no = 3;
        this.map = new Map<string, Sound>()
            .set(KanaSoundTags.initialConsonant, new InitialConsonantB())
            .set(KanaSoundTags.finalConsonant, new FinalConsonantB())
            .set(KanaSoundTags.germinatedConsonant, new GerminatedConsonantB());
    }
}

class PS_C extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.c;
        this.no = 2;
        this.map = new Map<string, Sound>()
            .set(KanaSoundTags.germinatedConsonant, new GerminatedConsonantC())
            .set(KanaSoundTags.initialConsonant, new InitialConsonantC());
    }
}

class PS_CH extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.ch;
        this.no = 1;
        this.map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantCH());
    }
}

class PS_D extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.d;
        this.no = 3;
        this.map = new Map<string, Sound>()
            .set(KanaSoundTags.initialConsonant, new InitialConsonantD())
            .set(KanaSoundTags.finalConsonant, new FinalConsonantD())
            .set(KanaSoundTags.germinatedConsonant, new GerminatedConsonantD());
    }
}

class PS_E extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.e;
        this.no = 1;
        this.map = new Map<string, Sound>().set(KanaSoundTags.vowel, new VowelE());
    }
}

class PS_F extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.f;
        this.no = 1;
        this.map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantF());
    }
}

class PS_G extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.g;
        this.no = 3;
        this.map = new Map<string, Sound>()
            .set(KanaSoundTags.initialConsonant, new InitialConsonantG())
            .set(KanaSoundTags.finalConsonant, new FinalConsonantG())
            .set(KanaSoundTags.germinatedConsonant, new GerminatedConsonantG());
    }
}

class PS_H extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.h;
        this.no = 1;
        this.map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantH());
    }
}

class PS_I extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.i;
        this.no = 1;
        this.map = new Map<string, Sound>().set(KanaSoundTags.vowel, new VowelI());
    }
}

class PS_J extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.j;
        this.no = 1;
        this.map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantJ());
    }
}

class PS_K extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.k;
        this.no = 3;
        this.map = new Map<string, Sound>()
            .set(KanaSoundTags.germinatedConsonant, new GerminatedConsonantK())
            .set(KanaSoundTags.initialConsonant, new InitialConsonantK())
            .set(KanaSoundTags.finalConsonant, new FinalConsonantK());
    }
}

class PS_L extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.l;
        this.no = 1;
        this.map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantL());
    }
}

class PS_M extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.m;
        this.no = 1;
        this.map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantM());
    }
}

class PS_N extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.n;
        this.no = 2;
        this.map = new Map<string, Sound>()
            .set(KanaSoundTags.initialConsonant, new InitialConsonantN())
            .set(KanaSoundTags.finalConsonant, new FinalConsonantN());
    }
}

class PS_O extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.o;
        this.no = 1;
        this.map = new Map<string, Sound>().set(KanaSoundTags.vowel, new VowelO());
    }
}

class PS_P extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.p;
        this.no = 3;
        this.map = new Map<string, Sound>()
            .set(KanaSoundTags.germinatedConsonant, new GerminatedConsonantP())
            .set(KanaSoundTags.initialConsonant, new InitialConsonantP())
            .set(KanaSoundTags.finalConsonant, new FinalConsonantP());
    }
}

class PS_R extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.r;
        this.no = 1;
        this.map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantR());
    }
}

class PS_S extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.s;
        this.no = 3;
        this.map = new Map<string, Sound>()
            .set(KanaSoundTags.germinatedConsonant, new GerminatedConsonantS())
            .set(KanaSoundTags.initialConsonant, new InitialConsonantS())
            .set(KanaSoundTags.finalConsonant, new FinalConsonantS());
    }
}

class PS_T extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.t;
        this.no = 3;
        this.map = new Map<string, Sound>()
            .set(KanaSoundTags.germinatedConsonant, new GerminatedConsonantT())
            .set(KanaSoundTags.initialConsonant, new InitialConsonantT())
            .set(KanaSoundTags.finalConsonant, new FinalConsonantT());
    }
}

class PS_U extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.u;
        this.no = 1;
        this.map = new Map<string, Sound>().set(KanaSoundTags.vowel, new VowelU());
    }
}

class PS_V extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.v;
        this.no = 1;
        this.map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantV());
    }
}

class PS_W extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.w;
        this.no = 1;
        //this.no = 2;
        this.map = new Map<string, Sound>()
            .set(KanaSoundTags.semivowel, new SemivowelW())
            //.set(KanaSoundTags.initialConsonant, new InitialConsonantW());
    }
}

class PS_Y extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.y;
        this.no = 1;
        this.map = new Map<string, Sound>().set(KanaSoundTags.semivowel, new SemivowelY());
    }
}

class PS_Z extends PositionalSound {
    constructor() {
        super();
        this.name = KanaLetterTags.z;
        this.no = 1;
        this.map = new Map<string, Sound>().set(KanaSoundTags.initialConsonant, new InitialConsonantZ());
    }
}

//------------------------------------------------------------------------------

export const kanaPositionalSound: Map<string, PositionalSound> = new Map()
    .set(KanaLetterTags.a, new PS_A())
    .set(KanaLetterTags.b, new PS_B())
    .set(KanaLetterTags.c, new PS_C())
    .set(KanaLetterTags.ch, new PS_CH())
    .set(KanaLetterTags.d, new PS_D())
    .set(KanaLetterTags.e, new PS_E())
    .set(KanaLetterTags.f, new PS_F())
    .set(KanaLetterTags.g, new PS_G())
    .set(KanaLetterTags.h, new PS_H())
    .set(KanaLetterTags.i, new PS_I())
    .set(KanaLetterTags.j, new PS_J())
    .set(KanaLetterTags.k, new PS_K())
    .set(KanaLetterTags.l, new PS_L())
    .set(KanaLetterTags.m, new PS_M())
    .set(KanaLetterTags.n, new PS_N())
    .set(KanaLetterTags.o, new PS_O())
    .set(KanaLetterTags.p, new PS_P())
    .set(KanaLetterTags.r, new PS_R())
    .set(KanaLetterTags.s, new PS_S())
    .set(KanaLetterTags.t, new PS_T())
    .set(KanaLetterTags.u, new PS_U())
    .set(KanaLetterTags.v, new PS_V())
    .set(KanaLetterTags.w, new PS_W())
    .set(KanaLetterTags.y, new PS_Y())
    .set(KanaLetterTags.z, new PS_Z());

//------------------------------------------------------------------------------

export const hiragana_katakana: Map<string, Array<string>> = new Map()
    .set('a', ['あ', 'ア'])
    .set('i', ['い', 'イ'])
    .set('u', ['う', 'ウ'])
    .set('e', ['え', 'エ'])
    .set('o', ['お', 'オ'])
    .set('ka', ['か', 'カ'])
    .set('ki', ['き', 'キ'])
    .set('ku', ['く', 'ク'])
    .set('ke', ['け', 'ケ'])
    .set('ko', ['こ', 'コ'])
    .set('sa', ['さ', 'サ'])
    .set('si', ['し', 'シ'])
    .set('su', ['す', 'ス'])
    .set('se', ['せ', 'セ'])
    .set('so', ['そ', 'ソ'])
    .set('ta', ['た', 'タ'])
    .set('ci', ['ち', 'チ'])
    .set('chu', ['つ', 'ツ'])
    .set('te', ['て', 'テ'])
    .set('to', ['と', 'ト'])
    .set('na', ['な', 'ナ'])
    .set('ni', ['に', 'ニ'])
    .set('nu', ['ぬ', 'ヌ'])
    .set('ne', ['ね', 'ネ'])
    .set('no', ['の', 'ノ'])
    .set('ha', ['は', 'ハ'])
    .set('hi', ['ひ', 'ヒ'])
    .set('fu', ['ふ', 'フ'])
    .set('he', ['へ', 'ヘ'])
    .set('ho', ['ほ', 'ホ'])
    .set('ma', ['ま', 'マ'])
    .set('mi', ['み', 'ミ'])
    .set('mu', ['む', 'ム'])
    .set('me', ['め', 'メ'])
    .set('mo', ['も', 'モ'])
    .set('ya', ['や', 'ヤ'])
    .set('yu', ['ゆ', 'ユ'])
    .set('yo', ['よ', 'ヨ'])
    .set('ra', ['ら', 'ラ'])
    .set('ri', ['り', 'リ'])
    .set('ru', ['る', 'ル'])
    .set('re', ['れ', 'レ'])
    .set('ro', ['ろ', 'ロ'])
    .set('wa', ['わ', 'ワ'])
    .set('wi', ['ゐ', 'ヰ'])
    .set('we', ['ゑ', 'ヱ'])
    .set('wo', ['を', 'ヲ'])
    .set('ga', ['が', 'ガ'])
    .set('gi', ['ぎ', 'ギ'])
    .set('gu', ['ぐ', 'グ'])
    .set('ge', ['げ', 'ゲ'])
    .set('go', ['ご', 'ゴ'])
    .set('za', ['ざ', 'ザ'])
    .set('ji', ['じ', 'ジ'])
    .set('zu', ['ず', 'ズ'])
    .set('ze', ['ぜ', 'ゼ'])
    .set('zo', ['ぞ', 'ゾ'])
    .set('da', ['だ', 'ダ'])
    .set('de', ['で', 'デ'])
    .set('do', ['ど', 'ド'])
    .set('ba', ['ば', 'バ'])
    .set('bi', ['び', 'ビ'])
    .set('bu', ['ぶ', 'ブ'])
    .set('be', ['べ', 'ベ'])
    .set('bo', ['ぼ', 'ボ'])
    .set('pa', ['ぱ', 'パ'])
    .set('pi', ['ぴ', 'ピ'])
    .set('pu', ['ぷ', 'プ'])
    .set('pe', ['ぺ', 'ペ'])
    .set('po', ['ぽ', 'ポ'])
    .set('kya', ['きゃ', 'キャ'])
    .set('kyu', ['きゅ', 'キュ'])
    .set('kyo', ['きょ', 'キョ'])
    .set('sya', ['しゃ', 'シャ'])
    .set('syu', ['しゅ', 'シュ'])
    .set('syo', ['しょ', 'ショ'])
    .set('cya', ['ちゃ', 'チャ'])
    .set('cyu', ['ちゅ', 'チュ'])
    .set('cyo', ['ちょ', 'チョ'])
    .set('nya', ['にゃ', 'ニャ'])
    .set('nyu', ['にゅ', 'ニュ'])
    .set('nyo', ['にょ', 'ニョ'])
    .set('hya', ['ひゃ', 'ヒャ'])
    .set('hyu', ['ひゅ', 'ヒュ'])
    .set('hyo', ['ひょ', 'ヒョ'])
    .set('mya', ['みゃ', 'ミャ'])
    .set('myu', ['みゅ', 'みょ'])
    .set('myo', ['ミュ', 'ミョ'])
    .set('rya', ['りゃ', 'リャ'])
    .set('ryu', ['りゅ', 'リュ'])
    .set('ryo', ['りょ', 'リョ'])
    .set('gya', ['ぎゃ', 'ギャ'])
    .set('gyu', ['ぎゅ', 'ギュ'])
    .set('gyo', ['ぎょ', 'ギョ'])
    .set('jya', ['じゃ', 'ジャ'])
    .set('jyu', ['じゅ', 'ジュ'])
    .set('jyo', ['じょ', 'ジョ'])
    .set('bya', ['びゃ', 'ビャ'])
    .set('byu', ['びゅ', 'ビュ'])
    .set('byo', ['びょ', 'ビョ'])
    .set('pya', ['ぴゃ', 'ピャ'])
    .set('pyu', ['ぴゅ', 'ピュ'])
    .set('pyo', ['ぴょ', 'ピョ'])
    .set('fa', ['ふぁ', 'ファ'])
    .set('fi', ['ふぃ', 'フィ'])
    .set('fe', ['ふぇ', 'フェ'])
    .set('fo', ['ふぉ', 'フォ']);

export const kogakimoji: Map<string, Array<string>> = new Map().set('chu', ['っ', 'ッ']);

export const hatsuon: Map<string, Array<string>> = new Map().set('n', ['ん', 'ン']);

export const gailaigo: Map<string, Array<string>> = new Map().set('di', ['でぃ', 'ディ']);
