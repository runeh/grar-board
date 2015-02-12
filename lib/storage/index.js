var debug = require('debug');
var urlParse = require('url').parse;

function getStorage(uri, logger, config) {
    debug("tallyboard:storage")("Creating storage for " + uri);
    var scheme = urlParse(uri).protocol.slice(0, -1); // node uri module is lol
    // try {
        var engine = require("./" + scheme);
        return storageWrapper(engine.create(uri), scheme);
    // }
    // catch (e) {
    //     throw new Error("No storage engine for scheme \"" + scheme + "\"");
    // }
}

function storageWrapper(storage, engine) {
    var log = debug('tallyboard:storage:' + engine);
    return {
        get: function(id) {
            log("get id " + id);
            return storage.get(id);
        },

        set: function(id, val) {
            log("set id " + id);
            return storage.set(id, val);
        },

        del: function(id) {
            log("del id " + id);
            return storage.del(id);
        },
    }
}

module.exports = {
    getStorage: getStorage
};