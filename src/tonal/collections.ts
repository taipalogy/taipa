import { ToneLetterTags } from './tonalres';

// m, n, ng
const nasalConsonants = [
  ToneLetterTags.m.toString(),
  ToneLetterTags.n.toString(),
  ToneLetterTags.ng.toString(),
];

export const nasalInitialConsonants = nasalConsonants;

export const nasalFinalConsonants = nasalConsonants;

export const combiningRules = new Map<string, ToneLetterTags[]>()
  .set(ToneLetterTags.zero, [ToneLetterTags.z])
  .set(ToneLetterTags.y, [ToneLetterTags.zero, ToneLetterTags.f])
  .set(ToneLetterTags.w, [ToneLetterTags.y])
  .set(ToneLetterTags.x, [ToneLetterTags.z, ToneLetterTags.w])
  .set(ToneLetterTags.z, [ToneLetterTags.w])
  .set(ToneLetterTags.p, [ToneLetterTags.f, ToneLetterTags.w, ToneLetterTags.x])
  .set(ToneLetterTags.t, [ToneLetterTags.f, ToneLetterTags.w, ToneLetterTags.x])
  .set(ToneLetterTags.k, [ToneLetterTags.f, ToneLetterTags.w, ToneLetterTags.x])
  .set(ToneLetterTags.h, [
    ToneLetterTags.y,
    ToneLetterTags.f,
    ToneLetterTags.w,
    ToneLetterTags.x,
  ])
  .set(ToneLetterTags.pp, [ToneLetterTags.w, ToneLetterTags.x])
  .set(ToneLetterTags.tt, [ToneLetterTags.w, ToneLetterTags.x])
  .set(ToneLetterTags.kk, [ToneLetterTags.w, ToneLetterTags.x])
  .set(ToneLetterTags.hh, [ToneLetterTags.w, ToneLetterTags.x]);

// w, x
export const toneLettersWx = [
  ToneLetterTags.w.toString(),
  ToneLetterTags.x.toString(),
];

// b, l, g, m, n
export const epentheticLetters = [
  ToneLetterTags.b.toString(),
  ToneLetterTags.l.toString(),
  ToneLetterTags.g.toString(),
  ToneLetterTags.m.toString(),
  ToneLetterTags.n.toString(),
];

// j, l, s for 1st, 3rd, 5th checked tones
export const finalConsonantsJls = [
  ToneLetterTags.j.toString(),
  ToneLetterTags.l.toString(),
  ToneLetterTags.s.toString(),
];

// j, l, s for 1st, 3rd checked tones
export const finalConsonantsJs = [
  ToneLetterTags.j.toString(),
  ToneLetterTags.s.toString(),
];

// b, g, k, p
export const finalConsonantsBgkp = [
  ToneLetterTags.b.toString(),
  ToneLetterTags.g.toString(),
  ToneLetterTags.k.toString(),
  ToneLetterTags.p.toString(),
];

// sandhi final m, ng for final n
export const finalConsonantsMng = [
  ToneLetterTags.m.toString(),
  ToneLetterTags.ng.toString(),
];

export const initialConsonantsForFinalT = {
  ph: ToneLetterTags.ph.toString(),
  kh: ToneLetterTags.kh.toString(),
  b: ToneLetterTags.b.toString(),
  g: ToneLetterTags.g.toString(),

  j: ToneLetterTags.j.toString(),
  k: ToneLetterTags.k.toString(),
  s: ToneLetterTags.s.toString(),
  p: ToneLetterTags.p.toString(),

  m: ToneLetterTags.m.toString(),
  n: ToneLetterTags.n.toString(),
  ng: ToneLetterTags.ng.toString(),
};

export const initialConsonantsForTT = {
  ph: ToneLetterTags.ph.toString(),
  kh: ToneLetterTags.kh.toString(),
  g: ToneLetterTags.g.toString(),

  b: ToneLetterTags.b.toString(),
  j: ToneLetterTags.j.toString(),

  k: ToneLetterTags.k.toString(),
  s: ToneLetterTags.s.toString(),
  p: ToneLetterTags.p.toString(),

  m: ToneLetterTags.m.toString(),
  n: ToneLetterTags.n.toString(),
  ng: ToneLetterTags.ng.toString(),
};

