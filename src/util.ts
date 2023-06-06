import { Sound } from './unit';
import { Client, TokenAnalysis } from './client';
import { TonalWord } from './unchange/unit';
import { tonalLemmatizationAnalyzer } from './unchange/analyzer';
import { TonalUncombiningForms } from './unchange/metaplasm';
import { lemmatize } from './unchange/lemmatizer';

/** Turn sounds into a sequence of letter-soundName pairs */
export function getLetterSoundPairsSequential(
  soundSeqs: Sound[][]
): [string, string][] {
  return soundSeqs
    .flatMap((v) => {
      return v;
    })
    .map((v) => [v.toString(), v.name]);
}

/** Turn sounds into syllabic letter-soundName pairs */
export function getLetterSoundPairsSyllabic(
  soundSeqs: Sound[][]
): [string, string][][] {
  return soundSeqs.map((v) => {
    return v.map((v) => [v.toString(), v.name]);
  });
}

/** Analyze an input into syllabic letter-sound-pair */
export function analyzeIntoSyllables(input: string) {
  if (!input) return [];
  const cli = new Client();
  const tla = tonalLemmatizationAnalyzer;
  const ta: TokenAnalysis = cli.processTonal(input);
  const wrd = ta.word as TonalWord;

  const pairs = getLetterSoundPairsSyllabic(
    tla
      .morphAnalyze(wrd.literal, new TonalUncombiningForms([]))
      .map((x) => x.sounds)
  );

  return pairs;
}

/** Analyze an input into a sequence of letter-sound-pairs */
export function analyzeIntoSequence(input: string) {
  if (!input) return [];
  const cli = new Client();
  const tla = tonalLemmatizationAnalyzer;
  const ta: TokenAnalysis = cli.processTonal(input);
  const wrd = ta.word as TonalWord;

  const pairs = getLetterSoundPairsSequential(
    tla
      .morphAnalyze(wrd.literal, new TonalUncombiningForms([]))
      .map((x) => x.sounds)
  );

  return pairs;
}

/** Get the uncombining forms of a syllable */
export function getUncombiningForms(syl: string) {
  if (!syl) return [];
  const cli = new Client();
  const tla = tonalLemmatizationAnalyzer;
  const ta: TokenAnalysis = cli.processTonal(syl);
  const wrd = ta.word as TonalWord;

  return tla
    .morphAnalyze(wrd.literal, new TonalUncombiningForms([]))
    .flatMap((mrfm) => mrfm.getForms().map((frm) => frm.literal));
}

export function getLemmas(input: string) {
  if (!input) return [];
  const lxLemma = lemmatize(input);
  return lxLemma.getLemmas().map((x) => x.literal);
}

export function pairsToString(pairs: [string, string][]) {
  const chars: string[] = pairs.map((pair: [string, string]) => {
    return pair[0];
  });
  const syl = chars.join('');
  return syl;
}
