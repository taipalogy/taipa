import { Configuration, Transition, Shift, LeftArc, RightArc } from './configuration';
import { DependencyLabels, Tagset } from './symbols';
import { Relation } from './relation';
import { Token } from '../token';

export class Guide {
    transitions: Array<Transition> = new Array();
    private s1: Token = new Token('');
    private s2: Token = new Token('');
    private b1: Token = new Token('');

    private s1_b1_map = new Map<string, Transition>()
        .set(Tagset.VB + Tagset.PPV, new Shift())
        .set(Tagset.NPR + Tagset.VB, new Shift())
        .set(Tagset.NPR + Tagset.NPR, new Shift())
        .set(Tagset.APPR + Tagset.NPR, new Shift())
        .set(Tagset.VB + Tagset.NPR, new Shift())
        .set(Tagset.VB + Tagset.AUXN, new Shift())
        .set(Tagset.AUX + Tagset.VB, new Shift())
        .set(Tagset.PADV + Tagset.VB, new Shift())
        .set(Tagset.NPR + Tagset.PADV, new Shift())
        .set(Tagset.VB + Tagset.APPR, new Shift())
        .set(Tagset.VB + Tagset.PADV, new Shift())
        .set(Tagset.NPR + Tagset.AUX, new Shift())
        .set(Tagset.PPV + Tagset.AUXN, new RightArc())
        .set(Tagset.PPV + Tagset.NPR, new RightArc());

    private s2_s1_map = new Map<string, Transition>()
            .set(Tagset.VB + Tagset.PPV, new RightArc())
            .set(Tagset.VB + Tagset.AUXN, new RightArc())
            .set(Tagset.AUX + Tagset.VB, new LeftArc())
            .set(Tagset.PADV + Tagset.VB, new LeftArc())
            .set(Tagset.APPR + Tagset.NPR, new LeftArc())
            .set(Tagset.VB + Tagset.VB, new RightArc())
            .set(Tagset.VB + Tagset.NPR, new RightArc())
            .set(Tagset.NPR + Tagset.VB, new LeftArc());

    private isQueueEmpty(c: Configuration) {
        if (c.queue.length === 0) return true;
        return false;
    }

    private isStackEmpty(c: Configuration) {
        if (c.stack.length === 2) return true;
        return false;
    }

    getNextTransition(c: Configuration) {
        this.s1 = new Token('');
        if (c.stack.length > 0) this.s1 = c.stack[c.stack.length - 1];
        this.s2 = new Token('');
        if (c.stack.length > 1) this.s2 = c.stack[c.stack.length - 2];
        this.b1 = new Token('');
        if (c.queue.length > 0) this.b1 = c.queue[0];
    
        if (this.s1.tag != '' && this.b1.tag != '') {
            if(this.s1_b1_map.has(this.s1.tag + this.b1.tag)) {
                const tran = this.s1_b1_map.get(this.s1.tag + this.b1.tag);
                if(tran) {
                    this.transitions.push(tran);
                }
            }
        } else if (this.isQueueEmpty(c)) {
            if(this.s2_s1_map.has(this.s2.tag + this.s1.tag)) {
                const tran = this.s2_s1_map.get(this.s2.tag + this.s1.tag);
                if(tran) {
                    this.transitions.push(tran);
                }
            } else if (this.isStackEmpty(c)) {
                this.transitions.push(new RightArc());
            }
        }

        if (this.transitions.length == 0) return undefined;
        return this.transitions.shift();
    }
}
