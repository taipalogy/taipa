import { Sound } from './unit';

export function getLetterSoundPairs(soundSeqs: Sound[][]): [string, string][] {
  // return letter-sound-name pairs

  // const pairs: [string, string][] = [];
  // for (let j in soundSeqs) {
  //   for (let k in soundSeqs[j]) {
  //     const snd = soundSeqs[j][k];
  //     pairs.push([snd.toString(), snd.name]);
  //   }
  // }
  // return pairs;

  return soundSeqs
    .flatMap((v) => {
      return v;
    })
    .map((v) => [v.toString(), v.name]);
}
