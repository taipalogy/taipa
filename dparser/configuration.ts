import { Relation } from './relation'

export abstract class Transition<T> {
    abstract do(c: Configuration<T>): Configuration<T>
}

export class Shift<T> extends Transition<T> {
    do(c: Configuration<T>) {
        let s = c.queue.shift()
        if(s != undefined) {
            c.stack.push(s);
        }
        return c;
    }
}

export class RightArc<T> extends Transition<T> {
    do(c: Configuration<T>) {
        c.stack.pop();
        return c;
    }
}

export class LeftArc<T> extends Transition<T> {
    do(c: Configuration<T>) {
        const top = c.stack.pop()
        c.stack.pop()
        if(top) c.stack.push(top)
        return c;
    }
}

export class Configuration<T> {
    queue: Array<T> = new Array()
    stack: Array<T> = new Array()
    relations: Array<Relation> = new Array();

    getGraph() {
        return this.relations;
    }
    
    isTerminalConfiguration() {
        if(this.queue.length > 0) {
            return false;
        }
        if(this.stack.length == 1 && this.queue.length == 0) {
            return true;
        }
        return false;
    }
}
