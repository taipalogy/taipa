import { Sound } from './unit';

export function getLetterSoundPairs(soundSeqs: Sound[][]) {
  // return letter-sound-name pairs
  const pairs = [];
  for (let j in soundSeqs) {
    for (let k in soundSeqs[j]) {
      const snd = soundSeqs[j][k];
      pairs.push([snd.toString(), snd.name]);
    }
  }
  return pairs;
}
