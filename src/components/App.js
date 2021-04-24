import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import List from './List';
import Detail from './Detail';

const App = () => (
  <BrowserRouter>
    <div className="container">
      <Switch>
        <Route path="/" component={List} exact />
        <Route path="/movie/:id" component={Detail} exact />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
