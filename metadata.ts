
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

interface IRule {
    execute();
    //isMatch();
}

interface IEvaluator {
    evaluate();
}

class RulesEvaluator implements IEvaluator {
    rules: Array<IRule>;
    evaluate(){};
}

interface IValidator {

}

class SymbolN {
    SymbolOne: number = 0;
    SymbolTwo: number = 1;
    SymbolThree: number = 2;
    
    getLength() {
        return Object.keys(this).length;
    }

    getNext() {

    }
}

export class CharacterRule implements IRule {
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

    constructor() {
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
    }

    execute(){}
}

export class LetterRule implements IRule {
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

    constructor(cp: CharacterRule) {
        this.letterA = new Letter([cp.characterA]);
        this.letterB = new Letter([cp.characterB]);
        this.letterBx = new Letter([cp.characterB, cp.characterX]);
        this.letterC = new Letter([cp.characterC]);
        this.letterD = new Letter([cp.characterD]);
        this.letterDx = new Letter([cp.characterD, cp.characterX]);
        this.letterE = new Letter([cp.characterD]);
        this.letterF = new Letter([cp.characterF]);
        this.letterFx = new Letter([cp.characterF, cp.characterX]);
        this.letterG = new Letter([cp.characterG]);
        this.letterGx = new Letter([cp.characterG, cp.characterX]);
        this.letterH = new Letter([cp.characterH]);
        this.letterI = new Letter([cp.characterI]);
        this.letterJ = new Letter([cp.characterJ]);
        this.letterK = new Letter([cp.characterK]);
        this.letterL = new Letter([cp.characterL]);
        this.letterM = new Letter([cp.characterM]);
        this.letterN = new Letter([cp.characterN]);
        this.letterNg = new Letter([cp.characterN, cp.characterG]);
        this.letterNn = new Letter([cp.characterN, cp.characterN]);
        this.letterO = new Letter([cp.characterO]);
        this.letterP = new Letter([cp.characterP]);
        this.letterQ = new Letter([cp.characterQ]);
        this.letterS = new Letter([cp.characterS]);
        this.letterSs = new Letter([cp.characterS, cp.characterS]);
        this.letterT = new Letter([cp.characterT]);
        this.letterU = new Letter([cp.characterU]);
        this.letterUr = new Letter([cp.characterU, cp.characterR]);
        this.letterV = new Letter([cp.characterV]);
        this.letterW = new Letter([cp.characterW]);
        this.letterX = new Letter([cp.characterX]);
        this.letterXx = new Letter([cp.characterX, cp.characterX]);
        this.letterXxx = new Letter([cp.characterX, cp.characterX, cp.characterX]);
        this.letterY = new Letter([cp.characterY]);
        this.letterZ = new Letter([cp.characterZ]);
        this.letterZs = new Letter([cp.characterZ, cp.characterS]);
        this.letterZzs = new Letter([cp.characterZ, cp.characterZ, cp.characterS]);
        this.letterCapitalizedA = new Letter([cp.characterCapitalizedA]);
        this.letterCapitalizedB = new Letter([cp.characterCapitalizedB]);
        this.letterCapitalizedC = new Letter([cp.characterCapitalizedC]);
        this.letterCapitalizedD = new Letter([cp.characterCapitalizedD]);
        this.letterCapitalizedE = new Letter([cp.characterCapitalizedD]);
        this.letterCapitalizedF = new Letter([cp.characterCapitalizedF]);
        this.letterCapitalizedG = new Letter([cp.characterCapitalizedG]);
        this.letterCapitalizedH = new Letter([cp.characterCapitalizedH]);
        this.letterCapitalizedI = new Letter([cp.characterCapitalizedI]);
        this.letterCapitalizedJ = new Letter([cp.characterCapitalizedJ]);
        this.letterCapitalizedK = new Letter([cp.characterCapitalizedK]);
        this.letterCapitalizedL = new Letter([cp.characterCapitalizedL]);
        this.letterCapitalizedM = new Letter([cp.characterCapitalizedM]);
        this.letterCapitalizedN = new Letter([cp.characterCapitalizedN]);
        this.letterCapitalizedNg = new Letter([cp.characterCapitalizedN, cp.characterCapitalizedG]);
        this.letterCapitalizedNn = new Letter([cp.characterCapitalizedN, cp.characterCapitalizedN]);
        this.letterCapitalizedO = new Letter([cp.characterCapitalizedO]);
        this.letterCapitalizedP = new Letter([cp.characterCapitalizedP]);
        this.letterCapitalizedQ = new Letter([cp.characterCapitalizedQ]);
        this.letterCapitalizedS = new Letter([cp.characterCapitalizedS]);
        this.letterCapitalizedSs = new Letter([cp.characterCapitalizedS, cp.characterCapitalizedS]);
        this.letterCapitalizedT = new Letter([cp.characterCapitalizedT]);
        this.letterCapitalizedU = new Letter([cp.characterCapitalizedU]);
        this.letterCapitalizedUr = new Letter([cp.characterCapitalizedU, cp.characterCapitalizedR]);
        this.letterCapitalizedV = new Letter([cp.characterCapitalizedV]);
        this.letterCapitalizedW = new Letter([cp.characterCapitalizedW]);
        this.letterCapitalizedX = new Letter([cp.characterCapitalizedX]);
        this.letterCapitalizedXx = new Letter([cp.characterCapitalizedX, cp.characterCapitalizedX]);
        this.letterCapitalizedXxx = new Letter([cp.characterCapitalizedX, cp.characterCapitalizedX, cp.characterCapitalizedX]);
        this.letterCapitalizedY = new Letter([cp.characterCapitalizedY]);
        this.letterCapitalizedZ = new Letter([cp.characterCapitalizedZ]);
        this.letterCapitalizedZs = new Letter([cp.characterZ, cp.characterCapitalizedS]);
        this.letterCapitalizedZzs = new Letter([cp.characterCapitalizedZ, cp.characterCapitalizedZ, cp.characterCapitalizedS]);

    }

    execute(){}
}

class Component {

}

class MyString {
    characters: Array<Character>;
    components: Array<Component>;
    //isIsometric() {}
}

export class Metadata {
}
