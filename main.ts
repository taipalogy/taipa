#!/usr/bin/env node

import { Client, Document } from './client'

const argc = process.argv.splice(2);

if (argc.length != 1) {
    console.error(`Invalid number of arguments ${argc}`);
    process.exit(1);
}

const input = argc[0];

let clt = new Client();
let doc = clt.take(input);
for(let i in doc.lexemes) {
    console.log(clt.lookup(doc.lexemes[i].word.literal));
}

doc = clt.process("sia tingzssik");