// tt, t
export const ttInitialTInitialPairs = new Map<string, ToneLetterTags>()
  .set(ToneLetterTags.t + initialConsonantsForFinalT.ph, ToneLetterTags.p)
  .set(ToneLetterTags.t + initialConsonantsForFinalT.p, ToneLetterTags.p)
  .set(ToneLetterTags.t + initialConsonantsForFinalT.kh, ToneLetterTags.k)
  .set(ToneLetterTags.t + initialConsonantsForFinalT.k, ToneLetterTags.k)
  .set(ToneLetterTags.t + initialConsonantsForFinalT.g, ToneLetterTags.g)
  .set(
    ToneLetterTags.t + ToneLetterTags.f + initialConsonantsForFinalT.j,
    ToneLetterTags.j
  )
  .set(ToneLetterTags.t + initialConsonantsForFinalT.m, ToneLetterTags.h)
  .set(ToneLetterTags.t + initialConsonantsForFinalT.n, ToneLetterTags.h)
  .set(ToneLetterTags.t + initialConsonantsForFinalT.ng, ToneLetterTags.h)
  .set(ToneLetterTags.tt + initialConsonantsForTT.ph, ToneLetterTags.pp)
  .set(ToneLetterTags.tt + initialConsonantsForTT.p, ToneLetterTags.pp)
  .set(ToneLetterTags.tt + initialConsonantsForTT.kh, ToneLetterTags.kk)
  .set(ToneLetterTags.tt + initialConsonantsForTT.k, ToneLetterTags.kk)
  .set(ToneLetterTags.tt + initialConsonantsForTT.g, ToneLetterTags.gg)
  .set(ToneLetterTags.tt + initialConsonantsForTT.b, ToneLetterTags.bb)
  .set(ToneLetterTags.tt + initialConsonantsForTT.j, ToneLetterTags.jj)
  .set(ToneLetterTags.tt + initialConsonantsForTT.s, ToneLetterTags.ss)
  .set(ToneLetterTags.tt + initialConsonantsForTT.m, ToneLetterTags.hh)
  .set(ToneLetterTags.tt + initialConsonantsForTT.n, ToneLetterTags.hh)
  .set(ToneLetterTags.tt + initialConsonantsForTT.ng, ToneLetterTags.hh);

// b, g, h, j, l
export const initialConsonantsBghjl = [
  // mutate preceding finals to voiced ones
  ToneLetterTags.b.toString(),
  ToneLetterTags.g.toString(),
  ToneLetterTags.h.toString(),
  ToneLetterTags.j.toString(),
  ToneLetterTags.l.toString(),
];

/** Turn preceding finals to voiced ones. Unvoiced to voiced */
export const voicelessVoicedFinalConsonants = new Map<string, string>()
  .set(ToneLetterTags.p, ToneLetterTags.b)
  .set(ToneLetterTags.t, ToneLetterTags.l)
  .set(ToneLetterTags.k, ToneLetterTags.g)
  .set(ToneLetterTags.pp, ToneLetterTags.bb)
  .set(ToneLetterTags.tt, ToneLetterTags.ll)
  .set(ToneLetterTags.kk, ToneLetterTags.gg);

export const voicedVoicelessFinalConsonants = new Map<string, ToneLetterTags>()
  .set(ToneLetterTags.b, ToneLetterTags.p) // external sandhi
  .set(ToneLetterTags.l, ToneLetterTags.t)
  .set(ToneLetterTags.g, ToneLetterTags.k)
  .set(ToneLetterTags.b + ToneLetterTags.f, ToneLetterTags.p) // internal sandhi
  .set(ToneLetterTags.b + ToneLetterTags.x, ToneLetterTags.pp)
  .set(ToneLetterTags.l + ToneLetterTags.f, ToneLetterTags.t)
  .set(ToneLetterTags.l + ToneLetterTags.x, ToneLetterTags.tt)
  .set(ToneLetterTags.g + ToneLetterTags.f, ToneLetterTags.k)
  .set(ToneLetterTags.g + ToneLetterTags.x, ToneLetterTags.kk)
  .set(ToneLetterTags.bb, ToneLetterTags.pp) // external sandhi
  .set(ToneLetterTags.ll, ToneLetterTags.tt)
  .set(ToneLetterTags.gg, ToneLetterTags.kk);

/** sandhi final consonants b, g, j, l, s, bb, gg, jj, ll, ss */
export const finalConsonantsBgjlsbbggjjllss = [
  ToneLetterTags.b.toString(),
  ToneLetterTags.g.toString(),
  ToneLetterTags.j.toString(),
  ToneLetterTags.l.toString(),
  ToneLetterTags.s.toString(),
  ToneLetterTags.bb.toString(),
  ToneLetterTags.gg.toString(),
  ToneLetterTags.jj.toString(),
  ToneLetterTags.ll.toString(),
  ToneLetterTags.ss.toString(),
];

/** unchanged final consonants for b, g, j, l, s, bb, gg, jj, ll, ss */
export const finalConsonantsForBgjlsbbggjjllss = new Map<
  string,
  ToneLetterTags[]
