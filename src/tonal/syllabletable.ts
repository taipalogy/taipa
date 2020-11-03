export function isInSyllableTable(syllable: string) {
  if (basicSyllables.includes(syllable)) return true;
  if (extraSyllables.includes(syllable)) return true;
  if (syllabicHeadwords.includes(syllable)) return true;
  return false;
}

// prettier-ignore
const toBeVerified = [
    'baih', 'buhh', 'burhh',
    
    'cett', 'changxx', 'choa', 'chiauhh', 'chiuh', 'chiunnh', 'ciauhh',

    'tom',

    'giakk',
    
    'hioh', 'hoangz',

    'iakk',

    'jex', 'jek', 'jeng', 'jih', 'jirnx', 'jirtt', 'joany',

    'khihh', 'khiauhh', 'khomz', 'khop',

    'len', 'liakk', 'lirey',  'lng',

    'mah',

    'na', 'niw', 'noaiw',

    'ngihh',
    
    'oehh',

    'phitt',

    'kanh', 'kih', 'kngh', 'koaix', 'koaiz', 'koakk', 'koangz', 'koatt',

    'sauhh', 'sokk',

    'thoehh', 'thom', 'thomz',

    'pann', 'pihh', 'pirt',
]

// prettier-ignore
const addonSyllables = [
    'ainn', 'ainny', 'ainnx', 'anny', 'aunn', 'aunny', 'aunnz',

    'borh', 'borhh', 'borx', 'bory', 'borz',

    'cainn', 'cainny', 'cainnw', 'cainnx', 'cannh', 'cennh', 'cennx', 'cennz', 'cennhh', 'cor', 'corh', 'corw', 'corx', 'cory', 'corz', 'cinnw', 'cinnh', 'cinnz', 'cir', 'cirinn', 'cirinny', 'cirw', 'ciry', 'cirx', 'coanny', 'coannw', 'coannz', 'cuinn', 'cuinny', 'cuinnw',

    'chainn', 'chainnw', 'chainnx', 'channw', 'channx', 'chennx', 'chor', 'choreh', 'chorehh', 'chorew', 'chorex', 'chorez', 'chorh', 'chorhh', 'chorw', 'chorz', 'chir', 'chirinny', 'chirinnx', 'chirm', 'chirw', 'chiry', 'chirx', 'chirz', 'chiunnx', 'chm', 'chuinn', 'chuinny', 'chuinnw', 'chuinnx', 'chuinnz',

    'tainny', 'tainnw', 'tainnx', 'tainnz', 'tainnhh', 'tenny', 'tennx', 'torex', 'torey', 'torez', 'torh', 'torhh', 'torw', 'tory', 'torz', 'tiann', 'tiannw', 'tinnh', 'tinnw', 'tir', 'tirinnw', 'tirinnz', 'tirw', 'tirx', 'tirz', 'toanny', 'tuinny', 'tuinnw', 'tuinnx', 'tuinnz',

    'enny', 'ennh', 'ennz', 'ennhh', 'or', 'ore', 'orehh', 'orex', 'orey', 'orez', 'orh', 'orw', 'orx', 'orz',

    'goreh', 'gorehh', 'gorhh', 'gorex', 'gorez', 'gorx', 'giauh', 'girnx', 'girnz', 'girt', 'girx', 'giry', 'girz',
	
    'hainny', 'hainnh', 'hainnz', 'hann', 'hannhh', 'henny', 'hennz', 'hennhh', 'hor', 'horez', 'horw', 'horx', 'hory', 'horz', 'haunn', 'haunny', 'haunnw', 'haunnh', 'haunnx', 'haunnhh', 'hinnh', 'hinnx', 'hir', 'hirinnx', 'hirinnz', 'hirny', 'hirnz', 'hirw', 'hirx', 'hiry', 'hirtt', 'hirk', 'hiunny', 'hiunnw', 'hiunnz', 'hmhh', 'hmz', 'hngw', 'hoainnh', 'hoannw', 'honnz', 'hop', 'huinn', 'huinnh', 'huinnx', 'huinnz',

    'ionn', 'innh', 'innhh', 'ir', 'irinnx', 'irn', 'irny', 'irpp', 'irw', 'irx', 'iry', 'irz',

    'jiaunny', 'jiaunnw', 'jiaunnx', 'jinny', 'jiry', 'jirx', 'jorx',
	
	'khannx', 'khainnh', 'khainnw', 'khaunnhh', 'khennh', 'khennx', 'khor', 'khore', 'khoreh', 'khorew', 'khorw', 'khorh', 'khorx', 'khiann', 'khiannw', 'khinn', 'khir', 'khirnx', 'khirny', 'khirw', 'khngz', 'khoainn', 'khoainnw', 'khonny', 'khuinnw',

    'lorehh', 'lorex', 'lorh', 'lorx', 'liry', 'lirx', 'lirz',

    'maix', 'mih', 'mihh', 'mng', 'moaix', 'moaiz', 'moex', 'moez', 'mui', 'muiz',

    'naih', 'naix', 'ney', 'new', 'nez', 'nehh', 'niauw', 'niauh', 'niaw', 'nirix', 'niriz', 'niu', 'nngh', 'nox', 'nui', 'nuiy', 'nuiw', 'nuix', 'nuiz',

    'ngai', 'ngaiy', 'ngauy', 'ngauh', 'ngauhh', 'ngaw', 'ngaz', 'nge', 'ngh', 'nghh', 'ngiahh', 'ngiriy', 'ngiuy', 'ngiux', 'ngiz', 'ngoeh', 'ngoehh',

    'oainn', 'oainnh', 'oainnz', 'oainnhh', 'oannx',

    'phainn', 'phennw', 'phor', 'phorhh', 'phorw', 'phorx', 'phorz', 'phinny', 'phinnhh', 'phng', 'phngy', 'phngw', 'phngz', 'phnghh', 'phoannx', 'phonn', 'phuinn', 'phuinnw', 'phuinnx',
	
	'kainny', 'kainnw', 'kainnz', 'kannhh', 'kore', 'koreh', 'korew', 'korex', 'korey', 'korez', 'korh', 'korw', 'kory', 'kiaunnhh', 'kinny', 'kinnh', 'kinnhh', 'kir', 'kirinn', 'kirinny', 'kirn', 'kirnw', 'kirnz', 'kirw', 'kirx', 'kiry', 'kirz', 'kiunnx', 'kiunnz', 'knghh', 'koainnw', 'koainnx', 'koainnhh', 'koannw', 'koenny', 'konnz', 'kuinn', 'kuinny', 'kuinnw',

    'sainn', 'sanny', 'sannw', 'sannx', 'sore', 'sorew', 'sorew', 'sorh', 'sorhh', 'sorx', 'sorw', 'sorz', 'sinnx', 'sinnhh', 'sir', 'sirinn', 'sirm', 'sirp', 'sirw', 'sirx', 'siry', 'sirz', 'sm', 'smw', 'smh', 'snghh', 'soainn', 'soainnh', 'soainnx', 'soainnhh', 'soenn', 'soenny', 'soennw', 'suinn', 'suinny', 'suinnw',

    'thainnw', 'thainnz', 'thannx', 'thannz', 'thenn', 'thor', 'thore', 'thorehh', 'thorew', 'thorhh', 'thorw', 'thinnw', 'thinnx', 'thirx', 'thiry', 'thiunny', 'thoannx', 'thuinnw', 'thuinnx', 'thuinnz',

    'uihh', 'uinn', 'uinny', 'uinnx', 'uinnz',

    'painny', 'painnx', 'painnz', 'por', 'pory', 'porw', 'porx', 'porz', 'pinnx', 'pngx', 'puinn', 'puinny', 'puinnx', 'puinnz',
]

