#!/usr/bin/env node

import { Client } from './client';
import { Document } from './document';
import { Token } from './token';

let cli = new Client();
let doc = new Document();

let stdin = process.openStdin();

stdin.addListener('data', function(d) {
    doc = cli.process(d.toString().trim());
    const ts = doc.tokens;

    if (ts.length > 0) {
        for (let i = 0; i < ts.length; i++) {
            let lemma = '*';
            if (ts[i].lemma != '') lemma = ts[i].lemma;
            let orthOfHead = '*';
            if (ts[i].head) orthOfHead = (<Token>ts[i].head).orth;
            console.info(
                ts[i].orth + ',' + lemma + ',' + ts[i].pos + ',' + ts[i].tag + ',' + ts[i].dep + ',' + orthOfHead,
            );
        }
    }
});