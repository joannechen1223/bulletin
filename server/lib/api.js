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

var fetch = require("node-fetch");

var _require = require("../../../login"),
    domain = _require.domain,
    facebookClientId = _require.facebookClientId,
    facebookClientSecret = _require.facebookClientSecret,
    googleClientId = _require.googleClientId,
    googleClientSecret = _require.googleClientSecret;

router.get("/facebook", function (req, res, next) {
  console.log('hello! in facebook');
  var facebook_oauth_url = "https://www.facebook.com/dialog/oauth?" + "redirect_uri=" + domain + "/facebook/callback" + "&client_id=" + facebookClientId + "&scope=public_profile" + "&response_type=code";
  res.send(JSON.stringify({ "redirectUrl": facebook_oauth_url }));
});

router.get("/facebook/callback", function (req, res, next) {
  console.log('in facebook callback');
  var code = req.query.code;
  console.log(code);
  var token_option = "https://graph.facebook.com/v2.3/oauth/access_token?" + "client_id=" + facebookClientId + "&client_secret=" + facebookClientSecret + "&code=" + code + "&redirect_uri=" + domain + "/facebook/callback";
  fetch(token_option).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);
    //res.send(data);
    var access_token_url = "https://graph.facebook.com/me?access_token=" + data.access_token + "&fields=id,name,picture,email";

    fetch(access_token_url).then(function (res) {
      return res.json();
    }).then(function (data) {
      console.log(data);
      res.send(data);
    }).catch(function (err) {
      console.log('err');
    });
  });
});

router.get("/google", function (req, res, next) {
  console.log('in google');
  var google_oauth_url = "https://accounts.google.com/o/oauth2/v2/auth?" + "scope=email%20profile&" + "redirect_uri=" + domain + "/google/callback&" + "response_type=code&" + "client_id=" + googleClientId;
  console.log(google_oauth_url);
  res.send(JSON.stringify({ "redirectUrl": google_oauth_url }));
});

router.get("/google/callback", function (req, res, next) {
  console.log('in google callback');
  var code = req.query.code;
  console.log(code);
  var token_option = "https://www.googleapis.com/oauth2/v4/token";
  fetch(token_option, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    form: {
      code: code,
      client_id: googleClientId,
      client_secret: googleClientSecret,
      grant_type: "authorization_code",
      redirect_uri: domain + "/google/callback"
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    console.log(data);
    //res.send(data);
    /*
    const access_token_url = "https://graph.facebook.com/me?access_token=" + data.access_token +
      "&fields=id,name,picture,email";
    
    fetch(access_token_url)
      .then((res) => (res.json()))
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch((err) => {
        console.log('err');
      });
    */
  });
});

exports.default = router;