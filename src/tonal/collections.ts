import { TonalLetterTags } from './version2';

// m, n, ng
const nasalConsonants = [
  TonalLetterTags.m.toString(),
  TonalLetterTags.n.toString(),
  TonalLetterTags.ng.toString(),
];

export const nasalInitialConsonants = nasalConsonants;

export const nasalFinalConsonants = nasalConsonants;

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
export const toneLettersWx = [
  TonalLetterTags.w.toString(),
  TonalLetterTags.x.toString(),
];

// b, l, g, m, n
export const epentheticLetters = [
  TonalLetterTags.b.toString(),
  TonalLetterTags.l.toString(),
  TonalLetterTags.g.toString(),
  TonalLetterTags.m.toString(),
  TonalLetterTags.n.toString(),
];

// j, l, s for 1st, 3rd, 5th checked tones
export const finalConsonantsJls = [
  TonalLetterTags.j.toString(),
  TonalLetterTags.l.toString(),
  TonalLetterTags.s.toString(),
];

// j, l, s for 1st, 3rd checked tones
export const finalConsonantsJs = [
  TonalLetterTags.j.toString(),
  TonalLetterTags.s.toString(),
];

// b, g, k, p
export const finalConsonantsBgkp = [
  TonalLetterTags.b.toString(),
  TonalLetterTags.g.toString(),
  TonalLetterTags.k.toString(),
  TonalLetterTags.p.toString(),
];

// sandhi final m, ng for final n
export const finalConsonantsMng = [
  TonalLetterTags.m.toString(),
  TonalLetterTags.ng.toString(),
];

export const initialConsonantsForFinalT = {
  ph: TonalLetterTags.ph.toString(),
  kh: TonalLetterTags.kh.toString(),
  b: TonalLetterTags.b.toString(),
  g: TonalLetterTags.g.toString(),

  j: TonalLetterTags.j.toString(),
  k: TonalLetterTags.k.toString(),
  s: TonalLetterTags.s.toString(),
  p: TonalLetterTags.p.toString(),

  m: TonalLetterTags.m.toString(),
  n: TonalLetterTags.n.toString(),
  ng: TonalLetterTags.ng.toString(),
};

export const initialConsonantsForTT = {
  ph: TonalLetterTags.ph.toString(),
  kh: TonalLetterTags.kh.toString(),
  g: TonalLetterTags.g.toString(),

  b: TonalLetterTags.b.toString(),
  j: TonalLetterTags.j.toString(),

  k: TonalLetterTags.k.toString(),
  s: TonalLetterTags.s.toString(),
  p: TonalLetterTags.p.toString(),

  m: TonalLetterTags.m.toString(),
  n: TonalLetterTags.n.toString(),
  ng: TonalLetterTags.ng.toString(),
};

// tt, t
export const ttInitialTInitialPairs = new Map<string, TonalLetterTags>()
  .set(TonalLetterTags.t + initialConsonantsForFinalT.ph, TonalLetterTags.p)
  .set(TonalLetterTags.t + initialConsonantsForFinalT.p, TonalLetterTags.p)
  .set(TonalLetterTags.t + initialConsonantsForFinalT.kh, TonalLetterTags.k)
  .set(TonalLetterTags.t + initialConsonantsForFinalT.k, TonalLetterTags.k)
  .set(TonalLetterTags.t + initialConsonantsForFinalT.g, TonalLetterTags.g)
  .set(
    TonalLetterTags.t + TonalLetterTags.f + initialConsonantsForFinalT.j,
    TonalLetterTags.j
  )
  .set(TonalLetterTags.t + initialConsonantsForFinalT.m, TonalLetterTags.h)
  .set(TonalLetterTags.t + initialConsonantsForFinalT.n, TonalLetterTags.h)
  .set(TonalLetterTags.t + initialConsonantsForFinalT.ng, TonalLetterTags.h)
  .set(TonalLetterTags.tt + initialConsonantsForTT.ph, TonalLetterTags.pp)
  .set(TonalLetterTags.tt + initialConsonantsForTT.p, TonalLetterTags.pp)
  .set(TonalLetterTags.tt + initialConsonantsForTT.kh, TonalLetterTags.kk)
  .set(TonalLetterTags.tt + initialConsonantsForTT.k, TonalLetterTags.kk)
  .set(TonalLetterTags.tt + initialConsonantsForTT.g, TonalLetterTags.gg)
  .set(TonalLetterTags.tt + initialConsonantsForTT.b, TonalLetterTags.bb)
  .set(TonalLetterTags.tt + initialConsonantsForTT.j, TonalLetterTags.jj)
  .set(TonalLetterTags.tt + initialConsonantsForTT.s, TonalLetterTags.ss)
  .set(TonalLetterTags.tt + initialConsonantsForTT.m, TonalLetterTags.hh)
  .set(TonalLetterTags.tt + initialConsonantsForTT.n, TonalLetterTags.hh)
  .set(TonalLetterTags.tt + initialConsonantsForTT.ng, TonalLetterTags.hh);

