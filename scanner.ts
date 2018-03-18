
//------------------------------------------------------------------------------
//  Regular Expressions
//------------------------------------------------------------------------------

export class ScannerRegex {
    // alphabets
    // upper case
    public static readonly ALPHABET = /A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z/g;
    // lower case
    public static readonly alphabet = /a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z/g;
    // escape characters
    public static readonly ENDOFFILE = "\0";
    public static readonly TAB = "\t";
    public static readonly NEWLINE = "\n";
    public static readonly CARRIAGERETURN = "\r";
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
      console.log("%cthis cargo is %s.", "color: blue; font-size: medium", this.cargo);

      this.cargo = c;
      console.log("%cthis cargo is %s.", "color: blue; font-size: medium", this.cargo);

      this.lineIndex = lineIndex;
      this.colIndex = colIndex;
      this.sourceIndex = sourceIndex;
      this.sourceText = sourceText;
    }

    toString() {
        console.log("%cthis cargo is %s.", "color: blue; font-size: medium", this.cargo);
        return this.cargo;
    }

    print() {
        let output = "";

        if(this.cargo == ScannerRegex.WHITESPACE) output = " space";
        else if(this.cargo == ScannerRegex.NEWLINE) output = " newline";
        else if(this.cargo == ScannerRegex.TAB) output = " tab";
        else if(this.cargo == ScannerRegex.CARRIAGERETURN) output = " carriage return";
        else if(this.cargo == ScannerRegex.ENDOFFILE) output = " eof";
        else if(this.cargo.match(ScannerRegex.ALPHABET) || this.cargo.match(ScannerRegex.alphabet)) output = this.cargo;
        else output = " invalid character";
        
        return "   " + this.lineIndex.toString() + "      " + this.colIndex.toString() + " " + output;
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