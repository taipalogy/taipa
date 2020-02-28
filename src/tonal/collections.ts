import { TonalLetterTags } from './version2';

// m, n, ng
export const nasalInitialSounds = [
    TonalLetterTags.m.toString(),
    TonalLetterTags.n.toString(),
    TonalLetterTags.ng.toString()
];

export const combiningRules = new Map<string, TonalLetterTags[]>()
    .set(TonalLetterTags.zero, [TonalLetterTags.z])
    .set(TonalLetterTags.y, [TonalLetterTags.zero, TonalLetterTags.f])
    .set(TonalLetterTags.w, [TonalLetterTags.y])
    .set(TonalLetterTags.x, [TonalLetterTags.z, TonalLetterTags.w])
    .set(TonalLetterTags.z, [TonalLetterTags.w])
    .set(TonalLetterTags.p, [TonalLetterTags.f])
    .set(TonalLetterTags.t, [TonalLetterTags.f])
    .set(TonalLetterTags.k, [TonalLetterTags.f])
    .set(TonalLetterTags.h, [TonalLetterTags.y, TonalLetterTags.f])
    .set(TonalLetterTags.pp, [TonalLetterTags.w, TonalLetterTags.x])
    .set(TonalLetterTags.tt, [TonalLetterTags.w, TonalLetterTags.x])
    .set(TonalLetterTags.kk, [TonalLetterTags.w, TonalLetterTags.x])
    .set(TonalLetterTags.hh, [TonalLetterTags.w, TonalLetterTags.x]);

// w, x
export const tonalsWx = [TonalLetterTags.w.toString(), TonalLetterTags.x.toString()];

// b, l, g, m, n
export const epentheticSounds = [
    TonalLetterTags.b.toString(),
    TonalLetterTags.l.toString(),
    TonalLetterTags.g.toString(),
    TonalLetterTags.m.toString(),
    TonalLetterTags.n.toString()
];

// j, l, s
export const euphonicFinalsJls = [
    TonalLetterTags.j.toString(),
    TonalLetterTags.l.toString(),
    TonalLetterTags.s.toString()
];

// b, g, k, p
export const euphonicFinalsBgkp = [
    TonalLetterTags.b.toString(),
    TonalLetterTags.g.toString(),
    TonalLetterTags.k.toString(),
    TonalLetterTags.p.toString()
];

// jj, ll, ss
export const euphonicFinalsJjllss = [
    TonalLetterTags.jj.toString(),
    TonalLetterTags.ll.toString(),
    TonalLetterTags.ss.toString()
];

// bb, gg, kk, pp
export const euphonicFinalsBbggkkpp = [
    TonalLetterTags.bb.toString(),
    TonalLetterTags.gg.toString(),
    TonalLetterTags.kk.toString(),
    TonalLetterTags.pp.toString()
];

// t
export const initialsForEuphonicT = [
    TonalLetterTags.p.toString(),
    TonalLetterTags.k.toString(),
    TonalLetterTags.b.toString(),
    TonalLetterTags.g.toString(),

    TonalLetterTags.j.toString(),
    TonalLetterTags.q.toString(),
    TonalLetterTags.s.toString(),
    TonalLetterTags.v.toString(),

    TonalLetterTags.m.toString(),
    TonalLetterTags.n.toString(),
    TonalLetterTags.ng.toString()
];

// tt
export const initialsForEuphonicTt = [
    TonalLetterTags.p.toString(),
    TonalLetterTags.k.toString(),
    TonalLetterTags.g.toString(),

    TonalLetterTags.q.toString(),
    TonalLetterTags.s.toString(),
    TonalLetterTags.v.toString(),

    TonalLetterTags.m.toString(),
    TonalLetterTags.n.toString(),
    TonalLetterTags.ng.toString()
];

export const voicelessVoicedFinals = new Map<string, TonalLetterTags>()
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

// tt, t
export const euphonicTtT = new Map<string, TonalLetterTags>()
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

// b, g, h, l
export const initialBghl = [
    // turn preceding finals to voiced ones
    TonalLetterTags.b.toString(),
    TonalLetterTags.g.toString(),
    TonalLetterTags.h.toString(),
    TonalLetterTags.l.toString()
];

// 8 to 1
export const eighthToFirst = new Map<string, TonalLetterTags>()
    .set(TonalLetterTags.pp, TonalLetterTags.p)
    .set(TonalLetterTags.tt, TonalLetterTags.t)
    .set(TonalLetterTags.kk, TonalLetterTags.k)
    .set(TonalLetterTags.hh, TonalLetterTags.h);
