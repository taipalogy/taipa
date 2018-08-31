#!/usr/bin/env node

import { Client, Document } from './client'

const argc = process.argv.splice(2);

if (argc.length != 1) {
    console.error(`Invalid number of arguments ${argc}`);
    process.exit(1);
}

const input = argc[0];


let clt = new Client();
let query = clt.take(input);
let results = clt.lookup(query);

console.log(results);

let doc: Document = clt.process("baggziu");