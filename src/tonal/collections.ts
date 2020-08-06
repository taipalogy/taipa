import { TonalLetterTags } from './version2';

// m, n, ng
const nasals = [
  TonalLetterTags.m.toString(),
  TonalLetterTags.n.toString(),
  TonalLetterTags.ng.toString(),
];

export const nasalInitials = nasals;

export const nasalFinals = nasals;

export const combiningRules = new Map<string, TonalLetterTags[]>()
  .set(TonalLetterTags.zero, [TonalLetterTags.z])
  .set(TonalLetterTags.y, [TonalLetterTags.zero, TonalLetterTags.f])
  .set(TonalLetterTags.w, [TonalLetterTags.y])
  .set(TonalLetterTags.x, [TonalLetterTags.z, TonalLetterTags.w])
  .set(TonalLetterTags.z, [TonalLetterTags.w])
  .set(TonalLetterTags.p, [
    TonalLetterTags.f,
    TonalLetterTags.w,
    TonalLetterTags.x,
  ])
  .set(TonalLetterTags.t, [
    TonalLetterTags.f,
    TonalLetterTags.w,
    TonalLetterTags.x,
  ])
  .set(TonalLetterTags.k, [
    TonalLetterTags.f,
    TonalLetterTags.w,
    TonalLetterTags.x,
  ])
  .set(TonalLetterTags.h, [
    TonalLetterTags.y,
    TonalLetterTags.f,
    TonalLetterTags.w,
    TonalLetterTags.x,
  ])
  .set(TonalLetterTags.pp, [TonalLetterTags.w, TonalLetterTags.x])
  .set(TonalLetterTags.tt, [TonalLetterTags.w, TonalLetterTags.x])
  .set(TonalLetterTags.kk, [TonalLetterTags.w, TonalLetterTags.x])
  .set(TonalLetterTags.hh, [TonalLetterTags.w, TonalLetterTags.x]);

// w, x
export const tonalsWx = [
  TonalLetterTags.w.toString(),
  TonalLetterTags.x.toString(),
];

// b, l, g, m, n
export const epentheticSounds = [
  TonalLetterTags.b.toString(),
  TonalLetterTags.l.toString(),
  TonalLetterTags.g.toString(),
  TonalLetterTags.m.toString(),
  TonalLetterTags.n.toString(),
];

// j, l, s for first checked tones
export const finalsJls = [
  TonalLetterTags.j.toString(),
  TonalLetterTags.l.toString(),
  TonalLetterTags.s.toString(),
];

// b, g, k, p
export const finalsBgkp = [
  TonalLetterTags.b.toString(),
  TonalLetterTags.g.toString(),
  TonalLetterTags.k.toString(),
  TonalLetterTags.p.toString(),
];

// l, s for third and fifth checked tones
export const finalsLs = [
  TonalLetterTags.l.toString(),
  TonalLetterTags.s.toString(),
];

// bb, gg, kk, pp
export const finalsBBggkkpp = [
  TonalLetterTags.bb.toString(),
  TonalLetterTags.gg.toString(),
  TonalLetterTags.kk.toString(),
  TonalLetterTags.pp.toString(),
];

export const initialsForFinalT = {
  p: TonalLetterTags.p.toString(),
  k: TonalLetterTags.k.toString(),
  b: TonalLetterTags.b.toString(),
  g: TonalLetterTags.g.toString(),

  j: TonalLetterTags.j.toString(),
  q: TonalLetterTags.q.toString(),
  s: TonalLetterTags.s.toString(),
  v: TonalLetterTags.v.toString(),

  m: TonalLetterTags.m.toString(),
  n: TonalLetterTags.n.toString(),
  ng: TonalLetterTags.ng.toString(),
};

export const initialsForTT = {
  p: TonalLetterTags.p.toString(),
  k: TonalLetterTags.k.toString(),
  g: TonalLetterTags.g.toString(),

  b: TonalLetterTags.b.toString(),
  j: TonalLetterTags.j.toString(),

  q: TonalLetterTags.q.toString(),
  s: TonalLetterTags.s.toString(),
  v: TonalLetterTags.v.toString(),

  m: TonalLetterTags.m.toString(),
  n: TonalLetterTags.n.toString(),
  ng: TonalLetterTags.ng.toString(),
};

