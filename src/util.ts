import { Sound } from "./unit";


export function getSoundSequences(soundSeqs: Sound[][]) {
    const letters = [];
    for(let j in soundSeqs) {
        for(let k in soundSeqs[j]) {
            const ltr = soundSeqs[j][k]
            letters.push([ltr.toString(), ltr.name]);
        }
    }
    return letters;
  }
  