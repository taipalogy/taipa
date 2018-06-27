import { GrammaticalUnit } from './expression';
import { Context } from './context';


export class Metadata {
    static readonly NUMBER_OF_CHARACTERS: number = 26;
    static readonly NUMBER_OF_LETTERS: number = 33;
    static readonly NUMBER_OF_TONEMARKLESS_SYLLABLES = 0;
    static readonly NUMBER_OF_ALLOMORPHEMIC_SYLLABLES = 2209;

    constructor() {
        console.log(Object.keys(characters).length === Metadata.NUMBER_OF_CHARACTERS);

        console.log(Object.keys(lowerLetters).length === Metadata.NUMBER_OF_LETTERS);

        console.log(list_of_syllables.length === Metadata.NUMBER_OF_ALLOMORPHEMIC_SYLLABLES);
    }
}

//------------------------------------------------------------------------------
//  Grapheme
//------------------------------------------------------------------------------

class Grapheme {

}

//------------------------------------------------------------------------------
//  Expressions
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//  Character
//------------------------------------------------------------------------------

export class Character {
    symbol: string;

    constructor(s: string) {
        this.symbol = s;
    }
}

export class Characters {

    list: Array<Character>;
    constructor() {
        this.list = new Array();

        for(let key in characters) {
            this.list.push(characters[key])
        }

    }

    get length() {
        return this.list.length;
    }
}

interface ICharacters {
    readonly [index: string]: Character

}

let characters: ICharacters = {
    a: new Character('a'),
    b: new Character('b'),
    c: new Character('c'),
    d: new Character('d'),
    e: new Character('e'),
    f: new Character('f'),
    g: new Character('g'),
    h: new Character('h'),
    i: new Character('i'),
    j: new Character('j'),
    k: new Character('k'),
    l: new Character('l'),
    m: new Character('m'),
    n: new Character('n'),
    o: new Character('o'),
    p: new Character('p'),
    q: new Character('q'),
    r: new Character('r'),
    s: new Character('s'),
    t: new Character('t'),
    u: new Character('u'),
    v: new Character('v'),
    w: new Character('w'),
    x: new Character('x'),
    y: new Character('y'),
    z: new Character('z'),
}

//------------------------------------------------------------------------------
//  Initial, Medial, and Final Consonants
//------------------------------------------------------------------------------

export class LetterFilters {
    nonNasalNonFinalInitialLetters: string = lowerLetters['c'].literal + '|' +
                                        lowerLetters['j'].literal + '|' +
                                        lowerLetters['l'].literal + '|' +
                                        lowerLetters['q'].literal + '|' +
                                        lowerLetters['s'].literal + '|' +
                                        lowerLetters['v'].literal + '|' +
                                        lowerLetters['z'].literal;

    initialNeutralLetterH: string = lowerLetters['h'].literal;

    nasalInitialLetters: string = lowerLetters['m'].literal + '|' +
                                    lowerLetters['n'].literal + '|' +
                                    lowerLetters['ng'].literal;

    medialLetters: string = lowerLetters['a'].literal + '|' +
                            lowerLetters['e'].literal + '|' +
                            lowerLetters['i'].literal + '|' +
                            lowerLetters['o'].literal + '|' +
                            lowerLetters['u'].literal + '|' +
                            lowerLetters['ur'].literal;

    nasalLetters: string = lowerLetters['m'].literal + '|' +
                            lowerLetters['n'].literal + '|' +
                            lowerLetters['ng'].literal + '|' +
                            lowerLetters['nn'].literal;

    neutralFinalLetterH: string = lowerLetters['h'].literal;
                    
    neutralFinalLetters: string = lowerLetters['h'].literal + '|' +
                                  lowerLetters['f'].literal;
    
    neutralToneMarkLetterX: string = lowerLetters['x'].literal;
    
    neutralToneMarkLetterY: string = lowerLetters['y'].literal;

    checkedFinalLetters: string = lowerLetters['p'].literal + '|' +
                                    lowerLetters['t'].literal + '|' +
                                    lowerLetters['k'].literal + '|' +
                                    lowerLetters['b'].literal + '|' +
                                    lowerLetters['d'].literal + '|' +
                                    lowerLetters['g'].literal;

    checkedToneMarkLetters: string = this.checkedFinalLetters;

    initialCheckedLetters: string = this.checkedFinalLetters

    freeToneMarkLetters: string = lowerLetters['ss'].literal + '|' +
                                    lowerLetters['y'].literal + '|' +
                                    lowerLetters['w'].literal + '|' +
                                    lowerLetters['x'].literal + '|' +
                                    lowerLetters['xx'].literal + '|' +
                                    lowerLetters['xxx'].literal + '|' +
                                    lowerLetters['zs'].literal + '|' +
                                    lowerLetters['zzs'].literal;
                                    
    finalLetters: string = this.checkedFinalLetters + '|' +
                          this.neutralFinalLetters;

    initialLetters: string = this.nasalInitialLetters + '|' +
                                this.nonNasalNonFinalInitialLetters + '|' +
                                this.initialCheckedLetters + '|' +
                                this.initialNeutralLetterH;

    finalToneMarkLetters: string = this.checkedToneMarkLetters + '|' +
                                    this.neutralFinalLetters + '|' +
                                    this.neutralToneMarkLetterX + '|' +
                                    this.neutralToneMarkLetterY;
}

//------------------------------------------------------------------------------
//  Letter
//------------------------------------------------------------------------------

export class Letter extends GrammaticalUnit {
    literal: string = '';
    evaluate(context: Context){}
}

