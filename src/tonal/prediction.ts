import { syllableCompositions } from './soundgen';
import { SoundGeneration, Sound } from '../unit';
import { isInSyllableTable } from './syllablelists';

/** Predicts the following letters. Return them as an array of strings when available. If the lexical roots are not present, an empty array will be returned. */
export function predict(letters: string[]) {
  const soundSeqs: Array<Sound[]> = new Array();

  for (let j = 0; j < syllableCompositions.length; j++) {
    let sg = new SoundGeneration();
    sg.predictive = true;
    sg.letters = letters;
    sg = syllableCompositions[j](sg);

    if (sg.letters.length != sg.matchedSounds.length || sg.matching != true) {
      // the pattern is not matched, the first unmatched set of sounds
      // is then returned as a possible prediction
      sg.predictions.map((x) => soundSeqs.push(x));
    }
  }

  const dupes: Array<[string, string]> = new Array();
  soundSeqs.map((i) => i.map((j) => dupes.push([j.toString(), j.name])));
  const dedupes = dupes.reduce(function (
    accumulator: Array<[string, string]>,
    curr: [string, string]
  ) {
    if (accumulator.filter((x) => x[0] === curr[0]).length == 0) {
      accumulator.push(curr);
    }
    return accumulator;
  },
  []);

  // for valid predictions
  const predictions = dedupes.filter((it) =>
    isInSyllableTable(letters.join('') + it[0])
  );

  return predictions;
}

// TODO: add a predict function to cover those skipped syllables in basicSyllables
