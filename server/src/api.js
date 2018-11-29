import { knex, loadData, changeTimeFormat, getTimeFormat } from './dataProcess';
import express from 'express';
import bodyParser from 'body-parser';



const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/api/articles/:page', function(req, res){
  loadData(req, res, req.params.page);
});

router.post('/api/editor', function(req, res){
  const id = req.body.id;
  const newArticle = req.body.newArticle;
  const editMode = req.body.editMode;
  const page = req.body.page;
  if (editMode === 'new') {   // add new article
    knex.insert({
      TITLE: newArticle.TITLE,
      CONTENT: newArticle.CONTENT,
    }).into('ARTICLE')
    .then(() => loadData(req, res))
  } else {    // editMode ==== 'modify'
    knex('ARTICLE')
      .where('ID', id)
      .update({
        TITLE: newArticle.TITLE,
        CONTENT: newArticle.CONTENT,
      })
      .then(() => loadData(req, res, page))
  }
});

router.post('/api/delete', function(req, res){
  const id = req.body.id;
  const page = req.body.page;
  knex('ARTICLE')
    .where('ID', id)
    .del()
    .then(() => loadData(req, res, page))
});

///////////////////////////////////////////////////////////////////////////////////////////////////

const fetch = require("node-fetch");
const { domain, facebookClientId, facebookClientSecret, googleClientId, googleClientSecret } = require("../../../login");

router.get("/facebook", function(req, res, next){
  console.log('hello! in facebook');
  var facebook_oauth_url = "https://www.facebook.com/dialog/oauth?" +
          "redirect_uri="+ domain +"/facebook/callback"+
          "&client_id=" + facebookClientId +
          "&scope=public_profile"+
          "&response_type=code";
  res.send(JSON.stringify({"redirectUrl": facebook_oauth_url}));
});


router.get("/facebook/callback", function(req, res, next) {
  console.log('in facebook callback');
  var code = req.query.code;
  console.log(code);
  let token_option = "https://graph.facebook.com/v2.3/oauth/access_token?" +
    "client_id=" + facebookClientId +
    "&client_secret=" + facebookClientSecret +
    "&code=" + code +
    "&redirect_uri=" + domain + "/facebook/callback"
  fetch(token_option)
    .then((res) => (res.json()))
    .then((data) => {
      console.log(data);
      //res.send(data);
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
    });
});

router.get("/google", function(req, res, next){
  console.log('in google');
  var google_oauth_url = "https://accounts.google.com/o/oauth2/v2/auth?" +  
  "scope=email%20profile&"+
  "redirect_uri=" + domain + "/google/callback&"+
  "response_type=code&"+
  "client_id=" + googleClientId;
  console.log(google_oauth_url);
  res.send(JSON.stringify({"redirectUrl":google_oauth_url}));
});

router.get("/google/callback", function(req, res, next) {
  console.log('in google callback');
  var code = req.query.code;
  console.log(code);
  let token_option = "https://www.googleapis.com/oauth2/v4/token"
  fetch(token_option, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    form:{
      code: code,
      client_id: googleClientId,
      client_secret: googleClientSecret,
      grant_type:"authorization_code",
      redirect_uri: domain + "/google/callback"
    }
  })
    .then((res) => (res.json()))
    .then((data) => {
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

export default router;