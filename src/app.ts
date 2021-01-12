#!/usr/bin/env node

import { processor } from './dparser/processor';
import { Document } from './document';
import { Node } from './token';

let doc = new Document();

let stdin = process.openStdin();

stdin.addListener('data', function (d) {
  doc = processor(d.toString().trim());

  const ts = doc.nodes;

  if (ts.length > 0) {
    for (let i = 0; i < ts.length; i++) {
      let lemma = '*';
      if (ts[i].lemma != '') lemma = ts[i].lemma;
      let headToken = '*';
      if (ts[i].head.length > 0) headToken = ts[i].head;
      console.info(
        ts[i].token +
          ',' +
          lemma +
          ',' +
          ts[i].pos +
          ',' +
          ts[i].tag +
          ',' +
          ts[i].dep +
          ',' +
          headToken
      );
    }
  }
});
