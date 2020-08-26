import { syllableCompositions } from './soundgen';
import { SoundGeneration, Sound } from '../unit';
import { graphAnalyzeTonal } from './analyzer';
import { medialSounds } from './version2';
import { impossibleSequences } from './collections';

export function tokenizeLatinSyllable(str: string) {
  const soundSeqs: Array<Array<Sound[]>> = new Array();

  const letters = graphAnalyzeTonal(str).map(x => x.letter && x.letter.literal);

  // console.log(letters);
  let beginOfSyllable = 0;
  while (beginOfSyllable < letters.length) {
    const accumulatedSeqs: Array<Sound[]> = new Array(); // accumulator for the matched
    let shouldBreak: boolean = false;
    for (let i = 0; i < letters.length; i++) {
      // i is used for the end of the specified portion of letters. see letters.slice below
      for (let j = 0; j < syllableCompositions.length; j++) {
        if (shouldBreak) break;
        if (i + 1 > beginOfSyllable) {
          // bypass those loops when i is less than or equal to beginOfSyllable
          let sg = new SoundGeneration();
          // the letter at position i is exclusive
          sg.letters = letters.slice(beginOfSyllable, i + 1);
          // console.log(sg.letters, beginOfSyllable, i, j);
          if (impossibleSequences.includes(sg.letters[i])) {
            if (i > 0 && medialSounds.includes(sg.letters[i - 1])) {
              shouldBreak = true;
              break;
            }
          }
          sg = syllableCompositions[j](sg);

          if (sg.letters.length == sg.sounds.length && sg.matching == true) {
            accumulatedSeqs.push(sg.sounds);
            // console.log(sg.sounds, beginOfSyllable, i, j);
          }
        }
      }
      if (i + 1 == letters.length) {
        // on the last loop
        if (accumulatedSeqs.length > 0) {
          // the last one should be the longest one?
          if (
            beginOfSyllable +
              accumulatedSeqs[accumulatedSeqs.length - 1].length <=
            letters.length
          ) {
            // when beginOfSyllable adds up to under the length of letters
            beginOfSyllable +=
              accumulatedSeqs[accumulatedSeqs.length - 1].length;
          }
          // console.log(beginOfSyllable);
        }
      }
    }
    if (accumulatedSeqs.length == 0) {
      // break while loop
      break;
    } else if (accumulatedSeqs.length > 0) {
      soundSeqs.push(accumulatedSeqs);
    }
  }
  return soundSeqs.map(x => x.map(y => y));
}
