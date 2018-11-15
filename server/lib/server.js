'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)();
server.use('/', _api2.default);

server.listen(3001, function () {
  console.log('Bulletin app listening on port 3001!');
});