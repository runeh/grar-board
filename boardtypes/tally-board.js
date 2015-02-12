var R = require('ramda');

const getter = title => R.pipe(
    R.propOr([], 'items'),
    R.find(R.propEq('title', title)),
    (e => e || {}),
    R.propOr(0, 'count'));

const setter = (title) =>
    (val, obj) => {
        obj = R.clone(obj);
        const index = R.findIndex(R.propEq('title', title), obj.items);

        if (index == -1) {
            obj.items.push({title: title, count: val});
        }
        else {
            obj.items[index] = R.assoc('count', val, obj.items[index]);
        }
        return obj;
    }

const itemLens = (title) => R.lens(getter(title), setter(title));

const incrementBy = (data, title, by) => itemLens(title).map(R.add(by), data);

const set = (data, title, val) => itemLens(title).set(val, data);

const remove = (data, title) => {
    data = R.clone(data);
    data.items = R.reject(R.propEq('title', title), data.items);
    return data;
}

module.exports = {
    type: 'tally',
    name: 'Lol Tally Board',
    view: "tally",
    description: "Description blargh",
    initialData: {
        topTitle: "Top title",
        bottomTitle: "Bottom title",
        items: [
            { title: "User 1", count: 12 },
            { title: "User 2", count: 4 },
        ]
    },
    operations: [
        {
            name: "remove",
            inputs: ['title'],
            description: "Removes a tally item by title.",
            method: 'POST',
            transform: (data, post) => remove(data, post.title)
        },
        {
            name: "set",
            inputs: ['title', 'value'],
            description: "Sets the count of a tally item. If the tally item does not exist, it's created.",
            method: 'POST',
            transform: (data, post) => set(data, post.title, parseInt(post.count))
        },
        {
            name: "increment",
            inputs: ['title', 'increment'],
            description: "Increments the given tally item by 1. If the item does not exist, it's created with a value of 1.",
            method: 'POST',
            transform: (data, post) => incrementBy(data, post.title, 1)
        },
        {
            name: "decrement",
            inputs: ['title'],
            method: 'POST',
            description: "Decrements the given tally item by 1. If the item does not exist, it's created with a value of -1.",
            transform: (data, post) => incrementBy(data, post.title, -1)
        },
        {
            name: "increment_by",
            inputs: ['title', 'delta'],
            method: 'POST',
            description: "Increments the given tally item by 'increment'. If the item does not exist, it's created with a value of 'increment'.",
            transform: (data, post) => incrementBy(data, post.title, parseInt(post.by))
        },
        {
            name: "decrement_by",
            inputs: ['title', 'delta'],
            method: 'POST',
            description: "Increments the given tally item by 'increment'. If the item does not exist, it's created with a value of 'increment'.",
            transform: (data, post) => incrementBy(data, post.title, parseInt(-post.by))
        },
    ]
}
