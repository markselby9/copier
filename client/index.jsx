import React from 'react';
import {render} from 'react-dom';

import AppBox from './modules/AppBox.jsx';

class App extends React.Component {
  render () {
    return (
      <AppBox />
    )
  }
}

render(<App/>, document.getElementById('app'));