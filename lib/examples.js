var R = require('ramda');
var moment = require('moment');

var exampleData = {
    tally: {
        topTitle: "Merge screwups",
        bottomTitle: "yay computers!",
        tallies: [
            {title: "Rune", count: 3},
            {title: "Frank", count: 8},
            {title: "Sverre", count: 1},
            {title: "Geir", count: 9}
        ]
    },

    countDown: {
        topTitle: "Friday beer in",
        bottomTitle: "Woo",
        timeFormat: "fuzzy",
        toTime: null
    },

    countUp: {
        topTitle: "Days since last raptor attack",
        bottomTitle: "Wear your hard hat!",
        fromTime: null
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
    getTallyExample: function() {
        return {data:exampleData.tally};
    },

    getTallyMarkExample: function() {
        return {data:exampleData.tally};
    },

    getCountDownExample: function() {
        var d = R.clone(exampleData.countDown);
        d.toTime = (moment().add(10, "minute")).toISOString(); //   day(7).hour(16).toISOString();
        return {data:d};
    },

    getCountUpExample: function() {
        var d = R.clone(exampleData.countUp);
        d.fromTime = moment.utc().subtract(3, 'hours').toISOString();
        return {data:d};
    },

    getCountExample: function() {
        return {data:exampleData.count};
    },

    getMessageExample: function() {
        return {data:exampleData.message};
    }
}