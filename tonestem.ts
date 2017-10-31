class ToneStemPattern {
    pattern: string;

    constructor(p: string) {
        this.pattern = p;
    }
}

export class ToneStemValidator {

    patterns: Array<ToneStemPattern>;

    toneStemPatternA: ToneStemPattern;
    toneStemPatternI: ToneStemPattern;
    toneStemPatternU: ToneStemPattern;
    toneStemPatternIr: ToneStemPattern;
    toneStemPatternE: ToneStemPattern;
    toneStemPatternO: ToneStemPattern;
    toneStemPatternEr: ToneStemPattern;
    toneStemPatternUr: ToneStemPattern;
    toneStemPatternTi: ToneStemPattern;
    toneStemPatternSi: ToneStemPattern;
    toneStemPatternSu: ToneStemPattern;

    constructor() {
        this.patterns = new Array();

        this.toneStemPatternA = new ToneStemPattern("a(i(nn)?|m|n(g|n)?|u)?");
        this.toneStemPatternI = new ToneStemPattern("i(a(m|n(g|n)?|u(nn)?)?|m|n(g|n)?|o|u(nn)?|ur)?");
        this.toneStemPatternU = new ToneStemPattern("u(a(i(nn)?|n(n|g)?)?|e|i|n)?");
        this.toneStemPatternIr = new ToneStemPattern("ir(i|n)?");
        this.toneStemPatternE = new ToneStemPattern("e");
        this.toneStemPatternO = new ToneStemPattern("o(m|n(n|g)?)?");
        this.toneStemPatternEr = new ToneStemPattern("er(e|n)?");
        this.toneStemPatternUr = new ToneStemPattern("ur");
        this.toneStemPatternTi = new ToneStemPattern("ti(a(u|m|n(n|g)?)?|m|n(n|g)?|ong|ur?)?");
        this.toneStemPatternSi = new ToneStemPattern("si(a(m|n(n|g)?|u)?|m|n(n|g)?|ong|ur?)?");
        this.toneStemPatternSu = new ToneStemPattern("s(u(i|n(g)?)?|iri?)");

        this.patterns.push(this.toneStemPatternA);
        this.patterns.push(this.toneStemPatternI);
        this.patterns.push(this.toneStemPatternU);
        this.patterns.push(this.toneStemPatternIr);
        this.patterns.push(this.toneStemPatternE);
        this.patterns.push(this.toneStemPatternO);
        this.patterns.push(this.toneStemPatternEr);
        this.patterns.push(this.toneStemPatternUr);
        this.patterns.push(this.toneStemPatternTi);
        this.patterns.push(this.toneStemPatternSi);
        this.patterns.push(this.toneStemPatternSu);
    }

    validate(s: string) {
        for(let i = 0; i < this.patterns.length; i++) {
            let matches = s.match(new RegExp(this.patterns[i].pattern));
            if(matches) {
                return matches;
            }
        }
        return null;
    }
}