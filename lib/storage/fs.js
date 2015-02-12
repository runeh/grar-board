var pathUtil = require('path');
var fse = require('fs-extra');

// fixme: rename to directorystorage?

class FileSystemStorage {
    constructor(uri) {
        this._root = pathUtil.resolve(pathUtil.normalize(uri.replace("fs://", "")));
        fse.ensureDirSync(this._root);
    }

    _pathForId(id) {
        return pathUtil.join(this._root, pathUtil.basename(id) + ".json");
    }

    get(id) {
        var path = this._pathForId(id);
        return fse.readJSONSync(path);
    }

    set(id, data) {
        var path = this._pathForId(id);
        fse.writeJSONSync(path, data);
    }

    del(id) {
        var path = this._pathForId(id);
        this._storage[id] = null;
    }
};

module.exports = {
    create: function(uri) {
        return new FileSystemStorage(uri);
    }
}


