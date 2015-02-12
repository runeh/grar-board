var R = require('ramda');

class DummyStorage {

    constructor() {
        this._storage = {};
    }

    get(id) {
        return R.clone(this._storage[id]);
    }

    set(id, data) {
        this._storage[id] = R.clone(data);
    }

    del(id) {
        this._storage[id] = null;
    }
}

module.exports = {
    create: function() {
        return new DummyStorage();
    }
}
