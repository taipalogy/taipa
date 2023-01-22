#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const processor_1 = require("../lib/dparser/processor")
const document_1 = require("../lib/document")
let doc = new document_1.Document();
let stdin = process.openStdin();
stdin.addListener('data', function (d) {
    doc = (0, processor_1.depParse)(d.toString().trim());
    const ts = doc.nodes;
    if (ts.length > 0) {
        for (let i = 0; i < ts.length; i++) {
            let lemma = '*';
            if (ts[i].lemma != '')
                lemma = ts[i].lemma;
            let headToken = '*';
            if (ts[i].head.length > 0)
                headToken = ts[i].head;
            console.info(ts[i].token +
                ',' +
                lemma +
                ',' +
                ts[i].pos +
                ',' +
                ts[i].tag +
                ',' +
                ts[i].dep +
                ',' +
                headToken);
        }
    }
});
//# sourceMappingURL=app.js.map
