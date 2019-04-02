export const resultMaps = [
    {
        mapId: 'accountMap',
        properties: ['name']
    },

    {
        mapId: 'categoryMap',
        properties: ['name']
    },

    {
        mapId: 'transactionMap',
        properties: [
            { name: 'txnDate', column: 'txn_date' },
            'payee',
            'memo',
            'amount'
        ],
        associations: [
            { name: 'account', mapId: 'accountMap', columnPrefix: 'account_' },
            {
                name: 'category',
                mapId: 'categoryMap',
                columnPrefix: 'category_'
            }
        ]
    }
];
