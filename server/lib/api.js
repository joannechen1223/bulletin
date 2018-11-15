'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dataProcess = require('./dataProcess');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.use(_bodyParser2.default.urlencoded({ extended: false }));
router.use(_bodyParser2.default.json());

router.get('/api/articles/:page', function (req, res) {
  (0, _dataProcess.loadData)(req, res, req.params.page);
});

router.post('/api/editor', function (req, res) {
  var id = req.body.id;
  var newArticle = req.body.newArticle;
  var editMode = req.body.editMode;
  var page = req.body.page;
  if (editMode === 'new') {
    // add new article
    _dataProcess.knex.insert({
      TITLE: newArticle.TITLE,
      CONTENT: newArticle.CONTENT
    }).into('ARTICLE').then(function () {
      return (0, _dataProcess.loadData)(req, res);
    });
  } else {
    // editMode ==== 'modify'
    (0, _dataProcess.knex)('ARTICLE').where('ID', id).update({
      TITLE: newArticle.TITLE,
      CONTENT: newArticle.CONTENT
    }).then(function () {
      return (0, _dataProcess.loadData)(req, res, page);
    });
  }
});

router.post('/api/delete', function (req, res) {
  var id = req.body.id;
  var page = req.body.page;
  (0, _dataProcess.knex)('ARTICLE').where('ID', id).del().then(function () {
    return (0, _dataProcess.loadData)(req, res, page);
  });
});

exports.default = router;