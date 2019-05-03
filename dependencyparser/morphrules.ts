

export let MORPH_RULES = {
    'PRP': {
        'goay':            {lemma: 'PRON_LEMMA', case: 'Acc'},
        'goa':             {lemma: 'guay', case: ''},
        'goazs':           {lemma: 'guay', case: ''},
        'goaw':            {lemma: 'guay', case: ''},
    },

    'VB': {
        'hengzs':           {lemma: 'hingx', type: 'ditransitive'},
        'ziurhy':           {lemma: 'ziurh', type: 'ditransitive'},
        'how':              {lemma: 'hozs', type: 'ditransitive'},
        'sangy':            {lemma: 'sangw', type: 'ditransitive'},
        'mngw':             {lemma: 'mngzs', type: 'ditransitive'},

        'oannw':            {lemma: 'uannzs', type: 'transitive'},
    },

    'PART': {
        'hongx':            {lemma: 'hozs'},
    },
}