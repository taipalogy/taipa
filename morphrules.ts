

export let MORPH_RULES = {
    'PRP': {
        'guay':            {lemma: 'PRON_LEMMA', case: 'Acc'},
        'gua':             {lemma: 'guay', case: ''},
        'guazs':           {lemma: 'guay', case: ''},
        'guaw':            {lemma: 'guay', case: ''},
    },

    'VB': {
        'hingzs':           {lemma: 'hingx', type: 'ditransitive'},
        'ziurhy':           {lemma: 'ziurh', type: 'ditransitive'},
        'how':              {lemma: 'hozs', type: 'ditransitive'},
        'sangy':            {lemma: 'sangw', type: 'ditransitive'},
        'mngw':             {lemma: 'mngzs', type: 'ditransitive'},

        'uannw':            {lemma: 'uannzs', type: 'transitive'},
    },

    'PART': {
        'hongx':            {lemma: 'hozs'},
    },
}