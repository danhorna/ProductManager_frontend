import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigator from './components/utils/Navigator';
import Index from './components/routes/index'

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navigator/>
        <Route path='/' component={Index}/>
      </Router>
    </React.Fragment>
  );
}

export default App;
