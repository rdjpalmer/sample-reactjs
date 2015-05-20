import { Flux } from 'flummox';
import NewsActions from './actions/news-actions';
import NewsStore from './stores/news-store';

class AppFlux extends Flux {
  constructor() {
    super();

    const newsActions = this.createActions('news', NewsActions);
    this.createStore('news', NewsStore, this);
  }
};

export default AppFlux;