#!/usr/bin/env node

import { Client } from './client'

//var metadata = new Metadata();

const argc = process.argv.splice(2);

if(argc.length == 1) {
    const input = argc[0];

    let clt = new Client();
    let doc = clt.processOneToken(input);
    for(let i in doc.inputingLexemes) {
        console.info(doc.inputingLexemes[i].word.literal)

        // should sounds be blended with morphemes?
        for(let j in doc.inputingMorphemes) {
            for(let k in doc.inputingMorphemes[j]) {
                let s = doc.inputingMorphemes[j][k]
                console.info(s.getLiteral() + ' - ' + s.name)
            }
        }

        let ilw = clt.lookup(doc.inputingLexemes[i].word.literal);
        // when the input word can be found in the dictionary
        if(ilw != null) {
            let l = doc.inputingLexemes[i].word.literal
            let e = doc.inputingLexemes[i].getInflectionalEnding()
            console.info(l.substr(0, l.length-e.length) + ' - ' + 'inflectional stem')
            if(e.length > 0) console.info(e + ' - ' + 'inflectional ending')

            console.info(ilw)
        }

        let ls = doc.inputingLexemes[i].getBaseForms()

        for(let j in ls) {
            let ill = clt.lookup(ls[j].literal);
            // when the base form of the word can be found in the dictionary
            if(ill != null) {
                console.log(ill)
            }
        }

    }

    process.exit(1);
} else if(argc.length > 1) {
    console.error(`Too many arguments for input method: ${argc}`);
    process.exit(1);
}

let clt = new Client();
let doc = clt.process("uannw gua zurw"); // root csubj ccomp

console.log(doc.graph[0].dependency + ' ' + doc.graph[0].head.word.literal + ' ' + doc.graph[0].dependent.word.literal)
console.log(doc.graph[1].dependency + ' ' + doc.graph[1].head.word.literal + ' ' + doc.graph[1].dependent.word.literal)

//console.log(doc.graph[0])
//console.log(doc.graph[1])
