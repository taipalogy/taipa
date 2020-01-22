// prettier-ignore
const to_be_verified = [
    'hioh',

    'jih', 'jirnx', 'jirtt',

    'na',

    'pangh',
]

// prettier-ignore
const list_of_new_lexical_roots = [
    'coaih',

    'choa',
    
    'dngh', 'dom',

    'gehh',
	
    'hoang', 'homz',

    'jex', 'jek', 'jeng', 'jip',
	
	'kiaih', 'kuih',

    'laih', 'langh', 'lirey', 'lih', 'lit', 'loaih', 'loaiz', 'loeh', 'loeih', 'lurih',

    'mah', 'mnghh',

    'n',

    'qanh', 'qngh',

    'oehh',

    'sangh', 'sennh', 'sienh', 'simh', 'sinnh',

    'tom', 'tomz',

    'virt',
]

// prettier-ignore
const list_of_addon_lexical_roots = [
    'ainn', 'ainny', 'ainnx', 'anny', 'aunn', 'aunny', 'aunnz',

    'borh', 'borhh', 'borx', 'bory', 'borz',

    'cainn', 'cainny', 'cainnw', 'cainnx', 'cannh', 'cennh', 'cennx', 'cennz', 'cennhh', 'cor', 'corh', 'corw', 'corx', 'cory', 'corz', 'cinnw', 'cinnh', 'cinnz', 'cir', 'cirinn', 'cirinny', 'cirw', 'ciry', 'cirx', 'coanny', 'coannw', 'coannz', 'cuinn', 'cuinny', 'cuinnw',

    'chainn', 'chainnw', 'chainnx', 'channw', 'channx', 'chennx', 'chor', 'choreh', 'chorehh', 'chorew', 'chorex', 'chorez', 'chorh', 'chorhh', 'chorw', 'chorz', 'chir', 'chirinny', 'chirinnx', 'chirm', 'chirw', 'chiry', 'chirx', 'chirz', 'chiunnx', 'chm', 'chuinn', 'chuinny', 'chuinnw', 'chuinnx', 'chuinnz',

    'dainyy', 'dainnw', 'dainnx', 'dainnz', 'dainnhh', 'denny', 'dennx', 'dorex', 'dorey', 'dorez', 'dorh', 'dorhh', 'dorw', 'dory', 'dorz', 'diann', 'diannw', 'dinnh', 'dinnw', 'dir', 'dirinnw', 'dirinnz', 'dirw', 'dirx', 'dirz', 'dirng', 'doanny', 'duinny', 'duinnw', 'duinnx', 'duinnz',

    'enny', 'ennh', 'ennz', 'ennhh', 'or', 'ore', 'orehh', 'orex', 'orey', 'orez', 'orh', 'orw', 'orx', 'orz', 'orehh',

    'goreh', 'gorehh', 'gorhh', 'gorex', 'gorez', 'gorx', 'giauh', 'girnx', 'girnz', 'girt', 'girx', 'giry', 'girz',
	
    'hainny', 'hainnh', 'hainnz', 'hann', 'hannhh', 'henny', 'hennz', 'hennhh', 'hor', 'horez', 'horw', 'horx', 'hory', 'horz', 'haunn', 'haunny', 'haunnw', 'haunnh', 'haunnx', 'haunnhh', 'hinnh', 'hinnx', 'hio', 'hir', 'hirinnx', 'hirinnz', 'hirny', 'hirnz', 'hirw', 'hirx', 'hiry', 'hirtt', 'hirk', 'hiunny', 'hiunnw', 'hiunnz', 'hmhh', 'hmz', 'hngw', 'hoainnh', 'hoannw', 'honnz', 'hop', 'huinn', 'huinnh', 'huinnx', 'huinnz',

    'ionn', 'innh', 'innhh', 'ir', 'irinnx', 'irn', 'irny', 'irpp', 'irw', 'irx', 'iry', 'irz',

    'jiaunny', 'jiaunnw', 'jiaunnx', 'jinny', 'jiry', 'jirx', 'jorx',
	
	'kannx', 'kainnh', 'kainnw', 'kaunnhh', 'kennh', 'kennx', 'kor', 'kore', 'koreh', 'korew', 'korw', 'korh', 'korx', 'kiann', 'kiannw', 'kinn', 'kir', 'kirnx', 'kirny', 'kirw', 'kngz', 'koainn', 'koainnw', 'konny', 'kuinnw',

    'lorehh', 'lorex', 'lorh', 'lorx', 'liry', 'lirx', 'lirz',

    'maix', 'mih', 'mihh', 'mng', 'moaix', 'moaiz', 'moex', 'moez', 'mui', 'muiz',

    'naih', 'naix', 'ney', 'new', 'nez', 'nehh', 'niauw', 'niauh', 'niaw', 'nirix', 'niriz', 'niu', 'nngh', 'nox', 'nui', 'nuiy', 'nuiw', 'nuix', 'nuiz',

    'ngai', 'ngaiy', 'ngauy', 'ngauh', 'ngauhh', 'ngaw', 'ngaz', 'nge', 'ngh', 'nghh', 'ngiahh', 'ngiriy', 'ngiuy', 'ngiux', 'ngiz', 'ngoeh', 'ngoehh',

    'oainn', 'oainnh', 'oainnz', 'oainnhh', 'oannx',

    'painn', 'pennw', 'por', 'porhh', 'porw', 'porx', 'porz', 'pinny', 'pinnhh', 'png', 'pngy', 'pngw', 'pngz', 'pnghh', 'poannx', 'ponn', 'puinn', 'puinnw', 'puinnx',
	
	'qainny', 'qainnw', 'qainnz', 'qannhh', 'qore', 'qoreh', 'qorew', 'qorex', 'qorey', 'qorez', 'qorh', 'qorw', 'qory', 'qiaunnhh', 'qinny', 'qinnh', 'qinnhh', 'qir', 'qirinn', 'qirinny', 'qirn', 'qirnw', 'qirnz', 'qirw', 'qirx', 'qiry', 'qirz', 'qiunnx', 'qiunnz', 'qnghh', 'qoainnw', 'qoainnx', 'qoainnhh', 'qoannw', 'qoenny', 'qonnz', 'quinn', 'quinny', 'quinnw',

    'sainn', 'sanny', 'sannw', 'sannx', 'sore', 'sorew', 'sorew', 'sorh', 'sorhh', 'sorx', 'sorw', 'sorz', 'sinnx', 'sinnhh', 'sir', 'sirinn', 'sirm', 'sirp', 'sirw', 'sirx', 'siry', 'sirz', 'sm', 'smw', 'smh', 'snghh', 'soainn', 'soainnh', 'soainnx', 'soainnhh', 'soenn', 'soenny', 'soennw', 'suinn', 'suinny', 'suinnw',

    'tainnw', 'tainnz', 'tannx', 'tannz', 'tenn', 'tor', 'tore', 'torehh', 'torew', 'torhh', 'torw', 'tinnw', 'tinnx', 'tirx', 'tiry', 'tiunny', 'toannx', 'tuinnw', 'tuinnx', 'tuinnz',

    'uihh', 'uinn', 'uinny', 'uinnx', 'uinnz',

    'vainny', 'vainnx', 'vainnz', 'vor', 'vory', 'vorw', 'vorx', 'vorz', 'vinnx', 'vngx', 'vuinn', 'vuinny', 'vuinnx', 'vuinnz',
]

