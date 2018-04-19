import { Scanner, ScannedCharacter, ScannerRegex } from './../core/scanner';

//------------------------------------------------------------------------------
//  Type constants
//------------------------------------------------------------------------------

export class Type {
    public static readonly IDENTIFIER = "Identifier";
    public static readonly WHITESPACE = "Whitespace";
    public static readonly ENDOFFILE = "EndOfFile"
}

//------------------------------------------------------------------------------
//  Token
//------------------------------------------------------------------------------

export class Token {
    cargo: Type;
    sourceIndex: number;
    lineIndex: number;
    colIndex: number;
    type: Type;

    constructor(startChar) {
        this.cargo = startChar.cargo;
        this.sourceIndex = startChar.sourceIndex;
        this.lineIndex = startChar.lineIndex;
        this.colIndex = startChar.colIndex;
        this.type = null;
    }

    show() {
        let s: string = "";

        if(this.type == Type.WHITESPACE) {
            s = s + "Whitespace" + ": " + this.cargo.toString();
        } else if(this.type == Type.IDENTIFIER) {
            s = s + this.type + ": " + this.cargo;
        } else {
            // the end of the input
            s = s + this.type + ".";
        }

        return s;
    }

    abort(msg: string) {
        console.log(msg);
    }
}

//------------------------------------------------------------------------------
//  Lexer
//------------------------------------------------------------------------------

export class Lexer {
    scanner: Scanner;
    c1: string;
    c2: string;
    character: ScannedCharacter;

    whiteSpaceChars: RegExp = /[\ ]/;
    identifierChars: RegExp = /[a-z]/;

    constructor(sourceText: string) {
        this.scanner = new Scanner(sourceText);
        this.getChar();
        //console.log("c1: ", this.c1);
    }

    get() {
        while(this.c1.match(this.whiteSpaceChars)) {
            let token = new Token(this.character);
            token.type = Type.WHITESPACE;
            this.getChar();

            while(this.c1.match(this.whiteSpaceChars)) {
                token.cargo += this.c1;
            }

            return token;
        }

        let token = new Token(this.character);
        //console.log("this.character", this.character);

        if(this.c1 == ScannerRegex.ENDOFFILE) {
            token.type = Type.ENDOFFILE;
            return token;
        }

        if(this.c1.match(this.identifierChars)) {
            token.type = Type.IDENTIFIER;
            this.getChar();

            while(this.c1.match(this.identifierChars)) {
                token.cargo += this.c1;
                this.getChar();
            }
            return token;
        }

        token.abort("I found a character or symbol that I do not recognize" + this.c1.toString());
    }

    getChar() {

        this.character = this.scanner.get();
        this.c1 = this.character.cargo;
        this.c2 = this.c1 + this.scanner.lookahead(1);
    }
}