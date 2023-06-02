import { Sound } from './unit';

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
