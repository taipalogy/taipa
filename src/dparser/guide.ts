import {
  Configuration,
  Transition,
  Shift,
  LeftArc,
  RightArc,
} from './configuration';
import { Tagset } from './symbols';
import { Node } from '../document';

export class Guide {
  transitions: Array<Transition> = new Array();
  private s1: Node = new Node('');
  private s2: Node = new Node('');
  private b1: Node = new Node('');

  private s1B1Map = new Map<string, Transition>()
    .set(Tagset.vb + Tagset.ppv, new Shift())
    .set(Tagset.npr + Tagset.vb, new Shift())
    .set(Tagset.npr + Tagset.npr, new Shift())
    .set(Tagset.appr + Tagset.npr, new Shift())
    .set(Tagset.vb + Tagset.npr, new Shift())
    .set(Tagset.vb + Tagset.psub, new Shift())
    .set(Tagset.aux + Tagset.vb, new Shift())
    .set(Tagset.padv + Tagset.vb, new Shift())
    .set(Tagset.npr + Tagset.padv, new Shift())
    .set(Tagset.vb + Tagset.appr, new Shift())
    .set(Tagset.vb + Tagset.padv, new Shift())
    .set(Tagset.npr + Tagset.aux, new Shift())
    .set(Tagset.ppv + Tagset.psub, new RightArc())
    .set(Tagset.ppv + Tagset.npr, new RightArc());

  private s2S1Map = new Map<string, Transition>()
    .set(Tagset.vb + Tagset.ppv, new RightArc())
    .set(Tagset.vb + Tagset.psub, new RightArc())
    .set(Tagset.aux + Tagset.vb, new LeftArc())
    .set(Tagset.padv + Tagset.vb, new LeftArc())
    .set(Tagset.appr + Tagset.npr, new LeftArc())
    .set(Tagset.vb + Tagset.vb, new RightArc())
    .set(Tagset.vb + Tagset.npr, new RightArc())
    .set(Tagset.npr + Tagset.vb, new LeftArc());

  private isQueueEmpty(c: Configuration) {
    if (c.queue.length === 0) return true;
    return false;
  }

  private isTwoNodesInStack(c: Configuration) {
    if (c.stack.length === 2) return true;
    return false;
  }

  getNextTransition(c: Configuration) {
    this.s1 = new Node('');
    if (c.stack.length > 0) this.s1 = c.stack[c.stack.length - 1];
    this.s2 = new Node('');
    if (c.stack.length > 1) this.s2 = c.stack[c.stack.length - 2];
    this.b1 = new Node('');
    if (c.queue.length > 0) this.b1 = c.queue[0];

    if (this.s1.tag != '' && this.b1.tag != '') {
      if (this.s1B1Map.has(this.s1.tag + this.b1.tag)) {
        const tran = this.s1B1Map.get(this.s1.tag + this.b1.tag);
        if (tran) {
          this.transitions.push(tran);
        }
      }
    } else if (this.isQueueEmpty(c)) {
      if (this.s2S1Map.has(this.s2.tag + this.s1.tag)) {
        const tran = this.s2S1Map.get(this.s2.tag + this.s1.tag);
        if (tran) {
          this.transitions.push(tran);
        }
      } else if (this.isTwoNodesInStack(c)) {
        this.transitions.push(new RightArc());
      }
    }

    if (this.transitions.length == 0) return undefined;
    return this.transitions.shift();
  }
}
