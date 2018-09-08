import * as React from 'react';
import Web3 from 'web3';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const BADGE_TOKEN_ABI = require('../contracts/ERC721Badge.json');

const BADGE_TOKEN_ADDRESS = "0xbE3d961d2dbbB42dB8A03B083a28119FC99CCA20";

class ApprovalListComponent extends React.Component {

  state = {
    web3: null,
    badgeToken: null,
    requests: []
  };

  async sendBadge(idx){
    var issuer = await this.state.web3.eth.accounts[0];
    var to = this.state.requests[idx].wallet;
    this.state.badgeToken.totalSupply(
      {from: issuer},
      (error, result) =>{
        var nonce = result;
        console.log("RES: ", result);
        console.log(this.state.badgeToken);
        this.state.badgeToken.mintUniqueTokenTo(
          to,
          nonce,
          issuer, 
          new Date().toJSON(), 
          "1 hour of community service", 
          "000000000",{from: issuer}, (error, result)=>{
            if(error){
              console.log(error);
            }else{
              console.log(result);
            }

        });
      }
    );
  }

  async updateRequests(){
    var newRequests = await fetch('/api/community/requests')
      .then(function(response) {
        return response.json();
      });
    this.setState({requests: newRequests});
  }

  componentWillMount(){
    setInterval(this.updateRequests.bind(this), 3000);
  }

  componentDidMount(){
    if (typeof window.web3 !== 'undefined') {
      var web3js = new Web3(window.web3.currentProvider);
      var badgeToken = web3js.eth.contract(BADGE_TOKEN_ABI.abi);
      var badgeTokenInstance = badgeToken.at(BADGE_TOKEN_ADDRESS);
      this.setState({web3: web3js, badgeToken: badgeTokenInstance});
    }
  }

  renderButton(request, i){
    if(!request.issued){
      return (<Button variant="contained" color="primary" onClick={() => this.sendBadge(i)}>Issue Badge</Button>);
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
            </TableRow>
          </TableHead>
          <TableBody>
          {this.state.requests.map((r, i)=>{
            return (
            <TableRow key={i}>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.wallet}</TableCell>
              <TableCell>
                {this.renderButton(r, i)}
              </TableCell>
            </TableRow>);
          }
        )}
        </TableBody>
        </Table>
      </div>
    );
  }
}

const styles = {

}

export const ApprovalList = ApprovalListComponent;