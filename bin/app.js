#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../lib/client")
const analyzer_1 = require("../lib/unchange/analyzer")
const metaplasm_1 = require("../lib/unchange/metaplasm")
const util_1 = require("../lib/util")
const cli = new client_1.Client();
const stdin = process.openStdin();
const tla = analyzer_1.tonalLemmatizationAnalyzer;
stdin.addListener('data', function (d) {
    const ta = cli.processTonal(d.toString().trim());
    const wrd = ta.word; // type casting
    // console.log(wrd.literal);
    const soundSeqs = (0, util_1.getSoundSequences)(tla.morphAnalyze(wrd.literal, new metaplasm_1.TonalUncombiningForms([])).map(x => x.sounds));
    soundSeqs.forEach((v) => { console.info(v[0] + ' - ' + v[1]); });
});
//# sourceMappingURL=app.js.map
