import * as React from 'react';
import Web3 from 'web3';

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

  render() {

		return (
      <div>
        <table>
          <tbody>
          {this.state.requests.map((r, i)=>{
            return (<tr key={i}>
              <td>{r.name}</td>
              <td>{r.wallet}</td>
              <td><button onClick={() => this.sendBadge(i)}>Generate</button></td>
            </tr>);
          }
        )}
        </tbody>
        </table>
      </div>
    );
  }
}

const styles = {

}

export const ApprovalList = ApprovalListComponent;