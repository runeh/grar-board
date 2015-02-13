var R = require('ramda');
var moment = require('moment');

// fixme: example and initial data should maybe be the same, and in
// the board definitions?
var exampleData = {
    tally: {
        topTitle: "Merge screwups",
        bottomTitle: "yay computers!",
        items: [
            {title: "Rune", count: 3},
            {title: "Frank", count: 8},
            {title: "Sverre", count: 1},
            {title: "Geir", count: 9}
        ]
    },

    countdown: {
        topTitle: "Friday beer in",
        bottomTitle: "Woo",
    },

    countup: {
        topTitle: "Days since last raptor attack",
        bottomTitle: "Wear your hard hat!",
    },

    count: {
        topTitle: "Deployments",
        bottomTitle: "In 2015",
        count: 12
    },

    message: {
        topTitle: "Last deployment by",
        bottomTitle: "Good luck",
        message: "Rune"
    }
}

module.exports = {
    tally: { data:exampleData.tally },
    tallymarks: { data:exampleData.tally },
    count: { data:exampleData.count },
    message: { data:exampleData.message },

    get countdown() {
        var d = R.clone(exampleData.countdown);
        d.endTime = (moment().add(10, "minute")).toISOString(); //   day(7).hour(16).toISOString();
        return { data:d };      
    },

    get countup() {
        var d = R.clone(exampleData.countup);
        d.fromTime = moment.utc().subtract(3, 'hours').toISOString();
        return {data:d};
    }
}