'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeFormat = exports.changeTimeFormat = exports.loadData = exports.knex = undefined;

var _password = require('../../../password');

var _password2 = _interopRequireDefault(_password);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var knex = exports.knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: _password2.default,
    database: 'db_bulletin'
  }
});

var loadData = exports.loadData = function loadData(req, res, page) {
  var start = (page - 1) * 10;
  var articleList = void 0,
      pageCnt = void 0;
  knex('ARTICLE').orderBy('UPDATE_TIME', 'desc').limit(10).offset(start).then(function (result) {
    articleList = changeTimeFormat(JSON.parse(JSON.stringify(result)));
  }).then(knex('ARTICLE').count('ID as CNT').then(function (result) {
    pageCnt = Math.ceil(result[0].CNT / 10);
    console.log(articleList);
    res.json({
      articleList: articleList,
      pageCnt: pageCnt
    });
  }));
};

var changeTimeFormat = exports.changeTimeFormat = function changeTimeFormat(list) {
  var newList = list;
  for (var i = 0; i < list.length; i = i + 1) {
    if (list[i].CREATE_TIME !== undefined) {
      newList[i].CREATE_TIME = getTimeFormat(new Date(list[i].CREATE_TIME));
    }
    if (list[i].UPDATE_TIME !== undefined) {
      newList[i].UPDATE_TIME = getTimeFormat(new Date(list[i].UPDATE_TIME));
    }
  }
  return newList;
};

var getTimeFormat = exports.getTimeFormat = function getTimeFormat(d) {
  var year = d.getFullYear();
  var month = d.getMonth();
  switch (month + 1) {
    case 1:
      month = 'Jan';
      break;
    case 2:
      month = 'Feb';
      break;
    case 3:
      month = 'Mar';
      break;
    case 4:
      month = 'Apr';
      break;
    case 5:
      month = 'May';
      break;
    case 6:
      month = 'Jun';
      break;
    case 7:
      month = 'Jul';
      break;
    case 8:
      month = 'Aug';
      break;
    case 9:
      month = 'Sep';
      break;
    case 10:
      month = 'Oct';
      break;
    case 11:
      month = 'Nov';
      break;
    case 12:
      month = 'Dec';
      break;
  }
  var date = d.getDate();
  var hour = d.getHours();
  var min = d.getMinutes();
  var Time = month + ' ' + date + ', ' + year + ' ' + hour + ':' + min;
  return Time;
};