export class AlphabeticLetter extends Letter {
    characters: Array<Character>;

    constructor(characters?: Array<Character>) {
        super();
        this.characters = new Array();
        if(characters != null) {
            let len = characters.length;
            for(var i = 0; i < len; i++) {
                this.pushCharacter(characters[i]);
            }
        }
    }

    pushCharacter(c: Character){
        this.characters.push(c);
        this.literal += c.symbol;
    }
}

class AbstractLetterFactory {}

export class AlphabetFactory extends AbstractLetterFactory {}

export class Letters {
    list: Array<AlphabeticLetter>;
    constructor() {
        this.list = new Array();

        for(let key in lowerLetters) {
            this.list.push(lowerLetters[key])
        }

    }

    get length() {
        return this.list.length;
    }

    match(characters: Array<Character>) {
        
        let letters: Array<AlphabeticLetter> = new Array();
        //console.log("metadata letter array length %d. ", letters.length);
        //console.log(characters);
        let ls: Array<AlphabeticLetter> = new Array();
        for(let i = 0; i < characters.length; i++) {
            //console.log("examining character: %s. length of characters: %d", characters[i].symbol, characters.length);
            //console.log("metadata letter array looping.");
            
            ls = this.list.filter(l => l.characters[0].symbol === characters[i].symbol);

            //console.log(ls);
            if(ls.length == 0) {
                console.log("i: %d. characters[i].symbol: %s", i, characters[i].symbol);
                console.log("something wrong");
            } else if(ls.length == 1) {
                //console.log("just one matched. i:%d. ls[0].characters.length:%d", i, ls[0].characters.length);
                letters.push(ls.shift()); // push the matched letter
            } else if(ls.length > 1) {
                let j = 0;
                do {
                    //ls.filter(l => console.log(l.characters) );
                    //console.log(ls);
                    //console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    let atLeastJ: Array<AlphabeticLetter> = new Array();
                    atLeastJ = ls.filter(l => l.characters.length >= j+1);
                    //console.log(atLeastJ);

                    //console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    let underJ: Array<AlphabeticLetter> = new Array();
                    underJ = ls.filter(l => l.characters.length < j+1);
                    //console.log(underJ);

                    if(atLeastJ.length > 0){
                        ls = atLeastJ.filter(l => l.characters[j].symbol === characters[i+j].symbol);
                        if(ls.length > 0){
                            ;
                        } else {
                            ls = underJ;
                        }
                    }
                    
                    //console.log("i: %d, j: %d, i+j: %d.", i, j, i+j);
                    j++;
                    // continue looping when there are more than one results
                    // stop looping when j goes beyond the end of target
                } while(ls.length > 1 && i+j < characters.length);
                i += ls[0].characters.length-1; // skip the length-1 of characters of the found letter
                letters.push(ls.shift()); // push the matched letter
                //console.log(letters);
            }
        }
        //console.log("metadata letter array length %d", letters.length);
        //console.log(letters);
        return letters;
    }
}

interface ILetters {
    readonly [index: string]: AlphabeticLetter
}

export let lowerLetters: ILetters = {
    // medials
    'a': new AlphabeticLetter([characters['a']]),
    'e': new AlphabeticLetter([characters['e']]),
    'i': new AlphabeticLetter([characters['i']]),
    'o': new AlphabeticLetter([characters['o']]),
    'u': new AlphabeticLetter([characters['u']]),
    'ur': new AlphabeticLetter([characters['u'], characters['r']]),

    // initials excludes checked finals and neutral finals
    'c': new AlphabeticLetter([characters['c']]),
    'j': new AlphabeticLetter([characters['j']]),
    'l': new AlphabeticLetter([characters['l']]),
    'q': new AlphabeticLetter([characters['q']]),
    's': new AlphabeticLetter([characters['s']]),
    'v': new AlphabeticLetter([characters['v']]),
    'z': new AlphabeticLetter([characters['z']]),

    // initials and nasals
    'm': new AlphabeticLetter([characters['m']]),
    'n': new AlphabeticLetter([characters['n']]),
    'ng': new AlphabeticLetter([characters['n'], characters['g']]),
    
    // nasal
    'nn': new AlphabeticLetter([characters['n'], characters['n']]),

    // free tone marks
    'ss': new AlphabeticLetter([characters['s'], characters['s']]),
    'w': new AlphabeticLetter([characters['w']]),
    'xx': new AlphabeticLetter([characters['x'], characters['x']]),
    'xxx': new AlphabeticLetter([characters['x'], characters['x'], characters['x']]),
    'zs': new AlphabeticLetter([characters['z'], characters['s']]),
    'zzs': new AlphabeticLetter([characters['z'], characters['z'], characters['s']]),

    // free tone mark, checked tone mark
    'x': new AlphabeticLetter([characters['x']]),

    // free tone mark, neutral tone mark
    'y': new AlphabeticLetter([characters['y']]),

    // initials, checked tone marks, and finals
    'b': new AlphabeticLetter([characters['b']]),
    'd': new AlphabeticLetter([characters['d']]),
    'g': new AlphabeticLetter([characters['g']]),
    'k': new AlphabeticLetter([characters['k']]),
    'p': new AlphabeticLetter([characters['p']]),
    't': new AlphabeticLetter([characters['t']]),
    
    // neutral final
    'f': new AlphabeticLetter([characters['f']]),

    // initial and final
    'h': new AlphabeticLetter([characters['h']]),
}

let ziangLetters: ILetters = {
    // medial
    'ee': new AlphabeticLetter([characters['e'], characters['e']]),
    'or': new AlphabeticLetter([characters['o'], characters['r']]),
}

