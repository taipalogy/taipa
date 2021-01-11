import {
  PhrasalVerb,
  PhrasalVerbWithEnclitic,
  VerbWithEnclitic,
  Rules,
  ConstructionOfPhrase,
  padvLongy,
} from './rules';
import { POSTags, Tagset } from './symbols';
import {
  ConstructionElement,
  EncliticElement,
  ParticleElement,
  VerbElement,
} from './keywords';
import { Token } from '../token';
import { Document } from '../document';
import { Feature } from './feature';
import { inflectDesinence } from '../change/inflector';
import { AdverbialParticles } from './dictionary';

export function tag(features: Feature[]) {
  let map = new Map();
  for (let i = 0; i < features.length; i++) {
    if (
      features[i].token ===
        inflectDesinence(AdverbialParticles.longy).getForms()[0].literal &&
      padvLongy(features[i].nextToken, features[i].nextToken2)
    ) {
      map.set(features[i].token, Tagset.padv);
    }
  }
  return map;
}

export class RuleBasedTagger {
  private phrases: Array<ConstructionOfPhrase> = new Array();
  private readonly rules = new Rules();

  private generate(sequence: string[], phrases: ConstructionOfPhrase[]) {
    let cps: Array<ConstructionOfPhrase> = new Array();

    if (phrases.length > 0) {
      for (let ph of phrases) {
        cps.push(ph);

        //console.log(pat.elements)

        if (ph instanceof PhrasalVerb) {
          const pvwe = new PhrasalVerbWithEnclitic(
            new VerbElement(ph.elements[0].orth),
            new ParticleElement(ph.elements[1].orth),
            new EncliticElement('aw')
          );
          cps.push(pvwe);
        } else if (ph.pos === POSTags.verb) {
          const vwe = new VerbWithEnclitic(
            new VerbElement(sequence[0]),
            new EncliticElement('aw')
          );
          cps.push(vwe);
        }
      }
    } else {
      //console.log(sequence)
      const vwe = new VerbWithEnclitic(
        new VerbElement(sequence[0]),
        new EncliticElement('aw')
      );
      cps.push(vwe);
    }

    //console.log(cps)
    return cps;
  }

  private tagKeyWord(kw: ConstructionElement) {
    if (kw.pos === POSTags.pronoun) {
      kw.tag = Tagset.npr;
    } else if (kw.pos === POSTags.auxiliary) kw.tag = Tagset.aux;
    else if (kw.pos === POSTags.particle) kw.tag = Tagset.padv;
  }

  private matchSeperates(sequence: string[], secondV: string) {
    let phrase: ConstructionOfPhrase = new ConstructionOfPhrase([]);
    let vb: VerbElement = new VerbElement(sequence[0]);

    vb.tag = Tagset.vb;
    phrase.elements.push(vb);
    phrase.pos = POSTags.verb;

    if (sequence.length > 1) {
      for (let i = 1; i < sequence.length; i++) {
        // skip the first array element

        let kw = this.rules.matchKeyWords(sequence[i]);
        if (kw) {
          this.tagKeyWord(kw);
          phrase.elements.push(kw);
        }

        if (sequence[i] === secondV) {
          let ps: VerbElement = new VerbElement(sequence[i]);
          ps.tag = Tagset.vb;
          phrase.elements.push(ps);
          return phrase;
        }
      }
    }
  }

  private tagPhrases(phrases: ConstructionOfPhrase[]) {
    if (phrases.length > 0) {
      for (let ph of phrases) {
        if (
          ph.pos === POSTags.verb &&
          ph.elements[ph.elements.length - 1].pos === POSTags.particle
        ) {
          ph.elements[0].tag = Tagset.vb;
          if (
            ph.elements.length == 3 &&
            ph.elements[1].pos === POSTags.particle
          ) {
            ph.elements[1].tag = Tagset.ppv;
          }
          ph.elements[ph.elements.length - 1].tag = Tagset.ppv;
        } else if (
          ph.pos === POSTags.verb &&
          ph.elements[ph.elements.length - 1].pos === POSTags.auxiliary
        ) {
        } else if (
          ph.pos === POSTags.verb &&
          ph.elements[ph.elements.length - 1].pos === POSTags.adposition
        ) {
          ph.elements[0].tag = Tagset.vb;
          ph.elements[ph.elements.length - 1].tag = Tagset.appr;
        }
      }
    }

    return phrases;
  }

