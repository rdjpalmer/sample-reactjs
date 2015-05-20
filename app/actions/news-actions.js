import Promise from 'promise';
import { Actions } from 'flummox';

import NewsService from '../services/news-service';

class NewsActions extends Actions {
  getId() {
    return NewsService.getLatestItemId().then((id) => {
      return id;
    }).catch((err) => {
      // this is example schizz, so we're not logging shit properly
      return;
    });
  }
};

export default NewsActions;