#!/usr/bin/env node

import { Client } from './client'

//var metadata = new Metadata();

const argc = process.argv.splice(2);

if(argc.length == 1) {
    const input = argc[0];

    let cli = new Client()

    console.info(cli.output(input))

    process.exit(1);
} else if(argc.length > 1) {
    console.error(`Too many arguments for input method: ${argc}`);
    process.exit(1);
}

let clt = new Client();
let s = "uannw gua zurw"
let doc = clt.process("uannw gua zurw");

console.log(s)
console.log(doc.graph[0].dependency + ' (' + doc.graph[0].head.word.literal + ', ' + doc.graph[0].dependent.word.literal + ')')
console.log(doc.graph[1].dependency + ' (' + doc.graph[1].head.word.literal + ', ' + doc.graph[1].dependent.word.literal + ')')
