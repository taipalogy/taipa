import { Lexicon, lexicon } from './lexicon';

//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class MorphologicalAnalyzerRegex {
    public static readonly rootRegex = /ji|si|su|tia/g;
    public static readonly interfixRegex = 
        /ss|y|w|pp?|tt?|kk?|hh?|x|fx|bx|dx|gx|zzs|zs|bb?|dd?|gg?|ff?|xx/g;
}

//------------------------------------------------------------------------------
//  IMorpheme
//------------------------------------------------------------------------------

interface IMorpheme {
    literal: string;
}

//------------------------------------------------------------------------------
//  Sub-Expressions
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Morpheme
//------------------------------------------------------------------------------

interface IMorpheme {
    literal: string;
}

class Morpheme implements IMorpheme {
    next: Morpheme;
    literal: string;
}

export class ToneSandhiAffix extends Morpheme {
    private object: any;
    funktion: Function;

    getObject() {return this.object;}
}

class ToneSandhiPrefix extends ToneSandhiAffix {
    root: string;
    interfix: string;
}

class ToneSandhiInfix extends ToneSandhiAffix {
    root: string;
    interfix: string;
}

class ToneSandhiSuffix extends ToneSandhiAffix {
    root: string;
    suffix: string;
}

//------------------------------------------------------------------------------
//  ToneSandhiMorphologicalAnalyzer
//------------------------------------------------------------------------------

export class ToneSandhiMorphologicalAnalyzer {
    roots: Array<string>;
    interfixes: Array<string>;
    affixes: Array<ToneSandhiAffix>;

    constructor(l: string) {
        // inject the lexicon
        this.roots = l.match(MorphologicalAnalyzerRegex.rootRegex);
        console.log("literal:" + l + " roots:" + this.roots);
        this.interfixes = l.match(MorphologicalAnalyzerRegex.interfixRegex);
        // initialize the affix array
        this.affixes = new Array();
    }

    analyze() {
        if(this.roots && this.interfixes) {
            console.log("analyzing roots and interfixes");
            if(this.roots.length == this.interfixes.length) {
                let len = this.roots.length;
                console.log("analyzing affixes, length of roots: %d", this.roots.length);
                for(let i = 0; i < len; i++) {
                    if(i == 0) {
                        // prefix
                        console.log("analyzing prefix");
                        let p = new ToneSandhiPrefix();
                        p.root = this.roots.shift();
                        p.interfix = this.interfixes.shift();
                        if(this.found(p.root, p.interfix)) {
                            console.log("analyzing prefix. found");
                            this.affixes.push(p);
                        }
                    } else if(i + 1 < len) {
                        //interfix
                        console.log("analyzing infix");
                        let i = new ToneSandhiInfix();
                        i.root = this.roots.shift();
                        i.interfix = this.interfixes.shift();
                        if(this.found(i.root, i.interfix)) {
                            console.log("analyzing interfix. found");
                            this.affixes.push(i);
                        }
                    } else {
                        // suffix
                        console.log("analyzing suffix");
                        let s = new ToneSandhiSuffix();
                        s.root = this.roots.shift();
                        s.suffix = this.interfixes.shift();
                        if(this.found(s.root, s.suffix)) {
                            console.log("analyzing suffix. found");
                            this.affixes.push(s);
                        }
                    }
                }
            }
        }

        return this.affixes;
    }

    found(s: string, bm: string) {
        if(lexicon.found(s + bm)) {
            console.log("morpheme found");
            return true;
        }
        console.log("morpheme not found");
        return false;
    }
}
  