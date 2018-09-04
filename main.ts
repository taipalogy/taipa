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
    let wl = clt.lookup(doc.lexemes[i].word.literal);
    // when the word cna be found in the dictionary
    if(wl != null) {
        console.log(wl)
    }
    for(let j in doc.lexemes[i].baseForms) {
        let bfl = clt.lookup(doc.lexemes[i].baseForms[j].literal);
        // if the base form of the word can be found in the dictionary
        if(bfl != null) {
            console.log(bfl)
        }
    }
}

doc = clt.process("sia tingzssik");