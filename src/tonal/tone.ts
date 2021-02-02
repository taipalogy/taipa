import { syllabifyTonal } from '../unchange/morpheme';
import {
  MatchedPattern,
  AlphabeticGrapheme,
  makeMatchedPatterns,
} from '../unit';
import { graphAnalyzeTonal } from '../unchange/analyzer';
import { TonalSpellingTags } from './version2';

class Tone {
  transfix: string[] = [];
  stopFinals: string[] = [];
  getInflectionalEnding() {
    return this.transfix[this.transfix.length - 1];
  }
  getAllomorphicEnding() {
    return (
      this.stopFinals[this.stopFinals.length - 1] +
      this.transfix[this.transfix.length - 1]
    );
  }
}

export function extractTones(token: string) {
  const gs: AlphabeticGrapheme[] = graphAnalyzeTonal(token);
  const ltrs = gs.map(it => it.letter);
  const ptrns = makeMatchedPatterns(ltrs, syllabifyTonal);
  const tone = new Tone();

  const ptn = ptrns.map(it => it.pattern);
  const stps = ptn.map(it =>
    it
      .map(it =>
        it.name === TonalSpellingTags.stopFinalConsonant ? it.toString() : ''
      )
      .filter(it => it.length > 0)
  );

  const tnls = ptn.map(it =>
    it
      .map(it =>
        it.name === TonalSpellingTags.freeTone ||
        it.name === TonalSpellingTags.checkedTone
          ? it.toString()
          : ''
      )
      .filter(it => it.length > 0)
  );

  stps.map(it =>
    it.length > 0 ? tone.stopFinals.push(it[0]) : tone.stopFinals.push('')
  );
  tnls.map(it =>
    it.length > 0 ? tone.transfix.push(it[0]) : tone.transfix.push('')
  );

  return tone;
}
