#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../lib/client")
const fs = require("fs")
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
        const cli = new client_1.Client();
        const ta = cli.processTonal(d.toString().trim());
        ta.soundSequences
            .flatMap((v) => {
            return v;
        })
            .map((v) => console.log(v.toString() + ' - ' + v.name));
    }
    else if (process.argv.length == 3) {
        if (!fs.existsSync(process.argv[2])) {
            console.log('File not found');
        }
        else {
            const input = d.toString().trim();
            let fileContents = '';
            fileContents = fs.readFileSync(process.argv[2], 'utf-8');
            const dict = JSON.parse(fileContents) || {};
            const keys = Object.keys(dict);
            // console.info(keys)
            for (const key of keys) {
                if (key.slice(0, input.length) === input) {
                    // console.log(key,key.slice(0, input.length), input);
                    const arr = dict[key];
                    const chrs = arr.join(',');
                    console.info(chrs);
                    // for(const chr of arr)
                    // console.log(chr)
                }
            }
        }
    }
});
//# sourceMappingURL=app.js.map
