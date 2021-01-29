import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigator from './components/utils/Navigator';

import NewListIndex from './components/routes/newlist/Index';
import HomeIndex from './components/routes/home/Index';
import ProductIndex from './components/routes/product/Index';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navigator />
        <Route path='/' component={HomeIndex} exact/>
        <Route path='/newlist' component={NewListIndex} />
        <Route path='/product/:productid' component={ProductIndex}/>
      </Router>
    </React.Fragment>
  );
}

export default App;
