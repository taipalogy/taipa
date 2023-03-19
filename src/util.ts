import { Sound } from './unit';

export function getLetterSoundPairs(soundSeqs: Sound[][]): [string, string][] {
  // return letter-sound-name pairs

  return soundSeqs
    .flatMap((v) => {
      return v;
    })
    .map((v) => [v.toString(), v.name]);
}
