#!/usr/bin/env node

import { Client, Document } from './client'
import { Metadata } from './metadata'
import { STOP_WORDS } from  './stopwords'

//var metadata = new Metadata();

const argc = process.argv.splice(2);

if(argc.length == 1) {
    const input = argc[0];

    let clt = new Client();
    let doc = clt.take(input);
    for(let i in doc.lexemes) {
        let wl = clt.lookup(doc.lexemes[i].word.literal);
        // when the word cna be found in the dictionary
        if(wl != null) {
            console.log(wl)
        }
        for(let j in doc.lexemes[i].lemmata) {
            let bfl = clt.lookup(doc.lexemes[i].lemmata[j].literal);
            // if the base form of the word can be found in the dictionary
            if(bfl != null) {
                console.log(bfl)
            }
        }
    }

    process.exit(1);
} else if(argc.length > 1) {
    console.error(`Too many arguments for input method: ${argc}`);
    process.exit(1);
}

let clt = new Client();
let doc = clt.process("sia tingzssik");

STOP_WORDS.forEach(function(w) {
    console.log(w)
})