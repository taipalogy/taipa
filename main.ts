#!/usr/bin/env node

import { TextInputClient } from '../inputmethod/textinputclient'

const argc = process.argv.splice(2);

if (argc.length != 1) {
    console.error(`Invalid number of arguments ${argc}`);
    process.exit(1);
}

const inputNumber = argc[0];

console.log(`Hello World!`);

if(! /w+/.test(inputNumber)) {
    console.error("Invalid input token");
    process.exit(1);
}

let tic = new TextInputClient();
let res = tic.lookup(inputNumber);

console.log(inputNumber);
console.log(res);

