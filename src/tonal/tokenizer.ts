import { syllableCompositions } from './soundgen';
import { SoundGeneration, Sound } from '../unit';
import { graphAnalyzeTonal } from './analyzer';

export function tokenizeLurzmafjiz(str: string) {
  const soundSeqs: Array<Sound[]> = new Array();

  const letters = graphAnalyzeTonal(str).map(x => x.letter && x.letter.literal);

  //   console.log(letters);
  let beginOfSyllable = 0;
  while (beginOfSyllable < letters.length) {
    const accumulatedSeqs: Array<Sound[]> = new Array(); // accumulator for the matched
    for (let i = 0; i <= letters.length; i++) {
      for (let j = 0; j < syllableCompositions.length; j++) {
        let sg = new SoundGeneration();
        sg.letters = letters.slice(beginOfSyllable, i);
        // console.log(sg.letters, beginOfSyllable, i, j);
        sg = syllableCompositions[j](sg);

        if (sg.letters.length == sg.sounds.length && sg.matching == true) {
          accumulatedSeqs.push(sg.sounds);
          //   console.log(sg.sounds, beginOfSyllable, i, j);
        }
      }
      if (i + 1 == letters.length) {
        // on last loop
        if (accumulatedSeqs.length > 0) {
          // the last one should be the longest one?
          if (
            beginOfSyllable +
              accumulatedSeqs[accumulatedSeqs.length - 1].length <
            letters.length
          ) {
            // when beginOfSyllable adds up to under the length of letters
            beginOfSyllable +=
              accumulatedSeqs[accumulatedSeqs.length - 1].length;
          }
          //   console.log(beginOfSyllable);
        }
      }
    }
    if (accumulatedSeqs.length == 0) {
      // break whilte loop
      break;
    } else if (accumulatedSeqs.length > 0)
      accumulatedSeqs.map(it => soundSeqs.push(it));
  }
  return soundSeqs.map(x => x.map(y => y.toString()).join(''));
}