// prettier-ignore
export const list_of_lexical_roots = [
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
    'choannz', 'chutt', 'choew', 'choez', 'chuh', 'chui', 'chuiy', 'chuiw',
    'chuix', 'chuiz', 'chun', 'chuny', 'chunw', 'chunx', 'chunz', 'chut',
    'chutt', 

    'da', 'day', 'daw', 'dah', 'dahh', 'dai', 'daiy', 'daiw', 'daix', 'daiz',
    'dainn', 'dainny', 'dak', 'dakk', 'dam', 'damy', 'damw', 'damx', 'damz',
    'dan', 'dany', 'danw', 'danx', 'danz', 'dang', 'dangy', 'dangw', 'dangx',
    'dangz', 'dann', 'danny', 'dannw', 'dannx', 'dannz', 'dap', 'dapp', 'dat',
    'datt', 'dau', 'dauy', 'dauw', 'daux', 'dauz', 'dauh', 'dauhh', 'de', 'dey',
    'dew', 'dex', 'dez', 'deh', 'denn', 'dennw', 'dennz', 'di', 'diy', 'diw',
    'dix', 'diz', 'dia', 'diah', 'diahh', 'diak', 'diakk', 'diam', 'diamy',
    'diamw', 'diamx', 'diamz', 'dien', 'dieny', 'dienx', 'dienz', 'dianny',
    'diannx', 'diannz', 'diap', 'diapp', 'diet', 'diett', 'diau', 'diauw',
    'diaux', 'diauz', 'dih', 'dihh', 'dek', 'dekk', 'dimw', 'dimx', 'dimz',
    'din', 'diny', 'dinw', 'dinx', 'dinz', 'deng', 'dengy', 'dengw', 'dengx',
    'dengz', 'dinn', 'dinnx', 'dinnz', 'dinnhh', 'diurw', 'diurx', 'diurz',
    'diurh', 'diurhh', 'diok', 'diokk', 'diong', 'diongy', 'diongw', 'diongx',
    'diongz', 'dit', 'ditt', 'diu', 'diuy', 'diuw', 'diux', 'diuz', 'diuh',
    'diunn', 'diunny', 'diunnw', 'diunnx', 'diunnz', 'dng', 'dngy', 'dngw',
    'dngx', 'dngz', 'dur', 'dury', 'durw', 'durx', 'durz', 'durh', 'durhh',
    'dok', 'dokk', 'domx', 'dong', 'dongy', 'dongw', 'dongx', 'dongz', 'do',
    'doy', 'dow', 'dox', 'doz', 'du', 'duy', 'duw', 'dux', 'duz', 'doaw',
    'doaz', 'doan', 'doany', 'doanw', 'doanz', 'doann', 'doannw', 'doannx',
    'doannz', 'doat', 'doatt', 'doew', 'doex', 'doez', 'duh', 'duhh', 'dui',
    'duiw', 'duix', 'duiz', 'dun', 'duny', 'dunw', 'dunz', 'dutt', 

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

    'ka', 'kay', 'kaw', 'kah', 'kahh', 'kai', 'kaiy', 'kaiw', 'kainn', 'kainny',
    'kak', 'kakk', 'kam', 'kamy', 'kamw', 'kan', 'kanw', 'kang', 'kangy',
    'kangw', 'kann', 'kap', 'kapp', 'kat', 'kau', 'kauy', 'kauw', 'ke', 'key',
    'kew', 'kex', 'keh', 'kehh', 'kenn', 'kennhh', 'ki', 'kiy', 'kiw', 'kix',
    'kiz', 'kia', 'kiax', 'kiaz', 'kiah', 'kiakk', 'kiam', 'kiamw', 'kiamx',
    'kiamz', 'kien', 'kieny', 'kienw', 'kienx', 'kiang', 'kiangw', 'kiap',
    'kiet', 'kiett', 'kiau', 'kiauy', 'kiauw', 'kiauh', 'kih', 'kek', 'kim',
    'kimy', 'kimx', 'kin', 'kiny', 'kinx', 'keng', 'kengy', 'kengw', 'kengx',
    'kengz', 'kinnx', 'kiury', 'kiurw', 'kiurh', 'kiok', 'kiong', 'kiongy',
    'kiongx', 'kip', 'kipp', 'kit', 'kitt', 'kiu', 'kiuy', 'kiux', 'kiuz',
    'kiunn', 'kiunnz', 'kng', 'kngw', 'kur', 'kury', 'kurw', 'kurx', 'kok',
    'kokk', 'kong', 'kongy', 'kongw', 'kongz', 'ko', 'koy', 'kow', 'ku', 'kux',
    'kuz', 'koa', 'koay', 'koaw', 'koah', 'koaiw', 'koan', 'koany', 'koanw',
    'koanx', 'koann', 'koanny', 'koannw', 'koat', 'koe', 'koew', 'koex', 'koeh',
    'kuh', 'kui', 'kuiy', 'kuiw', 'kun', 'kuny', 'kunw', 'kunx', 'kut', 'kutt',


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

    'pa', 'paw', 'paz', 'pah', 'paiw', 'painny', 'painnz', 'pak', 'pakk', 'pan',
    'pan', 'pang', 'pangy', 'pangw', 'pangx', 'pangz', 'pannw', 'pannz', 'pau',
    'pauy', 'pauw', 'pauz', 'pauhh', 'pe', 'pey', 'pew', 'pez', 'penn', 'pennx',
    'pennz', 'pi', 'piy', 'piw', 'pix', 'piz', 'piah', 'piahh', 'piak', 'piakk',
    'pien', 'pienw', 'pienx', 'piang', 'piangz', 'piann', 'pianny', 'piannx',
    'piet', 'piau', 'piauw', 'piaux', 'pih', 'pihh', 'pek', 'piny', 'pinx',
    'pinz', 'peng', 'pengw', 'pengx', 'pengz', 'pinn', 'pinnw', 'pinnx',
    'pinnz', 'piurw', 'piurx', 'pit', 'pngh', 'pur', 'pury', 'purw', 'purz',
    'purh', 'pok', 'pokk', 'pong', 'pongy', 'pongw', 'pongx', 'pongz', 'po',
    'poy', 'pow', 'pox', 'poz', 'puy', 'pux', 'puz', 'poaw', 'poah', 'poahh',
    'poan', 'poanx', 'poanz', 'poann', 'poannw', 'poannz', 'poat', 'poe',
    'poey', 'poew', 'poex', 'poez', 'poehh', 'puhh', 'puiy', 'puiw', 'pun',
    'puny', 'punw', 'punx', 'put', 'putt',

    'qa', 'qay', 'qaw', 'qaz', 'qah', 'qai', 'qaiy', 'qaiw', 'qainn', 'qainnx',
    'qak', 'qakk', 'qam', 'qamy', 'qamw', 'qamx', 'qan', 'qany', 'qanw', 'qang',
    'qangy', 'qangw', 'qangx', 'qangz', 'qann', 'qanny', 'qannw', 'qannx',
    'qap', 'qat', 'qau', 'qauy', 'qauw', 'qaux', 'qauz', 'qauh', 'qe', 'qey',
    'qew', 'qez', 'qeh', 'qehh', 'qenn', 'qenny', 'qennw', 'qi', 'qiy', 'qiw',
    'qix', 'qiz', 'qia', 'qiaw', 'qiaz', 'qiahh', 'qiam', 'qiamy', 'qiamw',
    'qiamx', 'qien', 'qieny', 'qienw', 'qienz', 'qiann', 'qianny', 'qiannw',
    'qiannx', 'qiannz', 'qiap', 'qiet', 'qiett', 'qiau', 'qiauy', 'qiaux',
    'qiauz', 'qek', 'qekk', 'qim', 'qimy', 'qimw', 'qimz', 'qin', 'qiny',
    'qinw', 'qinz', 'qeng', 'qengy', 'qengw', 'qengx', 'qengz', 'qinn', 'qinnw',
    'qinnx', 'qiurw', 'qiurx', 'qiurz', 'qiurh', 'qiok', 'qiokk', 'qiong',
    'qiongy', 'qiongx', 'qiongz', 'qip', 'qipp', 'qitt', 'qiu', 'qiuy', 'qiuw',
    'qiux', 'qiuz', 'qiunn', 'qng', 'qngy', 'qngw', 'qur', 'qury', 'qurw',
    'qurx', 'qurz', 'qurh', 'qok', 'qokk', 'qong', 'qongy', 'qongw', 'qongx',
    'qonnx', 'qo', 'qoy', 'qow', 'qox', 'qoz', 'qu', 'quy', 'quw', 'quz', 'qoa',
    'qoay', 'qoaw', 'qoaz', 'qoah', 'qoai', 'qoaiy', 'qoaiw', 'qoainn',
    'qoainny', 'qoainnz', 'qoan', 'qoany', 'qoanw', 'qoanx', 'qoanz', 'qoann',
    'qoanny', 'qoannx', 'qoannz', 'qoat', 'qoe', 'qoey', 'qoew', 'qoeh', 'qui',
    'quiy', 'quiw', 'quix', 'quiz', 'qun', 'quny', 'qunw', 'qunx', 'qunz',
    'qut', 'qutt',

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

    'taw', 'tah', 'tahh', 'tai', 'taiy', 'taiw', 'taix', 'taiz', 'tak', 'takk',
    'tam', 'tamw', 'tamx', 'tamz', 'tan', 'tany', 'tanw', 'tanx', 'tang',
    'tangy', 'tangw', 'tangx', 'tann', 'tanny', 'tap', 'tat', 'tau', 'tauy',
    'tauw', 'taux', 'tauz', 'te', 'tey', 'tew', 'tex', 'tez', 'teh', 'tehh',
    'tennw', 'tennx', 'ti', 'tiy', 'tiw', 'tix', 'tiz', 'tiah', 'tiam', 'tiamy',
    'tiamz', 'tien', 'tieny', 'tiann', 'tiannw', 'tiannx', 'tiannz', 'tiap',
    'tiapp', 'tiet', 'tiau', 'tiauy', 'tiauw', 'tiaux', 'tiauz', 'tih', 'tihh',
    'tek', 'tekk', 'tim', 'tin', 'tinx', 'tinz', 'teng', 'tengy', 'tengw',
    'tengx', 'tinn', 'tinnz', 'tiur', 'tiurw', 'tiurx', 'tiok', 'tiong',
    'tiongy', 'tiongw', 'tiongx', 'tiu', 'tiuy', 'tng', 'tngw', 'tngx', 'tngz',
    'tur', 'tury', 'turw', 'turx', 'turh', 'turhh', 'tok', 'tokk', 'tong',
    'tongy', 'tongw', 'tongz', 'toy', 'tow', 'tox', 'tuy', 'toa', 'toaz',
    'toah', 'toanx', 'toann', 'toanny', 'toannw', 'toat', 'tuh', 'tui', 'tuiy',
    'tuiw', 'tuix', 'tun', 'tuny', 'tunx', 'tunz', 'tut', 'tutt',

    'u', 'uy', 'uw', 'ux', 'uz', 'uh', 'ui', 'uiy', 'uiw', 'uix', 'uiz', 'un',
    'uny', 'unw', 'unx', 'unz', 'ut',

    'ur', 'urw', 'urx', 'urh', 'urhh',

    'va', 'vay', 'vaw', 'vax', 'vaz', 'vah', 'vai', 'vaiy', 'vaiw', 'vaix',
    'vaiz', 'vak', 'vakk', 'van', 'vany', 'vanx', 'vanz', 'vang', 'vangy',
    'vangw', 'vangx', 'vat', 'vatt', 'vau', 'vauy', 'vaux', 'vauz', 've', 'vey',
    'vew', 'vex', 'vez', 'veh', 'vehh', 'venn', 'vennw', 'vennx', 'vennz', 'vi',
    'viy', 'viw', 'vix', 'viz', 'viah', 'viak', 'viakk', 'vien', 'vieny',
    'vienw', 'vienz', 'viangw', 'viangz', 'viann', 'vianny', 'viannw', 'viannx',
    'viet', 'viett', 'viau', 'viauy', 'vih', 'vek', 'vekk', 'vin', 'viny',
    'vinw', 'vinx', 'veng', 'vengy', 'vengw', 'vengx', 'vengz', 'vinn', 'vinny',
    'vinnw', 'vinnz', 'viur', 'viury', 'viurz', 'vit', 'vitt', 'viu', 'vng',
    'vngy', 'vngz', 'vur', 'vury', 'vurw', 'vurx', 'vurz', 'vurh', 'vurhh',
    'vok', 'vokk', 'vongy', 'vongw', 'vongx', 'vongz', 'vo', 'voy', 'vow',
    'vox', 'voz', 'vu', 'vuw', 'vux', 'vuz', 'voaw', 'voah', 'voahh',
    'voan', 'voanw', 'voanx', 'voanz', 'voann', 'voanny', 'voannw', 'voannx',
    'voannz', 'voat', 'voatt', 'voe', 'voey', 'voew', 'voex', 'voez', 'voeh',
    'poehh', 'vuh', 'vui', 'vuix', 'vuiz', 'vun', 'vuny', 'vunw', 'vunx',
    'vunz', 'vut', 'vutt',
]
