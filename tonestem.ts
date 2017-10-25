class ToneStem {
    pattern: string;

    constructor(p: string) {
        this.pattern = p;
    }
}

export class ToneStemValidator {

    regexes: Array<RegExp>;

    toneStemA: ToneStem;
    toneStemI: ToneStem;
    toneStemU: ToneStem;
    toneStemIr: ToneStem;
    toneStemE: ToneStem;
    toneStemEr: ToneStem;
    toneStemEe: ToneStem;
    toneStemUee: ToneStem;
    toneStemTi: ToneStem;
    toneStemSi: ToneStem;
    toneStemSu: ToneStem;

    constructor() {
        this.toneStemA = new ToneStem("a(i(nn)?|m|n(g|n)?|u)?");
        this.toneStemI = new ToneStem("i(a(m|n(g|n)?|u(nn)?)?|m|n(g|n)?|o|u(nn)?|ur)?");
        this.toneStemU = new ToneStem("u(a(i(nn)?|n(n|g)?)?|e|i|n)?");
        this.toneStemIr = new ToneStem("ir(i|n)?");
        this.toneStemE = new ToneStem("e");
        this.toneStemEr = new ToneStem("er(e|n)?");
        this.toneStemTi = new ToneStem("ti(a(u|m|n(n|g)?)?|m|n(n|g)?|ong|ur?)?");
        this.toneStemSi = new ToneStem("si(a(m|n(n|g)?|u)?|m|n(n|g)?|ong|ur?)?");
        this.toneStemSu = new ToneStem("s(u(i|n(g)?)?|iri?)");



        this.regexes.push(new RegExp(this.toneStemA.pattern));
    }
    validate(s: string) {
    
    }
}