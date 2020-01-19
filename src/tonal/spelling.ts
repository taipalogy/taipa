import { Tonal } from './version2';

interface Tonals {
    tonals: Array<Tonal>;
}

export class TwoTonals implements Tonals {
    tonals: [Tonal, Tonal] = [new Tonal(), new Tonal()];
    constructor(t1: Tonal, t2: Tonal) {
        this.tonals[0] = t1;
        this.tonals[1] = t2;
    }
}

export type TwoTonalSpelling = { pos: [number, number]; patterns: TwoTonals[] };
