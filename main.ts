#!/usr/bin/env node

import { Client } from './client'

//var metadata = new Metadata();

const argc = process.argv.splice(2);

if(argc.length == 1) {
    const input = argc[0];

    let clt = new Client();
    let doc = clt.processOneToken(input);
    for(let i in doc.inputingLexemes) {
        let l = doc.inputingLexemes[i].word.literal
        let en = doc.inputingLexemes[i].getInflectionalEnding()
        console.info(l.substr(0, l.length-en.length) + ' - ' + 'inflectional stem')
        let filler: string = ''
        for(let n = 0; n < l.substr(0, l.length-en.length).length; n++) { 
            filler += ' '
        }
        if(en.length > 0) console.info(filler + en+ ' - ' + 'inflectional ending')

        // should sounds be blended with morphemes?
        for(let j in doc.inputingMorphemes) {
            let syl = ''
            let sous = []
            for(let k in doc.inputingMorphemes[j]) {
                let sou = doc.inputingMorphemes[j][k]
                sous.push('  - ' + sou.getLiteral() + ' - ' + sou.name)
                syl += sou.getLiteral()
            }
            console.info('-' + syl)
            for(let k in sous) {
                console.info(sous[k])
            }
        }

        let ilw = clt.lookup(doc.inputingLexemes[i].word.literal);
        // when the input word can be found in the dictionary
        if(ilw != null) {

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
