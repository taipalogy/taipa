

export let MORPH_RULES = {
    'PRP': {
        'goay':            {lemma: 'PRON_LEMMA', case: 'Acc'},
        'goa':             {lemma: 'goay', case: ''},
        'goaz':           {lemma: 'goay', case: ''},
        'goaw':            {lemma: 'goay', case: ''},
    },

    'VB': {
        'hengz':           {lemma: 'hingx', type: 'ditransitive'},
        'chiurhy':           {lemma: 'chiurh', type: 'ditransitive'},
        'how':              {lemma: 'hoz', type: 'ditransitive'},
        'sangy':            {lemma: 'sangw', type: 'ditransitive'},
        'mngw':             {lemma: 'mngz', type: 'ditransitive'},

        'oannw':            {lemma: 'oannz', type: 'transitive'},
    },

    'PART': {
        'hongx':            {lemma: 'hoz'},
    },
}