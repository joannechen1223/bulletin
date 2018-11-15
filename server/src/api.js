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

export default router;