var R = require('ramda');

function incrementBy(data, by) {
    return R.assoc('count', (data.count || 0) + 1, data);
}

function set(data, count) {
    return R.assoc('count', count, data);
}

module.exports = {
    type: 'count',
    name: 'Count board',
    view: 'count',
    description: 'Shows a single number, as well as an optional title.',
    initialData: {
        topTitle: 'Deployment',
        bottomTitle: 'Count',
        count: 1 
    },
    operations: [
        {
            name: 'set',
            inputs: ['title', 'value'],
            description: 'Sets the count.',
            method: 'POST',
            transform: (data, post) =>  data.count = post.count
        },
        {
            name: 'increment',
            inputs: ['title', 'increment'],
            description: 'Increments the count by 1.',
            method: 'POST',
            transform: (data, post) => incrementBy(data, 1)
        },
        {
            name: 'decrement',
            inputs: ['title'],
            method: 'POST',
            description: 'Decrements the count by 1.',
            transform: (data, post) => incrementBy(data, -1)
        },
        {
            name: 'increment_by',
            inputs: ['title', 'delta'],
            method: 'POST',
            description: "Increments the count by \'increment\'.",
            transform: (data, post) => incrementBy(data, parseInt(post.by))
        },
        {
            name: 'decrement_by',
            inputs: ['title', 'delta'],
            method: 'POST',
            description: 'Decrements the count by \'increment\'.',
            transform: (data, post) => incrementBy(data, parseInt(-post.by))
        }
    ]
}
