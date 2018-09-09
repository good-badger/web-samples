import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { DonationApp } from './donation/App';
import { CommunityApp } from './community/App';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const NavBar = () => {
	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="title" color="inherit">
						A Sample Application for Issuing Badges for Work done towards the UN's Social Development Goals
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
		<div>
			<Route path="/donation" component={DonationApp} />
			<Route path="/" component={CommunityApp} />
		</div>
		<Divider />
	</div>
);

ReactDOM.render(
	<BrowserRouter>
			<App />
	</BrowserRouter>,
	document.getElementById('root')
);