  private makePhrases(tokens: string[], beginOfPhrase: number) {
    let sequence: string[] = [];
    let phrss;

    for (let i = beginOfPhrase; i < tokens.length; i++) {
      sequence.push(tokens[i]);
    }

    phrss = this.rules.matches(sequence);

    const secondV = this.rules.seperateMatches(sequence[0]);

    if (secondV) {
      const sep = this.matchSeperates(sequence, secondV);
      if (sep) {
        phrss = [];
        phrss = [sep];
      }
    }

    // console.log(phrss);

    if (!phrss || phrss.length == 0) {
      // console.log(sequence);
      let kw = this.rules.matchKeyWords(sequence[0]);

      if (kw) {
        //console.log(kw)
        this.tagKeyWord(kw);

        phrss = [new ConstructionOfPhrase([])];
        phrss[0].elements.push(kw);
      }
    }

    //if(pats) console.log(pats[0].elements)

    if (phrss) phrss = this.tagPhrases(phrss);

    let listCP: Array<ConstructionOfPhrase> = new Array();
    if (phrss) listCP = this.generate(sequence, phrss);
    else listCP = this.generate(sequence, []);

    //console.log(listCP);

    let matchedLen = 0;
    let mp = new ConstructionOfPhrase([]);

    for (let m in listCP) {
      const min = Math.min(
        tokens.length - beginOfPhrase,
        listCP[m].elements.length
      );
      if (listCP[m].elements.length == min) {
        for (let n = 0; n < min; n++) {
          if (listCP[m].elements[n] != undefined) {
            if (tokens[beginOfPhrase + n] === listCP[m].elements[n].orth) {
              if (n + 1 == min && min > matchedLen) {
                matchedLen = min;

                for (let q = 0; q < matchedLen; q++) {
                  mp.elements[q] = listCP[m].elements[q];
                  if (listCP[m].elements[q].orth === '') {
                    mp.elements[q].orth = tokens[beginOfPhrase + q];
                  }
                }
                mp.pos = listCP[m].pos;
              }
            }
          }
        }
      }
    }

    return mp;
  }

  private tagSpeeches() {
    for (let s of this.phrases) {
      if (s.elements.length == 1 && s.elements[0].pos == POSTags.pronoun)
        s.pos = POSTags.pronoun;

      //console.log(s)
      //console.log(s.elements)
    }
  }

  private match(tokens: Token[]) {
    let toks: string[] = [];
    for (let i in tokens) toks.push(tokens[i].text);

    // console.log(tokens);
    const stack: string[] = [];
    let dirO: string = '';
    let expecting: string = '';
    const secondV = this.rules.seperateMatches(toks[0]);
    if (secondV) expecting = secondV;

    if (secondV) {
      toks.map(it => {
        if (secondV && !this.rules.matchKeyWords(it)) {
          stack.push(it);
        } else {
          dirO = it;
        }
      });
    }
    // console.log(stack);
    // console.log(dirO);

    let beginOfPhrase: number = 0;
    let matched: ConstructionOfPhrase = new ConstructionOfPhrase([]);
    for (let i = 0; i < toks.length; i++) {
      if (i - beginOfPhrase == 0) {
        matched = this.makePhrases(toks, beginOfPhrase);
        //console.log(matched)
        if (matched.elements.length) {
          beginOfPhrase += matched.elements.length;
          this.phrases.push(matched);
          this.tagSpeeches();
        }
      }
    }
  }

  tag(doc: Document) {
    this.match(doc.tokens);

    let ces: Array<ConstructionElement> = new Array();

    for (let i in this.phrases) {
      doc.phrases.push(this.phrases[i]);
      for (let j in this.phrases[i].elements) {
        ces.push(this.phrases[i].elements[j]);
      }
    }

    for (let i = 0; i < ces.length; i++) {
      if (doc.tokens[i].text === ces[i].orth) {
        doc.tokens[i].pos = ces[i].pos;
        doc.tokens[i].tag = ces[i].tag;
      }
    }

    return doc;
  }
}
