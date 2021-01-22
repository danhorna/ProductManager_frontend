import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigator from './components/utils/Navigator';

import NewListIndex from './components/routes/newlist/Index';
import HomeIndex from './components/routes/home/Index';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navigator />
        <Route path='/' component={HomeIndex} exact/>
        <Route path='/newlist' component={NewListIndex} />
      </Router>
    </React.Fragment>
  );
}

export default App;
