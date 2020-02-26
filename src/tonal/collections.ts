import { TonalLetterTags } from './version2';

export const nasal_initial_sounds = [
    TonalLetterTags.m.toString(),
    TonalLetterTags.n.toString(),
    TonalLetterTags.ng.toString()
];

export const combining_rules = new Map<string, TonalLetterTags[]>()
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

export const third_fifth_tonals_wx = [TonalLetterTags.w.toString(), TonalLetterTags.x.toString()];

export const epenthetic_sounds = [
    TonalLetterTags.b.toString(),
    TonalLetterTags.l.toString(),
    TonalLetterTags.g.toString(),
    TonalLetterTags.m.toString(),
    TonalLetterTags.n.toString()
];

export const euphonic_finals_jls = [
    TonalLetterTags.j.toString(),
    TonalLetterTags.l.toString(),
    TonalLetterTags.s.toString()
];

export const euphonic_finals_bgkp = [
    TonalLetterTags.b.toString(),
    TonalLetterTags.g.toString(),
    TonalLetterTags.k.toString(),
    TonalLetterTags.p.toString()
];

export const euphonic_finals_jjllss = [
    TonalLetterTags.jj.toString(),
    TonalLetterTags.ll.toString(),
    TonalLetterTags.ss.toString()
];

export const euphonic_finals_bbggkkpp = [
    TonalLetterTags.bb.toString(),
    TonalLetterTags.gg.toString(),
    TonalLetterTags.kk.toString(),
    TonalLetterTags.pp.toString()
];

export const initials_for_euphonic_t = [
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

export const initials_for_euphonic_tt = [
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

export const euphonic_t_tt = new Map<string, TonalLetterTags>()
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

export const initial_bghl = [
    // turn preceding finals to voiced ones
    TonalLetterTags.b.toString(),
    TonalLetterTags.g.toString(),
    TonalLetterTags.h.toString(),
    TonalLetterTags.l.toString()
];

export const eighth_to_first = new Map<string, TonalLetterTags>()
    .set(TonalLetterTags.pp, TonalLetterTags.p)
    .set(TonalLetterTags.tt, TonalLetterTags.t)
    .set(TonalLetterTags.kk, TonalLetterTags.k)
    .set(TonalLetterTags.hh, TonalLetterTags.h);
