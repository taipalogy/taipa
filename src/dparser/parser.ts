import {
  Configuration,
  Transition,
  Shift,
  RightArc,
  LeftArc,
} from './configuration';
import { Guide } from './guide';
import { Node } from '../document';
import { DependencyLabels, Tagset } from './symbols';
import { Relation } from './relation';

export class DependencyParser {
  private c: Configuration = this.getInitialConfiguration();

  private s1: Node = new Node('');
  private s2: Node = new Node('');
  private b1: Node = new Node('');

  private s1B1RightRelations = new Map<string, DependencyLabels>()
    .set(Tagset.ppv + Tagset.psub, DependencyLabels.compoundPrt)
    .set(Tagset.ppv + Tagset.npr, DependencyLabels.compoundPrt);

  private s1B1LeftRelations = new Map<string, DependencyLabels>();

  private s2S1RightRelations = new Map<string, DependencyLabels>()
    .set(Tagset.vb + Tagset.ppv, DependencyLabels.compoundPrt)
    .set(Tagset.vb + Tagset.psub, DependencyLabels.prt)
    .set(Tagset.vb + Tagset.vb, DependencyLabels.compound)
    .set(Tagset.vb + Tagset.npr, DependencyLabels.obj);

  private s2S1LeftRelations = new Map<string, DependencyLabels>()
    .set(Tagset.aux + Tagset.vb, DependencyLabels.aux)
    .set(Tagset.padv + Tagset.vb, DependencyLabels.advmod)
    .set(Tagset.appr + Tagset.npr, DependencyLabels.case);

  private getInitialConfiguration() {
    return new Configuration();
  }

  private apply(t: Transition, c: Configuration) {
    return t.do(c);
  }

  private isQueueEmpty() {
    if (this.c.queue.length === 0) return true;
    return false;
  }

  private isTwoNodesInStack() {
    if (this.c.stack.length === 2) return true;
    return false;
  }

  private rightRelation(label: DependencyLabels): Relation {
    this.s1.dep = label;
    this.s1.head = this.s2.token;
    return new Relation(label, this.s2, this.s1);
  }

  private leftRelation(label: DependencyLabels): Relation {
    this.s2.dep = label;
    this.s2.head = this.s1.token;
    return new Relation(label, this.s1, this.s2);
  }

  private setS1S2B1() {
    this.s1 = new Node('');
    if (this.c.stack.length > 0)
      this.s1 = this.c.stack[this.c.stack.length - 1];
    this.s2 = new Node('');
    if (this.c.stack.length > 1)
      this.s2 = this.c.stack[this.c.stack.length - 2];
    this.b1 = new Node('');
    if (this.c.queue.length > 0) this.b1 = this.c.queue[0];
  }

  private setS1B1Relation(t: Transition) {
    if (t instanceof RightArc) {
      if (this.s1B1RightRelations.has(this.s1.tag + this.b1.tag)) {
        const rel = this.s1B1RightRelations.get(this.s1.tag + this.b1.tag);
        if (rel) {
          this.c.relations.push(this.rightRelation(rel));
        }
      }
    } else if (t instanceof LeftArc) {
      if (this.s1B1LeftRelations.has(this.s1.tag + this.b1.tag)) {
        const rel = this.s1B1LeftRelations.get(this.s1.tag + this.b1.tag);
        if (rel) {
          this.c.relations.push(this.leftRelation(rel));
        }
      }
    }
  }

  private s2S1LeftArgsToPronoun = new Map<
    string,
    DependencyLabels[]
  >().set(Tagset.npr + Tagset.vb, [
    DependencyLabels.nsubj,
    DependencyLabels.dislocated,
  ]);

  private setS2S1Relation(t: Transition) {
    if (t instanceof RightArc) {
      if (this.s2S1RightRelations.has(this.s2.tag + this.s1.tag)) {
        const rel = this.s2S1RightRelations.get(this.s2.tag + this.s1.tag);
        if (rel) {
          this.c.relations.push(this.rightRelation(rel));
        }
      } else if (this.isTwoNodesInStack()) {
        this.c.relations.push(this.rightRelation(DependencyLabels.root));
      }
    } else if (t instanceof LeftArc) {
      if (this.s2S1LeftRelations.has(this.s2.tag + this.s1.tag)) {
        const rel = this.s2S1LeftRelations.get(this.s2.tag + this.s1.tag);
        if (rel) {
          this.c.relations.push(this.leftRelation(rel));
        }
      } else if (this.s2S1LeftArgsToPronoun.has(this.s2.tag + this.s1.tag)) {
        // TODO: to be improved
        const labelsPronoun = this.s2S1LeftArgsToPronoun.get(
          this.s2.tag + this.s1.tag
        );
        const rels = this.c.relations.filter(
          it => it.dependent.token === 'gua'
        );

        if (labelsPronoun)
          if (this.s2.token === 'gua') {
            this.c.relations.push(this.leftRelation(labelsPronoun[0]));
          } else if (
            this.s2.token === 'che' &&
            rels.length > 0 &&
            rels[0].dependent.token === 'gua' &&
            rels[0].dependent.tag === Tagset.npr
          ) {
            this.c.relations.push(this.leftRelation(labelsPronoun[1]));
          }
      }
    }
  }

  parse(nodes: Node[]): Relation[] {
    for (let t of nodes) {
      this.c.queue.push(t);
    }

    let guide = new Guide();
    let rt = new Node('ROOT');
    this.c.stack.push(rt);

    if (this.c.stack.length == 1 && this.c.queue.length > 0) {
      // initial configuration
      // shift the first lexeme from queue to stack
      guide.transitions.push(new Shift());
    }

    while (!this.c.isTerminalConfiguration()) {
      let t = guide.getNextTransition(this.c);
      if (t == null || t == undefined) break;

      this.setS1S2B1();
      if (this.s1.tag != '' && this.b1.tag != '') {
        this.setS1B1Relation(t);
      } else if (this.isQueueEmpty()) {
        this.setS2S1Relation(t);
      }

      this.c = this.apply(t, this.c);
    }

    return this.c.relations;
  }
}
