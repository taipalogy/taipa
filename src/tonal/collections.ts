import { TonalLetterTags } from './version2';

// m, n, ng
export const nasalInitialSounds = [
  TonalLetterTags.m.toString(),
  TonalLetterTags.n.toString(),
  TonalLetterTags.ng.toString(),
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

// j, l, s
export const euphonicFinalsJls = [
  TonalLetterTags.j.toString(),
  TonalLetterTags.l.toString(),
  TonalLetterTags.s.toString(),
];

// b, g, k, p
export const euphonicFinalsBgkp = [
  TonalLetterTags.b.toString(),
  TonalLetterTags.g.toString(),
  TonalLetterTags.k.toString(),
  TonalLetterTags.p.toString(),
];

// jj, ll, ss
export const euphonicFinalsJjllss = [
  TonalLetterTags.jj.toString(),
  TonalLetterTags.ll.toString(),
  TonalLetterTags.ss.toString(),
];

// bb, gg, kk, pp
export const finalsBBggkkpp = [
  TonalLetterTags.bb.toString(),
  TonalLetterTags.gg.toString(),
  TonalLetterTags.kk.toString(),
  TonalLetterTags.pp.toString(),
];

export const initialsForT = {
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
  .set(TonalLetterTags.t + initialsForT.p, TonalLetterTags.p)
  .set(TonalLetterTags.t + initialsForT.v, TonalLetterTags.p)
  .set(TonalLetterTags.t + initialsForT.k, TonalLetterTags.k)
  .set(TonalLetterTags.t + initialsForT.q, TonalLetterTags.k)
  .set(TonalLetterTags.t + initialsForT.g, TonalLetterTags.g)
  .set(TonalLetterTags.t + initialsForT.j, TonalLetterTags.j)
  .set(TonalLetterTags.t + initialsForT.m, TonalLetterTags.h)
  .set(TonalLetterTags.t + initialsForT.n, TonalLetterTags.h)
  .set(TonalLetterTags.t + initialsForT.ng, TonalLetterTags.h)
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

export const finalOfPhrasalVerbParticle = new Map<string, TonalLetterTags>()
  .set(TonalLetterTags.h, TonalLetterTags.hh)
  .set(TonalLetterTags.p, TonalLetterTags.pp);

/** turn preceding finals to voiced ones */
export const voicelessVoicedFinals = new Map<string, string>()
  .set(TonalLetterTags.p, TonalLetterTags.b)
  .set(TonalLetterTags.t, TonalLetterTags.l)
  .set(TonalLetterTags.k, TonalLetterTags.g)
  .set(TonalLetterTags.pp, TonalLetterTags.bb)
  .set(TonalLetterTags.tt, TonalLetterTags.ll)
  .set(TonalLetterTags.kk, TonalLetterTags.gg);

export const voicedVoicelessFinals = new Map<string, TonalLetterTags>()
  .set(TonalLetterTags.b, TonalLetterTags.p)
  .set(TonalLetterTags.l, TonalLetterTags.t)
  .set(TonalLetterTags.g, TonalLetterTags.k)
  .set(TonalLetterTags.bb, TonalLetterTags.pp)
  .set(TonalLetterTags.ll, TonalLetterTags.tt)
  .set(TonalLetterTags.gg, TonalLetterTags.kk);

/** unchanged sounds for b, g, j, l, s, bb, gg, jj, ll, ss */
export const finalBgjlsbbggjjllss = new Map<string, TonalLetterTags[]>()
  .set(TonalLetterTags.b, [TonalLetterTags.p, TonalLetterTags.t])
  .set(TonalLetterTags.g, [TonalLetterTags.k, TonalLetterTags.t])
  .set(TonalLetterTags.j, [TonalLetterTags.t])
  .set(TonalLetterTags.l, [TonalLetterTags.l, TonalLetterTags.t])
  .set(TonalLetterTags.s, [TonalLetterTags.t])
  .set(TonalLetterTags.bb, [TonalLetterTags.pp, TonalLetterTags.tt])
  .set(TonalLetterTags.gg, [TonalLetterTags.kk, TonalLetterTags.tt])
  .set(TonalLetterTags.jj, [TonalLetterTags.tt])
  .set(TonalLetterTags.ll, [TonalLetterTags.ll, TonalLetterTags.tt])
  .set(TonalLetterTags.ss, [TonalLetterTags.tt]);