// b, g, h, j, l
export const initialConsonantsBghjl = [
  // mutate preceding finals to voiced ones
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
export const voicelessVoicedFinalConsonants = new Map<string, string>()
  .set(TonalLetterTags.p, TonalLetterTags.b)
  .set(TonalLetterTags.t, TonalLetterTags.l)
  .set(TonalLetterTags.k, TonalLetterTags.g)
  .set(TonalLetterTags.pp, TonalLetterTags.bb)
  .set(TonalLetterTags.tt, TonalLetterTags.ll)
  .set(TonalLetterTags.kk, TonalLetterTags.gg);

export const voicedVoicelessFinalConsonants = new Map<string, TonalLetterTags>()
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

/** sandhi final consonants b, g, j, l, s, bb, gg, jj, ll, ss */
export const finalConsonantsBgjlsbbggjjllss = [
  TonalLetterTags.b.toString(),
  TonalLetterTags.g.toString(),
  TonalLetterTags.j.toString(),
  TonalLetterTags.l.toString(),
  TonalLetterTags.s.toString(),
  TonalLetterTags.bb.toString(),
  TonalLetterTags.gg.toString(),
  TonalLetterTags.jj.toString(),
  TonalLetterTags.ll.toString(),
  TonalLetterTags.ss.toString(),
];

/** unchanged final consonants for b, g, j, l, s, bb, gg, jj, ll, ss */
export const finalConsonantsForBgjlsbbggjjllss = new Map<
  string,
  TonalLetterTags[]
>()
  // keys are for the has method
  // keys and values are for the get method. keys are finals plus no tonals
  .set(TonalLetterTags.b, [TonalLetterTags.p, TonalLetterTags.t])
  .set(TonalLetterTags.g, [TonalLetterTags.k, TonalLetterTags.t])
  .set(TonalLetterTags.j, [TonalLetterTags.t])
  .set(TonalLetterTags.l, [TonalLetterTags.t])
  .set(TonalLetterTags.s, [TonalLetterTags.t])
  .set(TonalLetterTags.bb, [TonalLetterTags.pp, TonalLetterTags.tt])
  .set(TonalLetterTags.gg, [TonalLetterTags.kk, TonalLetterTags.tt])
  .set(TonalLetterTags.jj, [TonalLetterTags.tt])
  .set(TonalLetterTags.ll, [TonalLetterTags.tt])
  .set(TonalLetterTags.ss, [TonalLetterTags.tt]);

export const finalConsonantsForBgjlsFw = new Map<string, TonalLetterTags[]>()
  // both keys and values are for the has method
  // the has method will not reach the below pairs
  .set(TonalLetterTags.b + TonalLetterTags.f, [
    TonalLetterTags.p,
    TonalLetterTags.t,
  ])
  .set(TonalLetterTags.b + TonalLetterTags.w, [
    TonalLetterTags.pp,
    TonalLetterTags.tt,
  ])
  .set(TonalLetterTags.g + TonalLetterTags.f, [
    TonalLetterTags.k,
    TonalLetterTags.t,
  ])
  .set(TonalLetterTags.g + TonalLetterTags.w, [
    TonalLetterTags.kk,
    TonalLetterTags.tt,
  ])
  .set(TonalLetterTags.l + TonalLetterTags.f, [TonalLetterTags.t])
  .set(TonalLetterTags.l + TonalLetterTags.w, [TonalLetterTags.tt])
  .set(TonalLetterTags.j + TonalLetterTags.f, [TonalLetterTags.t])
  .set(TonalLetterTags.j + TonalLetterTags.w, [TonalLetterTags.tt])
  .set(TonalLetterTags.s + TonalLetterTags.f, [TonalLetterTags.t])
  .set(TonalLetterTags.s + TonalLetterTags.w, [TonalLetterTags.tt]);

export const fourthFinalConsonants = {
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

export const fourthToEighthFinalConsonants = new Map<string, TonalLetterTags>()
  .set(TonalLetterTags.p, TonalLetterTags.pp)
  .set(TonalLetterTags.t, TonalLetterTags.tt)
  .set(TonalLetterTags.k, TonalLetterTags.kk)
  .set(TonalLetterTags.h, TonalLetterTags.hh);

export const sandhiFinalPPpttt = [
  TonalLetterTags.p.toString(),
  TonalLetterTags.pp.toString(),
  TonalLetterTags.t.toString(),
  TonalLetterTags.tt.toString(),
];

/** map eighth checked finals to fourth ones */
export const eighthToFourthFinalConsonants = new Map<string, string>()
  .set(TonalLetterTags.bb, fourthFinalConsonants.b.toString())
  .set(TonalLetterTags.gg, fourthFinalConsonants.g.toString())
  .set(TonalLetterTags.hh, fourthFinalConsonants.h.toString())
  .set(TonalLetterTags.jj, fourthFinalConsonants.j.toString())
  .set(TonalLetterTags.kk, fourthFinalConsonants.k.toString())
  .set(TonalLetterTags.ll, fourthFinalConsonants.l.toString())
  .set(TonalLetterTags.pp, fourthFinalConsonants.p.toString())
  .set(TonalLetterTags.ss, fourthFinalConsonants.s.toString())
  .set(TonalLetterTags.tt, fourthFinalConsonants.t.toString());

export const finalConsonantsForTransfix = new Map<string, string>()
  .set(TonalLetterTags.h, TonalLetterTags.hh.toString())
  .set(TonalLetterTags.t, TonalLetterTags.tt.toString());

export const impossibleSequences: string[] = [
  // TonalLetterTags.d.toString(),
  // TonalLetterTags.q.toString(),
  // TonalLetterTags.v.toString(),
];
