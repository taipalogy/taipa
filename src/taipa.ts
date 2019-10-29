#!/usr/bin/env node

import { Client } from './client';
import { Document } from './document';

let cli = new Client();
let doc = new Document();

let stdin = process.openStdin();

stdin.addListener('data', function(d) {
    doc = cli.process(d.toString().trim());
    let rs = doc.relations;

    if (rs.length > 0) {
        for (let i = 0; i < rs.length; i++) {
            console.info(rs[i].dependency + ' (' + rs[i].head.surface + ', ' + rs[i].dependent.surface + ')');
        }
    }
});
