#!/usr/bin/env node

import { Client } from './client';
import { Document } from './document';

let cli = new Client();
let doc = new Document();

let stdin = process.openStdin();

stdin.addListener('data', function(d) {
    doc = cli.process(d.toString().trim());
    const ts = doc.tokens;

    if (ts.length > 0) {
        for (let i = 0; i < ts.length; i++) {
            console.info(ts[i].text + ',' + ts[i].pos + ',' + ts[i].tag + ',' + ts[i].dep + ',' + ts[i].head.text);
        }
    }
});
