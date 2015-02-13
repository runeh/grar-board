module.exports = {
    type: 'countdown',
    name: 'Countdown board',
    view: 'countdown',
    description: 'Shows a countdown to a given time and date.',
    initialData: {
        topTitle: 'Release in',
        bottomTitle: 'Good luck',
        endTime: '2015-09-23 10:30:00.000+01:00'
    },
    operations: [
        {
            name: 'set',
            inputs: ['endTime'],
            description: 'Sets the end time. Value should be in ISO 8601 format. 2015-09-23 10:30:00',
            method: 'POST',
            transform: (data, post) => data.endTime = post.endTime // lolvalidation
        },
    ]
}