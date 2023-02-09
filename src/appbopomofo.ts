#!/usr/bin/env node

import { Client, TokenAnalysis } from './client';
import { tonalLemmatizationAnalyzer } from './unchange/analyzer';
import { TonalUncombiningForms } from './unchange/metaplasm';
import { TonalWord } from './unchange/unit';
import { getSoundSequences } from './util';

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

function analyze(input: string) {
  const cli = new Client();
  const tla = tonalLemmatizationAnalyzer;
  const ta: TokenAnalysis = cli.processTonal(input.toString().trim());
  const wrd = ta.word as TonalWord; // type casting

  const soundSeqs = getSoundSequences(
    tla
      .morphAnalyze(wrd.literal, new TonalUncombiningForms([]))
      .map((x) => x.sounds)
  );

  return soundSeqs;
}

stdin.addListener('data', function (d) {
  if (process.argv.length == 2) {
    analyze(d.toString()).forEach((v) => {
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
      const soundSeqs = analyze(input);

      const bpmf: string[] = [];
      if (soundSeqs.length == 0) {
        for (const key of keys) {
          if (key === input) {
            const arr: [] = dict[key];
            const chrs = arr.join(',');
            // console.info(chrs);
            bpmf.push(chrs);
          }
        }
      } else {
        soundSeqs.forEach((v) => {
          for (const key of keys) {
            if (key === v[0]) {
              const arr: [] = dict[key];
              const chrs = arr.join(',');
              // console.info(chrs);
              bpmf.push(chrs);
            }
          }
        });
      }

      console.info(bpmf.join(''));
    }
  }
});
