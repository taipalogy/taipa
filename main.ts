#!/usr/bin/env node

import { Client } from './client'

//var metadata = new Metadata();

const argc = process.argv.splice(2);

if(argc.length == 1) {
    const input = argc[0];

    let clt = new Client();
    let doc = clt.processOneToken(input);
    let output = ''
    for(let i in doc.inputingLexemes) {
        let l = doc.inputingLexemes[i].word.literal
        let en = doc.inputingLexemes[i].getInflectionalEnding()
        if(l.length-en.length != 0) {
            output += l.substr(0, l.length-en.length) + ' - ' + 'inflectional stem'
        }
        let filler: string = ''
        for(let n = 0; n < l.substr(0, l.length-en.length).length; n++) { 
            filler += ' '
        }
        if(en.length > 0) output += '\n' + filler + en + ' - ' + 'inflectional ending'

        for(let j in doc.inputingMorphemes) {
            let syll = ''
            let saunz = []
            for(let k in doc.inputingMorphemes[j]) {
                let sou = doc.inputingMorphemes[j][k]
                saunz.push('  - ' + sou.getLiteral() + ' - ' + sou.name)
                syll += sou.getLiteral()
            }
            output += '\n' + '- ' + syll
            for(let k in saunz) {
                output += '\n' + saunz[k]
            }
        }

        let ipw = clt.lookup(doc.inputingLexemes[i].word.literal);
        // when the input word can be found in the dictionary
        if(ipw != null) {
            output += '\n' + ipw
        }

        let ls = doc.inputingLexemes[i].getBaseForms()

        for(let j in ls) {
            let bsw = clt.lookup(ls[j].literal);
            // when the base form of the word can be found in the dictionary
            if(bsw != null) {
                output += '\n' + bsw
            }
        }

    }

    console.info(output)

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
