import { Document } from './document';
import { Tagset } from './dparser/symbols';
import { TonalWord } from './unchange/lexeme';
import { PhrasalVerbs } from './dparser/rules';
import { PositionalLetter, Word } from './unit';
import { lemmatize } from './unchange/lemmatizer';

export class Node {
  /** The simple part-of-speech tag. */
  pos: string = ''; // upos. universal pos.
  /** The detailed, language-specific part-of-speech tag. */
  tag: string = ''; // xpos
  /** The base form of the word. */
  lemma: string = '';
  /** Syntactic dependnecy */
  dep: string = ''; // deprel
  /** The head of this token */
  head: string = '';

  /**
   * Constructor of Token.
   * @param token The text of the token
   */
  constructor(public token: string) {}
}

export class TokenAnalysis {
  /** Analyzed token. */
  word: Word = new Word();
  /** Base forms of the word. */
  lemmas: Array<Word> = new Array();
  /** Inflectional suffix. */
  inflectionalEnding: string = '';
  /** positional letter sequences. */
  letterSequences: Array<PositionalLetter[]> = new Array();
  /** Syllabic block or syllabogram sequences. */
  blockSequences: string[] = [];
  /** Uncombining form sequences. */
  uncombiningSequences: Array<string[]> = new Array(); // uncombining form sequences
}

export class TokenLemma {
  getTonalLemmas(doc: Document): Document {
    const sophv = new PhrasalVerbs();
    let j: number = 0;
    let k: number = 0;
    let len: number = 0;

    for (let i = 0; i < doc.nodes.length; i++) {
      if (len == i) {
        // loop over the doc.phrases sequence
        if (j < doc.phrases.length) {
          len += doc.phrases[j].elements.length;
          if (j + 1 < doc.phrases.length) j++;
          k = 0;
        }
      } else {
        k++;
      }

      if (doc.nodes[i].token === 'che' || doc.nodes[i].token === 'he') {
        doc.nodes[i].lemma = doc.nodes[i].token;
        continue; // defective
      }
      if (doc.nodes[i].tag === Tagset.psub || doc.nodes[i].tag === Tagset.aux) {
        doc.nodes[i].lemma = doc.nodes[i].token;
        continue;
      }
      if (doc.nodes[i].tag === Tagset.vb && i + 1 < doc.nodes.length) {
        if (i + 2 < doc.nodes.length && doc.nodes[i + 2].tag === Tagset.ppv) {
          // phrasal verbs of length 3

          const base = sophv.match([
            doc.nodes[i].token,
            doc.nodes[i + 1].token,
            doc.nodes[i + 2].token,
          ]);
          if (base != '') {
            const lemmas = base.split(' ');
            doc.nodes[i].lemma = lemmas[0];
            doc.nodes[i + 1].lemma = lemmas[1];
            doc.nodes[i + 2].lemma = lemmas[2];
            i++;
          }
          continue;
        } else if (
          doc.nodes[i + 1].tag === Tagset.ppv ||
          doc.nodes[i + 1].tag === Tagset.appr
        ) {
          // phrasal verbs of length 2

          const base = sophv.match([
            doc.nodes[i].token,
            doc.nodes[i + 1].token,
          ]);
          if (base != '') {
            const lemmas = base.split(' ');
            doc.nodes[i].lemma = lemmas[0];
            doc.nodes[i + 1].lemma = lemmas[1];
            i++;
          }
          continue;
        }
      }
      if (doc.nodes[i].tag === Tagset.vb) {
        if (i + 1 < doc.nodes.length && doc.nodes[i + 1].tag === Tagset.psub) {
          doc.nodes[i].lemma = doc.nodes[i].token; // copy the base form
          continue;
        }
      }
      if (doc.phrases[j] && k + 1 == doc.phrases[j].elements.length) {
        // at the end of a speech
        // need to further check if the speech is a noun chunk or verb phrase
        doc.nodes[i].lemma = doc.nodes[i].token; // copy the base form
        continue;
      }

      let lemmas: TonalWord[] = [];
      lemmas = lemmatize(doc.nodes[i].token).getLemmas();
      if (lemmas.length > 0) doc.nodes[i].lemma = lemmas[0].literal;
    }
    return doc;
  }
}