>()
  // keys are for the has method
  // keys and values are for the get method. keys are finals plus no tonals
  .set(ToneLetterTags.b, [ToneLetterTags.p, ToneLetterTags.t])
  .set(ToneLetterTags.g, [ToneLetterTags.k, ToneLetterTags.t])
  .set(ToneLetterTags.j, [ToneLetterTags.t])
  .set(ToneLetterTags.l, [ToneLetterTags.t])
  .set(ToneLetterTags.s, [ToneLetterTags.t])
  .set(ToneLetterTags.bb, [ToneLetterTags.pp, ToneLetterTags.tt])
  .set(ToneLetterTags.gg, [ToneLetterTags.kk, ToneLetterTags.tt])
  .set(ToneLetterTags.jj, [ToneLetterTags.tt])
  .set(ToneLetterTags.ll, [ToneLetterTags.tt])
  .set(ToneLetterTags.ss, [ToneLetterTags.tt]);

export const finalConsonantsForBgjlsFw = new Map<string, ToneLetterTags[]>()
  // both keys and values are for the has method
  // the has method will not reach the below pairs
  .set(ToneLetterTags.b + ToneLetterTags.f, [
    ToneLetterTags.p,
    ToneLetterTags.t,
  ])
  .set(ToneLetterTags.b + ToneLetterTags.w, [
    ToneLetterTags.pp,
    ToneLetterTags.tt,
  ])
  .set(ToneLetterTags.g + ToneLetterTags.f, [
    ToneLetterTags.k,
    ToneLetterTags.t,
  ])
  .set(ToneLetterTags.g + ToneLetterTags.w, [
    ToneLetterTags.kk,
    ToneLetterTags.tt,
  ])
  .set(ToneLetterTags.l + ToneLetterTags.f, [ToneLetterTags.t])
  .set(ToneLetterTags.l + ToneLetterTags.w, [ToneLetterTags.tt])
  .set(ToneLetterTags.j + ToneLetterTags.f, [ToneLetterTags.t])
  .set(ToneLetterTags.j + ToneLetterTags.w, [ToneLetterTags.tt])
  .set(ToneLetterTags.s + ToneLetterTags.f, [ToneLetterTags.t])
  .set(ToneLetterTags.s + ToneLetterTags.w, [ToneLetterTags.tt]);

export const fourthFinalConsonants = {
  p: ToneLetterTags.p.toString(),
  t: ToneLetterTags.t.toString(),
  k: ToneLetterTags.k.toString(),
  h: ToneLetterTags.h.toString(),
  b: ToneLetterTags.b.toString(),
  g: ToneLetterTags.g.toString(),
  j: ToneLetterTags.j.toString(),
  l: ToneLetterTags.l.toString(),
  s: ToneLetterTags.s.toString(),
};

export const fourthToEighthFinalConsonants = new Map<string, ToneLetterTags>()
  .set(ToneLetterTags.p, ToneLetterTags.pp)
  .set(ToneLetterTags.t, ToneLetterTags.tt)
  .set(ToneLetterTags.k, ToneLetterTags.kk)
  .set(ToneLetterTags.h, ToneLetterTags.hh);

export const sandhiFinalPPpttt = [
  ToneLetterTags.p.toString(),
  ToneLetterTags.pp.toString(),
  ToneLetterTags.t.toString(),
  ToneLetterTags.tt.toString(),
];

/** map eighth checked finals to fourth ones */
export const eighthToFourthFinalConsonants = new Map<string, string>()
  .set(ToneLetterTags.bb, fourthFinalConsonants.b.toString())
  .set(ToneLetterTags.gg, fourthFinalConsonants.g.toString())
  .set(ToneLetterTags.hh, fourthFinalConsonants.h.toString())
  .set(ToneLetterTags.jj, fourthFinalConsonants.j.toString())
  .set(ToneLetterTags.kk, fourthFinalConsonants.k.toString())
  .set(ToneLetterTags.ll, fourthFinalConsonants.l.toString())
  .set(ToneLetterTags.pp, fourthFinalConsonants.p.toString())
  .set(ToneLetterTags.ss, fourthFinalConsonants.s.toString())
  .set(ToneLetterTags.tt, fourthFinalConsonants.t.toString());

export const finalConsonantsForTransfix = new Map<string, string>()
  .set(ToneLetterTags.h, ToneLetterTags.hh.toString())
  .set(ToneLetterTags.t, ToneLetterTags.tt.toString());

export const impossibleSequences: string[] = [
  // TonalLetterTags.d.toString(),
  // TonalLetterTags.q.toString(),
  // TonalLetterTags.v.toString(),
];
