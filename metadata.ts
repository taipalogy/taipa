


class Rule {
}

class SymbolN extends Rule {
    SymbolOne: number = 0;
    SymbolTwo: number = 1;
    SymbolThree: number = 2;
    getLength() {
        return Object.keys(this).length;
    }
}


class Component {

}

class Character {
    symbol: string;
    //components:
    constructor(s: string) {
        try {
            if(s.length == 1) {
                this.symbol = s;
            }
        } catch(message) {
            console.log("something wrong creating character");
        }
    }
}

class Letter {
    characters: Array<Character>;
    constructor(characters: Array<Character>) {
        this.characters = new Array();
        this.characters = characters;
    }
}

class MyString {
    characters: Array<Character>;
    components: Array<Component>;
    //isIsometric() {}
}

export class Metadata {
    characterA: Character;
    characterB: Character;
    characterC: Character;
    characterD: Character;
    characterE: Character;
    characterF: Character;
    characterG: Character;
    characterH: Character;
    characterI: Character;
    characterJ: Character;
    characterK: Character;
    characterL: Character;
    characterM: Character;
    characterN: Character;
    characterO: Character;
    characterP: Character;
    characterQ: Character;
    characterR: Character;
    characterS: Character;
    characterT: Character;
    characterU: Character;
    characterV: Character;
    characterW: Character;
    characterX: Character;
    characterY: Character;
    characterZ: Character;
    characterCapitalizedA: Character;
    characterCapitalizedB: Character;
    characterCapitalizedC: Character;
    characterCapitalizedD: Character;
    characterCapitalizedE: Character;
    characterCapitalizedF: Character;
    characterCapitalizedG: Character;
    characterCapitalizedH: Character;
    characterCapitalizedI: Character;
    characterCapitalizedJ: Character;
    characterCapitalizedK: Character;
    characterCapitalizedL: Character;
    characterCapitalizedM: Character;
    characterCapitalizedN: Character;
    characterCapitalizedO: Character;
    characterCapitalizedP: Character;
    characterCapitalizedQ: Character;
    characterCapitalizedR: Character;
    characterCapitalizedS: Character;
    characterCapitalizedT: Character;
    characterCapitalizedU: Character;
    characterCapitalizedV: Character;
    characterCapitalizedW: Character;
    characterCapitalizedX: Character;
    characterCapitalizedY: Character;
    characterCapitalizedZ: Character;

    letterA: Letter;
    letterB: Letter;
    letterBx: Letter;
    letterC: Letter;
    letterD: Letter;
    letterDx: Letter;
    letterDr: Letter;
    letterE: Letter;
    letterF: Letter;
    letterFx: Letter;
    letterG: Letter;
    letterGx: Letter;
    letterH: Letter;
    letterI: Letter;
    letterJ: Letter;
    letterK: Letter;
    letterL: Letter;
    letterM: Letter;
    letterN: Letter;
    letterNn: Letter;
    letterNg: Letter;
    letterO: Letter;
    letterP: Letter;
    letterQ: Letter;
    letterS: Letter;
    letterSs: Letter;
    letterT: Letter;
    letterU: Letter;
    letterUr: Letter;
    letterV: Letter;
    letterW: Letter;
    letterX: Letter;
    letterXx: Letter;
    letterXxx: Letter;
    letterY: Letter;
    letterZ: Letter;
    letterZs: Letter;
    letterZzs: Letter;
    letterCapitalizedA: Letter;
    letterCapitalizedB: Letter;
    letterCapitalizedC: Letter;
    letterCapitalizedD: Letter;
    letterCapitalizedDr: Letter;
    letterCapitalizedE: Letter;
    letterCapitalizedF: Letter;
    letterCapitalizedG: Letter;
    letterCapitalizedH: Letter;
    letterCapitalizedI: Letter;
    letterCapitalizedJ: Letter;
    letterCapitalizedK: Letter;
    letterCapitalizedL: Letter;
    letterCapitalizedM: Letter;
    letterCapitalizedN: Letter;
    letterCapitalizedNn: Letter;
    letterCapitalizedNg: Letter;
    letterCapitalizedO: Letter;
    letterCapitalizedP: Letter;
    letterCapitalizedQ: Letter;
    letterCapitalizedS: Letter;
    letterCapitalizedSs: Letter;
    letterCapitalizedT: Letter;
    letterCapitalizedU: Letter;
    letterCapitalizedUr: Letter;
    letterCapitalizedV: Letter;
    letterCapitalizedW: Letter;
    letterCapitalizedX: Letter;
    letterCapitalizedXx: Letter;
    letterCapitalizedXxx: Letter;
    letterCapitalizedY: Letter;
    letterCapitalizedZ: Letter;
    letterCapitalizedZs: Letter;
    letterCapitalizedZzs: Letter;

