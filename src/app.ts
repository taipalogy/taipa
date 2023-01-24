#!/usr/bin/env node

import { Client, TokenAnalysis } from './client'
import { tonalLemmatizationAnalyzer } from './unchange/analyzer';
import { TonalUncombiningForms } from './unchange/metaplasm';
import { TonalWord } from './unchange/unit';
import { getSoundSequences } from './util';

const cli = new Client();

const stdin = process.openStdin();
const tla = tonalLemmatizationAnalyzer;

stdin.addListener('data', function (d) {

  const ta: TokenAnalysis = cli.processTonal(d.toString().trim());
  const wrd = ta.word as TonalWord; // type casting
  // console.log(wrd.literal);

  const soundSeqs = getSoundSequences(
    tla.morphAnalyze(wrd.literal, new TonalUncombiningForms([])).map(x => x.sounds)
  );  

  soundSeqs.forEach((v) => {console.info(v[0]+ ' - ' + v[1])});
});