// tt, t
export const ttInitialTInitialPairs = new Map<string, TonalLetterTags>()
  .set(TonalLetterTags.t + initialsForFinalT.p, TonalLetterTags.p)
  .set(TonalLetterTags.t + initialsForFinalT.v, TonalLetterTags.p)
  .set(TonalLetterTags.t + initialsForFinalT.k, TonalLetterTags.k)
  .set(TonalLetterTags.t + initialsForFinalT.q, TonalLetterTags.k)
  .set(TonalLetterTags.t + initialsForFinalT.g, TonalLetterTags.g)
  .set(
    TonalLetterTags.t + TonalLetterTags.f + initialsForFinalT.j,
    TonalLetterTags.j
  )
  .set(
    TonalLetterTags.t + TonalLetterTags.w + initialsForFinalT.j,
    TonalLetterTags.l
  )
  .set(TonalLetterTags.t + initialsForFinalT.m, TonalLetterTags.h)
  .set(TonalLetterTags.t + initialsForFinalT.n, TonalLetterTags.h)
  .set(TonalLetterTags.t + initialsForFinalT.ng, TonalLetterTags.h)
  .set(TonalLetterTags.tt + initialsForTT.p, TonalLetterTags.pp)
  .set(TonalLetterTags.tt + initialsForTT.v, TonalLetterTags.pp)
  .set(TonalLetterTags.tt + initialsForTT.k, TonalLetterTags.kk)
  .set(TonalLetterTags.tt + initialsForTT.q, TonalLetterTags.kk)
  .set(TonalLetterTags.tt + initialsForTT.g, TonalLetterTags.gg)
  .set(TonalLetterTags.tt + initialsForTT.b, TonalLetterTags.ll)
  .set(TonalLetterTags.tt + initialsForTT.j, TonalLetterTags.ll)
  .set(TonalLetterTags.tt + initialsForTT.s, TonalLetterTags.ss)
  .set(TonalLetterTags.tt + initialsForTT.m, TonalLetterTags.hh)
  .set(TonalLetterTags.tt + initialsForTT.n, TonalLetterTags.hh)
  .set(TonalLetterTags.tt + initialsForTT.ng, TonalLetterTags.hh);

// b, g, h, j, l
export const initialsBghjl = [
  // turn preceding finals to voiced ones
  TonalLetterTags.b.toString(),
  TonalLetterTags.g.toString(),
  TonalLetterTags.h.toString(),
  TonalLetterTags.j.toString(),
  TonalLetterTags.l.toString(),
];

// 8 to 1
export const eighthToFirst = new Map<string, TonalLetterTags>()
  .set(TonalLetterTags.pp, TonalLetterTags.p)
  .set(TonalLetterTags.tt, TonalLetterTags.t)
  .set(TonalLetterTags.kk, TonalLetterTags.k)
  .set(TonalLetterTags.hh, TonalLetterTags.h);

/** Turn preceding finals to voiced ones. Unvoiced to voiced */
export const voicelessVoicedFinals = new Map<string, string>()
  .set(TonalLetterTags.p, TonalLetterTags.b)
  .set(TonalLetterTags.t, TonalLetterTags.l)
  .set(TonalLetterTags.k, TonalLetterTags.g)
  .set(TonalLetterTags.pp, TonalLetterTags.bb)
  .set(TonalLetterTags.tt, TonalLetterTags.ll)
  .set(TonalLetterTags.kk, TonalLetterTags.gg);

export const voicedVoicelessFinals = new Map<string, TonalLetterTags>()
  .set(TonalLetterTags.b, TonalLetterTags.p) // external sandhi
  .set(TonalLetterTags.l, TonalLetterTags.t)
  .set(TonalLetterTags.g, TonalLetterTags.k)
  .set(TonalLetterTags.b + TonalLetterTags.f, TonalLetterTags.p) // internal sandhi
  .set(TonalLetterTags.b + TonalLetterTags.x, TonalLetterTags.pp)
  .set(TonalLetterTags.l + TonalLetterTags.f, TonalLetterTags.t)
  .set(TonalLetterTags.l + TonalLetterTags.x, TonalLetterTags.tt)
  .set(TonalLetterTags.g + TonalLetterTags.f, TonalLetterTags.k)
  .set(TonalLetterTags.g + TonalLetterTags.x, TonalLetterTags.kk)
  .set(TonalLetterTags.bb, TonalLetterTags.pp) // external sandhi
  .set(TonalLetterTags.ll, TonalLetterTags.tt)
  .set(TonalLetterTags.gg, TonalLetterTags.kk);