// prettier-ignore
const syllabicHeadwords = [
    // TODO: some syllabic forms may not be found in Taiwanese but present in dictionary as headwords. need to further check
    'bam', 'bek', 'biet', 'bit', 'biu', 'boa', 'boat', 'bor',

    'coa', 'coai', 'coang', 'coat', 'com', 'cor', 'core',

    'chap', 'chiak', 'chio', 'chir', 'chiri', 'choai', 'choang', 'choe', 'chom', 'chor', 'chore',

    'tiang', 'tim', 'tio', 'tir', 'tiri', 'tiur', 'toa', 'toe', 'tom', 'tor', 'tore', 'tut',
    
    'er', 'erng',

    'ga', 'gai', 'gak', 'gang', 'gap', 'ge', 'gir', 'go', 'goe', 'gok', 'goat', 'gong', 'gor', 'gore', 'gur',

    'hiap', 'hio', 'hir', 'hiri', 'hirn', 'hiur', 'hoai', 'hoang', 'hop', 'hor', 'hore',

    'iak', 'ionn', 'ir', 'iri', 'irn',

    'je', 'jek', 'jeng', 'jiak', 'jiap', 'jien', 'jiet', 'jin', 'jir', 'jit', 'jiu', 'jiur', 'jo', 'joa', 'joe', 'jor', 'jun', 'jur',

    'khir', 'khor',

    'lai', 'lat', 'lia', 'liak', 'liet', 'lir', 'lo', 'loa', 'loat', 'loe', 'lop', 'lom', 'lor', 'lore',

    'm', 'mia', 'min', 'moai', 'moe', 'mu',

    'nio', 'no', 'nui',

    'nga',

    'or', 'ore',

    'ken', 'ket', 'kiak', 'kiang', 'kio', 'kip', 'kir', 'kiri', 'kirn', 'kit', 'kiur', 'kor',
    
    'oa', 'oak',

    'phor',
    
    'sir', 'siri', 'sop', 'sor', 'sore',

    'tha', 'thia', 'thor',

    'pia', 'piang', 'piri', 'poa', 'por',
]

// prettier-ignore
const extraSyllables = [
    'aih',
    
    'burh',

    'coaih', 'choatt',
    
    'tngh',

    'en',

    'gehh', 'gih', 'giuh', 'gimw', 'gunx',

    'homz',

    'jip',

	'khiaih', 'khuih',

    'laih', 'langh', 'lip', 'lih', 'lit', 'litt', 'loaih', 'loaiz', 'loeh',

    'mnghh',

    'n',

    'ngh',

    'oh', 'op',

    'sangh', 'sennh', 'sienh', 'sinnh',
]

