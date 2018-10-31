

export let MORPH_RULES = {
    'PRP': {
        'guay':            {LEMMA: 'PRON_LEMMA', Case: 'Acc'},
        'gua':             {LEMMA: 'guay', Case: ''},
        'guazs':           {LEMMA: 'guay', Case: ''},
        'guaw':            {LEMMA: 'guay', Case: ''},
    },

    'VB': {
        'hingzs':           {LEMMA: 'hingx', Type: 'ditransitive'},
        'ziurhy':           {LEMMA: 'ziurh', Type: 'ditransitive'},
        'how':              {LEMMA: 'hozs', Type: 'ditransitive'},
        'sangy':            {LEMMA: 'sangw', Type: 'ditransitive'},
        'mngw':             {LEMMA: 'mngzs', Type: 'ditransitive'},

        'uannw':            {LEMMA: 'uannzs', Type: 'causative'},
    },

    'PART': {
        'hongx':            {LEMMA: 'hozs'},
    },
}