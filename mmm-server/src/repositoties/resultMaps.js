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
            'amount',
            { name: 'accountId', column: 'account_id' },
            { name: 'categoryId', column: 'category_id' }
        ]
    }
];
