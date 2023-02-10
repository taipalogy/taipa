#!/usr/bin/env node

import { Client, TokenAnalysis } from './client';
import { tonalLemmatizationAnalyzer } from './unchange/analyzer';
import { TonalUncombiningForms } from './unchange/metaplasm';
import { TonalWord } from './unchange/unit';
import { getSpellSequences } from './util';

import * as fs from 'fs';

/**
 * > node lib/app.js
 * or
 * > node bin/app.js
 */

const stdin = process.openStdin();

// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });

if (process.argv.length == 3) {
  if (!fs.existsSync(process.argv[2])) {
    console.log('File not found');
  }
}

stdin.addListener('data', function (d) {
  if (process.argv.length == 2) {
    const cli = new Client();
    const tla = tonalLemmatizationAnalyzer;
    const ta: TokenAnalysis = cli.processTonal(d.toString().trim());
    const wrd = ta.word as TonalWord; // type casting
    // console.log(wrd.literal);

    const soundSeqs = getSpellSequences(
      tla
        .morphAnalyze(wrd.literal, new TonalUncombiningForms([]))
        .map((x) => x.sounds)
    );

    soundSeqs.forEach((v) => {
      console.info(v[0] + ' - ' + v[1]);
    });
  } else if (process.argv.length == 3) {
    if (!fs.existsSync(process.argv[2])) {
      console.log('File not found');
    } else {
      const input = d.toString().trim();
      let fileContents = '';

      fileContents = fs.readFileSync(process.argv[2], 'utf-8');
      const dict = JSON.parse(fileContents) || {};
      const keys = Object.keys(dict);
      // console.info(keys)
      for (const key of keys) {
        if (key.slice(0, input.length) === input) {
          // console.log(key,key.slice(0, input.length), input);
          const arr: [] = dict[key];
          const chrs = arr.join(',');
          console.info(chrs);
          // for(const chr of arr)
          // console.log(chr)
        }
      }
    }
  }
});
