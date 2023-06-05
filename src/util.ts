import { Sound } from './unit';
import { Client, TokenAnalysis } from './client';
import { TonalWord } from './unchange/unit';
import { tonalLemmatizationAnalyzer } from './unchange/analyzer';
import { TonalUncombiningForms } from './unchange/metaplasm';

export function getLetterSoundPairsSequential(
  soundSeqs: Sound[][]
): [string, string][] {
  // return letter-sound-name pairs

  return soundSeqs
    .flatMap((v) => {
      return v;
    })
    .map((v) => [v.toString(), v.name]);
}

export function getLetterSoundPairsSyllabic(
  soundSeqs: Sound[][]
): [string, string][][] {
  // return letter-sound-name pairs

  return soundSeqs.map((v) => {
    return v.map((v) => [v.toString(), v.name]);
  });
}

export function analyzeIntoSyllables(input: string) {
  const cli = new Client();
  const tla = tonalLemmatizationAnalyzer;
  const ta: TokenAnalysis = cli.processTonal(input.toString().trim());
  const wrd = ta.word as TonalWord; // type casting

  const pairs = getLetterSoundPairsSyllabic(
    tla
      .morphAnalyze(wrd.literal, new TonalUncombiningForms([]))
      .map((x) => x.sounds)
  );

  return pairs;
}

export function analyzeIntoSequence(input: string) {
  const cli = new Client();
  const tla = tonalLemmatizationAnalyzer;
  const ta: TokenAnalysis = cli.processTonal(input.toString().trim());
  const wrd = ta.word as TonalWord; // type casting

  const pairs = getLetterSoundPairsSequential(
    tla
      .morphAnalyze(wrd.literal, new TonalUncombiningForms([]))
      .map((x) => x.sounds)
  );

  return pairs;
}
