import { VerbSurface } from "./keywords";

export class Dictionary {
    lookup(str: string) {
        if(str === 'pah') return new VerbSurface(str);
    }
}