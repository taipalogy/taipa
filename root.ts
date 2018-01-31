class RootPattern {
    pattern: string;

    constructor(p: string) {
        this.pattern = p;
    }
}

export class RootValidator {

    patterns: Array<RootPattern>;

    rootPatternA: RootPattern;
    rootPatternI: RootPattern;
    rootPatternU: RootPattern;
    rootPatternIr: RootPattern;
    rootPatternE: RootPattern;
    rootPatternO: RootPattern;
    rootPatternEr: RootPattern;
    rootPatternUr: RootPattern;
    rootPatternTi: RootPattern;
    rootPatternSi: RootPattern;
    rootPatternSu: RootPattern;

    constructor() {
        this.patterns = new Array();

        this.rootPatternA = new RootPattern("a(i(nn)?|m|n(g|n)?|u)?");
        this.rootPatternI = new RootPattern("i(a(m|n(g|n)?|u(nn)?)?|m|n(g|n)?|o|u(nn)?|ur)?");
        this.rootPatternU = new RootPattern("u(a(i(nn)?|n(n|g)?)?|e|i|n)?");
        this.rootPatternIr = new RootPattern("ir(i|n)?");
        this.rootPatternE = new RootPattern("e");
        this.rootPatternO = new RootPattern("o(m|n(n|g)?)?");
        this.rootPatternEr = new RootPattern("er(e|n)?");
        this.rootPatternUr = new RootPattern("ur");
        this.rootPatternTi = new RootPattern("ti(a(u|m|n(n|g)?)?|m|n(n|g)?|ong|ur?)?");
        this.rootPatternSi = new RootPattern("si(a(m|n(n|g)?|u)?|m|n(n|g)?|ong|ur?)?");
        this.rootPatternSu = new RootPattern("s(u(i|n(g)?)?|iri?)");

        this.patterns.push(this.rootPatternA);
        this.patterns.push(this.rootPatternI);
        this.patterns.push(this.rootPatternU);
        this.patterns.push(this.rootPatternIr);
        this.patterns.push(this.rootPatternE);
        this.patterns.push(this.rootPatternO);
        this.patterns.push(this.rootPatternEr);
        this.patterns.push(this.rootPatternUr);
        this.patterns.push(this.rootPatternTi);
        this.patterns.push(this.rootPatternSi);
        this.patterns.push(this.rootPatternSu);
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