import * as React from 'react';
import QRCode from 'qrcode';
import {ApprovalList} from './ApprovalList';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


const SERVER_PORT = 3000;
const HOST = window.location.hostname;
const PROTOCOL = window.location.protocol;

class AppComponent extends React.Component {

  state = {
    imgSrc: ""
  };

  componentWillMount(){

    QRCode.toDataURL(PROTOCOL + "//" + HOST + ":" + SERVER_PORT + "/community/callback?wallet=123&name=Bob", { errorCorrectionLevel: 'L',   color: {
        dark: '#101010',  // Blue dots
      }})
      .then(url => {
        this.setState({ imgSrc: url});
      })
      .catch(err => {
        console.error(err);
      }
    );
}

  render() {

		return (
      <div>
        <Typography variant="headline" component="h3">Homeless shelter in Cape Town</Typography>
        <Paper><img style={styles.img} src="./images/shelter.jpeg" alt="Homeless shelter"/><img src={this.state.imgSrc} alt="QR code could not be created"/></Paper>
        <ApprovalList />
      </div>
    );
  }
}

const styles = {
  title: {
    color: "red",
    textSize: "20px"
  },
  img: {
    padding: "10px"
  }




}

export const CommunityApp = AppComponent;