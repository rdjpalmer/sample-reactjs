import Promise from 'promise';
import { Store } from 'flummox';
import serialize from 'serialize-javascript';

class NewsStore extends Store {
  constructor(flux) {
    super();

    const newsActionIds = flux.getActionIds('news');
    this.register(newsActionIds.getId, this.getId);

    this.state = {
      id: null
    };
  }

  getId(id) {
    this.setState({
      id
    });
  }

  replaceState(state) {
    this.setState(state);
  }

  static serialize(state) {
    return serialize(state);
  }

  static deserialize(state) {
    return JSON.parse(state);
  }
};

export default NewsStore;