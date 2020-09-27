import { Letters } from '../unit';

export enum HangulLetterTags {
  a = 'a',
  e = 'e',
  i = 'i',
  o = 'o',
  u = 'u',

  oe = 'oe',

  er = 'er',
  ir = 'ir',
  ur = 'ur',

  b = 'b',
  d = 'd',
  g = 'g',
  j = 'j',

  ch = 'ch',
  p = 'p',
  t = 't',
  k = 'k',

  c = 'c',
  ph = 'ph',
  th = 'th',
  kh = 'kh',

  pp = 'pp',
  tt = 'tt',
  kk = 'kk',
  ss = 'ss',
  jj = 'jj',

  h = 'h',
  l = 'l',

  w = 'w',
  y = 'y',

  m = 'm',
  n = 'n',

  ng = 'ng',

  gs = 'gs',
  nj = 'nj',
  lg = 'lg',
  lm = 'lm',
  lb = 'lb',
  ls = 'ls',
  lt = 'lt',
  lp = 'lp',
  lh = 'lh',
  bs = 'bs',
}

export class LettersOfHangul extends Letters {}

export const lowerLettersHangul = new LettersOfHangul([
  HangulLetterTags.a,
  HangulLetterTags.e,
  HangulLetterTags.i,
  HangulLetterTags.o,
  HangulLetterTags.u,
  HangulLetterTags.oe,
  HangulLetterTags.er,
  HangulLetterTags.ir,
  HangulLetterTags.ur,
  HangulLetterTags.b,
  HangulLetterTags.d,
  HangulLetterTags.g,
  HangulLetterTags.j,
  HangulLetterTags.ch,
  HangulLetterTags.p,
  HangulLetterTags.t,
  HangulLetterTags.k,
  HangulLetterTags.c,
  HangulLetterTags.ph,
  HangulLetterTags.th,
  HangulLetterTags.kh,
  HangulLetterTags.pp,
  HangulLetterTags.tt,
  HangulLetterTags.kk,
  HangulLetterTags.ss,
  HangulLetterTags.jj,
  HangulLetterTags.h,
  HangulLetterTags.l,
  HangulLetterTags.w,
  HangulLetterTags.y,
  HangulLetterTags.m,
  HangulLetterTags.n,
  HangulLetterTags.ng,
  HangulLetterTags.gs,
  HangulLetterTags.nj,
  HangulLetterTags.lg,
  HangulLetterTags.lm,
  HangulLetterTags.lb,
  HangulLetterTags.ls,
  HangulLetterTags.lt,
  HangulLetterTags.lp,
  HangulLetterTags.lh,
  HangulLetterTags.bs,
]);

export enum HangulSpellingTags {
  initialConsonant = 'initialConsonant',
  semivowel = 'semivowel',
  vowel = 'vowel',
  finalConsonant = 'finalConsonant',
}
