#!/usr/bin/env node

import { Parser } from './parser';

const argc = process.argv.splice(2);

if (argc.length != 1) {
    console.error(`Invalid number of arguments ${argc}`);
    process.exit(1);
}

const inputNumber = argc[0];

if (! /^\d+$/.test(inputNumber)) {
    console.error(`Invalid input ${inputNumber}`);
    process.exit(1);
}

//let trees = new Parser();
console.log(`Hello World!`);