    symbols: Rule;

    constructor(){
        this.characterA = new Character("a");
        this.characterB = new Character("b");
        this.characterC = new Character("c");
        this.characterD = new Character("d");
        this.characterE = new Character("e");
        this.characterF = new Character("f");
        this.characterG = new Character("g");
        this.characterH = new Character("h");
        this.characterI = new Character("i");
        this.characterJ = new Character("j");
        this.characterK = new Character("k");
        this.characterL = new Character("l");
        this.characterM = new Character("m");
        this.characterN = new Character("n");
        this.characterO = new Character("o");
        this.characterP = new Character("p");
        this.characterQ = new Character("q");
        this.characterR = new Character("r");
        this.characterS = new Character("s");
        this.characterT = new Character("t");
        this.characterU = new Character("u");
        this.characterV = new Character("v");
        this.characterW = new Character("w");
        this.characterX = new Character("x");
        this.characterY = new Character("y");
        this.characterZ = new Character("z");
        this.characterCapitalizedA = new Character("A");
        this.characterCapitalizedB = new Character("B");
        this.characterCapitalizedC = new Character("C");
        this.characterCapitalizedD = new Character("D");
        this.characterCapitalizedE = new Character("E");
        this.characterCapitalizedA = new Character("F");
        this.characterCapitalizedB = new Character("G");
        this.characterCapitalizedC = new Character("H");
        this.characterCapitalizedD = new Character("I");
        this.characterCapitalizedE = new Character("J");
        this.characterCapitalizedA = new Character("K");
        this.characterCapitalizedB = new Character("L");
        this.characterCapitalizedC = new Character("M");
        this.characterCapitalizedD = new Character("N");
        this.characterCapitalizedE = new Character("O");
        this.characterCapitalizedA = new Character("P");
        this.characterCapitalizedB = new Character("Q");
        this.characterCapitalizedC = new Character("R");
        this.characterCapitalizedD = new Character("S");
        this.characterCapitalizedE = new Character("T");
        this.characterCapitalizedA = new Character("U");
        this.characterCapitalizedB = new Character("V");
        this.characterCapitalizedC = new Character("W");
        this.characterCapitalizedD = new Character("X");
        this.characterCapitalizedE = new Character("Y");
        this.characterCapitalizedE = new Character("Z");

        this.letterA = new Letter([this.characterA]);
        this.letterB = new Letter([this.characterB]);
        this.letterBx = new Letter([this.characterB, this.characterX]);
        this.letterC = new Letter([this.characterC]);
        this.letterD = new Letter([this.characterD]);
        this.letterDx = new Letter([this.characterD, this.characterX]);
        this.letterE = new Letter([this.characterD]);
        this.letterF = new Letter([this.characterF]);
        this.letterFx = new Letter([this.characterF, this.characterX]);
        this.letterG = new Letter([this.characterG]);
        this.letterGx = new Letter([this.characterG, this.characterX]);
        this.letterH = new Letter([this.characterH]);
        this.letterI = new Letter([this.characterI]);
        this.letterJ = new Letter([this.characterJ]);
        this.letterK = new Letter([this.characterK]);
        this.letterL = new Letter([this.characterL]);
        this.letterM = new Letter([this.characterM]);
        this.letterN = new Letter([this.characterN]);
        this.letterNg = new Letter([this.characterN, this.characterG]);
        this.letterNn = new Letter([this.characterN, this.characterN]);
        this.letterO = new Letter([this.characterO]);
        this.letterP = new Letter([this.characterP]);
        this.letterQ = new Letter([this.characterQ]);
        this.letterS = new Letter([this.characterS]);
        this.letterSs = new Letter([this.characterS, this.characterS]);
        this.letterT = new Letter([this.characterT]);
        this.letterU = new Letter([this.characterU]);
        this.letterUr = new Letter([this.characterU, this.characterR]);
        this.letterV = new Letter([this.characterV]);
        this.letterW = new Letter([this.characterW]);
        this.letterX = new Letter([this.characterX]);
        this.letterXx = new Letter([this.characterX, this.characterX]);
        this.letterXxx = new Letter([this.characterX, this.characterX, this.characterX]);
        this.letterY = new Letter([this.characterY]);
        this.letterZ = new Letter([this.characterZ]);
        this.letterZs = new Letter([this.characterZ, this.characterS]);
        this.letterZzs = new Letter([this.characterZ, this.characterZ, this.characterS]);
        this.letterCapitalizedA = new Letter([this.characterCapitalizedA]);
        this.letterCapitalizedB = new Letter([this.characterCapitalizedB]);
        this.letterCapitalizedC = new Letter([this.characterCapitalizedC]);
        this.letterCapitalizedD = new Letter([this.characterCapitalizedD]);
        this.letterCapitalizedE = new Letter([this.characterCapitalizedD]);
        this.letterCapitalizedF = new Letter([this.characterCapitalizedF]);
        this.letterCapitalizedG = new Letter([this.characterCapitalizedG]);
        this.letterCapitalizedH = new Letter([this.characterCapitalizedH]);
        this.letterCapitalizedI = new Letter([this.characterCapitalizedI]);
        this.letterCapitalizedJ = new Letter([this.characterCapitalizedJ]);
        this.letterCapitalizedK = new Letter([this.characterCapitalizedK]);
        this.letterCapitalizedL = new Letter([this.characterCapitalizedL]);
        this.letterCapitalizedM = new Letter([this.characterCapitalizedM]);
        this.letterCapitalizedN = new Letter([this.characterCapitalizedN]);
        this.letterCapitalizedNg = new Letter([this.characterCapitalizedN, this.characterCapitalizedG]);
        this.letterCapitalizedNn = new Letter([this.characterCapitalizedN, this.characterCapitalizedN]);
        this.letterCapitalizedO = new Letter([this.characterCapitalizedO]);
        this.letterCapitalizedP = new Letter([this.characterCapitalizedP]);
        this.letterCapitalizedQ = new Letter([this.characterCapitalizedQ]);
        this.letterCapitalizedS = new Letter([this.characterCapitalizedS]);
        this.letterCapitalizedSs = new Letter([this.characterCapitalizedS, this.characterCapitalizedS]);
        this.letterCapitalizedT = new Letter([this.characterCapitalizedT]);
        this.letterCapitalizedU = new Letter([this.characterCapitalizedU]);
        this.letterCapitalizedUr = new Letter([this.characterCapitalizedU, this.characterCapitalizedR]);
        this.letterCapitalizedV = new Letter([this.characterCapitalizedV]);
        this.letterCapitalizedW = new Letter([this.characterCapitalizedW]);
        this.letterCapitalizedX = new Letter([this.characterCapitalizedX]);
        this.letterCapitalizedXx = new Letter([this.characterCapitalizedX, this.characterCapitalizedX]);
        this.letterCapitalizedXxx = new Letter([this.characterCapitalizedX, this.characterCapitalizedX, this.characterCapitalizedX]);
        this.letterCapitalizedY = new Letter([this.characterCapitalizedY]);
        this.letterCapitalizedZ = new Letter([this.characterCapitalizedZ]);
        this.letterCapitalizedZs = new Letter([this.characterZ, this.characterCapitalizedS]);
        this.letterCapitalizedZzs = new Letter([this.characterCapitalizedZ, this.characterCapitalizedZ, this.characterCapitalizedS]);

        let sn = new SymbolN();
        console.log("length of SymbolN %d", sn.getLength());
        
    }
}