let zuanxLetters: ILetters = {
    // medial
    'er': new AlphabeticLetter([characters['e'], characters['r']]),
    'ir': new AlphabeticLetter([characters['i'], characters['r']]),
}

let consonantLetters: ILetters = {
    // voiced l
    'lr': new AlphabeticLetter([characters['l'], characters['r']]),
    // voiced d
    'dr': new AlphabeticLetter([characters['d'], characters['r']]),
    // palatal
    'gn': new AlphabeticLetter([characters['g'], characters['n']]),
}

let list_of_rime_of_ziang_accent = [
    'ee', 'eeh', 'eef', 'eng', 'ek', 'eg', 'ionn', 'ionnh', 'ionnf', 
]

let list_of_rime_of_zuanx_accent = [
    'er', 'erh', 'erf', 'ere', 'ereh', 'eref', 'eru', 'ir', 'irh', 'irf', 'irinn', 'irm', 'irn', 'irng', 'irp', 'irt', 'ird', 'irk',
    'irg',
]

let list_of_ziang_syllables = []

let list_of_zuanx_syllables = [
    'huang',
]

export let list_of_syllables = [
    'a', 'ay', 'azs', 'ah', 'af', 'ai', 'aiy', 'aiw', 'ainnzs', 'ak', 'am', 'amy', 'amw', 'amx', 'amzs', 'an', 'any', 'anw', 'anx',
    'anzs', 'ang', 'angw', 'angx', 'angzs', 'annw', 'annx', 'annzs', 'ap', 'ab', 'at', 'au', 'auy', 'auw', 'aux', 'auzs',

    'ba', 'bax', 'bazs', 'bah', 'bai', 'baiy', 'baix', 'bak', 'bag', 'ban', 'bany', 'banx', 'banzs', 'bangy', 'bangw', 'bangx',
    'bangzs', 'bat', 'bad', 'bauy', 'bauzs', 'bey', 'bex', 'bezs', 'beh', 'bef', 'biy', 'bix', 'bizs', 'bieny', 'bienx', 'bienzs',
    'bied', 'biauy', 'biaux', 'biauzs', 'bih', 'bif', 'big', 'biny', 'binx', 'binzs', 'bingy', 'bingx', 'bingzs', 'biury', 'biurx',
    'biurzs', 'bit', 'biuzs', 'bury', 'burx', 'burzs', 'bok', 'bog', 'bong', 'bongy', 'bongw', 'bongx', 'bongzs', 'boy', 'box',
    'bozs', 'buy', 'bux', 'buzs', 'buax', 'buah', 'buaf', 'buany', 'buad', 'buey', 'buex', 'buezs', 'buef', 'bui', 'buny', 'bunw',
    'bunx', 'bunzs', 'but', 'bud',
    
    'ca', 'cay', 'cax', 'cazs', 'cah', 'cai', 'caiy', 'caiw', 'caix', 'caizs', 'cak', 'cag', 'cam', 'camy', 'camw', 'camx', 'can',
    'canw', 'canx', 'cang', 'cangy', 'cangw', 'canny', 'cannzs', 'cap', 'cab', 'cat', 'cad', 'cau', 'cauy', 'cauw', 'cauf', 'ce',
    'cey', 'cew', 'cex', 'cezs', 'ceh', 'cenn', 'cenny', 'cennw', 'ci', 'ciy', 'ciw', 'cix', 'cizs', 'cia', 'ciax', 'ciah', 'ciag',
    'ciam', 'ciamy', 'cien', 'cieny', 'cienx', 'ciangy', 'ciangw', 'ciangx', 'ciangzs', 'ciann', 'cianny', 'ciannw', 'ciannx',
    'ciap', 'ciet', 'ciau', 'ciauw', 'ciaux', 'cih', 'cif', 'cik', 'cig', 'cim', 'cimy', 'cin', 'cinw', 'cing', 'cingy', 'cingw',
    'cingx', 'cingzs', 'cinn', 'cinny', 'cinnx', 'ciur', 'ciurw', 'ciurzs', 'ciurh', 'ciurf', 'ciok', 'ciog', 'ciong', 'ciongw',
    'cip', 'cit', 'ciu', 'ciuy', 'ciux', 'ciuzs', 'ciunn', 'ciunny', 'ciunnw', 'ciunnx', 'ciunnzs', 'cng', 'cngy', 'cngw', 'cngx',
    'cngh', 'cngf', 'cur', 'cury', 'curw', 'curh', 'cok', 'cog', 'cong', 'congy', 'congw', 'congx', 'co', 'coy', 'cow', 'cu', 'cuy',
    'cuw', 'cuzs', 'cuaw', 'cuazs', 'cuah', 'cuaf', 'cuan', 'cuan', 'cuanw', 'cuanx', 'cuangw', 'cuann', 'cuannw', 'cue', 'cuey',
    'cuex',   'cuezs', 'cuh', 'cuf', 'cui', 'cuiy', 'cuiw', 'cun', 'cuny', 'cunw', 'cunx', 'cunzs', 'cut',

    'da', 'day', 'daw', 'dah', 'daf', 'dai', 'daiy', 'daiw', 'daix', 'diazs', 'dainn', 'dianny', 'dak', 'dag', 'dam', 'damy',
    'damw', 'damx', 'damzs', 'dan', 'dany', 'danw', 'danx', 'danzs', 'dang', 'dangy', 'dangw', 'dangx', 'dangzs', 'dann', 'danny',
    'dannw', 'dannx', 'dannzs', 'dap', 'dab', 'dat', 'dad', 'dau', 'dauy', 'dauw', 'daux', 'dauzs', 'dauh', 'dauf', 'de', 'dey',
    'dew', 'dex', 'dezs', 'deh', 'denn', 'dennw', 'dennzs', 'di', 'diy', 'diw', 'dix', 'dizs', 'dia', 'diah', 'diaf', 'diak',
    'diag', 'diam', 'diamy', 'diamw', 'diamx', 'diamzs', 'dien', 'dieny', 'dienx', 'tienzs', 'dianny', 'diannx', 'diannzs', 'diap,',
    'diab', 'diet', 'died', 'diau', 'diauw', 'diaux', 'diauzs', 'dih', 'dif', 'dik', 'dig', 'dimw', 'dimx', 'dimzs', 'din', 'diny',
    'dinw', 'dinx', 'dinzs', 'ding', 'dingy', 'dingw', 'dingx', 'dingzs', 'dinn', 'dinnx', 'dinnzs', 'dinnf', 'diurw', 'diurx',
    'diurzs', 'diurh', 'diurf', 'diok', 'diog', 'diong', 'diongy', 'diongw', 'diongx', 'diongzs', 'dit', 'did', 'diu', 'diuy',
    'diuw', 'diux', 'diuzs', 'diuh', 'diunn', 'diunny', 'diunnw', 'diunnx', 'diunnzs', 'dng', 'dngy', 'dngw', 'dngx', 'dngzs',
    'dur', 'dury', 'durw', 'durx', 'durzs', 'durh', 'durf', 'dok', 'dog', 'domx', 'dong', 'dongy', 'dongw', 'dongx', 'dongzs', 'do',
    'doy', 'dow', 'dox', 'dozs', 'du', 'duy', 'duw', 'dux', 'duzs', 'duaw', 'duazs', 'duan', 'duany', 'duanw', 'duanzs', 'duann',
    'duannw', 'duannx', 'duannzs', 'duat', 'duad', 'duew', 'duex', 'duezs', 'duh', 'duf', 'dui', 'duiw', 'duix', 'duizs', 'dun',
    'duny', 'dunw', 'dunzs', 'dud', 

    'e', 'ey', 'ew', 'ex', 'ezs', 'eh', 'ef', 'enn', 'ennx',

    'gax', 'gazs', 'gaix', 'gaizs', 'gag', 'gamy', 'gamx', 'gamzs', 'gany', 'ganw', 'ganx', 'ganzs', 'gangzs', 'gaux', 'gew', 'gex',
    'gezs', 'giy', 'gix', 'gizs', 'giax','giah', 'giaf', 'giamy', 'giamx', 'giamzs', 'gieny', 'gienw', 'gienx', 'gienzs', 'giang',
    'giangw', 'giangzs', 'giap', 'giab', 'giet', 'gied', 'giaux', 'gig', 'gimy', 'gimx', 'gimzs', 'giny', 'ginx', 'ginzs', 'gingy',
    'gingx', 'giury', 'giurx', 'giurf', 'giok', 'giog', 'giongy', 'giuy', 'giux', 'gurx', 'gurzs', 'gog', 'gongx', 'gongzs', 'gox',
    'gozs', 'guy', 'gux', 'guzs', 'guay', 'guazs', 'guany', 'guanx', 'guanzs', 'guad', 'guezs', 'guef', 'guix', 'guizs',
    
    'ha', 'haw', 'hax', 'hazs', 'hah', 'haf', 'hai', 'haiy', 'haix', 'haizs', 'hainn', 'hainnw', 'hainnx', 'hak', 'hag', 'ham',
    'hamy', 'hamw', 'hamx', 'hamzs','han', 'hany', 'hanw', 'hanx', 'hanzs', 'hang', 'hangw', 'hangx', 'hangzs', 'hanny', 'hannx',
    'hannzs', 'hannh', 'hap', 'hab', 'hat', 'had', 'hau', 'hauy', 'hauw', 'haux', 'hauzs', 'he', 'hey', 'hew', 'hex', 'hezs', 'heh',
    'hennw', 'hennx', 'hennh', 'hi', 'hiy', 'hiw','hix', 'hia', 'hiazs', 'hiah', 'hiaf', 'hiam', 'hiamy', 'hiamw', 'hiamx', 'hien',
    'hieny', 'hienw', 'hienx', 'hienzs', 'hiang', 'hiangy', 'hiangw', 'hiann', 'hianny', 'hiannw', 'hiannx', 'hiannzs', 'hiannh',
    'hiab', 'hiat', 'hiad', 'hiau', 'hiauy', 'hiaux', 'hiauh', 'hik', 'hig', 'him', 'himx', 'hin', 'hinx', 'hinzs', 'hing', 'hingw',
    'hingx', 'hingzs', 'hinn', 'hinnw', 'hinnzs', 'hiurx', 'hiurzs', 'hiurh', 'hiurf', 'hiok', 'hiong', 'hiongy', 'hiongw',
    'hiongx', 'hip','hit', 'hid', 'hiu', 'hiuy', 'hiuw', 'hiux', 'hiunn', 'hiunnf', 'hmy', 'hmx', 'hmh', 'hmf', 'hng', 'hngy',
    'hngx', 'hngzs', 'hngh', 'hngf', 'hury', 'hurx', 'hurzs', 'hurf', 'hok', 'hog', 'hong', 'hongy', 'hongw', 'hongx', 'hongzs',
    'honn', 'honny', 'honnw', 'honnh', 'ho', 'hoy', 'how', 'hox', 'hozs', 'hu', 'huy', 'huw', 'hux', 'huzs', 'hua', 'huaw', 'huax',
    'huazs', 'huah', 'huaf', 'huaix', 'huaizs', 'huainnx', 'huan', 'huany', 'huanw', 'huanx', 'huanzs', 'huann', 'huanny', 'huannx',
    'huannzs', 'huat', 'huad', 'hue', 'huey', 'huew', 'huex', 'huezs', 'hueh', 'hui', 'huiy', 'huiw', 'huix', 'huizs', 'hun',
    'huny', 'hunw', 'hunx', 'hunzs', 'hut', 'hud',

    'i', 'iy', 'iw', 'ix', 'izs', 'ia', 'iay', 'iaw', 'iax', 'iazs', 'iah', 'iaf', 'iam', 'iamy', 'iamx', 'iamzs', 'ien', 'ieny',
    'ienw', 'ienx', 'iang', 'iangzs', 'iann', 'ianny', 'iannw', 'iannx', 'iannzs', 'iap', 'iab', 'iat', 'iad', 'iau', 'iauy',
    'iauw', 'iaux', 'iauzs', 'iaunn', 'ik', 'ig', 'im', 'imy', 'imw', 'imx', 'in', 'iny', 'inw', 'inx', 'inzs', 'ing', 'ingy',
    'ingw', 'ingx', 'ingzs', 'inn', 'inny', 'innw', 'innx', 'innzs', 'iur', 'iury', 'iurx', 'iurh', 'iurf', 'iok', 'iog', 'iong',
    'iongy', 'iongw', 'iongx', 'iongzs', 'ip', 'it', 'id', 'iu', 'iuy', 'iuw', 'iux', 'iuzs', 'iunn', 'iunny', 'iunnx', 'iunnzs',

    'jiy', 'jix', 'jizs', 'jia', 'jiay', 'jiamy', 'jienx', 'jiangy', 'jiab', 'jiad', 'jiauy', 'jiauw', 'jiaux', 'jimy', 'jimx',
    'jimzs', 'jinx', 'jinzs', 'jiurzs', 'jiok', 'jiog', 'jiongy', 'jiongx', 'jiongzs', 'jib', 'jid', 'jiux', 'juy', 'jux', 'juzs',
    'juaf', 'juex', 'juezs', 'junzs',

    'ka', 'kay', 'kaw', 'kah', 'kaf', 'kai', 'kaiy', 'kaiw', 'kainn', 'kainny', 'kak', 'kag', 'kam', 'kamy', 'kamw', 'kan', 
    'kanw', 'kang', 'kangy', 'kangw', 'kann', 'kap', 'kab', 'kat', 'kau', 'kauy', 'kauw', 'ke', 'key', 'kew', 'kex', 'keh', 'kef',
    'kenn', 'kennf', 'ki', 'kiy', 'kiw', 'kix', 'kizs', 'kia', 'kiax', 'kiazs', 'kiah', 'kiag', 'kiam', 'kiamw', 'kiamx',
    'kiamzs', 'kien', 'kieny', 'kienw', 'kienx', 'kiang', 'kiangw', 'kiap', 'kiet', 'kied', 'kiau', 'kiauy', 'kiauw', 'kiauh',
    'kih', 'kik', 'kim', 'kimy', 'kimx', 'kin', 'kiny', 'kinx', 'king', 'kingy', 'kingw', 'kingx', 'kingzs', 'kinnx', 'kiury',
    'kiurw', 'kiurh', 'kiok', 'kiong', 'kiongy', 'kiongx', 'kip', 'kib', 'kit', 'kid', 'kiu', 'kiuy', 'kiux', 'kiuzs', 'kiunn',
    'kiunnzs', 'kng', 'kngw', 'kur', 'kury', 'kurw', 'kurx', 'kok', 'kog', 'kong', 'kongy', 'kongw', 'kongzs', 'ko', 'koy', 'kow',
    'ku', 'kux', 'kuzs', 'kua', 'kuay', 'kuaw', 'kuah', 'kuaiw', 'kuan', 'kuany', 'kuanw', 'kuanx', 'kuann', 'kuanny', 'kuannw',
    'kuat', 'kue', 'kuew', 'kuex', 'kueh', 'kuh', 'kui', 'kuiy', 'kuiw', 'kun', 'kuny', 'kunw', 'kunx', 'kut', 'kud',


    'la', 'lax', 'lazs', 'lah', 'laf', 'laix', 'laizs', 'lak', 'lag', 'lam', 'lamy', 'lamw', 'lamx', 'lamzs', 'lan', 'lany',
    'lanx', 'lanzs', 'lang', 'langy', 'langw', 'langx', 'langzs', 'lap', 'lab', 'lad', 'lauy', 'lauw', 'laux', 'lauzs', 'lauf',
    'le', 'ley', 'lew', 'lex', 'lezs', 'leh', 'lef', 'li', 'liy', 'liw', 'lix', 'lizs', 'liah', 'liaf', 'liam', 'liamy', 'liamw', 
    'liamx', 'liamzs', 'lien', 'lieny', 'lienx', 'lienzs', 'liang', 'liangy', 'liangx', 'liangzs', 'liap', 'liab', 'liet', 'liauy',
    'liauw', 'liaux', 'liauzs', 'lif', 'lik', 'lig', 'lim', 'limy', 'limx', 'limzs', 'lin', 'liny', 'linw', 'linx', 'limzs', 'ling',
    'lingy', 'lingw', 'lingx', 'lingzs', 'liury', 'liurx', 'liurzs', 'liurf', 'liok', 'liog', 'liongy', 'liongw', 'liongx',
    'liongzs', 'lib', 'liu', 'liuy', 'liuw', 'liux', 'liuzs', 'lur', 'lury', 'lurw', 'lurx', 'lurzs', 'lurh', 'lurf', 'lok', 'log',
    'long', 'longy', 'longw', 'longx', 'longzs', 'loy', 'lox', 'lozs', 'lu', 'luy', 'luw', 'lux', 'luzs', 'luax', 'luazs', 'luah',
    'luaf', 'luany', 'luanx', 'luanzs', 'luad', 'luex', 'luezs', 'lui', 'luiy', 'luiw', 'luix', 'luizs', 'lun', 'luny', 'lunx',
    'lunzs', 'lut', 'lud',

    'my', 'mx', 'mzs', 'ma', 'may', 'maw', 'max', 'mazs', 'mai', 'maiy', 'maiw', 'maizs', 'mau', 'maux', 'mauzs', 'mauh', 'me',
    'mey', 'mex', 'mezs', 'meh', 'mef', 'mi', 'miy', 'mix', 'mizs', 'miax', 'miazs', 'miauzs', 'mih', 'mif', 'mngy', 'mngx',
    'mngzs', 'mo', 'moy', 'mox', 'mozs', 'moh', 'mof', 'mua', 'muay', 'muax', 'muazs', 'muiy', 'muix',

    'nay', 'naw', 'nax', 'nazs', 'nah', 'nai', 'naiy', 'naizs', 'nauy', 'nauzs', 'nauh', 'ne', 'nex', 'neh', 'ni', 'niy', 'nix',
    'nizs', 'niay', 'niax', 'niazs', 'niau', 'niauy', 'nih', 'niuy', 'niux', 'niuzs', 'nng', 'nngy', 'nngw', 'nngx', 'nngzs',
    'noy', 'nozs', 'nuay', 'nuaw', 'nuax', 'nuazs',

    'ng', 'ngy', 'ngw', 'ngx', 'ngzs', 'ngay', 'nagizs', 'ngaux', 'ngauzs', 'ngey', 'ngezs', 'ngeh', 'ngef', 'ngiax', 'ngiau',
    'ngiauy', 'ngiauh', 'ngiauf', 'ngoy', 'ngox', 'ngozs',

    'o', 'oy', 'ox', 'ozs', 'ok', 'om', 'omzs', 'ong', 'ongy', 'ongx', 'ongzs', 'onn', 'onnw', 

    'pa', 'paw', 'pazs', 'pah', 'paiw', 'painny', 'painnzs', 'pak', 'pag', 'pan', 'pan', 'pang', 'pangy', 'pangw', 'pangx',
    'pangzs', 'pannw', 'pannzs', 'pau', 'pauy', 'pauw', 'pauzs', 'pauf', 'pe', 'pey', 'pew', 'pezs', 'penn', 'pennx', 'pennzs',
    'pi', 'piy', 'piw', 'pix', 'pizs', 'piah', 'piaf', 'piak', 'piag', 'pien', 'pienw', 'pienx', 'piang', 'piangzs', 'piann',
    'pianny', 'piannx', 'piet', 'piau', 'piauw', 'piaux', 'pih', 'pif', 'pik', 'piny', 'pinx', 'pinzs', 'ping', 'pingw', 'pingx',
    'pingzs', 'pinn', 'pinnw', 'pinnx', 'pinnzs', 'piurw', 'piurx', 'pit', 'pngh', 'pur', 'pury', 'purw', 'purzs', 'purh', 'pok',
    'pog', 'pong', 'pongy', 'pongw', 'pongx', 'pongzs', 'po', 'poy', 'pow', 'pox', 'pozs', 'puy', 'pux', 'puzs', 'puaw', 'puah',
    'puaf', 'puan', 'puanx', 'puanzs', 'puann', 'puannw', 'puannzs', 'puat', 'pue', 'puey', 'puew', 'puex', 'puezs', 'puef', 'puf',
    'puiy', 'puiw', 'pun', 'puny', 'punw', 'punx', 'put', 'pud',

    'qa', 'qay', 'qaw', 'qazs', 'qah', 'qai', 'qaiy', 'qaiw', 'qainn', 'qainnx', 'qak', 'qag', 'qam', 'qamy', 'qamw', 'qamx',
    'qan', 'qany', 'qanw', 'qang', 'qangy', 'qangw', 'qangx', 'qangzs', 'qann', 'qanny', 'qannw', 'qannx', 'qap', 'qat', 'qau',
    'qauy', 'qauw', 'qaux', 'qauzs', 'qauh', 'qe', 'qey', 'qew', 'qezs', 'qeh', 'qef', 'qenn', 'qenny', 'qennw', 'qi', 'qiy',
    'qiw', 'qix', 'qizs', 'qia', 'qiaw', 'qiazs', 'qiaf', 'qiam', 'qiamy', 'qiamw', 'qiamx', 'qien', 'qieny', 'qienw', 'qienzs',
    'qiann', 'qianny', 'qiannw', 'qiannx', 'qiannzs', 'qiap', 'kiet', 'kied', 'qiau', 'qiauy', 'qiaux', 'qiauzs', 'qik', 'qig',
    'qim', 'qimy', 'qimw', 'qimzs', 'qin', 'qiny', 'qinw', 'qinzs', 'qing', 'qingy', 'qingw', 'qingx', 'qingzs', 'qinn', 'qinnw',
    'qinnx', 'kiurw', 'qiurx', 'qiurzs', 'qiurh', 'qiok', 'qiog', 'qiong', 'qiongy', 'qiongx', 'qiongzs', 'qip', 'qib', 'qid',
    'qiu', 'qiuy', 'qiuw', 'qiux', 'qiuzs', 'qiunn', 'qng', 'qngy', 'qngw', 'qur', 'qury', 'qurw', 'qurx', 'qurzs', 'qurh', 'qok',
    'qog', 'qong', 'qongy', 'qongw', 'qongx', 'qonnx', 'qo', 'qoy', 'qow', 'qox', 'qozs', 'qu', 'quy', 'quw', 'quzs', 'qua',
    'quay', 'quaw', 'quazs', 'quah', 'quai', 'quaiy', 'quaiw', 'quainn', 'quainny', 'quainnzs', 'quan', 'quany', 'quanw', 'quanx',
    'quanzs', 'quann', 'quanny', 'quannx', 'quannzs', 'quat', 'que', 'quey', 'quew', 'queh', 'qui', 'quiy', 'quiw', 'quix',
    'quizs', 'qun', 'quny', 'qunw', 'qunx', 'qunzs', 'qut', 'qud',

    'sa', 'say', 'saw', 'sah', 'saf', 'sai', 'saiy', 'saiw', 'saix', 'saizs', 'sak', 'sam', 'samy', 'samw', 'samx', 'san', 'sany',
    'sanw', 'sang', 'sangy', 'sangw', 'sann', 'sannh', 'sap', 'sat', 'sau', 'sauy', 'se', 'sey', 'sew', 'sex', 'seh', 'sef', 'senn',
    'senny', 'sennw', 'si', 'siy', 'siw', 'six', 'sizs', 'sia', 'siay', 'siaw', 'siax', 'siazs', 'siah', 'siaf', 'siak', 'siam',
    'siamy', 'siamw', 'siamx', 'sien', 'sieny', 'sienw', 'sienx', 'sienzs', 'siang', 'siangy', 'siangw', 'siangx', 'siangzs',
    'siann', 'sianny', 'siannw', 'siannx', 'siannzs', 'siap', 'siab', 'siet', 'sied', 'siau', 'siauy', 'siauw', 'siaux', 'siauzs',
    'sih', 'sif', 'sik', 'sig', 'sim', 'simy', 'simw', 'simx', 'simzs', 'sin', 'sinw', 'sinx', 'sinzs', 'sing', 'singy', 'singw',
    'singx', 'singzs', 'sinn', 'sinnw', 'sinnzs', 'siur', 'siury', 'siurx', 'siurh', 'siurf', 'siok', 'siog', 'siong', 'siongy',
    'siongw', 'siongx', 'siongzs', 'sip', 'sib', 'sit', 'sid', 'siu', 'siuy', 'siuw', 'siux', 'siuzs', 'siunn', 'siunny', 'siunnw',
    'siunnx', 'siunnzs', 'sng', 'sngy', 'sngw', 'sngx', 'sngh', 'sur', 'sury', 'surw', 'surx', 'surzs', 'surh', 'sok', 'som',
    'song', 'songy', 'songw', 'songx', 'so', 'soy', 'sow', 'su', 'suy', 'suw', 'sux', 'suzs', 'sua', 'suay', 'suaw', 'suah', 'suai',
    'suainnzs', 'suan', 'suany', 'suanw', 'suanx', 'suanzs', 'suann', 'suanny', 'suannw', 'suat', 'sue', 'suey', 'suew', 'suex',
    'sueh', 'suh', 'sui', 'suiy', 'suiw', 'suix', 'suizs', 'sun', 'suny', 'sunw', 'sunx', 'sunzs', 'sut', 'sud',

    'taw', 'tah', 'taf', 'tai', 'taiy', 'taiw', 'taix', 'taizs', 'tak', 'tag', 'tam', 'tamw', 'tamx', 'tamzs', 'tan', 'tany',
    'tanw', 'tanx', 'tang', 'tangy', 'tangw', 'tangx', 'tann', 'tanny', 'tap', 'tat', 'tau', 'tauy', 'tauw', 'taux', 'tauzs', 'te',
    'tey', 'tew', 'tex', 'tezs', 'teh', 'tef', 'tennw', 'tennx', 'ti', 'tiy', 'tiw', 'tix', 'tizs', 'tiah', 'tiam', 'tiamy',
    'tiamzs', 'tien', 'tieny', 'tiann', 'tiannw', 'tiannx', 'tiannzs', 'tiap', 'tiab', 'tiet', 'tiau', 'tiauy', 'tiauw', 'tiaux',
    'tiauzs', 'tih', 'tif', 'tik', 'tig', 'tim', 'tin', 'tinx', 'tinzs', 'ting', 'tingy', 'tingw', 'tingx', 'tinn', 'tinnzs',
    'tiur', 'tiurw', 'tiurx', 'tiok', 'tiong', 'tiongy', 'tiongw', 'tiongx', 'tiu', 'tiuy', 'tng', 'tngw', 'tngx', 'tngzs', 'tur',
    'tury', 'turw', 'turx', 'turh', 'turf', 'tok', 'tog', 'tong', 'tongy', 'tongw', 'tongzs', 'toy', 'tow', 'tox', 'tuy', 'tua',
    'tuazs', 'tuah', 'tuanx', 'tuann', 'tuanny', 'tuannw', 'tuat', 'tuh', 'tui', 'tuiy', 'tuiw', 'tuix', 'tun', 'tuny', 'tunx',
    'tunzs', 'tut', 'tud',

    'u', 'uy', 'uw', 'ux', 'uzs', 'ua', 'uay', 'uax', 'uaf', 'uai', 'uainny', 'uan', 'uany', 'uanw', 'uanx', 'uanzs', 'uang',
    'uann', 'uanny', 'uannw', 'uannzs', 'uat', 'uad', 'ue', 'uey', 'uew', 'uex', 'uezs', 'ueh', 'uh', 'ui', 'uiy', 'uiw', 'uix',
    'uizs', 'un', 'uny', 'unw', 'unx', 'unzs', 'ut',

    'ur', 'urw', 'urx', 'urh', 'urf',

    'va', 'vay', 'vaw', 'vax', 'vazs', 'vah', 'vai', 'vaiy', 'vaiw', 'vaix', 'vaizs', 'vak', 'vag', 'van', 'vany', 'vanx', 'vanzs',
    'vang', 'vangy', 'vangw', 'vangx', 'vat', 'vad', 'vau', 'vauy', 'vaux', 'vauzs', 've', 'vey', 'vew', 'vex', 'vezs', 'veh',
    'vef', 'venn', 'vennw', 'vennx', 'vennzs', 'vi', 'viy', 'viw', 'vix', 'vizs', 'viah', 'viak', 'viag', 'vien', 'vieny', 'vienw',
    'vienzs', 'viangw', 'viangzs', 'viann', 'vianny', 'viannw', 'viannx', 'viet', 'vied', 'viau', 'viauy', 'vih', 'vik', 'vig',
    'vin', 'viny', 'vinw', 'vinx', 'ving', 'vingy', 'vingw', 'vingx', 'vingzs', 'vinn', 'vinny', 'vinnw', 'vinnzs', 'viur', 'viury',
    'viurzs', 'vit', 'vid', 'viu', 'vng', 'vngy', 'vngzs', 'vur', 'vury', 'vurw', 'vurx', 'vurzs', 'vurh', 'vurf', 'vok', 'vog',
    'vongy', 'vongw', 'vongx', 'vongzs', 'vo', 'voy', 'vow', 'vox', 'vozs', 'vu', 'vuw', 'vux', 'vuzs', 'vuaw', 'vuah', 'vuaf',
    'vuan', 'vuanw', 'vuanx', 'vuanzs', 'vuann', 'vuanny', 'vuannw', 'vuannx', 'vuannzs', 'vuat', 'vuad', 'vue', 'vuey', 'vuew',
    'vuex', 'puezs', 'pueh', 'puef', 'vuh', 'vui', 'vuix', 'vuizs', 'vun', 'vuny', 'vunw', 'vunx', 'vunzs', 'vut', 'vud',

    'za', 'zay', 'zaw', 'zah', 'zaf', 'zai', 'zaiy', 'zaiw', 'zaix', 'zaizs', 'zainny', 'zak', 'zag', 'zam', 'zamy', 'zamw',
    'zamzs', 'zan', 'zany', 'zanw', 'zanx', 'zanzs', 'zang', 'zangy', 'zangw', 'zangx', 'zanny', 'zannzs', 'zab', 'zat', 'zad',
    'zau', 'zauy', 'zauw', 'zaux', 'zauzs', 'ze', 'zey', 'zew', 'zex', 'zezs', 'zeh', 'zef', 'zenn', 'zenny', 'zennw', 'zennzs',
    'zi', 'ziy', 'ziw', 'zix', 'zizs', 'zia', 'ziay', 'ziaw', 'ziazs', 'ziah', 'ziaf', 'ziam', 'ziamw', 'ziamx', 'ziamzs', 'zien',
    'zieny', 'zienw', 'zienx', 'zienzs', 'ziang', 'ziangy', 'ziangw', 'ziann', 'zianny', 'ziannw', 'ziannx', 'ziannzs', 'ziap',
    'ziab', 'ziet', 'zied', 'ziau', 'ziauy', 'ziauw', 'ziaux', 'zih', 'zif', 'zik', 'zig', 'zim', 'zimy', 'zimw', 'zimx', 'zin',
    'ziny', 'zinw', 'zinx', 'zinzs', 'zing', 'zingy', 'zingw', 'zingx', 'zingzs', 'zinn', 'zinny', 'zinnw', 'zinnx', 'zinnzs',
    'ziur', 'ziury', 'ziurw', 'ziurh', 'ziurf', 'ziok', 'ziong', 'ziongy', 'ziongw', 'ziongx', 'ziongzs', 'zip', 'zib', 'zit',
    'zid', 'ziu', 'ziuy', 'ziuw', 'ziuzs', 'ziunn', 'ziunny', 'ziunnw', 'ziunnzs', 'zng', 'zngy', 'zngw', 'zngx', 'zngzs', 'zur',
    'zury', 'zurw', 'zurx', 'zurzs', 'zurh', 'zok', 'zog', 'zong', 'zongy', 'zongw', 'zongx', 'zongzs', 'zo', 'zoy', 'zozs', 'zu',
    'zuy', 'zuw', 'zux', 'zuxzs', 'zuay', 'zuax', 'zuazs', 'zuah', 'zuaf', 'zuainnzs', 'zuan', 'zuany', 'zuanw', 'zuanx', 'zuanzs',
    'zuann', 'zuanny', 'zuannw', 'zuannx', 'zuannzs', 'zud', 'zuew', 'zuezs', 'zuh', 'zui', 'zuiy', 'zuiw', 'zuix', 'zuizs', 'zun',
    'zuny', 'zunw', 'zunx', 'zunzs', 'zut', 'zud', 

]