// prettier-ignore
export const basicSyllables = [
    'a', 'ay', 'az', 'ah', 'ahh', 'ai', 'aiy', 'aiw', 'ainnz', 'ak', 'am',
    'amy', 'amw', 'amx', 'amz', 'an', 'any', 'anw', 'anx', 'anz', 'ang',
    'angw', 'angx', 'angz', 'annw', 'annx', 'annz', 'ap', 'app', 'at', 'au',
    'auy', 'auw', 'aux', 'auz',

    'ba', 'bax', 'baz', 'bah', 'bai', 'baiy', 'baix', 'bak', 'bakk', 'ban',
    'bany', 'banx', 'banz', 'bangy', 'bangw', 'bangx','bangz', 'bat', 'batt',
    'bauy', 'bauz', 'bey', 'bex', 'bez', 'beh', 'behh', 'biy', 'bix', 'biz',
    'bieny', 'bienx', 'bienz','biett', 'biauy', 'biaux', 'biauz', 'bih',
    'bihh', 'bekk', 'biny', 'binx', 'binz', 'bengy', 'bengx', 'bengz', 'biury',
    'biurx','biurz', 'bitt', 'biuz', 'bury', 'burx', 'burz', 'bok', 'bokk',
    'bong', 'bongy', 'bongw', 'bongx', 'bongz', 'boy', 'box', 'boz', 'buy',
    'bux', 'buz', 'boax', 'boah', 'boahh', 'boany', 'boatt', 'boey', 'boex',
    'boez', 'boehh', 'bui', 'buny', 'bunw', 'bunx', 'bunz', 'but', 'butt',
    
    'ca', 'cay', 'cax', 'caz', 'cah', 'cai', 'caiy', 'caiw', 'caix', 'caiz',
    'cak', 'cakk', 'cam', 'camy', 'camw', 'camx', 'can', 'canw', 'canx',
    'cang', 'cangy', 'cangw', 'canny', 'cannz', 'cap', 'capp', 'cat', 'catt',
    'cau', 'cauy', 'cauw', 'cauhh', 'ce', 'cey', 'cew', 'cex', 'cez', 'ceh',
    'cenn', 'cenny', 'cennw', 'ci', 'ciy', 'ciw', 'cix', 'ciz', 'cia', 'ciax',
    'ciah', 'ciakk', 'ciam', 'ciamy', 'cien', 'cieny', 'cienx', 'ciangy',
    'ciangw', 'ciangx', 'ciangz', 'ciann', 'cianny', 'ciannw', 'ciannx', 'ciap',
    'ciet', 'ciau', 'ciauw', 'ciaux', 'cih', 'cihh', 'cek', 'cekk', 'cim',
    'cimy', 'cin', 'cinw', 'ceng', 'cengy', 'cengw', 'cengx', 'cengz', 'cinn',
    'cinny', 'cinnx', 'ciur', 'ciurw', 'ciurz', 'ciurh', 'ciurhh', 'ciok',
    'ciokk', 'ciong', 'ciongw', 'cip', 'cit', 'ciu', 'ciuy', 'ciux', 'ciuz',
    'ciunn', 'ciunny', 'ciunnw', 'ciunnx', 'ciunnz', 'cng', 'cngy', 'cngw',
    'cngx', 'cngh', 'cnghh', 'cur', 'cury', 'curw', 'curh', 'cok', 'cokk',
    'cong', 'congy', 'congw', 'congx', 'co', 'coy', 'cow', 'cu', 'cuy', 'cuw',
    'cuz', 'coaw', 'coaz', 'coah', 'coahh', 'coan', 'coan', 'coanw', 'coanx',
    'coangw', 'coann', 'coannw', 'coe', 'coey', 'coex',   'coez', 'cuh', 'cuhh',
    'cui', 'cuiy', 'cuiw', 'cun', 'cuny', 'cunw', 'cunx', 'cunz', 'cut',

    'cha', 'chay', 'chaw', 'chah', 'chahh', 'chai', 'chaiy', 'chaiw', 'chaix',
    'chaiz', 'chainny', 'chak', 'chakk', 'cham', 'chamy', 'chamw', 'chamz',
    'chan', 'chany', 'chanw', 'chanx', 'chanz', 'chang', 'changy', 'changw',
    'changx', 'channy', 'channz', 'chapp', 'chat', 'chatt', 'chau', 'chauy',
    'chauw', 'chaux', 'chauz', 'che', 'chey', 'chew', 'chex', 'chez', 'cheh',
    'chehh', 'chenn', 'chenny', 'chennw', 'chennz', 'chi', 'chiy', 'chiw',
    'chix', 'chiz', 'chia', 'chiay', 'chiaw', 'chiaz', 'chiah', 'chiahh',
    'chiam', 'chiamw', 'chiamx', 'chiamz', 'chien', 'chieny', 'chienw',
    'chienx', 'chienz', 'chiang', 'chiangy', 'chiangw', 'chiann', 'chianny',
    'chiannw', 'chiannx', 'chiannz', 'chiap', 'chiapp', 'chiet', 'chiett',
    'chiau', 'chiauy', 'chiauw', 'chiaux', 'chih', 'chihh', 'chek', 'chekk',
    'chim', 'chimy', 'chimw', 'chimx', 'chin', 'chiny', 'chinw', 'chinx',
    'chinz', 'cheng', 'chengy', 'chengw', 'chengx', 'chengz', 'chinn',
    'chinny', 'chinnw', 'chinnx', 'chinnz', 'chiur', 'chiury', 'chiurw',
    'chiurh', 'chiurhh', 'chiok', 'chiong', 'chiongy', 'chiongw', 'chiongx',
    'chiongz', 'chip', 'chipp', 'chit', 'chitt', 'chiu', 'chiuy', 'chiuw',
    'chiuz', 'chiunn', 'chiunny', 'chiunnw', 'chiunnz', 'chng', 'chngy',
    'chngw', 'chngx', 'chngz', 'chur', 'chury', 'churw', 'churx', 'churz',
    'churh', 'chok', 'chokk', 'chong', 'chongy', 'chongw', 'chongx', 'chongz',
    'cho', 'choy', 'choz', 'chu', 'chuy', 'chuw', 'chux', 'chuxz', 'choay',
    'choax', 'choaz', 'choah', 'choahh', 'choainnz', 'choan', 'choany',
    'choanw', 'choanx', 'choanz', 'choann', 'choanny', 'choannw', 'choannx',
    'choannz', 'choat', 'choew', 'choez', 'chuh', 'chui', 'chuiy', 'chuiw',
    'chuix', 'chuiz', 'chun', 'chuny', 'chunw', 'chunx', 'chunz', 'chut',
    'chutt', 

    'ta', 'tay', 'taw', 'tah', 'tahh', 'tai', 'taiy', 'taiw', 'taix', 'taiz',
    'tainn', 'tainny', 'tak', 'takk', 'tam', 'tamy', 'tamw', 'tamx', 'tamz',
    'tan', 'tany', 'tanw', 'tanx', 'tanz', 'tang', 'tangy', 'tangw', 'tangx',
    'tangz', 'tann', 'tanny', 'tannw', 'tannx', 'tannz', 'tap', 'tapp', 'tat',
    'tatt', 'tau', 'tauy', 'tauw', 'taux', 'tauz', 'tauh', 'tauhh', 'te', 'tey',
    'tew', 'tex', 'tez', 'teh', 'tenn', 'tennw', 'tennz', 'ti', 'tiy', 'tiw',
    'tix', 'tiz', 'tia', 'tiah', 'tiahh', 'tiak', 'tiakk', 'tiam', 'tiamy',
    'tiamw', 'tiamx', 'tiamz', 'tien', 'tieny', 'tienx', 'tienz', 'tianny',
    'tiannx', 'tiannz', 'tiap', 'tiapp', 'tiet', 'tiett', 'tiau', 'tiauw',
    'tiaux', 'tiauz', 'tih', 'tihh', 'tek', 'tekk', 'timw', 'timx', 'timz',
    'tin', 'tiny', 'tinw', 'tinx', 'tinz', 'teng', 'tengy', 'tengw', 'tengx',
    'tengz', 'tinn', 'tinnx', 'tinnz', 'tinnhh', 'tiurw', 'tiurx', 'tiurz',
    'tiurh', 'tiurhh', 'tiok', 'tiokk', 'tiong', 'tiongy', 'tiongw', 'tiongx',
    'tiongz', 'tit', 'titt', 'tiu', 'tiuy', 'tiuw', 'tiux', 'tiuz', 'tiuh',
    'tiunn', 'tiunny', 'tiunnw', 'tiunnx', 'tiunnz', 'tng', 'tngy', 'tngw',
    'tngx', 'tngz', 'tur', 'tury', 'turw', 'turx', 'turz', 'turh', 'turhh',
    'tok', 'tokk', 'tomx', 'tong', 'tongy', 'tongw', 'tongx', 'tongz', 'to',
    'toy', 'tow', 'tox', 'toz', 'tu', 'tuy', 'tuw', 'tux', 'tuz', 'toaw',
    'toaz', 'toan', 'toany', 'toanw', 'toanz', 'toann', 'toannw', 'toannx',
    'toannz', 'toat', 'toatt', 'toew', 'toex', 'toez', 'tuh', 'tuhh', 'tui',
    'tuiw', 'tuix', 'tuiz', 'tun', 'tuny', 'tunw', 'tunz', 'tutt', 

    'e', 'ey', 'ew', 'ex', 'ez', 'eh', 'ehh', 'enn', 'ennx',

    'ek', 'ekk', 'eng', 'engy', 'engw', 'engx', 'engz',

    'gax', 'gaz', 'gaix', 'gaiz', 'gakk', 'gamy', 'gamx', 'gamz', 'gany',
    'ganw', 'ganx', 'ganz', 'gangz', 'gaux', 'gew', 'gex', 'gez', 'giy', 'gix',
    'giz', 'giax','giah', 'giahh', 'giamy', 'giamx', 'giamz', 'gieny', 'gienw',
    'gienx', 'gienz', 'giang', 'giangw', 'giangz', 'giap', 'giapp', 'giet',
    'giett', 'giaux', 'gekk', 'gimy', 'gimx', 'gimz', 'giny', 'ginx', 'ginz',
    'gengy', 'gengx', 'giury', 'giurx', 'giurhh', 'giok', 'giokk', 'giongy',
    'giuy', 'giux', 'gurx', 'gurz', 'gokk', 'gongx', 'gongz', 'gox', 'goz',
    'guy', 'gux', 'guz', 'goay', 'goaz', 'goany', 'goanx', 'goanz', 'goatt',
    'goez', 'goehh', 'guix', 'guiz',
    
    'ha', 'haw', 'hax', 'haz', 'hah', 'hahh', 'hai', 'haiy', 'haix', 'haiz',
    'hainn', 'hainnw', 'hainnx', 'hak', 'hakk', 'ham', 'hamy', 'hamw', 'hamx',
    'hamz','han', 'hany', 'hanw', 'hanx', 'hanz', 'hang', 'hangw', 'hangx',
    'hangz', 'hanny', 'hannx', 'hannz', 'hannh', 'hap', 'happ', 'hat', 'hatt',
    'hau', 'hauy', 'hauw', 'haux', 'hauz', 'he', 'hey', 'hew', 'hex', 'hez',
    'heh', 'hennw', 'hennx', 'hennh', 'hi', 'hiy', 'hiw','hix', 'hia', 'hiaz',
    'hiah', 'hiahh', 'hiam', 'hiamy', 'hiamw', 'hiamx', 'hien', 'hieny',
    'hienw', 'hienx', 'hienz', 'hiang', 'hiangy', 'hiangw', 'hiann', 'hianny',
    'hiannw', 'hiannx', 'hiannz', 'hiannh', 'hiapp', 'hiet', 'hiett', 'hiau',
    'hiauy', 'hiaux', 'hiauh', 'hek', 'hekk', 'him', 'himx', 'hin', 'hinx',
    'hinz', 'heng', 'hengw', 'hengx', 'hengz', 'hinn', 'hinnw', 'hinnz',
    'hiurx', 'hiurz', 'hiurh', 'hiurhh', 'hiok', 'hiong', 'hiongy', 'hiongw',
    'hiongx', 'hip','hit', 'hitt', 'hiu', 'hiuy', 'hiuw', 'hiux', 'hiunn',
    'hiunnhh', 'hmy', 'hmx', 'hmh', 'hmhh', 'hng', 'hngy', 'hngx', 'hngz',
    'hngh', 'hnghh', 'hury', 'hurx', 'hurz', 'hurhh', 'hok', 'hokk', 'hong',
    'hongy', 'hongw', 'hongx', 'hongz', 'honn', 'honny', 'honnw', 'honnh', 'ho',
    'hoy', 'how', 'hox', 'hoz', 'hu', 'huy', 'huw', 'hux', 'huz', 'hoa', 'hoaw',
    'hoax', 'hoaz', 'hoah', 'hoahh', 'hoaix', 'hoaiz', 'hoainnx', 'hoan',
    'hoany', 'hoanw', 'hoanx', 'hoanz', 'hoann', 'hoanny', 'hoannx', 'hoannz',
    'hoat', 'hoatt', 'hoe', 'hoey', 'hoew', 'hoex', 'hoez', 'hoeh', 'hui',
    'huiy', 'huiw', 'huix', 'huiz', 'hun', 'huny', 'hunw', 'hunx', 'hunz',
    'hut', 'hutt',

    'i', 'iy', 'iw', 'ix', 'iz', 'ia', 'iay', 'iaw', 'iax', 'iaz', 'iah',
    'iahh', 'iam', 'iamy', 'iamx', 'iamz', 'ien', 'ieny', 'ienw', 'ienx',
    'iang', 'iangz', 'iann', 'ianny', 'iannw', 'iannx', 'iannz', 'iap', 'iapp',
    'iet', 'iett', 'iau', 'iauy', 'iauw', 'iaux', 'iauz', 'iaunn', 'im', 'imy',
    'imw', 'imx', 'in', 'iny', 'inw', 'inx', 'inz', 'inn', 'inny', 'innw',
    'innx', 'innz', 'iur', 'iury', 'iurx', 'iurh', 'iurhh', 'iok', 'iokk',
    'iong', 'iongy', 'iongw', 'iongx', 'iongz', 'ip', 'it', 'itt', 'iu', 'iuy',
    'iuw', 'iux', 'iuz', 'iunn', 'iunny', 'iunnx', 'iunnz',

    'jiy', 'jix', 'jiz', 'jia', 'jiay', 'jiamy', 'jienx', 'jiangy', 'jiapp',
    'jiett', 'jiauy', 'jiauw', 'jiaux', 'jimy', 'jimx', 'jimz', 'jinx', 'jinz',
    'jiurz', 'jiok', 'jiokk', 'jiongy', 'jiongx', 'jiongz', 'jipp', 'jitt',
    'jiux', 'juy', 'jux', 'juz', 'joahh', 'joex', 'joez', 'junz',

    'kha', 'khay', 'khaw', 'khah', 'khahh', 'khai', 'khaiy', 'khaiw', 'khainn', 'khainny',
    'khak', 'khakk', 'kham', 'khamy', 'khamw', 'khan', 'khanw', 'khang', 'khangy',
    'khangw', 'khann', 'khap', 'khapp', 'khat', 'khau', 'khauy', 'khauw', 'khe', 'khey',
    'khew', 'khex', 'kheh', 'khehh', 'khenn', 'khennhh', 'khi', 'khiy', 'khiw', 'khix',
    'khiz', 'khia', 'khiax', 'khiaz', 'khiah', 'khiakk', 'khiam', 'khiamw', 'khiamx',
    'khiamz', 'khien', 'khieny', 'khienw', 'khienx', 'khiang', 'khiangw', 'khiap',
    'khiet', 'khiett', 'khiau', 'khiauy', 'khiauw', 'khiauh', 'khih', 'khek', 'khim',
    'khimy', 'khimx', 'khin', 'khiny', 'khinx', 'kheng', 'khengy', 'khengw', 'khengx',
    'khengz', 'khinnx', 'khiury', 'khiurw', 'khiurh', 'khiok', 'khiong', 'khiongy',
    'khiongx', 'khip', 'khipp', 'khit', 'khitt', 'khiu', 'khiuy', 'khiux', 'khiuz',
    'khiunn', 'khiunnz', 'khng', 'khngw', 'khur', 'khury', 'khurw', 'khurx', 'khok',
    'khokk', 'khong', 'khongy', 'khongw', 'khongz', 'kho', 'khoy', 'khow', 'khu', 'khux',
    'khuz', 'khoa', 'khoay', 'khoaw', 'khoah', 'khoaiw', 'khoan', 'khoany', 'khoanw',
    'khoanx', 'khoann', 'khoanny', 'khoannw', 'khoat', 'khoe', 'khoew', 'khoex', 'khoeh',
    'khuh', 'khui', 'khuiy', 'khuiw', 'khun', 'khuny', 'khunw', 'khunx', 'khut', 'khutt',


    'la', 'lax', 'laz', 'lah', 'lahh', 'laix', 'laiz', 'lak', 'lakk', 'lam',
    'lamy', 'lamw', 'lamx', 'lamz', 'lan', 'lany', 'lanx', 'lanz', 'lang',
    'langy', 'langw', 'langx', 'langz', 'lap', 'lapp', 'latt', 'lauy', 'lauw',
    'laux', 'lauz', 'lauhh', 'le', 'ley', 'lew', 'lex', 'lez', 'leh', 'lehh',
    'li', 'liy', 'liw', 'lix', 'liz', 'liah', 'liahh', 'liam', 'liamy', 'liamw',
    'liamx', 'liamz', 'lien', 'lieny', 'lienx', 'lienz', 'liang', 'liangy',
    'liangx', 'liangz', 'liap', 'liapp', 'liett', 'liauy', 'liauw', 'liaux',
    'liauz', 'lihh', 'lek', 'lekk', 'lim', 'limy', 'limx', 'limz', 'lin',
    'liny', 'linw', 'linx', 'limz', 'leng', 'lengy', 'lengw', 'lengx', 'lengz',
    'liury', 'liurx', 'liurz', 'liurhh', 'liok', 'liokk', 'liongy', 'liongw',
    'liongx', 'liongz', 'lipp', 'liu', 'liuy', 'liuw', 'liux', 'liuz', 'lur',
    'lury', 'lurw', 'lurx', 'lurz', 'lurh', 'lurhh', 'lok', 'lokk', 'long',
    'longy', 'longw', 'longx', 'longz', 'loy', 'lox', 'loz', 'lu', 'luy',
    'luw', 'lux', 'luz', 'loax', 'loaz', 'loah', 'loahh', 'loany', 'loanx',
    'loanz', 'loatt', 'loex', 'loez', 'lui', 'luiy', 'luiw', 'luix', 'luiz',
    'lun', 'luny', 'lunx', 'lunz', 'lut', 'lutt',

    'my', 'mx', 'mz', 'ma', 'may', 'maw', 'max', 'maz', 'mai', 'maiy', 'maiw',
    'maiz', 'mau', 'maux', 'mauz', 'mauh', 'me', 'mey', 'mex', 'mez', 'meh',
    'mehh', 'mi', 'miy', 'mix', 'miz', 'miax', 'miaz', 'miauz', 'mih', 'mihh',
    'mngy', 'mngx', 'mngz', 'mo', 'moy', 'mox', 'moz', 'moh', 'mohh', 'moa',
    'moay', 'moax', 'moaz', 'muiy', 'muix',

    'nay', 'naw', 'nax', 'naz', 'nah', 'nai', 'naiy', 'naiz', 'nauy', 'nauz',
    'nauh', 'ne', 'nex', 'neh', 'ni', 'niy', 'nix', 'niz', 'niay', 'niax',
    'niaz', 'niau', 'niauy', 'nih', 'niuy', 'niux', 'niuz', 'nng', 'nngy',
    'nngw', 'nngx', 'nngz', 'noy', 'noz', 'noay', 'noaw', 'noax', 'noaz',

    'ng', 'ngy', 'ngw', 'ngx', 'ngz', 'ngay', 'ngaiz', 'ngaux', 'ngauz', 'ngey',
    'ngez', 'ngeh', 'ngehh', 'ngiax', 'ngiau', 'ngiauy', 'ngiauh', 'ngiauhh',
    'ngoy', 'ngox', 'ngoz',

    'o', 'oy', 'ox', 'oz', 'ok', 'om', 'omz', 'ong', 'ongy', 'ongx', 'ongz',
    'onn', 'onnw', 

    'oa', 'oay', 'oax', 'oahh', 'oai', 'oainny', 'oan', 'oany', 'oanw', 'oanx',
    'oanz', 'oang', 'oann', 'oanny', 'oannw', 'oannz', 'oat', 'oatt', 'oe',
    'oey', 'oew', 'oex', 'oez', 'oeh',

    'pha', 'phaw', 'phaz', 'phah', 'phaiw', 'phainny', 'phainnz', 'phak', 'phakk', 'phan',
    'phan', 'phang', 'phangy', 'phangw', 'phangx', 'phangz', 'phannw', 'phannz', 'phau',
    'phauy', 'phauw', 'phauz', 'phauhh', 'phe', 'phey', 'phew', 'phez', 'phenn', 'phennx',
    'phennz', 'phi', 'phiy', 'phiw', 'phix', 'phiz', 'phiah', 'phiahh', 'phiak', 'phiakk',
    'phien', 'phienw', 'phienx', 'phiang', 'phiangz', 'phiann', 'phianny', 'phiannx',
    'phiet', 'phiau', 'phiauw', 'phiaux', 'phih', 'phihh', 'phek', 'phiny', 'phinx',
    'phinz', 'pheng', 'phengw', 'phengx', 'phengz', 'phinn', 'phinnw', 'phinnx',
    'phinnz', 'phiurw', 'phiurx', 'phit', 'phngh', 'phur', 'phury', 'phurw', 'phurz',
    'phurh', 'phok', 'phokk', 'phong', 'phongy', 'phongw', 'phongx', 'phongz', 'pho',
    'phoy', 'phow', 'phox', 'phoz', 'phuy', 'phux', 'phuz', 'phoaw', 'phoah', 'phoahh',
    'phoan', 'phoanx', 'phoanz', 'phoann', 'phoannw', 'phoannz', 'phoat', 'phoe',
    'phoey', 'phoew', 'phoex', 'phoez', 'phoehh', 'phuhh', 'phuiy', 'phuiw', 'phun',
    'phuny', 'phunw', 'phunx', 'phut', 'phutt',

    'ka', 'kay', 'kaw', 'kaz', 'kah', 'kai', 'kaiy', 'kaiw', 'kainn', 'kainnx',
    'kak', 'kakk', 'kam', 'kamy', 'kamw', 'kamx', 'kan', 'kany', 'kanw', 'kang',
    'kangy', 'kangw', 'kangx', 'kangz', 'kann', 'kanny', 'kannw', 'kannx',
    'kap', 'kat', 'kau', 'kauy', 'kauw', 'kaux', 'kauz', 'kauh', 'ke', 'key',
    'kew', 'kez', 'keh', 'kehh', 'kenn', 'kenny', 'kennw', 'ki', 'kiy', 'kiw',
    'kix', 'kiz', 'kia', 'kiaw', 'kiaz', 'kiahh', 'kiam', 'kiamy', 'kiamw',
    'kiamx', 'kien', 'kieny', 'kienw', 'kienz', 'kiann', 'kianny', 'kiannw',
    'kiannx', 'kiannz', 'kiap', 'kiet', 'kiett', 'kiau', 'kiauy', 'kiaux',
    'kiauz', 'kek', 'kekk', 'kim', 'kimy', 'kimw', 'kimz', 'kin', 'kiny',
    'kinw', 'kinz', 'keng', 'kengy', 'kengw', 'kengx', 'kengz', 'kinn', 'kinnw',
    'kinnx', 'kiurw', 'kiurx', 'kiurz', 'kiurh', 'kiok', 'kiokk', 'kiong',
    'kiongy', 'kiongx', 'kiongz', 'kip', 'kipp', 'kitt', 'kiu', 'kiuy', 'kiuw',
    'kiux', 'kiuz', 'kiunn', 'kng', 'kngy', 'kngw', 'kur', 'kury', 'kurw',
    'kurx', 'kurz', 'kurh', 'kok', 'kokk', 'kong', 'kongy', 'kongw', 'kongx',
    'konnx', 'ko', 'koy', 'kow', 'kox', 'koz', 'ku', 'kuy', 'kuw', 'kuz', 'koa',
    'koay', 'koaw', 'koaz', 'koah', 'koai', 'koaiy', 'koaiw', 'koainn',
    'koainny', 'koainnz', 'koan', 'koany', 'koanw', 'koanx', 'koanz', 'koann',
    'koanny', 'koannx', 'koannz', 'koat', 'koe', 'koey', 'koew', 'koeh', 'kui',
    'kuiy', 'kuiw', 'kuix', 'kuiz', 'kun', 'kuny', 'kunw', 'kunx', 'kunz',
    'kut', 'kutt',

    'sa', 'say', 'saw', 'sah', 'sahh', 'sai', 'saiy', 'saiw', 'saix', 'saiz',
    'sak', 'sam', 'samy', 'samw', 'samx', 'san', 'sany', 'sanw', 'sang',
    'sangy', 'sangw', 'sann', 'sannh', 'sap', 'sat', 'sau', 'sauw', 'se', 'sey',
    'sew', 'sex', 'seh', 'sehh', 'senn', 'senny', 'sennw', 'si', 'siy', 'siw',
    'six', 'siz', 'sia', 'siay', 'siaw', 'siax', 'siaz', 'siah', 'siahh',
    'siak', 'siam', 'siamy', 'siamw', 'siamx', 'sien', 'sieny', 'sienw',
    'sienx', 'sienz', 'siang', 'siangy', 'siangw', 'siangx', 'siangz', 'siann',
    'sianny', 'siannw', 'siannx', 'siannz', 'siap', 'siapp', 'siet', 'siett',
    'siau', 'siauy', 'siauw', 'siaux', 'siauz', 'sih', 'sihh', 'sek', 'sekk',
    'sim', 'simy', 'simw', 'simx', 'simz', 'sin', 'sinw', 'sinx', 'sinz',
    'seng', 'sengy', 'sengw', 'sengx', 'sengz', 'sinn', 'sinnw', 'sinnz',
    'siur', 'siury', 'siurx', 'siurh', 'siurhh', 'siok', 'siokk', 'siong',
    'siongy', 'siongw', 'siongx', 'siongz', 'sip', 'sipp', 'sit', 'sitt', 'siu',
    'siuy', 'siuw', 'siux', 'siuz', 'siunn', 'siunny', 'siunnw', 'siunnx',
    'siunnz', 'sng', 'sngy', 'sngw', 'sngx', 'sngh', 'sur', 'sury', 'surw',
    'surx', 'surz', 'surh', 'sok', 'som', 'song', 'songy', 'songw', 'songx',
    'so', 'soy', 'sow', 'su', 'suy', 'suw', 'sux', 'suz', 'soa', 'soay', 'soaw',
    'soah', 'soai', 'soainnz', 'soan', 'soany', 'soanw', 'soanx', 'soanz',
    'soann', 'soanny', 'soannw', 'soat', 'soe', 'soey', 'soew', 'soex', 'soeh',
    'suh', 'sui', 'suiy', 'suiw', 'suix', 'suiz', 'sun', 'suny', 'sunw', 'sunx',
    'sunz', 'sut', 'sutt',

    'thaw', 'thah', 'thahh', 'thai', 'thaiy', 'thaiw', 'thaix', 'thaiz', 'thak', 'thakk',
    'tham', 'thamw', 'thamx', 'thamz', 'than', 'thany', 'thanw', 'thanx', 'thang',
    'thangy', 'thangw', 'thangx', 'thann', 'thanny', 'thap', 'that', 'thau', 'thauy',
    'thauw', 'thaux', 'thauz', 'the', 'they', 'thew', 'thex', 'thez', 'theh', 'thehh',
    'thennw', 'thennx', 'thi', 'thiy', 'thiw', 'thix', 'thiz', 'thiah', 'thiam', 'thiamy',
    'thiamz', 'thien', 'thieny', 'thiann', 'thiannw', 'thiannx', 'thiannz', 'thiap',
    'thiapp', 'thiet', 'thiau', 'thiauy', 'thiauw', 'thiaux', 'thiauz', 'thih', 'thihh',
    'thek', 'thekk', 'thim', 'thin', 'thinx', 'thinz', 'theng', 'thengy', 'thengw',
    'thengx', 'thinn', 'thinnz', 'thiur', 'thiurw', 'thiurx', 'thiok', 'thiong',
    'thiongy', 'thiongw', 'thiongx', 'thiu', 'thiuy', 'thng', 'thngw', 'thngx', 'thngz',
    'thur', 'thury', 'thurw', 'thurx', 'thurh', 'thurhh', 'thok', 'thokk', 'thong',
    'thongy', 'thongw', 'thongz', 'thoy', 'thow', 'thox', 'thuy', 'thoa', 'thoaz',
    'thoah', 'thoanx', 'thoann', 'thoanny', 'thoannw', 'thoat', 'thuh', 'thui', 'thuiy',
    'thuiw', 'thuix', 'thun', 'thuny', 'thunx', 'thunz', 'thut', 'thutt',

    'u', 'uy', 'uw', 'ux', 'uz', 'uh', 'ui', 'uiy', 'uiw', 'uix', 'uiz', 'un',
    'uny', 'unw', 'unx', 'unz', 'ut',

    'ur', 'urw', 'urx', 'urh', 'urhh',

    'pa', 'pay', 'paw', 'pax', 'paz', 'pah', 'pai', 'paiy', 'paiw', 'paix',
    'paiz', 'pak', 'pakk', 'pan', 'pany', 'panx', 'panz', 'pang', 'pangy',
    'pangw', 'pangx', 'pat', 'patt', 'pau', 'pauy', 'paux', 'pauz', 'pe', 'pey',
    'pew', 'pex', 'pez', 'peh', 'pehh', 'penn', 'pennw', 'pennx', 'pennz', 'pi',
    'piy', 'piw', 'pix', 'piz', 'piah', 'piak', 'piakk', 'pien', 'pieny',
    'pienw', 'pienz', 'piangw', 'piangz', 'piann', 'pianny', 'piannw', 'piannx',
    'piet', 'piett', 'piau', 'piauy', 'pih', 'pek', 'pekk', 'pin', 'piny',
    'pinw', 'pinx', 'peng', 'pengy', 'pengw', 'pengx', 'pengz', 'pinn', 'pinny',
    'pinnw', 'pinnz', 'piur', 'piury', 'piurz', 'pit', 'pitt', 'piu', 'png',
    'pngy', 'pngz', 'pur', 'pury', 'purw', 'purx', 'purz', 'purh', 'purhh',
    'pok', 'pokk', 'pongy', 'pongw', 'pongx', 'pongz', 'po', 'poy', 'pow',
    'pox', 'poz', 'pu', 'puw', 'pux', 'puz', 'poaw', 'poah', 'poahh',
    'poan', 'poanw', 'poanx', 'poanz', 'poann', 'poanny', 'poannw', 'poannx',
    'poannz', 'poat', 'poatt', 'poe', 'poey', 'poew', 'poex', 'poez', 'poeh',
    'poehh', 'puh', 'pui', 'puix', 'puiz', 'pun', 'puny', 'punw', 'punx',
    'punz', 'put', 'putt',
]
