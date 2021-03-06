import * as React from 'react';
import Web3 from 'web3';
import loadjs from 'loadjs';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import StarBorder from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';


loadjs(["https://cdn.jsdelivr.net/gh/ethereum/web3.js/dist/web3.min.js"], 'web3');

const BADGE_TOKEN_ABI = require('../contracts/ERC721Badge.json');

const BADGE_TOKEN_ADDRESS = process.env.REACT_APP_BADGE_TOKEN_ADDRESS; //'0xbE3d961d2dbbB42dB8A03B083a28119FC99CCA20';

class ApprovalListComponent extends React.Component {
	state = {
		web3: null,
		badgeToken: null,
		requests: []
	};

	async sendBadge(idx) {
		var issuer = (await this.state.web3.eth.getAccounts())[0];
    var to = this.state.requests[idx].wallet;
    var stars = (this.state.requests[idx].stars || 1);
    var sdg = "" + this.props.sdg;
    this.state.badgeToken.methods.totalSupply().call({ from: issuer }).then((result) => {
      var nonce = result;
      this.state.badgeToken.methods.mintUniqueTokenTo(
        to,
        nonce,
        issuer,
        new Date().toJSON(),
        '1 hour of community service',
        sdg+stars).send({ from: issuer })
        .then((result) => {
          fetch('/api/community/requestIssued?idx=' + idx).then(function(response) {
            return response.json();
          });
      
          console.log(result);
        }
      );
    });
	}

	async updateRequests() {
		var newRequests = await fetch('/api/community/requests').then(function(response) {
			return response.json();
		});
		this.setState({ requests: newRequests });
	}

	componentWillMount() {
		setInterval(this.updateRequests.bind(this), 3000);
	}

	componentDidMount() {
    if (typeof window.web3 !== 'undefined') {
      loadjs.ready('web3', () => {
        var web3js = new Web3(window.web3.currentProvider);
        var badgeTokenInstance = new web3js.eth.Contract(BADGE_TOKEN_ABI.abi, BADGE_TOKEN_ADDRESS);
        this.setState({ web3: web3js, badgeToken: badgeTokenInstance });
      });
    }
  }

  renderButton(request, i){
    if(!request.issued){
      return (<Button variant="contained" color="primary" onClick={() => this.sendBadge(i)}>Issue Badge</Button>);
    }else{
      return ("Badge issued");
    }
  }

  renderStars(request, i){
    if(!request.issued){
      if(this.state.stars === 1){
        request.stars = 1;
        return(
          <div>
            <StarIcon style={styles.star} onClick={() => this.setState({stars: 1})}/>
            <StarBorder style={styles.star} onClick={() => this.setState({stars: 2})}/>
            <StarBorder style={styles.star} onClick={() => this.setState({stars: 3})}/>
          </div>
        )
      }else if(this.state.stars === 2){
        request.stars = 2;
        return(
          <div>
            <StarIcon style={styles.star} onClick={() => this.setState({stars: 1})}/>
            <StarIcon style={styles.star} onClick={() => this.setState({stars: 2})}/>
            <StarBorder style={styles.star} onClick={() => this.setState({stars: 3})}/>
          </div>
        )
      }else{
        request.stars = 3;
        return(
          <div>
            <StarIcon style={styles.star} onClick={() => this.setState({stars: 1})}/>
            <StarIcon style={styles.star} onClick={() => this.setState({stars: 2})}/>
            <StarIcon style={styles.star} onClick={() => this.setState({stars: 3})}/>
          </div>
        )
      }
    }else{
      return null;
    }
  }


	render() {
		return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Wallet</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {this.state.requests.map((r, i)=>{
            if(r.expires === -1 || r.expires > Date.now()){
              return (
                <TableRow key={i}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.wallet}</TableCell>
                  <TableCell>{this.renderStars(r,i)}</TableCell>
                  <TableCell>
                    {this.renderButton(r, i)}
                  </TableCell>
                </TableRow>
              );
            }else{
              return null;
            }
          }
        )}
        </TableBody>
        </Table>
      </div>
    );
  }
}

const styles = {
  stars: {
    cursor: 'pointer',
  },
}
export const ApprovalList = ApprovalListComponent;
