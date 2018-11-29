import password from '../../../password';

export const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: password,
    database: 'db_bulletin',
  },
});

export const loadData = (req, res, page) => {
  const start = (page-1) * 10;
  let articleList, pageCnt;
  knex('ARTICLE')
    .orderBy('UPDATE_TIME', 'desc')
    .limit(10)
    .offset(start)
    .then(result => {
      articleList = changeTimeFormat(JSON.parse(JSON.stringify(result)));
    })
    .then(
      knex('ARTICLE')
      .count('ID as CNT')
      .then(result => {
        pageCnt = Math.ceil(result[0].CNT/10);
        //console.log(articleList);
        res.json({
          articleList: articleList,
          pageCnt: pageCnt,
        });
      })
    );
}
  
export const changeTimeFormat = (list) => {
  let newList = list;
  for (let i = 0; i < list.length; i = i+1) {
    if (list[i].CREATE_TIME !== undefined){
      newList[i].CREATE_TIME = getTimeFormat(new Date(list[i].CREATE_TIME));
    }
    if (list[i].UPDATE_TIME !== undefined){
      newList[i].UPDATE_TIME = getTimeFormat(new Date(list[i].UPDATE_TIME));
    }
  }
  return newList;
}

  
export const  getTimeFormat = (d) => {
  const year = d.getFullYear();
  let month = d.getMonth();
  switch(month+1){
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
  const date = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();
  const Time = `${month} ${date}, ${year} ${hour}:${min}`
  return Time;
}