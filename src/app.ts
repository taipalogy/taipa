#!/usr/bin/env node

import { Client, TokenAnalysis } from './client'
import { tonalLemmatizationAnalyzer } from './unchange/analyzer';
import { TonalUncombiningForms } from './unchange/metaplasm';
import { TonalWord } from './unchange/unit';
import { getSoundSequences } from './util';

import * as fs from 'fs';

const stdin = process.openStdin();

// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });

stdin.addListener('data', function (d) {

  if(process.argv.length == 2) {
    const cli = new Client();
    const tla = tonalLemmatizationAnalyzer;
    const ta: TokenAnalysis = cli.processTonal(d.toString().trim());
    const wrd = ta.word as TonalWord; // type casting
    // console.log(wrd.literal);

    const soundSeqs = getSoundSequences(
      tla.morphAnalyze(wrd.literal, new TonalUncombiningForms([])).map(x => x.sounds)
    );  

    soundSeqs.forEach((v) => {console.info(v[0]+ ' - ' + v[1])});    
  } else if(process.argv.length == 3) {
    const input = d.toString().trim();
    const dict = JSON.parse(fs.readFileSync(process.argv[2], 'utf-8')) || {};
    const keys = Object.keys(dict);
    // console.info(keys)
    for(const key of keys) {
      if(key.slice(0, input.length) === input) {
        // console.log(key,key.slice(0, input.length), input);
        const arr: [] = dict[key]
        const chrs = arr.join(',')
        console.info(chrs)
        // for(const chr of arr)
          // console.log(chr)
      }
    }
    
  }
});