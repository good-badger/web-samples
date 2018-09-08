import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { DonationApp } from './donation/App';
import { CommunityApp } from './community/App';
//import { DappRequirements } from 'react-dapp-requirements';

export const App = () => (
  <div>
    <nav>
      <Link to="/donation">Donation App</Link>
      <Link to="/community">Community Service App</Link>
    </nav>
    <div>
      <Route path="/donation" component={DonationApp}/>
      <Route path="/community" component={CommunityApp}/>
    </div>
  </div>
);


ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);
