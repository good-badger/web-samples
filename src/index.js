import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { DonationApp } from './donation/App';
import { CommunityApp } from './community/App';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Web3Provider } from 'react-web3';

const NavBar = () => {
	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="title" color="inherit">
						Sample Applications for Issuing Badges for Work on Social Development Goals
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export const App = () => (
	<div>
		<NavBar />
		<Divider />
		<nav>
			<Link to="/donation">Donation App</Link>
			<Link to="/community">Community Service App</Link>
		</nav>
		<div>
			<Route path="/donation" component={DonationApp} />
			<Route path="/community" component={CommunityApp} />
		</div>
	</div>
);

ReactDOM.render(
	<BrowserRouter>
		<Web3Provider>
			<App />
		</Web3Provider>
	</BrowserRouter>,
	document.getElementById('root')
);
