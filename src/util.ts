import { Sound } from './unit';
import { Client, TokenAnalysis } from './client';
import { TonalWord } from './unchange/unit';
import { tonalLemmatizationAnalyzer } from './unchange/analyzer';
import { TonalUncombiningForms } from './unchange/metaplasm';

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
  const cli = new Client();
  const tla = tonalLemmatizationAnalyzer;
  const ta: TokenAnalysis = cli.processTonal(input.toString().trim());
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
  const cli = new Client();
  const tla = tonalLemmatizationAnalyzer;
  const ta: TokenAnalysis = cli.processTonal(input.toString().trim());
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
  const cli = new Client();
  const tla = tonalLemmatizationAnalyzer;
  const ta: TokenAnalysis = cli.processTonal(syl.toString().trim());
  const wrd = ta.word as TonalWord;

  const forms = tla
    .morphAnalyze(wrd.literal, new TonalUncombiningForms([]))
    .map((mrfm) => mrfm.getForms().map((frm) => frm.literal));
}
