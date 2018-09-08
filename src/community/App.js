import * as React from 'react';
import QRCode from 'qrcode';
import {ApprovalList} from './ApprovalList';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
        <Typography variant="headline" component="h2">Homeless shelter in Cape Town</Typography>
        <Card style={styles.card}>
          <CardContent style={styles.content}>
            <img src="./images/shelter.jpeg"
              alt="Homeless shelter"
              height="250px"
              weight="400px"
            />
            <div style={styles.details}>
              <img src={this.state.imgSrc} alt="QR code could not be created" height="200px" weight="100px"/>
              <Typography component="p" style={styles.qrText}>Scan this code to submit your community service</Typography>
            </div>
          </CardContent>
        </Card>
        <ApprovalList />
      </div>
    );
  }
}

const styles = {
  card: {
    display: 'flex',
  },
  details: {
    flexDirection: 'column',
  },
  content: {
    flex: 'auto 1 0',
    display: 'flex',
  },
  cover: {
    width: 151,
    height: 151,
  },
  qrText: {
    width: 180,
    padding: '10px',
    textAlign: 'center',
  },
};

export const CommunityApp = AppComponent;