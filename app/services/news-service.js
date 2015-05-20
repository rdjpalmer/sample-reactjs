import request from 'superagent';
import Promise from 'promise';

var news = {
  getLatestItemId() {
    return new Promise((fufill, reject) => {
      request.get('https://hacker-news.firebaseio.com/v0/maxitem.json')
        .end((err, res) => {
          console.log(res.body);

          if(err) reject(err);

          fufill(res.body);
        });
    });
  }
};

export default news;