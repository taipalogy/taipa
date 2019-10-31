#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../lib/client")
const document_1 = require("../lib/document")
let cli = new client_1.Client();
let doc = new document_1.Document();
let stdin = process.openStdin();
stdin.addListener('data', function (d) {
    doc = cli.process(d.toString().trim());
    const rs = doc.relations;
    const ts = doc.tokens;
    if (rs.length > 0) {
        for (let i = 0; i < rs.length; i++) {
            console.info(ts[i].text + ',' + ts[i].pos + ',' + ts[i].tag + ',' + ts[i].dep + ',' + ts[i].head.text);
        }
    }
});
//# sourceMappingURL=taipa.js.map