/** unchanged sounds for b, g, j, l, s, bb, gg, ll, ss */
export const finalsBgjlsbbggllss = new Map<string, TonalLetterTags[]>()
  // keys are for the has method
  // keys and values are for the get method. keys are finals plus no tonals
  .set(TonalLetterTags.b, [TonalLetterTags.p, TonalLetterTags.t])
  .set(TonalLetterTags.g, [TonalLetterTags.k, TonalLetterTags.t])
  .set(TonalLetterTags.j, [TonalLetterTags.t])
  .set(TonalLetterTags.l, [TonalLetterTags.l, TonalLetterTags.t])
  .set(TonalLetterTags.s, [TonalLetterTags.t])
  .set(TonalLetterTags.bb, [TonalLetterTags.pp, TonalLetterTags.tt])
  .set(TonalLetterTags.gg, [TonalLetterTags.kk, TonalLetterTags.tt])
  .set(TonalLetterTags.ll, [TonalLetterTags.ll, TonalLetterTags.tt])
  .set(TonalLetterTags.ss, [TonalLetterTags.tt])
  // both keys and values are for the has method
  // the has method will not reach these pairs
  .set(TonalLetterTags.s + TonalLetterTags.w, [TonalLetterTags.tt])
  .set(TonalLetterTags.b + TonalLetterTags.f, [
    TonalLetterTags.p,
    TonalLetterTags.t,
  ])
  .set(TonalLetterTags.g + TonalLetterTags.f, [
    TonalLetterTags.k,
    TonalLetterTags.t,
  ])
  .set(TonalLetterTags.j + TonalLetterTags.f, [TonalLetterTags.t])
  .set(TonalLetterTags.l + TonalLetterTags.f, [TonalLetterTags.t])
  .set(TonalLetterTags.g + TonalLetterTags.w, [
    TonalLetterTags.kk,
    TonalLetterTags.tt,
  ])
  .set(TonalLetterTags.g + TonalLetterTags.x, [
    TonalLetterTags.kk,
    TonalLetterTags.tt,
  ])
  .set(TonalLetterTags.l + TonalLetterTags.w, [TonalLetterTags.tt]);

export const fourthFinals = {
  p: TonalLetterTags.p.toString(),
  t: TonalLetterTags.t.toString(),
  k: TonalLetterTags.k.toString(),
  h: TonalLetterTags.h.toString(),
  b: TonalLetterTags.b.toString(),
  g: TonalLetterTags.g.toString(),
  j: TonalLetterTags.j.toString(),
  l: TonalLetterTags.l.toString(),
  s: TonalLetterTags.s.toString(),
};

export const fourthToEighthFinals = new Map<string, TonalLetterTags>()
  .set(TonalLetterTags.p, TonalLetterTags.pp)
  .set(TonalLetterTags.t, TonalLetterTags.tt)
  .set(TonalLetterTags.k, TonalLetterTags.kk)
  .set(TonalLetterTags.h, TonalLetterTags.hh);

export const sandhiFinalsPPpttt = [
  TonalLetterTags.p.toString(),
  TonalLetterTags.pp.toString(),
  TonalLetterTags.t.toString(),
  TonalLetterTags.tt.toString(),
];

/** map eighth checked finals to fourth ones */
export const eighthToFourthFinals = new Map<string, string>()
  .set(TonalLetterTags.bb, fourthFinals.b.toString())
  .set(TonalLetterTags.gg, fourthFinals.g.toString())
  .set(TonalLetterTags.hh, fourthFinals.h.toString())
  .set(TonalLetterTags.kk, fourthFinals.k.toString())
  .set(TonalLetterTags.ll, fourthFinals.l.toString())
  .set(TonalLetterTags.pp, fourthFinals.p.toString())
  .set(TonalLetterTags.ss, fourthFinals.s.toString())
  .set(TonalLetterTags.tt, fourthFinals.t.toString());
