#!/usr/bin/env node

import { Processor } from './client';
import { Document } from './document';
import { Token } from './token';

let doc = new Document();

let stdin = process.openStdin();

stdin.addListener('data', function(d) {
    const pro = new Processor();
    const nlp = pro.load('');
    doc = nlp.p(d.toString().trim());
    const ts = doc.tokens;

    if (ts.length > 0) {
        for (let i = 0; i < ts.length; i++) {
            let lemma = '*';
            if (ts[i].lemma != '') lemma = ts[i].lemma;
            let headText = '*';
            if (ts[i].head) headText = (<Token>ts[i].head).text;
            console.info(
                ts[i].text + ',' + lemma + ',' + ts[i].pos + ',' + ts[i].tag + ',' + ts[i].dep + ',' + headText
            );
        }
    }
});
