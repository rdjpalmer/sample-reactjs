import React from 'react/addons';
import expect from 'expect';

import Home from '../home';

const TestUtils = React.addons.TestUtils;

describe('Home page', () => {
  it('renders nothing', () => {
    const homePage = TestUtils.renderIntoDocument(
      <Home />
    );

    expect(homePage.getDOMNode()).toNotExist();
  });

  it('renders with a new ID', () => {
    const news = {
      id: 1
    };

    const homePage = TestUtils.renderIntoDocument(
      <Home news={news} />
    );

    expect(homePage).toExist();
    expect(homePage.getDOMNode().textContent).toContain(news.id);
  });
});