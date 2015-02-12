const R = require('ramda');
const moment = require('moment');
const shortId = require('shortid');
const examples = require('./examples');
const boardTypes = require('./boardtypes');

const getOp = (name, def) => R.find(R.propEq('name', name), def.operations);

function createBoard(type) {
    var definition = boardTypes[type];
    return {
        id: shortId.generate(),
        type: type,
        styles: "",
        data: definition.initialData
    };
}

module.exports = function(app, config) {

    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/new', (req, res) => {
        res.render('new', {
            boardTypes: boardTypes
        });
    });

    app.post('/new/:type', (req, res) => {
        const type = req.params.type;
        const board = createBoard(type);
        const adminId = shortId.generate();

        req.storage.set(board.id, board);
        req.storage.set(adminId, {
            isAdmin: true,
            boardId: board.id
        });
        res.redirect(`/board/${ adminId }/admin`);        
    });

    app.param('adminid', function(req, res, next, id) {
        let board = req.storage.get(id);
        if (!board) { return res.status(404).end(); }
        if (!board.isAdmin) { return res.status(410).end(); }
        board = req.storage.get(board.boardId);
        if (!board) { return res.status(404).end(); }

        req.boardDefinition = boardTypes[board.type];
        req.board = board;
        req.adminId = id;
        next();
    });

    app.param('boardid', function(req, res, next, id) {
        const board = req.storage.get(id);
        if (!board) { return res.status(404).end(); }
        if (board.isAdmin) { return res.status(404).end(); }
        req.board = board;
        req.boardDefinition = boardTypes[board.type];
        next();
    });

    app.get('/board/:boardid', function(req, res) {
        const view = `boards/${ req.boardDefinition.type }`;
        res.render(view, {
            board: req.board,
            data: req.board.data
        });
    });

    app.get('/board/:adminid/admin', function(req, res) {
        res.render('admin', {
            boardDef: req.boardDefinition,
            board: req.board,
            rootApiUrl: `/board/${ req.adminId }/api/`
        });
    });

    app.post('/board/:adminid/admin/data', function(req, res) {
        const data = JSON.parse(req.body.data);
        req.board.data = data; // fixme: sanity check json
        req.storage.set(req.board.id, req.board);
        res.redirect(`/board/${ req.adminId }/admin`);
    });

    app.post('/board/:adminid/admin/style', function(req, res) {
        req.board.styles = req.body.styles;
        req.board.includeDefaultStyles = req.body.includeDefaultStyles;
        req.storage.set(req.board.id, req.board);
        res.redirect(`/board/${ req.adminId }/admin`);
    });

    app.post('/board/:adminid/api/:operation', function(req, res) {
        const op = getOp(req.params.operation, req.boardDefinition);
        let board = R.clone(req.board);
        board.data = op.transform(board.data, req.body);
        req.storage.set(board.id, board);
        res.json(board.data || {});
    });

    app.get('/example/tally', function(req, res) {
        res.render('tally', examples.getTallyExample());
    });

    app.get('/example/tallymark', function(req, res) {
        res.render('tallymark', examples.getTallyMarkExample());
    });

    app.get('/example/countdown', function(req, res) {
        res.render('countdown', examples.getCountDownExample());
    });

    app.get('/example/countup', function(req, res) {
        res.render('countup', examples.getCountUpExample());
    });

    app.get('/example/count', function(req, res) {
        res.render('count', examples.getCountExample());
    });

    app.get('/example/message', function(req, res) {
        res.render('message', examples.getMessageExample());
    });
}
