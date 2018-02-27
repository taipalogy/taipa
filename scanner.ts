
//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class ScannerRegex {
    public static readonly ALPHABET = /A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z/g;
    public static readonly aLPHABET = /a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/g;
    // escape characters
    public static readonly ENDOFFILE = "\0";
    public static readonly TAB = "\t";
    public static readonly NEWLINE = "\n";
    public static readonly WHITESPACE = " ";
}

//------------------------------------------------------------------------------
//  Character
//------------------------------------------------------------------------------

export class Character {
    
    cargo: string;
    lineIndex: number;
    colIndex: number;
    sourceIndex: number;
    sourceText: string;

    constructor(c: string, lineIndex:number, colIndex: number, sourceIndex: number, sourceText: string) {
      this.cargo = c;
      this.lineIndex = lineIndex;
      this.colIndex = colIndex;
      this.sourceIndex = sourceIndex;
      this.sourceText = sourceText;
    }

    toString() {
        let cargo = "";

        if(this.cargo == ScannerRegex.WHITESPACE) cargo = " space";
        else if(this.cargo == ScannerRegex.NEWLINE) cargo = " newline";
        else if(this.cargo == ScannerRegex.TAB) cargo = " tab";
        else if(this.cargo == ScannerRegex.ENDOFFILE) cargo = " eof";
        else if(this.cargo.match(ScannerRegex.ALPHABET) || this.cargo.match(ScannerRegex.aLPHABET)) cargo = this.cargo;
        else cargo = " invalid character";
        
        return "   " + this.lineIndex.toString() + "      " + this.colIndex.toString() + " " + cargo;
    }
}

//------------------------------------------------------------------------------
//  Scanner
//------------------------------------------------------------------------------

export class Scanner {
    
    sourceText: string;
    sourceIndex: number;
    lastIndex: number;
    lineIndex: number;
    colIndex: number;
    char: Character;
    c: string;

    constructor(sourceText: string) {
        this.sourceText = sourceText;
        this.sourceIndex = -1;
        this.lastIndex = sourceText.length - 1;
        this.lineIndex = 0;
        this.colIndex = -1;
    }

    get() {
        this.sourceIndex += 1;

        if(this.sourceIndex > 0) {
            if(this.sourceText[this.sourceIndex - 1] == '\n') {
                this.lineIndex += 1;
                this.colIndex = -1;
            }
        }

        this.colIndex += 1;

        if(this.sourceIndex > this.lastIndex) {
            this.char = new Character(ScannerRegex.ENDOFFILE, this.lineIndex, this.colIndex, this.sourceIndex, this.sourceText);
        } else {
            this.c = this.sourceText[this.sourceIndex];
            this.char = new Character(this.c, this.lineIndex, this.colIndex, this.sourceIndex, this.sourceText);
        }
        return this.char;
    }

    lookahead(offset: number) {
        let index: number = this.sourceIndex + offset;

        if(index > this.lastIndex) {
            return ScannerRegex.ENDOFFILE;
        } else {
            return this.sourceText[index];
        }
    }
}