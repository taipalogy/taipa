#!/usr/bin/env node

import { Client, TokenAnalysis } from './client';
import { tonalLemmatizationAnalyzer } from './unchange/analyzer';
import { TonalUncombiningForms } from './unchange/metaplasm';
import { TonalWord } from './unchange/unit';
import { getSpellSequences } from './util';

import * as fs from 'fs';
import { TonalSpellingTags } from './tonal/tonalres';

/**
 * bopomofo
 *
 * > node lib/appbpmf.js
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

  const soundSeqs = getSpellSequences(
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
      const spellSeqs = analyze(input);

      const bpmf: string[] = [];
      const precedings: string[] = [];
      if (spellSeqs.length == 0) {
        for (const key of keys) {
          if (key === input) {
            const arr: [] = dict[key];
            const chrs = arr.join(',');
            // console.info(chrs);
            bpmf.push(chrs);
          }
        }
      } else {
        spellSeqs.forEach((val, ind, arrVals) => {
          for (const key of keys) {
            // console.log('precedings:', precedings, 'key:', key, 'val:', val[0]);
            // console.log('key of keys:' + key);
            if (key === val[0] && precedings.length == 0) {
              const arrEntry: string[] = dict[key] || {};
              // const chrs = arrEntry.join(',');
              // console.info(chrs);
              // if (val[1] === TonalSpellingTags.initialConsonant) {
              if (
                val[1] === TonalSpellingTags.stopFinalConsonant &&
                val[0].length == 1
              ) {
                // the 4th tone
                bpmf.push(arrEntry[1]);
              } else {
                bpmf.push(arrEntry[0]);
              }
              if (
                ind < arrVals.length - 1 &&
                arrVals[ind + 1][1] === TonalSpellingTags.nasalization
              ) {
                // in case of the following letter is nasalization
                // push the vowel
                precedings.push(val[0]);
              }
            } else if (
              precedings.length > 0 &&
              val[1] === TonalSpellingTags.nasalization
            ) {
              // console.log('in Nasalization', 'key:' + key, 'val:' + val[0]);
              const arrEntry: string[] = dict[precedings[0] + val[0]] || {};
              bpmf.pop();
              bpmf.push(arrEntry[0]);
              precedings.length = 0;
            }
          }
        });
      }

      console.info(bpmf.join(''));
    }
  }
});
